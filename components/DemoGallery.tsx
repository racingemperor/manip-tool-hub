"use client";

import { useEffect, useMemo, useState } from "react";
import type { ToolDemo } from "@/data/tools";
import { assetPath } from "@/lib/assets";

type DemoGalleryProps = {
  demos: ToolDemo[];
};

export function DemoGallery({ demos }: DemoGalleryProps) {
  const imageDemos = useMemo(() => demos.filter((demo) => demo.image), [demos]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const activeDemo = activeIndex === null ? null : imageDemos[activeIndex];

  useEffect(() => {
    setPreviewIndex((index) => Math.min(index, Math.max(0, imageDemos.length - 1)));
  }, [imageDemos.length]);

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

  function openDemo(demo: ToolDemo) {
    const index = imageDemos.findIndex((item) => item.image === demo.image && item.label === demo.label);
    if (index >= 0) setActiveIndex(index);
  }

  function shift(delta: number) {
    setActiveIndex((index) => index === null ? null : (index + delta + imageDemos.length) % imageDemos.length);
  }

  function shiftPreview(delta: number) {
    setPreviewIndex((index) => (index + delta + imageDemos.length) % imageDemos.length);
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
      <div className="demo-carousel">
        <div className="demo-stage">
          {imageDemos.length > 1 ? (
            <button className="demo-nav prev" type="button" onClick={() => shiftPreview(-1)} aria-label="Previous demo image">
              Previous
            </button>
          ) : null}
          <div className="demo-viewport">
            <div className="demo-track" style={{ transform: `translateX(-${previewIndex * 100}%)` }}>
              {imageDemos.map((demo, index) => (
                <button
                  className="demo-slide"
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
          </div>
          {imageDemos.length > 1 ? (
            <button className="demo-nav next" type="button" onClick={() => shiftPreview(1)} aria-label="Next demo image">
              Next
            </button>
          ) : null}
        </div>

        {imageDemos.length > 1 ? (
          <div className="demo-carousel-footer">
            <span className="demo-count">{previewIndex + 1} / {imageDemos.length}</span>
            <div className="demo-thumbs" aria-label="Demo image thumbnails">
              {imageDemos.map((demo, index) => (
                <button
                  className={`demo-thumb-button ${index === previewIndex ? "active" : ""}`}
                  key={`${demo.label}-thumb-${index}`}
                  style={{ backgroundImage: demoBackground(demo), backgroundPosition: demo.position || "center" }}
                  type="button"
                  aria-label={`Show demo image ${index + 1}: ${demo.label}`}
                  aria-current={index === previewIndex ? "true" : undefined}
                  onClick={() => setPreviewIndex(index)}
                />
              ))}
            </div>
          </div>
        ) : null}
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
