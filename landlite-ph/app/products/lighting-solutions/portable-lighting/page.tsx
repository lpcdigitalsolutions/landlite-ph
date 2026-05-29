import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductCatalog from "@/components/ProductCatalog";
import { getAllProducts } from "@/lib/products";

export const revalidate = 60;

export default function LightingSolutionsPortableLightingPage() {
  const products = getAllProducts().filter((p) => {
    const s = p.scat.replace(/_/g, " ");
    return s === "Portable Lighting" || p.scat === "Portable Lighting" || p.scat === "Portable_Lighting";
  });

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position:"relative", overflow:"hidden", paddingTop:"clamp(80px,14vw,130px)", paddingBottom:"clamp(2rem,5vw,4rem)", paddingLeft:"clamp(1.25rem,6vw,5rem)", paddingRight:"clamp(1.25rem,6vw,5rem)", background:"linear-gradient(180deg, var(--paper) 0%, var(--frost) 100%)" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(14,187,240,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,187,240,0.04) 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
        <div style={{ maxWidth:"1440px", margin:"0 auto", position:"relative", zIndex:1 }}>
          <nav style={{ fontFamily:"'Exo 2',sans-serif", fontSize:"0.7rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-muted-2)", marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
            <Link href="/" style={{ color:"var(--text-muted)", textDecoration:"none" }}>Home</Link>
            <span style={{ color:"#0880B8" }}>›</span>
            <Link href="/products" style={{ color:"var(--text-muted)", textDecoration:"none" }}>Products</Link>
            <span style={{ color:"#0880B8" }}>›</span>
            <Link href="/products/lighting-solutions" style={{ color:"var(--text-muted)", textDecoration:"none" }}>Lighting Solution</Link>
            <span style={{ color:"#0880B8" }}>›</span>
            <span style={{ color:"var(--azure-deep)", fontWeight:600 }}>Portable Lighting</span>
          </nav>
          <p className="section-label" style={{ marginBottom:"0.5rem", color:"#0880B8" }}>◆ LIGHTING SOLUTION ◆</p>
          <h1 className="section-title" style={{ fontSize:"clamp(2rem,5vw,3rem)", marginBottom:"0.75rem" }}>Portable Lighting</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(0.9rem,1.3vw,1rem)", color:"var(--text-muted)", fontStyle:"italic", maxWidth:"600px", lineHeight:1.7 }}>Plug-in, rechargeable, and worksite portable lights for flexible, go-anywhere illumination.</p>
        </div>
      </section>

      {/* Catalog with filters */}
      <section style={{ padding:"3rem clamp(1.25rem,6vw,5rem) 7rem", background:"var(--paper)" }}>
        <div style={{ maxWidth:"1440px", margin:"0 auto" }}>
          <ProductCatalog products={products} accent="#0880B8" title="Portable Lighting" />
        </div>
      </section>

      <footer style={{ borderTop:"1px solid rgba(5,13,26,0.08)", padding:"2rem", background:"var(--ink)", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:"rgba(176,220,255,0.35)" }}>
          © {new Date().getFullYear()} Landlite Philippines Corporation. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
