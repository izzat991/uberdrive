"use client";

import BottomNav, { type NavKey } from "./BottomNav";
import Avatar from "./Avatar";
import type { Profile } from "./profile";

type Badge = "warn" | "excl" | "check";

function ProBadge({ type }: { type: Badge }) {
  // Fundo escuro tonalizado + ícone colorido, igual ao Uber Driver.
  const bg = type === "warn" ? "#3A1D22" : type === "excl" ? "#3D2C15" : "#163226";
  return (
    <span
      className="mt-2 inline-flex h-[22px] items-center gap-1 rounded-full px-2 text-[11px] font-medium"
      style={{ background: bg, color: "#E8E8E8" }}
    >
      {type === "warn" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#E5484D">
          <path d="M12 3l10 18H2z" />
          <rect x="11" y="9" width="2" height="6" fill={bg} />
          <rect x="11" y="16" width="2" height="2" fill={bg} />
        </svg>
      )}
      {type === "excl" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#F5A623">
          <circle cx="12" cy="12" r="10" />
          <rect x="11" y="6" width="2" height="8" fill={bg} />
          <rect x="11" y="16" width="2" height="2" fill={bg} />
        </svg>
      )}
      {type === "check" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#1FB85F">
          <circle cx="12" cy="12" r="10" />
          <path d="M7 12l3 3 7-7" fill="none" stroke={bg} strokeWidth="2.4" />
        </svg>
      )}
      Uber Pro
    </span>
  );
}

function Metric({
  value,
  label,
  badge,
}: {
  value: string;
  label: string;
  badge: Badge;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] p-4">
      <p className="text-[26px] font-bold leading-none text-white">{value}</p>
      <p className="mt-2 text-[15px] leading-snug text-white">{label}</p>
      <ProBadge type={badge} />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
      <h2 className="text-[20px] font-bold text-white">{title}</h2>
      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

function Highlight({
  value,
  label,
  img,
}: {
  value: string;
  label: string;
  img: string;
}) {
  return (
    <div>
      <div className="h-[100px] overflow-hidden rounded-2xl">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <p className="mt-2 text-[22px] font-bold leading-none text-white">{value}</p>
      <p className="mt-1 text-[13px] leading-snug text-[#AFAFAF]">{label}</p>
    </div>
  );
}

export default function ProfileScreen({
  profile,
  onClose,
  onNavigate,
}: {
  profile: Profile;
  onClose?: () => void;
  onNavigate?: (key: NavKey) => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#121212]">
      <div className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-4">
        {/* Cabeçalho */}
        <div className="pt-safe-lg">
          <button type="button" onClick={onClose} className="text-white" aria-label="Fechar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <h1 className="mt-3 text-[28px] font-bold text-white">Perfil</h1>
        </div>

        {/* Card do perfil */}
        <div className="mt-4 rounded-2xl border border-white/[0.08] p-4">
          <div className="flex items-center gap-3.5">
            {/* Foto com o badge "◆ Azul" (com fundo) centralizado sobrepondo a base */}
            <div className="relative shrink-0">
              <Avatar photo={profile.photo} size={68} ring />
              <div className="absolute -bottom-0.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#121212] px-1.5 py-[3px]">
                <span className="h-[7px] w-[7px] rotate-45 rounded-[1px] bg-[#276EF1]" />
                <span className="text-[11px] font-semibold leading-none text-[#C8C8C8]">
                  Azul
                </span>
              </div>
            </div>
            <div>
              <p className="text-[18px] font-bold leading-tight text-white">{profile.name}</p>
              <button className="mt-1.5 inline-flex h-[34px] items-center rounded-full bg-[#2A2A2A] px-3 text-[13px] text-white">
                Ver perfil público
              </button>
            </div>
          </div>
        </div>

        {/* Indicador central */}
        <div className="flex justify-center py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        </div>

        {/* Viagens */}
        <SectionHeader title="Viagens" />
        <div className="grid grid-cols-2 gap-3">
          <Metric value="0%" label="Taxa de aceitação" badge="warn" />
          <Metric value="0%" label="Taxa de cancelamento" badge="excl" />
          <Metric value="0,00 ★" label="Avaliação média em estrelas" badge="check" />
        </div>

        {/* Entregas */}
        <SectionHeader title="Entregas" />
        <div className="grid grid-cols-2 gap-3">
          <Metric value="0%" label="Taxa de aceitação" badge="warn" />
          <Metric value="0%" label="Taxa de cancelamento" badge="excl" />
          <Metric value="0%" label="Taxa de satisfação" badge="check" />
          <Metric value="0%" label="Taxa de pontualidade" badge="check" />
        </div>

        {/* Relatórios */}
        <SectionHeader title="Relatórios" />
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
          </span>
          <span className="flex-1 text-[15px] text-white">
            Não há relatórios para mostrar
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AFAFAF" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </div>

        {/* Destaques da trajetória */}
        <h2 className="mb-3 mt-7 text-[20px] font-bold text-white">
          Destaques da trajetória
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Highlight value="0" label="Total de viagens" img="/destaques/trips.png" />
          <Highlight value="0 meses" label="Tempo usando o app da Uber" img="/destaques/time.png" />
          <Highlight value="0" label="Viagens" img="/destaques/rides.png" />
          <Highlight value="0" label="Entregas" img="/destaques/deliveries.png" />
        </div>

        <div className="h-4" />
      </div>

      {/* Menu inferior — Menu ativo */}
      <BottomNav active="menu" onNavigate={onNavigate} />
    </div>
  );
}
