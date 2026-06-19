"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Profile } from "./profile";

type Phase = "idle" | "capturing" | "done";

// Perímetro aproximado da elipse do anel (rx=109, ry=139).
const RING_PERIMETER = 782;

export default function SelfieCapture({
  profile,
  onClose,
  onComplete,
}: {
  profile: Profile;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");

  // capturing (5s) -> done (1s) -> online
  useEffect(() => {
    if (phase === "capturing") {
      const t = setTimeout(() => setPhase("done"), 5000);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(onComplete, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div className="absolute inset-0 z-[60] flex flex-col bg-[#F2F2F2]">
      {/* Header preto com X branco */}
      <div className="flex h-14 items-center bg-black px-4">
        <button
          type="button"
          onClick={phase === "idle" ? onClose : undefined}
          className="text-white disabled:opacity-50"
          disabled={phase !== "idle"}
          aria-label="Fechar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8">
        {/* Título */}
        <h1 className="mt-8 text-center text-[22px] font-bold text-[#111111]">
          Tire uma selfie
        </h1>

        {/* Oval com a foto + anel de progresso */}
        <div className="mt-8 flex justify-center">
          <div className="relative" style={{ width: 224, height: 284 }}>
            {/* Foto dentro do oval */}
            <div className="absolute inset-[6px] overflow-hidden rounded-[50%] bg-[#dcdcdc]">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Selfie"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <svg viewBox="0 0 212 272" className="h-full w-full">
                  <rect width="212" height="272" fill="#cfcfcf" />
                  <circle cx="106" cy="108" r="46" fill="#b98c64" />
                  <path d="M32 272c0-52 33-82 74-82s74 30 74 82z" fill="#8a6a4a" />
                </svg>
              )}
            </div>

            {/* Anel de progresso azul (horário) durante a captura */}
            {phase !== "idle" && (
              <svg className="absolute inset-0" viewBox="0 0 224 284">
                <motion.ellipse
                  cx="112"
                  cy="142"
                  rx="109"
                  ry="139"
                  fill="none"
                  stroke="#276EF1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={RING_PERIMETER}
                  initial={{ strokeDashoffset: RING_PERIMETER }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </svg>
            )}
          </div>
        </div>

        {/* Rodapé: texto + botão / status */}
        <div className="mt-auto flex flex-col items-center">
          {phase === "idle" && (
            <>
              <p className="px-6 text-center text-[14px] leading-relaxed text-[#333333]">
                Posicione seu rosto no oval e mantenha-se parado.
              </p>
              <button
                type="button"
                onClick={() => setPhase("capturing")}
                aria-label="Capturar selfie"
                className="mt-6 flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-[#111111] active:scale-95"
              >
                <span className="h-[50px] w-[50px] rounded-full bg-[#111111]" />
              </button>
            </>
          )}

          {phase === "capturing" && (
            <p className="text-center text-[15px] font-medium text-[#555555]">
              Verificando identidade...
            </p>
          )}

          {phase === "done" && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1FB85F]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-[#111111]">
                Verificação concluída
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
