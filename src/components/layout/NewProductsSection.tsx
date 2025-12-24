import ProductCard from "../medicine/ProductCard";
import type { ProductView } from "@/types/product"; 

interface Props {
  products: ProductView[];
  loading?: boolean;
}

export default function NewProductsSection({ products, loading }: Props) {
  return (
    <section className="px-6 pb-16">
      <h3 className="text-xl font-semibold mb-4">
        New Products at MediStore
      </h3>

      <div className="bg-[#e9f6ec] rounded-2xl p-6">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
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
  );
}
