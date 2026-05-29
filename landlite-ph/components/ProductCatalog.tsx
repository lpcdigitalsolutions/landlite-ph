"use client";

import { useState, useMemo } from "react";
import ProductCard, { type ProductCardData } from "@/components/ProductCard";

interface Props {
  products: ProductCardData[];
  accent?: string;
  title: string;
}

export default function ProductCatalog({ products, accent = "#0880B8", title }: Props) {
  const [searchQ,       setSearchQ]       = useState("");
  const [activeBrand,   setActiveBrand]   = useState("all");
  const [activeType,    setActiveType]    = useState("all");
  const [activeTemp,    setActiveTemp]    = useState("all");
  const [sidebarOpen,   setSidebarOpen]   = useState(true);

  // Derive unique filter options
  const brands = useMemo(() => {
    const b = Array.from(new Set(products.map((p) => (p as any).brand).filter(Boolean))).sort() as string[];
    return b.filter((v) => v && v !== "0");
  }, [products]);

  const types = useMemo(() => {
    const t = Array.from(new Set(products.map((p) => p.product_type).filter(Boolean))).sort() as string[];
    return t.filter((v) => v && v !== "0").slice(0, 20);
  }, [products]);

  const temps = useMemo(() => {
    const temps: string[] = [];
    products.forEach((p) => {
      const ct = (p as any).color_temp || "";
      if (ct.includes("WARM") || ct.includes("WW")) { if (!temps.includes("Warm White")) temps.push("Warm White"); }
      if (ct.includes("COOL") || ct.includes("CW")) { if (!temps.includes("Cool White")) temps.push("Cool White"); }
      if (ct.includes("DAY")  || ct.includes("DL")) { if (!temps.includes("Daylight"))   temps.push("Daylight"); }
    });
    return temps;
  }, [products]);

  // Filter logic
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = searchQ.toLowerCase();
      if (q && !p.sku.toLowerCase().includes(q) && !p.product_type.toLowerCase().includes(q) && !(p as any).material?.toLowerCase().includes(q)) return false;
      if (activeBrand !== "all" && (p as any).brand !== activeBrand) return false;
      if (activeType  !== "all" && p.product_type !== activeType)    return false;
      if (activeTemp  !== "all") {
        const ct = ((p as any).color_temp || "").toUpperCase();
        if (activeTemp === "Warm White" && !ct.includes("WARM") && !ct.includes("WW"))  return false;
        if (activeTemp === "Cool White" && !ct.includes("COOL") && !ct.includes("CW"))  return false;
        if (activeTemp === "Daylight"   && !ct.includes("DAY")  && !ct.includes("DL"))  return false;
      }
      return true;
    });
  }, [products, searchQ, activeBrand, activeType, activeTemp]);

  const hasFilters = activeBrand !== "all" || activeType !== "all" || activeTemp !== "all" || searchQ;

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} style={{
      display: "block", width: "100%", textAlign: "left",
      padding: "0.45rem 0.75rem", borderRadius: "6px",
      border: "none", cursor: "pointer",
      fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem",
      fontWeight: active ? 600 : 400,
      background: active ? `${accent}14` : "transparent",
      color: active ? accent : "var(--text-muted)",
      transition: "all 0.15s ease",
    }}>{children}</button>
  );

  const SectionHead = ({ label }: { label: string }) => (
    <p style={{
      fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: "var(--text)", margin: "1.25rem 0 0.5rem", paddingBottom: "0.5rem",
      borderBottom: "1px solid rgba(5,13,26,0.07)",
    }}>{label}</p>
  );

  return (
    <div style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
      <style>{`
        @media (max-width: 768px) {
          .cat-sidebar { display: ${sidebarOpen ? "block" : "none"} !important; width: 100% !important; position: static !important; }
          .cat-main { width: 100% !important; }
          .cat-grid  { grid-template-columns: repeat(2,1fr) !important; gap: 0.75rem !important; }
        }
      `}</style>

      {/* ── Sidebar ── */}
      <aside className="cat-sidebar" style={{
        width: "240px", flexShrink: 0,
        position: "sticky", top: "90px",
        background: "var(--paper)",
        border: "1px solid rgba(5,13,26,0.07)",
        borderRadius: "14px", padding: "1.25rem 1rem",
        boxShadow: "0 2px 8px rgba(5,13,26,0.05)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
          <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "var(--text)", letterSpacing: "0.04em" }}>Filters</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
        </div>

        {hasFilters && (
          <button onClick={() => { setActiveBrand("all"); setActiveType("all"); setActiveTemp("all"); setSearchQ(""); }}
            style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: accent, background: "none", border: "none", cursor: "pointer", padding: "0.2rem 0", marginBottom: "0.5rem" }}>
            CLEAR ALL ×
          </button>
        )}

        {/* Search */}
        <input
          placeholder="Search products…"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "8px", border: "1px solid rgba(5,13,26,0.12)", background: "var(--frost)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "var(--text)", outline: "none", marginTop: "0.75rem", boxSizing: "border-box" }}
        />

        {/* Brands */}
        {brands.length > 0 && (
          <>
            <SectionHead label="Brands" />
            <FilterBtn active={activeBrand === "all"} onClick={() => setActiveBrand("all")}>All Brands</FilterBtn>
            {brands.map((b) => (
              <FilterBtn key={b} active={activeBrand === b} onClick={() => setActiveBrand(b)}>{b}</FilterBtn>
            ))}
          </>
        )}

        {/* Product type */}
        {types.length > 0 && (
          <>
            <SectionHead label="Category" />
            <FilterBtn active={activeType === "all"} onClick={() => setActiveType("all")}>All Types</FilterBtn>
            {types.map((t) => (
              <FilterBtn key={t} active={activeType === t} onClick={() => setActiveType(t)}>{t}</FilterBtn>
            ))}
          </>
        )}

        {/* Color temperature */}
        {temps.length > 0 && (
          <>
            <SectionHead label="Color Temperature" />
            <FilterBtn active={activeTemp === "all"} onClick={() => setActiveTemp("all")}>All Temperatures</FilterBtn>
            {temps.map((t) => (
              <FilterBtn key={t} active={activeTemp === t} onClick={() => setActiveTemp(t)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{
                    width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
                    background: t === "Warm White" ? "#ffb347" : t === "Cool White" ? "#c8e8ff" : "#ffffff",
                    border: "1px solid rgba(5,13,26,0.15)",
                  }} />
                  {t}
                </span>
              </FilterBtn>
            ))}
          </>
        )}
      </aside>

      {/* ── Main content ── */}
      <div className="cat-main" style={{ flex: 1, minWidth: 0 }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", letterSpacing: "-0.01em" }}>{title}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
          {/* Mobile filter toggle */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: "none", padding: "0.5rem 1rem", borderRadius: "6px", border: "1px solid rgba(14,187,240,0.28)", background: "transparent", fontFamily: "'Exo 2',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: accent, cursor: "pointer" }}
            className="filter-toggle">
            {sidebarOpen ? "HIDE FILTERS" : "SHOW FILTERS"}
          </button>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {activeBrand !== "all" && <span style={{ padding: "3px 10px", borderRadius: "100px", background: `${accent}14`, border: `1px solid ${accent}40`, fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: accent }}>{activeBrand} ×</span>}
            {activeType  !== "all" && <span style={{ padding: "3px 10px", borderRadius: "100px", background: `${accent}14`, border: `1px solid ${accent}40`, fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: accent }}>{activeType} ×</span>}
            {activeTemp  !== "all" && <span style={{ padding: "3px 10px", borderRadius: "100px", background: `${accent}14`, border: `1px solid ${accent}40`, fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: accent }}>{activeTemp} ×</span>}
            {searchQ && <span style={{ padding: "3px 10px", borderRadius: "100px", background: `${accent}14`, border: `1px solid ${accent}40`, fontFamily: "'Exo 2',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: accent }}>"{searchQ}" ×</span>}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.1rem" }}>
            {filtered.map((p, i) => (
              <ProductCard key={p.sku} product={p} index={i} accent={accent} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>No products match your filters</p>
            <button onClick={() => { setActiveBrand("all"); setActiveType("all"); setActiveTemp("all"); setSearchQ(""); }}
              style={{ marginTop: "1rem", padding: "0.6rem 1.5rem", borderRadius: "6px", background: accent, color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em" }}>
              CLEAR FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
