import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { leaderboardRows } from "@/data/leaderboard";
import { realTools, toolCategories, type ToolCategory } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import { categoryShortLabel, toolHeroPosition } from "@/lib/tools";

type HomeTone = "amber" | "indigo" | "violet" | "emerald" | "sky" | "rose" | "teal";
type HomeIconName = "dataset" | "leaderboard" | "tools" | "explore" | "perception" | "cognition" | "reasoning" | "execution";

const modules = [
  { href: "/datasets", icon: "dataset", tone: "teal", title: "Dataset Library", text: "Dataset entries and download links." },
  { href: "/leaderboard", icon: "leaderboard", tone: "amber", title: "Leaderboard", text: "Benchmark metrics by category." },
  { href: "/tools", icon: "tools", tone: "indigo", title: "Tools", text: "Capability-based tool catalog." },
  { href: "/explore", icon: "explore", tone: "violet", title: "Explore", text: "Task-based discovery shortcuts." }
] satisfies Array<{ href: string; icon: HomeIconName; tone: HomeTone; title: string; text: string }>;

const categoryVisuals = {
  "Perception and Grounding": { icon: "perception", tone: "emerald" },
  "Cognition and State Modeling": { icon: "cognition", tone: "sky" },
  "Reasoning and Planning": { icon: "reasoning", tone: "violet" },
  "Execution and Control": { icon: "execution", tone: "rose" }
} satisfies Record<ToolCategory, { icon: HomeIconName; tone: HomeTone }>;

function HomeIcon({ name }: { name: HomeIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9
  };

  return (
    <svg className="home-entry-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {name === "dataset" ? (
        <>
          <ellipse {...common} cx="16" cy="8" rx="9" ry="4" />
          <path {...common} d="M7 8v8c0 2.2 4 4 9 4s9-1.8 9-4V8" />
          <path {...common} d="M7 16v8c0 2.2 4 4 9 4s9-1.8 9-4v-8" />
        </>
      ) : null}
      {name === "leaderboard" ? (
        <>
          <path {...common} d="M7 25h18" />
          <path {...common} d="M10 25V14h4v11" />
          <path {...common} d="M18 25V8h4v17" />
          <path {...common} d="M12 10l4-5 4 5" />
        </>
      ) : null}
      {name === "tools" ? (
        <>
          <path {...common} d="M12 7l4 4-8 8-4 1 1-4 8-8Z" />
          <path {...common} d="M18 9l5-5 5 5-5 5" />
          <path {...common} d="M17 20l4 4" />
          <path {...common} d="M21 20l-4 4" />
        </>
      ) : null}
      {name === "explore" ? (
        <>
          <circle {...common} cx="16" cy="16" r="10" />
          <path {...common} d="M20 12l-2.4 5.6L12 20l2.4-5.6L20 12Z" />
          <path {...common} d="M16 3v3M16 26v3M3 16h3M26 16h3" />
        </>
      ) : null}
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

function homeToneClass(tone: HomeTone) {
  return `tone-${tone}`;
}

const featuredTools = realTools.filter((tool) => tool.heroImage).slice(0, 4);
const benchmarkHighlights = leaderboardRows.filter((row) => row.rankOrder <= 2).slice(0, 4);

export default function HomePage() {
  const capabilityCoverage = toolCategories.map((category) => {
    const entries = realTools.filter((tool) => tool.category === category);
    return {
      category,
      entries,
      href: `/tools?category=${encodeURIComponent(category)}`
    };
  });

  return (
    <SiteShell>
      <section>
        <div className="hero">
          <div className="eyebrow">Embodied Tools</div>
          <h1>Find datasets, compare tools, and pick capabilities by task.</h1>
          <p>
            A standardized tool extension and management framework for embodied intelligence, by encapsulating heterogeneous perception, control and physical constraint modules, endows the visual language model (VLM) with high robustness, reliability and real-time closed-loop decision-making and execution capabilities in complex physical interactions.
          </p>
        </div>

        <div className="section">
          <div className="section-head">
            <div>
              <h2>Core Modules</h2>
              <p>Browse the platform by dataset, benchmark, tool, or task.</p>
            </div>
          </div>
          <div className="module-strip">
            {modules.map((item) => (
              <Link className={`module-tile color-fill-card ${homeToneClass(item.tone)}`} href={item.href} key={item.href}>
                <div className="home-entry-icon-wrap">
                  <HomeIcon name={item.icon} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <div>
              <h2>Featured Tools</h2>
              <p>Representative entries with source images, paper context, demos, and implementation links.</p>
            </div>
            <Link className="btn" href="/tools">All Tools</Link>
          </div>
          <div className="home-overview">
            <div className="home-spotlight-grid">
              {featuredTools.map((tool, index) => {
                const backgroundImage = tool.heroImage
                  ? `linear-gradient(135deg, rgba(17, 24, 39, 0.76), rgba(53, 98, 255, 0.22)), url('${assetPath(tool.heroImage)}')`
                  : undefined;
                const backgroundPosition = toolHeroPosition(tool);
                return (
                  <Link
                    className={`home-tool-card ${index === 0 ? "large" : ""}`}
                    href={`/tools/${tool.slug}`}
                    key={tool.slug}
                    style={backgroundImage ? { backgroundImage, backgroundPosition } : undefined}
                  >
                    <span className="badge">{categoryShortLabel(tool.category, tool.task)}</span>
                    <div>
                      <strong>{tool.title}</strong>
                      <p>{tool.summary}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <aside className="home-benchmark-panel">
              <div>
                <span className="eyebrow">Benchmark Snapshot</span>
                <h3>Current Evaluation Signals</h3>
                <p>Compact source-reported numbers used by the leaderboard.</p>
              </div>
              <div className="home-benchmark-list">
                {benchmarkHighlights.map((row) => (
                  <Link className="home-benchmark-row" href={`/tools/${row.slug}`} key={row.slug}>
                    <span>{row.name}</span>
                    <strong>{row.scoreLabel}</strong>
                    <small>{row.task}</small>
                  </Link>
                ))}
              </div>
              <Link className="home-panel-link" href="/leaderboard">Open Leaderboard</Link>
            </aside>
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <div>
              <h2>Capability Coverage</h2>
              <p>Tools are organized by embodied-intelligence capability so new entries stay easy to scan.</p>
            </div>
          </div>
          <div className="home-category-map">
            {capabilityCoverage.map(({ category, entries, href }) => (
              <Link className={`home-category-card color-fill-card ${homeToneClass(categoryVisuals[category].tone)}`} href={href} key={category}>
                <div className="home-category-head">
                  <div className="home-entry-icon-wrap">
                    <HomeIcon name={categoryVisuals[category].icon} />
                  </div>
                  <span className="home-category-count">{entries.length || "Ready"}</span>
                </div>
                <div>
                  <h3>{category}</h3>
                  <p>
                    {entries.length
                      ? entries.slice(0, 3).map((tool) => tool.title).join(" / ")
                      : "Template slot ready for the next tool entry."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
