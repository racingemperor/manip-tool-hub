"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type KeyboardEvent } from "react";
import { tools } from "@/data/tools";
import { searchHaystack } from "@/lib/tools";

type SearchBoxProps = {
  className?: string;
  placeholder?: string;
};

export function SearchBox({ className = "search", placeholder = "Search tools" }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalized) return [];
    return tools
      .filter((tool) => searchHaystack(tool).includes(normalized))
      .slice(0, 8);
  }, [normalized]);

  function updateQuery(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function openActiveResult() {
    const activeTool = matches[activeIndex] || matches[0];
    if (!activeTool) return;
    setQuery("");
    setFocused(false);
    router.push(`/tools/${activeTool.slug}`);
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
      openActiveResult();
    }
  }

  return (
    <div
      className={className}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onFocus={() => setFocused(true)}
    >
      <input
        aria-label="Search tools"
        aria-expanded={Boolean(normalized && focused)}
        aria-controls="global-tool-search-results"
        placeholder={placeholder}
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className={`global-search-results ${normalized && focused ? "active" : ""}`}
        id="global-tool-search-results"
        role="listbox"
      >
        {normalized && matches.length === 0 ? (
          <div className="search-empty-note">
            <strong>No matching tools</strong>
            <span>Search by tool name, task, category, description, input, output, paper, or code keyword.</span>
          </div>
        ) : null}
        {matches.map((tool, index) => (
          <Link
            href={`/tools/${tool.slug}`}
            key={tool.slug}
            className={`search-result-link ${index === activeIndex ? "active" : ""}`}
            role="option"
            aria-selected={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setQuery("");
              setFocused(false);
            }}
          >
            <strong>{tool.title}</strong>
            <span>{tool.category} / {tool.task}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
