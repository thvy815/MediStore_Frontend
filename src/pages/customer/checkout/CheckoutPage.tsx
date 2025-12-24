import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCheckout } from "./CheckoutContext";

export default function CheckoutLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const stepMap: Record<string, number> = {
    shipping: 1,
    delivery: 2,
    review: 3,
    payment: 4,
  };

  const currentStep =
    stepMap[location.pathname.split("/").pop() || "shipping"] || 1;

  return (
    <div className="bg-[#f6faf7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* BACK */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-green-600 mb-4"
        >
          <ArrowLeft size={18} />
          Back to cart
        </button>

        {/* STEPS */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <Step index={1} label="Shipping" active={currentStep >= 1} />
            <Line />
            <Step index={2} label="Delivery" active={currentStep >= 2} />
            <Line />
            <Step index={3} label="Review" active={currentStep >= 3} />
            <Line />
            <Step index={4} label="Payment" active={currentStep >= 4} />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="col-span-2 bg-white rounded-xl p-6">
            <Outlet />
          </div>

          {/* RIGHT */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

function Step({ index, label, active }: any) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          active ? "bg-green-700 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        {index}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
}

function Line() {
  return <div className="flex-1 h-[2px] bg-gray-200 mx-2" />;
}

/* ===== ORDER SUMMARY (CHUNG) ===== */
function OrderSummary() {
  const { selectedItems, delivery } = useCheckout();

  const subtotal = selectedItems.reduce(
    (s, i) => s + i.unitPrice * i.quantity,
    0
  );

  const total = subtotal + delivery.fee;

  return (
    <div className="bg-white rounded-xl p-6 h-fit">
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
  );
}
