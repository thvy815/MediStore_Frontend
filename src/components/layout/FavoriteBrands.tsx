import type { BrandView } from "@/types/brand"; 

interface Props {
  brands: BrandView[];
}

export default function FavoriteBrands({ brands }: Props) {
  return (
    <section className="px-6 pb-20">
      <h3 className="text-xl font-semibold mb-6">
        Favorite Brands
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="border rounded-xl p-4 hover:shadow cursor-pointer"
          >
            {/* Brand name */}
            <p className="text-lg font-semibold text-gray-800 mb-1">
              {brand.name}
            </p>

            {/* Country */}
            {brand.country && (
              <p className="text-sm text-gray-500 mb-2">
                {brand.country}
              </p>
            )}

            {/* Description */}
            {brand.description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {brand.description}
              </p>
            )}

            {/* Product count – CHỈ HIỂN THỊ KHI CÓ */}
            {brand.products && (
              <p className="text-xs text-green-600 mt-3">
                {brand.products.length} products
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
