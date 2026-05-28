"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ scrolled = false }: { scrolled?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navHeight = navRef.current?.offsetHeight ?? 68;

  const productLinks = [
    { href: "/products/lighting-solutions", label: "Lighting Solutions" },
    { href: "/products/wiring-device",      label: "Wiring Device" },
    { href: "/products/designer-lightings", label: "Designer Lightings" },
    { href: "/products/smart-solutions",    label: "Smart Solutions" },
  ];
  const navLinks = [
    { href: "/",                 label: "Home" },
    { href: "/about",            label: "About Us" },
    { href: "/outlets",          label: "Outlets" },
    { href: "/contact",          label: "Contact Us" },
  ];

  return (
    <>
      <style>{`
        .lpc-desktop-nav { display: none; }
        .lpc-hamburger    { display: flex; }
        @media (min-width: 768px) {
          .lpc-desktop-nav { display: flex; }
          .lpc-hamburger    { display: none; }
        }
      `}</style>

      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0.85rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.0)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(14,187,240,0.18)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 12px rgba(5,13,26,0.07)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="Landlite Philippines Corporation"
            width={180} height={60} priority
            style={{
              height: "44px", width: "auto", objectFit: "contain",
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: scrolled ? "auto" : "none",
            }}
          />
        </Link>

        <div className="lpc-desktop-nav" style={{ gap: "1.5rem", alignItems: "center" }}>
          <Link href="/" className="nav-link"
            style={{ color: pathname === "/" ? "var(--azure-deep)" : undefined }}>
            Home
          </Link>

          <div
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setProductsOpen(true); }}
            onMouseLeave={() => { closeTimer.current = setTimeout(() => setProductsOpen(false), 300); }}
            style={{ position: "relative" }}
          >
            <span className="nav-link" style={{
              color: pathname.startsWith("/products") ? "var(--azure-deep)" : undefined,
              display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer",
            }}>
              Our Products <span style={{ fontSize: "0.5rem", color: "var(--azure)" }}>▼</span>
            </span>

            {productsOpen && (
              <div style={{
                position: "absolute", top: "100%", left: "50%",
                transform: "translateX(-50%)", marginTop: "0.6rem",
                background: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(14,187,240,0.22)",
                borderRadius: "6px", padding: "0.5rem 0",
                backdropFilter: "blur(20px)",
                minWidth: "200px",
                boxShadow: "0 12px 40px rgba(5,13,26,0.12)",
                zIndex: 110,
              }}>
                <div style={{ position: "absolute", top: "-12px", left: 0, right: 0, height: "12px" }} />
                <div style={{
                  position: "absolute", top: "-6px", left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: "10px", height: "10px",
                  background: "rgba(255,255,255,0.98)",
                  borderTop: "1px solid rgba(14,187,240,0.22)",
                  borderLeft: "1px solid rgba(14,187,240,0.22)",
                }} />
                {productLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setProductsOpen(false)}
                    style={{
                      display: "block", padding: "0.65rem 1.25rem",
                      fontFamily: "'Exo 2', sans-serif", fontSize: "0.82rem",
                      fontWeight: 500, letterSpacing: "0.03em",
                      color: pathname === link.href ? "var(--azure-deep)" : "var(--text-muted)",
                      textDecoration: "none", transition: "all 0.2s ease",
                      borderLeft: pathname === link.href ? "2px solid var(--azure)" : "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(14,187,240,0.08)";
                      e.currentTarget.style.color = "var(--azure-deep)";
                      e.currentTarget.style.borderLeft = "2px solid var(--azure)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = pathname === link.href ? "var(--azure-deep)" : "var(--text-muted)";
                      e.currentTarget.style.borderLeft = pathname === link.href ? "2px solid var(--azure)" : "2px solid transparent";
                    }}
                  >{link.label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Lighting Design — highlighted tab */}
          <Link href="/lighting-design" style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.4rem 0.9rem", borderRadius: "100px",
            fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.8rem",
            letterSpacing: "0.05em", textDecoration: "none",
            background: pathname === "/lighting-design"
              ? "linear-gradient(135deg, var(--azure-deep), var(--azure))"
              : "rgba(14,187,240,0.08)",
            color: pathname === "/lighting-design" ? "#fff" : "var(--azure-deep)",
            border: "1px solid rgba(14,187,240,0.30)",
            transition: "all 0.25s ease",
            boxShadow: pathname === "/lighting-design" ? "0 4px 14px rgba(14,187,240,0.35)" : "none",
          }}
            onMouseOver={(e) => {
              if (pathname !== "/lighting-design") {
                e.currentTarget.style.background = "rgba(14,187,240,0.14)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(14,187,240,0.18)";
              }
            }}
            onMouseOut={(e) => {
              if (pathname !== "/lighting-design") {
                e.currentTarget.style.background = "rgba(14,187,240,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
              <path d="M9 18h6"/><path d="M10 22h4"/>
            </svg>
            Lighting Design
          </Link>

          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="nav-link"
              style={{ color: pathname === link.href ? "var(--azure-deep)" : undefined }}>
              {link.label}
            </Link>
          ))}

          <a href="https://landlitephilcorp.com/collections/all"
            target="_blank" rel="noopener noreferrer"
            className="azure-btn"
            style={{ padding: "0.55rem 1.25rem", borderRadius: "4px", fontSize: "0.8rem", textDecoration: "none" }}>
            SHOP NOW
          </a>
        </div>

        <button className="lpc-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            background: "none", border: "1px solid rgba(14,187,240,0.3)",
            color: "var(--azure-deep)", fontSize: "1.2rem",
            cursor: "pointer", padding: "0.4rem 0.6rem", borderRadius: "4px",
          }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: `${navHeight}px`, left: 0, right: 0, zIndex: 99,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem",
          borderBottom: "1px solid rgba(14,187,240,0.22)",
          boxShadow: "0 12px 24px rgba(5,13,26,0.08)",
          maxHeight: `calc(100vh - ${navHeight}px)`, overflowY: "auto",
        }}>
          <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize: "1rem" }}>Home</Link>
          <div>
            <p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--azure-deep)", marginBottom: "0.5rem" }}>
              OUR PRODUCTS
            </p>
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "0.5rem 0 0.5rem 1rem",
                fontFamily: "'Exo 2', sans-serif", fontSize: "0.9rem",
                color: pathname === link.href ? "var(--azure-deep)" : "var(--text-muted)",
                textDecoration: "none",
                borderLeft: pathname === link.href ? "2px solid var(--azure)" : "1px solid rgba(14,187,240,0.2)",
              }}>{link.label}</Link>
            ))}
          </div>
          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="nav-link"
              onClick={() => setMenuOpen(false)} style={{ fontSize: "1rem" }}>
              {link.label}
            </Link>
          ))}
          {/* Lighting Design — mobile */}
          <Link href="/lighting-design" onClick={() => setMenuOpen(false)} style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.65rem 1rem", borderRadius: "8px", textDecoration: "none",
            fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.88rem",
            background: pathname === "/lighting-design" ? "linear-gradient(135deg,var(--azure-deep),var(--azure))" : "rgba(14,187,240,0.08)",
            color: pathname === "/lighting-design" ? "#fff" : "var(--azure-deep)",
            border: "1px solid rgba(14,187,240,0.28)",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
              <path d="M9 18h6"/><path d="M10 22h4"/>
            </svg>
            Lighting Design
          </Link>
          <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
            className="azure-btn" style={{ padding: "0.75rem 1.5rem", borderRadius: "4px", fontSize: "0.85rem", textDecoration: "none", textAlign: "center", display: "block", marginTop: "0.5rem" }}>
            SHOP NOW
          </a>
        </div>
      )}

      {/* Facebook Messenger FAB */}
      <a href="https://www.facebook.com/landlitephils" target="_blank" rel="noopener noreferrer"
        aria-label="Message us on Facebook"
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem",
          width: "60px", height: "60px", borderRadius: "50%",
          background: "linear-gradient(135deg, #0EBBF0 0%, #0055FF 100%)",
          boxShadow: "0 12px 28px rgba(14,187,240,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", zIndex: 90,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(14,187,240,0.6), 0 0 0 6px rgba(14,187,240,0.1)"; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(14,187,240,0.45)"; }}
      >
        <svg width="28" height="28" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M120 0C53.7 0 0 49.6 0 110.7c0 32.7 15.3 62 39.5 81.7v40.6c0 4.4 5.1 6.9 8.6 4.2l36.5-26.7c11.2 3.1 23 4.8 35.4 4.8 66.3 0 120-49.6 120-110.7C240 49.6 186.3 0 120 0zm12 142.7l-30-32-58.7 32 64-68 30 32 58-32-63.3 68z"/>
        </svg>
      </a>
    </>
  );
}
