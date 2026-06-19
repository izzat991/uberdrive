"use client";

import { useMemo } from "react";
import BottomNav, { type NavKey } from "./BottomNav";

// Nomes em PT-BR
const WEEKDAY_NAME = [
  "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
];
const WEEKDAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_NAME = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Mini mapa claro (estilo Google Maps) usado nas oportunidades
function MiniMap() {
  return (
    <div className="relative h-[64px] w-[88px] shrink-0 overflow-hidden rounded-lg">
      <svg viewBox="0 0 88 64" className="h-full w-full">
        <rect width="88" height="64" fill="#e7e4dc" />
        {/* água */}
        <path d="M0 50 Q30 44 60 52 L88 48 L88 64 L0 64 Z" fill="#a9d3e0" />
        {/* áreas verdes */}
        <rect x="4" y="6" width="22" height="16" rx="2" fill="#cfe3bf" />
        <rect x="58" y="4" width="26" height="14" rx="2" fill="#cfe3bf" />
        {/* ruas */}
        <g stroke="#ffffff" strokeWidth="2.4">
          <path d="M-2 26 L90 20" />
          <path d="M30 -2 L24 64" />
          <path d="M-2 40 L90 38" />
        </g>
        <g stroke="#f4c14b" strokeWidth="1.6">
          <path d="M0 14 L88 30" />
        </g>
      </svg>
      <span className="absolute left-1 top-1 text-[6px] font-medium text-neutral-700">
        Duque de Caxias
      </span>
      <span className="absolute bottom-3 right-1 text-[6px] font-medium text-neutral-700">
        Rio de Janeiro
      </span>
    </div>
  );
}

function OpportunityBlock({ time }: { time: string }) {
  return (
    <div className="border-t border-white/[0.08] px-5 py-4">
      {/* Horário + chevron */}
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[13px] text-uberSecondary">{time}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AFAFAF" strokeWidth="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <h3 className="text-[17px] font-semibold leading-snug text-white">
            Ganhe R$ 9 a mais por hora ativa
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-uberSecondary">
            Aplicado por viagem. Com base no tempo estimado da aceitação até a
            entrega.
          </p>
        </div>
        <MiniMap />
      </div>

      {/* Chip */}
      <div className="mt-3">
        <span className="inline-block rounded-md bg-[#2a2a2a] px-2.5 py-1 text-[12px] text-uberSecondary">
          Somente viagens de moto
        </span>
      </div>

      {/* Salvar */}
      <button className="mt-3 flex items-center gap-2 text-[14px] font-medium text-white">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" />
        </svg>
        Salvar
      </button>
    </div>
  );
}

export default function DiscoverScreen({
  onNavigate,
}: {
  onNavigate?: (key: NavKey) => void;
}) {
  const { weekDays, today, headerLabel, expLabel } = useMemo(() => {
    const today = new Date();

    // Semana iniciando na segunda-feira (mostra 9 dias p/ efeito de rolagem)
    const dow = today.getDay(); // 0=Dom
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    const weekDays = Array.from({ length: 9 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });

    const headerLabel = `${WEEKDAY_NAME[today.getDay()]}, ${today.getDate()} de ${
      MONTH_NAME[today.getMonth()]
    }`;

    // Expiração da campanha: ancorada em 12 de Outubro; avança 1 mês a cada
    // vez que a data 12 é alcançada/ultrapassada.
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const target = new Date(today.getFullYear(), 9, 12); // 9 = Outubro
    while (todayMid >= target) target.setMonth(target.getMonth() + 1);
    const expLabel = `Até ${target.getDate()} de ${MONTH_NAME[target.getMonth()]}, às 4:00`;

    return { weekDays, today, headerLabel, expLabel };
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#121212]">
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        {/* Título */}
        <h1 className="pt-safe-lg px-5 pb-3 text-[26px] font-bold text-white">
          Descubra
        </h1>

        {/* Chips de filtro */}
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">
          {[
            { label: "Salvo", icon: "bookmark" },
            { label: "Promoções", icon: "promo" },
            { label: "Aeroportos", icon: "plane" },
          ].map((c) => (
            <span
              key={c.label}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#1E1E1E] px-3.5 py-2 text-[14px] text-white"
            >
              {c.icon === "bookmark" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" />
                </svg>
              )}
              {c.icon === "promo" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" />
                </svg>
              )}
              {c.icon === "plane" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 16l20-7-20-7 5 7-5 7z" />
                </svg>
              )}
              {c.label}
            </span>
          ))}
        </div>

        {/* Calendário da semana */}
        <div className="hide-scrollbar flex gap-1 overflow-x-auto px-4 pb-4 pt-1">
          {weekDays.map((d, i) => {
            const selected = sameDay(d, today);
            return (
              <div
                key={i}
                className="flex w-[36px] shrink-0 flex-col items-center gap-1"
              >
                <span className="text-[12px] text-uberSecondary">
                  {WEEKDAY_SHORT[d.getDay()]}
                </span>
                <span
                  className={`text-[15px] ${
                    selected ? "font-semibold text-white" : "text-uberSecondary"
                  }`}
                >
                  {d.getDate()}
                </span>
                {/* indicador branco inferior do dia ativo */}
                <span
                  className={`h-[2px] w-5 rounded-full ${
                    selected ? "bg-white" : "bg-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Card de missão */}
        <div className="px-4">
          <div className="rounded-xl bg-[#1E1E1E] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="max-w-[230px] text-[15px] font-medium leading-snug text-white">
                R$ 70 adicionais ao concluir 30 viagens (apenas para viagens)
              </p>
              {/* bandeira */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
                <path d="M5 21V4" />
                <path d="M5 4h12l-2 4 2 4H5" fill="white" />
              </svg>
            </div>
            <p className="mt-2 text-[13px] text-uberSecondary">{expLabel}</p>
            {/* barra de progresso */}
            <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white" style={{ width: "82%" }} />
            </div>
          </div>
        </div>

        {/* Cabeçalho de data dinâmico */}
        <h2 className="px-5 pb-1 pt-5 text-[20px] font-bold text-white">
          {headerLabel}
        </h2>

        {/* Lista de oportunidades */}
        <OpportunityBlock time="0:00 - 1:00" />
        <OpportunityBlock time="7:00 - 8:00" />
        <div className="h-4" />
      </div>

      {/* Menu inferior — Descubra ativo */}
      <BottomNav active="discover" onNavigate={onNavigate} />
    </div>
  );
}
