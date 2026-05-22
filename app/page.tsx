"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const pillars = [
  {
    id: "Li",
    title: "Lighting Solutions",
    tagline: "Discover versatile lighting solutions perfect for homes and businesses.",
    color: "#0EBBF0",
    // Bright modern living room with recessed LED ceiling lights
    bg: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=900&q=85",
    href: "/products/Lighting-Solutions",
  },
  {
    id: "wiring-device",
    title: "Wiring Device",
    tagline: "Premium switches, sockets, and wiring accessories for every installation.",
    color: "#4DD9FF",
    // Close-up of modern electrical panel / circuit breaker
    bg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=85",
    href: "/products/wiring-device",
  },
  {
    id: "designer-lightings",
    title: "Designer Lightings",
    tagline: "Architectural and decorative fixtures that elevate any space.",
    color: "#B3EEFF",
    // Luxury interior with dramatic pendant / chandelier lighting
    bg: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=85",
    href: "/products/designer-lightings",
  },
  {
    id: "smart-solutions",
    title: "Smart Solutions",
    tagline: "Intelligent lighting systems for a connected and efficient lifestyle.",
    color: "#0880B8",
    // Smart home tablet / automated modern interior
    bg: "https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=85",
    href: "/products/smart-solutions",
  },
];

const highlights = [
  { icon: "🏆", title: "First in LED", desc: "Pioneer of LED lighting in the Philippines since 2005 — leading the industry for over 20 years." },
  { icon: "🏪", title: "170+ Retail Outlets", desc: "Nationwide coverage at Wilcon Depot, Ace Hardware, CW Home Depot, and more." },
  { icon: "🏨", title: "Trusted by Hotels", desc: "Powering iconic establishments like Solaire, Dusit Thani, and the Henan Group of Hotels." },
  { icon: "🇵🇭", title: "Proudly Filipino", desc: "Established in 2002 and growing ever since — a company built for the Filipino market." },
];

const stats = [
  { value: "20+", label: "Years of Excellence" },
  { value: "170+", label: "Retail Outlets" },
  { value: "1000+", label: "Products" },
  { value: "2005", label: "Year LED Pioneer" },
];

export default function Home() {
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

      {/* ── Ambient particles ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: "50%",
              background: "var(--azure)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.05,
              animation: `particleDrift ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 6}s infinite`,
            }}
          />
        ))}
      </div>

      <Navbar scrolled={scrolled} />

      {/* ── HERO ── */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "8rem 2rem 4rem",
        }}
      >
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px", height: "900px",
          background: "radial-gradient(circle, rgba(14,187,240,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(14,187,240,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,187,240,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div
          style={{ textAlign: "center", zIndex: 1, maxWidth: "960px" }}
          className="animate-fade-up"
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid rgba(14,187,240,0.4)",
            padding: "0.4rem 1.2rem",
            borderRadius: "100px",
            marginBottom: "2rem",
            background: "rgba(14,187,240,0.06)",
          }}>
            <span style={{
              display: "inline-block",
              width: "6px", height: "6px",
              borderRadius: "50%",
              background: "var(--azure)",
              animation: "pulse 2s ease-in-out infinite",
            }} />
            <span style={{
              color: "var(--azure-light)",
              fontSize: "0.7rem",
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.25em",
            }}>
              PHILIPPINES' LED PIONEER SINCE 2005
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}>
            <span className="azure-text" style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", display: "block" }}>
              ILLUMINATE
            </span>
            <span style={{
              fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
              color: "rgba(240,248,255,0.9)",
              letterSpacing: "0.15em",
              display: "block",
              fontWeight: 300,
            }}>
              YOUR WORLD
            </span>
          </h1>

          {/* Divider */}
          <div className="divider" style={{ margin: "2rem auto", maxWidth: "400px" }}>
            <span style={{ color: "var(--azure)", fontSize: "0.8rem" }}>◆</span>
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            fontStyle: "italic",
            color: "rgba(176,220,255,0.8)",
            marginBottom: "3rem",
            lineHeight: 1.7,
          }}>
            From general lighting to smart solutions — Landlite Philippines Corporation
            <br />brings quality, innovation, and design to every corner of your space.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="#pillars"
              className="azure-btn"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "4px",
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              EXPLORE PRODUCTS
            </Link>
            <Link
              href="/about"
              className="outline-btn"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "4px",
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              ABOUT US
            </Link>
          </div>

          {/* Quick stats */}
          <div style={{
            marginTop: "5rem",
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color: "var(--azure)",
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(176,220,255,0.6)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.1em",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          animation: "float 2s ease-in-out infinite",
        }}>
          <span style={{ color: "rgba(14,187,240,0.5)", fontSize: "0.65rem", letterSpacing: "0.2em", fontFamily: "'Exo 2', sans-serif" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--azure), transparent)" }} />
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section
        id="pillars"
        style={{
          padding: "0",
          position: "relative",
          zIndex: 1,
          minHeight: "90vh",
        }}
      >
        {/* Section label */}
        <div
          ref={addRevealRef}
          className="reveal"
          style={{ textAlign: "center", padding: "5rem 2rem 3rem" }}
        >
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ OUR PRODUCT PILLARS ◆</p>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            Four Pillars of <span className="azure-text">Illumination</span>
          </h2>
          <p className="section-subtitle" style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Every lighting need, covered. From the simplest bulb to the smartest system.
          </p>
        </div>

        {/* 4-column hero grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          minHeight: "65vh",
        }}
          className="pillars-grid"
        >
          {pillars.map((pillar, i) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="pillar-card reveal"
              ref={addRevealRef as never}
              style={{
                display: "block",
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                animationDelay: `${i * 0.15}s`,
                minHeight: "500px",
                background: "var(--dark-mid)",
                borderRight: "1px solid rgba(14,187,240,0.1)",
                backgroundImage: `url(${pillar.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay so text stays readable */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(5,13,26,0.6)",
                zIndex: 0,
              }} />

              {/* Color-tinted gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(
                  135deg,
                  rgba(5,13,26,0.5) 0%,
                  rgba(8,15,28,0.3) 50%,
                  ${pillar.color}22 100%
                )`,
                zIndex: 0,
              }} />

              {/* Decorative light beam */}
              <div style={{
                position: "absolute",
                top: "-20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "60%",
                background: `linear-gradient(180deg, ${pillar.color}, transparent)`,
                opacity: 0.4,
                zIndex: 1,
              }} />

              {/* Number */}
              <div style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 900,
                fontSize: "5rem",
                color: "rgba(14,187,240,0.06)",
                lineHeight: 1,
                zIndex: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "2.5rem 2rem",
                zIndex: 2,
                background: "linear-gradient(0deg, rgba(5,13,26,0.98) 0%, rgba(5,13,26,0.75) 55%, transparent 100%)",
                transition: "all 0.5s ease",
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{pillar.icon}</div>
                <h3 style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: pillar.color,
                  marginBottom: "0.75rem",
                  letterSpacing: "0.03em",
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(176,220,255,0.7)",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                }}>
                  {pillar.tagline}
                </p>
                <span style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--azure)",
                  letterSpacing: "0.2em",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  EXPLORE →
                </span>
              </div>

              {/* Hover glow overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, transparent 40%, ${pillar.color}18 100%)`,
                opacity: 0,
                transition: "opacity 0.5s ease",
                zIndex: 1,
              }}
                className="pillar-hover-glow"
              />
            </Link>
          ))}
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .pillars-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 520px) {
            .pillars-grid {
              grid-template-columns: 1fr !important;
            }
          }
          .pillar-card:hover .pillar-hover-glow {
            opacity: 1 !important;
          }
          .pillar-card {
            transition: transform 0.4s ease;
          }
          .pillar-card:hover {
            background-size: 110% !important;
          }
          /* zoom bg image on hover */
          .pillar-card {
            background-size: 100% !important;
            transition: background-size 0.6s ease !important;
          }
          .pillar-card:hover {
            background-size: 112% !important;
          }
        `}</style>
      </section>

      {/* ── WHY CHOOSE LANDLITE ── */}
      <section
        style={{
          padding: "8rem 2rem",
          background: "linear-gradient(180deg, var(--navy) 0%, var(--dark-mid) 50%, var(--navy) 100%)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Scan line */}
        <div className="scan-overlay" />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRevealRef} className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ WHY LANDLITE ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
              Trusted by <span className="azure-text">Thousands</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Two decades of lighting excellence, backed by quality you can see and feel.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2rem",
          }}>
            {highlights.map((h, i) => (
              <div
                key={h.title}
                ref={addRevealRef}
                className="reveal card-hover"
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "8px",
                  background: "rgba(14,187,240,0.03)",
                  border: "1px solid rgba(14,187,240,0.12)",
                  animationDelay: `${i * 0.15}s`,
                  transition: "all 0.4s ease",
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
                <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>{h.icon}</div>
                <h3 style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--azure-light)",
                  marginBottom: "0.75rem",
                }}>
                  {h.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(176,220,255,0.6)",
                  lineHeight: 1.7,
                }}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RETAIL PARTNERS BANNER ── */}
      <section style={{
        padding: "4rem 2rem",
        background: "var(--dark-mid)",
        borderTop: "1px solid rgba(14,187,240,0.1)",
        borderBottom: "1px solid rgba(14,187,240,0.1)",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>ALSO AVAILABLE AT</p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}>
            {["Wilcon Depot", "Ace Hardware", "CW Home Depot", "MC Home Depot", "Handyman", "Citi Hardware"].map((partner) => (
              <span
                key={partner}
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "rgba(176,220,255,0.5)",
                  letterSpacing: "0.05em",
                  padding: "0.5rem 1rem",
                  border: "1px solid rgba(14,187,240,0.1)",
                  borderRadius: "4px",
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: "8rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(14,187,240,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div ref={addRevealRef} className="reveal">
            <p className="section-label" style={{ marginBottom: "1rem" }}>◆ READY TO ILLUMINATE ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1.5rem" }}>
              Find a <span className="azure-text">Landlite</span> Near You
            </h2>
            <p className="section-subtitle" style={{ fontSize: "1.1rem", marginBottom: "3rem" }}>
              With 170+ retail outlets nationwide and an online store,
              Landlite lighting is always within reach.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/outlets"
                className="azure-btn"
                style={{
                  padding: "1rem 2.5rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                FIND OUTLET
              </Link>
              <a
                href="https://landlitephilcorp.com/collections/all"
                target="_blank"
                rel="noopener noreferrer"
                className="outline-btn"
                style={{
                  padding: "1rem 2.5rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                SHOP ONLINE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(14,187,240,0.15)",
        padding: "4rem 2rem 2rem",
        background: "var(--dark-mid)",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}>
            {/* Brand */}
            <div>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "var(--azure)",
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}>
                LANDLITE
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(176,220,255,0.5)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}>
                Illuminate Your World.
                <br />Established in 2002, LED Pioneer since 2005.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                {[
                  { label: "FB", href: "https://www.facebook.com/landlitephils" },
                  { label: "IG", href: "https://www.instagram.com/landlitephils/?hl=en" },
                  { label: "YT", href: "https://www.youtube.com/channel/UCj9jjlvk4BRcKOoWVPnUekw/featured" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "36px", height: "36px",
                      border: "1px solid rgba(14,187,240,0.3)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      color: "var(--azure)",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(14,187,240,0.1)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <p style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                color: "var(--azure)",
                marginBottom: "1.25rem",
              }}>
                OUR PRODUCTS
              </p>
              {["General Lights", "Wiring Device", "Designer Lightings", "Smart Solutions"].map((p) => (
                <Link
                  key={p}
                  href={`/products/${p.toLowerCase().replace(/ /g, "-")}`}
                  style={{
                    display: "block",
                    marginBottom: "0.6rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(176,220,255,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "var(--azure-light)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "rgba(176,220,255,0.55)"; }}
                >
                  {p}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div>
              <p style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                color: "var(--azure)",
                marginBottom: "1.25rem",
              }}>
                COMPANY
              </p>
              {[
                { label: "About Us", href: "/about" },
                { label: "Outlets", href: "/outlets" },
                { label: "Contact Us", href: "/contact" },
                { label: "Careers", href: "/contact#careers" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    display: "block",
                    marginBottom: "0.6rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(176,220,255,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "var(--azure-light)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "rgba(176,220,255,0.55)"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                color: "var(--azure)",
                marginBottom: "1.25rem",
              }}>
                CONTACT
              </p>
              {[
                "📍 KM17 West Service Road, Parañaque City",
                "📞 +632 7358-8855",
                "✉️ sales@landlitephilcorp.com",
                "🕐 Mon–Fri 8am–5pm | Sat 8am–2:30pm",
              ].map((item) => (
                <p
                  key={item}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(176,220,255,0.5)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid rgba(14,187,240,0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(176,220,255,0.25)",
            }}>
              © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
            </p>
            <p style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(14,187,240,0.3)",
              letterSpacing: "0.1em",
            }}>
              ILLUMINATE YOUR WORLD
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
