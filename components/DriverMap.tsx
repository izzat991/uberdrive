"use client";

import { motion } from "framer-motion";
import type { DriverStatus, SnapPoint } from "./types";

const PARALLAX: Record<SnapPoint, number> = {
  closed: 0,
  mid: -28,
  open: -64,
};

export default function DriverMap({
  snap,
  status,
  onSurfaceTap,
}: {
  snap: SnapPoint;
  status: DriverStatus;
  onSurfaceTap: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 bg-uberBg"
      onClick={onSurfaceTap}
      animate={{ y: PARALLAX[snap], scale: snap === "open" ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
    >
      {/* Imagem do mapa como fundo (substitui o mapa SVG).
          A imagem já contém badges, card azul e marcador embutidos. */}
      <img
        src="/mapa.png"
        alt="Mapa"
        className="pointer-events-none h-full w-full select-none object-cover"
        draggable={false}
      />
    </motion.div>
  );
}
