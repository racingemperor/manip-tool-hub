"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { leaderboardCategories, leaderboardRows } from "@/data/leaderboard";
import { emptyEngagementState, readEngagementState, type EngagementState } from "@/lib/engagement";
import { CompactSelect, type CompactSelectOption } from "./CompactSelect";

export function Leaderboard() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("primary");
  const [engagement, setEngagement] = useState<EngagementState>(emptyEngagementState());
  const categoryOptions: CompactSelectOption[] = [
    { value: "All", label: "All categories" },
    ...leaderboardCategories.map((item) => ({ value: item.name, label: item.name }))
  ];
  const sortOptions: CompactSelectOption[] = [
    { value: "primary", label: "Primary metric first" },
    { value: "hotness", label: "Hotness first" },
    { value: "speed", label: "Speed first" },
    { value: "artifacts", label: "Artifacts first" }
  ];

  useEffect(() => {
    setEngagement(readEngagementState());
  }, []);

  function getEngagement(slug: string) {
    const likes = engagement.liked.includes(slug) ? 1 : 0;
    const saves = engagement.saved.includes(slug) ? 1 : 0;
    return { likes, saves, hotness: likes + saves };
  }

  const tracks = useMemo(() => {
    return leaderboardCategories
      .filter((item) => category === "All" || item.name === category)
      .map((item) => {
        const rows = leaderboardRows
          .filter((row) => row.category === item.name)
          .sort((a, b) => {
            if (sort === "speed") return a.speedRank - b.speedRank || a.rankOrder - b.rankOrder;
            if (sort === "artifacts") return b.completeness - a.completeness || a.rankOrder - b.rankOrder;
            if (sort === "hotness") {
              const aEngagement = getEngagement(a.slug);
              const bEngagement = getEngagement(b.slug);
              return bEngagement.hotness - aEngagement.hotness || bEngagement.likes - aEngagement.likes || a.rankOrder - b.rankOrder;
            }
            return a.rankOrder - b.rankOrder;
          });
        return { ...item, rows };
      });
  }, [category, sort, engagement]);

  return (
    <>
      <div className="leaderboard-note">
        Ranking is grouped by the four tool categories. The values shown here are source-reported benchmark numbers, so AP, J&amp;F, REL, success rate, APE/RMSE, and runtime are not mixed into one universal score. Templates are excluded. Hotness is calculated as likes + saves from the current engagement data.
      </div>

      <div className="toolbar leaderboard-toolbar">
        <div className="filters">
          <CompactSelect
            ariaLabel="Leaderboard category"
            value={category}
            options={categoryOptions}
            getButtonLabel={() => "Benchmark category"}
            onChange={setCategory}
          />
          <CompactSelect
            ariaLabel="Leaderboard sort"
            value={sort}
            options={sortOptions}
            getButtonLabel={() => "Ranking basis"}
            onChange={setSort}
          />
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
                        <td data-label="Rank"><span className="rank">#{index + 1}</span></td>
                        <td data-label="Tool"><Link className="tool-table-link" href={`/tools/${row.slug}`}>{row.name}</Link></td>
                        <td data-label="Task">{row.task}</td>
                        <td data-label="Dataset">{row.dataset}</td>
                        <td data-label="Metric">
                          <div className="metric-cell">
                            <strong>{row.scoreLabel}</strong>
                            <span>{row.metric}</span>
                          </div>
                          {sort === "hotness" ? (
                            <div className="hotness-inline">
                              <span>♡ {getEngagement(row.slug).likes}</span>
                              <span>☆ {getEngagement(row.slug).saves}</span>
                              <strong>{getEngagement(row.slug).hotness}</strong>
                            </div>
                          ) : null}
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
