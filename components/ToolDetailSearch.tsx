"use client";

import { useMemo, useState, type KeyboardEvent, type MouseEvent } from "react";

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
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalized) return [];
    return entries.filter((entry) => matchesQuery(entry, normalized)).slice(0, 8);
  }, [entries, normalized]);

  function updateQuery(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function scrollToEntry(entry: ToolDetailSearchEntry) {
    setQuery("");
    setFocused(false);
    const target = document.querySelector(entry.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", entry.href);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setQuery("");
      setFocused(false);
      return;
    }
    if (!matches.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + matches.length) % matches.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      scrollToEntry(matches[activeIndex] || matches[0]);
    }
  }

  function handleResultClick(event: MouseEvent<HTMLAnchorElement>, entry: ToolDetailSearchEntry) {
    event.preventDefault();
    scrollToEntry(entry);
  }

  return (
    <div
      className="detail-search"
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onFocus={() => setFocused(true)}
    >
      <input
        aria-label="Search within this tool"
        aria-expanded={Boolean(normalized && focused)}
        aria-controls="tool-detail-search-results"
        placeholder="Search this tool"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className={`global-search-results ${normalized && focused ? "active" : ""}`}
        id="tool-detail-search-results"
        role="listbox"
      >
        {normalized && matches.length === 0 ? (
          <div className="search-empty-note">
            <strong>No matching content</strong>
            <span>Search this tool&apos;s intro, demo, usage links, citation, benchmark, or related sections.</span>
          </div>
        ) : null}
        {matches.map((entry, index) => (
          <a
            href={entry.href}
            key={`${entry.href}-${entry.title}`}
            className={`search-result-link ${index === activeIndex ? "active" : ""}`}
            role="option"
            aria-selected={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => handleResultClick(event, entry)}
          >
            <strong>{entry.title}</strong>
            <span>{entry.section}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
