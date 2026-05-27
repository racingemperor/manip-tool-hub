"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SearchBox } from "./SearchBox";

type NavIconName = "home" | "datasets" | "leaderboard" | "tools" | "explore";

const navItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Datasets", href: "/datasets", icon: "datasets" },
  { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard" },
  { label: "Tools", href: "/tools", icon: "tools" },
  { label: "Explore", href: "/explore", icon: "explore" }
] satisfies Array<{ label: string; href: string; icon: NavIconName }>;

function NavIcon({ name }: { name: NavIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9
  };

  return (
    <svg className="nav-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {name === "home" ? (
        <>
          <path {...common} d="M5 15 16 6l11 9" />
          <path {...common} d="M9 14.5V26h14V14.5" />
          <path {...common} d="M13.5 26v-7h5v7" />
        </>
      ) : null}
      {name === "datasets" ? (
        <>
          <ellipse {...common} cx="16" cy="8" rx="8.5" ry="3.2" />
          <path {...common} d="M7.5 8v8c0 1.8 3.8 3.2 8.5 3.2s8.5-1.4 8.5-3.2V8" />
          <path {...common} d="M7.5 16v8c0 1.8 3.8 3.2 8.5 3.2s8.5-1.4 8.5-3.2v-8" />
        </>
      ) : null}
      {name === "leaderboard" ? (
        <>
          <path {...common} d="M7 25h18" />
          <path {...common} d="M10 25V15h4v10" />
          <path {...common} d="M18 25V8h4v17" />
          <path {...common} d="M12 11l4-4 4 4" />
        </>
      ) : null}
      {name === "tools" ? (
        <>
          <path {...common} d="M19.5 7.5 24 12l-5.5 5.5-4.5-4.5L19.5 7.5Z" />
          <path {...common} d="M13.5 13.5 6.5 20.5 5 27l6.5-1.5 7-7" />
          <path {...common} d="M21.5 9.5 23.5 7.5" />
        </>
      ) : null}
      {name === "explore" ? (
        <>
          <circle {...common} cx="16" cy="16" r="10" />
          <path {...common} d="M20 12l-2.6 5.4L12 20l2.6-5.4L20 12Z" />
          <path {...common} d="M16 4v3M16 25v3M4 16h3M25 16h3" />
        </>
      ) : null}
    </svg>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Embodied Tools home">
          <div className="mark">E</div>
          <span className="nav-label">Embodied Tools</span>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                aria-label={item.label}
                className={active ? "active" : ""}
                href={item.href}
                key={item.href}
              >
                <NavIcon name={item.icon} />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
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
