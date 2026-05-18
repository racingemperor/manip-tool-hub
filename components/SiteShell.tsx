"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SearchBox } from "./SearchBox";

const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" }
];

const catalogNavItems = [
  { label: "Datasets", href: "/datasets" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Tools", href: "/tools" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <div className="mark">E</div>
          <div>
            <div className="brand-title">Embodied Tools</div>
            <div className="brand-subtitle">embodied tools</div>
          </div>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          {primaryNavItems.slice(0, 1).map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                <span className="dot" />
                {item.label}
              </Link>
            );
          })}
          <div className="nav-group" aria-label="Catalog navigation">
            <div className="nav-group-title">Catalog</div>
            <div className="nav-subitems">
              {catalogNavItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                    <span className="dot" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          {primaryNavItems.slice(1).map((item) => {
            const active = pathname.startsWith(item.href);
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
