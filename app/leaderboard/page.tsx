import { Leaderboard } from "@/components/Leaderboard";
import { SiteShell } from "@/components/SiteShell";

export default function LeaderboardPage() {
  return (
    <SiteShell>
      <section>
        <div className="section-head">
          <div>
            <h2>Leaderboard</h2>
            <p>Grouped ranking for real tools only. Draft templates are excluded.</p>
          </div>
        </div>
        <Leaderboard />
      </section>
    </SiteShell>
  );
}
