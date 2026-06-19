"use client";

import BottomNav, { type NavKey } from "./BottomNav";

export default function HomeScreen({
  onGoOnline,
  onNavigate,
}: {
  onGoOnline: () => void;
  onNavigate?: (key: NavKey) => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-uberBg">
      {/* Conteúdo rolável */}
      <div className="pt-safe-lg hide-scrollbar flex-1 overflow-y-auto px-5 pb-2">
        {/* Botões circulares no topo direito: [ Escudo ] [ Compartilhar ] */}
        <div className="mb-4 flex items-center justify-end gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-uberBtn"
            aria-label="Segurança"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#276EF1">
              <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
            </svg>
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-uberBtn text-white"
            aria-label="Compartilhar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" />
              <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
            </svg>
          </button>
        </div>

        {/* Título + subtítulo */}
        <h1 className="mb-1.5 max-w-[300px] text-[28px] font-bold leading-[1.18] text-white">
          Agora seus ganhos são mais altos
        </h1>
        <p className="mb-4 text-[14px] text-uberSecondary">
          É um bom momento para ficar online.
        </p>

        {/* Mapa de oportunidades */}
        <div className="relative overflow-hidden rounded-2xl bg-uberCard">
          <img
            src="/map-bg.png"
            alt="Mapa de oportunidades"
            className="pointer-events-none w-full select-none object-cover"
            style={{ height: 352 }}
            draggable={false}
          />
          {/* Botão flutuante preto no canto superior direito do mapa */}
          <button
            type="button"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur"
            aria-label="Expandir mapa"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>

        {/* Botão "Descubra as oportunidades" — compacto, apenas com seta fina */}
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-between"
        >
          <span className="text-[18px] font-semibold text-white">
            Descubra as oportunidades
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-uberBtn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-white">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </button>
      </div>

      {/* Barra inferior: botão "Ficar online" */}
      <div className="px-4 pb-5 pt-1">
        <button
          type="button"
          onClick={onGoOnline}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4D89F7] py-3 text-[16px] font-semibold text-white active:scale-[0.99]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" />
            <path d="M3 12h4M17 12h4M12 3v4" />
          </svg>
          Ficar online
        </button>
      </div>

      {/* Navegação inferior */}
      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
