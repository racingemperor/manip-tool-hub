import Link from "next/link";
import type { Tool } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import { categoryShortLabel, venueLabel } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const backgroundImage = tool.heroImage
    ? `linear-gradient(135deg, rgba(16, 24, 40, 0.38), rgba(53, 98, 255, 0.18)), url('${assetPath(tool.heroImage)}')`
    : undefined;

  return (
    <Link className="card tool-card" href={`/tools/${tool.slug}`}>
      <div
        className={`tool-thumb ${tool.heroImage ? "image" : ""}`}
        style={backgroundImage ? { backgroundImage } : undefined}
      >
        <span>{tool.task}</span>
      </div>
      <div className="tool-card-body">
        <div className="card-title">
          <span>{tool.title}</span>
          <span className="badge blue">{categoryShortLabel(tool.category, tool.task)}</span>
        </div>
        <p>{tool.summary}</p>
        <div className="meta-row">
          <span className="badge">{venueLabel(tool)}</span>
          <span className="badge green">{tool.status}</span>
        </div>
        <div className="tool-meta">
          <div>Input<strong>{tool.input}</strong></div>
          <div>Output<strong>{tool.output}</strong></div>
        </div>
        <div className="tool-open-row">
          <span className="tool-open-link">Open detail</span>
        </div>
      </div>
    </Link>
  );
}
