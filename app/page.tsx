import App from "@/components/App";

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950">
      {/* Android-style phone frame. On small screens it fills the viewport. */}
      <div className="phone-frame relative h-[100dvh] w-full max-w-[412px] overflow-hidden bg-black sm:h-[844px] sm:max-h-[92vh] sm:rounded-[2.2rem] sm:border-[10px] sm:border-neutral-800 sm:shadow-2xl">
        <App />
      </div>
    </main>
  );
}
