import type { TalentProfileExtras } from "@/src/lib/talentProfileExtras";
import { mergeTalentProfileExtras } from "@/src/lib/talentProfileExtras";
import { applyStoredUserName } from "@/src/hooks/useCurrentUser";

const START = "<<<PROFILE_UPDATE>>>";
const END = "<<<END_PROFILE_UPDATE>>>";

export type ProfileApplyResult = {
  /** Message text safe to show (markers stripped) */
  visibleContent: string;
  /** Human-readable list of fields saved */
  appliedLabels: string[];
};

/** Strip optional JSON block from assistant reply and return parsed updates. */
export function stripProfileBlockFromAssistantText(content: string): {
  visible: string;
  json: Partial<TalentProfileExtras> & { name?: string };
} {
  const start = content.indexOf(START);
  const end = content.indexOf(END);
  if (start === -1 || end === -1 || end <= start) {
    return { visible: content, json: {} };
  }
  const jsonStr = content.slice(start + START.length, end).trim();
  const visible =
    (content.slice(0, start).trimEnd() + "\n\n" + content.slice(end + END.length).trimStart()).trim();

  let json: Partial<TalentProfileExtras> & { name?: string } = {};
  try {
    const parsed = JSON.parse(jsonStr) as Record<string, unknown>;
    const allowed = [
      "name",
      "bio",
      "location",
      "phone",
      "instagram",
      "twitter",
      "linkedin",
      "experienceYears",
      "ageRange",
      "height",
      "weight",
      "eyes",
      "skills",
    ] as const;
    for (const k of allowed) {
      if (parsed[k] === undefined) continue;
      if (k === "skills" && Array.isArray(parsed.skills)) {
        json.skills = (parsed.skills as unknown[]).map(String).filter(Boolean);
      } else if (k === "skills" && typeof parsed.skills === "string") {
        json.skills = parsed.skills.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
      } else if (typeof parsed[k] === "string") {
        (json as any)[k] = String(parsed[k]).trim();
      }
    }
  } catch {
    json = {};
  }
  return { visible, json };
}

const LABELS: Record<string, string> = {
  name: "Display name",
  bio: "Bio",
  location: "Location",
  phone: "Phone",
  instagram: "Instagram",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  experienceYears: "Experience",
  ageRange: "Age range",
  height: "Height",
  weight: "Weight",
  eyes: "Eyes",
  skills: "Skills",
};

/** Apply structured updates from AI block + return labels. */
export function applyProfileJson(json: Partial<TalentProfileExtras> & { name?: string }): string[] {
  const applied: string[] = [];
  const { name, ...rest } = json;
  if (name && typeof name === "string" && name.trim()) {
    if (applyStoredUserName(name.trim())) applied.push(LABELS.name);
  }
  const extras: Partial<TalentProfileExtras> = {};
  (["bio", "location", "phone", "instagram", "twitter", "linkedin", "experienceYears", "ageRange", "height", "weight", "eyes"] as const).forEach((k) => {
    const v = rest[k];
    if (typeof v === "string" && v.trim()) (extras as any)[k] = v.trim();
  });
  if (rest.skills?.length) extras.skills = rest.skills;
  if (Object.keys(extras).length > 0) {
    mergeTalentProfileExtras(extras);
    for (const k of Object.keys(extras)) {
      if (LABELS[k]) applied.push(LABELS[k]);
    }
  }
  return applied;
}

/**
 * Heuristic extraction from user message (works offline / without model JSON).
 */
export function applyLocalProfileIntents(userMessage: string): string[] {
  const applied: string[] = [];
  const msg = userMessage.trim();
  if (!msg) return applied;

  const nameMatch = msg.match(
    /(?:^|\b)(?:my name is|call me|i am named|set (?:my )?(?:display )?name to)\s+([^.!?\n]{1,80})/i
  );
  if (nameMatch?.[1]) {
    const n = nameMatch[1].trim();
    if (n.length >= 2 && n.length < 60 && applyStoredUserName(n)) {
      applied.push(LABELS.name);
    }
  }

  const bioMatch = msg.match(
    /(?:bio|about me)(?:\s+is|\s*:\s*)\s*(.+)/i
  );
  if (bioMatch?.[1]) {
    const bio = bioMatch[1].trim().slice(0, 2000);
    if (bio.length > 5) {
      mergeTalentProfileExtras({ bio });
      applied.push(LABELS.bio);
    }
  }

  const locMatch = msg.match(
    /(?:based in|i(?:'m| am) in|live in|from|location(?:\s+is)?\s*:?)\s+([A-Za-z][A-Za-z\s,/\-]{2,60})/i
  );
  if (locMatch?.[1]) {
    mergeTalentProfileExtras({ location: locMatch[1].trim() });
    applied.push(LABELS.location);
  }

  const phoneMatch = msg.match(/(?:phone|mobile|whatsapp)(?:\s+is|\s*:\s*)\s*([\d\s+\-]{8,20})/i);
  if (phoneMatch?.[1]) {
    mergeTalentProfileExtras({ phone: phoneMatch[1].trim() });
    applied.push(LABELS.phone);
  }

  const skillsMatch = msg.match(
    /(?:skills?|i (?:know|can do))(?:\s+are|\s+include|\s*:\s*)\s*(.+)/i
  );
  if (skillsMatch?.[1]) {
    const skills = skillsMatch[1]
      .split(/[,;•]| and /i)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length < 40)
      .slice(0, 20);
    if (skills.length) {
      mergeTalentProfileExtras({ skills });
      applied.push(LABELS.skills);
    }
  }

  return [...new Set(applied)];
}

export function formatAppliedFooter(appliedLabels: string[]): string {
  if (!appliedLabels.length) return "";
  return `\n\n---\n✅ **Saved to your profile:** ${appliedLabels.join(", ")}. Open **My Profile** to review or edit.`;
}

/** System prompt snippet for Gemini / instructions */
export const PROFILE_FILL_SYSTEM_SNIPPET = `
When the user shares profile information they want saved (name, city, bio, phone, social links, skills, physical stats, years of experience), you MUST:
1. Reply helpfully in natural language.
2. End your message with EXACTLY this block (valid JSON only between markers, no markdown code fences):
${START}
{"name":"optional full display name","bio":"optional","location":"optional city/region","phone":"optional","instagram":"optional handle or URL","twitter":"optional","linkedin":"optional","experienceYears":"optional e.g. 5+ years","ageRange":"optional","height":"optional","weight":"optional","eyes":"optional","skills":["skill one","skill two"]}
${END}
Include ONLY fields the user clearly provided; omit keys you are unsure about. Use empty or omit unused keys — do not guess sensitive data.
`.trim();
