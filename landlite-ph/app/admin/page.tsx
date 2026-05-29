"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Product {
  id: string; sku: string; pillar: string; scat: string; sscat: string;
  product_type: string; wattage: string; cct: string; color_temp: string;
  lumens: string; ip_rating: string; material: string; product_color: string;
  spec: string; image: string; brand: string; outdoor: string;
}
interface Stats {
  total: number; withImages: number;
  byPillar: Record<string, number>; byScat: Record<string, number>;
  recent: Product[];
}

export default function AdminPage() {
  const [stats, setStats]             = useState<Stats | null>(null);
  const [products, setProducts]       = useState<Product[]>([]);
  const [filtered, setFiltered]       = useState<Product[]>([]);
  const [search, setSearch]           = useState("");
  const [filterScat, setFilterScat]   = useState("all");
  const [uploading, setUploading]     = useState(false);
  const [uploadMsg, setUploadMsg]     = useState<{text:string;type:"ok"|"err"}|null>(null);
  const [dragOver, setDragOver]       = useState(false);
  const [page, setPage]               = useState(1);
  const [view, setView]               = useState<"grid"|"table">("grid");
  const [tab, setTab]                 = useState<"overview"|"products"|"upload">("overview");
  const fileRef                       = useRef<HTMLInputElement>(null);
  const PER_PAGE = 24;

  const loadStats = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/stats");
      const d = await r.json();
      setStats(d);
    } catch { /* ignore */ }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/stats");
      const d = await r.json();
      setStats(d);
      // Fetch all products for the table
      const allR = await fetch("/data/products.json");
      const all  = await allR.json();
      setProducts(all);
      setFiltered(all);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => {
    if (tab === "products" && !products.length) loadProducts();
  }, [tab, products.length, loadProducts]);

  useEffect(() => {
    let f = products;
    if (filterScat !== "all") f = f.filter((p) => p.scat === filterScat);
    if (search.trim()) {
      const q = search.toLowerCase();
      f = f.filter((p) =>
        p.sku.toLowerCase().includes(q) ||
        p.product_type.toLowerCase().includes(q) ||
        p.scat.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q)
      );
    }
    setFiltered(f);
    setPage(1);
  }, [search, filterScat, products]);

  async function handleUpload(file: File) {
    if (!file) return;
    setUploading(true);
    setUploadMsg(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const r   = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d   = await r.json();
      if (d.success) {
        setUploadMsg({ text: d.message, type: "ok" });
        await loadStats();
        setProducts([]); // force reload on next products tab visit
      } else {
        setUploadMsg({ text: d.error || "Upload failed", type: "err" });
      }
    } catch {
      setUploadMsg({ text: "Network error — could not reach the server.", type: "err" });
    }
    setUploading(false);
  }

  const scats = Array.from(new Set(products.map((p) => p.scat))).filter(Boolean).sort();
  const paged  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <main style={{ background: "var(--frost)", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        .adm-tab { padding:0.6rem 1.25rem; border-radius:6px; border:1px solid rgba(5,13,26,0.08); background:transparent; cursor:pointer; font-family:'Exo 2',sans-serif; font-size:0.8rem; font-weight:600; letter-spacing:0.06em; color:var(--text-muted); transition:all 0.2s; }
        .adm-tab.active { background:var(--azure); border-color:var(--azure); color:#fff; }
        .adm-tab:hover:not(.active) { border-color:rgba(14,187,240,0.4); color:var(--azure-deep); }
        .adm-card { background:var(--paper); border:1px solid rgba(5,13,26,0.07); border-radius:12px; padding:1.5rem; box-shadow:0 2px 8px rgba(5,13,26,0.05); }
        .adm-input { width:100%; padding:0.65rem 0.9rem; border-radius:8px; border:1px solid rgba(5,13,26,0.12); background:var(--frost); font-family:'DM Sans',sans-serif; font-size:0.88rem; color:var(--text); outline:none; transition:border-color 0.2s; }
        .adm-input:focus { border-color:var(--azure); box-shadow:0 0 0 3px rgba(14,187,240,0.1); }
        .prod-img { width:100%; height:160px; object-fit:contain; background:rgba(14,187,240,0.04); border-bottom:1px solid rgba(5,13,26,0.05); padding:0.75rem; }
        .prod-placeholder { width:100%; height:160px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(14,187,240,0.06),rgba(8,128,184,0.10)); border-bottom:1px solid rgba(5,13,26,0.05); font-family:'Exo 2',sans-serif; font-weight:900; font-size:2rem; color:rgba(14,187,240,0.3); }
        .prod-card { border:1px solid rgba(5,13,26,0.06); border-radius:12px; overflow:hidden; background:var(--paper); transition:all 0.3s ease; }
        .prod-card:hover { transform:translateY(-3px); box-shadow:0 12px 28px rgba(5,13,26,0.10),0 0 20px rgba(14,187,240,0.10); border-color:rgba(14,187,240,0.25); }
        tr:hover td { background:rgba(14,187,240,0.04); }
      `}</style>

      {/* Top bar */}
      <div style={{ background:"var(--paper)", borderBottom:"1px solid rgba(5,13,26,0.07)", padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px", position:"sticky", top:0, zIndex:50, boxShadow:"0 1px 4px rgba(5,13,26,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
          <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"linear-gradient(135deg,var(--azure-deep),var(--azure))", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:800, fontSize:"0.95rem", color:"var(--text)", lineHeight:1 }}>Landlite Admin</p>
            <p style={{ fontSize:"0.7rem", color:"var(--text-muted)", marginTop:"2px" }}>Product Manager</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.5rem" }}>
          <Link href="/" style={{ padding:"0.5rem 1rem", borderRadius:"6px", border:"1px solid rgba(5,13,26,0.10)", fontFamily:"'Exo 2',sans-serif", fontSize:"0.78rem", fontWeight:600, color:"var(--text-muted)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"0.4rem" }}>
            ← View Site
          </Link>
        </div>
      </div>

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"2rem" }}>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"2rem", flexWrap:"wrap" }}>
          {(["overview","products","upload"] as const).map((t) => (
            <button key={t} className={`adm-tab${tab===t?" active":""}`} onClick={() => setTab(t)}>
              {t === "overview" ? "📊 Overview" : t === "products" ? "📦 Products" : "⬆️ Upload Excel"}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && stats && (
          <div>
            {/* Stat cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1.25rem", marginBottom:"2rem" }}>
              {[
                { label:"Total Products", value:stats.total, icon:"📦", color:"#0EBBF0" },
                { label:"With Images",    value:stats.withImages, icon:"🖼️", color:"#0880B8" },
                { label:"Missing Images", value:stats.total - stats.withImages, icon:"⚠️", color:"#f59e0b" },
                { label:"Categories",     value:Object.keys(stats.byScat).length, icon:"🗂️", color:"#10b981" },
              ].map((s) => (
                <div key={s.label} className="adm-card" style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>{s.icon}</div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:"2rem", color:s.color, lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:"0.78rem", color:"var(--text-muted)", marginTop:"0.3rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* By category */}
            <div className="adm-card" style={{ marginBottom:"2rem" }}>
              <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--azure-deep)", marginBottom:"1.25rem" }}>Products by Category</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {Object.entries(stats.byScat).sort((a,b) => b[1]-a[1]).map(([cat, count]) => (
                  <div key={cat} style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"var(--text)", width:"200px", flexShrink:0 }}>{cat}</span>
                    <div style={{ flex:1, height:"8px", borderRadius:"4px", background:"rgba(14,187,240,0.10)", overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:"4px", background:"linear-gradient(90deg,var(--azure-deep),var(--azure))", width:`${(count/stats.total*100).toFixed(1)}%`, transition:"width 0.6s ease" }} />
                    </div>
                    <span style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.82rem", color:"var(--azure-deep)", width:"40px", textAlign:"right" }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent products */}
            <div className="adm-card">
              <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--azure-deep)", marginBottom:"1.25rem" }}>Recent Products (with images)</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"1rem" }}>
                {stats.recent.map((p) => (
                  <div key={p.sku} className="prod-card">
                    {p.image
                      ? <img src={p.image} alt={p.sku} className="prod-img" onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }} />
                      : <div className="prod-placeholder">?</div>}
                    <div style={{ padding:"0.75rem" }}>
                      <p style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.72rem", color:"var(--text)", marginBottom:"0.25rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.sku}</p>
                      <p style={{ fontSize:"0.68rem", color:"var(--text-muted)" }}>{p.scat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {tab === "products" && (
          <div>
            {/* Toolbar */}
            <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.5rem", flexWrap:"wrap", alignItems:"center" }}>
              <input className="adm-input" style={{ maxWidth:"320px" }} placeholder="Search SKU, type, spec…"
                value={search} onChange={(e) => setSearch(e.target.value)} />
              <select className="adm-input" style={{ maxWidth:"220px", cursor:"pointer" }}
                value={filterScat} onChange={(e) => setFilterScat(e.target.value)}>
                <option value="all">All Categories</option>
                {scats.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <div style={{ marginLeft:"auto", display:"flex", gap:"0.5rem" }}>
                {(["grid","table"] as const).map((v) => (
                  <button key={v} className={`adm-tab${view===v?" active":""}`} onClick={() => setView(v)}>
                    {v === "grid" ? "⊞ Grid" : "≡ Table"}
                  </button>
                ))}
              </div>
              <span style={{ fontFamily:"'Exo 2',sans-serif", fontSize:"0.78rem", color:"var(--text-muted)", whiteSpace:"nowrap" }}>
                {filtered.length} of {products.length}
              </span>
            </div>

            {/* Grid view */}
            {view === "grid" && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1.25rem", marginBottom:"2rem" }}>
                {paged.map((p) => (
                  <div key={p.sku} className="prod-card">
                    {p.image
                      ? <img src={p.image} alt={p.sku} className="prod-img" onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }} />
                      : <div className="prod-placeholder">{p.sku.slice(0,2)}</div>}
                    <div style={{ padding:"0.9rem" }}>
                      <p style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.75rem", color:"var(--text)", marginBottom:"0.2rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={p.sku}>{p.sku}</p>
                      <p style={{ fontSize:"0.7rem", color:"var(--azure-deep)", fontFamily:"'Exo 2',sans-serif", fontWeight:600, letterSpacing:"0.04em", marginBottom:"0.4rem" }}>{p.product_type || p.sscat}</p>
                      {p.spec && <p style={{ fontSize:"0.7rem", color:"var(--text-muted)", lineHeight:1.4 }}>{p.spec}</p>}
                      <div style={{ marginTop:"0.6rem", display:"flex", alignItems:"center", gap:"0.4rem", flexWrap:"wrap" }}>
                        {p.scat && <span style={{ fontSize:"0.62rem", padding:"2px 6px", borderRadius:"100px", background:"rgba(14,187,240,0.08)", border:"1px solid rgba(14,187,240,0.20)", color:"var(--azure-deep)", fontFamily:"'Exo 2',sans-serif", fontWeight:600 }}>{p.scat}</span>}
                        {p.outdoor === "YES" && <span style={{ fontSize:"0.62rem", padding:"2px 6px", borderRadius:"100px", background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.25)", color:"#059669", fontFamily:"'Exo 2',sans-serif", fontWeight:600 }}>Outdoor</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table view */}
            {view === "table" && (
              <div className="adm-card" style={{ overflow:"auto", marginBottom:"2rem", padding:0 }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.82rem" }}>
                  <thead>
                    <tr style={{ background:"var(--frost)", borderBottom:"1px solid rgba(5,13,26,0.08)" }}>
                      {["Image","SKU","Type","Category","Spec","Wattage","CCT","IP","Color"].map((h) => (
                        <th key={h} style={{ padding:"0.75rem 1rem", fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--azure-deep)", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((p) => (
                      <tr key={p.sku} style={{ borderBottom:"1px solid rgba(5,13,26,0.05)" }}>
                        <td style={{ padding:"0.5rem 1rem" }}>
                          {p.image
                            ? <img src={p.image} alt={p.sku} style={{ width:"52px", height:"40px", objectFit:"contain", borderRadius:"4px", background:"rgba(14,187,240,0.05)" }} onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }} />
                            : <div style={{ width:"52px", height:"40px", borderRadius:"4px", background:"rgba(14,187,240,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem", color:"var(--text-muted)" }}>No img</div>}
                        </td>
                        <td style={{ padding:"0.5rem 1rem", fontFamily:"'Exo 2',sans-serif", fontWeight:600, fontSize:"0.78rem", color:"var(--text)", whiteSpace:"nowrap" }}>{p.sku}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{p.product_type || p.sscat}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--azure-deep)", fontFamily:"'Exo 2',sans-serif", fontSize:"0.72rem", fontWeight:600, whiteSpace:"nowrap" }}>{p.scat}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--text-muted)", maxWidth:"200px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.spec}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{p.wattage ? p.wattage+"W" : "—"}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{p.cct || p.color_temp || "—"}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{p.ip_rating || "—"}</td>
                        <td style={{ padding:"0.5rem 1rem", color:"var(--text-muted)", whiteSpace:"nowrap" }}>{p.product_color || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
                <button className="adm-tab" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1} style={{ opacity:page===1?0.4:1 }}>← Prev</button>
                {Array.from({length:Math.min(totalPages,10)}, (_,i) => i+1).map((n) => (
                  <button key={n} className={`adm-tab${page===n?" active":""}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                {totalPages > 10 && <span style={{ color:"var(--text-muted)", fontSize:"0.82rem" }}>… {totalPages}</span>}
                <button className="adm-tab" onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page===totalPages} style={{ opacity:page===totalPages?0.4:1 }}>Next →</button>
              </div>
            )}
          </div>
        )}

        {/* ── UPLOAD ── */}
        {tab === "upload" && (
          <div style={{ maxWidth:"720px" }}>
            {/* Instructions */}
            <div className="adm-card" style={{ marginBottom:"1.5rem" }}>
              <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--azure-deep)", marginBottom:"1rem" }}>📋 How to Upload</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {[
                  "Use the same Excel template as master_data_new.xlsx",
                  "Required columns: Name, Pillar, SCAT, SSCAT, PRODUCT_TYPE, Link (image URL)",
                  "Optional: WATTAGE, CCT, LUMENS, BEAM_ANGLE, IP RATING, MATERIAL, PRODUCT_COLOR",
                  "Uploading replaces ALL products. Export a backup first if needed.",
                  "Supported formats: .xlsx, .xls, .csv"
                ].map((tip, i) => (
                  <div key={i} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start" }}>
                    <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"rgba(14,187,240,0.10)", border:"1px solid rgba(14,187,240,0.30)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Exo 2',sans-serif", fontSize:"0.65rem", fontWeight:700, color:"var(--azure-deep)", marginTop:"1px" }}>{i+1}</div>
                    <p style={{ fontSize:"0.88rem", color:"var(--text-muted)", lineHeight:1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drop zone */}
            <div
              className="adm-card"
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault(); setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleUpload(file);
              }}
              style={{
                border: `2px dashed ${dragOver ? "var(--azure)" : "rgba(14,187,240,0.25)"}`,
                background: dragOver ? "rgba(14,187,240,0.06)" : "var(--paper)",
                borderRadius:"14px", padding:"3rem 2rem", textAlign:"center",
                transition:"all 0.2s ease", cursor:"pointer", marginBottom:"1.5rem"
              }}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{ display:"none" }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              {uploading ? (
                <div>
                  <div style={{ width:"48px", height:"48px", border:"3px solid rgba(14,187,240,0.2)", borderTop:"3px solid var(--azure)", borderRadius:"50%", margin:"0 auto 1rem", animation:"spin 0.8s linear infinite" }} />
                  <p style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, color:"var(--azure-deep)" }}>Processing Excel…</p>
                  <p style={{ fontSize:"0.82rem", color:"var(--text-muted)", marginTop:"0.25rem" }}>Parsing and importing products</p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>📂</div>
                  <p style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"var(--text)", marginBottom:"0.5rem" }}>Drop your Excel file here</p>
                  <p style={{ fontSize:"0.88rem", color:"var(--text-muted)", marginBottom:"1.25rem" }}>or click to browse — .xlsx, .xls, .csv accepted</p>
                  <span style={{ display:"inline-block", padding:"0.65rem 1.75rem", borderRadius:"6px", background:"linear-gradient(135deg,var(--azure-deep),var(--azure))", color:"#fff", fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.1em" }}>
                    CHOOSE FILE
                  </span>
                </div>
              )}
            </div>

            {/* Result message */}
            {uploadMsg && (
              <div style={{
                padding:"1.25rem 1.5rem", borderRadius:"10px", marginBottom:"1.5rem",
                background: uploadMsg.type === "ok" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                border: uploadMsg.type === "ok" ? "1px solid rgba(16,185,129,0.30)" : "1px solid rgba(239,68,68,0.30)",
              }}>
                <p style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.88rem", color: uploadMsg.type === "ok" ? "#059669" : "#dc2626", marginBottom:"0.3rem" }}>
                  {uploadMsg.type === "ok" ? "✅ Success" : "❌ Error"}
                </p>
                <p style={{ fontSize:"0.85rem", color:"var(--text-muted)" }}>{uploadMsg.text}</p>
                {uploadMsg.type === "ok" && (
                  <button className="adm-tab" style={{ marginTop:"0.75rem" }} onClick={() => setTab("products")}>
                    View Products →
                  </button>
                )}
              </div>
            )}

            {/* Current stats */}
            {stats && (
              <div className="adm-card">
                <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-muted)", marginBottom:"1rem" }}>Current Database</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem" }}>
                  {[
                    { label:"Total", value:stats.total, color:"var(--azure-deep)" },
                    { label:"With Images", value:stats.withImages, color:"#059669" },
                    { label:"No Image", value:stats.total - stats.withImages, color:"#f59e0b" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign:"center", padding:"0.75rem", borderRadius:"8px", background:"var(--frost)" }}>
                      <div style={{ fontFamily:"'Exo 2',sans-serif", fontWeight:900, fontSize:"1.6rem", color:s.color, lineHeight:1 }}>{s.value}</div>
                      <div style={{ fontSize:"0.72rem", color:"var(--text-muted)", marginTop:"0.25rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
