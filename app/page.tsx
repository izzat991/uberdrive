import App from "@/components/App";

export default function Page() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-uberBg">
      {/* Phone frame.
          - Mobile/PWA: preenche TODA a viewport visual (absolute inset-0),
            edge-to-edge. O fundo uberBg cobre inclusive a zona da home
            indicator, então o menu inferior fica colado na base física da
            tela sem nenhuma faixa preta, em qualquer modelo de iPhone.
          - Desktop: vira uma moldura de celular centralizada. */}
      <div className="phone-frame absolute inset-0 overflow-hidden bg-uberBg sm:relative sm:inset-auto sm:h-[844px] sm:max-h-[92vh] sm:w-full sm:max-w-[412px] sm:rounded-[2.2rem] sm:border-[10px] sm:border-neutral-800 sm:shadow-2xl">
        <App />
      </div>
    </main>
  );
}
