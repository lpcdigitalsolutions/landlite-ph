"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";

// ── Scene definitions ──────────────────────────────────────────────────────────
const scenes: Record<
  string,
  {
    lamp: string; b: number; t: number;
    label: string; desc: string; icon: string;
    filter: string; tint: string;
  }
> = {
  relax: {
    lamp: "#ffb347", b: 45, t: 2900,
    label: "Relax", desc: "Warm amber glow for winding down", icon: "moon",
    filter: "brightness(0.55) saturate(1.25) sepia(0.45) hue-rotate(-12deg) contrast(1.05)",
    tint: "rgba(255,170,90,0.18)",
  },
  focus: {
    lamp: "#c8e8ff", b: 85, t: 5000,
    label: "Focus", desc: "Cool white for productivity", icon: "target",
    filter: "brightness(0.95) saturate(0.85) contrast(1.0) hue-rotate(8deg)",
    tint: "rgba(180,220,255,0.12)",
  },
  movie: {
    lamp: "#ff6633", b: 15, t: 2700,
    label: "Movie", desc: "Dim orange bias for cinema feel", icon: "film",
    filter: "brightness(0.22) saturate(0.7) sepia(0.6) hue-rotate(-22deg) contrast(1.25)",
    tint: "rgba(255,90,40,0.18)",
  },
  energize: {
    lamp: "#e8ffe8", b: 100, t: 6000,
    label: "Energize", desc: "Crisp daylight for full energy", icon: "zap",
    filter: "brightness(1.10) saturate(1.05) contrast(1.05) hue-rotate(2deg)",
    tint: "rgba(220,245,235,0.10)",
  },
  romantic: {
    lamp: "#ff4466", b: 25, t: 2700,
    label: "Romantic", desc: "Deep rose warmth for intimacy", icon: "heart",
    filter: "brightness(0.35) saturate(1.6) sepia(0.5) hue-rotate(-28deg) contrast(1.15)",
    tint: "rgba(255,60,90,0.25)",
  },
  morning: {
    lamp: "#fff5cc", b: 70, t: 3500,
    label: "Morning", desc: "Gentle sunrise tones", icon: "sunrise",
    filter: "brightness(0.85) saturate(1.10) sepia(0.30) hue-rotate(-5deg) contrast(1.0)",
    tint: "rgba(255,225,170,0.14)",
  },
  off: {
    lamp: "#1a1a1a", b: 0, t: 2700,
    label: "Lights off", desc: "All lights off", icon: "circle",
    filter: "brightness(0.06) saturate(0.3) contrast(1.4)",
    tint: "rgba(0,0,0,0.45)",
  },
};

const ROOM_PHOTO = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85";

function tempToColor(k: number): string {
  if (k <= 2800) return "#ffaa44";
  if (k <= 3200) return "#ffcc66";
  if (k <= 4000) return "#ffe8aa";
  if (k <= 5000) return "#f0f0ff";
  return "#cce8ff";
}

const VOICE_COMMANDS = [
  '"movie night"', '"set romantic"', '"focus mode"', '"good morning"',
  '"energize"', '"brighter"', '"dimmer"', '"warmer"', '"cooler"', '"lights off"',
];

// ── Lucide-style scene icons ───────────────────────────────────────────────────
function SceneIcon({ name, size = 18, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth: 1.5,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "moon":    return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case "target":  return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>;
    case "film":    return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M8 4v16"/><path d="M16 4v16"/></svg>;
    case "zap":     return <svg {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
    case "heart":   return <svg {...p}><path d="M20.8 5.6a5.5 5.5 0 0 0-9-1.2 5.5 5.5 0 1 0-7.8 7.8L12 20l8-7.8a5.5 5.5 0 0 0 .8-6.6z"/></svg>;
    case "sunrise": return <svg {...p}><path d="M3 18h18"/><path d="M8 14a4 4 0 0 1 8 0"/><path d="M12 4v3"/><path d="M5.6 9.6l2.1 2.1"/><path d="M16.3 11.7l2.1-2.1"/></svg>;
    case "circle":  return <svg {...p}><circle cx="12" cy="12" r="6"/></svg>;
    case "mic":     return <svg {...p}><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>;
    default:        return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

// ── Feature-grid icons ─────────────────────────────────────────────────────────
function FeatIcon({ name, size = 24 }: { name: string; size?: number }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "voice":     return <SceneIcon name="mic" size={size} />;
    case "app":       return <svg {...p}><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>;
    case "circadian": return <SceneIcon name="sunrise" size={size} />;
    case "schedule":  return <svg {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M9 3h6"/></svg>;
    case "energy":    return <SceneIcon name="zap" size={size} />;
    case "zones":     return <svg {...p}><path d="M3 9l9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 14h6"/><path d="M9 18h6"/></svg>;
    default:          return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

// ── Section demo header ────────────────────────────────────────────────────────
function DemoHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{
        width: "3px", height: "28px", borderRadius: "2px",
        background: "linear-gradient(180deg, var(--azure), var(--azure-deep))",
      }} />
      <h2 style={{
        fontFamily: "'Exo 2', sans-serif",
        fontSize: "1rem", fontWeight: 700,
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: "var(--azure-deep)",
      }}>{title}</h2>
      {badge && (
        <span style={{
          fontSize: "10px",
          fontFamily: "'Exo 2', sans-serif", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: "999px",
          background: "rgba(14,187,240,0.10)",
          border: "1px solid rgba(14,187,240,0.30)",
          color: "var(--azure-deep)",
        }}>{badge}</span>
      )}
    </div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────────
export default function SmartSolutionsPage() {
  const [scrolled, setScrolled]         = useState(false);
  const [currentScene, setCurrentScene] = useState("relax");
  const [brightness, setBrightness]     = useState(45);
  const [colorTemp, setColorTemp]       = useState(2900);
  const [isListening, setIsListening]   = useState(false);
  const [transcript, setTranscript]     = useState("");
  const [feedback, setFeedback]         = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [lampColor, setLampColor]       = useState("#ffb347");
  const [roomFilter, setRoomFilter]     = useState(scenes.relax.filter);
  const [roomTint, setRoomTint]         = useState(scenes.relax.tint);
  const [now, setNow]                   = useState(() => new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const feedbackTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll → sticky navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live clock
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const showFeedback = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setFeedback({ msg, type });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2500);
  }, []);

  const applyScene = useCallback((name: string, withFeedback = false) => {
    const s = scenes[name];
    if (!s) return;
    setCurrentScene(name);
    setBrightness(s.b);
    setColorTemp(s.t);
    setLampColor(s.lamp);
    setRoomFilter(s.filter);
    setRoomTint(s.tint);
    if (withFeedback) showFeedback(`${s.label} set`);
  }, [showFeedback]);

  // Apply initial scene on mount
  useEffect(() => { applyScene("relax", false); }, [applyScene]);

  const handleManualUpdate = useCallback((newB?: number, newT?: number) => {
    const b = newB ?? brightness;
    const t = newT ?? colorTemp;
    setBrightness(b);
    setColorTemp(t);
    setLampColor(tempToColor(t));
    const bAmount = 0.15 + (b / 100) * 1.0;
    const warm = t < 4000;
    const sepia = warm ? 0.45 : 0.0;
    const hue   = warm ? -12  : 6;
    setRoomFilter(`brightness(${bAmount.toFixed(2)}) saturate(1.05) sepia(${sepia}) hue-rotate(${hue}deg) contrast(1.05)`);
    setRoomTint(`${tempToColor(t)}26`);
    setCurrentScene("custom");
  }, [brightness, colorTemp]);

  const processVoice = useCallback((text: string) => {
    const t = text.toLowerCase();
    if (t.match(/movie|cinema/))              { applyScene("movie",    true); return; }
    if (t.match(/romantic|romance/))          { applyScene("romantic", true); return; }
    if (t.match(/focus|work|study/))          { applyScene("focus",    true); return; }
    if (t.match(/energize|energy|wake up/))   { applyScene("energize", true); return; }
    if (t.match(/morning|good morning|wake/)) { applyScene("morning",  true); return; }
    if (t.match(/relax|chill/))               { applyScene("relax",    true); return; }
    if (t.match(/off|lights off|turn off/))   { applyScene("off",      true); return; }
    if (t.match(/brighter|more light/))  { const nv = Math.min(100, brightness + 20); handleManualUpdate(nv, colorTemp);  showFeedback(`Brighter — ${nv}%`);  return; }
    if (t.match(/dimmer|dim|less light/)) { const nv = Math.max(5,   brightness - 20); handleManualUpdate(nv, colorTemp);  showFeedback(`Dimmer — ${nv}%`);    return; }
    if (t.match(/warmer|warm/))           { const nv = Math.max(2700, colorTemp - 500); handleManualUpdate(brightness, nv); showFeedback(`Warmer — ${nv}K`);   return; }
    if (t.match(/cooler|cool|blue/))      { const nv = Math.min(6500, colorTemp + 500); handleManualUpdate(brightness, nv); showFeedback(`Cooler — ${nv}K`);   return; }
    showFeedback('Try: "movie night", "brighter", "relax"', "err");
  }, [brightness, colorTemp, applyScene, handleManualUpdate, showFeedback]);

  const toggleVoice = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setTranscript("Voice not supported in this browser.");
      showFeedback("Use Chrome or Edge", "err");
      return;
    }
    if (isListening) { recognitionRef.current?.stop(); return; }
    const rec = new SR();
    recognitionRef.current = rec;
    rec.continuous = false; rec.interimResults = true; rec.lang = "en-PH";
    rec.onstart  = () => { setIsListening(true); setTranscript("Listening…"); };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const interim = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setTranscript(`"${interim}"`);
      if (e.results[e.results.length - 1].isFinal) processVoice(interim);
    };
    rec.onerror  = () => { showFeedback("Could not hear — try again", "err"); setTranscript("Click mic and say a command…"); setIsListening(false); };
    rec.onend    = () => {
      setIsListening(false);
      setTimeout(() => setTranscript((prev) => prev.startsWith('"') ? prev : "Click mic and say a command…"), 3000);
    };
    rec.start();
  }, [isListening, processVoice, showFeedback]);

  // Derived rendering values
  const alpha      = Math.max(0, Math.min(1, brightness / 100));
  const lampSize   = Math.round(9 + brightness / 12);
  const lampOpacity = 0.15 + alpha * 0.85;
  const glowOpacity = brightness > 0 ? 0.2 + alpha * 0.5 : 0;

  const lamps = [{ left: "22%" }, { left: "50%", center: true }, { left: "78%" }];
  const motes = [
    { left: "22%", delay: 0,   dur: 8,   alt: false },
    { left: "26%", delay: 2.4, dur: 9,   alt: true  },
    { left: "50%", delay: 1.2, dur: 7,   alt: false },
    { left: "52%", delay: 4,   dur: 10,  alt: true  },
    { left: "78%", delay: 0.8, dur: 8.5, alt: false },
    { left: "76%", delay: 3.5, dur: 9.5, alt: true  },
  ];

  return (
    <>
      <style>{`
        @keyframes ss-pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,187,240,0.5); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(14,187,240,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,187,240,0); }
        }
        @keyframes ss-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes ss-breathe {
          0%,100% { opacity: 0.55; transform: translateX(-50%) scale(1); }
          50%     { opacity: 1;    transform: translateX(-50%) scale(1.08); }
        }
        @keyframes ss-mote {
          0%   { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          10%  { opacity: 0.9; }
          80%  { opacity: 0.7; }
          100% { transform: translate3d(8px,-120px,0) scale(0.4); opacity: 0; }
        }
        @keyframes ss-mote-alt {
          0%   { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          15%  { opacity: 0.8; }
          85%  { opacity: 0.5; }
          100% { transform: translate3d(-12px,-160px,0) scale(0.3); opacity: 0; }
        }
        @keyframes ss-live-dot {
          0%,100% { opacity: 1;   transform: scale(1); }
          50%     { opacity: 0.3; transform: scale(1.3); }
        }

        .ss-scene-btn {
          padding: 10px 8px; border-radius: 8px;
          border: 1px solid rgba(5,13,26,0.06);
          background: var(--paper);
          font-family: 'Exo 2', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
          text-align: center; display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          box-shadow: 0 1px 2px rgba(5,13,26,0.04);
        }
        .ss-scene-btn:hover { border-color: rgba(14,187,240,0.40); color: var(--azure-deep); background: rgba(14,187,240,0.06); }
        .ss-scene-btn.active { background: rgba(14,187,240,0.10); border-color: var(--azure); color: var(--azure-deep); box-shadow: 0 4px 14px rgba(14,187,240,0.20); }

        .ss-mic-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(14,187,240,0.30);
          background: var(--paper); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s ease;
          color: var(--azure-deep);
        }
        .ss-mic-btn:hover { border-color: var(--azure); background: rgba(14,187,240,0.08); }
        .ss-mic-btn.listening {
          background: var(--azure); border-color: var(--azure-light);
          color: #FFFFFF; animation: ss-pulse-ring 1.5s ease infinite;
        }

        input[type=range].ss-range {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 4px;
          background: rgba(14,187,240,0.18); border-radius: 2px;
          outline: none; margin: 8px 0 4px;
        }
        input[type=range].ss-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--azure); cursor: pointer;
          box-shadow: 0 2px 6px rgba(14,187,240,0.45);
          transition: box-shadow 0.2s ease;
        }
        input[type=range].ss-range::-webkit-slider-thumb:hover { box-shadow: 0 4px 14px rgba(14,187,240,0.7); }
        input[type=range].ss-range::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--azure); cursor: pointer; border: none;
          box-shadow: 0 2px 6px rgba(14,187,240,0.45);
        }

        .ss-ctrl-card {
          background: var(--paper);
          border: 1px solid rgba(5,13,26,0.06);
          border-radius: 12px; padding: 16px 18px;
          transition: border-color 0.3s ease;
          box-shadow: 0 2px 8px rgba(5,13,26,0.06);
        }
        .ss-ctrl-card:hover { border-color: rgba(14,187,240,0.22); }

        .ss-feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
        .ss-feat-card {
          background: var(--paper);
          border: 1px solid rgba(5,13,26,0.06);
          border-radius: 14px; padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(5,13,26,0.06);
        }
        .ss-feat-card:hover {
          border-color: rgba(14,187,240,0.35);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(5,13,26,0.10), 0 0 24px rgba(14,187,240,0.14);
        }

        .ss-scan-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(14,187,240,0.5), transparent);
          animation: ss-scan 4s linear infinite; pointer-events: none;
        }

        .ss-cmd-chip {
          font-size: 10px; padding: 4px 10px; border-radius: 999px;
          background: var(--paper); border: 1px solid rgba(14,187,240,0.22);
          color: var(--text-muted);
          font-family: 'Exo 2', sans-serif; font-weight: 500;
          letter-spacing: 0.04em; white-space: nowrap; cursor: default;
          transition: all 0.15s ease;
        }
        .ss-cmd-chip:hover { background: rgba(14,187,240,0.08); color: var(--azure-deep); border-color: var(--azure); }

        @media (max-width: 760px) { .ss-demo-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
        <Navbar scrolled={scrolled} />

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section style={{
          position: "relative",
          paddingTop: "clamp(80px, 14vw, 140px)",
          paddingBottom: "clamp(40px, 8vw, 80px)",
          paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
          paddingRight: "clamp(1.25rem, 6vw, 5rem)",
          overflow: "hidden",
          background: "linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 60% 30%, rgba(14,187,240,0.16) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(8,128,184,0.08) 0%, transparent 60%)",
            mixBlendMode: "multiply", pointerEvents: "none",
          }} />
          <div style={{ maxWidth: "900px", position: "relative" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ SMART SOLUTIONS ◆</p>
            <h1 style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900, lineHeight: 1.05, marginBottom: "1.25rem",
              color: "var(--text)", letterSpacing: "-0.02em",
            }}>
              Intelligent Lighting,{" "}
              <span className="azure-text">Voice Controlled</span>
            </h1>
            <p style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "var(--text-muted)",
              maxWidth: "580px", lineHeight: 1.7, marginBottom: "2rem",
              fontStyle: "italic",
            }}>
              Landlite Smart Solutions let you set the perfect mood with a single
              voice command. Transform any room — instantly.
            </p>
          </div>
        </section>

        {/* ── Interactive Demo ───────────────────────────────────────── */}
        <section style={{
          paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
          paddingRight: "clamp(1.25rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 8vw, 6rem)",
          background: "var(--paper)",
        }}>
          <DemoHeader title="Live Demo" badge="Interactive" />

          <div className="ss-demo-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 280px",
            gap: "1.25rem", alignItems: "start",
          }}>

            {/* ── Left: room + voice + chips ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Room scene card */}
              <div style={{
                background: "var(--paper)",
                border: "1px solid rgba(5,13,26,0.06)",
                borderRadius: "14px", overflow: "hidden",
                boxShadow: "0 6px 20px rgba(5,13,26,0.08)",
              }}>
                <div style={{
                  width: "100%",
                  height: "clamp(240px, 32vw, 340px)",
                  position: "relative", overflow: "hidden",
                  background: "#0a0a0a",
                }}>
                  {/* Base photo — recolored by scene filter */}
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url(${ROOM_PHOTO})`,
                    backgroundSize: "cover", backgroundPosition: "center 40%",
                    filter: roomFilter,
                    transition: "filter 0.9s ease",
                  }} />

                  {/* Mood tint */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: roomTint, mixBlendMode: "soft-light",
                    transition: "background 0.9s ease", pointerEvents: "none",
                  }} />

                  {/* Lamp cluster — cones + halos */}
                  {lamps.map((pos, i) => (
                    <>
                      {/* Light cone */}
                      {brightness > 0 && (
                        <div key={`cone-${i}`} style={{
                          position: "absolute", top: 0,
                          left: pos.left, transform: "translateX(-50%)",
                          width: `${80 + brightness * 0.8}px`,
                          height: `${100 + brightness * 1.3}px`,
                          background: `radial-gradient(ellipse 60% 95% at 50% 0%, ${lampColor}${Math.round(glowOpacity * 130).toString(16).padStart(2, "0")} 0%, transparent 75%)`,
                          filter: "blur(2px)",
                          transition: "all 0.7s ease", pointerEvents: "none",
                        }} />
                      )}
                      {/* Lamp glow */}
                      <div key={`lamp-${i}`} style={{
                        position: "absolute", top: "10px",
                        left: pos.left, transform: "translateX(-50%)",
                        width: `${lampSize}px`, height: `${lampSize}px`,
                        borderRadius: "50%", background: lampColor,
                        opacity: lampOpacity, transition: "all 0.5s ease",
                        boxShadow: brightness > 0
                          ? `0 0 ${Math.round(14 + brightness * 0.5)}px ${lampColor}, 0 0 ${Math.round(28 + brightness)}px ${lampColor}55`
                          : "none",
                        animation: brightness > 0
                          ? `ss-breathe ${3 + i * 0.3}s ease-in-out ${i * 0.5}s infinite`
                          : "none",
                      }} />
                    </>
                  ))}

                  {/* Dust motes */}
                  {brightness > 5 && motes.map((m, i) => (
                    <div key={`mote-${i}`} style={{
                      position: "absolute", top: "60%", left: m.left,
                      width: "3px", height: "3px", borderRadius: "50%",
                      background: lampColor, opacity: 0,
                      boxShadow: `0 0 6px ${lampColor}`,
                      animation: `ss-mote${m.alt ? "-alt" : ""} ${m.dur}s ease-in-out ${m.delay}s infinite`,
                      pointerEvents: "none",
                    }} />
                  ))}

                  {/* Scan line */}
                  <div className="ss-scan-line" />

                  {/* Live HUD chip */}
                  <div style={{
                    position: "absolute", top: "10px", right: "12px",
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "6px 10px", borderRadius: "999px",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#FFFFFF", textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  }}>
                    <span style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: "#4DD9FF", boxShadow: "0 0 6px #4DD9FF",
                      animation: "ss-live-dot 1.4s ease-in-out infinite",
                    }} />
                    <span>Live</span>
                    <span style={{ opacity: 0.55, fontWeight: 500, letterSpacing: "0.08em" }}>
                      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>

                {/* Status bar */}
                <div style={{
                  padding: "10px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: "1px solid rgba(5,13,26,0.06)",
                  background: "var(--frost)",
                }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontFamily: "'Exo 2', sans-serif", fontSize: "11px",
                    fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "var(--azure-deep)",
                  }}>
                    {currentScene === "custom"
                      ? "Custom"
                      : scenes[currentScene]
                        ? (<><SceneIcon name={scenes[currentScene].icon} size={14} />{scenes[currentScene].label}</>)
                        : "—"}
                  </span>
                  {feedback && (
                    <span style={{
                      fontSize: "11px", fontWeight: 600,
                      color: feedback.type === "ok" ? "var(--azure-deep)" : "#C0392B",
                      fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.04em",
                    }}>{feedback.msg}</span>
                  )}
                </div>
              </div>

              {/* Voice bar */}
              <div style={{
                background: "var(--paper)",
                border: `1px solid ${isListening ? "var(--azure)" : "rgba(5,13,26,0.06)"}`,
                borderRadius: "14px", padding: "12px 16px",
                display: "flex", alignItems: "center", gap: "12px",
                transition: "border-color 0.3s ease",
                boxShadow: "0 2px 8px rgba(5,13,26,0.06)",
              }}>
                <button
                  className={`ss-mic-btn${isListening ? " listening" : ""}`}
                  onClick={toggleVoice}
                  title="Click to speak"
                >
                  <SceneIcon name="mic" size={18} />
                </button>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: "10px",
                    fontFamily: "'Exo 2', sans-serif", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: isListening ? "var(--azure-deep)" : "var(--text-muted)",
                    marginBottom: "2px",
                  }}>
                    {isListening ? "Listening" : "Voice Control"}
                  </p>
                  <p style={{
                    fontSize: "12px",
                    color: transcript ? "var(--text)" : "var(--text-muted)",
                  }}>
                    {transcript || "Click mic and say a command…"}
                  </p>
                </div>
              </div>

              {/* Command chips */}
              <div style={{
                background: "var(--frost)",
                border: "1px solid rgba(5,13,26,0.06)",
                borderRadius: "12px", padding: "12px 14px",
              }}>
                <p style={{
                  fontFamily: "'Exo 2', sans-serif", fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-muted)", marginBottom: "8px",
                }}>Try saying</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {VOICE_COMMANDS.map((cmd) => (
                    <span key={cmd} className="ss-cmd-chip">{cmd}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: scene presets + sliders ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="ss-ctrl-card">
                <p style={{
                  fontFamily: "'Exo 2', sans-serif", fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-muted)", marginBottom: "10px",
                }}>Scene Presets</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  {Object.entries(scenes)
                    .filter(([key]) => key !== "off")
                    .map(([key, s]) => (
                      <button
                        key={key}
                        className={`ss-scene-btn${currentScene === key ? " active" : ""}`}
                        onClick={() => applyScene(key, true)}
                      >
                        <SceneIcon name={s.icon} size={18}
                          color={currentScene === key ? "var(--azure)" : "var(--azure-deep)"} />
                        <span>{s.label}</span>
                      </button>
                    ))}
                </div>
                <button
                  className={`ss-scene-btn${currentScene === "off" ? " active" : ""}`}
                  style={{ width: "100%", marginTop: "6px", flexDirection: "row", justifyContent: "center", gap: "8px" }}
                  onClick={() => applyScene("off", true)}
                >
                  <SceneIcon name="circle" size={14} />
                  <span>Lights Off</span>
                </button>
              </div>

              <div className="ss-ctrl-card">
                <p style={{
                  fontFamily: "'Exo 2', sans-serif", fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-muted)", marginBottom: "6px",
                }}>Brightness</p>
                <input type="range" className="ss-range"
                  min={5} max={100} step={1} value={brightness}
                  onChange={(e) => handleManualUpdate(parseInt(e.target.value), colorTemp)} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "'Exo 2', sans-serif" }}>Dim</span>
                  <span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--azure-deep)" }}>{brightness}%</span>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "'Exo 2', sans-serif" }}>Full</span>
                </div>
              </div>

              <div className="ss-ctrl-card">
                <p style={{
                  fontFamily: "'Exo 2', sans-serif", fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-muted)", marginBottom: "6px",
                }}>Color Temp</p>
                <input type="range" className="ss-range"
                  min={2700} max={6500} step={100} value={colorTemp}
                  onChange={(e) => handleManualUpdate(brightness, parseInt(e.target.value))} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "'Exo 2', sans-serif" }}>Warm</span>
                  <span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--azure-deep)" }}>{colorTemp}K</span>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "'Exo 2', sans-serif" }}>Cool</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Smart Features ─────────────────────────────────────────── */}
        <section style={{
          paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
          paddingRight: "clamp(1.25rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 8vw, 6rem)",
          background: "var(--frost)",
        }}>
          <DemoHeader title="Smart Features" />
          <div className="ss-feat-grid">
            {[
              { icon: "voice",     title: "Voice Control",    desc: "Hands-free lighting adjustments — just say the word. Compatible with natural language commands." },
              { icon: "app",       title: "App Integration",  desc: "Control your entire lighting ecosystem from your smartphone, anywhere in the world." },
              { icon: "circadian", title: "Circadian Scenes", desc: "Pre-built presets that sync with your body clock — from energizing mornings to relaxing evenings." },
              { icon: "schedule",  title: "Scheduling",       desc: "Automate your lights to turn on, dim, or shift color temperature based on time or routine." },
              { icon: "energy",    title: "Energy Efficient", desc: "Smart dimming and occupancy sensing reduce energy consumption without sacrificing comfort." },
              { icon: "zones",     title: "Room Zones",       desc: "Independently control multiple rooms and zones — living room, bedroom, kitchen, and more." },
            ].map((f) => (
              <div key={f.title} className="ss-feat-card">
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: "rgba(14,187,240,0.10)",
                  border: "1px solid rgba(14,187,240,0.30)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--azure-deep)", marginBottom: "1rem",
                }}>
                  <FeatIcon name={f.icon} size={22} />
                </div>
                <h3 style={{
                  fontFamily: "'Exo 2', sans-serif", fontSize: "0.95rem", fontWeight: 700,
                  color: "var(--text)", marginBottom: "0.5rem", letterSpacing: "0.02em",
                }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <section style={{
          paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
          paddingRight: "clamp(1.25rem, 6vw, 5rem)",
          paddingBottom: "clamp(4rem, 10vw, 7rem)",
          background: "var(--paper)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(14,187,240,0.10) 0%, rgba(8,128,184,0.06) 100%)",
            border: "1px solid rgba(14,187,240,0.22)",
            borderRadius: "20px",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "-60px", left: "50%",
              transform: "translateX(-50%)",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(14,187,240,0.18) 0%, transparent 70%)",
              mixBlendMode: "multiply", pointerEvents: "none",
            }} />
            <h2 style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              fontWeight: 900, marginBottom: "0.75rem",
              color: "var(--text)", letterSpacing: "-0.02em", position: "relative",
            }}>
              Ready to <span className="azure-text">Illuminate Smarter?</span>
            </h2>
            <p style={{
              fontSize: "0.95rem", color: "var(--text-muted)",
              margin: "0 auto 1.75rem", maxWidth: "480px",
              lineHeight: 1.7, fontStyle: "italic", position: "relative",
            }}>
              Visit any of our 170+ retail outlets nationwide or shop online to
              bring Landlite Smart Solutions into your home.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <a
                href="https://landlitephilcorp.com/collections/all"
                target="_blank" rel="noopener noreferrer"
                className="azure-btn"
                style={{ padding: "0.8rem 2rem", borderRadius: "6px", fontSize: "0.82rem", textDecoration: "none", display: "inline-block" }}
              >
                SHOP SMART LIGHTS
              </a>
              <a
                href="/outlets"
                className="outline-btn"
                style={{ padding: "0.8rem 2rem", borderRadius: "6px", fontSize: "0.82rem", textDecoration: "none", display: "inline-block" }}
              >
                FIND AN OUTLET
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer note ────────────────────────────────────────────── */}
        <div style={{
          borderTop: "1px solid rgba(5,13,26,0.08)",
          padding: "1.5rem clamp(1.25rem, 6vw, 5rem)",
          textAlign: "center", fontSize: "11px",
          color: "rgba(5,13,26,0.30)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em",
        }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation · Smart Solutions
        </div>
      </main>
    </>
  );
}
