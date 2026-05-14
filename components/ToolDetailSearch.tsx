"use client";

import { useMemo, useState } from "react";

export type ToolDetailSearchEntry = {
  title: string;
  section: string;
  href: string;
  text: string;
};

type ToolDetailSearchProps = {
  entries: ToolDetailSearchEntry[];
};

function matchesQuery(entry: ToolDetailSearchEntry, normalized: string) {
  const haystack = `${entry.title} ${entry.section} ${entry.text}`.toLowerCase();
  return normalized.split(/\s+/).every((term) => haystack.includes(term));
}

export function ToolDetailSearch({ entries }: ToolDetailSearchProps) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalized) return [];
    return entries.filter((entry) => matchesQuery(entry, normalized)).slice(0, 8);
  }, [entries, normalized]);

  return (
    <div className="detail-search">
      <input
        aria-label="Search within this tool"
        placeholder="Search this tool"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className={`global-search-results ${normalized ? "active" : ""}`}>
        {normalized && matches.length === 0 ? (
          <button type="button">
            <strong>No matching content</strong>
            <span>Search this tool&apos;s paper, demos, API notes, benchmark, or metadata.</span>
          </button>
        ) : null}
        {matches.map((entry) => (
          <a
            href={entry.href}
            key={`${entry.href}-${entry.title}`}
            className="search-result-link"
            onClick={() => setQuery("")}
          >
            <strong>{entry.title}</strong>
            <span>{entry.section}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
