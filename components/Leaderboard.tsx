"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { leaderboardCategories, leaderboardRows } from "@/data/leaderboard";

export function Leaderboard() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("primary");

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
        Ranking is grouped by the four tool categories. The values shown here are source-reported benchmark numbers, so AP, J&amp;F, REL, success rate, APE/RMSE, and runtime are not mixed into one universal score. Templates are excluded.
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
                        <td><span className="rank">#{index + 1}</span></td>
                        <td><Link className="tool-table-link" href={`/tools/${row.slug}`}>{row.name}</Link></td>
                        <td>{row.task}</td>
                        <td>{row.dataset}</td>
                        <td>
                          <div className="metric-cell">
                            <strong>{row.scoreLabel}</strong>
                            <span>{row.metric}</span>
                          </div>
                        </td>
                        <td>{row.speed}</td>
                        <td>
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
