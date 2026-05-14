"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SearchBox } from "./SearchBox";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Datasets", href: "/datasets" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Tools", href: "/tools" },
  { label: "Explore", href: "/explore" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <div className="mark">M</div>
          <div>
            <div className="brand-title">Embodied Tools</div>
            <div className="brand-subtitle">datasets, benchmarks, tools</div>
          </div>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                <span className="dot" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-note">
          Embodied tools for datasets, benchmarks, and capability-based discovery.
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <SearchBox />
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
