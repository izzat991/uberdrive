"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DriverStatus, SnapPoint } from "./types";
import { DEFAULT_PROFILE, loadProfile, saveProfile, type Profile } from "./profile";
import DriverMap from "./DriverMap";
import TopStatus from "./TopStatus";
// import SurgeBadges from "./SurgeBadges"; // desativado: badges embutidos na imagem
import StartButton from "./StartButton";
import BottomSheet from "./BottomSheet";
import LoadingOverlay from "./LoadingOverlay";
import HomeScreen from "./HomeScreen";
import FacialVerification from "./FacialVerification";
import SelfieCapture from "./SelfieCapture";
import RideRequest from "./RideRequest";
import DiscoverScreen from "./DiscoverScreen";
import EarningsScreen from "./EarningsScreen";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import AccountScreen from "./AccountScreen";
import VehiclesScreen from "./VehiclesScreen";
import type { NavKey } from "./BottomNav";

type Screen =
  | "map"
  | "home"
  | "discover"
  | "earnings"
  | "menu"
  | "profile"
  | "editProfile"
  | "account"
  | "vehicles";
type Verify = "none" | "loading" | "facial" | "selfie";

export default function App() {
  const [status, setStatus] = useState<DriverStatus>("offline");
  const [snap, setSnap] = useState<SnapPoint>("closed");
  const [screen, setScreen] = useState<Screen>("home");
  const [navLoading, setNavLoading] = useState(false);
  const [verify, setVerify] = useState<Verify>("none");
  const [ride, setRide] = useState<"none" | "incoming">("none");
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  // Busca de corrida: online + sem corrida -> após 8s chega uma solicitação.
  useEffect(() => {
    if (status !== "online" || screen !== "map" || ride !== "none") return;
    const t = setTimeout(() => setRide("incoming"), 8000);
    return () => clearTimeout(t);
  }, [status, screen, ride]);

  // Carrega o perfil salvo (localStorage) após montar (client-only).
  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const updateProfile = useCallback((p: Profile) => {
    setProfile(p);
    saveProfile(p);
  }, []);

  // Interação 1: tocar na tela (ou arrastar) sobe a bottom sheet para o "meio".
  const handleSurfaceTap = useCallback(() => {
    if (status === "offline") {
      setSnap((s) => (s === "closed" ? "mid" : s));
    }
  }, [status]);

  // Interação 2: COMEÇA -> loading (2s) -> online.
  const handleStartComplete = useCallback(() => {
    setStatus("online");
    setSnap("open");
  }, []);

  // Navegação com animação de carregamento (sem fade): mostra o spinner,
  // troca a aba por baixo e remove o spinner.
  const goToScreen = useCallback(
    (target: Screen) => {
      if (target === screen) return;
      setNavLoading(true);
      setTimeout(() => {
        setScreen(target);
        setNavLoading(false);
      }, 500);
    },
    [screen]
  );

  // Clicar na casinha (na tela do mapa) -> tela Home.
  const handleHome = useCallback(() => goToScreen("home"), [goToScreen]);

  // "Ficar online" na Home: Loading 1,5s -> Verificação Facial.
  const handleGoOnline = useCallback(() => {
    setVerify("loading");
    setTimeout(() => setVerify("facial"), 1500);
  }, []);

  // Verificação facial concluída -> motorista ONLINE na tela do mapa.
  const handleVerified = useCallback(() => {
    setStatus("online");
    setSnap("open");
    setScreen("map");
    setVerify("none");
  }, []);

  // Navegação pelo menu inferior.
  const handleNavigate = useCallback(
    (key: NavKey) => {
      if (key === "home") goToScreen("home");
      else if (key === "discover") goToScreen("discover");
      else if (key === "earnings") goToScreen("earnings");
      else if (key === "menu") goToScreen("menu");
      // "Mensagens" ainda não tem tela
    },
    [goToScreen]
  );

  return (
    <div className="relative h-full w-full overflow-clip bg-uberBg">
      {/* Mapa ocupa a tela inteira, com leve parallax ao mexer na sheet */}
      <DriverMap snap={snap} status={status} onSurfaceTap={handleSurfaceTap} />

      {/* Overlays do mapa */}
      <TopStatus current={18} total={30} onHome={handleHome} />
      {/* SurgeBadges desativado: os badges já vêm embutidos na imagem de fundo. */}
      {/* <SurgeBadges status={status} /> */}
      <LoadingOverlay active={status === "loading"} />

      {/* Botão central COMEÇA — some quando online */}
      <StartButton
        status={status}
        onStart={() => setStatus("loading")}
        onComplete={handleStartComplete}
      />

      {/* Rota da corrida sobre o mapa (quando chega solicitação) */}
      {ride === "incoming" && (
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[55%] w-full"
          viewBox="0 0 375 360"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M40 210 C110 150 150 250 210 150 S320 90 345 120"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* origem */}
          <circle cx="40" cy="210" r="9" fill="#fff" />
          <circle cx="40" cy="210" r="4" fill="#111" />
          {/* destino */}
          <rect x="338" y="113" width="14" height="14" rx="3" fill="#fff" />
        </svg>
      )}

      {/* Bottom sheet (oculta durante a solicitação de corrida) */}
      {ride === "none" && (
        <BottomSheet status={status} snap={snap} onSnapChange={setSnap} />
      )}

      {/* Solicitação de corrida */}
      <AnimatePresence>
        {ride === "incoming" && (
          <RideRequest
            key="ride"
            vehicleType={profile.vehicleType}
            onAccept={() => setRide("none")}
            onExpire={() => setRide("none")}
          />
        )}
      </AnimatePresence>

      {/* Telas sobrepostas (sem fade — a troca é coberta pelo loading) */}
      {screen === "home" && (
        <HomeScreen onGoOnline={handleGoOnline} onNavigate={handleNavigate} />
      )}
      {screen === "discover" && <DiscoverScreen onNavigate={handleNavigate} />}
      {screen === "earnings" && <EarningsScreen onNavigate={handleNavigate} />}
      {screen === "menu" && (
        <MenuScreen
          profile={profile}
          onNavigate={handleNavigate}
          onOpenProfile={() => goToScreen("profile")}
          onEditProfile={() => goToScreen("editProfile")}
          onOpenAccount={() => goToScreen("account")}
        />
      )}
      {screen === "profile" && (
        <ProfileScreen
          profile={profile}
          onClose={() => goToScreen("menu")}
          onNavigate={handleNavigate}
        />
      )}
      {screen === "editProfile" && (
        <EditProfileScreen
          profile={profile}
          onClose={() => goToScreen("menu")}
          onSave={(p) => {
            updateProfile(p);
            goToScreen("menu");
          }}
        />
      )}
      {screen === "account" && (
        <AccountScreen
          profile={profile}
          onBack={() => goToScreen("menu")}
          onOpenVehicles={() => goToScreen("vehicles")}
          onNavigate={handleNavigate}
        />
      )}
      {screen === "vehicles" && (
        <VehiclesScreen
          profile={profile}
          onBack={() => goToScreen("account")}
          onNavigate={handleNavigate}
        />
      )}

      {/* Fluxo de verificação (overlays opacos, sem revelar telas atrás) */}
      {verify === "loading" && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-[#121212]">
          <motion.span
            className="h-10 w-10 rounded-full border-[3px] border-white/15 border-t-uberBlue"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      {verify === "facial" && (
        <FacialVerification
          onClose={() => setVerify("none")}
          onContinue={() => setVerify("selfie")}
        />
      )}
      {verify === "selfie" && (
        <SelfieCapture
          profile={profile}
          onClose={() => setVerify("none")}
          onComplete={handleVerified}
        />
      )}

      {/* Loading de navegação ao trocar de aba — animação de carregar, sem fade */}
      {navLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#121212]">
          <motion.span
            className="h-9 w-9 rounded-full border-[3px] border-white/15 border-t-uberBlue"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
