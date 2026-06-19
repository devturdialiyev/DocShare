"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Watch, Bluetooth, CheckCircle, ArrowLeft } from "lucide-react";

interface PairingFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function PairingFlow({ onComplete, onBack }: PairingFlowProps) {
  const [step, setStep] = React.useState<"search" | "found" | "pairing" | "done">("search");

  React.useEffect(() => {
    const t1 = setTimeout(() => setStep("found"), 1500);
    const t2 = setTimeout(() => setStep("pairing"), 2500);
    const t3 = setTimeout(() => {
      setStep("done");
      setTimeout(onComplete, 1000);
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center rounded-full"
      style={{ background: "linear-gradient(145deg, #2975D4 0%, #1A90CC 50%, #05B2D9 100%)" }}
    >
      <button className="absolute top-2 left-0 text-blue-300 flex items-center gap-1" onClick={onBack}>
        <ArrowLeft className="w-3 h-3" />
        <span className="text-[8px]">Back</span>
      </button>

      <AnimatePresence mode="wait">
        {step === "search" && (
          <motion.div key="search" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative w-24 h-24 mb-3">
              <Smartphone className="w-12 h-12 text-white/30 absolute top-0 left-0" />
              <motion.div
                className="absolute -top-1 -left-1 w-14 h-14 rounded-full border-2 border-cyan-400/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Watch className="w-10 h-10 text-white/50 absolute bottom-0 right-0" />
              <motion.div
                className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-cyan-400/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <p className="text-[11px] text-white font-medium">Searching for phone...</p>
            <p className="text-[8px] text-white/40 mt-1">Make sure Bluetooth is on</p>
          </motion.div>
        )}

        {step === "found" && (
          <motion.div key="found" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Bluetooth className="w-10 h-10 text-blue-400 mb-2" />
            <p className="text-[11px] text-white font-medium">Device found</p>
            <p className="text-[8px] text-white/40 mt-1">DocShare Mobile</p>
            <motion.div
              className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-blue-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </motion.div>
        )}

        {step === "pairing" && (
          <motion.div key="pairing" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-3">
              <Smartphone className="w-8 h-8 text-white/60" />
              <motion.div
                className="flex gap-0.5"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {[1,2,3].map(i => (
                  <div key={i} className="w-1 h-3 bg-cyan-400 rounded-full" />
                ))}
              </motion.div>
              <Watch className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-[11px] text-white font-medium">Pairing...</p>
            <p className="text-[8px] text-white/40 mt-1">Confirm on your phone</p>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div key="done" className="flex flex-col items-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-[12px] text-white font-bold">Connected!</p>
            <p className="text-[8px] text-white/40 mt-1">Syncing health data...</p>
            <motion.div
              className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-green-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[7px] text-white/15 mt-auto">DocShare Sync Protocol v2.1</p>
    </div>
  );
}
