"use client";

import { motion } from "framer-motion";

export default function OfflineView() {
  return (
    <motion.div
      key="offline"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between py-3">
        <button className="text-neutral-300" aria-label="Opções">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="8" r="2" /><line x1="10" y1="8" x2="20" y2="8" />
            <circle cx="14" cy="16" r="2" /><line x1="4" y1="16" x2="10" y2="16" /><line x1="18" y1="16" x2="20" y2="16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-white">Você está offline</h1>
        <button className="text-neutral-300" aria-label="Lista">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="7" x2="20" y2="7" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="8" y1="17" x2="20" y2="17" />
            <circle cx="4" cy="7" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="17" r="1" />
          </svg>
        </button>
      </div>

      <div className="mt-2 space-y-1 border-t border-sheetEdge pt-2">
        {/* Ver tempo ao volante */}
        <button className="flex w-full items-center gap-4 rounded-xl px-1 py-4 text-left transition active:bg-white/5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" />
              <path d="M3 12h4M17 12h4M12 3v4" />
            </svg>
          </span>
          <span className="text-[15px] text-white">Ver tempo ao volante</span>
        </button>

        {/* Registro de viagens */}
        <button className="w-full rounded-xl px-1 py-4 text-center text-[15px] font-medium text-surgeBlue transition active:bg-white/5">
          Registro de viagens
        </button>
      </div>
    </motion.div>
  );
}
