import { SiteShell } from "@/components/SiteShell";
import { ToolRegistry } from "@/components/ToolRegistry";

export default function ToolsPage() {
  return (
    <SiteShell>
      <section>
        <div className="section-head">
          <div>
            <h2>Tools</h2>
            <p>Interactive registry of robotics and embodied-AI tools with paper context, demos, input/output contracts, official links, and benchmark evidence.</p>
          </div>
        </div>
        <ToolRegistry />
      </section>
    </SiteShell>
  );
}
