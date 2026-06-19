"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Pill, Check, Clock } from "lucide-react";
import { medications } from "@/lib/mock/watch-data";

export default function MedicationsScreen() {
  const [taken, setTaken] = React.useState<Set<string>>(new Set());
  const [snoozed, setSnoozed] = React.useState<string | null>(null);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      {medications.map((med, i) => {
        const isTaken = taken.has(med.id);
        const isSnoozed = snoozed === med.id;

        return (
          <motion.div
            key={med.id}
            className={`bg-white/95 rounded-2xl p-2.5 transition-all ${
              isTaken ? "opacity-60" : ""
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <div className="flex items-start gap-2">
              <div className={`w-6 h-6 rounded-xl ${med.color} flex items-center justify-center flex-shrink-0`}>
                <Pill className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-[10px] font-semibold ${isTaken ? "text-gray-400 line-through" : "text-gray-800"}`}>
                    {med.name}
                  </p>
                  <span className={`text-[7px] font-medium px-1 py-0.5 rounded-full ${
                    med.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {med.status === "active" ? "Active" : "As Needed"}
                  </span>
                </div>
                <p className="text-[8px] text-gray-400">
                  {med.dosage} &middot; {med.time} &middot; {med.daysRemaining}d left
                </p>

                {!isTaken && !isSnoozed && (
                  <div className="flex gap-1 mt-1">
                    <button
                      className="flex-1 text-[7px] py-1 rounded-full bg-green-500 text-white font-medium flex items-center justify-center gap-0.5"
                      onClick={() => setTaken(prev => new Set(prev).add(med.id))}
                    >
                      <Check className="w-1.5 h-1.5" /> Taken
                    </button>
                    <button
                      className="flex-1 text-[7px] py-1 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center gap-0.5"
                      onClick={() => setSnoozed(med.id)}
                    >
                      <Clock className="w-1.5 h-1.5" /> Snooze 15m
                    </button>
                  </div>
                )}

                {isSnoozed && (
                  <p className="text-[8px] text-orange-500 mt-0.5 font-medium">Snoozed 15 min</p>
                )}

                {isTaken && (
                  <p className="text-[8px] text-green-600 mt-0.5 font-medium flex items-center gap-0.5">
                    <Check className="w-2 h-2" /> Logged to health history
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
