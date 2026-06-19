"use client";

import { AnimatePresence, motion } from "framer-motion";

/**
 * Escurece levemente o mapa enquanto o botão COMEÇA está em loading,
 * dando foco à animação de progresso (como no Uber Driver).
 */
export default function LoadingOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
}
