import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../contexts/CheckoutContext";
import { orderService } from "@/services/orderService";

export default function PaymentStep() {
  const navigate = useNavigate();
  const { selectedItems } = useCheckout();

  const [paymentMethod, setPaymentMethod] =
    useState<"online" | "cod">("cod");

  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

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
      navigate("/customer/home");
    } catch (err) {
      console.error(err);
      alert("Create order failed");
    }
  };

  return (
    <>
      <h3 className="font-semibold mb-4 text-lg">
        💳 Choose payment method
      </h3>

      <div className="space-y-3">
        <div
          onClick={() => setPaymentMethod("online")}
          className={`border p-4 rounded-lg cursor-pointer ${
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
      </div>

      <button
        onClick={handleConfirmOrder}
        disabled={subtotal === 0}
        className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 disabled:bg-gray-400"
      >
        Confirm Order
      </button>
    </>
  );
}
