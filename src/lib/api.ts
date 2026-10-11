import { Product, Category } from "@/types";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function fetchAllProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/products`;
  console.log(`[API FETCHING] -> ${url}`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  const url = `${BASE_URL}/products/${id}`;
  console.log(`[API FETCHING] -> ${url}`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchProductBySlugOrId(slugOrId: string): Promise<Product | null> {
  if (/^\d+$/.test(slugOrId)) {
    const prod = await fetchProductById(slugOrId);
    if (prod) return prod;
  }

  try {
    const all = await fetchAllProducts();
    const found = all.find(
      (p) => String(p.slug) === slugOrId || String(p.id) === slugOrId
    );
    if (found) {
      const detailed = await fetchProductById(found.id);
      return detailed || found;
    }
  } catch (err) {
    console.error("fetchProductBySlugOrId error:", err);
  }

  return null;
}

export async function fetchAllCategories(): Promise<Category[]> {
  const url = `${BASE_URL}/categories`;
  console.log(`[API FETCHING] -> ${url}`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchCategoryProducts(slug: string): Promise<Product[]> {
  const url = `${BASE_URL}/products?category=${slug}`;
  console.log(`[API FETCHING] -> ${url}`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const url = `${BASE_URL}/categories/${slug}`;
  console.log(`[API FETCHING] -> ${url}`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
