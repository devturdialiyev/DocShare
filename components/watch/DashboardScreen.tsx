"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, Wind, Footprints, Droplets, ChevronRight, Video } from "lucide-react";
import { currentUser, vitals } from "@/lib/mock/data";
import { aiGuardianAlerts } from "@/lib/mock/watch-data";

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const latestVitals = vitals[0];

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-white">DocShare</span>
          <span className="text-[7px] text-blue-200/60 ml-1">Uzbekistan Health</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white">
          B
        </div>
      </div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#E5E7EB" strokeWidth="4" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#29B6F6" strokeWidth="4"
                strokeDasharray={`${(85 / 100) * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base font-bold text-gray-800">85</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-green-600">All systems normal</p>
            <p className="text-[9px] text-gray-400">{currentUser.full_name}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
      >
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { icon: Heart, label: "Heart Rate", value: `${latestVitals.hr_bpm} BPM`, color: "text-red-500", bg: "bg-red-100" },
            { icon: Wind, label: "AQI", value: "42 Good", color: "text-cyan-500", bg: "bg-cyan-100" },
            { icon: Footprints, label: "Steps", value: latestVitals.steps.toLocaleString(), color: "text-blue-500", bg: "bg-blue-100" },
            { icon: Droplets, label: "SpO2", value: `${latestVitals.spo2}%`, color: "text-green-500", bg: "bg-green-100" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-3 h-3 ${item.color}`} />
              </div>
              <div>
                <p className="text-[8px] text-gray-400">{item.label}</p>
                <p className="text-[10px] font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5 cursor-pointer"
        onClick={() => onNavigate("goals")}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.12 }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold text-gray-700">Daily Goals</span>
          <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full" style={{ width: "50%" }} />
        </div>
        <p className="text-[8px] text-gray-400 mt-0.5">2/4 goals completed</p>
      </motion.div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5 border-l-4 border-orange-400 cursor-pointer"
        onClick={() => onNavigate("aiguardian")}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.16 }}
      >
        <p className="text-[10px] font-semibold text-gray-700">{aiGuardianAlerts[0].title}</p>
        <p className="text-[8px] text-gray-400">{aiGuardianAlerts[0].message}</p>
      </motion.div>

      <motion.div
        className="bg-white/95 rounded-2xl p-2.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
      >
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[9px] text-white font-bold">D</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-800">Dr. Umarov &middot; Cardiology</p>
            <p className="text-[8px] text-gray-400">Thu Mar 26 &middot; 10:30</p>
            <div className="flex gap-1 mt-1">
              <button className="flex-1 text-[8px] py-1 rounded-full border border-gray-200 text-gray-500 font-medium">Reschedule</button>
              <button className="flex-1 text-[8px] py-1 rounded-full bg-blue-600 text-white font-medium flex items-center justify-center gap-0.5">
                <Video className="w-2 h-2" /> Join Call
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
