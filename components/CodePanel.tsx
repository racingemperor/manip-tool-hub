"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

type CodePanelProps = {
  code: string;
  previewLines?: number;
  previewChars?: number;
  equalPreviewHeight?: boolean;
  previewHeightPx?: number;
  expandLabel?: string;
  collapseLabel?: string;
};

export function CodePanel({
  code,
  previewLines = 5,
  previewChars = 560,
  equalPreviewHeight = false,
  previewHeightPx,
  expandLabel = "Read full code",
  collapseLabel = "Show less code"
}: CodePanelProps) {
  const [expanded, setExpanded] = useState(false);
  const lineCount = code.split(/\r\n|\r|\n/).length;
  const isLong = lineCount > previewLines || code.length > previewChars;
  const previewHeight = `${previewHeightPx ?? Math.max(96, previewLines * 18 + 24)}px`;
  const style = { "--code-preview-height": previewHeight } as CSSProperties;

  return (
    <div
      className={`doc-code ${isLong ? "collapsible" : ""} ${equalPreviewHeight ? "equal-preview" : ""} ${expanded ? "expanded" : ""}`}
      style={style}
    >
      <pre className="api-block">{code}</pre>
      {isLong ? (
        <button
          className="doc-toggle"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </div>
  );
}
