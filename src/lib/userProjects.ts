/** userProjects.ts
 * Saves projects created via "Post an Audition" to localStorage
 * so they appear in My Projects page.
 */

const KEY = "auditions_user_projects";

export interface UserProject {
  id: string;
  title: string;
  type: string;
  status: string;
  statusColor: string;
  producer: string;       // production house
  director: string;
  location: string;
  description: string;
  deadline: string;
  ageRange: string;
  gender: string;
  image: string;
  castingProgress: number;
  totalRoles: number;
  filledRoles: number;
  activeAuditions: number;
  totalApplicants: number;
  startDate: string;
  endDate: string;
  budget: string;
  createdAt: string;
}

export function loadUserProjects(): UserProject[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUserProject(project: UserProject): void {
  const existing = loadUserProjects();
  // avoid duplicates
  const filtered = existing.filter((p) => p.id !== project.id);
  localStorage.setItem(KEY, JSON.stringify([project, ...filtered]));
  window.dispatchEvent(new Event("userProjectsUpdated"));
}

export function deleteUserProject(id: string): void {
  const existing = loadUserProjects().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(existing));
  window.dispatchEvent(new Event("userProjectsUpdated"));
}
