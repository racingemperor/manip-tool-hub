"use client";

import { useEffect, useMemo, useState } from "react";
import type { ToolDemo } from "@/data/tools";
import { assetPath } from "@/lib/assets";

type DemoGalleryProps = {
  demos: ToolDemo[];
};

export function DemoGallery({ demos }: DemoGalleryProps) {
  const imageDemos = useMemo(() => {
    const seen = new Set<string>();
    return demos.filter((demo) => {
      if (!demo.image) return false;
      const key = demo.image.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [demos]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeDemo = activeIndex === null ? null : imageDemos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % imageDemos.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + imageDemos.length) % imageDemos.length);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, imageDemos.length]);

  function shift(delta: number) {
    setActiveIndex((index) => index === null ? null : (index + delta + imageDemos.length) % imageDemos.length);
  }

  function demoBackground(demo: ToolDemo) {
    return demo.image
      ? `linear-gradient(135deg, rgba(16, 24, 40, 0.22), rgba(53, 98, 255, 0.08)), url('${assetPath(demo.image)}')`
      : undefined;
  }

  if (!imageDemos.length) {
    return (
      <div className="demo-empty-grid">
        {demos.map((demo, index) => (
          <div className="demo-slot" key={`${demo.label}-${index}`}>
            <span>{demo.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="demo-scroll" aria-label="Demo images">
        {imageDemos.map((demo, index) => (
          <button
            className="demo-scroll-card"
            key={`${demo.label}-${index}`}
            style={{ backgroundImage: demoBackground(demo), backgroundPosition: demo.position || "center" }}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open full image: ${demo.label}`}
          >
            <span>{demo.label}</span>
          </button>
        ))}
      </div>

      {activeDemo?.image ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={activeDemo.label}>
          <button className="lightbox-backdrop" type="button" aria-label="Close image viewer" onClick={() => setActiveIndex(null)} />
          <div className="lightbox-panel">
            <div className="lightbox-head">
              <div>
                <strong>{activeDemo.label}</strong>
                <span>{activeIndex! + 1} / {imageDemos.length}</span>
              </div>
              <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)}>Close</button>
            </div>
            <div className="lightbox-image-wrap">
              <img src={assetPath(activeDemo.image)} alt={activeDemo.label} />
            </div>
            {imageDemos.length > 1 ? (
              <div className="lightbox-actions">
                <button className="btn" type="button" onClick={() => shift(-1)}>Previous</button>
                <a className="btn primary" href={assetPath(activeDemo.image)} target="_blank" rel="noreferrer">Open Original</a>
                <button className="btn" type="button" onClick={() => shift(1)}>Next</button>
              </div>
            ) : (
              <div className="lightbox-actions">
                <a className="btn primary" href={assetPath(activeDemo.image)} target="_blank" rel="noreferrer">Open Original</a>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
