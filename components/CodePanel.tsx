"use client";

import { useState } from "react";

export function CodePanel({ code }: { code: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`doc-code ${expanded ? "expanded" : ""}`}>
      <pre className="api-block">{code}</pre>
      <button className="doc-toggle" type="button" onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Collapse code" : "Expand code"}
      </button>
    </div>
  );
}
