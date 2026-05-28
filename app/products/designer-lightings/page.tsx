"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function CIcon({ name, size = 22 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "lightbulb": return <svg {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
    case "circle": return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>;
    case "tube": return <svg {...p}><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="6" y1="12" x2="18" y2="12"/></svg>;
    case "sun": return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/></svg>;
    case "panel": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 12h18"/><path d="M12 5v14"/></svg>;
    case "track": return <svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><path d="M7 6v3l-2 2"/><path d="M13 6v3l2 2"/></svg>;
    case "wiring": return <svg {...p}><path d="M6 7v3"/><path d="M14 7v3"/><path d="M5 5h10v6a5 5 0 0 1-10 0z"/><path d="M10 16v3"/><path d="M7 22h6"/></svg>;
    case "switch": return <svg {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="9" r="1.5" fill="currentColor"/><rect x="9" y="13" width="6" height="5" rx="1"/></svg>;
    case "socket": return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9.5" cy="12" r="1.2"/><circle cx="14.5" cy="12" r="1.2"/><path d="M11 16h2"/></svg>;
    case "usb": return <svg {...p}><path d="M12 4v14"/><circle cx="12" cy="3" r="1.5"/><path d="M8 10l4-4 4 4"/><path d="M9 14l3 3 3-3"/></svg>;
    case "dimmer": return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="M12 6v6l4 2"/><path d="M12 2v2"/></svg>;
    case "plate": return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>;
    case "breaker": return <svg {...p}><rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M12 6v5"/><rect x="9" y="11" width="6" height="4" rx="1"/></svg>;
    case "designer": return <svg {...p}><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M5.6 18.4l2.1-2.1"/><path d="M16.3 7.7l2.1-2.1"/></svg>;
    case "chandelier": return <svg {...p}><path d="M12 3v4"/><path d="M5 11c0-2 3-4 7-4s7 2 7 4"/><path d="M5 11l-1 4"/><path d="M19 11l1 4"/><path d="M9 11l-1 6"/><path d="M15 11l1 6"/><path d="M12 11v6"/></svg>;
    case "pendant": return <svg {...p}><path d="M12 2v6"/><path d="M7 14c0-3 2-6 5-6s5 3 5 6"/><path d="M6 14h12"/><path d="M9 14v4"/><path d="M15 14v4"/><path d="M9 18h6"/></svg>;
    case "sconce": return <svg {...p}><path d="M4 4v16"/><path d="M4 8h6"/><path d="M14 12h4"/></svg>;
    case "floor-lamp": return <svg {...p}><path d="M8 4l8 0l-2 6h-4z"/><path d="M12 10v10"/><path d="M8 20h8"/></svg>;
    case "table-lamp": return <svg {...p}><path d="M7 8l5-4 5 4-2 5H9z"/><path d="M12 13v6"/><path d="M9 19h6"/></svg>;
    case "strip": return <svg {...p}><rect x="2" y="10" width="20" height="4" rx="1"/><circle cx="6" cy="12" r="0.7" fill="currentColor"/><circle cx="10" cy="12" r="0.7" fill="currentColor"/><circle cx="14" cy="12" r="0.7" fill="currentColor"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

export default function DesignerLightingsPage() {
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

      {/* ── Hero ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(80px,14vw,140px)", paddingBottom: "clamp(40px,8vw,72px)",
        paddingLeft: "clamp(1.25rem,6vw,5rem)", paddingRight: "clamp(1.25rem,6vw,5rem)",
        background: "linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=1400&q=85)`, backgroundSize: "cover", backgroundPosition: "center 40%", filter: "saturate(0.85) brightness(1.05)", opacity: 0.10 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(14,187,240,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.05) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(14,187,240,0.12) 0%, transparent 65%)", mixBlendMode: "multiply", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <nav style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--text-muted-2)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" as const }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#0EBBF0" }}>›</span>
            <Link href="/products" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Products</Link>
            <span style={{ color: "#0EBBF0" }}>›</span>
            <span style={{ color: "var(--azure-deep)", fontWeight: 600 }}>Designer Lightings</span>
          </nav>

          <div className="animate-fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem", flexWrap: "wrap" as const }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0, boxShadow: "0 4px 14px rgba(14,187,240,0.18)" }}>
                <CIcon name="designer" size={28} />
              </div>
              <div>
                <p className="section-label" style={{ marginBottom: "0.4rem", color: "#0EBBF0" }}>◆ PILLAR 03 ◆</p>
                <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>Designer Lightings</h1>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "780px", fontStyle: "italic" }}>
              Architectural and decorative lighting fixtures that transform spaces. From chandeliers to wall sconces, Landlite's designer collection brings artistry and sophistication to every room.
            </p>
          </div>
        </div>
      </section>

      {/* ── Product category grid ── */}
      <section style={{ padding: "5rem clamp(1.25rem,6vw,5rem) 7rem", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3px", height: "26px", borderRadius: "2px", background: "linear-gradient(180deg, var(--azure), var(--azure-deep))" }} />
            <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--azure-deep)" }}>Product Range</h2>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text-muted-2)", fontStyle: "italic" }}>· full catalog at landlitephilcorp.com</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
            {/* Chandeliers */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "2rem 2rem 1.75rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: "0.0s", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.25rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0 }}>
                  <CIcon name="chandelier" size={22} />
                </div>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: "#0EBBF0", textTransform: "uppercase" as const }}>
                  01
                </span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Chandeliers</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Statement ceiling fixtures for living rooms, dining halls, and hotel lobbies. Traditional crystal to modern brass ring designs.</p>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#0EBBF0" }}>VIEW PRODUCTS →</span>
            </div>
            {/* Pendant Lights */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "2rem 2rem 1.75rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: "0.08s", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.25rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0 }}>
                  <CIcon name="pendant" size={22} />
                </div>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: "#0EBBF0", textTransform: "uppercase" as const }}>
                  02
                </span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Pendant Lights</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Hanging fixtures for dining tables, kitchen islands, and over-counter task lighting. Single-shade and cluster configurations.</p>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#0EBBF0" }}>VIEW PRODUCTS →</span>
            </div>
            {/* Wall Sconces */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "2rem 2rem 1.75rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: "0.16s", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.25rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0 }}>
                  <CIcon name="sconce" size={22} />
                </div>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: "#0EBBF0", textTransform: "uppercase" as const }}>
                  03
                </span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Wall Sconces</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Decorative wall-mounted lighting for ambience, reading, and accent. Hard-wired and plug-in variants in brass, matte black, and ceramic.</p>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#0EBBF0" }}>VIEW PRODUCTS →</span>
            </div>
            {/* Floor Lamps */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "2rem 2rem 1.75rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: "0.24s", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.25rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0 }}>
                  <CIcon name="floor-lamp" size={22} />
                </div>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: "#0EBBF0", textTransform: "uppercase" as const }}>
                  04
                </span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Floor Lamps</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Freestanding designer lamps for reading nooks and lounges. Arc and tripod silhouettes with integrated dimmers on select models.</p>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#0EBBF0" }}>VIEW PRODUCTS →</span>
            </div>
            {/* Table Lamps */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "2rem 2rem 1.75rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: "0.32s", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.25rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0 }}>
                  <CIcon name="table-lamp" size={22} />
                </div>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: "#0EBBF0", textTransform: "uppercase" as const }}>
                  05
                </span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Table Lamps</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Bedside and desktop fixtures for soft ambient and task light. Ceramic, brass, and woven-rattan bases with fabric shades.</p>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#0EBBF0" }}>VIEW PRODUCTS →</span>
            </div>
            {/* Strip Lights */}
            <div ref={addRef} className="reveal card-hover"
              style={{ padding: "2rem 2rem 1.75rem", borderRadius: "12px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: "0.4s", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.25rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0EBBF0", flexShrink: 0 }}>
                  <CIcon name="strip" size={22} />
                </div>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.22em", color: "#0EBBF0", textTransform: "uppercase" as const }}>
                  06
                </span>
              </div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.01em" }}>Strip Lights</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>Flexible LED strips for cove lighting, under-cabinet, backlight, and accent details. Cut-to-length, peel-and-stick, IP65/IP67 outdoor.</p>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#0EBBF0" }}>VIEW PRODUCTS →</span>
            </div>
          </div>

          {/* CTA */}
          <div ref={addRef} className="reveal" style={{ marginTop: "4rem", textAlign: "center", padding: "3.5rem 2rem", background: "rgba(14,187,240,0.06)", border: "1px solid rgba(14,187,240,0.20)", borderRadius: "16px" }}>
            <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,3vw,2rem)", marginBottom: "0.75rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
              Shop the Full <span className="azure-text">Designer Lightings</span> Range
            </h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Browse all products, specs, and pricing at our official online store.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const }}>
              <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
                className="azure-btn" style={{ padding: "0.85rem 2rem", borderRadius: "6px", fontSize: "0.85rem", textDecoration: "none", display: "inline-block" }}>
                SHOP ONLINE →
              </a>
              <Link href="/products" className="outline-btn"
                style={{ padding: "0.85rem 2rem", borderRadius: "6px", fontSize: "0.85rem", textDecoration: "none", display: "inline-block" }}>
                ALL PRODUCTS
              </Link>
            </div>
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
