"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Heart } from "lucide-react";

export default function EmergencyScreen() {
  const [holding, setHolding] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = () => {
    setHolding(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 3.33;
      });
    }, 100);
  };

  const endHold = () => {
    setHolding(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-[9px] text-red-200/60 mb-2">EMERGENCY</p>

        <div
          className="relative w-32 h-32 mx-auto mb-3"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
        >
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
            <circle cx="64" cy="64" r="56" fill="none" stroke={progress >= 100 ? "#ef4444" : "#ef444480"} strokeWidth="6"
              strokeDasharray={`${(progress / 100) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none">
            <Heart className={`w-8 h-8 ${progress >= 100 ? "text-red-400" : "text-red-300"} ${holding ? "animate-ping" : ""}`} />
            <span className="text-[8px] text-white/60 mt-1">Hold 3s</span>
          </div>
        </div>

        {progress >= 100 ? (
          <motion.p
            className="text-sm font-bold text-red-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            Calling Emergency Services...
          </motion.p>
        ) : (
          <p className="text-[10px] text-white/40">Hold button to call emergency</p>
        )}
      </motion.div>

      <div className="w-full px-2 space-y-1.5">
        <div className="bg-white/20 rounded-xl p-2 flex items-center gap-2">
          <MapPin className="w-3 h-3 text-white" />
          <span className="text-[9px] text-white/70">Share Location</span>
          <div className={`ml-auto w-4 h-2.5 rounded-full ${holding ? "bg-blue-400" : "bg-white/30"} transition-colors`}>
            <div className={`w-2 h-2 rounded-full bg-white ml-0.5 mt-0.25 ${holding ? "ml-[7px]" : ""} transition-all`} />
          </div>
        </div>

        {[
          { name: "Malika", relation: "Wife", icon: Phone },
          { name: "Dilshod", relation: "Father", icon: Phone },
        ].map((contact, i) => (
          <div key={i} className="bg-white/20 rounded-xl p-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-[9px] text-white font-bold">
              {contact.name[0]}
            </div>
            <div>
              <p className="text-[9px] text-white font-medium">{contact.name}</p>
              <p className="text-[7px] text-white/50">{contact.relation}</p>
            </div>
            <contact.icon className="w-3 h-3 text-white/60 ml-auto" />
          </div>
        ))}
      </div>

      <motion.div
        className="absolute bottom-4 text-[8px] text-red-200/40"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Fall detection active
      </motion.div>
    </div>
  );
}
