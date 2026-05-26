import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { realTools, toolCategories, tools } from "@/data/tools";
import { categoryVisuals, toneClass } from "@/lib/categoryVisuals";

type ExploreTone = "amber" | "indigo" | "violet" | "emerald" | "sky" | "rose" | "teal";

const categoryCopy = {
  "Perception and Grounding": {
    text: "Detection, segmentation, depth, spatial localization, and language-vision grounding.",
    chips: ["YOLO-World", "LINGO-Space"]
  },
  "Cognition and State Modeling": {
    text: "Scene graphs, odometry, mapping, memory, relations, and internal state.",
    chips: ["Hydra", "FAST-LIVO2"]
  },
  "Reasoning and Planning": {
    text: "Goal reasoning, motion planning, action selection, verification, and replanning.",
    chips: ["OMPL", "VIRF"]
  },
  "Execution and Control": {
    text: "Grasp planning, navigation control, trajectory generation, monitoring, and actuation.",
    chips: ["AnyGrasp", "Ruckig"]
  }
} as const;

const shortcuts = [
  { q: "detection", badge: "Grounding", title: "Find open-vocabulary detectors", text: "Text-prompted detection and flexible vocabularies.", metric: "AP / FPS", tone: "emerald" },
  { q: "segmentation", badge: "Segmentation", title: "Find mask and tracking tools", text: "Promptable segmentation and video masks.", metric: "J&F / AR", tone: "indigo" },
  { q: "mapping", badge: "Mapping", title: "Find state and mapping tools", text: "SLAM, odometry, scene graphs, and reconstruction.", metric: "RMSE / ms", tone: "sky" }
] satisfies Array<{ q: string; badge: string; title: string; text: string; metric: string; tone: ExploreTone }>;

const startingPoints = [
  {
    href: "/tools/yolo-world",
    badge: "35.4 AP",
    title: "YOLO-World",
    text: "Open-vocabulary detection for prompt-driven perception.",
    action: "Open detail",
    tone: "emerald"
  },
  {
    href: "/tools/fast-livo2",
    badge: "30.03 ms",
    title: "FAST-LIVO2",
    text: "Real-time LiDAR-inertial-visual odometry.",
    action: "Open detail",
    tone: "sky"
  },
  {
    href: "/leaderboard",
    badge: "Benchmarks",
    title: "Compare real metrics",
    text: "Review source-reported metrics by category.",
    action: "Open Leaderboard",
    tone: "amber",
    badgeVariant: "green"
  }
] satisfies Array<{ href: string; badge: string; title: string; text: string; action: string; tone: ExploreTone; badgeVariant?: "green" }>;

export default function ExplorePage() {
  return (
    <SiteShell>
      <section>
        <div className="section-head">
          <div>
            <h2>Explore</h2>
            <p>Find tools by category, task, or benchmark signal.</p>
          </div>
        </div>

        <div className="explore-layout">
          <div className="section">
            <div className="section-head">
              <div>
                <h2>Popular Tool Categories</h2>
                <p>Jump into matching capability groups.</p>
              </div>
            </div>
            <div className="explore-grid">
              {toolCategories.map((category) => {
                const count = tools.filter((tool) => tool.category === category).length;
                const isTemplateOnly = realTools.every((tool) => tool.category !== category);
                const copy = categoryCopy[category];
                return (
                  <Link className={`explore-card color-fill-card ${toneClass(categoryVisuals[category].tone)}`} href={`/tools?category=${encodeURIComponent(category)}`} key={category}>
                    <div>
                      <span className={`badge ${isTemplateOnly ? "" : "blue"}`}>{isTemplateOnly ? "Template" : `${count} tools`}</span>
                      <h3>{category}</h3>
                      <p>{copy.text}</p>
                    </div>
                    <div className="meta-row">
                      {copy.chips.map((chip) => <span className="badge" key={chip}>{chip}</span>)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="section">
            <div className="section-head">
              <div>
                <h2>Task Shortcuts</h2>
                <p>Search by task.</p>
              </div>
            </div>
            <div className="explore-row">
              {shortcuts.map((item) => (
                <Link className={`explore-card color-fill-card ${toneClass(item.tone)}`} href={`/tools?q=${encodeURIComponent(item.q)}`} key={item.q}>
                  <div>
                    <span className="badge blue">{item.badge}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <div className="meta-row"><span className="badge">{item.metric}</span></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="section-head">
              <div>
                <h2>Featured Starting Points</h2>
                <p>Representative tools and benchmark entries.</p>
              </div>
            </div>
            <div className="explore-row">
              {startingPoints.map((item) => (
                <Link className={`explore-card color-fill-card ${toneClass(item.tone)}`} href={item.href} key={item.href}>
                  <div>
                    <span className={`badge ${item.badgeVariant ?? "blue"}`}>{item.badge}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <div className="meta-row"><span className="badge">{item.action}</span></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
