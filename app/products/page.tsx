"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function CatIcon({ name, size = 26 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "lighting-solutions": return <svg {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
    case "wiring-device":      return <svg {...p}><path d="M6 7v3"/><path d="M14 7v3"/><path d="M5 5h10v6a5 5 0 0 1-10 0z"/><path d="M10 16v3"/><path d="M7 22h6"/></svg>;
    case "designer-lightings": return <svg {...p}><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M5.6 18.4l2.1-2.1"/><path d="M16.3 7.7l2.1-2.1"/></svg>;
    case "smart-solutions":    return <svg {...p}><path d="M3 10l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

const categories = [
  { id: "lighting-solutions", title: "Lighting Solutions", color: "#0EBBF0",
    description: "Versatile lighting solutions for every home and business need. From energy-saving LED bulbs to high-lumen downlights, Landlite's general lighting line delivers quality and reliability.",
    products: [{ name: "LED Bulbs", desc: "Energy-efficient LED bulbs in various wattages and color temperatures." }, { name: "Downlights", desc: "Recessed LED downlights for clean, modern ceiling installations." }, { name: "Tube Lights", desc: "LED tube replacements for commercial and industrial spaces." }, { name: "Flood Lights", desc: "High-power outdoor and indoor flood lighting solutions." }, { name: "Panel Lights", desc: "Ultra-slim LED panels for offices and commercial spaces." }, { name: "Track Lights", desc: "Adjustable track lighting for retail and gallery displays." }] },
  { id: "wiring-device",      title: "Wiring Device",      color: "#0880B8",
    description: "Premium switches, sockets, and wiring accessories designed for safety, durability, and aesthetics. Complete your electrical installation with Landlite's trusted wiring solutions.",
    products: [{ name: "Wall Switches", desc: "Single, double, and multi-gang switches in various finishes." }, { name: "Power Sockets", desc: "Universal and type-specific sockets for all appliances." }, { name: "USB Sockets", desc: "Built-in USB charging outlets for modern homes." }, { name: "Dimmer Switches", desc: "Smooth dimming control for compatible LED fixtures." }, { name: "Switch Plates", desc: "Stylish cover plates to complement your interior design." }, { name: "Circuit Breakers", desc: "Reliable protection for your electrical installations." }] },
  { id: "designer-lightings", title: "Designer Lightings", color: "#0EBBF0",
    description: "Architectural and decorative lighting fixtures that transform spaces. From chandeliers to wall sconces, Landlite's designer collection brings artistry and sophistication to every room.",
    products: [{ name: "Chandeliers", desc: "Statement ceiling fixtures for living rooms and lobbies." }, { name: "Pendant Lights", desc: "Hanging fixtures for dining areas and kitchen islands." }, { name: "Wall Sconces", desc: "Decorative wall-mounted lighting for ambiance and accent." }, { name: "Floor Lamps", desc: "Freestanding designer lamps for reading and atmosphere." }, { name: "Table Lamps", desc: "Elegant desktop and bedside lighting solutions." }, { name: "Strip Lights", desc: "Flexible LED strips for cove lighting and accent details." }] },
  { id: "smart-solutions",    title: "Smart Solutions",    color: "#0880B8",
    description: "Intelligent lighting systems for a connected, efficient, and convenient lifestyle. Control your lights from your phone, set schedules, and create the perfect ambiance.",
    products: [{ name: "Smart Bulbs", desc: "WiFi-enabled bulbs with app and voice control compatibility." }, { name: "Smart Switches", desc: "Retrofit smart switches for existing wiring." }, { name: "Smart Dimmers", desc: "App-controlled dimming for any compatible fixture." }, { name: "Smart Sensors", desc: "Motion and daylight sensors for automated lighting." }, { name: "Smart Hub", desc: "Central controller for your Landlite smart ecosystem." }, { name: "Voice Control", desc: "Integration with Alexa, Google Home, and Siri." }] },
];

export default function ProductsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    if (window.location.hash) setActiveCategory(window.location.hash.replace("#", ""));
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

  const addRef = (el: HTMLElement | null) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar scrolled={scrolled} />

      {/* Hero */}
      <section style={{ padding: "10rem 2rem 5rem", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(14,187,240,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.05) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div className="animate-fade-up" style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "1rem" }}>◆ OUR FULL RANGE ◆</p>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem,7vw,4.5rem)", marginBottom: "1.5rem" }}>
            Our <span className="azure-text">Products</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: "1.1rem" }}>
            Four pillars of lighting excellence — built for homes, businesses, and everything in between.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginTop: "3rem", position: "relative", zIndex: 1 }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ padding: "0.6rem 1.25rem", borderRadius: "100px", border: `1px solid ${active ? cat.color : "rgba(14,187,240,0.25)"}`, background: active ? `${cat.color}1A` : "var(--paper)", color: active ? cat.color : "var(--text-muted)", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.3s ease", letterSpacing: "0.05em", display: "inline-flex", alignItems: "center", gap: "0.4rem", boxShadow: active ? "0 4px 12px rgba(14,187,240,0.18)" : "0 1px 2px rgba(5,13,26,0.04)" }}>
                <CatIcon name={cat.id} size={14} />{cat.title}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category sections */}
      {categories.map((cat, catIndex) => (
        <section key={cat.id} id={cat.id} style={{ padding: "6rem 2rem", background: catIndex % 2 === 0 ? "var(--paper)" : "var(--frost)", borderTop: "1px solid rgba(5,13,26,0.04)", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div ref={addRef} className="reveal" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: `${cat.color}15`, border: `1px solid ${cat.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color, flexShrink: 0 }}>
                  <CatIcon name={cat.id} size={28} />
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <p className="section-label" style={{ color: cat.color, marginBottom: "0.5rem" }}>◆ PILLAR 0{catIndex + 1} ◆</p>
                  <h2 className="section-title" style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)" }}>{cat.title}</h2>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8, fontStyle: "italic", maxWidth: "800px" }}>{cat.description}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
              {cat.products.map((product, i) => (
                <div key={product.name} ref={addRef} className="reveal card-hover"
                  style={{ padding: "1.75rem", borderRadius: "8px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: `${i * 0.05}s` }}>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", color: cat.color, marginBottom: "0.5rem" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.5rem" }}>{product.name}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{product.desc}</p>
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: cat.color }}>VIEW PRODUCTS →</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(5,13,26,0.08)", padding: "2rem", background: "var(--ink)", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(176,220,255,0.35)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
