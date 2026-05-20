import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { leaderboardRows } from "@/data/leaderboard";
import { realTools, toolCategories } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import { categoryShortLabel, toolHeroPosition } from "@/lib/tools";

const modules = [
  { href: "/datasets", number: "1", title: "Dataset Library", text: "Dataset entries and download links." },
  { href: "/leaderboard", number: "2", title: "Leaderboard", text: "Benchmark metrics by category." },
  { href: "/tools", number: "3", title: "Tools", text: "Capability-based tool catalog." },
  { href: "/explore", number: "4", title: "Explore", text: "Task-based discovery shortcuts." }
];

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
              <Link className="module-tile" href={item.href} key={item.href}>
                <div className="module-number">{item.number}</div>
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
              <Link className="home-category-card" href={href} key={category}>
                <div>
                  <span className="badge blue">{entries.length || "Ready"}</span>
                  <h3>{category}</h3>
                </div>
                <p>
                  {entries.length
                    ? entries.slice(0, 3).map((tool) => tool.title).join(" / ")
                    : "Template slot ready for the next tool entry."}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
