import Link from "next/link";
import type { Tool } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import { capabilityLabelForTool, toolHeroPosition, venueLabel } from "@/lib/tools";
import { CapabilityLabel } from "./CapabilityLabel";
import { ToolEngagement } from "./ToolEngagement";

export function ToolCard({ tool }: { tool: Tool }) {
  const backgroundImage = tool.heroImage
    ? `linear-gradient(135deg, rgba(16, 24, 40, 0.38), rgba(53, 98, 255, 0.18)), url('${assetPath(tool.heroImage)}')`
    : undefined;
  const backgroundPosition = toolHeroPosition(tool);
  const cardSummary = tool.shortExplanation || tool.summary;

  return (
    <article className="card tool-card">
      <Link className="tool-card-main" href={`/tools/${tool.slug}`} aria-label={`Open ${tool.title} detail`}>
        <div
          className={`tool-thumb ${tool.heroImage ? "image" : ""}`}
          style={backgroundImage ? { backgroundImage, backgroundPosition } : undefined}
        >
          <span>{tool.task}</span>
        </div>
          <div className="tool-card-body">
            <div className="card-title">
              <span>{tool.title}</span>
            </div>
            <CapabilityLabel info={capabilityLabelForTool(tool.category, tool.task)} variant="compact" />
            <p>{cardSummary}</p>
          <div className="tool-card-tags">
            <span className="badge">{venueLabel(tool)}</span>
            <span className="badge green">{tool.status}</span>
          </div>
          <div className="tool-meta">
            <div>Input<strong>{tool.input}</strong></div>
            <div>Output<strong>{tool.output}</strong></div>
          </div>
        </div>
      </Link>
      <div className="tool-open-row">
        <ToolEngagement slug={tool.slug} />
        <Link className="tool-open-link" href={`/tools/${tool.slug}`}>Open detail</Link>
      </div>
    </article>
  );
}
