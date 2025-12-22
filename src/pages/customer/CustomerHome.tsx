import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/components/medicine/ProductCard";
import NewProductsSection from "@/components/layout/NewProductsSection";
import FeaturedCategories from "@/components/layout/FeaturedCategories";
import FavoriteBrands from "@/components/layout/FavoriteBrands";

import { productService } from "@/services/productService";
import { brandService } from "@/services/brandService";
import { categoryService } from "@/services/categoryService";

import type { ProductView } from "@/types/product";
import type { ProductUnitView } from "@/types/product";
import type { CategoryView } from "@/types/category";
import type { BrandView } from "@/types/brand";

export default function CustomerHome() {
  // ================= STATE =================
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<BrandView[]>([]);
  const [categories, setCategories] = useState<CategoryView[]>([]);

  // ================= LOAD PRODUCTS =================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // 1️⃣ Lấy product active
        const productRes = await productService.getActiveProducts();
        const productList = productRes.data;

        // 2️⃣ Với mỗi product → lấy unit active đầu tiên
        const productsWithPrice: ProductView[] = await Promise.all(
          productList.map(async (p: any) => {
            let unit: ProductUnitView | null = null;

            try {
              const unitRes = await productService.getActiveUnitsByProduct(p.id);
              unit = unitRes.data?.[0] ?? null;
            } catch {
              unit = null;
            }

            return {
              id: p.id,
              name: p.name,
              imageUrl: p.imageUrl,

              // price + unit để hiển thị
              unit: unit?.unit ?? "",
              price: unit?.price ?? 0,

              // productUnitId để add to cart
              productUnitId: unit?.id ?? "",
            };
          })
        );

        setProducts(productsWithPrice);
      } catch (err) {
        console.error("Failed to load home products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ================= LOAD BRANDS =================
  useEffect(() => {
    brandService
      .getAll()
      .then((res) => {
        const mappedBrands: BrandView[] = res.data.map((b: any) => ({
          id: b.id,
          name: b.name,
          country: b.country ?? undefined,
          description: b.description ?? undefined,
          products: b.products,
        }));

        setBrands(mappedBrands);
      })
      .catch(console.error);
  }, []);

  // ================= LOAD CATEGORY =================  
 useEffect(() => {
  categoryService
    .getAll()
    .then((res) => {
      const mappedCategories: CategoryView[] = res.data.map((c: any) => ({
        id: c.id,
        name: c.name,
        description: c.description ?? undefined, // 🔥 FIX Ở ĐÂY
      }));

      setCategories(mappedCategories);
    })
    .catch(console.error);
}, []);


  // ================= RENDER =================
  return (
    <div className="min-h-screen bg-[#f6faf7]">
      {/* ================= HERO ================= */}
      <section className="px-6 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Advertisement
          </h2>
          <p className="text-gray-600 mb-6">
            Where to grow your business as a photographer: site or social media?
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-md">
            Start
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src="/assets/advertisement.png"
            alt="Advertisement"
            className="w-full max-w-md"
          />
        </div>
      </section>

      {/* ================= BEST SELLING ================= */}
      <section className="px-6 pb-16">
        <div className="bg-[#e9f6ec] rounded-2xl p-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-md font-semibold">
            Best-Selling Products
          </div>

          <ChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" />
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />

          {loading ? (
            <p className="mt-10 text-center">Loading...</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= NEW PRODUCTS ================= */}
      <NewProductsSection products={products} loading={loading} />

      {/* ================= FEATURED CATEGORIES ================= */}
      <FeaturedCategories categories={[]}
       />
      

      {/* ================= FAVORITE BRANDS ================= */}
      <FavoriteBrands brands={brands} />
    </div>
  );
}
