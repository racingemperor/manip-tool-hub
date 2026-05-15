"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { leaderboardCategories, leaderboardRows } from "@/data/leaderboard";
import { emptyEngagementState, readEngagementState, type EngagementState } from "@/lib/engagement";

export function Leaderboard() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("primary");
  const [engagement, setEngagement] = useState<EngagementState>(emptyEngagementState());

  useEffect(() => {
    setEngagement(readEngagementState());
  }, []);

  const hotRows = useMemo(() => {
    return leaderboardRows
      .map((row) => {
        const likes = engagement.liked.includes(row.slug) ? 1 : 0;
        const saves = engagement.saved.includes(row.slug) ? 1 : 0;
        return {
          ...row,
          likes,
          saves,
          hotness: likes + saves
        };
      })
      .sort((a, b) => b.hotness - a.hotness || b.likes - a.likes || a.rankOrder - b.rankOrder || a.name.localeCompare(b.name));
  }, [engagement]);

  const tracks = useMemo(() => {
    return leaderboardCategories
      .filter((item) => category === "All" || item.name === category)
      .map((item) => {
        const rows = leaderboardRows
          .filter((row) => row.category === item.name)
          .sort((a, b) => {
            if (sort === "speed") return a.speedRank - b.speedRank || a.rankOrder - b.rankOrder;
            if (sort === "artifacts") return b.completeness - a.completeness || a.rankOrder - b.rankOrder;
            return a.rankOrder - b.rankOrder;
          });
        return { ...item, rows };
      });
  }, [category, sort]);

  return (
    <>
      <div className="leaderboard-note">
        Ranking is grouped by the four tool categories. The values shown here are source-reported benchmark numbers, so AP, J&amp;F, REL, success rate, APE/RMSE, and runtime are not mixed into one universal score. Templates are excluded. Hotness is calculated as likes + saves from the current engagement data.
      </div>

      <div className="toolbar">
        <div className="filters">
          <select className="select" aria-label="Leaderboard category filter" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="All">All categories</option>
            {leaderboardCategories.map((item) => (
              <option value={item.name} key={item.name}>{item.name}</option>
            ))}
          </select>
          <select className="select" aria-label="Leaderboard sort logic" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="primary">Primary metric first</option>
            <option value="speed">Speed first</option>
            <option value="artifacts">Artifacts first</option>
          </select>
        </div>
      </div>

      <div className="leaderboard-tracks">
        <section className="leaderboard-track hotness-track">
          <div className="leaderboard-track-head">
            <div>
              <h3>Hotness Ranking</h3>
              <p>Ranked by total engagement: likes plus saves. Current static deployment uses the same local engagement data shown on tool cards.</p>
            </div>
            <span className="score-chip">Likes + Saves</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Tool</th>
                  <th>Category</th>
                  <th>Task</th>
                  <th>Likes</th>
                  <th>Saves</th>
                  <th>Hotness</th>
                </tr>
              </thead>
              <tbody>
                {hotRows.map((row, index) => (
                  <tr key={row.slug}>
                    <td data-label="Rank"><span className="rank">#{index + 1}</span></td>
                    <td data-label="Tool"><Link className="tool-table-link" href={`/tools/${row.slug}`}>{row.name}</Link></td>
                    <td data-label="Category">{row.category}</td>
                    <td data-label="Task">{row.task}</td>
                    <td data-label="Likes"><span className="engagement-rank-value">♡ {row.likes}</span></td>
                    <td data-label="Saves"><span className="engagement-rank-value">☆ {row.saves}</span></td>
                    <td data-label="Hotness"><span className="score-chip">{row.hotness}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {tracks.map((track) => (
          <section className="leaderboard-track" key={track.name}>
            <div className="leaderboard-track-head">
              <div>
                <h3>{track.name}</h3>
                <p>{track.note}</p>
              </div>
              <span className="score-chip">{track.primary}</span>
            </div>
            {track.rows.length ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Tool</th>
                      <th>Task</th>
                      <th>Dataset</th>
                      <th>Metric</th>
                      <th>Speed / Runtime</th>
                      <th>Artifacts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {track.rows.map((row, index) => (
                      <tr key={row.slug}>
                        <td data-label="Rank"><span className="rank">#{index + 1}</span></td>
                        <td data-label="Tool"><Link className="tool-table-link" href={`/tools/${row.slug}`}>{row.name}</Link></td>
                        <td data-label="Task">{row.task}</td>
                        <td data-label="Dataset">{row.dataset}</td>
                        <td data-label="Metric">
                          <div className="metric-cell">
                            <strong>{row.scoreLabel}</strong>
                            <span>{row.metric}</span>
                          </div>
                        </td>
                        <td data-label="Speed">{row.speed}</td>
                        <td data-label="Artifacts">
                          <div className="artifact-list">
                            {row.artifacts.map((artifact) => <span className="badge" key={artifact}>{artifact}</span>)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-track">No ranked real tools yet. Draft templates are excluded from the leaderboard.</div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
