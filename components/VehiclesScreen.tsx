"use client";

import BottomNav, { type NavKey } from "./BottomNav";
import VehicleArt from "./VehicleArt";
import type { Profile } from "./profile";

export default function VehiclesScreen({
  profile,
  onBack,
  onNavigate,
}: {
  profile: Profile;
  onBack?: () => void;
  onNavigate?: (key: NavKey) => void;
}) {
  const usage = profile.vehicleType === "moto" ? "Apenas entrega" : "Viagens e entregas";

  return (
    <div className="absolute inset-0 z-[45] flex flex-col bg-[#121212]">
      {/* Cabeçalho */}
      <div className="flex items-center px-4 pt-5">
        <button type="button" onClick={onBack} className="text-white" aria-label="Voltar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold text-white">
          Veículos
        </h1>
        {/* Ícone de presente */}
        <button className="text-white" aria-label="Presente">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v8h14v-8M12 8v13" />
            <path d="M12 8S10 3 7.5 4 9 8 12 8zM12 8s2-5 4.5-4S15 8 12 8z" />
          </svg>
        </button>
      </div>

      <div className="hide-scrollbar flex-1 overflow-y-auto px-4">
        {/* Foto do veículo */}
        <div className="mt-3 flex justify-center">
          <VehicleArt type={profile.vehicleType} className="h-[120px] w-[220px]" />
        </div>

        {/* Dados */}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h2 className="text-[24px] font-bold leading-tight text-white">
              {profile.vehicle}
            </h2>
            <p className="mt-1 text-[15px] text-[#AFAFAF]">{profile.plate}</p>
            <p className="text-[15px] text-[#AFAFAF]">{usage}</p>
          </div>
          {/* Três pontos */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E1E1E] text-white"
            aria-label="Mais opções"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
            </svg>
          </button>
        </div>

        {/* Gerenciar veículos */}
        <button className="mt-5 w-full rounded-lg bg-[#2A2A2A] py-3.5 text-center text-[15px] font-medium text-white">
          Gerenciar veículos
        </button>

        {/* Card azul petróleo */}
        <div className="mt-5 rounded-2xl bg-[#005F73] p-4">
          <h3 className="text-[18px] font-bold leading-snug text-white">
            Descubra oportunidades de veículos
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-white/85">
            Veja as opções de veículos de parceiro locador, aluguel ou compra de
            veículos se precisar de outro veículo.
          </p>
          <button className="mt-3 flex items-center gap-1.5 text-[14px] font-semibold text-white">
            Saiba mais
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="h-4" />
      </div>

      <BottomNav active="menu" onNavigate={onNavigate} />
    </div>
  );
}
