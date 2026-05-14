"use client";

export function BackToTop() {
  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Top
    </button>
  );
}
