"use client";

import { motion } from "framer-motion";

export default function OnlineView() {
  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex items-start justify-between">
        <button className="mt-0.5 text-neutral-300" aria-label="Opções">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="8" r="2" /><line x1="10" y1="8" x2="20" y2="8" />
            <circle cx="14" cy="16" r="2" /><line x1="4" y1="16" x2="10" y2="16" /><line x1="18" y1="16" x2="20" y2="16" />
          </svg>
        </button>
        <div className="text-center">
          <h1 className="text-[16px] font-semibold text-white">
            Próxima viagem: +R$ 3,50
          </h1>
          <p className="mt-0.5 text-[12px] text-[#AFAFAF]">Preço dinâmico mínimo</p>
        </div>
        <button className="mt-0.5 text-neutral-300" aria-label="Lista">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="7" x2="20" y2="7" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="8" y1="17" x2="20" y2="17" />
            <circle cx="4" cy="7" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="17" r="1" />
          </svg>
        </button>
      </div>

      {/* Linha azul animada (loop infinito) */}
      <div className="relative mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="absolute top-0 h-full w-1/3 rounded-full bg-uberBlue"
          animate={{ x: ["-110%", "330%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Missão + Categoria (visível com o painel aberto) */}
      <div className="mt-3 divide-y divide-white/[0.08] border-t border-white/[0.08]">
        {/* Missão */}
        <div className="flex items-start gap-3 py-3">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accentGreen" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold text-white">Missão</span>
              <span className="text-[13px] text-neutral-400">0/30</span>
            </div>
            <p className="text-[13px] text-neutral-400">R$ 70 a mais por 30 viagens</p>
          </div>
        </div>

        {/* Categoria Ouro */}
        <div className="flex items-start gap-3 py-3">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rotate-45 rounded-[2px] bg-uberBlue" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold text-white">
                Avance para a categoria Ouro
              </span>
              <span className="flex items-center gap-1 text-[13px] text-neutral-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#276EF1" strokeWidth="2">
                  <path d="M12 3l5 5-5 13-5-13z" />
                </svg>
                0/400 pontos
              </span>
            </div>

            {/* Barra 0% — somente trilha cinza */}
            <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-800" />

            {/* Indicadores 0% / 0% */}
            <div className="mt-2 flex items-center gap-4 text-[12px] text-neutral-400">
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
                0%
              </span>
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                0%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
