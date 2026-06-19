"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bell, Globe, Sun, RefreshCw, UserCog, Shield, Info } from "lucide-react";

const settings = [
  { icon: Bell, label: "Notifications", sub: "Appointments, vitals, goals" },
  { icon: Globe, label: "Language", sub: "Uzbek / Russian / English" },
  { icon: Sun, label: "Display", sub: "Brightness, always-on" },
  { icon: RefreshCw, label: "Health Sync", sub: "Every 5 min" },
  { icon: UserCog, label: "Doctor Mode", sub: "Toggle" },
  { icon: Shield, label: "Privacy", sub: "Data sharing preferences" },
  { icon: Info, label: "About", sub: "Version 1.0.0" },
];

export default function SettingsScreen() {
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1 pb-2">
      {settings.map((item, i) => (
        <motion.div
          key={item.label}
          className="bg-white/95 rounded-2xl p-2.5 flex items-center gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: i * 0.03 }}
        >
          <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
            <item.icon className="w-3 h-3 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-800">{item.label}</p>
            <p className="text-[7px] text-gray-400">{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
