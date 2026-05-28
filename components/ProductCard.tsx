"use client";
import Link from "next/link";

export interface ProductCardData {
  sku: string;
  product_type: string;
  wattage: string;
  ip_rating: string;
  base_type: string;
  cct: string;
  color_temp: string;
  beam_angle: string;
  outdoor: string;
  dimmable: string;
  image: string;
  material: string;
  product_color: string;
}

export default function ProductCard({ product, index, accent = "#0880B8" }: {
  product: ProductCardData;
  index: number;
  accent?: string;
}) {
  const skuSlug = encodeURIComponent(product.sku);

  return (
    <Link
      href={`/products/item/${skuSlug}`}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          borderRadius: "14px", overflow: "hidden", background: "#FFFFFF",
          border: "1px solid rgba(5,13,26,0.08)",
          boxShadow: "0 2px 10px rgba(5,13,26,0.06)",
          display: "flex", flexDirection: "column", height: "100%",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-5px)";
          el.style.boxShadow = "0 18px 38px rgba(5,13,26,0.10), 0 0 28px rgba(14,187,240,0.12)";
          el.style.borderColor = "rgba(14,187,240,0.30)";
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "0 2px 10px rgba(5,13,26,0.06)";
          el.style.borderColor = "rgba(5,13,26,0.08)";
        }}
      >
        {/* Image — clean, no overlaid tags */}
        <div style={{
          position: "relative", width: "100%", height: "200px",
          background: "#F4F9FD", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.sku}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", padding: "1.25rem" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(14,187,240,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
                <path d="M9 18h6"/><path d="M10 22h4"/>
              </svg>
              <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "1.4rem", color: "rgba(14,187,240,0.18)", letterSpacing: "-0.02em" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: "0.9rem 1.1rem 1.05rem", display: "flex", flexDirection: "column",
          flex: 1, borderTop: "1px solid rgba(5,13,26,0.06)", gap: "0.25rem",
        }}>
          <h3 style={{
            fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.88rem",
            color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.3,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0,
          }} title={product.sku}>{product.sku}</h3>

          {product.product_type && (
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.4, margin: 0 }}>
              {product.product_type}
            </p>
          )}

          <div style={{ marginTop: "0.7rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.4rem" }}>
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
              {product.outdoor === "YES" && (
                <span style={{ fontSize: "0.58rem", padding: "2px 6px", borderRadius: "100px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", color: "#059669", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, letterSpacing: "0.04em" }}>OUTDOOR</span>
              )}
              {product.dimmable === "YES" && (
                <span style={{ fontSize: "0.58rem", padding: "2px 6px", borderRadius: "100px", background: "rgba(14,187,240,0.07)", border: "1px solid rgba(14,187,240,0.22)", color: "#0880B8", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, letterSpacing: "0.04em" }}>DIMMABLE</span>
              )}
            </div>
            <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: accent }}>
              VIEW →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
