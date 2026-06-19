"use client";

import { useMemo } from "react";
import BottomNav, { type NavKey } from "./BottomNav";

const MONTH_SHORT = [
  "jan.", "fev.", "mar.", "abr.", "mai.", "jun.",
  "jul.", "ago.", "set.", "out.", "nov.", "dez.",
];

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d: Date) => `${pad(d.getDate())} de ${MONTH_SHORT[d.getMonth()]}`;

// Rótulos do gráfico (Seg..Dom => S T Q Q S S D)
const CHART_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"];
// Alturas mínimas só para manter o layout (conta nova, sem viagens)
const MIN_BARS = [10, 8, 9, 8, 10, 9, 8];

export default function EarningsScreen({
  onNavigate,
}: {
  onNavigate?: (key: NavKey) => void;
}) {
  const { periodHyphen, periodDash, repasse } = useMemo(() => {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const periodHyphen = `${fmt(first)} - ${fmt(today)}`;
    const periodDash = `${fmt(first)} – ${fmt(today)}`;
    const repasse = `Próximo repasse de ganhos em: ${fmt(today)}, 4:00`;
    return { periodHyphen, periodDash, repasse };
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#121212]">
      <div className="hide-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        {/* Cabeçalho */}
        <div className="pt-safe-lg flex items-start justify-between">
          <h1 className="text-[28px] font-bold text-white">Ganhos</h1>
          <button className="flex items-center gap-1.5 rounded-full bg-[#1E1E1E] px-3 py-1.5 text-[14px] text-white">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/60 text-[10px]">
              ?
            </span>
            Ajuda
          </button>
        </div>

        {/* Card de resumo de ganhos */}
        <div className="mt-4 rounded-2xl border border-white/[0.08] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-uberSecondary">{periodHyphen}</p>
              <p className="mt-1 text-[34px] font-bold leading-none text-white">
                R$ 0,00
              </p>
            </div>

            {/* Gráfico de barras */}
            <div className="flex flex-col items-end">
              <div className="flex h-[56px] items-end gap-[5px]">
                {MIN_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="w-[8px] rounded-sm bg-uberBlue"
                    style={{ height: h }}
                  />
                ))}
              </div>
              <div className="mt-1 flex gap-[5px]">
                {CHART_LABELS.map((l, i) => (
                  <span key={i} className="w-[8px] text-center text-[9px] text-uberSecondary">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div className="mt-4 flex items-center gap-4 text-[13px] text-uberSecondary">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              0 h online
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
              </svg>
              0 viagens
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l4 5-4 13-4-13z" /><path d="M8 8h8" />
              </svg>
              0 pontos
            </span>
          </div>

          {/* Botão Mais informações */}
          <button className="mt-4 w-full rounded-lg bg-[#2A2A2A] py-3 text-[15px] font-medium text-white">
            Mais informações
          </button>
        </div>

        {/* Carteira */}
        <h2 className="mt-7 text-[22px] font-bold text-white">Carteira</h2>

        <div className="mt-3 rounded-2xl border border-white/[0.08] p-4">
          <p className="text-[14px] text-uberSecondary">Saldo</p>
          <p className="mt-1 text-[30px] font-bold leading-none text-white">
            R$ 0,00
          </p>
          <p className="mt-3 text-[13px] text-uberSecondary">{repasse}</p>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2A2A2A] py-3 text-[15px] font-medium text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
            </svg>
            Transferências e muito mais
          </button>
        </div>

        {/* Detalhamento */}
        <h2 className="mt-7 text-[20px] font-bold leading-snug text-white">
          Detalhamento do preço pago pelo usuário
        </h2>

        <div className="mt-4 rounded-2xl border border-white/[0.08] p-4">
          <p className="text-[14px] text-uberSecondary">{periodDash}</p>

          <div className="mt-4 flex items-center gap-6">
            {/* Gráfico circular (0%) */}
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle
                cx="48" cy="48" r="38"
                fill="none" stroke="#2E2E2E" strokeWidth="12"
              />
            </svg>

            {/* Legenda */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-uberBlue" />
                <div className="leading-tight">
                  <p className="text-[14px] font-semibold text-white">0%</p>
                  <p className="text-[13px] text-uberSecondary">Você</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                <div className="leading-tight">
                  <p className="text-[14px] font-semibold text-white">0%</p>
                  <p className="text-[13px] text-uberSecondary">Uber</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Menu inferior — Ganhos ativo */}
      <BottomNav active="earnings" onNavigate={onNavigate} />
    </div>
  );
}
