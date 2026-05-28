"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function CIcon({ name, size = 26 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "lightbulb": return <svg {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
    case "circle": return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>;
    case "tube": return <svg {...p}><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="6" y1="12" x2="18" y2="12"/></svg>;
    case "sun": return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/></svg>;
    case "panel": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 12h18"/><path d="M12 5v14"/></svg>;
    case "track": return <svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><path d="M7 6v3l-2 2"/><path d="M13 6v3l2 2"/></svg>;
    case "switch": return <svg {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="9" r="1.5" fill="currentColor"/><rect x="9" y="13" width="6" height="5" rx="1"/></svg>;
    case "socket": return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9.5" cy="12" r="1.2"/><circle cx="14.5" cy="12" r="1.2"/><path d="M11 16h2"/></svg>;
    case "usb": return <svg {...p}><path d="M12 4v14"/><circle cx="12" cy="3" r="1.5"/><path d="M8 10l4-4 4 4"/><path d="M9 14l3 3 3-3"/></svg>;
    case "dimmer": return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="M12 6v6l4 2"/><path d="M12 2v2"/></svg>;
    case "plate": return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>;
    case "breaker": return <svg {...p}><rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M12 6v5"/><rect x="9" y="11" width="6" height="4" rx="1"/></svg>;
    case "chandelier": return <svg {...p}><path d="M12 3v4"/><path d="M5 11c0-2 3-4 7-4s7 2 7 4"/><path d="M5 11l-1 4"/><path d="M19 11l1 4"/><path d="M9 11l-1 6"/><path d="M15 11l1 6"/><path d="M12 11v6"/><circle cx="4" cy="17" r="1.4"/><circle cx="8" cy="19" r="1.4"/><circle cx="12" cy="19" r="1.4"/><circle cx="16" cy="19" r="1.4"/><circle cx="20" cy="17" r="1.4"/></svg>;
    case "pendant": return <svg {...p}><path d="M12 2v6"/><path d="M7 14c0-3 2-6 5-6s5 3 5 6"/><path d="M6 14h12"/><path d="M9 14v4"/><path d="M15 14v4"/><path d="M9 18h6"/></svg>;
    case "sconce": return <svg {...p}><path d="M4 4v16"/><path d="M4 8h6"/><path d="M14 12h4"/></svg>;
    case "floor-lamp": return <svg {...p}><path d="M8 4l8 0l-2 6h-4z"/><path d="M12 10v10"/><path d="M8 20h8"/></svg>;
    case "table-lamp": return <svg {...p}><path d="M7 8l5-4 5 4-2 5H9z"/><path d="M12 13v6"/><path d="M9 19h6"/></svg>;
    case "strip": return <svg {...p}><rect x="2" y="10" width="20" height="4" rx="1"/><circle cx="6" cy="12" r="0.7" fill="currentColor"/><circle cx="10" cy="12" r="0.7" fill="currentColor"/><circle cx="14" cy="12" r="0.7" fill="currentColor"/><circle cx="18" cy="12" r="0.7" fill="currentColor"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

export default function VoiceControlPage() {
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar scrolled={scrolled} />

      {/* ── Hero / breadcrumb ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(80px,14vw,130px)", paddingBottom: "clamp(3rem,6vw,5rem)",
        paddingLeft: "clamp(1.25rem,6vw,5rem)", paddingRight: "clamp(1.25rem,6vw,5rem)",
        background: "linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(14,187,240,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.05) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--text-muted-2)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" as const }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#0880B8" }}>›</span>
            <Link href="/products" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Products</Link>
            <span style={{ color: "#0880B8" }}>›</span>
            <Link href="/products/smart-solutions" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Smart Solutions</Link>
            <span style={{ color: "#0880B8" }}>›</span>
            <span style={{ color: "var(--azure-deep)", fontWeight: 600 }}>Voice Control</span>
          </nav>

          {/* Title block */}
          <div className="animate-fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem", flexWrap: "wrap" as const }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "#0880B818", border: "1px solid #0880B855", display: "flex", alignItems: "center", justifyContent: "center", color: "#0880B8", flexShrink: 0, boxShadow: "0 4px 14px #0880B825" }}>
                <CIcon name="track" size={28} />
              </div>
              <div>
                <p className="section-label" style={{ marginBottom: "0.4rem", color: "#0880B8" }}>◆ SMART SOLUTIONS ◆</p>
                <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>Voice Control</h1>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "780px", fontStyle: "italic" }}>
              Hands-free control via Alexa, Google Home, and Siri Shortcuts. Trigger scenes, dim, change color temperature, or turn rooms off with a single phrase.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sample Range ── */}
      <section style={{ padding: "5rem clamp(1.25rem,6vw,5rem) 6rem", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" as const }}>
            <div style={{ width: "3px", height: "26px", borderRadius: "2px", background: "linear-gradient(180deg, #0880B8, var(--azure-deep))" }} />
            <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--azure-deep)" }}>Sample Range</h2>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text-muted-2)", fontStyle: "italic" }}>
              · a representative slice — full catalog at landlitephilcorp.com
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
            {/* Alexa Integration */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", display: "flex", flexDirection: "column" as const, gap: "0.75rem", animationDelay: "0.0s" }}>
              {/* Placeholder image */}
              <div style={{ width: "100%", height: "140px", borderRadius: "8px", background: `linear-gradient(135deg, #0880B812, #0880B82A 50%, #0880B812)`, border: `1px solid #0880B830`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 30%, #0880B855 0%, transparent 60%)`, opacity: 0.65 }} />
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "3rem", letterSpacing: "-0.04em", color: "#0880B8", opacity: 0.4, position: "relative" }}>01</span>
              </div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.2em", color: "#0880B8", textTransform: "uppercase" as const }}>Echo · Skill · 100+ commands</p>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Alexa Integration</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Native Alexa skill — "Alexa, set living room to movie night" works out of the box after a 30-second setup.</p>
              <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#0880B8", letterSpacing: "0.2em", textDecoration: "none" }}>SPEC SHEET →</a>
            </div>
            {/* Google Home Integration */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", display: "flex", flexDirection: "column" as const, gap: "0.75rem", animationDelay: "0.08s" }}>
              {/* Placeholder image */}
              <div style={{ width: "100%", height: "140px", borderRadius: "8px", background: `linear-gradient(135deg, #0880B812, #0880B82A 50%, #0880B812)`, border: `1px solid #0880B830`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 30%, #0880B855 0%, transparent 60%)`, opacity: 0.65 }} />
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "3rem", letterSpacing: "-0.04em", color: "#0880B8", opacity: 0.4, position: "relative" }}>02</span>
              </div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.2em", color: "#0880B8", textTransform: "uppercase" as const }}>Assistant · Routines · Nest</p>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Google Home Integration</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Google Assistant routines triggered by voice or by Nest detected presence. Schedule by sunrise/sunset.</p>
              <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#0880B8", letterSpacing: "0.2em", textDecoration: "none" }}>SPEC SHEET →</a>
            </div>
            {/* Apple Siri Shortcuts */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", display: "flex", flexDirection: "column" as const, gap: "0.75rem", animationDelay: "0.16s" }}>
              {/* Placeholder image */}
              <div style={{ width: "100%", height: "140px", borderRadius: "8px", background: `linear-gradient(135deg, #0880B812, #0880B82A 50%, #0880B812)`, border: `1px solid #0880B830`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 30%, #0880B855 0%, transparent 60%)`, opacity: 0.65 }} />
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "3rem", letterSpacing: "-0.04em", color: "#0880B8", opacity: 0.4, position: "relative" }}>03</span>
              </div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.2em", color: "#0880B8", textTransform: "uppercase" as const }}>iOS 14+ · HomeKit-compatible</p>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Apple Siri Shortcuts</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Siri shortcuts for scene recall and dimming. Works on Apple Watch, AirPods, and HomePod.</p>
              <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#0880B8", letterSpacing: "0.2em", textDecoration: "none" }}>SPEC SHEET →</a>
            </div>
          </div>

          {/* Shop CTA */}
          <div ref={addRef} className="reveal" style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center" }}>
            <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
              className="azure-btn" style={{ padding: "0.85rem 2rem", borderRadius: "6px", fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              VIEW FULL CATALOG →
            </a>
          </div>
        </div>
      </section>

      {/* ── More in pillar ── */}
      <section style={{ padding: "4rem clamp(1.25rem,6vw,5rem) 5rem", background: "var(--frost)", borderTop: "1px solid rgba(5,13,26,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3px", height: "26px", borderRadius: "2px", background: "linear-gradient(180deg, #0880B8, var(--azure-deep))" }} />
            <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--azure-deep)" }}>More in Smart Solutions</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "0.75rem" }}>
              <Link key="smart-bulbs" href="/products/smart-solutions/smart-bulbs"
                style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", borderRadius: "8px", textDecoration: "none", boxShadow: "0 1px 3px rgba(5,13,26,0.04)", transition: "all 0.25s ease" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(14,187,240,0.40)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(5,13,26,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(5,13,26,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(5,13,26,0.04)"; }}>
                <span style={{ color: "#0880B8", display: "flex", alignItems: "center" }}><CIcon name="lightbulb" size={18} /></span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Smart Bulbs</span>
                <span style={{ marginLeft: "auto", color: "#0880B8", fontSize: "0.7rem" }}>→</span>
              </Link>
              <Link key="smart-switches" href="/products/smart-solutions/smart-switches"
                style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", borderRadius: "8px", textDecoration: "none", boxShadow: "0 1px 3px rgba(5,13,26,0.04)", transition: "all 0.25s ease" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(14,187,240,0.40)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(5,13,26,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(5,13,26,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(5,13,26,0.04)"; }}>
                <span style={{ color: "#0880B8", display: "flex", alignItems: "center" }}><CIcon name="switch" size={18} /></span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Smart Switches</span>
                <span style={{ marginLeft: "auto", color: "#0880B8", fontSize: "0.7rem" }}>→</span>
              </Link>
              <Link key="smart-dimmers" href="/products/smart-solutions/smart-dimmers"
                style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", borderRadius: "8px", textDecoration: "none", boxShadow: "0 1px 3px rgba(5,13,26,0.04)", transition: "all 0.25s ease" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(14,187,240,0.40)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(5,13,26,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(5,13,26,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(5,13,26,0.04)"; }}>
                <span style={{ color: "#0880B8", display: "flex", alignItems: "center" }}><CIcon name="dimmer" size={18} /></span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Smart Dimmers</span>
                <span style={{ marginLeft: "auto", color: "#0880B8", fontSize: "0.7rem" }}>→</span>
              </Link>
              <Link key="smart-sensors" href="/products/smart-solutions/smart-sensors"
                style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", borderRadius: "8px", textDecoration: "none", boxShadow: "0 1px 3px rgba(5,13,26,0.04)", transition: "all 0.25s ease" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(14,187,240,0.40)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(5,13,26,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(5,13,26,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(5,13,26,0.04)"; }}>
                <span style={{ color: "#0880B8", display: "flex", alignItems: "center" }}><CIcon name="circle" size={18} /></span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Smart Sensors</span>
                <span style={{ marginLeft: "auto", color: "#0880B8", fontSize: "0.7rem" }}>→</span>
              </Link>
              <Link key="smart-hub" href="/products/smart-solutions/smart-hub"
                style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.85rem 1rem", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", borderRadius: "8px", textDecoration: "none", boxShadow: "0 1px 3px rgba(5,13,26,0.04)", transition: "all 0.25s ease" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(14,187,240,0.40)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(5,13,26,0.08)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(5,13,26,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(5,13,26,0.04)"; }}>
                <span style={{ color: "#0880B8", display: "flex", alignItems: "center" }}><CIcon name="panel" size={18} /></span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Smart Hub</span>
                <span style={{ marginLeft: "auto", color: "#0880B8", fontSize: "0.7rem" }}>→</span>
              </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(5,13,26,0.08)", padding: "2rem", background: "var(--ink)", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(176,220,255,0.35)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
