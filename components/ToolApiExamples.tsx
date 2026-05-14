import type { Tool, ToolParameter } from "@/data/tools";
import { CodePanel } from "./CodePanel";

type TestExample = {
  title: string;
  code: string;
};

type ToolApiExamplesProps = {
  tool: Tool;
  parameters: ToolParameter[];
  returnSchema: unknown;
  errorSchema: unknown;
  testExamples: TestExample[];
  toolJson: unknown;
  codePaths: string;
};

function sourceLabel(tool: Tool) {
  const github = tool.paperLinks?.find((link) => link.label.toLowerCase().includes("github"));
  const project = tool.paperLinks?.find((link) => link.label.toLowerCase().includes("project"));
  return github || project || tool.paperLinks?.[0];
}

export function ToolApiExamples({
  tool,
  parameters,
  returnSchema,
  errorSchema,
  testExamples,
  toolJson,
  codePaths
}: ToolApiExamplesProps) {
  const source = sourceLabel(tool);

  return (
    <div className="api-doc-stack">
      <div className="api-summary-grid">
        <div className="api-summary-item">
          <span>Path context</span>
          <strong>{tool.runtime}</strong>
          <p>Repository-relative reference copied into the catalog for reading.</p>
        </div>
        <div className="api-summary-item">
          <span>Source</span>
          {source ? (
            <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
          ) : (
            <strong>{tool.owner || "Add source"}</strong>
          )}
          <p>Paper, repository, project page, or official demo source.</p>
        </div>
        <div className="api-summary-item">
          <span>Website behavior</span>
          <strong>{tool.status}</strong>
          <p>This static page only documents source paths. It cannot call or run the tool.</p>
        </div>
      </div>

      <article className="api-doc-section">
        <div className="api-section-head">
          <span className="badge blue">Source path</span>
          <div>
            <h3>Repository-Relative Example</h3>
            <p className="muted">Keep paths in the style of the original paper, GitHub repository, or official demo. The website displays this text only.</p>
          </div>
        </div>
        <CodePanel code={tool.apiExample || `python tools/${tool.slug}/demo/run_example.py --input tools/${tool.slug}/examples/input`} previewLines={9} />
      </article>

      <article className="api-doc-section" id="tool-contract">
        <div className="api-section-head">
          <span className="badge blue">Inputs</span>
          <div>
            <h3>Input Parameters</h3>
            <p className="muted">A ToolUniverse-style documentation view of the inputs described by the source tool. These fields are not executable controls.</p>
          </div>
        </div>
        <div className="parameter-list">
          {parameters.map((parameter) => (
            <div className="parameter-item" key={parameter.name}>
              <div className="parameter-head">
                <code>{parameter.name}</code>
                <span className="badge">{parameter.type}</span>
                <span className={`badge ${parameter.required ? "green" : ""}`}>{parameter.required ? "required" : "optional"}</span>
              </div>
              <p className="muted">{parameter.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="api-doc-section" id="test-examples">
        <div className="api-section-head">
          <span className="badge blue">Examples</span>
          <div>
            <h3>Test Examples</h3>
            <p className="muted">Source-style request snippets, command lines, and artifact paths for readers who want to understand the original repository layout.</p>
          </div>
          <span className="badge">{testExamples.length} examples</span>
        </div>
        <div className="api-example-grid">
          {testExamples.map((example, index) => (
            <article className="api-example-card" key={example.title}>
              <div className="api-example-head">
                <span className="badge">Example {index + 1}</span>
                <h4>{example.title}</h4>
              </div>
              <CodePanel code={example.code} previewLines={8} />
            </article>
          ))}
        </div>
      </article>

      <article className="api-doc-section" id="code-docs">
        <div className="api-section-head">
          <span className="badge blue">Returns</span>
          <div>
            <h3>Return Preview and Code Paths</h3>
            <p className="muted">The success object names the primary result type, timing notes, and source-style artifact paths for documentation.</p>
          </div>
        </div>
        <div className="doc-grid">
          <article className="doc-card">
            <h3>Success object</h3>
            <CodePanel code={JSON.stringify(returnSchema, null, 2)} previewLines={12} />
          </article>
          <article className="doc-card">
            <h3>Repository paths</h3>
            <CodePanel code={codePaths} previewLines={8} />
          </article>
          <article className="doc-card">
            <h3>Integration note</h3>
            <p className="muted">
              Keep wrappers, configs, sample inputs, and output examples as repository-relative references under the same slugged tool folder.
            </p>
          </article>
        </div>
      </article>

      <article className="api-doc-section" id="returns-schema">
        <div className="api-section-head">
          <span className="badge blue">Schema</span>
          <div>
            <h3>Returns Schema</h3>
            <p className="muted">A stricter schema-style view, including the simple error shape expected from validation failures.</p>
          </div>
        </div>
        <div className="schema-grid">
          <article className="doc-card">
            <h3>Success schema</h3>
            <CodePanel code={JSON.stringify(returnSchema, null, 2)} previewLines={14} />
          </article>
          <article className="doc-card">
            <h3>Error schema</h3>
            <CodePanel code={JSON.stringify(errorSchema, null, 2)} previewLines={10} />
          </article>
        </div>
      </article>

      <article className="api-doc-section" id="tool-json">
        <div className="api-section-head">
          <span className="badge green">Full JSON</span>
          <div>
            <h3>Full Tool JSON</h3>
            <p className="muted">Machine-readable metadata for the catalog. It mirrors a ToolUniverse-style record but remains documentation-only.</p>
          </div>
        </div>
        <CodePanel code={JSON.stringify(toolJson, null, 2)} previewLines={14} />
      </article>
    </div>
  );
}
