"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { toolCategories, tools, type ToolCategory } from "@/data/tools";
import { capabilityLabelForCategory, getToolResources, searchHaystack } from "@/lib/tools";
import { CapabilityLabel } from "./CapabilityLabel";
import { CompactSelect, type CompactSelectOption } from "./CompactSelect";
import { ToolCard } from "./ToolCard";

const pageSize = 8;
type PaginationItem = number | "ellipsis";
type CategoryFilter = ToolCategory | "All";
const readinessOrder = ["Docs Ready", "Code Linked", "Runnable", "Verified"] as const;

function PageArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg className="page-arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={direction === "previous" ? "M15 18 9 12l6-6" : "m9 6 6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function categoryButtonLabel(category: CategoryFilter, count: number) {
  if (category === "All") return `All Tools (${tools.length})`;
  return `${category} (${count})`;
}

export function ToolRegistry() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [status, setStatus] = useState("All");
  const [resource, setResource] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [page, setPage] = useState(1);
  const [jumpValue, setJumpValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextCategory = params.get("category");
    const nextQuery = params.get("q");
    if (nextCategory === "All" || toolCategories.includes(nextCategory as ToolCategory)) setCategory(nextCategory as CategoryFilter);
    if (nextQuery) setQuery(nextQuery);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, status, resource, query]);

  const filteredTools = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const matchesStatus = status === "All" || tool.status === status;
      const matchesResource = resource === "All" || getToolResources(tool).includes(resource);
      const matchesQuery = !normalized || searchHaystack(tool).includes(normalized);
      return matchesCategory && matchesStatus && matchesResource && matchesQuery;
    });
  }, [category, status, resource, deferredQuery]);

  const counts = useMemo(() => {
    return Object.fromEntries(
      toolCategories.map((item) => [item, tools.filter((tool) => tool.category === item).length])
    );
  }, []);
  const categoryOptions = useMemo<Array<{ value: CategoryFilter; label: string; count: number }>>(() => [
    { value: "All", label: `All Tools (${tools.length})`, count: tools.length },
    ...toolCategories.map((item) => ({ value: item, label: item, count: counts[item] }))
  ], [counts]);
  const statusCounts = useMemo(() => {
    return Object.fromEntries(
      readinessOrder.map((item) => [item, tools.filter((tool) => tool.status === item).length])
    );
  }, []);
  const statusOptions: CompactSelectOption[] = [
    { value: "All", label: "All readiness levels" },
    ...readinessOrder
      .filter((item) => statusCounts[item] > 0)
      .map((item) => ({ value: item, label: item, count: statusCounts[item] }))
  ];
  const resourceOptions: CompactSelectOption[] = [
    { value: "All", label: "All resources" },
    { value: "Paper", label: "Paper" },
    { value: "Demo images", label: "Demo images" },
    { value: "API docs", label: "Code docs" },
    { value: "Benchmark", label: "Benchmark" }
  ];
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

  function goToPage(nextPage: number, scroll = true) {
    setPage(Math.min(totalPages, Math.max(1, nextPage)));
    if (scroll) {
      window.requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
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
        <CompactSelect
          ariaLabel="Tool category"
          className="tool-category-filter"
          value={category}
          options={categoryOptions}
          getButtonLabel={(option) => categoryButtonLabel(option.value as CategoryFilter, option.count ?? tools.length)}
          onChange={(value) => setCategory(value as CategoryFilter)}
          renderOption={(item) => (
            <>
              {item.value === "All" ? (
                <span className="compact-select-text">All Tools</span>
              ) : (
                <CapabilityLabel info={capabilityLabelForCategory(item.value as ToolCategory)} variant="menu" />
              )}
              <span className="compact-select-count">{item.count}</span>
            </>
          )}
        />
        <CompactSelect
          ariaLabel="Tool readiness"
          className="tool-status-filter"
          value={status}
          options={statusOptions}
          getButtonLabel={(option) => option.value === "All" ? "Readiness" : `Readiness: ${option.label}`}
          onChange={setStatus}
          renderOption={(item) => (
            <>
              <span className="compact-select-text">{item.label}</span>
              {typeof item.count === "number" ? <span className="compact-select-count">{item.count}</span> : null}
            </>
          )}
        />
        <CompactSelect ariaLabel="Tool resource" className="tool-resource-filter" value={resource} options={resourceOptions} onChange={setResource} />
      </div>

      <div className="tool-results-head" ref={resultsRef} aria-live="polite">
        <strong>{category === "All" ? "Current Tools" : category}</strong>
        <span>{filteredTools.length ? `${firstItem}-${lastItem} of ${filteredTools.length} tools` : "0 tools"}</span>
      </div>

      {filteredTools.length ? (
        <>
          <div className="model-grid" key={`${category}-${status}-${resource}-${deferredQuery}-${safePage}`}>
            {paginatedTools.map((tool) => <ToolCard tool={tool} key={tool.slug} />)}
          </div>
          {totalPages > 1 ? (
            <div className="tool-pagination" aria-label="Tool pagination">
              <div className="page-numbers" aria-label="Page numbers">
                <button
                  aria-label="Previous page"
                  className="page-arrow"
                  disabled={safePage <= 1}
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                >
                  <PageArrowIcon direction="previous" />
                </button>
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
                <button
                  aria-label="Next page"
                  className="page-arrow"
                  disabled={safePage >= totalPages}
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                >
                  <PageArrowIcon direction="next" />
                </button>
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
