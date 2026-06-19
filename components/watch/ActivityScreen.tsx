"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, MapPin, Zap, TrendingUp, Dumbbell } from "lucide-react";
import { vitals } from "@/lib/mock/data";
import { weeklySteps } from "@/lib/mock/watch-data";

export default function ActivityScreen() {
  const today = vitals[0];
  const goal = 10000;
  const pct = Math.round((today.steps / goal) * 100);
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const maxStep = Math.max(...weeklySteps);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      <motion.div
        className="flex flex-col items-center py-1"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
            <circle cx="48" cy="48" r="40" fill="none" stroke="#29B6F6" strokeWidth="5"
              strokeDasharray={`${(pct / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-white">{today.steps.toLocaleString()}</span>
            <span className="text-[8px] text-blue-200/70">steps</span>
          </div>
        </div>
        <p className="text-[10px] text-blue-200 mt-0.5">{pct}% complete</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.25 }}
      >
        {[
          { icon: Flame, label: "Calories", value: today.calories, color: "text-orange-400" },
          { icon: MapPin, label: "Distance", value: `${today.distance_km} km`, color: "text-blue-400" },
          { icon: Zap, label: "Streak", value: "5 days", color: "text-yellow-400" },
        ].map((item, i) => (
          <div key={i} className="bg-white/95 rounded-xl p-1.5 text-center">
            <item.icon className={`w-3 h-3 ${item.color} mx-auto mb-0.5`} />
            <p className="text-[9px] font-bold text-gray-800">{item.value}</p>
            <p className="text-[7px] text-gray-400">{item.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.25 }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-semibold text-gray-600">Weekly</span>
          <span className="flex items-center gap-0.5 text-[8px] text-green-600 font-medium">
            <TrendingUp className="w-2 h-2" /> +12%
          </span>
        </div>
        <div className="flex items-end justify-between gap-0.5">
          {weeklySteps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
              <div
                className={`w-full rounded-sm ${i === 5 ? "bg-cyan-400" : "bg-blue-300/60"}`}
                style={{ height: `${(s / maxStep) * 28}px` }}
              />
              <span className={`text-[7px] ${i === 5 ? "text-cyan-300 font-bold" : "text-white/50"}`}>
                {dayLabels[i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5 border-l-4 border-cyan-400"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.25 }}
      >
        <div className="flex items-center gap-2">
          <Dumbbell className="w-3.5 h-3.5 text-cyan-500" />
          <div>
            <p className="text-[9px] font-semibold text-gray-700">Gym session in progress</p>
            <p className="text-[8px] text-gray-400">42 min</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
