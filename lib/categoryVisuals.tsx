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
          <path {...common} d="M4.5 16s4.4-6.5 11.5-6.5S27.5 16 27.5 16 23.1 22.5 16 22.5 4.5 16 4.5 16Z" />
          <circle {...common} cx="16" cy="16" r="3.4" />
        </>
      ) : null}
      {name === "cognition" ? (
        <>
          <circle {...common} cx="16" cy="16" r="3.2" />
          <circle {...common} cx="8.5" cy="10.5" r="2.4" />
          <circle {...common} cx="23.5" cy="10.5" r="2.4" />
          <circle {...common} cx="10.5" cy="23" r="2.4" />
          <circle {...common} cx="21.5" cy="23" r="2.4" />
          <path {...common} d="M10.6 12 13.4 14M21.4 12 18.6 14M12.8 21.1l1.6-2.4M19.2 21.1l-1.6-2.4" />
        </>
      ) : null}
      {name === "reasoning" ? (
        <>
          <circle {...common} cx="8.5" cy="8.5" r="2.7" />
          <circle {...common} cx="23.5" cy="8.5" r="2.7" />
          <circle {...common} cx="16" cy="23.5" r="2.7" />
          <path {...common} d="M11.2 8.5h9.6M22.1 11 17.7 21M9.9 11l4.4 10" />
        </>
      ) : null}
      {name === "execution" ? (
        <>
          <path {...common} d="M6.5 25.5h11" />
          <path {...common} d="M11 25.5v-6" />
          <circle {...common} cx="11" cy="17.5" r="2.4" />
          <path {...common} d="M13 16.1 19.5 10" />
          <circle {...common} cx="20.8" cy="8.8" r="2.1" />
          <path {...common} d="M22.6 7.6 26 5M22.8 10.2l3.8 2" />
        </>
      ) : null}
    </svg>
  );
}
