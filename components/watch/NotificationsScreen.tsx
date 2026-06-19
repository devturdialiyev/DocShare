"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { notifications } from "@/lib/mock/watch-data";

const groupConfig: Record<string, { label: string; color: string }> = {
  aiguardian: { label: "AI Guardian", color: "text-blue-400" },
  goals: { label: "Goals", color: "text-green-400" },
  appointments: { label: "Appointments", color: "text-cyan-400" },
  family: { label: "Family Alerts", color: "text-orange-400" },
  medications: { label: "Medications", color: "text-purple-400" },
};

export default function NotificationsScreen() {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());
  const grouped = notifications
    .filter(n => !dismissed.has(n.id))
    .reduce((acc, n) => {
      if (!acc[n.group]) acc[n.group] = [];
      acc[n.group].push(n);
      return acc;
    }, {} as Record<string, typeof notifications>);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group}>
          <p className={`text-[8px] font-semibold ${groupConfig[group]?.color || "text-white"} pb-0.5`}>
            {groupConfig[group]?.label || group}
          </p>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-white/95 rounded-2xl p-2 flex items-start gap-2 relative group"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: i * 0.03 }}
            >
              <span className="text-sm flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-gray-800">{item.title}</p>
                  <span className="text-[6px] text-gray-400 flex-shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-[7px] text-gray-400">{item.message}</p>
              </div>
              <button
                className="text-[8px] text-gray-300 hover:text-gray-500 flex-shrink-0"
                onClick={() => setDismissed(prev => new Set(prev).add(item.id))}
              >
                &times;
              </button>
            </motion.div>
          ))}
        </div>
      ))}

      {notifications.filter(n => !dismissed.has(n.id)).length === 0 && (
        <div className="flex items-center justify-center h-24 text-white/40 text-[10px]">
          No notifications
        </div>
      )}
    </div>
  );
}
