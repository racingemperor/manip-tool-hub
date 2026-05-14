"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tools } from "@/data/tools";
import { searchHaystack } from "@/lib/tools";

type SearchBoxProps = {
  className?: string;
  placeholder?: string;
};

export function SearchBox({ className = "search", placeholder = "Search tools" }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalized) return [];
    return tools
      .filter((tool) => searchHaystack(tool).includes(normalized))
      .slice(0, 8);
  }, [normalized]);

  return (
    <div className={className}>
      <input
        aria-label="Search tools"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className={`global-search-results ${normalized ? "active" : ""}`}>
        {normalized && matches.length === 0 ? (
          <button type="button">
            <strong>No matching tools</strong>
            <span>Search by tool name, task, category, description, input, output, paper, or code keyword.</span>
          </button>
        ) : null}
        {matches.map((tool) => (
          <Link
            href={`/tools/${tool.slug}`}
            key={tool.slug}
            className="search-result-link"
            onClick={() => setQuery("")}
          >
            <strong>{tool.title}</strong>
            <span>{tool.category} · {tool.task}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
