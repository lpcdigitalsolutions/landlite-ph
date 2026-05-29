import fs from "fs";
import path from "path";

// ── Types ───────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  sku: string;
  pillar: string;
  scat: string;
  sscat: string;
  product_type: string;
  brand: string;
  series: string;
  outdoor: string;
  base_type: string;
  wattage: string;
  cct: string;
  color_temp: string;
  lumens: string;
  beam_angle: string;
  tilting_angle: string;
  voltage: string;
  cri: string;
  dimmable: string;
  material: string;
  product_color: string;
  ip_rating: string;
  dimension: string;
  cutout: string;
  led_type: string;
  burning_hours: string;
  gang: string;
  way: string;
  ampere: string;
  no_of_socket: string;
  spec: string;
  image: string;
}

// ── Data access ──────────────────────────────────────────────────────────────
const DATA_PATH = path.join(process.cwd(), "data", "products.json");

export function getAllProducts(): Product[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

export function getProductsByPillar(pillar: string): Product[] {
  return getAllProducts().filter(
    (p) => p.pillar.toLowerCase().replace(/\s+/g, "-") === pillar.toLowerCase().replace(/\s+/g, "-")
  );
}

export function getProductsByScat(scat: string): Product[] {
  return getAllProducts().filter(
    (p) => p.scat.toLowerCase().replace(/\s+/g, "-") === scat.toLowerCase().replace(/\s+/g, "-")
  );
}

export function getProductsBySscat(sscat: string): Product[] {
  return getAllProducts().filter(
    (p) => p.sscat.toLowerCase().replace(/\s+/g, "-") === sscat.toLowerCase().replace(/\s+/g, "-")
  );
}

export function getProductsByType(product_type: string): Product[] {
  return getAllProducts().filter(
    (p) => p.product_type.toLowerCase().replace(/[/\s]+/g, "-") === product_type.toLowerCase().replace(/[/\s]+/g, "-")
  );
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return getAllProducts().filter(
    (p) =>
      p.sku.toLowerCase().includes(q) ||
      p.product_type.toLowerCase().includes(q) ||
      p.scat.toLowerCase().includes(q) ||
      p.sscat.toLowerCase().includes(q) ||
      p.spec.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
export function getProductStats() {
  const all = getAllProducts();
  const byPillar: Record<string, number> = {};
  const byScat: Record<string, number> = {};
  all.forEach((p) => {
    byPillar[p.pillar] = (byPillar[p.pillar] || 0) + 1;
    byScat[p.scat] = (byScat[p.scat] || 0) + 1;
  });
  return {
    total: all.length,
    withImages: all.filter((p) => p.image).length,
    byPillar,
    byScat,
  };
}

export function getImageUrl(product: Product): string {
  if (!product.image) return "";
  if (product.image.startsWith("http")) return product.image;
  if (product.image.startsWith("/core"))
    return "https://9653057.app.netsuite.com" + product.image;
  return product.image;
}
