"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const HERO_PHOTO = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85";

const pillars = [
  { id: "lighting-solutions", title: "Lighting Solutions", tagline: "Versatile lighting for every home and business.", color: "#0EBBF0", bg: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=85", href: "/products/lighting-solutions" },
  { id: "wiring-device",      title: "Wiring Device",      tagline: "Premium switches, sockets, and accessories.",  color: "#0880B8", bg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=900&q=85", href: "/products/wiring-device" },
  { id: "designer-lightings", title: "Designer Lightings", tagline: "Architectural fixtures that elevate any space.", color: "#0EBBF0", bg: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=900&q=85", href: "/products/designer-lightings" },
  { id: "smart-solutions",    title: "Smart Solutions",    tagline: "Intelligent lighting for a connected lifestyle.", color: "#0880B8", bg: "https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=85", href: "/products/smart-solutions" },
];

const highlights = [
  { icon: "award", title: "First in LED",         desc: "Pioneer of LED lighting in the Philippines since 2005 — leading the industry for over 20 years." },
  { icon: "store", title: "170+ Retail Outlets",  desc: "Nationwide coverage at Wilcon Depot, Ace Hardware, CW Home Depot, and more." },
  { icon: "hotel", title: "Trusted by Hotels",    desc: "Powering iconic establishments like Solaire, Dusit Thani, and the Henan Group of Hotels." },
  { icon: "flag",  title: "Proudly Filipino",     desc: "Established in 2002 and growing ever since — a company built for the Filipino market." },
];

const stats = [
  { value: "20+",  label: "Years of Excellence" },
  { value: "170+", label: "Retail Outlets" },
  { value: "1000+",label: "Products" },
  { value: "2005", label: "Year LED Pioneer" },
];

function HIcon({ name }: { name: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "award": return <svg {...p}><circle cx="12" cy="9" r="6"/><path d="M8 14l-2 7 6-3 6 3-2-7"/></svg>;
    case "store": return <svg {...p}><path d="M3 9l1-5h16l1 5"/><path d="M4 9v11h16V9"/><path d="M10 20v-6h4v6"/></svg>;
    case "hotel": return <svg {...p}><path d="M3 20V8h18v12"/><path d="M3 14h18"/><circle cx="8" cy="11" r="1.2"/><path d="M3 20H2"/><path d="M22 20h-1"/></svg>;
    case "flag":  return <svg {...p}><path d="M4 22V4"/><path d="M4 5h12l-2 4 2 4H4"/></svg>;
    default:      return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

export default function Home() {
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

  const addRef = (el: HTMLElement | null) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <style>{`
        @keyframes hero-zoom { 0%{transform:scale(1.04) translate(0,0)} 50%{transform:scale(1.08) translate(-1%,1%)} 100%{transform:scale(1.04) translate(0,0)} }
        @keyframes hero-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes pc-drift-0 { 0%,100%{transform:scale(1.05) translate(0,0)} 50%{transform:scale(1.10) translate(-1.5%,1.5%)} }
        @keyframes pc-drift-1 { 0%,100%{transform:scale(1.05) translate(0,0)} 50%{transform:scale(1.10) translate(1.5%,-1%)} }
        @keyframes pc-drift-2 { 0%,100%{transform:scale(1.05) translate(0,0)} 50%{transform:scale(1.10) translate(-1%,-1.5%)} }
        @keyframes pc-drift-3 { 0%,100%{transform:scale(1.05) translate(0,0)} 50%{transform:scale(1.10) translate(1%,1%)} }
        @keyframes pc-beam-pulse { 0%,100%{opacity:.45} 50%{opacity:.85} }
        .pillar-card:hover .pc-arrow { transform:translateX(5px) !important; }
        @media (max-width:900px) { .pillars-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:520px) { .pillars-grid { grid-template-columns:1fr !important; } }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "8rem 2rem 4rem",
        background: "var(--paper)",
      }}>
        {/* Lifestyle photo — slow Ken Burns zoom */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_PHOTO})`,
          backgroundSize: "cover", backgroundPosition: "center 35%",
          animation: "hero-zoom 18s ease-in-out infinite",
          filter: "saturate(0.9) brightness(1.05)",
        }} />
        {/* White-wash overlay — photo dissolves into paper */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(246,250,253,0.62) 40%, rgba(255,255,255,0.85) 75%, var(--paper) 100%)",
        }} />
        {/* Soft cyan radial glow */}
        <div style={{
          position: "absolute", top: "40%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "900px", height: "900px",
          background: "radial-gradient(circle, rgba(14,187,240,0.10) 0%, transparent 65%)",
          mixBlendMode: "multiply", pointerEvents: "none",
        }} />
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(14,187,240,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(14,187,240,0.04) 1px,transparent 1px)`,
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", zIndex: 1, maxWidth: "960px", position: "relative" }}
          className="animate-fade-up">
          {/* Status pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid rgba(14,187,240,0.40)",
            padding: "0.4rem 1.2rem", borderRadius: "100px", marginBottom: "2rem",
            background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
          }}>
            <span style={{
              display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--azure)", boxShadow: "0 0 8px rgba(14,187,240,0.5)",
              animation: "hero-pulse 2s ease-in-out infinite",
            }} />
            <span style={{ color: "var(--azure-deep)", fontSize: "0.7rem", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, letterSpacing: "0.25em" }}>
              PHILIPPINES' LED PIONEER SINCE 2005
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            <span style={{ fontSize: "clamp(1.2rem,3vw,2.2rem)", color: "var(--text)", letterSpacing: "0.15em", display: "block", fontWeight: 300, marginBottom: "0.25rem" }}>
              POWERED BY
            </span>
            <span className="azure-text" style={{ fontSize: "clamp(2.6rem,8vw,6.5rem)", display: "block" }}>
              INNOVATION
            </span>
          </h1>

          <div className="divider" style={{ margin: "2rem auto", maxWidth: "400px" }}>
            <span style={{ color: "var(--azure)", fontSize: "0.8rem" }}>◆</span>
          </div>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(1rem,2vw,1.3rem)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "3rem", lineHeight: 1.7 }}>
            From general lighting to smart solutions — Landlite Philippines Corporation<br />
            brings quality, innovation, and design to every corner of your space.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="#pillars" className="azure-btn" style={{ padding: "1rem 2.5rem", borderRadius: "4px", fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}>
              EXPLORE PRODUCTS
            </Link>
            <Link href="/about" className="outline-btn" style={{
              padding: "1rem 2.5rem", borderRadius: "4px", fontSize: "0.9rem",
              textDecoration: "none", display: "inline-block",
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
            }}>ABOUT US</Link>
          </div>

          {/* Stats */}
          <div style={{ marginTop: "5rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "var(--azure)", lineHeight: 1, textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", letterSpacing: "0.1em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          animation: "float 2s ease-in-out infinite", zIndex: 2,
        }}>
          <span style={{ color: "var(--azure-deep)", fontSize: "0.65rem", letterSpacing: "0.2em", fontFamily: "'Exo 2',sans-serif", opacity: 0.6 }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--azure), transparent)" }} />
        </div>
      </section>

      {/* ── FOUR PILLARS ──────────────────────────────────── */}
      <section id="pillars" style={{ padding: "0 2rem 6rem", position: "relative", zIndex: 1, background: "var(--paper)" }}>
        <div ref={addRef} className="reveal" style={{ textAlign: "center", padding: "5rem 0 3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ OUR PRODUCT PILLARS ◆</p>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: "1rem" }}>
            Four Pillars of <span className="azure-text">Illumination</span>
          </h2>
          <p className="section-subtitle" style={{ fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
            Every lighting need, covered. From the simplest bulb to the smartest system.
          </p>
        </div>

        <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", maxWidth: "1280px", margin: "0 auto" }}>
          {pillars.map((pillar, i) => (
            <Link key={pillar.id} href={pillar.href} className="pillar-card reveal" ref={addRef as never}
              style={{
                display: "block", position: "relative", overflow: "hidden",
                textDecoration: "none", height: "360px",
                background: "var(--paper)", borderRadius: "14px",
                border: "1px solid rgba(5,13,26,0.06)",
                boxShadow: "0 4px 16px rgba(5,13,26,0.06)",
                animationDelay: `${i * 0.12}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(5,13,26,0.10), 0 0 32px rgba(14,187,240,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(5,13,26,0.06)";
              }}
            >
              {/* Photo with Ken Burns */}
              <div className="pc-img" style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${pillar.bg})`,
                backgroundSize: "cover", backgroundPosition: "center",
                animation: `pc-drift-${i} ${14 + i * 2}s ease-in-out infinite`,
                transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
              }} />
              {/* Fade photo into white at bottom */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 65%, rgba(255,255,255,0.95) 95%, var(--paper) 100%)",
                pointerEvents: "none",
              }} />
              {/* Light beam */}
              <div className="pc-beam" style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "120px", height: "60%",
                background: `radial-gradient(ellipse 40% 100% at 50% 0%, ${pillar.color}40 0%, transparent 70%)`,
                opacity: 0.6, pointerEvents: "none",
                animation: `pc-beam-pulse ${4 + i}s ease-in-out infinite`,
              }} />
              {/* Number chip */}
              <div style={{
                position: "absolute", top: "12px", left: "14px",
                fontFamily: "'Exo 2',sans-serif", fontWeight: 700,
                fontSize: "0.65rem", letterSpacing: "0.25em", color: "#FFFFFF",
                background: `linear-gradient(135deg, ${pillar.color}, var(--azure-deep))`,
                padding: "0.4rem 0.85rem", borderRadius: "100px",
                boxShadow: `0 4px 14px ${pillar.color}55`,
                zIndex: 2,
              }}>0{i + 1}</div>
              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.4rem 1.4rem", zIndex: 2 }}>
                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--text)", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                  {pillar.tagline}
                </p>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: pillar.color, letterSpacing: "0.2em", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  EXPLORE <span className="pc-arrow" style={{ display: "inline-block", transition: "transform 0.3s" }}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY LANDLITE ──────────────────────────────────── */}
      <section style={{ padding: "8rem 2rem", background: "linear-gradient(180deg, var(--paper) 0%, var(--sky) 50%, var(--paper) 100%)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ WHY LANDLITE ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: "1rem" }}>
              Trusted by <span className="azure-text">Thousands</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Two decades of lighting excellence, backed by quality you can see and feel.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "2rem" }}>
            {highlights.map((h, i) => (
              <div key={h.title} ref={addRef} className="reveal card-hover"
                style={{ padding: "2.5rem 2rem", borderRadius: "8px", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: `${i * 0.15}s` }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(14,187,240,0.10)", border: "1px solid rgba(14,187,240,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azure-deep)", marginBottom: "1.25rem" }}>
                  <HIcon name={h.icon} />
                </div>
                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.75rem" }}>{h.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER BANNER ────────────────────────────────── */}
      <section style={{ padding: "4rem 2rem", background: "var(--frost)", borderTop: "1px solid rgba(5,13,26,0.06)", borderBottom: "1px solid rgba(5,13,26,0.06)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>ALSO AVAILABLE AT</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            {["Wilcon Depot","Ace Hardware","CW Home Depot","MC Home Depot","Handyman","Citi Hardware"].map((p) => (
              <span key={p} style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text-muted)", letterSpacing: "0.05em", padding: "0.6rem 1.1rem", border: "1px solid rgba(5,13,26,0.08)", background: "var(--paper)", borderRadius: "4px", boxShadow: "0 1px 2px rgba(5,13,26,0.04)" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: "8rem 2rem", position: "relative", zIndex: 1, background: "var(--paper)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(14,187,240,0.10) 0%, transparent 65%)", mixBlendMode: "multiply", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div ref={addRef} className="reveal">
            <p className="section-label" style={{ marginBottom: "1rem" }}>◆ READY TO ILLUMINATE ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: "1.5rem" }}>
              Find a <span className="azure-text">Landlite</span> Near You
            </h2>
            <p className="section-subtitle" style={{ fontSize: "1.1rem", marginBottom: "3rem" }}>
              With 170+ retail outlets nationwide and an online store, Landlite lighting is always within reach.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/outlets" className="azure-btn" style={{ padding: "1rem 2.5rem", borderRadius: "4px", fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}>FIND OUTLET</Link>
              <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ padding: "1rem 2.5rem", borderRadius: "4px", fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}>SHOP ONLINE</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(14,187,240,0.25)", padding: "4rem 2rem 2rem", background: "var(--ink)", color: "var(--text-inv)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "var(--azure-light)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>LANDLITE</div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "var(--text-inv-muted)", lineHeight: 1.7, fontStyle: "italic" }}>
                Illuminate Your World.<br />Established in 2002, LED Pioneer since 2005.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                {[{ l: "FB", h: "https://www.facebook.com/landlitephils" }, { l: "IG", h: "https://www.instagram.com/landlitephils/?hl=en" }, { l: "YT", h: "https://www.youtube.com/channel/UCj9jjlvk4BRcKOoWVPnUekw/featured" }].map((s) => (
                  <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", border: "1px solid rgba(14,187,240,0.4)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "var(--azure-light)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(14,187,240,0.12)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}>{s.l}</a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--azure-light)", marginBottom: "1.25rem" }}>OUR PRODUCTS</p>
              {["Lighting Solutions","Wiring Device","Designer Lightings","Smart Solutions"].map((p) => (
                <Link key={p} href={`/products/${p.toLowerCase().replace(/ /g,"-")}`} style={{ display: "block", marginBottom: "0.6rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "var(--text-inv-muted)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "var(--azure-light)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-inv-muted)"; }}>{p}</Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--azure-light)", marginBottom: "1.25rem" }}>COMPANY</p>
              {[{l:"About Us",h:"/about"},{l:"Outlets",h:"/outlets"},{l:"Contact Us",h:"/contact"},{l:"Careers",h:"/contact#careers"}].map((l) => (
                <Link key={l.l} href={l.h} style={{ display: "block", marginBottom: "0.6rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "var(--text-inv-muted)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "var(--azure-light)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-inv-muted)"; }}>{l.l}</Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--azure-light)", marginBottom: "1.25rem" }}>CONTACT</p>
              {["KM17 West Service Road, Parañaque City","+632 7358-8855","sales@landlitephilcorp.com","Mon–Fri 8am–5pm | Sat 8am–2:30pm"].map((item) => (
                <p key={item} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text-inv-muted)", marginBottom: "0.5rem", lineHeight: 1.5 }}>{item}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(14,187,240,0.18)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(176,220,255,0.40)" }}>
              © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
            </p>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.7rem", color: "var(--azure-light)", letterSpacing: "0.1em", opacity: 0.5 }}>ILLUMINATE YOUR WORLD</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
