import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAllProducts, getImageUrl } from "@/lib/products";
import RelatedProducts from "@/components/RelatedProducts";

export const revalidate = 60;

// Pre-generate all product pages at build time
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ sku: encodeURIComponent(p.sku) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku: rawSku } = await params;
  const sku      = decodeURIComponent(rawSku);
  const products = getAllProducts();
  const product  = products.find((p) => p.sku === sku);

  if (!product) notFound();

  const imgUrl = getImageUrl(product);

  const specRows: { label: string; value: string }[] = [
    { label: "Wattage",           value: product.wattage ? product.wattage + "W" : "" },
    { label: "Base Type",         value: product.base_type },
    { label: "CCT",               value: product.cct },
    { label: "Color Temperature", value: product.color_temp },
    { label: "Lumens",            value: product.lumens ? product.lumens + "lm" : "" },
    { label: "Beam Angle",        value: product.beam_angle ? product.beam_angle + "°" : "" },
    { label: "Tilting Angle",     value: product.tilting_angle ? product.tilting_angle + "°" : "" },
    { label: "Input Voltage",     value: product.voltage },
    { label: "CRI",               value: product.cri },
    { label: "LED Type",          value: product.led_type },
    { label: "Dimmable",          value: product.dimmable },
    { label: "Material",          value: product.material },
    { label: "Product Color",     value: product.product_color },
    { label: "IP Rating",         value: product.ip_rating },
    { label: "Dimension",         value: product.dimension },
    { label: "Cutout",            value: product.cutout },
    { label: "Outdoor",           value: product.outdoor },
    { label: "Burning Hours",     value: product.burning_hours ? product.burning_hours + " hrs" : "" },
    { label: "Gang",              value: product.gang },
    { label: "Way",               value: product.way },
    { label: "Ampere Rating",     value: product.ampere ? product.ampere + "A" : "" },
    { label: "No. of Socket",     value: product.no_of_socket },
    { label: "Brand",             value: product.brand !== "LANDLITE" ? product.brand : "" },
    { label: "Series",            value: product.series },
  ].filter((r) => r.value && r.value.trim() && r.value !== "0" && r.value !== "NO" && r.value !== "None");

  const related = products
    .filter((p) => p.scat === product.scat && p.sku !== product.sku && p.image)
    .slice(0, 6);

  const pillarSlug = product.pillar.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");
  const scatSlug   = product.scat.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 768px) {
          .det-layout { flex-direction: column !important; }
          .det-img-col { width: 100% !important; }
          .related-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <Navbar />

      <div style={{ paddingTop: "clamp(80px,12vw,120px)", paddingLeft: "clamp(1.25rem,6vw,5rem)", paddingRight: "clamp(1.25rem,6vw,5rem)", paddingBottom: "6rem", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Breadcrumb */}
        <nav style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted-2)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "#0EBBF0" }}>›</span>
          <Link href="/products" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Products</Link>
          <span style={{ color: "#0EBBF0" }}>›</span>
          <Link href={`/products/${pillarSlug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{product.pillar.replace(/_/g, " ")}</Link>
          <span style={{ color: "#0EBBF0" }}>›</span>
          <Link href={`/products/${pillarSlug}/${scatSlug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{product.scat.replace(/_/g, " ")}</Link>
          <span style={{ color: "#0EBBF0" }}>›</span>
          <span style={{ color: "var(--azure-deep)", fontWeight: 600 }}>{product.sku}</span>
        </nav>

        {/* Main layout */}
        <div className="det-layout" style={{ display: "flex", gap: "4rem", alignItems: "flex-start", marginBottom: "5rem" }}>

          {/* Left — image */}
          <div className="det-img-col" style={{ width: "460px", flexShrink: 0 }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(5,13,26,0.07)", boxShadow: "0 4px 20px rgba(5,13,26,0.07)", background: "#F4F9FD" }}>
              {imgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imgUrl}
                  alt={product.sku}
                  style={{ width: "100%", height: "400px", objectFit: "contain", padding: "2rem" }}
                />
              ) : (
                <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(14,187,240,0.20)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6"/><path d="M10 22h4"/>
                  </svg>
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "2.5rem", color: "rgba(14,187,240,0.12)", letterSpacing: "-0.02em" }}>
                    {product.sku.slice(0, 4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right — details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#0EBBF0", marginBottom: "0.6rem" }}>
              {product.scat.replace(/_/g, " ")}
              {product.sscat ? ` / ${product.sscat.replace(/_/g, " ")}` : ""}
            </p>

            <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.6rem" }}>
              {product.sku}
            </h1>

            {product.product_type && (
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "var(--text-muted)", marginBottom: "1.5rem", fontStyle: "italic" }}>
                {product.product_type}
              </p>
            )}

            <div style={{ height: "1px", background: "rgba(5,13,26,0.08)", marginBottom: "1.75rem" }} />

            {/* Specs table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: i < specRows.length - 1 ? "1px solid rgba(5,13,26,0.05)" : "none" }}>
                    <td style={{ padding: "0.6rem 0", width: "45%", fontFamily: "'Exo 2',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                      {row.label}:
                    </td>
                    <td style={{ padding: "0.6rem 0", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "var(--text)", fontWeight: 500 }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Badges */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              {product.outdoor === "YES" && (
                <span style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "100px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.28)", color: "#059669", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, letterSpacing: "0.05em" }}>OUTDOOR</span>
              )}
              {product.dimmable === "YES" && (
                <span style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "100px", background: "rgba(14,187,240,0.07)", border: "1px solid rgba(14,187,240,0.25)", color: "#0880B8", fontFamily: "'Exo 2',sans-serif", fontWeight: 700, letterSpacing: "0.05em" }}>DIMMABLE</span>
              )}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <a href="https://landlitephilcorp.com/collections/all" target="_blank" rel="noopener noreferrer"
                className="azure-btn" style={{ padding: "0.85rem 2rem", borderRadius: "6px", fontSize: "0.85rem", textDecoration: "none", display: "inline-block" }}>
                BUY NOW →
              </a>
              <Link href={`/products/${pillarSlug}/${scatSlug}`}
                className="outline-btn" style={{ padding: "0.85rem 2rem", borderRadius: "6px", fontSize: "0.85rem", textDecoration: "none", display: "inline-block" }}>
                ← BACK TO {product.scat.replace(/_/g, " ").toUpperCase()}
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts
          products={related.map((p) => ({ sku: p.sku, image: getImageUrl(p) }))}
          scat={product.scat}
        />
      </div>

      <footer style={{ borderTop: "1px solid rgba(5,13,26,0.08)", padding: "2rem", background: "var(--ink)", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(176,220,255,0.35)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
