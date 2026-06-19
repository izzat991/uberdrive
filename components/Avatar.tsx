"use client";

export default function Avatar({
  photo,
  size = 44,
  ring = false,
}: {
  photo: string | null;
  size?: number;
  ring?: boolean;
}) {
  const inner = photo ? (
    <img
      src={photo}
      alt="Foto de perfil"
      className="h-full w-full rounded-full object-cover"
      draggable={false}
    />
  ) : (
    <svg viewBox="0 0 44 44" className="h-full w-full rounded-full">
      <rect width="44" height="44" fill="#5a3a2c" />
      <circle cx="22" cy="17" r="8" fill="#e2b48c" />
      <path d="M8 44c0-9 6.5-14 14-14s14 5 14 14z" fill="#3b2a22" />
    </svg>
  );

  if (ring) {
    // Anel azul 2px colado na foto (sem espaçamento extra).
    return (
      <div
        className="shrink-0 overflow-hidden rounded-full border-2 bg-[#5a3a2c]"
        style={{ width: size, height: size, borderColor: "#276EF1" }}
      >
        {inner}
      </div>
    );
  }

  return (
    <div
      className="shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#5a3a2c]"
      style={{ width: size, height: size }}
    >
      {inner}
    </div>
  );
}
