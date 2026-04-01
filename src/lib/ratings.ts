export interface ActorReview {
  id: string;
  actorId: string;
  actorName: string;
  directorName: string;
  directorCompany: string;
  auditionTitle: string;
  rating: number; // 1-5
  tags: string[];
  comment: string;
  createdAt: string;
}

export interface ExperienceReview {
  id: string;
  actorName: string;
  directorCompany: string;
  auditionTitle: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ACTOR_KEY = "auditions_actor_reviews";
const EXP_KEY = "auditions_experience_reviews";

export function getActorReviews(actorId?: string): ActorReview[] {
  try {
    const all: ActorReview[] = JSON.parse(localStorage.getItem(ACTOR_KEY) || "[]");
    return actorId ? all.filter((r) => r.actorId === actorId) : all;
  } catch {
    return [];
  }
}

export function addActorReview(r: Omit<ActorReview, "id" | "createdAt">): ActorReview {
  const review: ActorReview = { ...r, id: Date.now().toString(), createdAt: new Date().toISOString() };
  const all = getActorReviews();
  all.unshift(review);
  localStorage.setItem(ACTOR_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("auditions_ratings_updated"));
  return review;
}

export function getExperienceReviews(): ExperienceReview[] {
  try {
    return JSON.parse(localStorage.getItem(EXP_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addExperienceReview(r: Omit<ExperienceReview, "id" | "createdAt">): ExperienceReview {
  const review: ExperienceReview = { ...r, id: Date.now().toString(), createdAt: new Date().toISOString() };
  const all = getExperienceReviews();
  all.unshift(review);
  localStorage.setItem(EXP_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("auditions_ratings_updated"));
  return review;
}

export function getAverageRating(actorId: string): number | null {
  const reviews = getActorReviews(actorId);
  if (!reviews.length) return null;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export function subscribeRatings(cb: () => void): () => void {
  window.addEventListener("auditions_ratings_updated", cb);
  return () => window.removeEventListener("auditions_ratings_updated", cb);
}
