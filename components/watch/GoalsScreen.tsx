"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Flame, Moon, Footprints, Brain, Droplet } from "lucide-react";
import { healthActivities } from "@/lib/mock/data";

const goalIcons: Record<string, React.ElementType> = {
  exercise: Footprints,
  meditation: Brain,
  sleep: Moon,
  nutrition: Droplet,
};

export default function GoalsScreen() {
  const [marked, setMarked] = React.useState<Set<string>>(new Set());
  const completedCount = healthActivities.filter(a => a.completed || marked.has(a.id)).length;
  const total = healthActivities.length;

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1.5 pb-2">
      {healthActivities.map((goal, i) => {
        const Icon = goalIcons[goal.category] || Check;
        const isDone = goal.completed || marked.has(goal.id);

        return (
          <motion.div
            key={goal.id}
            className={`bg-white/95 rounded-2xl p-2.5 cursor-pointer transition-all ${
              isDone ? "opacity-70" : ""
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            onClick={() => {
              if (!isDone) {
                setMarked(prev => new Set(prev).add(goal.id));
                if (navigator.vibrate) navigator.vibrate(100);
              }
            }}
          >
            <div className="flex items-start gap-2">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDone ? "bg-green-100" : "bg-gray-100"
              }`}>
                <Icon className={`w-3 h-3 ${isDone ? "text-green-500" : "text-gray-400"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-[10px] font-semibold ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}>
                    {goal.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5 text-orange-400" />
                    <span className="text-[8px] text-orange-500 font-medium">{goal.streak}</span>
                  </div>
                </div>
                <p className="text-[7px] text-gray-400 truncate">{goal.description}</p>
                <div className="flex items-center justify-between mt-0.5">
                  {isDone ? (
                    <span className="text-[8px] text-green-600 font-medium bg-green-100 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Check className="w-2 h-2" /> Done
                    </span>
                  ) : (
                    <span className="text-[8px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">Pending</span>
                  )}
                  <span className="text-[7px] text-gray-400">{goal.duration_minutes}m</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="pt-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-white/60">{completedCount}/{total} Complete</span>
          <span className="text-[9px] text-white/60">{Math.round((completedCount / total) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
