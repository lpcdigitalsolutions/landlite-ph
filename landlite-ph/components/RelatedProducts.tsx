"use client";

import Link from "next/link";

interface RelatedProduct {
  sku: string;
  image: string;
}

export default function RelatedProducts({ products, scat }: { products: RelatedProduct[]; scat: string }) {
  if (!products.length) return null;

  return (
    <div>
      <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "3px", height: "22px", borderRadius: "2px", background: "linear-gradient(180deg,#0EBBF0,var(--azure-deep))" }} />
        <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--azure-deep)" }}>
          More in {scat.replace(/_/g, " ")}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "1rem" }}>
        {products.map((p) => (
          <Link key={p.sku} href={`/products/item/${encodeURIComponent(p.sku)}`} style={{ textDecoration: "none" }}>
            <div
              style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(5,13,26,0.07)", background: "#F4F9FD", transition: "all 0.25s ease" }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(14,187,240,0.35)";
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 12px 24px rgba(5,13,26,0.08)";
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(5,13,26,0.07)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.sku}
                style={{ width: "100%", height: "110px", objectFit: "contain", padding: "0.75rem" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ padding: "0.6rem 0.75rem", borderTop: "1px solid rgba(5,13,26,0.06)", background: "#fff" }}>
                <p style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={p.sku}>
                  {p.sku}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
