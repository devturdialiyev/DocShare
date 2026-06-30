"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Live clock ───────────────────────────────────────────────────────────────
function useClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return { time:`${h}:${m}`, date:`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}` };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const BG = "linear-gradient(145deg, #2975D4 0%, #1A90CC 50%, #05B2D9 100%)";

// ─── DSAI Logo ────────────────────────────────────────────────────────────────
function DSAILogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M50 82 C50 82 15 58 15 35 C15 24 24 16 34 16 C40 16 46 19 50 24 C54 19 60 16 66 16 C76 16 85 24 85 35 C85 58 50 82 50 82Z"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"/>
      <rect x="43" y="30" width="14" height="34" rx="3" fill="white"/>
      <rect x="33" y="40" width="34" height="14" rx="3" fill="white"/>
      <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <circle cx="50" cy="6" r="3" fill="white"/>
      <circle cx="82" cy="22" r="2" fill="white" opacity="0.7"/>
      <circle cx="18" cy="78" r="2" fill="white" opacity="0.7"/>
    </svg>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
function Metric({ value, label }: { value:string; label:string }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
      <div style={{ fontSize:16, fontWeight:700, color:"#fff" }}>{value}</div>
      <div style={{ fontSize:9, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</div>
    </div>
  );
}
function VDivider() { return <div style={{ width:1, height:30, background:"rgba(255,255,255,0.2)" }}/>; }
function BackToMenuButton({ onBack }: { onBack:() => void }) {
  void onBack;
  return null;
}
function StatusBadge({ text, color="#4ade80" }: { text:string; color?:string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"3px 10px", marginTop:8 }}>
      <div style={{ width:6, height:6, borderRadius:"50%", background:color }}/>
      <span style={{ fontSize:10, color:"rgba(255,255,255,0.85)", fontWeight:500 }}>{text}</span>
    </div>
  );
}
function Ring({ r, pct, size, strokeW, color="rgba(255,255,255,0.85)" }: { r:number; pct:number; size:number; strokeW:number; color?:string }) {
  const circ = 2 * Math.PI * r;
  return (
    <>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={strokeW}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeW}
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MEASURING ANIMATION OVERLAY
// Press-and-hold 1s → measuring state → result shown
// ══════════════════════════════════════════════════════════════════════════════
type MeasureState = "idle" | "holding" | "measuring" | "done";

function useMeasure() {
  const [state, setState] = React.useState<MeasureState>("idle");
  const [progress, setProgress] = React.useState(0);
  const [result, setResult]   = React.useState<string | null>(null);
  const holdTimer  = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const measureTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    if (state !== "idle") return;
    setState("holding");
    setProgress(0);
    let p = 0;
    holdTimer.current = setInterval(() => {
      p += 0.05;
      setProgress(Math.min(p, 1));
      if (p >= 1) {
        clearInterval(holdTimer.current!);
        setState("measuring");
        measureTimer.current = setTimeout(() => {
          setState("done");
        }, 3000);
      }
    }, 50);
  };

  const cancelHold = () => {
    if (state === "holding") {
      clearInterval(holdTimer.current!);
      setState("idle");
      setProgress(0);
    }
  };

  const reset = () => {
    setState("idle");
    setProgress(0);
    setResult(null);
  };

  return { state, progress, result, setResult, startHold, cancelHold, reset };
}

// ─── Generic hold-to-measure wrapper used by Heart Rate / BP / SpO2 only ──────
function MeasureWrapper({
  icon, title, accentColor, measureLabel, resultValue, resultUnit, statusText, children, onBack,
}: {
  icon:string; title:string; accentColor:string;
  measureLabel:string; resultValue:string; resultUnit:string; statusText:string;
  children?: React.ReactNode; onBack:() => void;
}) {
  const m = useMeasure();
  React.useEffect(() => {
    if (m.state === "done") m.setResult(resultValue);
  }, [m.state]); // eslint-disable-line

  const ringR = 44, ringSize = 100, ringCirc = 2 * Math.PI * ringR;

  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px", position:"relative" }}>
      <BackToMenuButton onBack={onBack}/>

      {(m.state === "idle" || m.state === "done") && (
        <>
          <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:6 }}>{icon}</div>
          <div style={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom: m.state==="done" ? 4 : 10 }}>{title}</div>

          {m.state === "done" && (
            <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:260, damping:18 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:8 }}>
              <div style={{ fontSize:48, fontWeight:700, color:"#fff", lineHeight:1, letterSpacing:-2 }}>{resultValue}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{resultUnit}</div>
              <StatusBadge text={statusText}/>
            </motion.div>
          )}

          {children && m.state !== "done" && children}

          <div
            onPointerDown={m.startHold}
            onPointerUp={m.cancelHold}
            onPointerLeave={m.cancelHold}
            style={{ marginTop:10, position:"relative", width:64, height:64, cursor:"pointer", userSelect:"none", flexShrink:0 }}
          >
            <svg width="64" height="64" style={{ position:"absolute", top:0, left:0 }}>
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4"/>
              <motion.circle cx="32" cy="32" r="28" fill="none" stroke={accentColor} strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2*Math.PI*28}
                animate={{ strokeDashoffset: 2*Math.PI*28*(1-m.progress) }}
                transition={{ duration:0.05 }}
                transform="rotate(-90 32 32)"/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"rgba(255,255,255,0.7)", fontWeight:600, textAlign:"center", lineHeight:1.2 }}>
              {m.state==="done" ? "🔄" : "HOLD\nTO\nMEASURE"}
            </div>
          </div>
          {m.state === "done" && (
            <div onPointerDown={m.reset} style={{ fontSize:9, color:"rgba(255,255,255,0.45)", marginTop:4, cursor:"pointer" }}>tap ring to remeasure</div>
          )}
          {m.state === "idle" && (
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", marginTop:4 }}>Hold 1s to {measureLabel}</div>
          )}
        </>
      )}

      {m.state === "holding" && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:20 }}>{icon}</div>
          <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.9)" }}>Hold still…</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)" }}>{Math.round(m.progress*100)}%</div>
        </div>
      )}

      {m.state === "measuring" && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
          <div style={{ position:"relative", width:ringSize, height:ringSize }}>
            <svg width={ringSize} height={ringSize} style={{ position:"absolute" }}>
              <circle cx={ringSize/2} cy={ringSize/2} r={ringR} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
              <motion.circle cx={ringSize/2} cy={ringSize/2} r={ringR} fill="none" stroke={accentColor} strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCirc}
                animate={{ strokeDashoffset:[ringCirc, 0, ringCirc] }}
                transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }}
                transform={`rotate(-90 ${ringSize/2} ${ringSize/2})`}/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:22 }}>{icon}</div>
              <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:0.8, repeat:Infinity }}
                style={{ fontSize:9, color:"rgba(255,255,255,0.7)", marginTop:2 }}>measuring</motion.div>
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:3, height:28 }}>
            {[6,14,22,10,18,26,8,20,16,12,24,10,18].map((h,i) => (
              <motion.div key={i}
                animate={{ height:[h*0.4, h, h*0.6, h*0.9, h*0.3] }}
                transition={{ duration:0.6+i*0.07, repeat:Infinity, ease:"easeInOut" }}
                style={{ width:4, borderRadius:2, background:accentColor, opacity:0.8 }}/>
            ))}
          </div>
          <div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>Analyzing…</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════════════════════════════════════

// ─── Watch Face ───────────────────────────────────────────────────────────────
function WatchFaceScreen({ onTap }: { onTap:() => void }) {
  const { time, date } = useClock();
  return (
    <div onClick={onTap} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"100%", height:"100%", cursor:"pointer" }}>
      <div style={{ fontSize:52, fontWeight:700, color:"#fff", lineHeight:1, letterSpacing:-2 }}>{time}</div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", marginTop:4 }}>{date}</div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:16 }}>
        <Metric value="72" label="BPM"/><VDivider/>
        <Metric value="98%" label="SpO2"/><VDivider/>
        <Metric value="8.4K" label="Steps"/>
      </div>
      <div style={{ position:"relative", width:76, height:76, marginTop:12 }}>
        <svg width="76" height="76" viewBox="0 0 76 76" style={{ position:"absolute" }}>
          <Ring r={32} pct={0.85} size={76} strokeW={5}/>
        </svg>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>85</div>
          <div style={{ fontSize:8, color:"rgba(255,255,255,0.55)" }}>Score</div>
        </div>
      </div>
      <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", marginTop:10 }}>Tap to open apps</div>
    </div>
  );
}

// ─── App Launcher ─────────────────────────────────────────────────────────────
function AppLauncherScreen({ onOpenDSAI }: { onOpenDSAI:() => void }) {
  const apps = [
    { id:"health",  label:"Health",   bg:"rgba(255,80,80,0.75)",   icon:"❤️" },
    { id:"workout", label:"Workout",  bg:"rgba(80,200,100,0.75)",  icon:"🏃" },
    { id:"weather", label:"Weather",  bg:"rgba(100,160,255,0.75)", icon:"🌤️" },
    { id:"maps",    label:"Maps",     bg:"rgba(255,170,50,0.75)",  icon:"🗺️" },
    { id:"dsai",    label:"DSAI",     bg:"rgba(255,255,255,0.22)", custom:true },
    { id:"music",   label:"Music",    bg:"rgba(180,80,220,0.75)",  icon:"🎵" },
    { id:"timer",   label:"Timer",    bg:"rgba(255,120,30,0.75)",  icon:"⏱️" },
    { id:"settings",label:"Settings", bg:"rgba(100,100,120,0.75)", icon:"⚙️" },
    { id:"phone",   label:"Phone",    bg:"rgba(60,200,160,0.75)",  icon:"📞" },
  ];
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"14px 10px" }}>
      <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>Apps</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, width:"100%" }}>
        {apps.map((app) => (
          <div key={app.id} onClick={app.id==="dsai" ? onOpenDSAI : undefined}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, cursor:app.id==="dsai"?"pointer":"default" }}>
            <div style={{ width:50, height:50, borderRadius:"50%", background:app.bg, display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow: app.id==="dsai" ? "0 0 0 2.5px rgba(255,255,255,0.8),0 0 16px rgba(255,255,255,0.3)" : "0 2px 8px rgba(0,0,0,0.2)",
              fontSize:22 }}>
              {(app as {custom?:boolean}).custom ? <DSAILogo size={30}/> : (app as {icon:string}).icon}
            </div>
            <div style={{ fontSize:9, color:app.id==="dsai"?"#fff":"rgba(255,255,255,0.7)", fontWeight:app.id==="dsai"?700:500, textAlign:"center" }}>{app.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pairing Flow ─────────────────────────────────────────────────────────────
type PairingStep = "searching" | "pairing" | "connected";
function PairingFlowScreen({ onDone }: { onDone:() => void }) {
  const [step, setStep] = React.useState<PairingStep>("searching");
  React.useEffect(() => {
    const t1 = setTimeout(() => setStep("pairing"),   1800);
    const t2 = setTimeout(() => setStep("connected"), 3600);
    const t3 = setTimeout(() => onDone(),             5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);
  const label = { searching:"Searching for device\u2026", pairing:"Pairing\u2026", connected:"Connected!" }[step];
  const color = step==="connected" ? "#4ade80" : "rgba(255,255,255,0.85)";
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:18 }}>
      <motion.div animate={{ scale:step==="connected"?[1,1.15,1]:[1,1.08,1] }} transition={{ repeat:step==="connected"?0:Infinity, duration:1.2 }}>
        <DSAILogo size={62}/>
      </motion.div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        {step!=="connected" ? (
          <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1.2, ease:"linear" }}
            style={{ width:28, height:28, borderRadius:"50%", border:"3px solid rgba(255,255,255,0.2)", borderTopColor:"#fff" }}/>
        ) : (
          <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:260, damping:18 }}
            style={{ width:28, height:28, borderRadius:"50%", background:"#4ade80", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{'\u2713'}</motion.div>
        )}
        <div style={{ fontSize:13, fontWeight:600, color, textAlign:"center" }}>{label}</div>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        {(["searching","pairing","connected"] as PairingStep[]).map(s => (
          <div key={s} style={{ width:6, height:6, borderRadius:"50%", background:s===step?"#fff":"rgba(255,255,255,0.25)", transition:"background 0.3s" }}/>
        ))}
      </div>
      <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)" }}>DSAI Health Monitor</div>
    </div>
  );
}

// ─── Health Score + Menu ──────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id:"heartrate", label:"Heart Rate",     icon:"\u2764\uFE0F",  color:"#ff6b6b" },
  { id:"bp",        label:"Blood Pressure", icon:"\uD83E\uDE78",  color:"#ff4757" },
  { id:"spo2",      label:"SpO2",           icon:"\uD83D\uDCA7",  color:"#54a0ff" },
  { id:"steps",     label:"Steps",          icon:"\uD83D\uDC5F",  color:"#2ed573" },
  { id:"sleep",     label:"Sleep",          icon:"\uD83C\uDF19",  color:"#a29bfe" },
  { id:"sports",    label:"Sports",         icon:"\u26A1",  color:"#ffa502" },
  { id:"vitals",    label:"Vitals",         icon:"\uD83D\uDEE1\uFE0F", color:"#1abc9c" },
];

function HealthScoreScreen({ onSelectMenu, startOnMenu }: { onSelectMenu:(id:string)=>void; startOnMenu:boolean }) {
  const [view, setView] = React.useState<"score"|"menu">(startOnMenu ? "menu" : "score");
  React.useEffect(() => { if (startOnMenu) setView("menu"); }, [startOnMenu]);
  const r=40, size=100, circ=2*Math.PI*r;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(()=>setMounted(true),200); return ()=>clearTimeout(t); },[]);

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }}>
      <AnimatePresence mode="wait">

        {view==="score" && (
          <motion.div key="score"
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.25 }}
            style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>

            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
              <DSAILogo size={16}/>
              <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.8)", textTransform:"uppercase", letterSpacing:"0.08em" }}>DSAI</span>
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Health Score</div>

            <div style={{ position:"relative", width:size, height:size }}>
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position:"absolute" }}>
                <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7"/>
                <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="7"
                  strokeDasharray={circ}
                  initial={{ strokeDashoffset:circ }}
                  animate={{ strokeDashoffset:circ*(1-(mounted?0.85:0)) }}
                  transition={{ duration:1.2, ease:"easeOut" }}
                  strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/>
              </svg>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                <motion.div initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8 }}
                  style={{ fontSize:26, fontWeight:700, color:"#fff", lineHeight:1 }}>85</motion.div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)" }}>/ 100</div>
              </div>
            </div>

            <div style={{ display:"flex", gap:7, marginTop:2 }}>
              {[["\u2764\uFE0F","72","BPM"],["\uD83D\uDCA7","98%","SpO2"],["\uD83D\uDC5F","8.4K","Steps"]].map(([ic,v,l])=>(
                <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center", background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"3px 6px" }}>
                  <span style={{ fontSize:9 }}>{ic}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:"#fff" }}>{v}</span>
                  <span style={{ fontSize:7, color:"rgba(255,255,255,0.5)" }}>{l}</span>
                </div>
              ))}
            </div>

            <motion.div whileTap={{ scale:0.93 }} onClick={() => setView("menu")}
              style={{ marginTop:8, background:"rgba(255,255,255,0.18)", borderRadius:14, padding:"5px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ fontSize:9, color:"#fff", fontWeight:600 }}>View Functions</span>
              <span style={{ fontSize:9, color:"rgba(255,255,255,0.6)" }}>{'\u203A'}</span>
            </motion.div>
          </motion.div>
        )}

        {view==="menu" && (
          <motion.div key="menu"
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.25 }}
            style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"6px 6px" }}>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", marginBottom:6, padding:"0 4px" }}>
              <div onClick={() => setView("score")}
                style={{ fontSize:9, color:"rgba(255,255,255,0.5)", cursor:"pointer", padding:"2px 4px" }}>{'\u2039'} Back</div>
              <div style={{ fontSize:9.5, fontWeight:600, color:"rgba(255,255,255,0.8)", textTransform:"uppercase", letterSpacing:"0.06em" }}>Measure</div>
              <div style={{ width:26 }}/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3, width:"100%", maxWidth:178 }}>
              {MENU_ITEMS.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay: i*0.05, type:"spring", stiffness:300, damping:22 }}
                  onClick={() => onSelectMenu(item.id)}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%",
                    background:`radial-gradient(circle at 35% 35%, ${item.color}55, ${item.color}22)`,
                    border:`1.5px solid ${item.color}80`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
                    boxShadow:`0 2px 8px ${item.color}40` }}>
                    {item.icon}
                  </div>
                  <div style={{ fontSize:6.8, color:"rgba(255,255,255,0.75)", fontWeight:500, textAlign:"center", lineHeight:1.15 }}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Heart Rate / BP / SpO2 — these use the hold-to-measure button ────────────
function HeartRateScreen({ onBack }: { onBack:() => void }) {
  const bars = [10,16,22,14,18,24,12,20,18,14];
  const hi = new Set([2,5,8]);
  return (
    <MeasureWrapper icon={"\u2764\uFE0F"} title="Heart Rate" accentColor="#ff6b6b" onBack={onBack}
      measureLabel="measure BPM" resultValue="72" resultUnit="BPM" statusText="Normal">
      <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:22 }}>
        {bars.map((h,i)=>(
          <div key={i} style={{ width:5, height:h, borderRadius:"3px 3px 0 0",
            background:hi.has(i)?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.3)" }}/>
        ))}
      </div>
    </MeasureWrapper>
  );
}
function BloodPressureScreen({ onBack }: { onBack:() => void }) {
  return (
    <MeasureWrapper icon={"\uD83E\uDE78"} title="Blood Pressure" accentColor="#ff4757" onBack={onBack}
      measureLabel="measure BP" resultValue="120/80" resultUnit="mmHg" statusText="Normal">
      <div style={{ display:"flex", alignItems:"baseline", gap:3 }}>
        <span style={{ fontSize:32, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:-1 }}>120</span>
        <span style={{ fontSize:18, color:"rgba(255,255,255,0.3)" }}>/</span>
        <span style={{ fontSize:22, fontWeight:600, color:"rgba(255,255,255,0.4)" }}>80</span>
      </div>
    </MeasureWrapper>
  );
}
function SpO2Screen({ onBack }: { onBack:() => void }) {
  const r=30, size=70, circ=2*Math.PI*r;
  return (
    <MeasureWrapper icon={"\uD83D\uDCA7"} title="Blood Oxygen" accentColor="#54a0ff" onBack={onBack}
      measureLabel="measure SpO2" resultValue="98%" resultUnit="Blood Oxygen" statusText="Excellent">
      <div style={{ position:"relative", width:70, height:70 }}>
        <svg width="70" height="70" viewBox="0 0 70 70" style={{ position:"absolute" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="5"
            strokeDasharray={circ} strokeDashoffset={circ*0.02} strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}/>
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <div style={{ fontSize:16, fontWeight:700, color:"rgba(255,255,255,0.5)" }}>98</div>
          <div style={{ fontSize:8, color:"rgba(255,255,255,0.35)" }}>%</div>
        </div>
      </div>
    </MeasureWrapper>
  );
}

// ─── Steps — passive auto-tracked, no measure button ──────────────────────────
function StepsScreen({ onBack }: { onBack:() => void }) {
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px", position:"relative" }}>
      <BackToMenuButton onBack={onBack}/>
      <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:6 }}>{'\uD83D\uDC5F'}</div>
      <div style={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Steps</div>
      <div style={{ fontSize:46, fontWeight:700, color:"#fff", letterSpacing:-2, lineHeight:1 }}>8,421</div>
      <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)", marginTop:3 }}>Goal: 10,000</div>
      <div style={{ width:140, height:6, background:"rgba(255,255,255,0.2)", borderRadius:3, marginTop:10, overflow:"hidden" }}>
        <div style={{ height:"100%", width:"84%", borderRadius:3, background:"rgba(255,255,255,0.9)" }}/>
      </div>
      <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginTop:10 }}>Tracked automatically</div>
    </div>
  );
}

// ─── Sleep — fully passive ────────────────────────────────────────────────────
function SleepScreen({ onBack }: { onBack:() => void }) {
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px", position:"relative" }}>
      <BackToMenuButton onBack={onBack}/>
      <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:6 }}>{'\uD83C\uDF19'}</div>
      <div style={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Sleep</div>
      <div style={{ fontSize:34, fontWeight:700, color:"#fff", letterSpacing:-1, lineHeight:1 }}>
        7<span style={{ fontSize:18, fontWeight:400, color:"rgba(255,255,255,0.6)" }}>h</span>{" "}
        24<span style={{ fontSize:14, fontWeight:400, color:"rgba(255,255,255,0.6)" }}>m</span>
      </div>
      <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)", marginTop:2 }}>11:00 PM \u2014 6:24 AM</div>
      <div style={{ display:"flex", gap:12, marginTop:12 }}>
        {[["97%","SpO2"],["36.4\u00B0","Skin Temp"],["Good","Quality"]].map(([v,l],i) => (
          <React.Fragment key={l}>
            {i>0 && <div style={{ width:1, background:"rgba(255,255,255,0.2)", height:26 }}/>}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{v}</div>
              <div style={{ fontSize:7, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.05em" }}>{l}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginTop:12, textAlign:"center", maxWidth:170 }}>
        Sleep is tracked automatically overnight \u2014 no manual measurement needed
      </div>
    </div>
  );
}

// ─── Sports — pick an activity, then start tracking it ────────────────────────
const SPORTS_LIST = [
  { id:"running",   label:"Running",   icon:"\uD83C\uDFC3" },
  { id:"swimming",  label:"Swimming",  icon:"\uD83C\uDFCA" },
  { id:"cycling",   label:"Cycling",   icon:"\uD83D\uDEB4" },
  { id:"football",  label:"Football",  icon:"\u26BD" },
  { id:"yoga",      label:"Yoga",      icon:"\uD83E\uDDD8" },
  { id:"walking",   label:"Walking",   icon:"\uD83D\uDEB6" },
];
type SportsView = "list" | "ready" | "active" | "summary";
function SportsScreen({ onBack, swipeRightSignal }: { onBack:() => void; swipeRightSignal:number }) {
  const [view, setView] = React.useState<SportsView>("list");
  const [picked, setPicked] = React.useState<typeof SPORTS_LIST[number] | null>(null);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (view !== "active") return;
    const t = setInterval(() => setSeconds(s => s+1), 1000);
    return () => clearInterval(t);
  }, [view]);

  const prevSignal = React.useRef(swipeRightSignal);
  React.useEffect(() => {
    if (swipeRightSignal === prevSignal.current) return;
    prevSignal.current = swipeRightSignal;
    if (view === "list") {
      onBack();
    } else if (view === "ready") {
      setView("list"); setPicked(null);
    } else if (view === "active") {
      setView("ready"); setSeconds(0);
    } else if (view === "summary") {
      setView("list"); setPicked(null);
    }
  }, [swipeRightSignal]); // eslint-disable-line

  const choose = (s: typeof SPORTS_LIST[number]) => {
    setPicked(s); setView("ready");
  };
  const start  = () => { setSeconds(0); setView("active"); };
  const finish = () => setView("summary");
  const reset  = () => { setView("list"); setPicked(null); setSeconds(0); };

  const mm = String(Math.floor(seconds/60)).padStart(2,"0");
  const ss = String(seconds%60).padStart(2,"0");

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }}>
      <AnimatePresence mode="wait">

        {view==="list" && (
          <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"22px 16px 12px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Choose Activity</div>
            <div style={{ display:"flex", flexDirection:"column", gap:5, width:175, maxHeight:170, overflowY:"auto" }}>
              {SPORTS_LIST.map(s => (
                <div key={s.id} onClick={()=>choose(s)}
                  style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"6px 10px", cursor:"pointer" }}>
                  <span style={{ fontSize:15 }}>{s.icon}</span>
                  <span style={{ fontSize:10, color:"#fff", fontWeight:500 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view==="ready" && picked && (
          <motion.div key="ready" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
            style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
            <div style={{ width:54, height:54, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>
              {picked.icon}
            </div>
            <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{picked.label}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)" }}>Ready to begin</div>
            <motion.div whileTap={{ scale:0.93 }} onClick={start}
              style={{ marginTop:6, background:"rgba(80,200,120,0.9)", borderRadius:18, padding:"8px 26px", cursor:"pointer" }}>
              <span style={{ fontSize:11, color:"#fff", fontWeight:700, letterSpacing:"0.04em" }}>{'\u25B6'} START</span>
            </motion.div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,0.35)", marginTop:2 }}>Swipe right to choose another</div>
          </motion.div>
        )}

        {view==="active" && picked && (
          <motion.div key="active" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
            style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
            <motion.div animate={{ scale:[1,1.1,1] }} transition={{ duration:1, repeat:Infinity }} style={{ fontSize:30 }}>{picked.icon}</motion.div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", fontWeight:600 }}>{picked.label}</div>
            <div style={{ fontSize:30, fontWeight:700, color:"#fff", letterSpacing:-1 }}>{mm}:{ss}</div>
            <div style={{ display:"flex", gap:10, marginTop:2 }}>
              {[["\u2764\uFE0F","128"],["\uD83D\uDD25","210"]].map(([ic,v]) => (
                <div key={ic} style={{ display:"flex", alignItems:"center", gap:3, background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"3px 8px" }}>
                  <span style={{ fontSize:10 }}>{ic}</span><span style={{ fontSize:10, fontWeight:700, color:"#fff" }}>{v}</span>
                </div>
              ))}
            </div>
            <div onClick={finish} style={{ marginTop:8, background:"rgba(255,80,80,0.85)", borderRadius:14, padding:"5px 18px", cursor:"pointer" }}>
              <span style={{ fontSize:9, color:"#fff", fontWeight:700 }}>STOP</span>
            </div>
          </motion.div>
        )}

        {view==="summary" && picked && (
          <motion.div key="summary" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
            <div style={{ fontSize:22 }}>{'\u2705'}</div>
            <div style={{ fontSize:11, fontWeight:600, color:"#fff" }}>{picked.label} complete</div>
            <div style={{ display:"flex", gap:14, marginTop:4 }}>
              {[["Time", `${mm}:${ss}`],["Kcal","210"],["Avg HR","128"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{v}</div>
                  <div style={{ fontSize:7, color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
            <div onClick={reset} style={{ marginTop:10, fontSize:9, color:"rgba(255,255,255,0.5)", cursor:"pointer" }}>{'\u2039'} Choose another activity</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Vitals — passive auto-display summary ────────────────────────────────────
function VitalsScreen({ onBack }: { onBack:() => void }) {
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 14px", position:"relative" }}>
      <BackToMenuButton onBack={onBack}/>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
        <span>{'\uD83D\uDEE1\uFE0F'}</span>
        <span style={{ fontSize:10, fontWeight:500, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Vitals Summary</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, width:170 }}>
        {[["Breathing","16 rpm"],["Body Temp","36.6\u00B0C"],["Calories","2,594"],["Distance","6.2 km"]].map(([l,v]) => (
          <div key={l} style={{ background:"rgba(255,255,255,0.11)", borderRadius:10, padding:"6px 8px" }}>
            <div style={{ fontSize:7, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.05em" }}>{l}</div>
            <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:10, background:"rgba(255,255,255,0.11)", borderRadius:20, padding:"4px 12px", display:"inline-flex", alignItems:"center", gap:5 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80" }}/>
        <span style={{ fontSize:9, color:"rgba(255,255,255,0.8)", fontWeight:500 }}>All systems normal</span>
      </div>
    </div>
  );
}

// ─── Screen registry ──────────────────────────────────────────────────────────
const HEALTH_SCREENS = [
  { id:"healthscore", label:"Health Score" },
  { id:"heartrate",   label:"Heart Rate"   },
  { id:"bp",          label:"Blood Pressure"},
  { id:"spo2",        label:"SpO2"         },
  { id:"steps",       label:"Steps"        },
  { id:"sleep",       label:"Sleep"        },
  { id:"sports",      label:"Sports"       },
  { id:"vitals",      label:"Vitals"       },
];

// ─── Galaxy Watch 8 44mm frame ───────────────────────────────────────────────
function GalaxyWatch8({ children, onSwipeLeft, onSwipeRight }: {
  children:React.ReactNode; onSwipeLeft:()=>void; onSwipeRight:()=>void;
}) {
  const dragStart = React.useRef<number|null>(null);
  return (
    <div style={{ position:"relative", width:290, height:290, flexShrink:0 }}>
      <div style={{ position:"absolute", inset:-4, borderRadius:"50%", background:"linear-gradient(145deg,#3a3a3a 0%,#1a1a1a 100%)", boxShadow:"0 20px 60px rgba(0,0,0,0.55),0 4px 12px rgba(0,0,0,0.4),inset 0 1px 1px rgba(255,255,255,0.08)" }}/>
      <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"linear-gradient(145deg,#2e2e2e 0%,#141414 100%)", boxShadow:"inset 0 2px 4px rgba(0,0,0,0.6)" }}/>
      <div style={{ position:"absolute", inset:8, borderRadius:"50%", overflow:"hidden", background:"#000", cursor:"grab" }}
        onPointerDown={e=>{ dragStart.current=e.clientX; }}
        onPointerUp={e=>{
          if(dragStart.current===null) return;
          const dx=e.clientX-dragStart.current;
          if(dx<-40) onSwipeLeft();
          else if(dx>40) onSwipeRight();
          dragStart.current=null;
        }}>
        {children}
      </div>
      <div style={{ position:"absolute", right:-14, top:"50%", transform:"translateY(-50%)", width:10, height:44, borderRadius:5, background:"linear-gradient(180deg,#3a3a3a,#1a1a1a)", boxShadow:"2px 0 6px rgba(0,0,0,0.5)" }}/>
      <div style={{ position:"absolute", right:-12, top:"calc(50% + 32px)", width:8, height:22, borderRadius:4, background:"linear-gradient(180deg,#303030,#181818)", boxShadow:"2px 0 4px rgba(0,0,0,0.4)" }}/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
type AppFlow = "watchface" | "applauncher" | "pairing" | "health";

export default function WatchPage() {
  const [flow, setFlow]         = React.useState<AppFlow>("watchface");
  const [healthIdx, setHealthIdx] = React.useState(0);
  const [dir, setDir]           = React.useState(1);

  const goHealth = (idx:number, d:number) => { setDir(d); setHealthIdx(idx); };

  const swipeLeft = () => {
    if (flow==="watchface")   { setFlow("applauncher"); return; }
    if (flow!=="health") return;
    if (healthIdx===0) {
      setCameFromDetail(true);
      return;
    }
    const next = Math.min(healthIdx+1, HEALTH_SCREENS.length-1);
    if (next!==healthIdx) goHealth(next,1);
  };
  const swipeRight = () => {
    if (flow==="applauncher") { setFlow("watchface"); return; }
    if (flow!=="health") return;
    if (healthIdx>0) {
      setCameFromDetail(true);
      goHealth(0,-1);
      return;
    }
  };

  const [cameFromDetail, setCameFromDetail] = React.useState(false);
  const openHealthScreen = (id:string, toMenu = false) => {
    const idx = HEALTH_SCREENS.findIndex(s=>s.id===id);
    if (idx>-1) {
      setCameFromDetail(toMenu);
      goHealth(idx, toMenu ? -1 : 1);
    }
  };

  const renderHealthContent = (id:string) => {
    const backToMenu = () => openHealthScreen("healthscore", true);
    switch(id) {
      case "healthscore": return <HealthScoreScreen onSelectMenu={(sid)=>openHealthScreen(sid)} startOnMenu={cameFromDetail}/>;
      case "heartrate":   return <HeartRateScreen onBack={backToMenu}/>;
      case "bp":          return <BloodPressureScreen onBack={backToMenu}/>;
      case "spo2":        return <SpO2Screen onBack={backToMenu}/>;
      case "steps":       return <StepsScreen onBack={backToMenu}/>;
      case "sleep":       return <SleepScreen onBack={backToMenu}/>;
      case "sports":      return <SportsScreen onBack={backToMenu} swipeRightSignal={0}/>;
      case "vitals":      return <VitalsScreen onBack={backToMenu}/>;
      default:            return <HealthScoreScreen onSelectMenu={openHealthScreen} startOnMenu={false}/>;
    }
  };

  const renderContent = () => {
    switch(flow) {
      case "watchface":
        return <WatchFaceScreen key="watchface" onTap={()=>setFlow("applauncher")}/>;
      case "applauncher":
        return <AppLauncherScreen key="applauncher" onOpenDSAI={()=>setFlow("pairing")}/>;
      case "pairing":
        return <PairingFlowScreen key="pairing" onDone={()=>{ setHealthIdx(0); setFlow("health"); }}/>;
      case "health":
        return (
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={healthIdx} custom={dir}
              variants={{
                enter:(d:number)=>({ x:d>0?280:-280, opacity:0 }),
                center:{ x:0, opacity:1 },
                exit:(d:number)=>({ x:d>0?-280:280, opacity:0 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration:0.22, ease:"easeInOut" }}
              style={{ position:"absolute", inset:0, background:BG, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {renderHealthContent(HEALTH_SCREENS[healthIdx].id)}
            </motion.div>
          </AnimatePresence>
        );
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8eaed", fontFamily:"'Inter','Arimo',sans-serif", gap:20, padding:40 }}>

      <div style={{ fontSize:11, fontWeight:500, color:"#888", textTransform:"uppercase", letterSpacing:"0.1em" }}>Samsung Galaxy Watch 8 \u00B7 44mm</div>

      <GalaxyWatch8 onSwipeLeft={swipeLeft} onSwipeRight={swipeRight}>
        <div style={{ position:"absolute", inset:0, background:BG }}/>
        <AnimatePresence mode="wait">
          {flow!=="health" && (
            <motion.div key={flow}
              initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
              transition={{ duration:0.25, ease:"easeInOut" }}
              style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
        {flow==="health" && renderContent()}
      </GalaxyWatch8>

      {flow==="health" && (
        <div style={{ display:"flex", gap:6, justifyContent:"center" }}>
          {HEALTH_SCREENS.map((s,i)=>(
            <button key={s.id} onClick={()=>goHealth(i,i>healthIdx?1:-1)}
              title={s.label}
              style={{ width:i===healthIdx?10:7, height:i===healthIdx?10:7, borderRadius:"50%",
                background:i===healthIdx?"#2975D4":"#bbb", border:"none", cursor:"pointer", padding:0, transition:"all 0.2s" }}/>
          ))}
        </div>
      )}

      <div style={{ fontSize:11, color:"#aaa", textAlign:"center" }}>
        {flow==="watchface"   && "Swipe left \u2192 Apps  \u00B7  Tap to open apps"}
        {flow==="applauncher" && "Tap DSAI (center) to open  \u00B7  Swipe right \u2192 Watch face"}
        {flow==="pairing"     && "Connecting to your DSAI device\u2026"}
        {flow==="health" && healthIdx===0 && "Health Score  \u00B7  Swipe left \u2192 Functions menu"}
        {flow==="health" && healthIdx>0   && `${HEALTH_SCREENS[healthIdx].label}  \u00B7  Swipe right \u2192 Menu  \u00B7  Swipe left \u2192 Next`}
      </div>

      {flow!=="watchface" && flow!=="pairing" && (
        <button onClick={()=>{
          if(flow==="applauncher") setFlow("watchface");
          if(flow==="health") { setFlow("applauncher"); setHealthIdx(0); }
        }} style={{ background:"transparent", border:"0.5px solid #ccc", borderRadius:8, padding:"6px 18px", fontSize:12, cursor:"pointer", color:"#666" }}>
          \u2190 Back
        </button>
      )}

      {flow==="watchface" && (
        <div style={{ fontSize:10, color:"#aaa", background:"#fff", borderRadius:10, padding:"8px 16px", boxShadow:"0 1px 4px rgba(0,0,0,0.08)", maxWidth:320, textAlign:"center" }}>
          {'\uD83D\uDCA1'} The Watch Face is also a <strong>widget</strong> \u2014 shows BPM, SpO2, Steps & Score on the home screen without opening the app.
        </div>
      )}
    </div>
  );
}
