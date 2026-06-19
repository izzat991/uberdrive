"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { DriverStatus } from "./types";

// Os valores oscilam levemente entre os estados (como nos prints).
const VALUES: Record<DriverStatus, { topLeft: string; mid: string; bottom: string }> = {
  offline: { topLeft: "+R$ 5,25", mid: "+R$ 1,25", bottom: "+R$ 7,25" },
  loading: { topLeft: "+R$ 5,25", mid: "+R$ 2,75", bottom: "+R$ 7,75" },
  online: { topLeft: "+R$ 3,25", mid: "+R$ 1,25", bottom: "+R$ 7,75" },
};

function PinkBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-surgePink px-3 py-1 text-[13px] font-semibold text-black shadow-md">
      {children}
    </span>
  );
}

export default function SurgeBadges({ status }: { status: DriverStatus }) {
  const v = VALUES[status];
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Badge superior esquerdo (entra/sai conforme o estado) */}
      <div className="absolute left-2 top-14">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={v.topLeft}
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PinkBadge>{v.topLeft}</PinkBadge>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Badge meio-esquerda */}
      <div className="absolute left-2 top-1/3">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={v.mid}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PinkBadge>{v.mid}</PinkBadge>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Badge inferior esquerdo */}
      <div className="absolute bottom-[44%] left-2">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={v.bottom}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PinkBadge>{v.bottom}</PinkBadge>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card azul de incentivo por hora */}
      <div className="absolute right-3 top-[26%]">
        <div className="flex items-center gap-2 rounded-xl bg-surgeBlue px-3 py-2 text-white shadow-lg">
          <div className="leading-tight">
            <div className="text-[13px] font-bold">+R$ 9/hora</div>
            <div className="text-[11px] opacity-90">ativa de 12-1 AM</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
