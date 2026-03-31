import { useEffect, useState } from "react";
import { deliveryService } from "@/services/deliveryService";
import type { PaymentMethod } from "@/types/delivery";

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMethods = async () => {
      try {
        const res = await deliveryService.getPaymentMethods();
        setMethods(res.data);
      } catch (err) {
        console.error("Failed to load payment methods", err);
      } finally {
        setLoading(false);
      }
    };
    loadMethods();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <div className="grid gap-4">
        {methods.map((method) => (
          <div key={method.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{method.name}</h3>
            <p className="text-sm text-gray-600">Code: {method.code}</p>
            <p className="text-sm">Active: {method.isActive ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}