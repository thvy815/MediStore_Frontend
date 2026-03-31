import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/components/medicine/ProductCard";
import NewProductsSection from "@/components/layout/NewProductsSection";
import FeaturedCategories from "@/components/layout/FeaturedCategories";
import FavoriteBrands from "@/components/layout/FavoriteBrands";
import HomeCarousel from "@/components/layout/HomeCarousel";

import { productService } from "@/services/productService";
import { brandService } from "@/services/brandService";
import { categoryService } from "@/services/categoryService";

import type { ProductView } from "@/types/product";
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
        const productsWithPrice: ProductView[] = productList.map((p: any) => {
        const activeUnits = p.units?.filter((u: any) => u.isActive) || [];

        const unit =
          activeUnits.find((u: any) => u.availableQuantity > 0) ||
          activeUnits.find((u: any) => u.isDefault) ||
          activeUnits[0] ||
          null;

        return {
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,

          unit: unit?.unitName ?? "",
          price: unit?.price ?? 0,
          productUnitId: unit?.id ?? "",

          availableQuantity: unit?.availableQuantity ?? 0,
        };
      });

        // Sort: available first, out of stock last
        productsWithPrice.sort((a, b) => {
          const aOut = a.availableQuantity <= 0;
          const bOut = b.availableQuantity <= 0;
          if (aOut && !bOut) return 1;
          if (!aOut && bOut) return -1;
          return 0;
        });

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
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* ================= HERO CAROUSEL ================= */}
        <section className="py-10">
          <HomeCarousel />
        </section>

        {/* ================= BEST SELLING ================= */}
        <section className="pb-16">
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
        <FeaturedCategories categories={categories} />
        

        {/* ================= FAVORITE BRANDS ================= */}
        <FavoriteBrands brands={brands} />
      </div>
    </div>
  );
}
