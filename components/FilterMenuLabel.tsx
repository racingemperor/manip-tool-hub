export type FilterIconName =
  | "all"
  | "docs"
  | "code"
  | "run"
  | "verified"
  | "paper"
  | "image"
  | "api"
  | "benchmark"
  | "hotness"
  | "speed"
  | "artifacts";

export function FilterIcon({ name }: { name: FilterIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9
  };

  return (
    <svg className="filter-menu-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "all" ? (
        <path {...common} d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z" />
      ) : null}
      {name === "docs" ? (
        <>
          <path {...common} d="M7 4h7l4 4v12H7z" />
          <path {...common} d="M14 4v5h5M9 13h6M9 16h5" />
        </>
      ) : null}
      {name === "code" ? (
        <>
          <path {...common} d="m9 8-4 4 4 4M15 8l4 4-4 4M13 6l-2 12" />
        </>
      ) : null}
      {name === "run" ? <path {...common} d="M8 5v14l11-7z" /> : null}
      {name === "verified" ? (
        <>
          <path {...common} d="M12 3 5 6v5c0 4.2 2.7 8 7 10 4.3-2 7-5.8 7-10V6z" />
          <path {...common} d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      ) : null}
      {name === "paper" ? (
        <>
          <path {...common} d="M6 5h12v14H6z" />
          <path {...common} d="M9 8h6M9 11h6M9 14h4" />
        </>
      ) : null}
      {name === "image" ? (
        <>
          <path {...common} d="M5 6h14v12H5z" />
          <path {...common} d="m8 15 3-3 2 2 2-3 3 4" />
          <circle {...common} cx="9" cy="9" r="1.2" />
        </>
      ) : null}
      {name === "api" ? (
        <>
          <path {...common} d="M8 7h8M8 12h8M8 17h5" />
          <path {...common} d="M5 5v14M19 5v14" />
        </>
      ) : null}
      {name === "benchmark" ? (
        <>
          <path {...common} d="M5 19h14" />
          <path {...common} d="M8 19v-6M12 19V8M16 19v-9" />
          <path {...common} d="m9 7 3-3 3 3" />
        </>
      ) : null}
      {name === "hotness" ? (
        <>
          <path {...common} d="M12 20s6-3.3 6-8.2A3.8 3.8 0 0 0 12 8a3.8 3.8 0 0 0-6 3.8C6 16.7 12 20 12 20Z" />
        </>
      ) : null}
      {name === "speed" ? (
        <>
          <path {...common} d="M4 14a8 8 0 1 1 16 0" />
          <path {...common} d="m12 14 4-5M7 18h10" />
        </>
      ) : null}
      {name === "artifacts" ? (
        <>
          <path {...common} d="M12 3 4 7l8 4 8-4-8-4Z" />
          <path {...common} d="m4 12 8 4 8-4M4 16l8 4 8-4" />
        </>
      ) : null}
    </svg>
  );
}

export function FilterMenuLabel({ icon, label }: { icon: FilterIconName; label: string }) {
  return (
    <span className="filter-menu-label">
      <FilterIcon name={icon} />
      <span className="compact-select-text">{label}</span>
    </span>
  );
}
