"use client";

import {
  motion,
  useAnimationControls,
  type PanInfo,
} from "framer-motion";
import { useEffect } from "react";
import type { DriverStatus, SnapPoint } from "./types";
import OfflineView from "./OfflineView";
import OnlineView from "./OnlineView";

// Config da sheet por estado. Online é compacto (não cobre meia tela).
const SHEETS = {
  offline: { height: 520, closed: 150, mid: 330, open: 470 },
  online: { height: 232, closed: 88, mid: 88, open: 226 },
} as const;

export default function BottomSheet({
  status,
  snap,
  onSnapChange,
}: {
  status: DriverStatus;
  snap: SnapPoint;
  onSnapChange: (s: SnapPoint) => void;
}) {
  const isOnline = status === "online";
  const cfg = isOnline ? SHEETS.online : SHEETS.offline;
  const SHEET_HEIGHT = cfg.height;
  const offsetFor = (s: SnapPoint) => SHEET_HEIGHT - cfg[s];

  const controls = useAnimationControls();

  // Sempre que o snap muda externamente, anima até a posição (ease-out, ~400ms).
  useEffect(() => {
    controls.start({
      y: offsetFor(snap),
      transition: { type: "spring", stiffness: 220, damping: 30 },
    });
  }, [snap, controls]);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const current = offsetFor(snap);
    const projected = current + info.offset.y + info.velocity.y * 0.18;

    // Online tem só "fechado" (peek) e "aberto".
    const candidates: SnapPoint[] = isOnline
      ? ["closed", "open"]
      : ["closed", "mid", "open"];

    let best = candidates[0];
    let bestDist = Infinity;
    for (const c of candidates) {
      const d = Math.abs(offsetFor(c) - projected);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    onSnapChange(best);
  };

  return (
    <motion.div
      className={`absolute inset-x-0 bottom-0 z-30 rounded-t-3xl border-t shadow-[0_-10px_40px_rgba(0,0,0,0.6)] ${
        isOnline ? "border-white/[0.08] bg-[#111111]" : "border-sheetEdge bg-sheet"
      }`}
      style={{ height: SHEET_HEIGHT, touchAction: "none" }}
      initial={{ y: offsetFor(snap) }}
      animate={controls}
      drag="y"
      dragConstraints={{ top: offsetFor("open"), bottom: offsetFor("closed") }}
      dragElastic={0.04}
      onDragEnd={handleDragEnd}
    >
      {/* Alça de arraste */}
      <div className="flex justify-center pt-3">
        <div className="h-1.5 w-10 rounded-full bg-neutral-600" />
      </div>

      <div className="hide-scrollbar h-full overflow-hidden px-5 pt-2">
        {status === "online" ? <OnlineView /> : <OfflineView />}
      </div>
    </motion.div>
  );
}
