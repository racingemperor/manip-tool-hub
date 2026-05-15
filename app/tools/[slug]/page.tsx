import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { CodePanel } from "@/components/CodePanel";
import { DemoGallery } from "@/components/DemoGallery";
import { FloatingLinks } from "@/components/FloatingLinks";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolDetailSearch, type ToolDetailSearchEntry } from "@/components/ToolDetailSearch";
import { ToolEngagement } from "@/components/ToolEngagement";
import { realTools, tools, type Tool, type ToolLink } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import { buildReturnSchema, inferParameters } from "@/lib/toolDocs";

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

function findLink(tool: Tool, terms: string[]) {
  return tool.paperLinks?.find((link) => {
    const label = link.label.toLowerCase();
    const url = link.url.toLowerCase();
    return terms.some((term) => label.includes(term) || url.includes(term));
  });
}

function buildCodeDownloadLink(github?: ToolLink, version?: string) {
  if (!github?.url.includes("github.com")) return undefined;
  const branch = version?.toLowerCase().includes("master") ? "master" : "main";
  return {
    label: "Code Download",
    url: `${github.url.replace(/\/$/, "")}/archive/refs/heads/${branch}.zip`
  };
}

function buildCitation(tool: Tool) {
  const year = tool.paperVenue?.match(/\b(20\d{2}|19\d{2})\b/)?.[0] || "YEAR";
  const authors = tool.paperAuthors?.split(",").map((author) => author.trim()).filter(Boolean).join(" and ") || "Author";
  return [
    `@misc{${tool.slug.replace(/-/g, "")}${year},`,
    `  title={${tool.paperTitle || tool.title}},`,
    `  author={${authors}},`,
    `  year={${year}},`,
    `  note={${tool.paperVenue || "Add venue or arXiv identifier"}},`,
    `  url={${findLink(tool, ["arxiv", "paper", "pdf"])?.url || findLink(tool, ["project", "github"])?.url || "Add paper URL"}}`,
    "}"
  ].join("\n");
}

function buildUsageSteps(tool: Tool) {
  const github = findLink(tool, ["github"]);
  return [
    github ? `Clone or download the official repository from ${github.label}.` : "Add the official repository or source download link.",
    "Install the dependencies and checkpoints required by the original project.",
    `Prepare inputs in the documented format: ${tool.input}.`,
    "Run the repository-relative command below and save outputs under the same tool folder."
  ];
}

function buildTriggerText(tool: Tool) {
  const runtime = tool.runtime.toLowerCase();
  if (runtime.includes("ros")) return "Triggered when the ROS launch file receives synchronized sensor streams.";
  if (runtime.includes("video")) return "Triggered after the input video or frame sequence and optional seed mask are ready.";
  if (runtime.includes("gradio") || runtime.includes("demo")) return "Triggered on demand from the source demo or local example command.";
  return "Triggered on demand after the required input files and configuration are prepared.";
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
  const returnPreview = buildReturnSchema(tool);
  const github = findLink(tool, ["github"]);
  const huggingFace = findLink(tool, ["hugging face", "huggingface"]);
  const paper = findLink(tool, ["paper", "arxiv", "pdf"]);
  const project = findLink(tool, ["project"]);
  const codeDownload = buildCodeDownloadLink(github, tool.version);
  const resourceLinks = [
    github,
    huggingFace,
    codeDownload,
    project,
    paper,
    ...(tool.modelLinks || []),
    ...(tool.paperLinks || []).filter((link) => ![github?.url, huggingFace?.url, project?.url, paper?.url].includes(link.url))
  ].filter(Boolean).filter((link, index, links) => links.findIndex((item) => item?.url === link?.url) === index) as ToolLink[];
  const citation = buildCitation(tool);
  const usageSteps = tool.deploymentNotes?.length ? tool.deploymentNotes : buildUsageSteps(tool);
  const triggerText = buildTriggerText(tool);
  const parameterNotes = tool.parameterNotes?.length
    ? tool.parameterNotes
    : parameters.map((parameter) => ({
      name: parameter.name,
      control: parameter.type.includes("path") ? "path" as const : parameter.type.includes("number") || parameter.type.includes("integer") ? "number" as const : "text" as const,
      defaultValue: parameter.required ? "required" : "optional",
      meaning: parameter.description
    }));
  const outputNotes = tool.outputNotes?.length
    ? tool.outputNotes
    : [
      { name: "result", meaning: tool.output },
      { name: "score", meaning: "Confidence or quality score when the original tool reports one." },
      { name: "artifact", meaning: "Visualization, map, mask, trajectory, JSON, or log saved by the local run." }
    ];
  const benchmarkRows = tool.benchmarkRows?.length
    ? tool.benchmarkRows
    : [
      {
        dataset: tool.benchmarkDataset || "Add benchmark dataset",
        metric: "Core result",
        value: tool.benchmarkMetric || "Add source-reported number",
        runtime: tool.benchmarkLatency,
        source: tool.paperVenue || "Add source"
      }
    ];
  const searchEntries: ToolDetailSearchEntry[] = [
    {
      title: "Introduction",
      section: "Introduction",
      href: "#introduction",
      text: [tool.title, tool.category, tool.task, tool.summary, tool.input, tool.output, tool.runtime, tool.status].join(" ")
    },
    {
      title: "Tool Introduction",
      section: "Core Parameters And Demo",
      href: "#tool-introduction",
      text: [
        tool.input,
        tool.output,
        tool.shortExplanation,
        tool.presetExample?.title,
        tool.presetExample?.prompt,
        tool.presetExample?.expectedOutput,
        triggerText,
        tool.runtime,
        ...parameters.map((parameter) => `${parameter.name} ${parameter.type} ${parameter.description}`),
        ...parameterNotes.map((parameter) => `${parameter.name} ${parameter.control} ${parameter.defaultValue || ""} ${parameter.meaning}`),
        ...outputNotes.map((output) => `${output.name} ${output.meaning}`),
        demos.map((demo) => `${demo.label} ${demo.image || ""}`).join(" ")
      ].join(" ")
    },
    {
      title: "How To Use",
      section: "Resources And Usage",
      href: "#how-to-use",
      text: [
        tool.apiExample,
        ...resourceLinks.flatMap((link) => [link.label, link.url]),
        usageSteps.join(" ")
      ].filter(Boolean).join(" ")
    },
    {
      title: "Academic Info",
      section: "Citation And Benchmark",
      href: "#academic-info",
      text: [
        tool.paperTitle,
        tool.paperAuthors,
        tool.paperVenue,
        tool.paperContribution,
        citation,
        tool.benchmarkDataset,
        tool.benchmarkMetric,
        tool.benchmarkLatency,
        tool.benchmarkArtifacts,
        ...benchmarkRows.map((row) => `${row.dataset} ${row.metric} ${row.value} ${row.runtime || ""} ${row.source || ""}`)
      ].filter(Boolean).join(" ")
    },
    {
      title: "Related Tools",
      section: "Related Tools",
      href: "#related",
      text: [tool.category, tool.task, tool.summary].join(" ")
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
        <section className="tool-hero" id="introduction">
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
            <section className="card detail-module module-primary" id="tool-introduction">
              <div className="card-head">
                <div>
                  <h2>Tool Introduction</h2>
                  <p className="muted">Core parameters, trigger timing, and visual before/after demo references.</p>
                </div>
              </div>
              <div className="tool-intro-layout">
                <article className="brief-card">
                  <h3>Short Explanation</h3>
                  <p>{tool.shortExplanation || tool.summary}</p>
                </article>
                <div className="parameter-board">
                  <div className="metric"><span>Input</span><strong>{tool.input}</strong></div>
                  <div className="metric"><span>Output</span><strong>{tool.output}</strong></div>
                  <div className="metric"><span>Trigger Timing</span><strong>{triggerText}</strong></div>
                  <div className="metric"><span>Runtime</span><strong>{tool.runtime}</strong></div>
                </div>
                <div className="io-flow">
                  <article>
                    <span>Before</span>
                    <strong>{tool.input}</strong>
                    <p>Prepare the scene, image, video, sensor stream, prompt, or configuration expected by the original project.</p>
                  </article>
                  <article>
                    <span>After</span>
                    <strong>{tool.output}</strong>
                    <p>Read the produced visualization, prediction, map, trajectory, mask, grasp pose, or other documented artifact.</p>
                  </article>
                </div>
              </div>
            </section>

            {tool.presetExample ? (
              <section className="card detail-module module-secondary">
                <div className="card-head">
                  <div>
                    <h2>Preset Example</h2>
                    <p className="muted">A quick-run style example for the documentation page. The static site shows the workflow; the model runs in the original repository.</p>
                  </div>
                </div>
                <article className="preset-card">
                  <div
                    className={`preset-visual ${tool.presetExample.image ? "image" : ""}`}
                    style={tool.presetExample.image ? { backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.38), rgba(53, 98, 255, 0.16)), url('${assetPath(tool.presetExample.image)}')` } : undefined}
                  >
                    <span>{tool.presetExample.title}</span>
                  </div>
                  <div className="preset-copy">
                    <div className="field-list">
                      <div className="field-row"><span>Input</span><strong>{tool.presetExample.input}</strong></div>
                      {tool.presetExample.prompt ? <div className="field-row"><span>Prompt</span><strong>{tool.presetExample.prompt}</strong></div> : null}
                      <div className="field-row"><span>Expected</span><strong>{tool.presetExample.expectedOutput}</strong></div>
                    </div>
                    <button className="btn primary quick-run" type="button" disabled>{tool.presetExample.runLabel || "Quick Run"}</button>
                  </div>
                </article>
              </section>
            ) : null}

            <section className="card detail-module module-secondary">
              <div className="card-head">
                <div>
                  <h2>Parameters And Output</h2>
                  <p className="muted">Readable controls and the meaning of each returned artifact.</p>
                </div>
              </div>
              <div className="info-pair-grid">
                <article className="usage-card">
                  <h3>Parameter Explanation</h3>
                  <div className="control-list">
                    {parameterNotes.map((parameter) => (
                      <div className="control-row" key={parameter.name}>
                        <div className="control-head">
                          <code>{parameter.name}</code>
                          <span className="badge blue">{parameter.control}</span>
                          {parameter.defaultValue ? <span className="badge">{parameter.defaultValue}</span> : null}
                        </div>
                        <p>{parameter.meaning}</p>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="usage-card">
                  <h3>Output Explanation</h3>
                  <div className="control-list">
                    {outputNotes.map((output) => (
                      <div className="control-row" key={output.name}>
                        <div className="control-head">
                          <code>{output.name}</code>
                        </div>
                        <p>{output.meaning}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section className="card detail-module module-primary" id="how-to-use">
              <div className="card-head">
                <div>
                  <h2>How To Use</h2>
                  <p className="muted">Official resources, code download, deployment notes, and a short repository-relative usage example.</p>
                </div>
              </div>

              <div className={`resource-link-grid count-${resourceLinks.length}`}>
                {resourceLinks.length ? resourceLinks.map((link) => (
                  <a href={link.url} key={`${link.label}-${link.url}`} target="_blank" rel="noreferrer">
                    <strong>{link.label}</strong>
                    <span>{link.url}</span>
                  </a>
                )) : (
                  <div className="empty-track">Add GitHub, Hugging Face, paper, project page, or dataset links for this tool.</div>
                )}
              </div>

              <div className="usage-layout">
                <article className="usage-card">
                  <h3>Deployment Notes</h3>
                  <ol className="usage-steps">
                    {usageSteps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                </article>
                <article className="usage-card">
                  <h3>Relative Path Example</h3>
                  <CodePanel
                    code={tool.apiExample || `python tools/${tool.slug}/demo/run_example.py --input tools/${tool.slug}/examples/input`}
                    previewLines={5}
                    previewHeightPx={150}
                    equalPreviewHeight
                    expandLabel="Read full example"
                    collapseLabel="Show less example"
                  />
                </article>
                <article className="usage-card">
                  <h3>Expected Result Shape</h3>
                  <CodePanel
                    code={JSON.stringify(returnPreview, null, 2)}
                    previewLines={5}
                    previewHeightPx={150}
                    equalPreviewHeight
                    expandLabel="Read full result shape"
                    collapseLabel="Show less result shape"
                  />
                </article>
              </div>
            </section>

            <section className="card detail-module module-full" id="academic-info">
              <div className="card-head">
                <div>
                  <h2>Academic Info</h2>
                  <p className="muted">Paper identity, copyable citation, and the most readable benchmark numbers.</p>
                </div>
              </div>
              <div className="academic-layout">
                <article className="paper-summary">
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
                </article>
                <article className="citation-card">
                  <h3>Citation</h3>
                  <CodePanel code={citation} previewLines={6} previewHeightPx={170} equalPreviewHeight expandLabel="Read full citation" collapseLabel="Show less citation" />
                </article>
              </div>

              <div className="benchmark-focus">
                <div className="mini-section-head">
                  <h3>Benchmark</h3>
                  <p className="muted">Only compact, source-reported numbers are shown here.</p>
                </div>
                <div className="benchmark-table-wrap">
                  <table className="benchmark-table">
                    <thead>
                      <tr>
                        <th>Dataset</th>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>Runtime</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchmarkRows.map((row) => (
                        <tr key={`${row.dataset}-${row.metric}`}>
                          <td>{row.dataset}</td>
                          <td>{row.metric}</td>
                          <td><strong>{row.value}</strong></td>
                          <td>{row.runtime || "Not reported"}</td>
                          <td>{row.source || tool.paperVenue || "Paper"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="field-row"><span>Artifacts</span><strong>{tool.benchmarkArtifacts || "Add paper, logs, videos, configs, or evaluation files."}</strong></div>
              </div>
            </section>

            <section className="card detail-module module-full">
              <div className="card-head">
                <div>
                  <h2>Demo Images</h2>
                  <p className="muted">Visual references from the original tool. Click any image to inspect the original size.</p>
                </div>
              </div>
              <div className="demo-module">
                <DemoGallery demos={demos} />
              </div>
            </section>

            <section className="card detail-module module-full" id="related">
              <div className="card-head">
                <div>
                  <h2>Related Tools</h2>
                  <p className="muted">Three tools are sampled from the same category whenever possible.</p>
                </div>
              </div>
              <RelatedTools current={tool} candidates={realTools} />
            </section>
          </div>
        </div>
      </main>
      <BackToTop />
    </div>
  );
}
