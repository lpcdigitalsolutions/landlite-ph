"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

const retailers = [
  { name: "Wilcon Depot", branches: "Nationwide", icon: "🏬" },
  { name: "Ace Hardware", branches: "Nationwide", icon: "🔧" },
  { name: "CW Home Depot", branches: "Nationwide", icon: "🏠" },
  { name: "MC Home Depot", branches: "Nationwide", icon: "🏠" },
  { name: "Handyman", branches: "Nationwide", icon: "🛠️" },
  { name: "Citi Hardware", branches: "Nationwide", icon: "🔩" },
];

export default function OutletsPage() {
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
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

        <div style={{ position: "relative", zIndex: 1 }} className="animate-fade-up">
          <p className="section-label" style={{ marginBottom: "1rem" }}>◆ FIND US NEAR YOU ◆</p>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", marginBottom: "1.5rem" }}>
            Our <span className="azure-text">Outlets</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            170+ retail outlets nationwide. Landlite lighting is always within your reach.
          </p>
        </div>
      </section>

      {/* Retailers */}
      <section style={{ padding: "4rem 2rem 8rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div ref={addRevealRef} className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ PARTNER RETAILERS ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              Available <span className="azure-text">Nationwide</span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginBottom: "5rem",
          }}>
            {retailers.map((r, i) => (
              <div
                key={r.name}
                ref={addRevealRef}
                className="reveal card-hover"
                style={{
                  padding: "2rem",
                  background: "rgba(14,187,240,0.03)",
                  border: "1px solid rgba(14,187,240,0.12)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(14,187,240,0.07)";
                  e.currentTarget.style.borderColor = "rgba(14,187,240,0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(14,187,240,0.03)";
                  e.currentTarget.style.borderColor = "rgba(14,187,240,0.12)";
                }}
              >
                <div style={{ fontSize: "2.5rem" }}>{r.icon}</div>
                <div>
                  <h3 style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--azure-light)",
                    marginBottom: "0.25rem",
                  }}>
                    {r.name}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(176,220,255,0.5)",
                  }}>
                    {r.branches}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Online Store CTA */}
          <div
            ref={addRevealRef}
            className="reveal"
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "rgba(14,187,240,0.04)",
              border: "1px solid rgba(14,187,240,0.15)",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
            <h3 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
              Shop <span className="azure-text">Online</span> Anytime
            </h3>
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              Can&apos;t visit a store? Browse and order from our official online store.
            </p>
            <a
              href="https://landlitephilcorp.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="azure-btn"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "4px",
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              VISIT ONLINE STORE →
            </a>
          </div>
        </div>
      </section>

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
