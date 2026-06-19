"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { VehicleType } from "./profile";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#2a2a2a] px-2.5 py-1 text-[13px] font-medium text-white">
      {children}
    </span>
  );
}

// Valor aleatório: moto até R$ 20,00 / carro de R$ 10 a R$ 30.
function randomFare(type: VehicleType) {
  const v = type === "moto" ? Math.random() * 13.5 + 6 : Math.random() * 20 + 10;
  return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

export default function RideRequest({
  vehicleType,
  onAccept,
  onExpire,
}: {
  vehicleType: VehicleType;
  onAccept: () => void;
  onExpire: () => void;
}) {
  const [fare] = useState(() => randomFare(vehicleType));
  const isMoto = vehicleType === "moto";

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-40 rounded-t-2xl border-t border-white/[0.08] bg-[#1a1a1a] px-5 pb-5 pt-4"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      {/* Cabeçalho: Moto + Exclusivo + X */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2a2a] px-2.5 py-1 text-[13px] font-medium text-white">
          {isMoto ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" />
              <path d="M9 17h5l3-6h-3M6 17l3-6h4" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 13l2-5a2 2 0 012-1.3h8A2 2 0 0117 8l2 5" />
              <path d="M3 13h18v4H3z" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" />
            </svg>
          )}
          {isMoto ? "Moto" : "Carro"}
        </span>
        <span className="text-[14px] font-semibold text-[#4D89F7]">Exclusivo</span>
        <button
          onClick={onExpire}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a] text-white"
          aria-label="Recusar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Valor */}
      <p className="mt-2 text-[34px] font-bold leading-none text-white">{fare}</p>

      {/* Badges */}
      <div className="mt-2.5 flex flex-wrap gap-2">
        <Chip>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z" />
          </svg>
          4,78 (1304)
        </Chip>
        <Chip>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#4D89F7">
            <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
          </svg>
          +R$ 3,50 incluído
        </Chip>
      </div>
      <div className="mt-2">
        <Chip>Turbo+ de R$ 4,48 incluído</Chip>
      </div>

      {/* Detalhes da rota */}
      <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4">
        <div className="flex gap-3">
          <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-white">
            <span className="h-1 w-1 rounded-full bg-white" />
          </span>
          <div className="-mt-0.5">
            <p className="text-[14px] text-white">9 minutos (4.8 km) de distância</p>
            <p className="text-[13px] text-[#AFAFAF]">
              Rua Rodrigues de Freitas, Santíssimo e arredores
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded-[3px] bg-white" />
          <div className="-mt-0.5">
            <p className="text-[14px] text-white">Viagem de 20 minutos (12.4 km)</p>
            <p className="text-[13px] text-[#AFAFAF]">
              Rua Boa Fé, 5 - Inhoaíba - Rio de Janeiro - RJ, 23063-520
            </p>
          </div>
        </div>
      </div>

      {/* Botão Aceitar com contagem regressiva (10s) */}
      <button
        onClick={onAccept}
        className="relative mt-4 w-full overflow-hidden rounded-lg bg-[#276EF1] py-3.5"
      >
        <motion.span
          className="absolute inset-y-0 left-0 bg-white/25"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }}
          onAnimationComplete={onExpire}
        />
        <span className="relative text-[16px] font-semibold text-white">Aceitar</span>
      </button>
    </motion.div>
  );
}
