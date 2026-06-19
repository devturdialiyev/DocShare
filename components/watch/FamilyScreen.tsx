"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, Footprints } from "lucide-react";
import { familyMembers } from "@/lib/mock/data";

const statusColors: Record<string, string> = {
  good: "bg-green-500",
  attention: "bg-yellow-500",
  critical: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  good: "Good",
  attention: "Needs Attention",
  critical: "Critical",
};

export default function FamilyScreen() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const member = selected ? familyMembers.find(m => m.id === selected) : null;

  if (member) {
    return (
      <div className="w-full h-full flex flex-col">
        <button className="text-[9px] text-blue-300 mb-2 self-start flex items-center gap-1" onClick={() => setSelected(null)}>
          <span>&larr;</span> Back
        </button>
        <motion.div
          className="bg-white/95 rounded-2xl p-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-base font-bold text-white">
              {member.name[0]}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">{member.name}</p>
              <p className="text-[8px] text-gray-400">{member.relation}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Heart className="w-2.5 h-2.5 text-red-400" />
              <span className="text-[10px] text-gray-600">Heart Rate: 72 BPM</span>
            </div>
            <div className="flex items-center gap-2">
              <Footprints className="w-2.5 h-2.5 text-blue-400" />
              <span className="text-[10px] text-gray-600">Steps: 6,200</span>
            </div>
            <p className="text-[8px] text-gray-400 mt-1">Last sync: 2 min ago</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalScore = Math.round(
    familyMembers.reduce((sum, m) => sum + (m.health_score || 0), 0) / familyMembers.length
  );

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1 pb-2">
      {familyMembers.map((m, i) => (
        <motion.div
          key={m.id}
          className="bg-white/95 rounded-2xl p-2.5 flex items-center gap-2.5 cursor-pointer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.04 }}
          onClick={() => setSelected(m.id)}
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
              {m.name[0]}
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${statusColors[m.health_status]}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-800">{m.name}</p>
            <p className="text-[7px] text-gray-400">{m.relation}</p>
          </div>
          <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${
            m.health_status === "good" ? "bg-green-100 text-green-700" :
            m.health_status === "attention" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          }`}>
            {statusLabels[m.health_status]}
          </span>
        </motion.div>
      ))}

      <div className="bg-white/20 rounded-2xl p-2 mt-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/80">Family Health Score</span>
          <span className="text-xs font-bold text-white">{totalScore}</span>
        </div>
      </div>
    </div>
  );
}
