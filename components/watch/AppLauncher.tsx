"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Target, Moon, Settings, Zap } from "lucide-react";

interface AppLauncherProps {
  onOpenApp: (appId: string) => void;
}

const apps = [
  { id: "vitals", icon: Heart, label: "Vitals", color: "from-red-400 to-pink-500" },
  { id: "activity", icon: Activity, label: "Activity", color: "from-green-400 to-emerald-500" },
  { id: "goals", icon: Target, label: "Goals", color: "from-purple-400 to-indigo-500" },
  { id: "sleep", icon: Moon, label: "Sleep", color: "from-indigo-400 to-blue-500" },
  { id: "dsai", icon: null, label: "DSAI", color: "from-blue-500 to-cyan-400", isCenter: true },
  { id: "steps", icon: Zap, label: "Steps", color: "from-yellow-400 to-orange-500" },
  { id: "family", icon: Heart, label: "Family", color: "from-pink-400 to-rose-500" },
  { id: "settings", icon: Settings, label: "Settings", color: "from-gray-400 to-slate-500" },
];

export default function AppLauncher({ onOpenApp }: AppLauncherProps) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center rounded-full"
      style={{ background: "linear-gradient(145deg, #2975D4 0%, #1A90CC 50%, #05B2D9 100%)" }}
    >
      <motion.p
        className="text-[9px] text-white/40 mb-2 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        APPLICATIONS
      </motion.p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
        {apps.map((app, i) => {
          const isCenter = app.isCenter;

          return (
            <motion.button
              key={app.id}
              className={`flex flex-col items-center gap-0.5 ${
                isCenter ? "col-start-2" : ""
              }`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
              onClick={() => onOpenApp(app.id)}
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg shadow-black/20 ${
                isCenter ? "w-14 h-14 rounded-2xl ring-2 ring-white/30" : ""
              }`}>
                {isCenter ? (
                  <span className="text-[10px] font-extrabold text-white tracking-tighter">
                    D<span className="text-cyan-200">S</span>AI
                  </span>
                ) : app.icon ? (
                  <app.icon className={`w-5 h-5 text-white ${isCenter ? "w-6 h-6" : ""}`} />
                ) : null}
              </div>
              <span className={`text-[8px] text-white/60 ${isCenter ? "text-[9px] text-white/80 font-semibold" : ""}`}>
                {app.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="absolute bottom-4 w-16 h-1 rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
}
