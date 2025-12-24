import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";

export default function ReviewStep() {
  const navigate = useNavigate();
  const { selectedItems, shippingInfo, delivery } = useCheckout();

  return (
    <div className="bg-gray-50 min-h-screen px-8 py-6">
      {/* BACK */}
      <button
        onClick={() => navigate("/checkout/delivery")}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        <span>Back to Delivery</span>
      </button>

        <div className="col-span-2 bg-white rounded-xl p-6 space-y-6">
          <h3 className="font-semibold text-lg">
            Review Order Information
          </h3>

          {/* SHIPPING INFO */}
          {shippingInfo && (
            <section className="bg-gray-50 rounded-lg p-4 text-sm">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p><b>Name:</b> {shippingInfo.fullName}</p>
                <p><b>Phone:</b> {shippingInfo.phone}</p>
                <p><b>Address:</b> {shippingInfo.address}</p>
            </section>
            )}


          {/* ORDER ITEMS */}
          <section>
            <h4 className="font-medium mb-2">Order Items</h4>

            <div className="space-y-3">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-green-700">
                    {(item.unitPrice * item.quantity).toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DELIVERY */}
          <section className="bg-gray-50 rounded-lg p-4 text-sm">
            <h4 className="font-medium mb-2">Delivery Method</h4>
            <p>
              {delivery.id === "standard"
                ? "Standard Delivery (3–5 days)"
                : "Express Delivery (1–2 days)"}
            </p>
          </section>

          <button
            onClick={() => navigate("/checkout/payment")}
            className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
          >
            Continue to Payment
          </button>
        </div>
      </div>
  );
}
