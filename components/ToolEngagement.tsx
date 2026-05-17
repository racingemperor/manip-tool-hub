"use client";

import { useEffect, useMemo, useState } from "react";
import { emptyEngagementState, readEngagementState, toggleEngagementValue, writeEngagementState, type EngagementState } from "@/lib/engagement";

type ToolEngagementProps = {
  slug: string;
  variant?: "card" | "detail";
};

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.4 4.9 13.8a4.8 4.8 0 0 1-.3-6.8 4.8 4.8 0 0 1 6.8-.3l.6.6.6-.6a4.8 4.8 0 0 1 6.8.3 4.8 4.8 0 0 1-.3 6.8Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3.8 2.5 5.1 5.6.8-4 3.9.9 5.5-5-2.6-5 2.6.9-5.5-4-3.9 5.6-.8Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolEngagement({ slug, variant = "card" }: ToolEngagementProps) {
  const [state, setState] = useState<EngagementState>(emptyEngagementState());
  const [changedAction, setChangedAction] = useState<"like" | "save" | null>(null);

  useEffect(() => {
    setState(readEngagementState());
  }, []);

  const liked = state.liked.includes(slug);
  const saved = state.saved.includes(slug);
  const likeCount = liked ? 1 : 0;
  const saveCount = saved ? 1 : 0;
  const className = useMemo(() => `tool-engagement ${variant === "detail" ? "detail" : ""}`, [variant]);

  function update(nextState: EngagementState, action: "like" | "save") {
    setState(nextState);
    writeEngagementState(nextState);
    setChangedAction(action);
    window.setTimeout(() => setChangedAction(null), 220);
  }

  return (
    <div className={className} aria-label="Tool actions">
      <button
        className={`tool-action ${liked ? "active like" : ""} ${changedAction === "like" ? "changed" : ""}`}
        type="button"
        aria-pressed={liked}
        aria-label={`${liked ? "Unlike" : "Like"} this tool, ${likeCount} likes`}
        onClick={() => update({ ...state, liked: toggleEngagementValue(state.liked, slug) }, "like")}
      >
        <span className="tool-action-icon" aria-hidden="true"><HeartIcon active={liked} /></span>
        <span className="tool-action-count">{likeCount}</span>
      </button>
      <button
        className={`tool-action ${saved ? "active save" : ""} ${changedAction === "save" ? "changed" : ""}`}
        type="button"
        aria-pressed={saved}
        aria-label={`${saved ? "Unsave" : "Save"} this tool, ${saveCount} saves`}
        onClick={() => update({ ...state, saved: toggleEngagementValue(state.saved, slug) }, "save")}
      >
        <span className="tool-action-icon" aria-hidden="true"><StarIcon active={saved} /></span>
        <span className="tool-action-count">{saveCount}</span>
      </button>
    </div>
  );
}
