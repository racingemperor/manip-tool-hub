import type { ToolCategory } from "@/data/tools";

export type CategoryTone = "emerald" | "sky" | "violet" | "rose";
export type CategoryIconName = "perception" | "cognition" | "reasoning" | "execution";

export const categoryVisuals = {
  "Perception and Grounding": { icon: "perception", tone: "emerald" },
  "Cognition and State Modeling": { icon: "cognition", tone: "sky" },
  "Reasoning and Planning": { icon: "reasoning", tone: "violet" },
  "Execution and Control": { icon: "execution", tone: "rose" }
} satisfies Record<ToolCategory, { icon: CategoryIconName; tone: CategoryTone }>;

export function toneClass(tone: string) {
  return `tone-${tone}`;
}

export function CategoryIcon({ name, className = "home-entry-icon" }: { name: CategoryIconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9
  };

  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {name === "perception" ? (
        <>
          <path {...common} d="M4 16s4.5-8 12-8 12 8 12 8-4.5 8-12 8S4 16 4 16Z" />
          <circle {...common} cx="16" cy="16" r="4" />
          <path {...common} d="M23 23l4 4" />
        </>
      ) : null}
      {name === "cognition" ? (
        <>
          <path {...common} d="M9 12a7 7 0 0 1 14 0v8a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5v-5" />
          <circle {...common} cx="12" cy="13" r="1.7" />
          <circle {...common} cx="20" cy="13" r="1.7" />
          <path {...common} d="M12 20h8M15 9V5M21 7l2-3M9 7l7 7" />
        </>
      ) : null}
      {name === "reasoning" ? (
        <>
          <path {...common} d="M7 8h8v8H7zM18 16h7v8h-7z" />
          <path {...common} d="M15 12h4a3 3 0 0 1 3 3v1" />
          <path {...common} d="M18 20h-4a3 3 0 0 1-3-3v-1" />
          <path {...common} d="M24 9l3 3-3 3M8 23l-3-3 3-3" />
        </>
      ) : null}
      {name === "execution" ? (
        <>
          <path {...common} d="M9 6v7M16 5v8M23 7v9" />
          <path {...common} d="M7 13h4l2 7 3-7h4l2 7 3-4" />
          <path {...common} d="M8 26h16" />
          <path {...common} d="M16 20v6" />
        </>
      ) : null}
    </svg>
  );
}
