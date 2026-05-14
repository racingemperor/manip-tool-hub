import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { realTools, toolCategories, tools } from "@/data/tools";

const categoryCopy = {
  "Perception and Grounding": {
    text: "Detection, segmentation, depth, masks, and grasp perception.",
    chips: ["YOLO-World", "AnyGrasp"]
  },
  "Cognition and State Modeling": {
    text: "Scene graphs, odometry, RGB mapping, and 3D reconstruction.",
    chips: ["FAST-LIVO2", "DUSt3R"]
  },
  "Reasoning and Planning": {
    text: "Planning and long-horizon reasoning templates.",
    chips: ["Planning"]
  },
  "Execution and Control": {
    text: "Control and manipulation execution templates.",
    chips: ["Control"]
  }
} as const;

const shortcuts = [
  { q: "detection", badge: "Grounding", title: "Find open-vocabulary detectors", text: "Text-prompted detection and flexible vocabularies.", metric: "AP / FPS" },
  { q: "segmentation", badge: "Segmentation", title: "Find mask and tracking tools", text: "Promptable segmentation and video masks.", metric: "J&F / AR" },
  { q: "mapping", badge: "Mapping", title: "Find state and mapping tools", text: "SLAM, odometry, scene graphs, and reconstruction.", metric: "RMSE / ms" }
];

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
                  <Link className="explore-card" href={`/tools?category=${encodeURIComponent(category)}`} key={category}>
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
                <Link className="explore-card" href={`/tools?q=${encodeURIComponent(item.q)}`} key={item.q}>
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
              <Link className="explore-card" href="/tools/yolo-world">
                <div>
                  <span className="badge blue">35.4 AP</span>
                  <h3>YOLO-World</h3>
                  <p>Open-vocabulary detection for prompt-driven perception.</p>
                </div>
                <div className="meta-row"><span className="badge">Open detail</span></div>
              </Link>
              <Link className="explore-card" href="/tools/fast-livo2">
                <div>
                  <span className="badge blue">30.03 ms</span>
                  <h3>FAST-LIVO2</h3>
                  <p>Real-time LiDAR-inertial-visual odometry.</p>
                </div>
                <div className="meta-row"><span className="badge">Open detail</span></div>
              </Link>
              <Link className="explore-card" href="/leaderboard">
                <div>
                  <span className="badge green">Benchmarks</span>
                  <h3>Compare real metrics</h3>
                  <p>Review source-reported metrics by category.</p>
                </div>
                <div className="meta-row"><span className="badge">Open Leaderboard</span></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
