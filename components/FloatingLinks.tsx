"use client";

import { useEffect, useRef, useState } from "react";

const detailLinks = [
  ["Overview", "#overview"],
  ["Paper", "#paper"],
  ["Demo", "#demo"],
  ["API", "#api"],
  ["Returns", "#code-docs"],
  ["Parameters", "#tool-contract"],
  ["Examples", "#test-examples"],
  ["Schema", "#returns-schema"],
  ["Tool JSON", "#tool-json"],
  ["Benchmark", "#benchmark"],
  ["Related", "#related"],
  ["Metadata", "#metadata"]
];

export function FloatingLinks() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function openPanel() {
    clearCloseTimer();
    setOpen(true);
  }

  function closePanelSoon() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 180);
  }

  useEffect(() => clearCloseTimer, []);

  return (
    <nav
      className={`floating-nav ${open ? "open" : ""}`}
      aria-label="Tool detail links"
      onMouseEnter={clearCloseTimer}
      onMouseLeave={closePanelSoon}
    >
      <button className="floating-tab" type="button" onMouseEnter={openPanel} onFocus={openPanel}>
        Links
      </button>
      <div className="floating-panel" onMouseEnter={clearCloseTimer}>
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
