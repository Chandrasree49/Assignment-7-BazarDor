import { Product, Category } from "@/types";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchProductBySlugOrId(slugOrId: string): Promise<Product | null> {
  // If it's numeric, directly try fetching by id
  if (/^\d+$/.test(slugOrId)) {
    const prod = await fetchProductById(slugOrId);
    if (prod) return prod;
  }

  // Otherwise, fetch all products and find matching slug or id
  try {
    const all = await fetchAllProducts();
    const found = all.find(
      (p) => String(p.slug) === slugOrId || String(p.id) === slugOrId
    );
    if (found) {
      // If found in list, we can fetch detailed if needed, or return found
      // Note: single product by id might have more fields or same
      const detailed = await fetchProductById(found.id);
      return detailed || found;
    }
  } catch (err) {
    console.error("fetchProductBySlugOrId error:", err);
  }

  return null;
}

export async function fetchAllCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchCategoryProducts(slug: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?category=${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(`${BASE_URL}/categories/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}
