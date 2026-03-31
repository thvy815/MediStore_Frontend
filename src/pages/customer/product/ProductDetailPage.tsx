import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { productDetailService } from "@/services/productDetailService";
import { cartService } from "@/services/cartService";
import type { ProductDetail } from "@/types/productDetail";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    // 👉 Scroll lên đầu trang
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    const loadProduct = async () => {
      try {
        const res = await productDetailService.getProductDetail(id);
        setProduct(res.data);
        // Set default unit
        const defaultUnit = res.data.units.find(u => u.isDefault) || res.data.units[0];
        setSelectedUnit(defaultUnit?.id || "");
      } catch (err) {
        console.error("Failed to load product detail", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedUnit) {
      alert("Please select a unit");
      return;
    }

    const unit = product!.units.find(u => u.id === selectedUnit);
    if (!unit || unit.availableQuantity <= 0) {
      alert("This product is out of stock");
      return;
    }

    if (quantity > unit.availableQuantity) {
      alert(`Only ${unit.availableQuantity} items available`);
      return;
    }

    try {
      await cartService.addToCart({
        productId: product!.id,
        productUnitId: selectedUnit,
        quantity,
      });
      alert("Added to cart!");
    } catch (err: any) {
      console.error("Add to cart failed", err);
      alert(err.response?.data?.message || "Cannot add to cart");
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  if (!product) return <div className="min-h-screen flex justify-center items-center">Product not found</div>;

  const selectedUnitData = product.units.find(u => u.id === selectedUnit);

  return (
    <div className="bg-[#f5f7fa] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT - IMAGE */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center">
            <img
              src={
                product.imageUrl
                  ? product.imageUrl.startsWith("http")
                    ? product.imageUrl
                    : `http://localhost:8080${product.imageUrl}`
                  : "/assets/no-image.png"
              }
              alt={product.name}
              className="h-[400px] object-contain"
            />
          </div>

          {/* RIGHT - INFO */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-black">
                {product.name}
              </h1>

              <div className="text-base text-gray-800 mt-3 space-y-1">
                <p>Mã: {product.code}</p>
                <p>Thương hiệu: {product.brandName}</p>
                <p>Danh mục: {product.categoryName}</p>
              </div>
            </div>

            {/* PRICE */}
            {selectedUnitData && (
              <div className="text-2xl font-bold text-green-600">
                {selectedUnitData.price.toLocaleString()}đ
              </div>
            )}

            {/* UNIT */}
            <div>
              <h3 className="font-semibold mb-2">Chọn đơn vị</h3>

              <div className="flex flex-wrap gap-2">
                {product.units
                  .filter(u => u.isActive)
                  .map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => setSelectedUnit(unit.id)}
                      disabled={unit.availableQuantity <= 0}
                      className={`px-4 py-2 rounded-xl border text-sm transition
                        ${
                          unit.availableQuantity <= 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : selectedUnit === unit.id
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white hover:border-green-400"
                        }
                      `}
                    >
                      {unit.unitName}
                      {unit.availableQuantity <= 0 && " (Hết hàng)"}
                    </button>
                  ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div>
              <h3 className="font-semibold mb-2">Số lượng</h3>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 border rounded-lg text-lg"
                >
                  -
                </button>

                <span className="text-lg font-semibold w-10 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 border rounded-lg text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* TOTAL */}
            {selectedUnitData && (
              <div className="text-lg font-semibold">
                Tổng:{" "}
                <span className="text-green-600">
                  {(selectedUnitData.price * quantity).toLocaleString()}đ
                </span>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold shadow-md"
            >
              <ShoppingCart size={20} />
              Thêm vào giỏ hàng
            </button>

            {/* WARNING */}
            {product.prescriptionRequired && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                ⚠️ Sản phẩm cần kê đơn bác sĩ
              </div>
            )}

            {/* DESCRIPTION */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Mô tả</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* INGREDIENTS */}
            {product.ingredients && (
              <div>
                <h3 className="font-semibold mb-2">Thành phần</h3>
                <p className="text-sm text-gray-600">
                  {product.ingredients}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}