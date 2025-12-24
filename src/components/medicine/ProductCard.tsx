import React from "react";
import type { ProductView } from "../../types/product";
import { cartService } from "../../services/cartService";

interface ProductCardProps {
  product: ProductView;
  onBuy?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  const handleBuyNow = async () => {
    // 1) nếu parent muốn tự xử lý
    if (onBuy) {
      onBuy(product.id);
      return;
    }

    // 2) validate: phải có productUnitId
    if (!product.productUnitId) {
      alert("Product has no active unit to add.");
      return;
    }

    try {
      await cartService.addToCart({
        productId: String(product.id), // ✅ UUID string
        productUnitId: product.productUnitId,
        quantity: 1, // ✅ quantity >= 1
      });

      alert("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Cannot add product to cart");
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-32 h-32 object-contain mb-4"
      />

      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
        {product.name}
      </p>

      <p className="text-green-600 font-semibold mb-3">
        {product.price.toLocaleString()} VND/{product.unit}
      </p>

      <button
        className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700"
        onClick={handleBuyNow}
      >
        Buy now
      </button>
    </div>
  );
};

export default ProductCard;
