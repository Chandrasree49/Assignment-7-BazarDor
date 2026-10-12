import { notFound } from "next/navigation";
import { fetchAllCategories, fetchCategoryProducts } from "@/lib/api";
import { Category, Product } from "@/types";
import CategoryView from "@/components/CategoryView";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let categories: Category[] = [];
  try {
    categories = await fetchAllCategories();
  } catch (err) {
    console.error("Failed to load categories:", err);
  }

  const category = categories.find((c) => c.slug === slug || c.id === slug);

 
  if (!category) {
    notFound();
  }

  let products: Product[] = [];
  try {
    products = await fetchCategoryProducts(slug);
  } catch (err) {
    console.error(`Failed to load products for category ${slug}:`, err);
  }

  return <CategoryView category={category} initialProducts={products} />;
}
