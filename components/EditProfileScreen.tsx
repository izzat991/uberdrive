"use client";

import { useState } from "react";
import Avatar from "./Avatar";
import type { Profile, VehicleType } from "./profile";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-1.5 block text-[13px] text-[#AFAFAF]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/[0.08] bg-[#1A1A1A] px-3 py-3 text-[16px] text-white placeholder:text-neutral-600 focus:border-[#276EF1] focus:outline-none"
      />
    </label>
  );
}

export default function EditProfileScreen({
  profile,
  onClose,
  onSave,
}: {
  profile: Profile;
  onClose?: () => void;
  onSave?: (p: Profile) => void;
}) {
  const [name, setName] = useState(profile.name);
  const [photo, setPhoto] = useState<string | null>(profile.photo);
  const [vehicle, setVehicle] = useState(profile.vehicle);
  const [plate, setPlate] = useState(profile.plate);
  const [vehicleType, setVehicleType] = useState<VehicleType>(profile.vehicleType);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute inset-0 z-[55] flex flex-col bg-[#121212]">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 px-5 pt-5">
        <button type="button" onClick={onClose} className="text-white" aria-label="Fechar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <h1 className="text-[20px] font-bold text-white">Editar perfil</h1>
      </div>

      <div className="hide-scrollbar flex-1 overflow-y-auto px-5">
        {/* Foto */}
        <div className="mt-6 flex flex-col items-center">
          <Avatar photo={photo} size={96} ring />
          <label className="mt-3 cursor-pointer text-[14px] font-medium text-[#276EF1]">
            {photo ? "Alterar foto" : "Adicionar foto"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>

        {/* Campos */}
        <Field label="Nome" value={name} onChange={setName} placeholder="Seu nome" />

        {/* Tipo de veículo: Carro ou Moto */}
        <div className="mt-4">
          <span className="mb-1.5 block text-[13px] text-[#AFAFAF]">Tipo de veículo</span>
          <div className="flex gap-2">
            {(["car", "moto"] as VehicleType[]).map((t) => {
              const active = vehicleType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVehicleType(t)}
                  className={`flex-1 rounded-lg border py-3 text-[15px] font-medium transition ${
                    active
                      ? "border-[#276EF1] bg-[#276EF1]/15 text-white"
                      : "border-white/[0.08] bg-[#1A1A1A] text-[#AFAFAF]"
                  }`}
                >
                  {t === "car" ? "Carro" : "Moto"}
                </button>
              );
            })}
          </div>
        </div>

        <Field label="Veículo" value={vehicle} onChange={setVehicle} placeholder="Ex.: Honda Civic prata" />
        <Field label="Placa do veículo" value={plate} onChange={setPlate} placeholder="Ex.: ABC1D23" />
      </div>

      {/* Salvar */}
      <div className="px-4 pb-5 pt-2">
        <button
          type="button"
          onClick={() => onSave?.({ name: name.trim() || profile.name, photo, vehicle, plate, vehicleType })}
          className="w-full rounded-full bg-[#276EF1] py-3.5 text-[16px] font-semibold text-white active:scale-[0.99]"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
