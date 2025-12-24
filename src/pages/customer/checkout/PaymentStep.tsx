import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./CheckoutContext";
import { orderService } from "@/services/orderService";

export default function PaymentStep() {
  const navigate = useNavigate();
  const { selectedItems, delivery } = useCheckout();

  const [paymentMethod, setPaymentMethod] =
    useState<"online" | "cod">("cod");

    

  // ================= CALCULATE =================
  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

  const total = subtotal + delivery.fee;

  // ================= HANDLER =================
  const handleConfirmOrder = async () => {
    if (selectedItems.length === 0) {
      alert("No items selected");
      return;
    }

    try {
      await orderService.createOrder(
        selectedItems.map((i) => ({
          productId: i.productId,
          productUnitId: i.productUnitId,
          quantity: i.quantity,
        }))
      );

      alert("Order created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Create order failed");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
        {/* BACK */}
      <button
        onClick={() => navigate("/checkout/delivery")}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        <span>Back to Delivery</span>
      </button>

      {/* STEPS */}
      <div className="mb-6 flex gap-6 text-sm">
        <span className="text-green-600 font-semibold">1 Shipping</span>
        <span className="text-green-600 font-semibold">2 Delivery</span>
        <span className="text-green-600 font-semibold">3 Review</span>
        <span className="text-gray-400">4 Payment</span>
      </div>
      {/* LEFT */}
      <div className="col-span-2 bg-white rounded-xl p-6">
        <h3 className="font-semibold mb-4">💳 Choose payment method</h3>

        <div
          onClick={() => setPaymentMethod("online")}
          className={`border p-4 rounded-lg mb-3 cursor-pointer ${
            paymentMethod === "online"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >
          Payment Online
        </div>

        <div
          onClick={() => setPaymentMethod("cod")}
          className={`border p-4 rounded-lg cursor-pointer ${
            paymentMethod === "cod"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >
          Cash On Delivery
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={subtotal === 0}
          className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 disabled:bg-gray-400"
        >
          Confirm Order
        </button>
      </div>

      {/* RIGHT – ORDER SUMMARY (ĐỒNG BỘ) */}
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
  );
}
