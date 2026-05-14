"use client";

import { useEffect, useMemo, useState } from "react";

type EngagementState = {
  liked: string[];
  saved: string[];
};

type ToolEngagementProps = {
  slug: string;
  variant?: "card" | "detail";
};

const storageKey = "embodied-tools-engagement:v1";

function readState(): EngagementState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return { liked: [], saved: [] };
    const parsed = JSON.parse(raw) as Partial<EngagementState>;
    return {
      liked: Array.isArray(parsed.liked) ? parsed.liked : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : []
    };
  } catch {
    return { liked: [], saved: [] };
  }
}

function writeState(state: EngagementState) {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}

function toggleValue(values: string[], slug: string) {
  return values.includes(slug) ? values.filter((item) => item !== slug) : [...values, slug];
}

function stableCount(slug: string, salt: number, min: number, range: number) {
  let hash = salt;
  for (const char of slug) {
    hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  }
  return min + (hash % range);
}

export function ToolEngagement({ slug, variant = "card" }: ToolEngagementProps) {
  const [state, setState] = useState<EngagementState>({ liked: [], saved: [] });

  useEffect(() => {
    setState(readState());
  }, []);

  const liked = state.liked.includes(slug);
  const saved = state.saved.includes(slug);
  const baseLikes = useMemo(() => stableCount(slug, 17, 24, 96), [slug]);
  const baseSaves = useMemo(() => stableCount(slug, 43, 8, 64), [slug]);
  const likeCount = baseLikes + (liked ? 1 : 0);
  const saveCount = baseSaves + (saved ? 1 : 0);
  const className = useMemo(() => `tool-engagement ${variant === "detail" ? "detail" : ""}`, [variant]);

  function update(nextState: EngagementState) {
    setState(nextState);
    writeState(nextState);
  }

  return (
    <div className={className} aria-label="Tool actions">
      <button
        className={`tool-action ${liked ? "active like" : ""}`}
        type="button"
        aria-pressed={liked}
        aria-label={`${liked ? "Unlike" : "Like"} this tool, ${likeCount} likes`}
        onClick={() => update({ ...state, liked: toggleValue(state.liked, slug) })}
      >
        <span className="tool-action-icon" aria-hidden="true">{liked ? "♥" : "♡"}</span>
        <span className="tool-action-count">{likeCount}</span>
      </button>
      <button
        className={`tool-action ${saved ? "active save" : ""}`}
        type="button"
        aria-pressed={saved}
        aria-label={`${saved ? "Unsave" : "Save"} this tool, ${saveCount} saves`}
        onClick={() => update({ ...state, saved: toggleValue(state.saved, slug) })}
      >
        <span className="tool-action-icon" aria-hidden="true">{saved ? "★" : "☆"}</span>
        <span className="tool-action-count">{saveCount}</span>
      </button>
    </div>
  );
}
