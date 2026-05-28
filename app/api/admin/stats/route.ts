import { NextResponse } from "next/server";
import { getProductStats, getAllProducts } from "@/lib/products";

export const runtime = "nodejs";

export async function GET() {
  const stats = getProductStats();
  // Recent 8 products with images
  const recent = getAllProducts()
    .filter((p) => p.image)
    .slice(0, 8);
  return NextResponse.json({ ...stats, recent });
}
