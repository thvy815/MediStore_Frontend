import { ArrowLeft } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShippingStep from "@/pages/customer/checkout/ShippingStep";

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen px-8 py-6">
        <Outlet />
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
          <Step active label="Shipping" index={1} />
          <Line />
          <Step label="Delivery" index={2} />
          <Line />
          <Step label="Review" index={3} />
          <Line />
          <Step label="Payment" index={4} />
        </div>
      </div>

      {/* STEP 1 */}
      <ShippingStep />
    </div>
  );
}

function Step({
  label,
  index,
  active = false,
}: {
  label: string;
  index: number;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
          active ? "bg-green-700 text-white" : "bg-gray-200 text-gray-600"
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
