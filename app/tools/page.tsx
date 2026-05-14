import { SiteShell } from "@/components/SiteShell";
import { ToolRegistry } from "@/components/ToolRegistry";

export default function ToolsPage() {
  return (
    <SiteShell>
      <section>
        <div className="section-head">
          <div>
            <h2>Tools</h2>
            <p>Interactive tool registry with paper, demo, API, and benchmark slots ready for real entries.</p>
          </div>
        </div>
        <ToolRegistry />
      </section>
    </SiteShell>
  );
}
