"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Droplet, Footprints, Moon } from "lucide-react";

const BG = "linear-gradient(145deg, #2975D4 0%, #1A90CC 50%, #05B2D9 100%)";

const screens = [
  { id: "heart", label: "Heart Rate" },
  { id: "bp", label: "Blood Pressure" },
  { id: "spo2", label: "Blood Oxygen" },
  { id: "steps", label: "Steps" },
  { id: "sleep", label: "Sleep" },
  { id: "sports", label: "Sports" },
  { id: "vitals", label: "Vitals" },
];

export default function HealthApp() {
  const [current, setCurrent] = React.useState(0);
  const touchStart = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setCurrent(c => Math.min(c + 1, screens.length - 1));
      else setCurrent(c => Math.max(c - 1, 0));
    }
    touchStart.current = null;
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: BG }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={screens[current].id}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
          >
            {current === 0 && <HeartRateScreen />}
            {current === 1 && <BPScreen />}
            {current === 2 && <SpO2Screen />}
            {current === 3 && <StepsScreen />}
            {current === 4 && <SleepScreen />}
            {current === 5 && <SportsScreen />}
            {current === 6 && <VitalsScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-3">
        {screens.map((s, i) => (
          <button
            key={s.id}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/30"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

function HeartRateScreen() {
  return (
    <>
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Heart className="w-5 h-5 text-white fill-white/30" />
      </div>
      <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest mb-1">Heart Rate</span>
      <span className="text-[52px] font-bold text-white leading-none tracking-tight">72</span>
      <span className="text-sm text-white/50 mt-0.5">BPM</span>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-white/80 font-medium">Normal</span>
      </div>
      <div className="flex items-end gap-1 h-6 mt-3">
        {[10, 16, 22, 14, 18, 24, 12, 20, 18, 14].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-t-sm"
            style={{
              height: h,
              background: i % 3 === 1 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </>
  );
}

function BPScreen() {
  return (
    <>
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Activity className="w-5 h-5 text-white" />
      </div>
      <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest mb-1">Blood Pressure</span>
      <div className="flex items-baseline gap-1">
        <span className="text-[42px] font-bold text-white leading-none tracking-tight">120</span>
        <span className="text-2xl text-white/40 font-light">/</span>
        <span className="text-[28px] font-semibold text-white/80">80</span>
      </div>
      <span className="text-sm text-white/50 mt-0.5">mmHg</span>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-white/80 font-medium">Normal</span>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="text-center">
          <div className="text-[9px] text-white/50 uppercase tracking-wider">Systolic</div>
          <div className="text-xs font-semibold text-white">120 mmHg</div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="text-center">
          <div className="text-[9px] text-white/50 uppercase tracking-wider">Diastolic</div>
          <div className="text-xs font-semibold text-white">80 mmHg</div>
        </div>
      </div>
    </>
  );
}

function SpO2Screen() {
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (98 / 100) * circumference;
  return (
    <>
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Droplet className="w-5 h-5 text-white" />
      </div>
      <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest mb-1">Blood Oxygen</span>
      <div className="relative w-[90px] h-[90px]">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7" />
          <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="7"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 45 45)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[22px] font-bold text-white leading-none">98</span>
          <span className="text-xs text-white/50">%</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-white/80 font-medium">Excellent</span>
      </div>
      <span className="text-[9px] text-white/40 mt-1.5">Normal: 95–100%</span>
    </>
  );
}

function StepsScreen() {
  return (
    <>
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Footprints className="w-5 h-5 text-white" />
      </div>
      <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest mb-1">Steps</span>
      <span className="text-[44px] font-bold text-white leading-none tracking-tight">8,421</span>
      <span className="text-[10px] text-white/50 mt-0.5">Goal: 10,000</span>
      <div className="w-[150px] h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-white/90 rounded-full" style={{ width: "84%" }} />
      </div>
      <div className="flex gap-3 mt-3">
        {[
          { name: "Morning", val: "3.2K" },
          { name: "Evening", val: "2.8K" },
          { name: "Kcal", val: "421" },
        ].map(p => (
          <div key={p.name} className="bg-white/15 rounded-xl px-2.5 py-1 flex flex-col items-center">
            <span className="text-[8px] text-white/50 uppercase tracking-wider">{p.name}</span>
            <span className="text-xs font-bold text-white">{p.val}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SleepScreen() {
  return (
    <>
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Moon className="w-5 h-5 text-white" />
      </div>
      <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest mb-1">Sleep</span>
      <div className="text-[36px] font-bold text-white leading-none tracking-tight">
        7<span className="text-xl font-normal text-white/50">h</span> 24
        <span className="text-base font-normal text-white/50">m</span>
      </div>
      <span className="text-[10px] text-white/50 mt-0.5">11:00 PM — 6:24 AM</span>
      <div className="flex gap-4 mt-3">
        {[
          { val: "97%", label: "SpO2" },
          { val: "36.4°", label: "Skin Temp" },
          { val: "Good", label: "Quality" },
        ].map((m, i) => (
          <React.Fragment key={m.label}>
            {i > 0 && <div className="w-px bg-white/20" />}
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white">{m.val}</span>
              <span className="text-[8px] text-white/50 uppercase tracking-wider">{m.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

function SportsScreen() {
  const sports = [
    { name: "Swimming", detail: "45 min", cal: "312 kcal", bg: "rgba(74,144,226,0.35)", icon: "🏊" },
    { name: "Football", detail: "60 min", cal: "485 kcal", bg: "rgba(80,200,120,0.35)", icon: "⚽" },
    { name: "Evening Jog", detail: "35 min", cal: "280 kcal", bg: "rgba(255,149,0,0.35)", icon: "🏃" },
  ];
  return (
    <div className="w-full max-w-[190px]">
      <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest mb-3 block text-center">Today's Sports</span>
      <div className="flex flex-col gap-2">
        {sports.map(s => (
          <div key={s.name} className="flex items-center gap-2 bg-white/15 rounded-xl px-2.5 py-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-white truncate">{s.name}</div>
              <div className="text-[9px] text-white/50">{s.detail}</div>
            </div>
            <span className="text-[10px] font-bold text-white/80">{s.cal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VitalsScreen() {
  const vitals = [
    { label: "Breathing", value: 16, unit: "rpm" },
    { label: "Body Temp", value: "36.6", unit: "°C" },
    { label: "Calories", value: "2,594", unit: "kcal" },
    { label: "Distance", value: "6.2", unit: "km" },
  ];
  return (
    <div className="flex flex-col items-center w-full max-w-[190px]">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <Activity className="w-3 h-3 text-white/70" />
        </div>
        <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Health Score</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 w-full">
        {vitals.map(v => (
          <div key={v.label} className="bg-white/15 rounded-xl px-2 py-1.5 flex flex-col">
            <span className="text-[8px] text-white/50 uppercase tracking-wider">{v.label}</span>
            <span className="text-sm font-bold text-white leading-tight">
              {v.value} <span className="text-[8px] text-white/40 font-normal">{v.unit}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-3">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-white/80 font-medium">All systems normal</span>
      </div>
    </div>
  );
}
