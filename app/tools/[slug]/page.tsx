import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { CodePanel } from "@/components/CodePanel";
import { FloatingLinks } from "@/components/FloatingLinks";
import { RelatedTools } from "@/components/RelatedTools";
import { SearchBox } from "@/components/SearchBox";
import { realTools, tools } from "@/data/tools";
import { assetPath } from "@/lib/assets";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  return {
    title: tool ? `${tool.title} - Embodied Tools` : "Tool Detail - Embodied Tools",
    description: tool?.summary || "Embodied intelligence tool detail page."
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();

  const heroBackground = tool.heroImage
    ? `linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(53, 98, 255, 0.44)), url('${assetPath(tool.heroImage)}')`
    : undefined;
  const demos = tool.demos?.length ? tool.demos : [
    { label: "Input image / scene" },
    { label: "Output overlay" },
    { label: "Pipeline figure" },
    { label: "Video thumbnail" }
  ];

  return (
    <div className="shell">
      <header className="detail-topbar">
        <div className="topbar-inner">
          <Link className="brand" href="/tools">
            <span className="mark">M</span>
            <span>Embodied Tools</span>
          </Link>
          <SearchBox className="detail-search" placeholder="Search tools" />
          <div className="nav-actions">
            <Link className="btn primary" href="/tools">All Tools</Link>
          </div>
        </div>
      </header>

      <FloatingLinks />

      <main className="page">
        <section className="tool-hero">
          <div
            className={`hero-media ${tool.heroImage ? "with-image" : ""}`}
            style={heroBackground ? { backgroundImage: heroBackground } : undefined}
          >
            <div className="eyebrow">{tool.category}</div>
            <h1>{tool.title}</h1>
            <p>{tool.summary}</p>
          </div>
          <div className="hero-footer">
            <div className="badge-row">
              <span className="badge blue">{tool.task}</span>
              <span className="badge">{tool.runtime}</span>
              <span className="badge green">{tool.status}</span>
            </div>
            <Link className="btn" href="/tools">Back to Tools</Link>
          </div>
        </section>

        <div className="content-grid">
          <div className="main-stack">
            <section className="card" id="overview">
              <div className="card-head">
                <div>
                  <h2>Overview</h2>
                  <p className="muted">Inputs, outputs, runtime, and integration status.</p>
                </div>
              </div>
              <div className="summary-grid">
                <div className="metric"><span>Input</span><strong>{tool.input}</strong></div>
                <div className="metric"><span>Output</span><strong>{tool.output}</strong></div>
                <div className="metric"><span>Runtime</span><strong>{tool.runtime}</strong></div>
                <div className="metric"><span>Status</span><strong>{tool.status}</strong></div>
              </div>
            </section>

            <section className="card" id="paper">
              <div className="card-head">
                <div>
                  <h2>Paper</h2>
                  <p className="muted">Original method, citation context, and source links.</p>
                </div>
              </div>
              <div className="paper-card">
                <div
                  className={`paper-cover ${tool.heroImage ? "demo-slot image" : ""}`}
                  style={tool.heroImage ? { backgroundImage: `linear-gradient(135deg, rgba(16, 24, 40, 0.2), rgba(53, 98, 255, 0.08)), url('${assetPath(tool.heroImage)}')` } : undefined}
                >
                  <span>Paper figure</span>
                </div>
                <div className="field-list">
                  <div className="field-row"><span>Title</span><strong>{tool.paperTitle || tool.title}</strong></div>
                  <div className="field-row"><span>Authors</span><strong>{tool.paperAuthors || "Add authors"}</strong></div>
                  <div className="field-row"><span>Venue</span><strong>{tool.paperVenue || "Add venue"}</strong></div>
                  <div className="field-row"><span>Contribution</span><strong>{tool.paperContribution || tool.summary}</strong></div>
                </div>
              </div>
              {tool.paperLinks?.length ? (
                <div className="external-links link-block">
                  {tool.paperLinks.map((link) => (
                    <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
                      <strong>{link.label} -&gt;</strong>
                      <span>{link.url}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </section>

            <section className="card" id="demo">
              <div className="card-head">
                <div>
                  <h2>Demo Images</h2>
                  <p className="muted">{demos.length} demo images</p>
                </div>
              </div>
              <div className="demo-grid">
                {demos.map((demo, index) => {
                  const backgroundImage = demo.image
                    ? `linear-gradient(135deg, rgba(16, 24, 40, 0.26), rgba(53, 98, 255, 0.12)), url('${assetPath(demo.image)}')`
                    : undefined;
                  return (
                    <div
                      className={`demo-slot ${demo.image ? "image" : ""}`}
                      key={`${demo.label}-${index}`}
                      style={backgroundImage ? { backgroundImage, backgroundPosition: demo.position || "center" } : undefined}
                    >
                      <span>{demo.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card" id="api">
              <div className="card-head">
                <div>
                  <h2>API And Examples</h2>
                  <p className="muted">Relative local paths for documentation and future integration.</p>
                </div>
              </div>
              <CodePanel code={tool.apiExample || "# Add a relative-path example for this tool."} />
            </section>

            <section className="card" id="benchmark">
              <div className="card-head">
                <div>
                  <h2>Benchmark</h2>
                  <p className="muted">Source-reported datasets, metrics, latency, and artifacts.</p>
                </div>
              </div>
              <div className="field-list">
                <div className="field-row"><span>Dataset</span><strong>{tool.benchmarkDataset || "Add benchmark dataset."}</strong></div>
                <div className="field-row"><span>Metric</span><strong>{tool.benchmarkMetric || "Add task-specific metric."}</strong></div>
                <div className="field-row"><span>Latency</span><strong>{tool.benchmarkLatency || "Add runtime or deployment latency."}</strong></div>
                <div className="field-row"><span>Artifacts</span><strong>{tool.benchmarkArtifacts || "Add paper, logs, videos, configs, or evaluation files."}</strong></div>
              </div>
            </section>

            <section className="card" id="related">
              <div className="card-head">
                <div>
                  <h2>Related Tools</h2>
                  <p className="muted">Three tools are sampled from the same category whenever possible.</p>
                </div>
              </div>
              <RelatedTools current={tool} candidates={realTools} />
            </section>

            <section className="card" id="metadata">
              <div className="card-head">
                <div>
                  <h2>Metadata</h2>
                  <p className="muted">Owner, license, and version tracking for maintenance.</p>
                </div>
              </div>
              <div className="summary-grid">
                <div className="metric"><span>Owner</span><strong>{tool.owner || "Add owner"}</strong></div>
                <div className="metric"><span>License</span><strong>{tool.license || "Add license"}</strong></div>
                <div className="metric"><span>Version</span><strong>{tool.version || "Add version"}</strong></div>
                <div className="metric"><span>Slug</span><strong>{tool.slug}</strong></div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <BackToTop />
    </div>
  );
}
