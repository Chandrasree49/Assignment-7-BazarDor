import { notFound } from "next/navigation";
import { fetchProductBySlugOrId } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductDetailView from "@/components/ProductDetailView";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlugOrId(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <ProductDetailView product={product} />
    </ProtectedRoute>
  );
}
