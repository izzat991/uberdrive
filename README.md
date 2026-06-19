# Driver App — réplica visual estilo Uber Driver

Réplica fiel dos 3 estados (Offline → Loading → Online) de um app de motorista,
com mapa, surge badges, botão COMEÇA e bottom sheet arrastável.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS (dark mode)
- Framer Motion (animações / drag / snap points)
- PWA (manifest + service worker) — instalável e compatível com WebView
- Mobile first, com moldura de smartphone Android no desktop

## Rodar
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # produção (service worker ativa só em prod)
```

## Estados e interações
- **Offline (Print 1):** mapa + `18 | 30` + badges rosa + card azul + COMEÇA + sheet "Você está offline".
- **Interação 1:** tocar/arrastar a tela sobe a sheet (snap `mid`) → Print 2.
- **Interação 2:** clicar em **COMEÇA** → anel de progresso circular (2s) → online.
- **Online (Print 3):** "Próxima viagem: +R$ 3,50", seção Missão (verde) e Categoria Ouro
  (vermelho) com barra de progresso e percentuais. COMEÇA desaparece.

## Bottom sheet
Arrastável com 3 snap points: `closed` · `mid` · `open` (online não permite `closed`).

## Estrutura de componentes
```
App
 ├─ DriverMap        (mapa SVG + parallax + marcador)
 ├─ TopStatus        (home · 18|30 · busca)
 ├─ SurgeBadges      (badges rosa + card azul)
 ├─ StartButton      (idle / loading / online)
 ├─ LoadingOverlay   (escurece durante o loading)
 └─ BottomSheet      (drag + snap)
     ├─ OfflineView
     └─ OnlineView
```

## PWA / WebView
- `public/manifest.json` (display `standalone`, ícones 192/512).
- `public/sw.js` registrado por `ServiceWorkerRegister` (somente em produção).
- `viewport-fit: cover` + `themeColor` para tela cheia em WebView Android/iOS.
- Ícones gerados por `scripts/gen-icons.mjs`.
