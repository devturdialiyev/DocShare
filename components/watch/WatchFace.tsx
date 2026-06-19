"use client";

import * as React from "react";
import { motion } from "framer-motion";

const BG = "linear-gradient(145deg, #2975D4 0%, #1A90CC 50%, #05B2D9 100%)";

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

  const ringR = 34;
  const circumference = 2 * Math.PI * ringR;
  const score = 85;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
      style={{ background: BG }}
      onClick={onTap}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="text-[46px] font-bold text-white leading-none tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {time.hours}:{time.minutes}
        </motion.div>
        <div className="text-xs text-white/60 mt-0.5 font-normal">{dateStr}</div>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-bold text-white">72</span>
            <span className="text-[9px] text-white/50 uppercase tracking-wider">BPM</span>
          </div>
          <div className="w-px h-7 bg-white/20" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-bold text-white">98%</span>
            <span className="text-[9px] text-white/50 uppercase tracking-wider">SpO2</span>
          </div>
          <div className="w-px h-7 bg-white/20" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-bold text-white">8.4K</span>
            <span className="text-[9px] text-white/50 uppercase tracking-wider">Steps</span>
          </div>
        </div>

        <div className="relative w-[80px] h-[80px] mt-3">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={ringR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
            <circle cx="40" cy="40" r={ringR} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="6"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round" transform="rotate(-90 40 40)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-white">{score}</span>
            <span className="text-[8px] text-white/50">Score</span>
          </div>
        </div>
      </div>
    </div>
  );
}
