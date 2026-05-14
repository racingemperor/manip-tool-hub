"use client";

import { useState } from "react";

const detailLinks = [
  ["Overview", "#overview"],
  ["Paper", "#paper"],
  ["Demo", "#demo"],
  ["API", "#api"],
  ["Benchmark", "#benchmark"],
  ["Related", "#related"],
  ["Metadata", "#metadata"]
];

export function FloatingLinks() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`floating-nav ${open ? "open" : ""}`} aria-label="Tool detail links" onMouseLeave={() => setOpen(false)}>
      <button className="floating-tab" type="button" onMouseEnter={() => setOpen(true)} onFocus={() => setOpen(true)}>
        Links
      </button>
      <div className="floating-panel">
        <div className="card link-card">
          <h2>Links</h2>
          <p className="muted">Jump to detail sections.</p>
          <div className="link-list primary-links">
            {detailLinks.map(([label, href]) => (
              <a href={href} key={href}>{label}<span>Go</span></a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
