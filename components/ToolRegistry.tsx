"use client";

import { useEffect, useMemo, useState } from "react";
import { toolCategories, tools } from "@/data/tools";
import { getToolResources, searchHaystack } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

export function ToolRegistry() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [resource, setResource] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextCategory = params.get("category");
    const nextQuery = params.get("q");
    if (nextCategory && ["All", ...toolCategories].includes(nextCategory)) setCategory(nextCategory);
    if (nextQuery) setQuery(nextQuery);
  }, []);

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const matchesStatus = status === "All" || tool.status === status;
      const matchesResource = resource === "All" || getToolResources(tool).includes(resource);
      const matchesQuery = !normalized || searchHaystack(tool).includes(normalized);
      return matchesCategory && matchesStatus && matchesResource && matchesQuery;
    });
  }, [category, status, resource, query]);

  const counts = useMemo(() => {
    return Object.fromEntries(
      toolCategories.map((item) => [item, tools.filter((tool) => tool.category === item).length])
    );
  }, []);

  return (
    <>
      <div className="tool-controls">
        <input
          className="tool-search"
          aria-label="Search tools"
          placeholder="Search tools or tasks"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="select tool-status-filter" aria-label="Tool status" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="All">All statuses</option>
          <option value="Draft">Draft</option>
          <option value="Docs Ready">Docs Ready</option>
          <option value="Code Linked">Code Linked</option>
          <option value="Runnable">Runnable</option>
          <option value="Verified">Verified</option>
        </select>
        <select className="select tool-resource-filter" aria-label="Tool resource" value={resource} onChange={(event) => setResource(event.target.value)}>
          <option value="All">All resources</option>
          <option value="Paper">Paper</option>
          <option value="Demo images">Demo images</option>
          <option value="API docs">Code docs</option>
          <option value="Benchmark">Benchmark</option>
        </select>
      </div>

      <div className="model-layout">
        <aside className="category-list" aria-label="Tool categories">
          <button className={category === "All" ? "active" : ""} type="button" onClick={() => setCategory("All")}>
            All Tools <span className="category-count">{tools.length}</span>
          </button>
          {toolCategories.map((item) => (
            <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
              <span>{item}</span>
              <span className="category-count">{counts[item]}</span>
            </button>
          ))}
        </aside>

        <div>
          <div className="tool-results-head">
            <span>Tool cards use compact metadata, benchmark signals, and detail links.</span>
            <span>{filteredTools.length} tools loaded</span>
          </div>

          {filteredTools.length ? (
            <div className="model-grid">
              {filteredTools.map((tool) => <ToolCard tool={tool} key={tool.slug} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div>
                <h2>No matching tools</h2>
                <p>Try a broader category, resource, status, or search phrase.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
