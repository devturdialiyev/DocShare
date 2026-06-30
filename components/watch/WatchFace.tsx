"use client";

import * as React from "react";
import { motion } from "framer-motion";

const BG = "linear-gradient(180deg, #4A9EF5 0%, #2975D4 50%, #1A6BB5 100%)";

interface WatchFaceProps {
  onTap: () => void;
}

export default function WatchFace({ onTap }: WatchFaceProps) {
  const [time, setTime] = React.useState(() => {
    const now = new Date();
    return {
      hours: String(now.getHours()).padStart(2, "0"),
      minutes: String(now.getMinutes()).padStart(2, "0"),
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: String(now.getHours()).padStart(2, "0"),
        minutes: String(now.getMinutes()).padStart(2, "0"),
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

  const ringR = 50;
  const circumference = 2 * Math.PI * ringR;
  const score = 85;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
      style={{ background: BG }}
      onClick={onTap}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="text-[72px] font-bold text-white leading-none tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {time.hours}:{time.minutes}
          </motion.div>
          <div className="text-xl text-white/75 font-normal tracking-wide">{dateStr}</div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-bold text-white">72</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">BPM</span>
          </div>
          <div className="w-px h-10 bg-white/25" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-bold text-white">98%</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">SpO2</span>
          </div>
          <div className="w-px h-10 bg-white/25" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-bold text-white">8.4K</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">Steps</span>
          </div>
        </div>

        <div className="relative w-[140px] h-[140px]">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={ringR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
            <circle cx="70" cy="70" r={ringR} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="10"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round" transform="rotate(-90 70 70)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{score}</span>
            <span className="text-xs text-white/60 tracking-wider">Score</span>
          </div>
        </div>
      </div>
    </div>
  );
}
