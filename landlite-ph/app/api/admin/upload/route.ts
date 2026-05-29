import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const HEADERS_MAP: Record<string, string> = {
  "Parent Item":                   "id",
  "Name":                          "sku",
  "Pillar":                        "pillar",
  "SCAT":                          "scat",
  "SSCAT":                         "sscat",
  "PRODUCT_TYPE":                  "product_type",
  "BRAND":                         "brand",
  "SERIES":                        "series",
  "OUTDOOR (YES / NO)":            "outdoor",
  "BASE_TYPE":                     "base_type",
  "WATTAGE":                       "wattage",
  "CCT":                           "cct",
  "COLOR_TEMPERATURE_WW_CW_DL":    "color_temp",
  "LUMENS":                        "lumens",
  "BEAM_ANGLE":                    "beam_angle",
  "TILTING ANGLE":                 "tilting_angle",
  "INPUT_VOLTAGE":                 "voltage",
  "COLOR_RENDERING_INDEX":         "cri",
  "DIMMABILITY (YES / NO)":        "dimmable",
  "MATERIAL":                      "material",
  "PRODUCT_COLOR":                 "product_color",
  "IP RATING":                     "ip_rating",
  "DIMENSION":                     "dimension",
  "CUTOUT":                        "cutout",
  "LED TYPE":                      "led_type",
  "BURNING HOURS":                 "burning_hours",
  "GANG":                          "gang",
  "WAY":                           "way",
  "AMPERE RATING":                 "ampere",
  "NO. OF SOCKET":                 "no_of_socket",
  "Link":                          "image",
  // Alternate header names
  "Item Images":                   "image",
  "IMAGE":                         "image",
  "OUTDOOR":                       "outdoor",
};

/** Normalise underscore-based values from the new template */
function normalise(val: string): string {
  return val.replace(/_/g, " ").trim();
}

function buildSpec(row: Record<string, string>): string {
  const parts: string[] = [];
  if (row.wattage)      parts.push(row.wattage + "W");
  if (row.cct)          parts.push(row.cct);
  else if (row.color_temp) parts.push(normalise(row.color_temp).charAt(0).toUpperCase() + normalise(row.color_temp).slice(1).toLowerCase());
  if (row.lumens)       parts.push(row.lumens + "lm");
  if (row.beam_angle)   parts.push(row.beam_angle + "°");
  if (row.ip_rating)    parts.push(row.ip_rating.toUpperCase());
  if (row.base_type)    parts.push(row.base_type);
  return parts.slice(0, 6).join(" · ");
}

function normalizeImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/core")) return "https://9653057.app.netsuite.com" + url;
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["xlsx", "xls", "csv"].includes(ext || "")) {
      return NextResponse.json({ error: "Only .xlsx, .xls, or .csv files accepted" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const wb     = XLSX.read(buffer, { type: "buffer" });

    // Use first sheet
    const ws   = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
      raw: false,
      defval: "",
    });

    if (!rows.length) {
      return NextResponse.json({ error: "Spreadsheet is empty" }, { status: 400 });
    }

    const products = rows
      .filter((r) => r["Name"] || r["SKU"] || r["sku"])
      .map((r) => {
        const mapped: Record<string, string> = {};

        // Map known headers
        for (const [excelKey, fieldKey] of Object.entries(HEADERS_MAP)) {
          const val = String(r[excelKey] || "").trim();
          if (val) mapped[fieldKey] = val;
        }

        // Normalise underscore values from new template
        for (const key of ["pillar", "scat", "sscat", "product_type"]) {
          if (mapped[key]) mapped[key] = normalise(mapped[key]);
        }

        // Ensure required fields
        if (!mapped.sku) mapped.sku = String(r["Name"] || r["SKU"] || "").trim();
        mapped.image  = normalizeImageUrl(mapped.image || "");
        mapped.brand  = mapped.brand || "LANDLITE";
        mapped.spec   = buildSpec(mapped);

        // Zero out "None" / empty strings
        for (const k of Object.keys(mapped)) {
          if (mapped[k] === "None" || mapped[k] === "none") mapped[k] = "";
        }

        return mapped;
      })
      .filter((p) => p.sku); // skip header-only rows

    const dataPath = path.join(process.cwd(), "data", "products.json");
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), "utf-8");

    return NextResponse.json({
      success:    true,
      count:      products.length,
      withImages: products.filter((p) => p.image).length,
      message:    `Successfully imported ${products.length} products (${products.filter((p) => p.image).length} with images).`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Failed to process file. Make sure it matches the Landlite product template." },
      { status: 500 }
    );
  }
}
