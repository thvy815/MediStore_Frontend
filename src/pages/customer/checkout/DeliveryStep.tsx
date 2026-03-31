import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";
import { deliveryService } from "@/services/deliveryService";
import type { DeliveryMethod } from "@/types/delivery";

export default function DeliveryStep() {
  const navigate = useNavigate();
  const { delivery, setDelivery } = useCheckout();
  const [methods, setMethods] = useState<DeliveryMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMethods = async () => {
      try {
        const res = await deliveryService.getDeliveryMethods();
        setMethods(res.data.filter(m => m.isActive));
      } catch (err) {
        console.error("Failed to load delivery methods", err);
      } finally {
        setLoading(false);
      }
    };
    loadMethods();
  }, []);

  const chooseMethod = (method: DeliveryMethod) => {
    setDelivery({
      id: method.id,
      fee: method.baseFee,
      name: method.name,
      description: method.description,
      estimatedDays: method.estimatedDays,
    });
  };

  if (loading) return <div className="bg-gray-50 min-h-screen px-8 py-6">Loading...</div>;
  return (
    <div>
      <h3 className="font-semibold mb-4">
        🚚 Choose delivery method
      </h3>

      {methods.map((method) => (
        <div
          key={method.id}
          onClick={() => chooseMethod(method)}
          className={`border rounded-lg p-4 mb-4 cursor-pointer ${
            delivery.id === method.id
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{method.name}</p>
              <p className="text-sm text-gray-500">
                {method.description}
              </p>
            </div>
            <span className="text-green-600 font-semibold">
              {method.baseFee.toLocaleString()}đ
            </span>
          </div>
        </div>
      ))}

      <button
        onClick={() => navigate("/checkout/shipping")}
        className="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300"
      >
        Back to Shipping
      </button>

      <button
        onClick={() => navigate("/checkout/payment")}
        className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
        disabled={!delivery.id}
      >
        Continue
      </button>
    </div>
  );
}
