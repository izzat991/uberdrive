"use client";

export default function FacialVerification({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="absolute inset-0 z-[60] flex flex-col bg-uberBg">
      <div className="hide-scrollbar flex-1 overflow-y-auto px-6 pt-5">
        {/* Botão fechar (X) */}
        <button
          type="button"
          onClick={onClose}
          className="text-white"
          aria-label="Fechar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Ilustração superior: foto do rosto (asset) */}
        <div className="mb-6 mt-3 flex justify-center">
          <img
            src="/iconfacial.png"
            alt=""
            className="h-[150px] w-[150px] object-contain"
            draggable={false}
          />
        </div>

        {/* Título */}
        <h1 className="mb-4 text-[26px] font-bold leading-tight text-white">
          Tire uma foto do seu rosto
        </h1>

        {/* Texto explicativo */}
        <p className="mb-4 text-[15px] leading-relaxed text-uberSecondary">
          Nós pedimos para você confirmar a sua identidade periodicamente para
          poder continuar usando o app. Isso ajuda manter a Comunidade Uber
          segura.
        </p>
        <p className="mb-5 text-[15px] leading-relaxed text-uberSecondary">
          Para evitar erros, envie uma foto sua em tempo real, não uma foto
          tirada anteriormente. Remova qualquer acessório que cubra seu rosto,
          incluindo máscaras, óculos ou bonés.
        </p>

        <p className="mb-3 text-[12px] leading-relaxed text-neutral-600">
          Esta sessão é habilitada para vídeo e pode ser gravada.
        </p>
        <p className="mb-6 text-[12px] leading-relaxed text-neutral-600">
          Ao enviar sua selfie em tempo real, você concorda que a Uber ou um
          fornecedor de confiança usará a tecnologia de reconhecimento facial
          para confirmar sua identidade comparando sua foto com a foto do seu
          perfil. A Uber também pode usar sua foto para verificar se há
          duplicidade em outras contas.{" "}
          <span className="text-neutral-400 underline">Saiba mais</span>
        </p>
      </div>

      {/* Botão Continuar */}
      <div className="px-4 pb-4 pt-1">
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-lg bg-[#D9D9D9] py-3.5 text-[16px] font-medium text-black active:opacity-90"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
