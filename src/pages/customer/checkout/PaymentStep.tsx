import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";
import { deliveryService } from "@/services/deliveryService";
import type { PaymentMethod } from "@/types/delivery";

export default function PaymentStep() {
  const navigate = useNavigate();
  const { payment, setPayment } = useCheckout();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMethods = async () => {
      try {
        const res = await deliveryService.getPaymentMethods();
        setMethods(res.data.filter(m => m.isActive));
      } catch (err) {
        console.error("Failed to load payment methods", err);
      } finally {
        setLoading(false);
      }
    };
    loadMethods();
  }, []);

  const chooseMethod = (method: PaymentMethod) => {
    setPayment({
      id: method.id,
      code: method.code,
      name: method.name,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="font-semibold mb-4 text-lg">
        💳 Choose payment method
      </h3>

      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => chooseMethod(method)}
            className={`border p-4 rounded-lg cursor-pointer ${
              payment?.id === method.id
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            {method.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/checkout/delivery")}
        className="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300"
      >
        Back to Delivery
      </button>

      <button
        onClick={() => navigate("/checkout/review")}
        className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
        disabled={!payment}
      >
        Continue
      </button>
    </div>
  );
}
