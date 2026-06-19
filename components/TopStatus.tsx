"use client";

/**
 * Indicador superior flutuante: home (esq.) · "18 | 30" (centro) · busca (dir.)
 */
export default function TopStatus({
  current,
  total,
  onHome,
}: {
  current: number;
  total: number;
  onHome?: () => void;
}) {
  return (
    <div className="pt-safe pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-3">
      {/* Home circular */}
      <button
        type="button"
        onClick={onHome}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 text-white shadow-md backdrop-blur"
        aria-label="Início"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      </button>

      {/* Ganhos do dia */}
      <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-[#1F1F1F] px-4 py-1.5 text-[15px] font-semibold shadow-lg">
        <span className="text-accentGreen">R$</span>
        <span className="text-white">0,00</span>
      </div>

      {/* Busca circular */}
      <button
        type="button"
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/90 text-white shadow-md backdrop-blur"
        aria-label="Buscar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>
    </div>
  );
}
