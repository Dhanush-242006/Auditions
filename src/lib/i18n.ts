import * as React from "react";

export type Lang = "en" | "hi" | "ta" | "te";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English",    native: "English" },
  { code: "hi", label: "Hindi",      native: "हिंदी" },
  { code: "ta", label: "Tamil",      native: "தமிழ்" },
  { code: "te", label: "Telugu",     native: "తెలుగు" },
];

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    talent: "Talent",
    myProfile: "My Profile",
    submissions: "Submissions",
    selfTape: "Self-Tape Studio",
    alerts: "Saved Alerts",
    bookmarks: "Bookmarks",
    networking: "Networking",
    regional: "Regional",
    verification: "Verification",
    aiAssistant: "AI Assistant",
    settings: "Settings",
    logout: "Logout",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    findYourRole: "Find Your Next Role",
    browseAuditions: "Browse Auditions",
    applyNow: "Apply Now",
    applied: "Applied",
    postAudition: "Post Audition",
    actors: "Actors",
    analytics: "Analytics",
    myProjects: "My Projects",
    shortlistManager: "Shortlist Manager",
    teamCollab: "Team Collab",
    console: "Console",
    castingAgent: "Casting Agent",
    applicantDB: "Applicant DB",
    profile: "Profile",
    verifiedPro: "Verified Pro",
    verifiedStudio: "Verified Studio",
    welcomeBack: "Welcome back",
    yourJourney: "Your casting journey continues",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    talent: "टैलेंट",
    myProfile: "मेरी प्रोफ़ाइल",
    submissions: "सबमिशन",
    selfTape: "सेल्फ-टेप स्टूडियो",
    alerts: "सेव अलर्ट",
    bookmarks: "बुकमार्क",
    networking: "नेटवर्किंग",
    regional: "क्षेत्रीय",
    verification: "वेरिफिकेशन",
    aiAssistant: "AI सहायक",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    findYourRole: "अपना अगला रोल खोजें",
    browseAuditions: "ऑडिशन देखें",
    applyNow: "अभी आवेदन करें",
    applied: "आवेदन किया",
    postAudition: "ऑडिशन पोस्ट करें",
    actors: "कलाकार",
    analytics: "एनालिटिक्स",
    myProjects: "मेरे प्रोजेक्ट",
    shortlistManager: "शॉर्टलिस्ट मैनेजर",
    teamCollab: "टीम सहयोग",
    console: "कंसोल",
    castingAgent: "कास्टिंग एजेंट",
    applicantDB: "आवेदक डेटाबेस",
    profile: "प्रोफ़ाइल",
    verifiedPro: "वेरिफाइड प्रो",
    verifiedStudio: "वेरिफाइड स्टूडियो",
    welcomeBack: "वापसी पर स्वागत है",
    yourJourney: "आपकी कास्टिंग यात्रा जारी है",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    talent: "திறமை",
    myProfile: "என் சுயவிவரம்",
    submissions: "சமர்ப்பிப்புகள்",
    selfTape: "சுய-டேப் ஸ்டூடியோ",
    alerts: "சேமித்த விழிப்பூட்டல்கள்",
    bookmarks: "புத்தகக்குறிகள்",
    networking: "நெட்வொர்க்கிங்",
    regional: "பிராந்தியம்",
    verification: "சரிபார்ப்பு",
    aiAssistant: "AI உதவியாளர்",
    settings: "அமைப்புகள்",
    logout: "வெளியேறு",
    lightMode: "ஒளி பயன்முறை",
    darkMode: "இருண்ட பயன்முறை",
    findYourRole: "உங்கள் அடுத்த பாத்திரத்தை கண்டறியுங்கள்",
    browseAuditions: "ஆடிஷன்களை உலாவுங்கள்",
    applyNow: "இப்போது விண்ணப்பிக்கவும்",
    applied: "விண்ணப்பிக்கப்பட்டது",
    postAudition: "ஆடிஷன் பதிவிடு",
    actors: "நடிகர்கள்",
    analytics: "பகுப்பாய்வு",
    myProjects: "என் திட்டங்கள்",
    shortlistManager: "குறுகிய பட்டியல்",
    teamCollab: "குழு ஒத்துழைப்பு",
    console: "கன்சோல்",
    castingAgent: "காஸ்டிங் ஏஜென்ட்",
    applicantDB: "விண்ணப்பதாரர் தரவுத்தளம்",
    profile: "சுயவிவரம்",
    verifiedPro: "சரிபார்க்கப்பட்ட நிபுணர்",
    verifiedStudio: "சரிபார்க்கப்பட்ட ஸ்டூடியோ",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    yourJourney: "உங்கள் காஸ்டிங் பயணம் தொடர்கிறது",
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    talent: "ప్రతిభ",
    myProfile: "నా ప్రొఫైల్",
    submissions: "సమర్పణలు",
    selfTape: "సెల్ఫ్-టేప్ స్టూడియో",
    alerts: "సేవ్ చేసిన హెచ్చరికలు",
    bookmarks: "బుక్‌మార్క్‌లు",
    networking: "నెట్‌వర్కింగ్",
    regional: "ప్రాంతీయ",
    verification: "ధృవీకరణ",
    aiAssistant: "AI సహాయకుడు",
    settings: "సెట్టింగ్‌లు",
    logout: "లాగ్అవుట్",
    lightMode: "లైట్ మోడ్",
    darkMode: "డార్క్ మోడ్",
    findYourRole: "మీ తదుపరి పాత్ర కనుగొనండి",
    browseAuditions: "ఆడిషన్లు చూడండి",
    applyNow: "ఇప్పుడు దరఖాస్తు చేయండి",
    applied: "దరఖాస్తు చేయబడింది",
    postAudition: "ఆడిషన్ పోస్ట్ చేయి",
    actors: "నటులు",
    analytics: "విశ్లేషణలు",
    myProjects: "నా ప్రాజెక్టులు",
    shortlistManager: "షార్ట్‌లిస్ట్ మేనేజర్",
    teamCollab: "జట్టు సహకారం",
    console: "కన్సోల్",
    castingAgent: "కాస్టింగ్ ఏజెంట్",
    applicantDB: "దరఖాస్తుదారుల డేటాబేస్",
    profile: "ప్రొఫైల్",
    verifiedPro: "ధృవీకరించిన నిపుణుడు",
    verifiedStudio: "ధృవీకరించిన స్టూడియో",
    welcomeBack: "తిరిగి స్వాగతం",
    yourJourney: "మీ కాస్టింగ్ ప్రయాణం కొనసాగుతోంది",
  },
};

const LANG_KEY = "auditions_lang";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

export const LangContext = React.createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function useLang() { return React.useContext(LangContext); }

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    return saved && LANGUAGES.some(l => l.code === saved) ? saved : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  };

  const t = (key: string): string =>
    TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;

  return React.createElement(LangContext.Provider, { value: { lang, setLang, t } }, children);
}
