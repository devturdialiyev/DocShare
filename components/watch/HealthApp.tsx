"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Droplet, Footprints, Moon, ShieldCheck } from "lucide-react";

const BG = "linear-gradient(180deg, #4A9EF5 0%, #2975D4 50%, #1A6BB5 100%)";

const screens = [
  { id: "watchface", label: "Watch Face" },
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
  const [time, setTime] = React.useState(new Date());
  const touchStart = React.useRef<number | null>(null);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

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

  const fmtTime = (d: Date) => {
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  const fmtDate = (d: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
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
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
          >
            {current === 0 && <WatchFaceScreen time={time} fmtTime={fmtTime} fmtDate={fmtDate} />}
            {current === 1 && <HeartRateScreen />}
            {current === 2 && <BPScreen />}
            {current === 3 && <SpO2Screen />}
            {current === 4 && <StepsScreen />}
            {current === 5 && <SleepScreen />}
            {current === 6 && <SportsScreen />}
            {current === 7 && <VitalsScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-[8px] pb-4">
        {screens.map((s, i) => (
          <button
            key={s.id}
            className={`rounded-full transition-all duration-200 ${
              i === current ? "bg-white scale-130 w-2 h-2" : "bg-white/30 w-[7px] h-[7px]"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

function WatchFaceScreen({ time, fmtTime, fmtDate }: { time: Date; fmtTime: (d: Date) => string; fmtDate: (d: Date) => string }) {
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const score = 85;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-1">
        <div className="text-[72px] font-bold text-white leading-none tracking-tight">
          {fmtTime(time)}
        </div>
        <div className="text-xl text-white/75 font-normal tracking-wide">
          {fmtDate(time)}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-2xl font-bold text-white">72</div>
          <div className="text-xs text-white/60 font-medium uppercase tracking-widest">BPM</div>
        </div>
        <div className="w-px h-10 bg-white/25" />
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-2xl font-bold text-white">98%</div>
          <div className="text-xs text-white/60 font-medium uppercase tracking-widest">SpO2</div>
        </div>
        <div className="w-px h-10 bg-white/25" />
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-2xl font-bold text-white">8.4K</div>
          <div className="text-xs text-white/60 font-medium uppercase tracking-widest">Steps</div>
        </div>
      </div>
      <div className="relative w-[140px] h-[140px]">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 70 70)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">{score}</div>
          <div className="text-xs text-white/60 tracking-wider">Score</div>
        </div>
      </div>
    </div>
  );
}

function HeartRateScreen() {
  return (
    <>
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Heart className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mb-1">Heart Rate</div>
      <div className="text-[60px] font-bold text-white leading-none tracking-tight">72</div>
      <div className="text-sm text-white/50 mt-[-2px]">BPM</div>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-2">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-white/80 font-medium">Normal</span>
      </div>
      <div className="flex items-end gap-1 h-8 mt-3">
        {[12, 20, 28, 18, 22, 32, 16, 26, 24, 18].map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-t-[3px]"
            style={{
              height: h,
              background: i === 2 || i === 5 || i === 8 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
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
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Activity className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mb-1">Blood Pressure</div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[50px] font-bold text-white leading-none tracking-tight">120</span>
        <span className="text-3xl text-white/40 font-light">/</span>
        <span className="text-[34px] font-semibold text-white/80">80</span>
      </div>
      <div className="text-sm text-white/50 mt-0.5">mmHg</div>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-2">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-white/80 font-medium">Normal</span>
      </div>
      <div className="flex gap-5 mt-3">
        <div className="text-center">
          <div className="text-[10px] text-white/55 uppercase tracking-wider">Systolic</div>
          <div className="text-[13px] font-semibold text-white">120 mmHg</div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="text-center">
          <div className="text-[10px] text-white/55 uppercase tracking-wider">Diastolic</div>
          <div className="text-[13px] font-semibold text-white">80 mmHg</div>
        </div>
      </div>
    </>
  );
}

function SpO2Screen() {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (98 / 100) * circumference;
  return (
    <>
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Droplet className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mb-1">Blood Oxygen</div>
      <div className="relative w-[110px] h-[110px]">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 55 55)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[28px] font-bold text-white leading-none">98</span>
          <span className="text-sm text-white/50">%</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mt-2">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-white/80 font-medium">Excellent</span>
      </div>
      <div className="text-[10px] text-white/50 mt-2">Normal: 95–100%</div>
    </>
  );
}

function StepsScreen() {
  return (
    <>
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Footprints className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mb-1">Steps</div>
      <div className="text-[52px] font-bold text-white leading-none tracking-tight">8,421</div>
      <div className="text-xs text-white/50 mt-0.5">Goal: 10,000</div>
      <div className="w-[180px] h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
        <div className="h-full bg-white/90 rounded-full" style={{ width: "84%" }} />
      </div>
      <div className="flex gap-4 mt-3">
        {[
          { name: "Morning", val: "3.2K" },
          { name: "Evening", val: "2.8K" },
          { name: "Kcal", val: "421" },
        ].map(p => (
          <div key={p.name} className="bg-white/15 rounded-xl px-3 py-1.5 flex flex-col items-center">
            <span className="text-[9px] text-white/60 uppercase tracking-wider">{p.name}</span>
            <span className="text-sm font-bold text-white">{p.val}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SleepScreen() {
  return (
    <>
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
        <Moon className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mb-1">Sleep</div>
      <div className="text-[42px] font-bold text-white leading-none tracking-tight">
        7<span className="text-2xl font-normal text-white/50">h</span> 24
        <span className="text-lg font-normal text-white/50">m</span>
      </div>
      <div className="text-xs text-white/50 mt-1">11:00 PM — 6:24 AM</div>
      <div className="flex gap-5 mt-3">
        {[
          { val: "97%", label: "SpO2" },
          { val: "36.4°", label: "Skin Temp" },
          { val: "Good", label: "Quality" },
        ].map((m, i) => (
          <React.Fragment key={m.label}>
            {i > 0 && <div className="w-px bg-white/20" />}
            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-white">{m.val}</span>
              <span className="text-[9px] text-white/55 uppercase tracking-wider">{m.label}</span>
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
    <div className="w-full flex flex-col items-center">
      <div className="text-xs text-white/70 font-medium uppercase tracking-widest mb-3 text-center">Today&apos;s Sports</div>
      <div className="w-full max-w-[220px] flex flex-col gap-2.5">
        {sports.map(s => (
          <div key={s.name} className="flex items-center gap-3 bg-white/15 rounded-xl px-3 py-2">
            <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-base flex-shrink-0" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{s.name}</div>
              <div className="text-[10px] text-white/60">{s.detail}</div>
            </div>
            <span className="text-xs font-bold text-white/85">{s.cal}</span>
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
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-white/70" />
        <span className="text-xs text-white/70 font-medium uppercase tracking-widest">Health Score</span>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
        {vitals.map(v => (
          <div key={v.label} className="bg-white/15 rounded-xl px-3 py-2 flex flex-col gap-0.5">
            <span className="text-[9px] text-white/55 uppercase tracking-wider">{v.label}</span>
            <span className="text-base font-bold text-white leading-tight">
              {v.value} <span className="text-[9px] text-white/50 font-normal">{v.unit}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-4 py-1 mt-3">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-white/85 font-medium">All systems normal</span>
      </div>
    </div>
  );
}
