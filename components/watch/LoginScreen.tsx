"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, ArrowLeft, ShieldAlert } from "lucide-react";
import { currentUser } from "@/lib/mock/data";

interface LoginScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

const PIN_LENGTH = 4;
const CORRECT_PIN = "1234";

export default function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState(false);
  const [shake, setShake] = React.useState(0);
  const [useBiometric, setUseBiometric] = React.useState(false);

  const handleDigit = (d: string) => {
    if (pin.length >= PIN_LENGTH) return;
    setError(false);
    const newPin = pin + d;
    setPin(newPin);
    if (newPin.length === PIN_LENGTH) {
      if (newPin === CORRECT_PIN) {
        setTimeout(onLogin, 300);
      } else {
        setError(true);
        setShake(s => s + 1);
        setTimeout(() => {
          setPin("");
          setError(false);
        }, 600);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const handleBiometric = () => {
    setUseBiometric(true);
    setTimeout(() => {
      setUseBiometric(false);
      onLogin();
    }, 1500);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center rounded-full"
      style={{ background: "linear-gradient(145deg, #2975D4 0%, #1A90CC 50%, #05B2D9 100%)" }}
    >
      <div className="w-full h-full flex flex-col items-center px-3 pt-4 pb-2">
        <button className="self-start text-blue-300 mb-1 flex items-center gap-1" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="text-[9px]">Back</span>
        </button>

        <motion.div
          className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-base font-bold text-white mb-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {currentUser.full_name.split(" ").map(n => n[0]).join("")}
        </motion.div>
        <p className="text-[9px] text-white/60 mb-2">Welcome, {currentUser.full_name.split(" ")[0]}</p>

        <AnimatePresence mode="wait">
          {useBiometric ? (
            <motion.div
              key="biometric"
              className="flex flex-col items-center py-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Fingerprint className="w-8 h-8 text-cyan-400" />
                </motion.div>
              </div>
              <p className="text-[9px] text-cyan-300">Scanning...</p>
            </motion.div>
          ) : (
            <motion.div
              key="pin"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-2.5 mb-1.5" key={shake}>
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-150 ${
                      error
                        ? "border-red-400 bg-red-400/30"
                        : pin[i]
                          ? "border-cyan-400 bg-cyan-400"
                          : "border-white/30"
                    }`}
                    animate={pin[i] ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.15 }}
                  />
                ))}
              </div>
              {error && (
                <motion.p
                  className="text-[8px] text-red-400 flex items-center gap-1 mb-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ShieldAlert className="w-2 h-2" /> Incorrect PIN
                </motion.p>
              )}

              <div className="grid grid-cols-3 gap-1.5 w-full max-w-[180px]">
                {["1","2","3","4","5","6","7","8","9"].map(d => (
                  <button
                    key={d}
                    className="w-full aspect-square rounded-full bg-white/10 text-white text-base font-semibold active:bg-white/25 transition-colors select-none"
                    onClick={() => handleDigit(d)}
                  >
                    {d}
                  </button>
                ))}
                <button
                  className="w-full aspect-square rounded-full text-white/40 text-xs active:bg-white/10 transition-colors select-none flex items-center justify-center"
                  onClick={handleBiometric}
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                </button>
                <button
                  className="w-full aspect-square rounded-full bg-white/10 text-white text-base font-semibold active:bg-white/25 transition-colors select-none"
                  onClick={() => handleDigit("0")}
                >
                  0
                </button>
                <button
                  className="w-full aspect-square rounded-full text-white/40 text-xs active:bg-white/10 transition-colors select-none"
                  onClick={handleDelete}
                >
                  &larr;
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[7px] text-white/15 mt-auto">Protected by DocShare</p>
      </div>
    </div>
  );
}
