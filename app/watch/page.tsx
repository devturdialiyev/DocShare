"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import WatchDevice from "@/components/watch/WatchDevice";
import WatchFace from "@/components/watch/WatchFace";
import LoginScreen from "@/components/watch/LoginScreen";
import AppLauncher from "@/components/watch/AppLauncher";
import PairingFlow from "@/components/watch/PairingFlow";
import HealthApp from "@/components/watch/HealthApp";

const appScreens = [
  "healthapp",
  "vitals",
  "activity",
  "goals",
  "aiguardian",
  "family",
  "appointments",
  "medications",
  "settings",
];

export default function WatchPage() {
  const [currentScreen, setCurrentScreen] = React.useState("watchface");
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [direction, setDirection] = React.useState(1);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [paired, setPaired] = React.useState(false);

  const currentIndex = appScreens.indexOf(currentScreen);

  const navigate = (screen: string) => {
    setCurrentScreen(screen);
    setShowNotifications(false);
  };

  const handleLogin = () => {
    setAuthenticated(true);
    navigate("applauncher");
  };

  const handleTapWatchFace = () => {
    setAuthenticated(false);
    if (authenticated) {
      navigate("applauncher");
    } else {
      navigate("login");
    }
  };

  const handleOpenApp = (appId: string) => {
    switch (appId) {
      case "dsai":
        if (paired) {
          navigate("healthapp");
        } else {
          navigate("pairing");
        }
        break;
      case "vitals":
        navigate("vitals");
        break;
      case "activity":
      case "steps":
        navigate("activity");
        break;
      case "goals":
      case "sleep":
        navigate("goals");
        break;
      case "family":
        navigate("family");
        break;
      case "settings":
        navigate("settings");
        break;
      default:
        navigate("healthapp");
    }
  };

  const handlePairComplete = () => {
    setPaired(true);
    navigate("healthapp");
  };

  const handleSwipeLeft = () => {
    if (showNotifications) return;
    if (currentScreen === "watchface" || currentScreen === "login" || currentScreen === "applauncher" || currentScreen === "pairing" || currentScreen === "emergency") return;
    const next = Math.min(currentIndex + 1, appScreens.length - 1);
    setDirection(1);
    setCurrentScreen(appScreens[next]);
  };

  const handleSwipeRight = () => {
    if (showNotifications) return;
    if (currentScreen === "watchface" || currentScreen === "login" || currentScreen === "applauncher" || currentScreen === "pairing" || currentScreen === "emergency") return;
    const prev = Math.max(currentIndex - 1, 0);
    setDirection(-1);
    setCurrentScreen(appScreens[prev]);
  };

  const handleSwipeDown = () => {
    if (currentScreen === "watchface" || currentScreen === "emergency") return;
    setShowNotifications(prev => !prev);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "watchface":
        return <WatchFace onTap={handleTapWatchFace} />;
      case "login":
        return <LoginScreen onLogin={handleLogin} onBack={() => navigate("watchface")} />;
      case "applauncher":
        return <AppLauncher onOpenApp={handleOpenApp} />;
      case "pairing":
        return <PairingFlow onComplete={handlePairComplete} onBack={() => navigate("applauncher")} />;
      case "healthapp":
        return <HealthApp />;
      default:
        return <AppLauncher onOpenApp={handleOpenApp} />;
    }
  };

  return (
    <WatchDevice
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      onSwipeDown={handleSwipeDown}
    >
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScreen + (showNotifications ? "-notif" : "")}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {currentScreen === "applauncher" && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            <button
              className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              onClick={() => navigate("settings")}
              title="Settings"
            />
          </div>
        )}
      </div>
    </WatchDevice>
  );
}
