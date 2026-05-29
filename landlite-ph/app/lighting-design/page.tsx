"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// ── Data ──────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: "home",
    title: "Residential Design",
    subtitle: "Condos · Houses · Apartments",
    desc: "Room-by-room lighting plans tailored to your lifestyle. We balance ambiance, task lighting, and energy efficiency for every space in your home.",
    features: ["Mood & scene planning", "Fixture selection per room", "Energy & cost estimate", "Smart home integration"],
    color: "#0EBBF0",
  },
  {
    icon: "building",
    title: "Commercial Design",
    subtitle: "Offices · Retail · Restaurants",
    desc: "Lighting that works as hard as you do. We design systems that boost productivity, attract customers, and meet commercial code requirements.",
    features: ["Lux-level compliance", "Brand-aligned aesthetics", "Emergency & exit lighting", "Maintenance planning"],
    color: "#0880B8",
    featured: true,
  },
  {
    icon: "hotel",
    title: "Hospitality Design",
    subtitle: "Hotels · Resorts · Event Spaces",
    desc: "Create unforgettable guest experiences with precision-crafted lighting scenes. From lobby grandeur to intimate suite warmth.",
    features: ["Scene & ambiance design", "Pool & outdoor lighting", "Architectural feature lighting", "Turnkey project support"],
    color: "#0EBBF0",
  },
];

const process = [
  { step: "01", icon: "chat",     title: "Free Consultation",   desc: "Tell us about your space, style, and goals. Our lighting specialist will ask the right questions to understand your vision." },
  { step: "02", icon: "measure",  title: "Space Assessment",    desc: "We review your floor plans, photos, or conduct a site visit. We map every zone, ceiling height, natural light source, and activity area." },
  { step: "03", icon: "design",   title: "Custom Lighting Plan", desc: "We deliver a full lighting layout with fixture recommendations, lux calculations, color temperatures, control zones, and a full cost estimate." },
  { step: "04", icon: "sparkle",  title: "Procurement & Support", desc: "Order directly through Landlite at preferred pricing. We stay with you through installation, commissioning, and final sign-off." },
];

const spaceTypes = [
  { label: "Living Room",   bg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",   icon: "sofa" },
  { label: "Bedroom",       bg: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",   icon: "bed" },
  { label: "Kitchen",       bg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",      icon: "kitchen" },
  { label: "Dining Room",   bg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",      icon: "dining" },
  { label: "Office",        bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",   icon: "desk" },
  { label: "Bathroom",      bg: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",      icon: "bath" },
  { label: "Outdoor",       bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",      icon: "outdoor" },
  { label: "Lobby / Hall",  bg: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=600&q=80",   icon: "lobby" },
];

const expertise = [
  { value: "500+", label: "Projects Completed" },
  { value: "20+",  label: "Years Experience" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "4x",   label: "Avg. Energy Savings" },
];

const faqs = [
  { q: "Is the initial consultation free?", a: "Yes. Your first 30-minute consultation with a Landlite lighting specialist is completely free, with no obligation to purchase." },
  { q: "Do I need to have floor plans ready?", a: "Not necessarily. We can work from photos, rough sketches, or conduct a site visit. Detailed floor plans help us deliver more accurate lighting calculations, but they're not required to get started." },
  { q: "How long does a lighting design take?", a: "A typical residential condo or house takes 3–7 business days from assessment to final plan. Commercial and hospitality projects vary based on scope — we'll give you a firm timeline after the initial consultation." },
  { q: "Can you design for a renovation in progress?", a: "Absolutely — it's actually the ideal time. We can coordinate with your contractor and architect to ensure conduit runs, switch positions, and dimmer circuits are all planned before walls are closed." },
  { q: "Are Landlite products the only option?", a: "Our design service is built around the Landlite product range, which covers general, designer, wiring, and smart lighting. For specialist requirements outside our catalog, we'll advise accordingly." },
  { q: "What if I only need advice on one room?", a: "We handle any scope — a single bedroom refresh, a full condo fit-out, or an entire hotel. Just tell us what you need." },
];

// ── SVG icons ─────────────────────────────────────────────────────────────────
function Icon({ name, size = 24, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "home":     return <svg {...p}><path d="M3 10l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/></svg>;
    case "building": return <svg {...p}><rect x="3" y="2" width="18" height="20" rx="1"/><path d="M9 22V12h6v10"/><path d="M8 6h1"/><path d="M15 6h1"/><path d="M8 10h1"/><path d="M15 10h1"/></svg>;
    case "hotel":    return <svg {...p}><path d="M3 20V8h18v12"/><path d="M3 14h18"/><circle cx="8" cy="11" r="1.2"/></svg>;
    case "chat":     return <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case "measure":  return <svg {...p}><path d="M3 21l18-18"/><path d="M6.5 17.5L5 19"/><path d="M10 14l-1.5 1.5"/><path d="M13.5 10.5L12 12"/><path d="M17 7l-1.5 1.5"/></svg>;
    case "design":   return <svg {...p}><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>;
    case "sparkle":  return <svg {...p}><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>;
    case "check":    return <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>;
    case "chevron":  return <svg {...p}><polyline points="6 9 12 15 18 9"/></svg>;
    case "arrow":    return <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
    case "bulb":     return <svg {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
    case "phone":    return <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    case "mail":     return <svg {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LightingDesignPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", spaceType: "", size: "", style: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <style>{`
        @keyframes ld-hero-zoom { 0%,100%{transform:scale(1.04)} 50%{transform:scale(1.08) translate(-0.5%,0.5%)} }
        @keyframes ld-beacon { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes ld-beam-in { from{opacity:0;transform:scaleY(0)} to{opacity:1;transform:scaleY(1)} }
        @keyframes ld-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ld-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes ld-count { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        .ld-service-card { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .ld-service-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(5,13,26,0.12), 0 0 40px rgba(14,187,240,0.14) !important; border-color: rgba(14,187,240,0.35) !important; }

        .ld-space-card { transition: all 0.3s ease; overflow: hidden; }
        .ld-space-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(5,13,26,0.12) !important; }
        .ld-space-card:hover .ld-space-img { transform: scale(1.07); }
        .ld-space-img { transition: transform 0.5s ease; }

        .ld-process-step { position: relative; }
        .ld-process-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 32px; left: calc(100% + 0px);
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(14,187,240,0.4), rgba(14,187,240,0.1));
        }
        @media (max-width: 900px) { .ld-process-step::after { display: none; } }

        .ld-faq-item { transition: border-color 0.2s ease; }
        .ld-faq-item:hover { border-color: rgba(14,187,240,0.30) !important; }

        .ld-input:focus { outline: none; border-color: var(--azure) !important; box-shadow: 0 0 0 3px rgba(14,187,240,0.12); }
        .ld-input { transition: border-color 0.2s ease, box-shadow 0.2s ease; }

        .ld-submit-btn { transition: all 0.3s ease; }
        .ld-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(14,187,240,0.45); }

        @media (max-width: 768px) {
          .ld-services-grid { grid-template-columns: 1fr !important; }
          .ld-process-grid  { grid-template-columns: 1fr 1fr !important; }
          .ld-spaces-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .ld-form-row      { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .ld-process-grid { grid-template-columns: 1fr !important; }
          .ld-spaces-grid  { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "8rem 2rem 5rem",
      }}>
        {/* Background photo */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85)",
          backgroundSize: "cover", backgroundPosition: "center 40%",
          animation: "ld-hero-zoom 20s ease-in-out infinite",
        }} />
        {/* Gradient wash */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(255,255,255,0.95) 0%, rgba(246,250,253,0.88) 38%, rgba(232,243,251,0.72) 58%, rgba(14,187,240,0.08) 100%)",
        }} />
        {/* Subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(14,187,240,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.04) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
        {/* Azure radial glow */}
        <div style={{ position: "absolute", top: "45%", left: "55%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(14,187,240,0.10) 0%, transparent 65%)", mixBlendMode: "multiply", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "680px" }} className="animate-fade-up">
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.4rem 1rem 0.4rem 0.7rem", borderRadius: "100px", background: "rgba(14,187,240,0.08)", border: "1px solid rgba(14,187,240,0.30)", marginBottom: "2rem" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, var(--azure-deep), var(--azure))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="bulb" size={14} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.22em", color: "var(--azure-deep)", textTransform: "uppercase" }}>
                PROFESSIONAL LIGHTING DESIGN SERVICE
              </span>
            </div>

            <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.5rem", letterSpacing: "-0.025em", color: "var(--text)" }}>
              <span style={{ display: "block", fontSize: "clamp(2.4rem,6vw,5rem)" }}>Light Your Space</span>
              <span style={{ display: "block", fontSize: "clamp(2.4rem,6vw,5rem)" }}>
                the <span className="azure-text">Right Way.</span>
              </span>
            </h1>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(1rem,1.6vw,1.2rem)", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2.5rem", fontStyle: "italic", maxWidth: "560px" }}>
              Not sure which bulb, fixture, or lighting plan fits your condo, house, or business? Our specialists design a custom lighting solution for your exact space — from a single room to a full building.
            </p>

            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
              <a href="#consult" className="azure-btn" style={{ padding: "1rem 2.25rem", borderRadius: "6px", fontSize: "0.88rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
                GET FREE CONSULTATION <Icon name="arrow" size={16} color="#fff" />
              </a>
              <a href="#how-it-works" className="outline-btn" style={{ padding: "1rem 2.25rem", borderRadius: "6px", fontSize: "0.88rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)" }}>
                HOW IT WORKS
              </a>
            </div>

            {/* Trust row */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[{ v: "Free", l: "Initial consult" }, { v: "3–7 days", l: "Design turnaround" }, { v: "20+ yrs", l: "Expert experience" }].map((t) => (
                <div key={t.l} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--azure)", animation: "ld-beacon 2s ease-in-out infinite", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "var(--azure-deep)" }}>{t.v}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text-muted)" }}>{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", animation: "ld-float 2.5s ease-in-out infinite", zIndex: 2 }}>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--azure-deep)", opacity: 0.55 }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--azure), transparent)" }} />
        </div>
      </section>

      {/* ══ EXPERTISE STATS ══════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(14,187,240,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.06) 1px,transparent 1px)`, backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(2rem,6vw,6rem)", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          {expertise.map((e, i) => (
            <div key={e.label} ref={addRef} className="reveal" style={{ textAlign: "center", animationDelay: `${i * 0.1}s` }}>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1, marginBottom: "0.3rem", background: "linear-gradient(135deg, var(--azure-light), var(--azure))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {e.value}
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text-inv-muted)", letterSpacing: "0.06em" }}>{e.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "7rem 2rem", background: "linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ OUR DESIGN SERVICES ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: "1rem" }}>
              Every Space, <span className="azure-text">Perfectly Lit</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: "560px", margin: "0 auto" }}>
              Whether it's a 30 sqm condo unit or a 5-star resort, we have the expertise and product range to deliver.
            </p>
          </div>

          <div className="ld-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", alignItems: "stretch" }}>
            {services.map((s, i) => (
              <div key={s.title} ref={addRef} className="reveal ld-service-card"
                style={{
                  borderRadius: "16px", padding: "2.5rem 2rem",
                  background: s.featured ? "linear-gradient(145deg, var(--ink) 0%, #0d1f35 100%)" : "var(--paper)",
                  border: s.featured ? "1px solid rgba(14,187,240,0.35)" : "1px solid rgba(5,13,26,0.06)",
                  boxShadow: s.featured ? "0 12px 40px rgba(5,13,26,0.25), 0 0 60px rgba(14,187,240,0.12)" : "0 2px 12px rgba(5,13,26,0.06)",
                  animationDelay: `${i * 0.12}s`,
                  position: "relative", overflow: "hidden",
                }}>
                {s.featured && (
                  <div style={{ position: "absolute", top: "16px", right: "16px", fontFamily: "'Exo 2',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", padding: "0.3rem 0.75rem", borderRadius: "100px", background: "linear-gradient(135deg, var(--azure-deep), var(--azure))", color: "#fff" }}>
                    MOST POPULAR
                  </div>
                )}
                {s.featured && <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,187,240,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />}

                <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: s.featured ? "rgba(14,187,240,0.15)" : `${s.color}14`, border: `1px solid ${s.featured ? "rgba(14,187,240,0.4)" : s.color + "40"}`, display: "flex", alignItems: "center", justifyContent: "center", color: s.featured ? "var(--azure-light)" : s.color, marginBottom: "1.5rem" }}>
                  <Icon name={s.icon} size={26} />
                </div>

                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: s.featured ? "var(--text-inv)" : "var(--text)", marginBottom: "0.3rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", color: s.featured ? "var(--azure-light)" : s.color, marginBottom: "1rem", textTransform: "uppercase" }}>{s.subtitle}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: s.featured ? "var(--text-inv-muted)" : "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.75rem" }}>{s.desc}</p>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: s.featured ? "rgba(176,220,255,0.85)" : "var(--text-muted)" }}>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: s.featured ? "rgba(14,187,240,0.2)" : `${s.color}18`, border: `1px solid ${s.featured ? "rgba(14,187,240,0.5)" : s.color + "50"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: s.featured ? "var(--azure-light)" : s.color }}>
                        <Icon name="check" size={10} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#consult" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: s.featured ? "var(--azure-light)" : s.color, textDecoration: "none", borderBottom: `1px solid ${s.featured ? "rgba(77,217,255,0.35)" : s.color + "50"}`, paddingBottom: "2px", transition: "all 0.2s" }}>
                  START HERE <Icon name="arrow" size={14} color={s.featured ? "var(--azure-light)" : s.color} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: "7rem 2rem", background: "var(--paper)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ THE PROCESS ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: "1rem" }}>
              From Blank Space to <span className="azure-text">Perfect Light</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: "520px", margin: "0 auto" }}>
              A clear, guided process — no jargon, no guesswork, just results.
            </p>
          </div>

          <div className="ld-process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
            {process.map((p, i) => (
              <div key={p.step} ref={addRef} className="reveal ld-process-step"
                style={{ animationDelay: `${i * 0.13}s`, textAlign: "center", padding: "0 0.5rem" }}>
                {/* Icon circle */}
                <div style={{ position: "relative", display: "inline-flex", marginBottom: "1.5rem" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(14,187,240,0.12), rgba(8,128,184,0.08))", border: "1.5px solid rgba(14,187,240,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azure-deep)", position: "relative", zIndex: 1 }}>
                    <Icon name={p.icon} size={26} />
                  </div>
                  <div style={{ position: "absolute", top: "-4px", right: "-8px", fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "0.65rem", letterSpacing: "0.1em", background: "linear-gradient(135deg, var(--azure-deep), var(--azure))", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "100px", zIndex: 2 }}>{p.step}</div>
                </div>
                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "0.6rem", letterSpacing: "-0.01em" }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPACE TYPES ═════════════════════════════════════════════════════ */}
      <section style={{ padding: "7rem 2rem", background: "var(--frost)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ SPACES WE DESIGN FOR ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: "1rem" }}>
              Any Room, Any <span className="azure-text">Vision</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: "520px", margin: "0 auto" }}>
              We've designed lighting for every type of space. Click yours to get started.
            </p>
          </div>

          <div className="ld-spaces-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
            {spaceTypes.map((space, i) => (
              <a key={space.label} href="#consult" ref={addRef} className="reveal ld-space-card card-hover"
                style={{ borderRadius: "12px", overflow: "hidden", textDecoration: "none", display: "block", background: "var(--paper)", border: "1px solid rgba(5,13,26,0.06)", boxShadow: "0 2px 8px rgba(5,13,26,0.06)", animationDelay: `${i * 0.07}s` }}>
                <div style={{ height: "140px", overflow: "hidden", position: "relative" }}>
                  <div className="ld-space-img" style={{ width: "100%", height: "100%", backgroundImage: `url(${space.bg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,13,26,0.55) 0%, transparent 60%)" }} />
                </div>
                <div style={{ padding: "0.9rem 1rem" }}>
                  <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", letterSpacing: "0.02em" }}>{space.label}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "var(--azure-deep)", marginTop: "0.2rem", letterSpacing: "0.04em" }}>Design this space →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONSULTATION FORM ════════════════════════════════════════════════ */}
      <section id="consult" style={{ padding: "7rem 2rem", background: "var(--paper)", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "30%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,187,240,0.07) 0%, transparent 70%)", mixBlendMode: "multiply", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

          {/* Left — copy */}
          <div ref={addRef} className="reveal">
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ FREE CONSULTATION ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", marginBottom: "1.25rem" }}>
              Tell Us About<br /><span className="azure-text">Your Space</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "2.5rem" }}>
              Fill in a few details and one of our lighting design specialists will reach out within 1 business day — no obligation, no pushy sales, just expert advice.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "phone", label: "+632 7358-8855", sub: "Mon–Fri 8am–5pm | Sat 8am–2:30pm" },
                { icon: "mail",  label: "design@landlitephilcorp.com", sub: "Response within 1 business day" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,187,240,0.08)", border: "1px solid rgba(14,187,240,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azure-deep)", flexShrink: 0 }}>
                    <Icon name={c.icon} size={20} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>{c.label}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "var(--text-muted)" }}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "1.5rem", borderRadius: "12px", background: "rgba(14,187,240,0.05)", border: "1px solid rgba(14,187,240,0.18)" }}>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", color: "var(--azure-deep)", marginBottom: "0.75rem", textTransform: "uppercase" }}>What to prepare</p>
              {["Approximate floor area (sqm)", "Photos of the space (if available)", "Budget range — rough estimate is fine", "Preferred style or inspiration photos"].map((tip) => (
                <div key={tip} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--azure)", flexShrink: 0 }} />
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem", color: "var(--text-muted)" }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div ref={addRef} className="reveal" style={{ animationDelay: "0.15s" }}>
            {submitted ? (
              <div style={{ padding: "4rem 2rem", borderRadius: "20px", background: "linear-gradient(145deg, var(--ink), #0d1f35)", border: "1px solid rgba(14,187,240,0.35)", textAlign: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, var(--azure-deep), var(--azure))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "0 0 40px rgba(14,187,240,0.4)" }}>
                  <Icon name="check" size={32} color="#fff" />
                </div>
                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "var(--text-inv)", marginBottom: "0.75rem" }}>Request Received!</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "var(--text-inv-muted)", lineHeight: 1.7, maxWidth: "340px", margin: "0 auto" }}>
                  Our lighting design team will contact you within 1 business day to schedule your free consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: "var(--paper)", borderRadius: "20px", padding: "2.5rem", border: "1px solid rgba(5,13,26,0.07)", boxShadow: "0 8px 32px rgba(5,13,26,0.08)" }}>
                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", marginBottom: "0.4rem" }}>Request Free Consultation</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "var(--text-muted)", marginBottom: "1.75rem" }}>We'll get back to you within 1 business day.</p>

                {/* Name + Email */}
                <div className="ld-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
                  {[{ key: "name", label: "Full Name", placeholder: "Juan dela Cruz", type: "text" }, { key: "email", label: "Email Address", placeholder: "juan@email.com", type: "email" }].map((field) => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} required className="ld-input"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid rgba(5,13,26,0.12)", background: "var(--frost)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text)" }} />
                    </div>
                  ))}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "0.85rem" }}>
                  <label style={{ display: "block", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Phone Number</label>
                  <input type="tel" placeholder="+63 9XX XXX XXXX" className="ld-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid rgba(5,13,26,0.12)", background: "var(--frost)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text)" }} />
                </div>

                {/* Space type + Size */}
                <div className="ld-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Space Type</label>
                    <select required className="ld-input"
                      value={formData.spaceType}
                      onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid rgba(5,13,26,0.12)", background: "var(--frost)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: formData.spaceType ? "var(--text)" : "var(--text-muted)" }}>
                      <option value="">Select type…</option>
                      {["Condo Unit", "House", "Apartment", "Office", "Retail Store", "Restaurant / Café", "Hotel / Resort", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Floor Area</label>
                    <select className="ld-input"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid rgba(5,13,26,0.12)", background: "var(--frost)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: formData.size ? "var(--text)" : "var(--text-muted)" }}>
                      <option value="">Select size…</option>
                      {["Under 30 sqm", "30–60 sqm", "60–100 sqm", "100–200 sqm", "200–500 sqm", "500+ sqm"].map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {/* Style preference */}
                <div style={{ marginBottom: "0.85rem" }}>
                  <label style={{ display: "block", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Preferred Style</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {["Modern / Minimalist", "Warm & Cozy", "Industrial", "Scandinavian", "Luxury / High-end", "Smart Home", "Not sure yet"].map((style) => (
                      <button type="button" key={style}
                        onClick={() => setFormData({ ...formData, style })}
                        style={{ padding: "0.4rem 0.85rem", borderRadius: "100px", fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s ease", border: formData.style === style ? "1px solid var(--azure)" : "1px solid rgba(5,13,26,0.12)", background: formData.style === style ? "rgba(14,187,240,0.10)" : "var(--frost)", color: formData.style === style ? "var(--azure-deep)" : "var(--text-muted)" }}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Tell Us More <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span></label>
                  <textarea rows={3} placeholder="Describe your space, current pain points, or inspiration. Attach a floor plan link if you have one." className="ld-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: "1px solid rgba(5,13,26,0.12)", background: "var(--frost)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text)", resize: "vertical", minHeight: "80px" }} />
                </div>

                <button type="submit" className="azure-btn ld-submit-btn"
                  style={{ width: "100%", padding: "1rem", borderRadius: "8px", fontSize: "0.88rem", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                  SEND MY REQUEST <Icon name="arrow" size={16} color="#fff" />
                </button>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "var(--text-muted-2)", textAlign: "center", marginTop: "0.85rem" }}>
                  Your information is private and will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "7rem 2rem", background: "var(--frost)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div ref={addRef} className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>◆ FAQ ◆</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              Common <span className="azure-text">Questions</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} ref={addRef} className="reveal ld-faq-item"
                style={{ borderRadius: "12px", border: `1px solid ${openFaq === i ? "rgba(14,187,240,0.30)" : "rgba(5,13,26,0.07)"}`, background: "var(--paper)", overflow: "hidden", animationDelay: `${i * 0.06}s` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: openFaq === i ? "var(--azure-deep)" : "var(--text)", letterSpacing: "-0.01em" }}>{faq.q}</span>
                  <div style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: openFaq === i ? "rgba(14,187,240,0.12)" : "rgba(5,13,26,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: openFaq === i ? "var(--azure-deep)" : "var(--text-muted)", transition: "all 0.25s", transform: openFaq === i ? "rotate(180deg)" : "none" }}>
                    <Icon name="chevron" size={16} />
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 1.5rem 1.25rem" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.75, borderTop: "1px solid rgba(5,13,26,0.06)", paddingTop: "1rem" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA STRIP ══════════════════════════════════════════════════ */}
      <section style={{ padding: "5rem 2rem", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(14,187,240,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.06) 1px,transparent 1px)`, backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(14,187,240,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--azure-light)", textTransform: "uppercase", marginBottom: "1rem", opacity: 0.8 }}>◆ GET STARTED TODAY ◆</p>
          <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-inv)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Your dream space is one conversation away.
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontStyle: "italic", color: "var(--text-inv-muted)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Book your free 30-minute consultation — and let Landlite's design team show you exactly what's possible.
          </p>
          <a href="#consult" className="azure-btn" style={{ padding: "1rem 2.5rem", borderRadius: "6px", fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
            BOOK FREE CONSULTATION <Icon name="arrow" size={16} color="#fff" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(14,187,240,0.20)", padding: "2rem", background: "var(--ink)", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(176,220,255,0.35)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
