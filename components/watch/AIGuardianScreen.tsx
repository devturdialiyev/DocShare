"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield, FileText } from "lucide-react";
import { aiGuardianAlerts } from "@/lib/mock/watch-data";

export default function AIGuardianScreen() {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());
  const activeAlerts = aiGuardianAlerts.filter(a => !dismissed.has(a.id));

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      <motion.div
        className="flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Shield className="w-3 h-3 text-cyan-400" />
        <span className="text-[9px] text-white font-medium">Health Assistant</span>
        <span className="text-[8px] text-green-400 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-green-400 inline-block animate-pulse" />
          Active
        </span>
      </motion.div>

      {activeAlerts.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-white/40 text-[10px]">
          All clear! No alerts.
        </div>
      ) : (
        activeAlerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            className={`bg-white/95 rounded-2xl p-2.5 border-l-4 ${alert.borderColor} relative overflow-hidden`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm flex-shrink-0">{alert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-gray-800">{alert.title}</p>
                  <button
                    className="text-[8px] text-gray-300 hover:text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDismissed(prev => new Set(prev).add(alert.id));
                    }}
                  >
                    &times;
                  </button>
                </div>
                <p className="text-[8px] text-gray-400">{alert.message}</p>
              </div>
            </div>
          </motion.div>
        ))
      )}

      <motion.button
        className="w-full py-1.5 rounded-full border border-white/30 text-white text-[9px] font-medium flex items-center justify-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <FileText className="w-2.5 h-2.5" />
        View Full Report
      </motion.button>
    </div>
  );
}
