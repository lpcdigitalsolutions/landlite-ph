"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const categories = [
  {
    id: "general-lights",
    title: "General Lights",
    icon: "💡",
    color: "#0EBBF0",
    description:
      "Versatile lighting solutions for every home and business need. From energy-saving LED bulbs to high-lumen downlights, Landlite's general lighting line delivers quality and reliability.",
    products: [
      { name: "LED Bulbs", desc: "Energy-efficient LED bulbs in various wattages and color temperatures." },
      { name: "Downlights", desc: "Recessed LED downlights for clean, modern ceiling installations." },
      { name: "Tube Lights", desc: "LED tube replacements for commercial and industrial spaces." },
      { name: "Flood Lights", desc: "High-power outdoor and indoor flood lighting solutions." },
      { name: "Panel Lights", desc: "Ultra-slim LED panels for offices and commercial spaces." },
      { name: "Track Lights", desc: "Adjustable track lighting for retail and gallery displays." },
    ],
  },
  {
    id: "wiring-device",
    title: "Wiring Device",
    icon: "🔌",
    color: "#4DD9FF",
    description:
      "Premium switches, sockets, and wiring accessories designed for safety, durability, and aesthetics. Complete your electrical installation with Landlite's trusted wiring solutions.",
    products: [
      { name: "Wall Switches", desc: "Single, double, and multi-gang switches in various finishes." },
      { name: "Power Sockets", desc: "Universal and type-specific sockets for all appliances." },
      { name: "USB Sockets", desc: "Built-in USB charging outlets for modern homes." },
      { name: "Dimmer Switches", desc: "Smooth dimming control for compatible LED fixtures." },
      { name: "Switch Plates", desc: "Stylish cover plates to complement your interior design." },
      { name: "Circuit Breakers", desc: "Reliable protection for your electrical installations." },
    ],
  },
  {
    id: "designer-lightings",
    title: "Designer Lightings",
    icon: "✨",
    color: "#B3EEFF",
    description:
      "Architectural and decorative lighting fixtures that transform spaces. From chandeliers to wall sconces, Landlite's designer collection brings artistry and sophistication to every room.",
    products: [
      { name: "Chandeliers", desc: "Statement ceiling fixtures for living rooms and lobbies." },
      { name: "Pendant Lights", desc: "Hanging fixtures for dining areas and kitchen islands." },
      { name: "Wall Sconces", desc: "Decorative wall-mounted lighting for ambiance and accent." },
      { name: "Floor Lamps", desc: "Freestanding designer lamps for reading and atmosphere." },
      { name: "Table Lamps", desc: "Elegant desktop and bedside lighting solutions." },
      { name: "Strip Lights", desc: "Flexible LED strips for cove lighting and accent details." },
    ],
  },
  {
    id: "smart-solutions",
    title: "Smart Solutions",
    icon: "🏠",
    color: "#0880B8",
    description:
      "Intelligent lighting systems for a connected, efficient, and convenient lifestyle. Control your lights from your phone, set schedules, and create the perfect ambiance with Landlite Smart.",
    products: [
      { name: "Smart Bulbs", desc: "WiFi-enabled bulbs with app and voice control compatibility." },
      { name: "Smart Switches", desc: "Retrofit smart switches for existing wiring." },
      { name: "Smart Dimmers", desc: "App-controlled dimming for any compatible fixture." },
      { name: "Smart Sensors", desc: "Motion and daylight sensors for automated lighting." },
      { name: "Smart Hub", desc: "Central controller for your Landlite smart ecosystem." },
      { name: "Voice Control", desc: "Integration with Alexa, Google Home, and Siri." },
    ],
  },
];

export default function ProductsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    // Check hash on load
    if (window.location.hash) {
      setActiveCategory(window.location.hash.replace("#", ""));
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <main style={{ background: "var(--navy)", minHeight: "100vh" }}>
      <Navbar scrolled={scrolled} />

      {/* Hero */}
      <section style={{
        padding: "10rem 2rem 5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(14,187,240,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,187,240,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}
          className="animate-fade-up"
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>◆ OUR FULL RANGE ◆</p>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", marginBottom: "1.5rem" }}>
            Our <span className="azure-text">Products</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: "1.1rem" }}>
            Four pillars of lighting excellence — built for homes, businesses, and everything in between.
          </p>
        </div>

        {/* Quick nav */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "3rem",
          position: "relative",
          zIndex: 1,
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "100px",
                border: `1px solid ${activeCategory === cat.id ? cat.color : "rgba(14,187,240,0.2)"}`,
                background: activeCategory === cat.id ? `${cat.color}18` : "transparent",
                color: activeCategory === cat.id ? cat.color : "rgba(176,220,255,0.6)",
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.05em",
              }}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((cat, catIndex) => (
        <section
          key={cat.id}
          id={cat.id}
          style={{
            padding: "6rem 2rem",
            background: catIndex % 2 === 0 ? "var(--navy)" : "var(--dark-mid)",
            borderTop: "1px solid rgba(14,187,240,0.07)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Category Header */}
            <div ref={addRevealRef} className="reveal" style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: "64px", height: "64px",
                  borderRadius: "16px",
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  flexShrink: 0,
                }}>
                  {cat.icon}
                </div>
                <div>
                  <p className="section-label" style={{ color: cat.color, marginBottom: "0.25rem" }}>
                    PILLAR {String(catIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: cat.color }}>
                    {cat.title}
                  </h2>
                </div>
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(176,220,255,0.65)",
                lineHeight: 1.8,
                maxWidth: "700px",
              }}>
                {cat.description}
              </p>
            </div>

            {/* Products Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}>
              {cat.products.map((product, i) => (
                <div
                  key={product.name}
                  ref={addRevealRef}
                  className="reveal card-hover"
                  style={{
                    padding: "2rem",
                    background: `${cat.color}06`,
                    border: `1px solid ${cat.color}18`,
                    borderRadius: "8px",
                    animationDelay: `${i * 0.1}s`,
                    transition: "all 0.4s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = `${cat.color}10`;
                    e.currentTarget.style.borderColor = `${cat.color}60`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = `${cat.color}06`;
                    e.currentTarget.style.borderColor = `${cat.color}18`;
                  }}
                >
                  <h3 style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: cat.color,
                    marginBottom: "0.75rem",
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(176,220,255,0.6)",
                    lineHeight: 1.6,
                  }}>
                    {product.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* View all CTA */}
            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <a
                href="https://landlitephilcorp.com/collections/all"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 2rem",
                  border: `1px solid ${cat.color}50`,
                  borderRadius: "4px",
                  color: cat.color,
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = `${cat.color}15`;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${cat.color}25`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                VIEW ALL {cat.title.toUpperCase()} →
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(14,187,240,0.15)",
        padding: "2rem",
        background: "var(--dark-mid)",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(176,220,255,0.2)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
