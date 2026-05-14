"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Tool } from "@/data/tools";
import { assetPath } from "@/lib/assets";
import { categoryShortLabel } from "@/lib/tools";

function pickRandom(items: Tool[], count: number) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

export function RelatedTools({ current, candidates }: { current: Tool; candidates: Tool[] }) {
  const [items, setItems] = useState<Tool[]>([]);

  useEffect(() => {
    const sameCategory = candidates.filter((tool) => tool.category === current.category && tool.slug !== current.slug);
    const fallback = candidates.filter((tool) => tool.slug !== current.slug);
    setItems(pickRandom(sameCategory.length >= 3 ? sameCategory : fallback, 3));
  }, [current, candidates]);

  return (
    <div className="related-grid">
      {items.map((tool) => {
        const backgroundImage = tool.heroImage
          ? `linear-gradient(135deg, rgba(17, 24, 39, 0.76), rgba(53, 98, 255, 0.36)), url('${assetPath(tool.heroImage)}')`
          : undefined;
        return (
          <Link
            className={`related-card ${tool.heroImage ? "" : "placeholder"}`}
            href={`/tools/${tool.slug}`}
            key={tool.slug}
            style={backgroundImage ? { backgroundImage } : undefined}
          >
            <div className="related-content">
              <span className="badge">{categoryShortLabel(tool.category, tool.task)}</span>
              <strong>{tool.title}</strong>
              <p>{tool.summary}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
