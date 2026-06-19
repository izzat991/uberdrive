"use client";

import BottomNav, { type NavKey } from "./BottomNav";
import VehicleArt from "./VehicleArt";
import type { Profile } from "./profile";

type ItemKey =
  | "documentos" | "repasse" | "fiscais" | "conta-uber" | "endereco"
  | "sobre" | "seguro" | "privacidade" | "config";

function ItemIcon({ k }: { k: ItemKey }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
  switch (k) {
    case "documentos":
      return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
    case "repasse":
      return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>;
    case "fiscais":
      return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2" /></svg>;
    case "conta-uber":
      return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5" /></svg>;
    case "endereco":
      return <svg {...common}><path d="M4 20l4-1 9-9-3-3-9 9z" /><path d="M14 6l3 3" /></svg>;
    case "sobre":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h0" /></svg>;
    case "seguro":
      return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
    case "privacidade":
      return <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>;
    case "config":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>;
  }
}

const ITEMS: { key: ItemKey; label: string }[] = [
  { key: "documentos", label: "Documentos" },
  { key: "repasse", label: "Repasse de ganhos" },
  { key: "fiscais", label: "Informações fiscais" },
  { key: "conta-uber", label: "Gerenciar conta da Uber" },
  { key: "endereco", label: "Edite o endereço" },
  { key: "sobre", label: "Sobre" },
  { key: "seguro", label: "Seguro" },
  { key: "privacidade", label: "Privacidade" },
  { key: "config", label: "Configurações do app" },
];

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AFAFAF" strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function AccountScreen({
  profile,
  onBack,
  onOpenVehicles,
  onNavigate,
}: {
  profile: Profile;
  onBack?: () => void;
  onOpenVehicles?: () => void;
  onNavigate?: (key: NavKey) => void;
}) {
  return (
    <div className="absolute inset-0 z-[45] flex flex-col bg-[#121212]">
      <div className="hide-scrollbar flex-1 overflow-y-auto px-5">
        {/* Cabeçalho */}
        <div className="pt-5">
          <button type="button" onClick={onBack} className="text-white" aria-label="Voltar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <h1 className="mt-3 text-[28px] font-bold text-white">Conta</h1>
        </div>

        {/* Primeiro item: Veículos */}
        <button
          type="button"
          onClick={onOpenVehicles}
          className="mt-3 flex w-full items-center gap-3 py-3 text-left"
        >
          <span className="flex h-9 w-12 items-center justify-center">
            <VehicleArt type={profile.vehicleType} className="h-9 w-12" />
          </span>
          <span className="flex-1">
            <span className="block text-[16px] font-medium text-white">Veículos</span>
            <span className="block text-[13px] text-[#AFAFAF]">
              {`${profile.vehicle} ${profile.plate}`.trim()}
            </span>
          </span>
          <Chevron />
        </button>

        <div className="border-t border-white/[0.08]" />

        {/* Demais itens */}
        {ITEMS.map((it) => (
          <button
            key={it.key}
            type="button"
            className="flex w-full items-center gap-3 py-4 text-left"
          >
            <span className="text-white">
              <ItemIcon k={it.key} />
            </span>
            <span className="flex-1 text-[16px] text-white">{it.label}</span>
            <Chevron />
          </button>
        ))}

        {/* Trocar conta */}
        <div className="mt-1 border-t border-white/[0.08]">
          <button type="button" className="w-full py-4 text-left text-[16px] text-white">
            Trocar conta
          </button>
        </div>

        <div className="h-2" />
      </div>

      <BottomNav active="menu" onNavigate={onNavigate} />
    </div>
  );
}
