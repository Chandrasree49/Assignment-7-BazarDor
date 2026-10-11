import ProtectedRoute from "@/components/ProtectedRoute";
import ProductDetailClient from "@/components/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <ProtectedRoute>
      <ProductDetailClient slug={slug} />
    </ProtectedRoute>
  );
}
