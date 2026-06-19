"use client";

import type { VehicleType } from "./profile";

/**
 * Ícone do veículo (moto ou carro) — assets em /public/vehicles.
 * Usado como miniatura (Conta) e foto grande (Veículos).
 */
export default function VehicleArt({
  type,
  className,
}: {
  type: VehicleType;
  className?: string;
}) {
  const src = type === "moto" ? "/vehicles/moto.webp" : "/vehicles/car.webp";
  return (
    <img
      src={src}
      alt={type === "moto" ? "Moto" : "Carro"}
      className={`object-contain ${className ?? ""}`}
      draggable={false}
    />
  );
}
