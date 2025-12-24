import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "@/services/productService";
import ProductCard from "@/components/medicine/ProductCard";
import type { ProductView } from "@/types/product";

export default function SearchPage() {
  const [params] = useSearchParams();
  const keyword = params.get("q") ?? "";
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!keyword.trim()) return;

  const loadSearch = async () => {
    setLoading(true);
    try {
      const res = await productService.search(keyword);

      const mappedProducts = res.data.map((p: any) => {
        const defaultUnit =
          p.units?.find((u: any) => u.isDefault && u.isActive) ??
          p.units?.[0] ??
          null;

        return {
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,

          unit: defaultUnit?.unitName ?? "",
          price: defaultUnit?.price ?? 0,
          productUnitId: defaultUnit?.id ?? "",
        };
      });

      setProducts(mappedProducts);
    } catch (err) {
      console.error("Search failed", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  loadSearch();
}, [keyword]);


  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <h2 className="text-xl font-semibold mb-6">
          Search results for "{keyword}"
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
