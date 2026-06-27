import App from "@/components/App";

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950">
      {/* Phone frame.
          - Mobile/PWA: preenche TODA a tela física (fixed inset-0), edge-to-edge.
            O fundo uberBg cobre inclusive a zona da home indicator, então o
            menu inferior fica colado na base sem nenhuma faixa preta.
          - Desktop: vira uma moldura de celular centralizada. */}
      <div className="phone-frame fixed inset-0 overflow-hidden bg-uberBg sm:relative sm:inset-auto sm:h-[844px] sm:max-h-[92vh] sm:w-full sm:max-w-[412px] sm:rounded-[2.2rem] sm:border-[10px] sm:border-neutral-800 sm:shadow-2xl">
        <App />
      </div>
    </main>
  );
}
