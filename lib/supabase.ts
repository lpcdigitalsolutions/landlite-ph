import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for Landlite products
export type ProductCategory =
  | "general-lights"
  | "wiring-device"
  | "designer-lightings"
  | "smart-solutions";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  description?: string;
  price?: number;
  image_url?: string;
  is_featured?: boolean;
  created_at: string;
}

// Fetch products by category
export async function getProductsByCategory(category: ProductCategory) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Product[];
}

// Fetch all featured products
export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Product[];
}
