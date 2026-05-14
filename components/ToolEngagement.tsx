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

export function ToolEngagement({ slug, variant = "card" }: ToolEngagementProps) {
  const [state, setState] = useState<EngagementState>({ liked: [], saved: [] });

  useEffect(() => {
    setState(readState());
  }, []);

  const liked = state.liked.includes(slug);
  const saved = state.saved.includes(slug);
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
        onClick={() => update({ ...state, liked: toggleValue(state.liked, slug) })}
      >
        <span aria-hidden="true">+</span>
        <span>{liked ? "Liked" : "Like"}</span>
      </button>
      <button
        className={`tool-action ${saved ? "active save" : ""}`}
        type="button"
        aria-pressed={saved}
        onClick={() => update({ ...state, saved: toggleValue(state.saved, slug) })}
      >
        <span aria-hidden="true">*</span>
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
    </div>
  );
}
