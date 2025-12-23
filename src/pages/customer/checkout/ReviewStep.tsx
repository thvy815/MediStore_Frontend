import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/pages/customer/checkout/CheckoutContext";

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

      {/* STEPS */}
      <div className="mb-6 flex gap-6 text-sm">
        <span className="text-green-600 font-semibold">1 Shipping</span>
        <span className="text-green-600 font-semibold">2 Delivery</span>
        <span className="text-green-600 font-semibold">3 Review</span>
        <span className="text-gray-400">4 Payment</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* ================= LEFT ================= */}
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
                <p><b>Ward:</b> {shippingInfo.ward}</p>
                <p><b>District:</b> {shippingInfo.district}</p>
                <p><b>City:</b> {shippingInfo.city}</p>
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

        {/* ================= RIGHT ================= */}
        <OrderSummary />
      </div>
    </div>
  );
}

/* ================= ORDER SUMMARY (INLINE) ================= */
function OrderSummary() {
  const { selectedItems, delivery } = useCheckout();

  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

  const total = subtotal + delivery.fee;

  return (
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
  );
}
