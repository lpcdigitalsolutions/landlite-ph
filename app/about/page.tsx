"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const milestones = [
  { year: "2002", title: "Company Founded", desc: "Landlite Philippines Corporation was established as a basic bulb company, with a principle of providing good quality, reliable products." },
  { year: "2005", title: "LED Pioneer", desc: "LPC became the first company in the Philippines to start the LED market — beginning with decorative LED wall lights, then LED Christmas lights, and finally LED General Lighting." },
  { year: "2010+", title: "Nationwide Expansion", desc: "Expanded to 170+ retail outlets nationwide through strong partnerships with Wilcon Depot, Ace Hardware, CW Home Depot, Handyman, and Citi Hardware." },
  { year: "Present", title: "Full Product Ecosystem", desc: "LPC now carries a wide choice of residential and commercial lighting, wiring devices, designer fixtures, and smart solutions — serving homes, hotels, and businesses across the Philippines." },
];

const hotels = [
  "Solaire Hotel & Casinos",
  "Dusit Thani Manila",
  "Henan Group of Hotels",
  "Boracay Regency",
  "Bellevue Hotel",
  "Bistro Group",
  "Philippine Pizza",
];

const partners = [
  "Wilcon Depot",
  "Ace Hardware",
  "CW Home Depot",
  "MC Home Depot",
  "Handyman",
  "Citi Hardware",
];

export default function AboutPage() {
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

      {/* ── Page Hero ── */}
      <section style={{
        padding: "10rem 2rem 6rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(14,187,240,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,187,240,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(14,187,240,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}
          className="animate-fade-up"
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>◆ WHO WE ARE ◆</p>
          <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", marginBottom: "1.5rem" }}>
            About <span className="azure-text">Landlite</span>
          </h1>
          <div className="divider" style={{ margin: "0 auto 2rem", maxWidth: "400px" }}>
            <span style={{ color: "var(--azure)", fontSize: "0.8rem" }}>◆</span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.15rem",
            fontStyle: "italic",
            color: "rgba(176,220,255,0.75)",
            lineHeight: 1.8,
          }}>
            Two decades of lighting the Philippines — from a simple bulb company
            to the nation&apos;s trusted LED pioneer.
          </p>
        </div>
      </section>

      {/* ── Founding Story ── */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
            className="about-grid"
          >
            <div ref={addRevealRef} className="reveal">
              <p className="section-label" style={{ marginBottom: "1rem" }}>◆ ESTABLISHED 2002 ◆</p>
              <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "2rem" }}>
                Built on a <span className="azure-text">Principle</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(176,220,255,0.7)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}>
                Landlite Philippines Corporation was established in 2002, from a basic bulb company.
                LPC now carries a wide choice of residential and commercial lighting and fixtures.
                Armed with its principle of providing good quality reliable products.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(176,220,255,0.7)",
                lineHeight: 1.8,
              }}>
                LPC is the <strong style={{ color: "var(--azure-light)" }}>first company in the Philippines</strong> that
                started the LED market in 2005 — with decorative LED wall lights, followed by LED Christmas lights,
                and finally LED General Lighting.
              </p>
            </div>

            <div ref={addRevealRef} className="reveal">
              {/* Visual stat card */}
              <div style={{
                background: "rgba(14,187,240,0.04)",
                border: "1px solid rgba(14,187,240,0.15)",
                borderRadius: "12px",
                padding: "3rem 2.5rem",
              }}>
                {[
                  { label: "Year Founded", value: "2002" },
                  { label: "LED Market Pioneer", value: "2005" },
                  { label: "Retail Outlets", value: "170+" },
                  { label: "Years of Excellence", value: "20+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem 0",
                      borderBottom: "1px solid rgba(14,187,240,0.08)",
                    }}
                  >
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(176,220,255,0.6)",
                    }}>
                      {stat.label}
                    </span>
                    <span style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      color: "var(--azure)",
                    }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── Timeline ── */}
      <section style={{
        padding: "6rem 2rem",
        background: "linear-gradient(180deg, var(--navy) 0%, var(--dark-mid) 100%)",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div ref={addRevealRef} className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ OUR JOURNEY ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Milestones That <span className="azure-text">Define Us</span>
            </h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute",
              left: "80px",
              top: 0, bottom: 0,
              width: "1px",
              background: "linear-gradient(180deg, transparent, var(--azure), transparent)",
              opacity: 0.4,
            }} />

            {milestones.map((m, i) => (
              <div
                key={m.year}
                ref={addRevealRef}
                className="reveal"
                style={{
                  display: "flex",
                  gap: "2.5rem",
                  marginBottom: "3.5rem",
                  alignItems: "flex-start",
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {/* Year bubble */}
                <div style={{
                  flexShrink: 0,
                  width: "80px",
                  textAlign: "center",
                }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: "2px solid var(--azure)",
                    background: "rgba(14,187,240,0.08)",
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.65rem",
                    color: "var(--azure)",
                    letterSpacing: "0.05em",
                  }}>
                    {m.year}
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  background: "rgba(14,187,240,0.03)",
                  border: "1px solid rgba(14,187,240,0.1)",
                  borderRadius: "8px",
                  padding: "1.75rem",
                  flex: 1,
                }}>
                  <h3 style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--azure-light)",
                    marginBottom: "0.5rem",
                  }}>
                    {m.title}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "rgba(176,220,255,0.65)",
                    lineHeight: 1.7,
                  }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hotel Partners ── */}
      <section style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <div ref={addRevealRef} className="reveal" style={{ marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ TRUSTED BY ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1.5rem" }}>
              Hotels & <span className="azure-text">Establishments</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontStyle: "italic",
              color: "rgba(176,220,255,0.6)",
              fontSize: "1rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              LPC extended its product line to Hotel, Resort, and Restaurant Lightings —
              for indoor, outdoor, and pool lighting — winning the trust of iconic establishments.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}>
            {hotels.map((hotel) => (
              <div
                key={hotel}
                ref={addRevealRef}
                className="reveal card-hover"
                style={{
                  padding: "1.25rem 1rem",
                  background: "rgba(14,187,240,0.04)",
                  border: "1px solid rgba(14,187,240,0.12)",
                  borderRadius: "6px",
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  color: "rgba(176,220,255,0.7)",
                  letterSpacing: "0.02em",
                }}
              >
                {hotel}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Retail Partners ── */}
      <section style={{
        padding: "5rem 2rem",
        background: "var(--dark-mid)",
        borderTop: "1px solid rgba(14,187,240,0.1)",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "2rem" }}>◆ AVAILABLE AT ◆</p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}>
            {partners.map((p) => (
              <span
                key={p}
                style={{
                  padding: "0.6rem 1.2rem",
                  background: "rgba(14,187,240,0.05)",
                  border: "1px solid rgba(14,187,240,0.15)",
                  borderRadius: "4px",
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "rgba(176,220,255,0.6)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div ref={addRevealRef} className="reveal" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "1.5rem" }}>
            Ready to <span className="azure-text">Illuminate</span>?
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
            color: "rgba(176,220,255,0.65)",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}>
            Explore our products or find a Landlite outlet near you.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/"
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
              href="/contact"
              className="outline-btn"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "4px",
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              CONTACT US
            </Link>
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
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
          color: "rgba(176,220,255,0.2)",
        }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
