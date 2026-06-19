import App from "@/components/App";

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950">
      {/* Phone frame. No mobile preenche a tela inteira (edge-to-edge, sem
          faixa preta da home indicator). No desktop vira moldura centralizada. */}
      <div className="phone-frame fixed inset-0 overflow-hidden bg-black sm:relative sm:inset-auto sm:h-[844px] sm:max-h-[92vh] sm:w-full sm:max-w-[412px] sm:rounded-[2.2rem] sm:border-[10px] sm:border-neutral-800 sm:shadow-2xl">
        <App />
      </div>
    </main>
  );
}
