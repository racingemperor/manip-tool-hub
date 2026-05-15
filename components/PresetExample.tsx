"use client";

import { useEffect, useState } from "react";
import type { ToolPresetExample } from "@/data/tools";
import { assetPath } from "@/lib/assets";

type PresetExampleProps = {
  example: ToolPresetExample;
};

export function PresetExample({ example }: PresetExampleProps) {
  const [open, setOpen] = useState(false);
  const imageUrl = example.image ? assetPath(example.image) : undefined;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const backgroundImage = imageUrl
    ? `linear-gradient(135deg, rgba(17, 24, 39, 0.18), rgba(53, 98, 255, 0.06)), url('${imageUrl}')`
    : undefined;

  return (
    <>
      <article className="preset-card">
        <button
          className={`preset-visual ${imageUrl ? "image clickable" : ""}`}
          style={backgroundImage ? { backgroundImage } : undefined}
          type="button"
          onClick={() => imageUrl && setOpen(true)}
          disabled={!imageUrl}
          aria-label={imageUrl ? `Open full preset example image: ${example.title}` : undefined}
        >
          <span>{example.title}</span>
        </button>
        <div className="preset-copy">
          <div className="field-list">
            <div className="field-row"><span>Input</span><strong>{example.input}</strong></div>
            {example.prompt ? <div className="field-row"><span>Prompt</span><strong>{example.prompt}</strong></div> : null}
            <div className="field-row"><span>Expected</span><strong>{example.expectedOutput}</strong></div>
          </div>
          <button className="btn primary quick-run" type="button" disabled>{example.runLabel || "Quick Run"}</button>
        </div>
      </article>

      {open && imageUrl ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={example.title}>
          <button className="lightbox-backdrop" type="button" aria-label="Close image viewer" onClick={() => setOpen(false)} />
          <div className="lightbox-panel">
            <div className="lightbox-head">
              <div>
                <strong>{example.title}</strong>
                <span>Preset Example</span>
              </div>
              <button className="lightbox-close" type="button" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="lightbox-image-wrap">
              <img src={imageUrl} alt={example.title} />
            </div>
            <div className="lightbox-actions">
              <a className="btn primary" href={imageUrl} target="_blank" rel="noreferrer">Open Original</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
