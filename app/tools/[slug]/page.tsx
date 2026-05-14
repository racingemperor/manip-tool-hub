import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { DemoGallery } from "@/components/DemoGallery";
import { FloatingLinks } from "@/components/FloatingLinks";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolApiExamples } from "@/components/ToolApiExamples";
import { ToolDetailSearch, type ToolDetailSearchEntry } from "@/components/ToolDetailSearch";
import { ToolEngagement } from "@/components/ToolEngagement";
import { realTools, tools } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import {
  buildCodePaths,
  buildErrorSchema,
  buildReturnSchema,
  buildTestExamples,
  buildToolJson,
  inferParameters
} from "@/lib/toolDocs";

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
  const parameters = inferParameters(tool);
  const returnSchema = buildReturnSchema(tool);
  const errorSchema = buildErrorSchema(tool);
  const testExamples = buildTestExamples(tool);
  const toolJson = buildToolJson(tool);
  const codePaths = buildCodePaths(tool);
  const searchEntries: ToolDetailSearchEntry[] = [
    {
      title: "Overview",
      section: "Overview",
      href: "#overview",
      text: [tool.title, tool.category, tool.task, tool.summary, tool.input, tool.output, tool.runtime, tool.status].join(" ")
    },
    {
      title: "Paper",
      section: "Paper",
      href: "#paper",
      text: [
        tool.paperTitle,
        tool.paperAuthors,
        tool.paperVenue,
        tool.paperContribution,
        ...(tool.paperLinks || []).flatMap((link) => [link.label, link.url])
      ].filter(Boolean).join(" ")
    },
    {
      title: "Demo Images",
      section: "Demo",
      href: "#demo",
      text: demos.map((demo) => `${demo.label} ${demo.image || ""}`).join(" ")
    },
    {
      title: "Repository-Relative Example",
      section: "API And Examples",
      href: "#api",
      text: tool.apiExample || ""
    },
    {
      title: "Input Parameters",
      section: "API And Examples",
      href: "#tool-contract",
      text: parameters.map((parameter) => `${parameter.name} ${parameter.type} ${parameter.description}`).join(" ")
    },
    {
      title: "Test Examples",
      section: "API And Examples",
      href: "#test-examples",
      text: testExamples.map((example) => `${example.title} ${example.code}`).join(" ")
    },
    {
      title: "Return Preview and Code Paths",
      section: "API And Examples",
      href: "#code-docs",
      text: `${JSON.stringify(returnSchema)} ${codePaths}`
    },
    {
      title: "Returns Schema",
      section: "API And Examples",
      href: "#returns-schema",
      text: `${JSON.stringify(returnSchema)} ${JSON.stringify(errorSchema)}`
    },
    {
      title: "Full Tool JSON",
      section: "API And Examples",
      href: "#tool-json",
      text: JSON.stringify(toolJson)
    },
    {
      title: "Benchmark",
      section: "Benchmark",
      href: "#benchmark",
      text: [tool.benchmarkDataset, tool.benchmarkMetric, tool.benchmarkLatency, tool.benchmarkArtifacts].filter(Boolean).join(" ")
    },
    {
      title: "Metadata",
      section: "Metadata",
      href: "#metadata",
      text: [tool.owner, tool.license, tool.version, tool.slug].filter(Boolean).join(" ")
    }
  ];

  return (
    <div className="shell">
      <header className="detail-topbar">
        <div className="topbar-inner">
          <Link className="brand" href="/tools">
            <span className="mark">E</span>
            <span>Embodied Tools</span>
          </Link>
          <ToolDetailSearch entries={searchEntries} />
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
            <div className="hero-actions">
              <ToolEngagement slug={tool.slug} variant="detail" />
              <Link className="btn" href="/tools">Back to Tools</Link>
            </div>
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
              <DemoGallery demos={demos} />
            </section>

            <section className="card" id="api">
              <div className="card-head">
                <div>
                  <h2>API And Examples</h2>
                  <p className="muted">Inputs, examples, return schemas, local paths, and full JSON metadata for future integration.</p>
                </div>
              </div>
              <ToolApiExamples
                tool={tool}
                parameters={parameters}
                returnSchema={returnSchema}
                errorSchema={errorSchema}
                testExamples={testExamples}
                toolJson={toolJson}
                codePaths={codePaths}
              />
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
