"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toolCategories, tools } from "@/data/tools";
import { getToolResources, searchHaystack } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

const pageSize = 8;
type PaginationItem = number | "ellipsis";

export function ToolRegistry() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [resource, setResource] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [jumpValue, setJumpValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextCategory = params.get("category");
    const nextQuery = params.get("q");
    if (nextCategory && ["All", ...toolCategories].includes(nextCategory)) setCategory(nextCategory);
    if (nextQuery) setQuery(nextQuery);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, status, resource, query]);

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
  const totalPages = Math.max(1, Math.ceil(filteredTools.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedTools = filteredTools.slice((safePage - 1) * pageSize, safePage * pageSize);
  const firstItem = filteredTools.length ? (safePage - 1) * pageSize + 1 : 0;
  const lastItem = Math.min(safePage * pageSize, filteredTools.length);
  const paginationItems = useMemo<PaginationItem[]>(() => {
    if (totalPages <= 8) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const pages = new Set<number>([1, totalPages]);
    if (safePage <= 5) {
      for (let item = 2; item <= 7; item += 1) pages.add(item);
    } else if (safePage >= totalPages - 4) {
      for (let item = totalPages - 6; item < totalPages; item += 1) pages.add(item);
    } else {
      for (let item = safePage - 2; item <= safePage + 2; item += 1) pages.add(item);
    }

    return [...pages].sort((a, b) => a - b).reduce<PaginationItem[]>((items, item, index, sorted) => {
      if (index > 0 && item - sorted[index - 1] > 1) items.push("ellipsis");
      items.push(item);
      return items;
    }, []);
  }, [safePage, totalPages]);

  function goToPage(nextPage: number) {
    setPage(Math.min(totalPages, Math.max(1, nextPage)));
  }

  function submitJump(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const nextPage = Number.parseInt(jumpValue, 10);
    if (Number.isFinite(nextPage)) goToPage(nextPage);
    setJumpValue("");
  }

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
        <select className="select tool-category-filter" aria-label="Tool category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="All">All categories ({tools.length})</option>
          {toolCategories.map((item) => (
            <option value={item} key={item}>{item} ({counts[item]})</option>
          ))}
        </select>
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

      <div className="tool-results-head">
        <span>{filteredTools.length ? `${firstItem}-${lastItem} of ${filteredTools.length} tools` : "0 tools"}</span>
      </div>

      {filteredTools.length ? (
        <>
          <div className="model-grid">
            {paginatedTools.map((tool) => <ToolCard tool={tool} key={tool.slug} />)}
          </div>
          {totalPages > 1 ? (
            <div className="tool-pagination" aria-label="Tool pagination">
              <div className="page-numbers" aria-label="Page numbers">
                {safePage > 1 ? (
                  <button className="page-next" type="button" onClick={() => goToPage(safePage - 1)}>
                    Previous
                  </button>
                ) : null}
                {paginationItems.map((item, index) => item === "ellipsis" ? (
                  <span className="page-ellipsis" key={`ellipsis-${index}`}>...</span>
                ) : (
                  <button
                    className={`page-number ${item === safePage ? "active" : ""}`}
                    type="button"
                    aria-current={item === safePage ? "page" : undefined}
                    key={item}
                    onClick={() => goToPage(item)}
                  >
                    {item}
                  </button>
                ))}
                {safePage < totalPages ? (
                  <button className="page-next" type="button" onClick={() => goToPage(safePage + 1)}>
                    Next
                  </button>
                ) : null}
              </div>
              <form className="page-jump" onSubmit={submitJump}>
                <span>Total {totalPages} pages / {filteredTools.length} tools, go to</span>
                <input
                  aria-label="Jump to page"
                  inputMode="numeric"
                  min={1}
                  max={totalPages}
                  pattern="[0-9]*"
                  type="number"
                  value={jumpValue}
                  onBlur={() => {
                    if (jumpValue) submitJump();
                  }}
                  onChange={(event) => setJumpValue(event.target.value)}
                />
                <span>page</span>
              </form>
            </div>
          ) : null}
        </>
      ) : (
        <div className="empty-state">
          <div>
            <h2>No matching tools</h2>
            <p>Try a broader category, resource, status, or search phrase.</p>
          </div>
        </div>
      )}
    </>
  );
}
