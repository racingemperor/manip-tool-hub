import type { CapabilityIconName, CapabilityLabelInfo } from "@/lib/tools";

function CapabilityIcon({ name }: { name: CapabilityIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9
  };

  return (
    <svg className="capability-label-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "box" ? (
        <>
          <path {...common} d="M6 6h12v12H6z" />
          <path {...common} d="M4 4h4M16 4h4M4 20h4M16 20h4M4 4v4M20 4v4M4 16v4M20 16v4" />
        </>
      ) : null}
      {name === "tag" ? (
        <>
          <path {...common} d="M4 6h8l8 8-6 6-8-8V6Z" />
          <circle {...common} cx="9" cy="10" r="1.5" />
        </>
      ) : null}
      {name === "mask" ? (
        <>
          <path {...common} d="M6 5h10l3 4-3 4H6L3 9l3-4Z" />
          <path {...common} d="M7 15h10M6 19h12" />
          <circle {...common} cx="9" cy="9" r="1.3" />
          <circle {...common} cx="15" cy="9" r="1.3" />
        </>
      ) : null}
      {name === "keypoint" ? (
        <>
          <circle {...common} cx="6" cy="7" r="2" />
          <circle {...common} cx="18" cy="7" r="2" />
          <circle {...common} cx="12" cy="17" r="2" />
          <path {...common} d="M8 7h8M7.5 8.6l3.2 6.5M16.5 8.6l-3.2 6.5" />
        </>
      ) : null}
      {name === "layers" ? (
        <>
          <path {...common} d="M12 3 3 8l9 5 9-5-9-5Z" />
          <path {...common} d="M5 12l7 4 7-4M5 16l7 4 7-4" />
        </>
      ) : null}
      {name === "depth" ? (
        <>
          <path {...common} d="M5 6h14v12H5z" />
          <path {...common} d="M8 15h8M9 12h6M10 9h4" />
        </>
      ) : null}
      {name === "image" ? (
        <>
          <path {...common} d="M5 5h14v14H5z" />
          <path {...common} d="M7 16l4-4 3 3 2-2 3 3" />
          <circle {...common} cx="9" cy="9" r="1.4" />
        </>
      ) : null}
      {name === "map" ? (
        <>
          <path {...common} d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" />
          <path {...common} d="M9 4v14M15 6v14" />
        </>
      ) : null}
      {name === "graph" ? (
        <>
          <circle {...common} cx="6" cy="7" r="2" />
          <circle {...common} cx="18" cy="7" r="2" />
          <circle {...common} cx="12" cy="18" r="2" />
          <path {...common} d="M8 8l3 8M16 8l-3 8M8 7h8" />
        </>
      ) : null}
      {name === "memory" ? (
        <>
          <path {...common} d="M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
          <path {...common} d="M9 9h6M9 13h6M9 17h4" />
        </>
      ) : null}
      {name === "route" ? (
        <>
          <circle {...common} cx="6" cy="6" r="2" />
          <circle {...common} cx="18" cy="18" r="2" />
          <path {...common} d="M8 6h5a3 3 0 0 1 0 6h-2a3 3 0 0 0 0 6h5" />
        </>
      ) : null}
      {name === "shield" ? (
        <>
          <path {...common} d="M12 3 19 6v6c0 4-2.7 7.2-7 9-4.3-1.8-7-5-7-9V6l7-3Z" />
          <path {...common} d="m9 12 2 2 4-5" />
        </>
      ) : null}
      {name === "robot" ? (
        <>
          <path {...common} d="M8 9h8v7H8z" />
          <path {...common} d="M12 5v4M7 12H4M20 12h-3M9 19h6" />
          <circle {...common} cx="10" cy="12" r="1" />
          <circle {...common} cx="14" cy="12" r="1" />
        </>
      ) : null}
      {name === "trajectory" ? (
        <>
          <path {...common} d="M4 17c5-10 11 4 16-6" />
          <path {...common} d="M15 7h5v5" />
          <circle {...common} cx="5" cy="17" r="1.6" />
          <circle {...common} cx="12" cy="13" r="1.6" />
        </>
      ) : null}
      {name === "control" ? (
        <>
          <path {...common} d="M6 6v12M12 4v16M18 7v10" />
          <path {...common} d="M4 14h4M10 9h4M16 12h4" />
        </>
      ) : null}
    </svg>
  );
}

export function CapabilityLabel({ info, variant = "light" }: { info: CapabilityLabelInfo; variant?: "light" | "dark" | "compact" | "menu" }) {
  return (
    <span className={`capability-label ${variant}`}>
      <CapabilityIcon name={info.icon} />
      <span className="capability-label-text">{info.label}</span>
    </span>
  );
}
