"use client";

export type NavKey = "home" | "discover" | "earnings" | "messages" | "menu";

function Icon({ k }: { k: NavKey }) {
  switch (k) {
    case "home":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" />
        </svg>
      );
    case "discover":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" />
        </svg>
      );
    case "earnings":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" />
        </svg>
      );
    case "messages":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "menu":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
  }
}

const ITEMS: { key: NavKey; label: string; dot?: boolean }[] = [
  { key: "home", label: "Página inicial" },
  { key: "discover", label: "Descubra", dot: true },
  { key: "earnings", label: "Ganhos" },
  { key: "messages", label: "Mensagens" },
  { key: "menu", label: "Menu", dot: true },
];

export default function BottomNav({
  active,
  onNavigate,
}: {
  active: NavKey;
  onNavigate?: (key: NavKey) => void;
}) {
  return (
    <nav className="nav-safe flex items-stretch border-t border-white/[0.08] bg-uberBg px-2 pt-3">
      {ITEMS.map((it) => {
        const isActive = it.key === active;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onNavigate?.(it.key)}
            className={`flex flex-1 flex-col items-center gap-1 ${
              isActive ? "text-white" : "text-uberSecondary"
            }`}
          >
            <span className="relative">
              <Icon k={it.key} />
              {it.dot && (
                <span className="absolute -right-1.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-uberBlue" />
              )}
            </span>
            <span className="text-[10px] leading-none">{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
