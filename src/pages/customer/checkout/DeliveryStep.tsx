import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/pages/customer/checkout/CheckoutContext";

export default function DeliveryStep() {
  const navigate = useNavigate();

  const {
    delivery,
    setDelivery,
  } = useCheckout();

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
    </div>
  );
}
