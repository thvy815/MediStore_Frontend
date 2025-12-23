import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/pages/customer/checkout/CheckoutContext";

export default function DeliveryStep() {
  const navigate = useNavigate();

  const {
    selectedItems,
    delivery,
    setDelivery,
  } = useCheckout();

  // ================= CALCULATE =================
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const total = subtotal + delivery.fee;

  // ================= HANDLERS =================
  const chooseStandard = () => {
    setDelivery({ id: "standard", fee: 30000 });
  };

  const chooseExpress = () => {
    setDelivery({ id: "express", fee: 50000 });
  };

  // ================= RENDER =================
  return (
    <div className="bg-gray-50 min-h-screen px-8 py-6">
      {/* BACK */}
      <button
        onClick={() => navigate("/checkout/shipping")}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        <span>Back to Shipping</span>
      </button>

      {/* STEPS */}
      <div className="mb-6">
        <div className="flex items-center gap-6 text-sm">
          <span className="text-green-600 font-semibold">1 Shipping</span>
          <span className="text-green-600 font-semibold">2 Delivery</span>
          <span className="text-gray-400">3 Review</span>
          <span className="text-gray-400">4 Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* ================= LEFT ================= */}
        <div className="col-span-2 bg-white rounded-xl p-6">
          <h3 className="font-semibold mb-4">
            🚚 Choose delivery method
          </h3>

          {/* STANDARD */}
          <div
            onClick={chooseStandard}
            className={`border rounded-lg p-4 mb-4 cursor-pointer ${
              delivery.id === "standard"
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Standard Delivery</p>
                <p className="text-sm text-gray-500">
                  Delivery in 3–5 business days
                </p>
              </div>
              <span className="text-green-600 font-semibold">
                30.000đ
              </span>
            </div>
          </div>

          {/* EXPRESS */}
          <div
            onClick={chooseExpress}
            className={`border rounded-lg p-4 cursor-pointer ${
              delivery.id === "express"
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Express Delivery</p>
                <p className="text-sm text-gray-500">
                  Delivery in 1–2 business days
                </p>
              </div>
              <span className="text-green-600 font-semibold">
                50.000đ
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout/review")}
            className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
          >
            Continue to Review
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({selectedItems.length} items)</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{delivery.fee.toLocaleString()}đ</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-green-700">
              <span>Total</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
