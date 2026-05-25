import Link from "next/link";
import { DatasetFilters } from "@/components/DatasetFilters";
import { SiteShell } from "@/components/SiteShell";
import { datasets } from "@/data/datasets";

export default function DatasetsPage() {
  return (
    <SiteShell>
      <section>
        <div className="section-head">
          <div>
            <h2>Datasets</h2>
            <p>Dataset download entries linking out to Hugging Face.</p>
          </div>
        </div>

        <div className="toolbar">
          <DatasetFilters />
          <Link className="btn" href="/leaderboard">Open Leaderboard</Link>
        </div>

        <div className="grid">
          {datasets.map((dataset) => (
            <article className="card dataset-card" key={dataset.title + dataset.summary}>
              <div className="thumb" aria-hidden="true" />
              <div>
                <div className="card-title">{dataset.title}</div>
                <p>{dataset.summary}</p>
                <div className="meta-row">
                  <span className="badge blue">{dataset.task}</span>
                  <span className="badge">{dataset.format}</span>
                  <span className="badge green">{dataset.license}</span>
                </div>
              </div>
              <div className="dataset-actions">
                <button className="btn" type="button">Details</button>
                <a className="btn primary" href={dataset.href} target="_blank" rel="noreferrer">{dataset.downloadLabel}</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
