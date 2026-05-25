"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";

// ── Scene definitions ──────────────────────────────────────────────────────────
const scenes: Record<
  string,
  { bg: string; lamp: string; b: number; t: number; label: string; desc: string; icon: string }
> = {
  relax: {
    bg: "#0d0820",
    lamp: "#ffb347",
    b: 45,
    t: 2900,
    label: "Relax",
    desc: "Warm amber glow for winding down",
    icon: "🌙",
  },
  focus: {
    bg: "#0a1020",
    lamp: "#c8e8ff",
    b: 85,
    t: 5000,
    label: "Focus",
    desc: "Cool white for productivity",
    icon: "🎯",
  },
  movie: {
    bg: "#080808",
    lamp: "#ff6633",
    b: 15,
    t: 2700,
    label: "Movie",
    desc: "Dim orange bias for cinema feel",
    icon: "🎬",
  },
  energize: {
    bg: "#0a1a10",
    lamp: "#e8ffe8",
    b: 100,
    t: 6000,
    label: "Energize",
    desc: "Crisp daylight for full energy",
    icon: "⚡",
  },
  romantic: {
    bg: "#150408",
    lamp: "#ff4466",
    b: 25,
    t: 2700,
    label: "Romantic",
    desc: "Deep rose warmth for intimacy",
    icon: "❤️",
  },
  morning: {
    bg: "#0e1020",
    lamp: "#fff5cc",
    b: 70,
    t: 3500,
    label: "Morning",
    desc: "Gentle sunrise tones to start the day",
    icon: "🌅",
  },
  off: {
    bg: "#050505",
    lamp: "#1a1a1a",
    b: 0,
    t: 2700,
    label: "Lights off",
    desc: "All lights off",
    icon: "○",
  },
};

function tempToColor(k: number): string {
  if (k <= 2800) return "#ffaa44";
  if (k <= 3200) return "#ffcc66";
  if (k <= 4000) return "#ffe8aa";
  if (k <= 5000) return "#f0f0ff";
  return "#cce8ff";
}

// Voice commands mapped to scenes/actions
const VOICE_COMMANDS = [
  '"movie night"',
  '"set romantic"',
  '"focus mode"',
  '"good morning"',
  '"energize"',
  '"brighter"',
  '"dimmer"',
  '"warmer"',
  '"cooler"',
  '"lights off"',
];

export default function SmartSolutionsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [currentScene, setCurrentScene] = useState("relax");
  const [brightness, setBrightness] = useState(45);
  const [colorTemp, setColorTemp] = useState(2900);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [lampColor, setLampColor] = useState("#ffb347");
  const [roomBg, setRoomBg] = useState("#0d0820");
  const [revealed, setRevealed] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on load
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Apply initial scene
  useEffect(() => {
    applyScene("relax", false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFeedback = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setFeedback({ msg, type });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2500);
  }, []);

  const applyScene = useCallback(
    (name: string, withFeedback = false) => {
      const s = scenes[name];
      if (!s) return;
      setCurrentScene(name);
      setBrightness(s.b);
      setColorTemp(s.t);
      setLampColor(s.lamp);
      setRoomBg(s.bg);
      if (withFeedback) showFeedback(`${s.icon} ${s.label} set`);
    },
    [showFeedback]
  );

  const handleManualUpdate = useCallback(
    (newB?: number, newT?: number) => {
      const b = newB ?? brightness;
      const t = newT ?? colorTemp;
      setBrightness(b);
      setColorTemp(t);
      setLampColor(tempToColor(t));
      setCurrentScene("custom");
    },
    [brightness, colorTemp]
  );

  const processVoice = useCallback(
    (text: string) => {
      const t = text.toLowerCase();
      if (t.includes("movie") || t.includes("cinema")) { applyScene("movie", true); return; }
      if (t.includes("romantic") || t.includes("romance")) { applyScene("romantic", true); return; }
      if (t.includes("focus") || t.includes("work") || t.includes("study")) { applyScene("focus", true); return; }
      if (t.includes("energize") || t.includes("energy") || t.includes("wake up")) { applyScene("energize", true); return; }
      if (t.includes("morning") || t.includes("good morning") || t.includes("wake")) { applyScene("morning", true); return; }
      if (t.includes("relax") || t.includes("chill")) { applyScene("relax", true); return; }
      if (t.includes("off") || t.includes("lights off") || t.includes("turn off")) { applyScene("off", true); return; }

      if (t.includes("brighter") || t.includes("more light") || t.includes("increase brightness")) {
        const nv = Math.min(100, brightness + 20);
        handleManualUpdate(nv, colorTemp);
        showFeedback(`☀️ Brighter — ${nv}%`);
        return;
      }
      if (t.includes("dimmer") || t.includes("dim") || t.includes("less light")) {
        const nv = Math.max(5, brightness - 20);
        handleManualUpdate(nv, colorTemp);
        showFeedback(`🌑 Dimmer — ${nv}%`);
        return;
      }
      if (t.includes("warmer") || t.includes("warm")) {
        const nv = Math.max(2700, colorTemp - 500);
        handleManualUpdate(brightness, nv);
        showFeedback(`🔆 Warmer — ${nv}K`);
        return;
      }
      if (t.includes("cooler") || t.includes("cool") || t.includes("blue")) {
        const nv = Math.min(6500, colorTemp + 500);
        handleManualUpdate(brightness, nv);
        showFeedback(`❄️ Cooler — ${nv}K`);
        return;
      }
      showFeedback('Try: "movie night", "brighter", "relax"', "err");
    },
    [brightness, colorTemp, applyScene, handleManualUpdate, showFeedback]
  );

  const toggleVoice = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SR) {
      setTranscript("Voice not supported in this browser.");
      showFeedback("Use Chrome or Edge", "err");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SR();
    recognitionRef.current = rec;
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-PH";
    rec.onstart = () => {
      setIsListening(true);
      setTranscript("Listening…");
    };
    rec.onresult = (e: any) => {
      const interim = Array.from(e.results)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join("");
      setTranscript(`"${interim}"`);
      if (e.results[e.results.length - 1].isFinal) processVoice(interim);
    };
    rec.onerror = () => {
      showFeedback("Could not hear — try again", "err");
      setTranscript("Click mic and say a command…");
      setIsListening(false);
    };
    rec.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        setTranscript((prev) =>
          prev.startsWith('"') ? prev : "Click mic and say a command…"
        );
      }, 3000);
    };
    rec.start();
  }, [isListening, processVoice, showFeedback]);

  // Derived lamp rendering values
  const alpha = Math.max(0, Math.min(1, brightness / 100));
  const lampSize = Math.round(9 + brightness / 12);
  const lampOpacity = 0.15 + alpha * 0.85;

  // Glow spread on the room ceiling
  const glowRadius = brightness > 0 ? Math.round(20 + brightness * 1.2) : 0;
  const glowOpacity = brightness > 0 ? 0.2 + alpha * 0.5 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,600;0,700;0,900;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        :root {
          --azure: #0EBBF0;
          --azure-light: #4DD9FF;
          --azure-pale: #B3EEFF;
          --azure-deep: #0880B8;
          --navy: #050D1A;
          --dark: #080F1C;
          --dark-mid: #0D1828;
          --dark-card: #0A1422;
          --white: #F0F8FF;
          --muted: rgba(176,220,255,0.6);
        }

        .ss-page { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,187,240,0.5); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(14,187,240,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,187,240,0); }
        }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float-glow {
          0%,100% { transform: translateY(0px); filter: drop-shadow(0 0 12px rgba(14,187,240,0.4)); }
          50%      { transform: translateY(-8px); filter: drop-shadow(0 0 24px rgba(14,187,240,0.8)); }
        }

        .azure-text {
          background: linear-gradient(90deg, var(--azure-deep), var(--azure), var(--azure-light), var(--azure-pale), var(--azure-light), var(--azure));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .azure-btn {
          background: linear-gradient(135deg, var(--azure-deep), var(--azure));
          color: var(--navy);
          font-family: 'Exo 2', sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .azure-btn:hover {
          background: linear-gradient(135deg, var(--azure), var(--azure-light));
          box-shadow: 0 6px 24px rgba(14,187,240,0.5);
          transform: translateY(-1px);
        }

        .nav-link {
          font-family: 'Exo 2', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,248,255,0.7);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: var(--azure); }

        /* ── Scene buttons ── */
        .scene-btn {
          padding: 10px 8px;
          border-radius: 8px;
          border: 1px solid rgba(14,187,240,0.15);
          background: rgba(14,187,240,0.04);
          font-family: 'Exo 2', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(176,220,255,0.7);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .scene-btn:hover {
          border-color: rgba(14,187,240,0.4);
          color: var(--azure-light);
          background: rgba(14,187,240,0.08);
        }
        .scene-btn.active {
          background: rgba(14,187,240,0.15);
          border-color: var(--azure);
          color: var(--azure-light);
          box-shadow: 0 0 12px rgba(14,187,240,0.25);
        }

        /* ── Mic button ── */
        .mic-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(14,187,240,0.3);
          background: rgba(14,187,240,0.06);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
          color: rgba(176,220,255,0.8);
        }
        .mic-btn:hover { border-color: var(--azure); background: rgba(14,187,240,0.12); }
        .mic-btn.listening {
          background: var(--azure);
          border-color: var(--azure-light);
          color: var(--navy);
          animation: pulse-ring 1.5s ease infinite;
        }

        /* ── Range slider ── */
        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(14,187,240,0.15);
          border-radius: 2px;
          outline: none;
          margin: 8px 0 4px;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--azure);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(14,187,240,0.6);
          transition: box-shadow 0.2s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 16px rgba(14,187,240,0.9);
        }

        /* ── Card ── */
        .ctrl-card {
          background: rgba(14,187,240,0.04);
          border: 1px solid rgba(14,187,240,0.12);
          border-radius: 12px;
          padding: 16px 18px;
          transition: border-color 0.3s ease;
        }
        .ctrl-card:hover { border-color: rgba(14,187,240,0.22); }

        /* ── Feature grid ── */
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }
        .feat-card {
          background: rgba(14,187,240,0.04);
          border: 1px solid rgba(14,187,240,0.12);
          border-radius: 14px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .feat-card:hover {
          border-color: rgba(14,187,240,0.35);
          background: rgba(14,187,240,0.08);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(14,187,240,0.12);
        }

        /* ── Scan line animation on room ── */
        .scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(14,187,240,0.3), transparent);
          animation: scanLine 4s linear infinite;
          pointer-events: none;
        }

        /* ── Chip ── */
        .cmd-chip {
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(14,187,240,0.06);
          border: 1px solid rgba(14,187,240,0.2);
          color: rgba(176,220,255,0.7);
          font-family: 'Exo 2', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
          white-space: nowrap;
          cursor: default;
          transition: all 0.15s ease;
        }
        .cmd-chip:hover { background: rgba(14,187,240,0.12); color: var(--azure-light); border-color: var(--azure); }

        @media (max-width: 640px) {
          .demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="ss-page">
        <Navbar scrolled={scrolled} />

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <div
          ref={heroRef}
          style={{
            position: "relative",
            paddingTop: "clamp(80px, 14vw, 140px)",
            paddingBottom: "clamp(40px, 8vw, 80px)",
            paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
            paddingRight: "clamp(1.25rem, 6vw, 5rem)",
            overflow: "hidden",
          }}
        >
          {/* Background mesh */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 60% at 60% 30%, rgba(14,187,240,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(8,128,184,0.05) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "900px",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(28px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <p
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--azure)",
                marginBottom: "0.75rem",
              }}
            >
              Smart Solutions
            </p>
            <h1
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: "1.25rem",
              }}
            >
              Intelligent Lighting,{" "}
              <span className="azure-text">Voice Controlled</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                color: "var(--muted)",
                maxWidth: "580px",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Landlite Smart Solutions let you set the perfect mood with a single
              voice command. Transform any room — instantly.
            </p>
          </div>
        </div>

        {/* ── Interactive Demo ──────────────────────────────────────────────── */}
        <section
          style={{
            paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
            paddingRight: "clamp(1.25rem, 6vw, 5rem)",
            paddingBottom: "clamp(3rem, 8vw, 6rem)",
          }}
        >
          <div
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "28px",
                borderRadius: "2px",
                background: "linear-gradient(180deg, var(--azure), var(--azure-deep))",
              }}
            />
            <h2
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--azure-light)",
              }}
            >
              Live Demo
            </h2>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "999px",
                background: "rgba(14,187,240,0.12)",
                border: "1px solid rgba(14,187,240,0.3)",
                color: "var(--azure)",
              }}
            >
              Interactive
            </span>
          </div>

          {/* Demo grid */}
          <div
            className="demo-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 280px",
              gap: "1.25rem",
              alignItems: "start",
            }}
          >
            {/* Left: room + voice */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Room scene */}
              <div
                style={{
                  background: "rgba(14,187,240,0.04)",
                  border: "1px solid rgba(14,187,240,0.15)",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                {/* Scene canvas */}
                <div
                  style={{
                    width: "100%",
                    height: "clamp(180px, 26vw, 260px)",
                    position: "relative",
                    background: roomBg,
                    transition: "background 0.7s ease",
                  }}
                >
                  {/* Architectural surfaces */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "18px",
                      background: "rgba(0,0,0,0.1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "16px",
                      bottom: 0,
                      background: "rgba(0,0,0,0.08)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "16px",
                      bottom: 0,
                      background: "rgba(0,0,0,0.08)",
                    }}
                  />

                  {/* Ceiling glow */}
                  {brightness > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: `${glowRadius}px`,
                        background: `radial-gradient(ellipse at 50% 0%, ${lampColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 100%)`,
                        transition: "all 0.6s ease",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* Light sources */}
                  {[
                    { id: "l1", left: "22%" },
                    { id: "l2", left: "calc(50% - " + Math.round(lampSize / 2) + "px)" },
                    { id: "l3", right: "22%" },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        top: "9px",
                        left: pos.left,
                        right: pos.right,
                        width: `${lampSize}px`,
                        height: `${lampSize}px`,
                        borderRadius: "50%",
                        background: lampColor,
                        opacity: lampOpacity,
                        transition: "all 0.5s ease",
                        boxShadow:
                          brightness > 0
                            ? `0 0 ${Math.round(10 + brightness * 0.4)}px ${lampColor}`
                            : "none",
                      }}
                    />
                  ))}

                  {/* Furniture */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "28px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "110px",
                      height: "38px",
                      background: "rgba(0,0,0,0.15)",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "28px",
                      right: "52px",
                      width: "30px",
                      height: "24px",
                      background: "rgba(0,0,0,0.1)",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "28px",
                      left: "52px",
                      width: "18px",
                      height: "30px",
                      background: "rgba(0,0,0,0.1)",
                      borderRadius: "50% 50% 20% 20%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "28px",
                      background: "rgba(0,0,0,0.12)",
                    }}
                  />

                  {/* Scan line */}
                  <div className="scan-line" />
                </div>

                {/* Status bar */}
                <div
                  style={{
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(14,187,240,0.1)",
                    background: "rgba(14,187,240,0.03)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--azure)",
                    }}
                  >
                    {currentScene === "custom"
                      ? "Custom"
                      : scenes[currentScene]
                      ? `${scenes[currentScene].icon} ${scenes[currentScene].label}`
                      : "—"}
                  </span>
                  {feedback && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: feedback.type === "ok" ? "#4DD9FF" : "#ff6b6b",
                        fontFamily: "'Exo 2', sans-serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {feedback.msg}
                    </span>
                  )}
                </div>
              </div>

              {/* Voice bar */}
              <div
                style={{
                  background: "rgba(14,187,240,0.04)",
                  border: `1px solid ${isListening ? "var(--azure)" : "rgba(14,187,240,0.15)"}`,
                  borderRadius: "14px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "border-color 0.3s ease",
                }}
              >
                <button className={`mic-btn${isListening ? " listening" : ""}`} onClick={toggleVoice} title="Click to speak">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="9" y="2" width="6" height="11" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="8" y1="22" x2="16" y2="22" />
                  </svg>
                </button>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "10px",
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isListening ? "var(--azure)" : "rgba(176,220,255,0.4)",
                      marginBottom: "2px",
                    }}
                  >
                    {isListening ? "Listening" : "Voice Control"}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: transcript
                        ? "var(--white)"
                        : "rgba(176,220,255,0.45)",
                    }}
                  >
                    {transcript || "Click mic and say a command…"}
                  </p>
                </div>
              </div>

              {/* Command chips */}
              <div
                style={{
                  background: "rgba(14,187,240,0.03)",
                  border: "1px solid rgba(14,187,240,0.08)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(176,220,255,0.4)",
                    marginBottom: "8px",
                  }}
                >
                  Try saying
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {VOICE_COMMANDS.map((cmd) => (
                    <span key={cmd} className="cmd-chip">{cmd}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Scene presets */}
              <div className="ctrl-card">
                <p
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(176,220,255,0.5)",
                    marginBottom: "10px",
                  }}
                >
                  Scene Presets
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  {Object.entries(scenes)
                    .filter(([key]) => key !== "off")
                    .map(([key, s]) => (
                      <button
                        key={key}
                        className={`scene-btn${currentScene === key ? " active" : ""}`}
                        onClick={() => applyScene(key, true)}
                      >
                        <span style={{ fontSize: "16px" }}>{s.icon}</span>
                        <span>{s.label}</span>
                      </button>
                    ))}
                </div>
                <button
                  className={`scene-btn${currentScene === "off" ? " active" : ""}`}
                  style={{ width: "100%", marginTop: "6px", flexDirection: "row", justifyContent: "center", gap: "8px" }}
                  onClick={() => applyScene("off", true)}
                >
                  <span>○</span>
                  <span>Lights Off</span>
                </button>
              </div>

              {/* Brightness */}
              <div className="ctrl-card">
                <p
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(176,220,255,0.5)",
                    marginBottom: "6px",
                  }}
                >
                  Brightness
                </p>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={brightness}
                  onChange={(e) => handleManualUpdate(parseInt(e.target.value), colorTemp)}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "rgba(176,220,255,0.4)", fontFamily: "'Exo 2', sans-serif" }}>Dim</span>
                  <span
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--azure-light)",
                    }}
                  >
                    {brightness}%
                  </span>
                  <span style={{ fontSize: "10px", color: "rgba(176,220,255,0.4)", fontFamily: "'Exo 2', sans-serif" }}>Full</span>
                </div>
              </div>

              {/* Color temp */}
              <div className="ctrl-card">
                <p
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(176,220,255,0.5)",
                    marginBottom: "6px",
                  }}
                >
                  Color Temp
                </p>
                <input
                  type="range"
                  min={2700}
                  max={6500}
                  step={100}
                  value={colorTemp}
                  onChange={(e) => handleManualUpdate(brightness, parseInt(e.target.value))}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "rgba(176,220,255,0.4)", fontFamily: "'Exo 2', sans-serif" }}>Warm</span>
                  <span
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--azure-light)",
                    }}
                  >
                    {colorTemp}K
                  </span>
                  <span style={{ fontSize: "10px", color: "rgba(176,220,255,0.4)", fontFamily: "'Exo 2', sans-serif" }}>Cool</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature highlights ────────────────────────────────────────────── */}
        <section
          style={{
            paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
            paddingRight: "clamp(1.25rem, 6vw, 5rem)",
            paddingBottom: "clamp(3rem, 8vw, 6rem)",
          }}
        >
          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "28px",
                borderRadius: "2px",
                background: "linear-gradient(180deg, var(--azure), var(--azure-deep))",
              }}
            />
            <h2
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--azure-light)",
              }}
            >
              Smart Features
            </h2>
          </div>
          <div className="feat-grid">
            {[
              {
                icon: "🎙️",
                title: "Voice Control",
                desc: "Hands-free lighting adjustments — just say the word. Compatible with natural language commands.",
              },
              {
                icon: "📱",
                title: "App Integration",
                desc: "Control your entire lighting ecosystem from your smartphone, anywhere in the world.",
              },
              {
                icon: "🌅",
                title: "Circadian Scenes",
                desc: "Pre-built presets that sync with your body clock — from energizing mornings to relaxing evenings.",
              },
              {
                icon: "🔄",
                title: "Scheduling",
                desc: "Automate your lights to turn on, dim, or shift color temperature based on time or routine.",
              },
              {
                icon: "⚡",
                title: "Energy Efficient",
                desc: "Smart dimming and occupancy sensing reduce energy consumption without sacrificing comfort.",
              },
              {
                icon: "🏠",
                title: "Room Zones",
                desc: "Independently control multiple rooms and zones — living room, bedroom, kitchen, and more.",
              },
            ].map((f) => (
              <div key={f.title} className="feat-card">
                <div style={{ fontSize: "28px", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--azure-light)",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            paddingLeft: "clamp(1.25rem, 6vw, 5rem)",
            paddingRight: "clamp(1.25rem, 6vw, 5rem)",
            paddingBottom: "clamp(4rem, 10vw, 7rem)",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(14,187,240,0.08) 0%, rgba(8,128,184,0.05) 100%)",
              border: "1px solid rgba(14,187,240,0.2)",
              borderRadius: "20px",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(14,187,240,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <h2
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                fontWeight: 900,
                marginBottom: "0.75rem",
              }}
            >
              Ready to{" "}
              <span className="azure-text">Illuminate Smarter?</span>
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--muted)",
                marginBottom: "1.75rem",
                maxWidth: "480px",
                margin: "0 auto 1.75rem",
                lineHeight: 1.7,
              }}
            >
              Visit any of our 170+ retail outlets nationwide or shop online to
              bring Landlite Smart Solutions into your home.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <a
                href="https://landlitephilcorp.com/collections/all"
                target="_blank"
                rel="noopener noreferrer"
                className="azure-btn"
                style={{
                  padding: "0.8rem 2rem",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Shop Smart Lights
              </a>
              <a
                href="/outlets"
                style={{
                  padding: "0.8rem 2rem",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--azure)",
                  textDecoration: "none",
                  border: "1px solid rgba(14,187,240,0.35)",
                  transition: "all 0.25s ease",
                  display: "inline-block",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(14,187,240,0.1)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                Find an Outlet
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer note ──────────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid rgba(14,187,240,0.1)",
            padding: "1.5rem clamp(1.25rem, 6vw, 5rem)",
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(176,220,255,0.3)",
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} Landlite Philippines Corporation · Smart Solutions
        </div>
      </div>
    </>
  );
}
