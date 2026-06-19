"use client";

import BottomNav, { type NavKey } from "./BottomNav";
import Avatar from "./Avatar";
import type { Profile } from "./profile";

const MAIN_ITEMS = ["Indicações", "Descubra", "Uber Pro", "Carteira", "Conta"];
const SECONDARY_ITEMS = ["Ajuda", "Dicas e informações"];

export default function MenuScreen({
  profile,
  onNavigate,
  onOpenProfile,
  onEditProfile,
  onOpenAccount,
}: {
  profile: Profile;
  onNavigate?: (key: NavKey) => void;
  onOpenProfile?: () => void;
  onEditProfile?: () => void;
  onOpenAccount?: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#121212]">
      <div className="hide-scrollbar flex-1 overflow-y-auto px-5">
        {/* Perfil */}
        <div className="pt-6">
          <div className="flex items-center gap-3">
            {/* Foto com diamante sobreposto no canto inferior esquerdo */}
            <div className="relative">
              <Avatar photo={profile.photo} size={44} />
              <span className="absolute -bottom-1 -left-1 h-3.5 w-3.5 rotate-45 rounded-[3px] border-2 border-[#121212] bg-[#276EF1]" />
            </div>
            {/* Nome (clicável -> Perfil) + avaliação */}
            <button type="button" onClick={onOpenProfile} className="text-left">
              <p className="text-[16px] font-semibold leading-tight text-white">
                {profile.name}
              </p>
              <p className="text-[14px] leading-tight text-[#BDBDBD]">★5,00</p>
            </button>
          </div>
        </div>

        {/* Lista principal */}
        <div className="mt-5">
          {MAIN_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={item === "Conta" ? onOpenAccount : undefined}
              className="block w-full py-3 text-left text-[22px] font-semibold text-white"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Divisor */}
        <div className="my-3 border-t border-white/[0.08]" />

        {/* Lista secundária */}
        <div className="mt-2">
          {SECONDARY_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={item === "Ajuda" ? onEditProfile : undefined}
              className="block w-full py-2.5 text-left text-[15px] font-normal text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Menu inferior — Menu ativo */}
      <BottomNav active="menu" onNavigate={onNavigate} />
    </div>
  );
}
