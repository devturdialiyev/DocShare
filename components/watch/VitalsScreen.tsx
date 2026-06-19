"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, Droplets, Thermometer, Wind, Activity } from "lucide-react";
import { vitals } from "@/lib/mock/data";

interface VitalConfigItem {
  key: string;
  label: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  trend: string;
  trendDir: string;
  display?: (v: typeof vitals[0]) => string;
}

const vitalConfig: VitalConfigItem[] = [
  { key: "hr_bpm", label: "Heart Rate", unit: "BPM", icon: Heart, color: "text-red-500", bg: "bg-red-100", trend: "+5.9%", trendDir: "up" },
  { key: "bp_sys", label: "Blood Pressure", unit: "", icon: Activity, color: "text-blue-500", bg: "bg-blue-100", trend: "+1.7%", trendDir: "up", display: (v) => `${v.bp_sys}/${v.bp_dia}` },
  { key: "spo2", label: "SpO2", unit: "%", icon: Droplets, color: "text-green-500", bg: "bg-green-100", trend: "+1%", trendDir: "up" },
  { key: "temperature", label: "Body Temp", unit: "\u00b0C", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-100", trend: "Normal", trendDir: "neutral", display: () => "36.6" },
  { key: "breathing", label: "Breathing Rate", unit: "/min", icon: Wind, color: "text-cyan-500", bg: "bg-cyan-100", trend: "Normal", trendDir: "neutral", display: () => "16" },
];

export default function VitalsScreen() {
  const v = vitals[0];

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      {vitalConfig.map((item, i) => (
        <motion.div
          key={item.key}
          className="bg-white/95 rounded-2xl p-2.5 flex items-center gap-2.5"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
        >
          <div className={`w-7 h-7 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-gray-400">{item.label}</p>
            <p className="text-xs font-bold text-gray-800">
              {item.display ? item.display(v) : String(v[item.key as keyof typeof v] ?? "")} {item.unit}
            </p>
          </div>
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
            item.trendDir === "up" ? "bg-red-100 text-red-600" :
            item.trendDir === "neutral" ? "bg-gray-100 text-gray-500" :
            "bg-green-100 text-green-600"
          }`}>
            {item.trend}
          </span>
        </motion.div>
      ))}

      <motion.button
        className="w-full py-2 rounded-full bg-blue-600 text-white text-[10px] font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Record Vitals
      </motion.button>

      <motion.button
        className="w-full py-1.5 text-[9px] text-blue-300 font-medium text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        View History
      </motion.button>
    </div>
  );
}
