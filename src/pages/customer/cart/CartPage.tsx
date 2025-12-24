import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cartService } from "@/services/cartService";
import type { CartItem } from "@/types/cart";
import { useCheckout } from "@/contexts/CheckoutContext";
import { getCurrentUser } from "@/utils/auth";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedItems } = useCheckout();

const handlePurchase = () => {
  const user = getCurrentUser();

  if (!user) {
    alert("Vui lòng đăng nhập để đặt hàng");
    navigate("/login"); // hoặc mở modal login
    return;
  }

  const selected = items.filter(i => i.selected);

  if (selected.length === 0) {
    alert("Vui lòng chọn ít nhất 1 sản phẩm");
    return;
  }

  setSelectedItems(selected);
  navigate("/checkout/shipping");
};

  // ================= LOAD CART =================
  const loadCart = async () => {
    try {
      const res = await cartService.getCart();
      setItems(res.data); // res.data là CartItem[]
    } catch (err) {
      if (err === "NOT_LOGIN") {
        setItems([]);
      } else {
        console.error("Load cart failed", err);
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ================= TOGGLE SELECT =================
  const toggleSelect = async (item: CartItem) => {
    try {
      await cartService.updateItem(item.id, {
        quantity: item.quantity,
        productUnitId: item.productUnitId,
        selected: !item.selected, // ✅ ĐÚNG FIELD
      });

      loadCart();
    } catch (err) {
      console.error("Toggle select failed", err);
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (item: CartItem, qty: number) => {
    if (qty < 1) return;

    try {
      await cartService.updateItem(item.id, {
        quantity: qty,
        productUnitId: item.productUnitId,
        selected: item.selected,
      });

      loadCart();
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (id: string) => {
    try {
      await cartService.deleteItem(id);
      loadCart();
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };

  // ================= CALCULATE TOTAL =================
  const subtotal = items
    .filter((i) => i.selected) // ✅ CHỈ TÍNH ITEM ĐƯỢC CHỌN
    .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  if (loading) return (
    <div className="max-w-[1400px] mx-auto px-6 pt-24 flex justify-center">
      <p className="text-black">Loading cart...</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        {/* 🔙 BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        <h2 className="text-xl font-semibold mb-6">Shopping Cart</h2>

        <div className="grid grid-cols-3 gap-6">
          {/* ================= LEFT ================= */}
          <div className="col-span-2 bg-white rounded-xl p-6">
            {items.length === 0 && (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty
              </p>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-start border-b py-4 gap-4"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* ✅ CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item)}
                    className="w-4 h-4 accent-green-600 flex-shrink-0"
                  />

                  <img
                    src={item.imageUrl || "/assets/no-image.png"}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.productName}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.unitPrice.toLocaleString()}đ / {item.unitName}
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-2 w-24 justify-center flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* PRICE */}
                <div className="w-32 text-right flex-shrink-0">
                  <p className="text-green-600 font-semibold">
                    {(item.unitPrice * item.quantity).toLocaleString()}đ
                  </p>
                </div>

                {/* DELETE */}
                <div className="flex-shrink-0">
                  <button onClick={() => removeItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= RIGHT ================= */}
          <div className="bg-white rounded-xl p-6">
            <p className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </p>

            <p className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-green-600">
                {subtotal.toLocaleString()}đ
              </span>
            </p>

            <button
            disabled={subtotal === 0}
            onClick={handlePurchase}
            className={`mt-6 w-full py-3 rounded-xl text-white ${
              subtotal === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
