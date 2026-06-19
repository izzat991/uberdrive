"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { DriverStatus } from "./types";

const SIZE = 76;
const STROKE = 4;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export default function StartButton({
  status,
  onStart,
  onComplete,
}: {
  status: DriverStatus;
  onStart: () => void;
  onComplete: () => void;
}) {
  // Etapa 2: ao terminar os 2s de loading, fica online.
  useEffect(() => {
    if (status !== "loading") return;
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [status, onComplete]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[30%] z-20 flex justify-center">
      <AnimatePresence>
        {status !== "online" && (
          <motion.button
            type="button"
            data-testid="start-button"
            disabled={status === "loading"}
            onClick={() => status === "offline" && onStart()}
            className="pointer-events-auto relative flex items-center justify-center rounded-full bg-startBlue text-white shadow-xl shadow-black/40"
            style={{ width: SIZE, height: SIZE }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: status === "offline" ? 0.92 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Anel de progresso durante o loading (2s) */}
            {status === "loading" && (
              <svg
                className="absolute inset-0 -rotate-90"
                width={SIZE}
                height={SIZE}
              >
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={STROKE}
                />
                <motion.circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: C }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </svg>
            )}

            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.span
                  key="loading"
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  …
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  className="text-[13px] font-bold uppercase tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Começa
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
