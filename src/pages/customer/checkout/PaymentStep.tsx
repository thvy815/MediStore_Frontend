import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PaymentStep() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState<"online" | "cod">("cod");

  return (
    <>
    {/* BACK */}
      <button
        onClick={() => navigate("/checkout/delivery")}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        <span>Back to Delivery</span>
      </button>
      
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
            onClick={() => navigate("/checkout/review")}
            className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
          >
            Continue
          </button>
    </>
  );
}
