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
    case "strip": return <svg {...p}><rect x="2" y="10" width="20" height="4" rx="1"/><circle cx="6" cy="12" r="0.7" fill="currentColor"/><circle cx="10" cy="12" r="0.7" fill="currentColor"/><circle cx="14" cy="12" r="0.7" fill="currentColor"/></svg>;
    case "pendant": return <svg {...p}><path d="M12 2v6"/><path d="M7 14c0-3 2-6 5-6s5 3 5 6"/><path d="M6 14h12"/><path d="M9 14v4"/><path d="M15 14v4"/><path d="M9 18h6"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

export default function DesignerLightingsPage() {
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => { const s = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1 });
    revealRefs.current.forEach((el) => { if (el) obs.observe(el); }); return () => obs.disconnect();
  }, []);
  const addRef = (el: HTMLElement | null) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar scrolled={scrolled} />

      <section style={{ position:"relative", overflow:"hidden", paddingTop:"clamp(80px,14vw,130px)", paddingBottom:"clamp(2rem,5vw,4rem)", paddingLeft:"clamp(1.25rem,6vw,5rem)", paddingRight:"clamp(1.25rem,6vw,5rem)", background:"linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(14,187,240,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.05) 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
        <div style={{ maxWidth:"1200px", margin:"0 auto", position:"relative", zIndex:1 }}>
          <nav style={{ fontFamily:"'Exo 2',sans-serif", fontSize:"0.7rem", letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"var(--text-muted-2)", marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" as const }}>
            <Link href="/" style={{ color:"var(--text-muted)", textDecoration:"none" }}>Home</Link>
            <span style={{ color:"#0EBBF0" }}>›</span>
            <Link href="/products" style={{ color:"var(--text-muted)", textDecoration:"none" }}>Products</Link>
            <span style={{ color:"#0EBBF0" }}>›</span>
            <span style={{ color:"var(--azure-deep)", fontWeight:600 }}>Designer</span>
          </nav>
          <div className="animate-fade-up">
            <p className="section-label" style={{ marginBottom:"0.75rem", color:"#0EBBF0" }}>◆ DESIGNER ◆</p>
            <h1 className="section-title" style={{ fontSize:"clamp(2rem,5vw,3.5rem)", marginBottom:"1rem" }}>Designer <span className="azure-text">Products</span></h1>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.05rem)", color:"var(--text-muted)", lineHeight:1.75, maxWidth:"700px", fontStyle:"italic" }}>Decorative and architectural lighting fixtures that transform any interior into an inspired space.</p>
          </div>
        </div>
      </section>

      <section style={{ padding:"4rem clamp(1.25rem,6vw,5rem) 7rem", background:"var(--paper)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.5rem" }}>
            
            <Link key="decorative-lighting" href="/products/designer-lightings/decorative-lighting" ref={addRef as never} className="reveal card-hover"
              style={{ display:"block", padding:"2rem", borderRadius:"14px", background:"var(--paper)", border:"1px solid rgba(5,13,26,0.06)", boxShadow:"0 2px 12px rgba(5,13,26,0.06)", textDecoration:"none", animationDelay:"0.0s", transition:"all 0.4s ease" }}>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"rgba(14,187,240,0.10)", border:"1px solid rgba(14,187,240,0.30)", display:"flex", alignItems:"center", justifyContent:"center", color:"#0EBBF0", marginBottom:"1.25rem" }}>
                <CIcon name="chandelier" size={26} />
              </div>
              <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"var(--text)", marginBottom:"0.4rem", letterSpacing:"-0.01em" }}>Decorative Lighting</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#0EBBF0", letterSpacing:"0.06em", textTransform:"uppercase" as const, marginBottom:"0.75rem" }}>Lighting Fixture</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"var(--text-muted)", lineHeight:1.6, marginBottom:"1rem" }}>Chandeliers, pendants, wall lamps, floor lamps, table lamps, and decorative outdoor fixtures designed to complement ever…</p>
              <span style={{ fontFamily:"'Exo 2',sans-serif", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.2em", color:"#0EBBF0" }}>EXPLORE →</span>
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop:"1px solid rgba(5,13,26,0.08)", padding:"2rem", background:"var(--ink)", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:"rgba(176,220,255,0.35)" }}>© {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
