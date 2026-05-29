"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
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

  const contactCards = [
    {
      icon: "🏢",
      title: "Main Office",
      lines: [
        "Annex Building, KM17 West Service Road",
        "AFRI Compound, Marcelo Green",
        "Parañaque City, Metro Manila",
      ],
    },
    {
      icon: "📞",
      title: "Phone",
      lines: [
        "Trunk Line: +632 7358-8855",
        "Retail Sales: loc. 71",
        "Mobile: +639176354123",
      ],
    },
    {
      icon: "✉️",
      title: "Email",
      lines: [
        "sales@landlitephilcorp.com",
        "cebusales@landlitephilcorp.com",
        "hr@landlitephilcorp.com",
      ],
    },
    {
      icon: "🕐",
      title: "Office Hours",
      lines: [
        "Monday to Friday",
        "8:00am – 5:00pm",
        "Saturday: 8:00am – 2:30pm",
      ],
    },
  ];

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
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
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(14,187,240,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}
          className="animate-fade-up"
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>◆ GET IN TOUCH ◆</p>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", marginBottom: "1.5rem" }}>
            Contact <span className="azure-text">Us</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: "1.1rem" }}>
            Have questions about our products? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: "4rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "5rem",
          }}>
            {contactCards.map((card, i) => (
              <div
                key={card.title}
                ref={addRevealRef}
                className="reveal card-hover"
                style={{
                  padding: "2.5rem 2rem",
                  background: "rgba(14,187,240,0.03)",
                  border: "1px solid rgba(14,187,240,0.12)",
                  borderRadius: "8px",
                  animationDelay: `${i * 0.1}s`,
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
                <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>{card.icon}</div>
                <h3 style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--azure)",
                  letterSpacing: "0.15em",
                  marginBottom: "0.75rem",
                }}>
                  {card.title}
                </h3>
                {card.lines.map((line) => (
                  <p key={line} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(5,13,26,0.65)",
                    lineHeight: 1.7,
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Cebu Branch */}
          <div
            ref={addRevealRef}
            className="reveal"
            style={{
              padding: "2.5rem",
              background: "rgba(14,187,240,0.04)",
              border: "1px solid rgba(14,187,240,0.15)",
              borderRadius: "8px",
              marginBottom: "5rem",
            }}
          >
            <h3 style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--azure-deep)",
              marginBottom: "1.25rem",
            }}>
              🌴 Cebu Branch
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}>
              <div>
                <p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "0.7rem", color: "var(--azure)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>ADDRESS</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(5,13,26,0.65)", lineHeight: 1.6 }}>
                  J. De Veyra St. Bgy. Carreta<br />
                  North Reclamation Area<br />
                  Cebu City, Philippines
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "0.7rem", color: "var(--azure)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>PHONE</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(5,13,26,0.65)", lineHeight: 1.6 }}>
                  +6332-268-8855<br />
                  +6332-238-9373<br />
                  Mobile: +639177148193
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "0.7rem", color: "var(--azure)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>EMAIL</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(5,13,26,0.65)", lineHeight: 1.6 }}>
                  cebusales@landlitephilcorp.com
                </p>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div
            ref={addRevealRef}
            className="reveal"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(14,187,240,0.2)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15452.435012767524!2d121.0448722!3d14.4784441!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf003eab3ad5%3A0xbfa62ceef525ff1f!2sLANDLITE%20PHILIPPINES%20CORPORATION%20Headquarters!5e0!3m2!1sen!2sph!4v1719990512110!5m2!1sen!2sph"
              width="100%"
              height="400"
              style={{ border: 0, display: "block", filter: "invert(85%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Social + HR */}
      <section style={{
        padding: "5rem 2rem",
        background: "var(--frost)",
        borderTop: "1px solid rgba(14,187,240,0.1)",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "2rem" }}>◆ FOLLOW US ◆</p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}>
            {[
              { label: "Facebook", href: "https://www.facebook.com/landlitephils", icon: "📘" },
              { label: "Instagram", href: "https://www.instagram.com/landlitephils/?hl=en", icon: "📸" },
              { label: "YouTube", href: "https://www.youtube.com/channel/UCj9jjlvk4BRcKOoWVPnUekw/featured", icon: "▶️" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.75rem 1.5rem",
                  background: "rgba(14,187,240,0.04)",
                  border: "1px solid rgba(14,187,240,0.15)",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "rgba(5,13,26,0.7)",
                  transition: "all 0.3s ease",
                }}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>

          <div style={{
            padding: "2rem",
            background: "rgba(14,187,240,0.04)",
            border: "1px solid rgba(14,187,240,0.12)",
            borderRadius: "8px",
          }}>
            <p style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "var(--azure)",
              letterSpacing: "0.2em",
              marginBottom: "0.75rem",
            }}>
              CAREERS / HR
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(5,13,26,0.65)",
            }}>
              hr@landlitephilcorp.com &nbsp;|&nbsp; hr_003@landlitephilcorp.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(14,187,240,0.15)",
        padding: "2rem",
        background: "var(--frost)",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(5,13,26,0.2)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
