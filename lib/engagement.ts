export type EngagementState = {
  liked: string[];
  saved: string[];
};

export const engagementStorageKey = "embodied-tools-engagement:v1";

export function emptyEngagementState(): EngagementState {
  return { liked: [], saved: [] };
}

export function readEngagementState(): EngagementState {
  try {
    const raw = window.localStorage.getItem(engagementStorageKey);
    if (!raw) return emptyEngagementState();
    const parsed = JSON.parse(raw) as Partial<EngagementState>;
    return {
      liked: Array.isArray(parsed.liked) ? parsed.liked : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : []
    };
  } catch {
    return emptyEngagementState();
  }
}

export function writeEngagementState(state: EngagementState) {
  window.localStorage.setItem(engagementStorageKey, JSON.stringify(state));
}

export function toggleEngagementValue(values: string[], slug: string) {
  return values.includes(slug) ? values.filter((item) => item !== slug) : [...values, slug];
}
