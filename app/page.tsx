import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

const modules = [
  { href: "/datasets", number: "1", title: "Dataset Library", text: "Dataset entries and download links." },
  { href: "/leaderboard", number: "2", title: "Leaderboard", text: "Benchmark metrics by category." },
  { href: "/tools", number: "3", title: "Tools", text: "Capability-based tool catalog." },
  { href: "/explore", number: "4", title: "Explore", text: "Task-based discovery shortcuts." }
];

export default function HomePage() {
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
      </section>
    </SiteShell>
  );
}
