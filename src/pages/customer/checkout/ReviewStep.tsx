import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";
import { orderService } from "@/services/orderService";
import { useState } from "react";

export default function ReviewStep() {
  const navigate = useNavigate();
  const { selectedItems, shippingInfo, delivery, payment } = useCheckout();
  const [loading, setLoading] = useState(false);

  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );
  const total = subtotal + delivery.fee;

  const handleConfirmOrder = async () => {
    if (selectedItems.length === 0) {
      alert("No items selected");
      return;
    }

    if (!shippingInfo || !delivery.id || !payment) {
      alert("Please complete all steps");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: selectedItems.map((i) => ({
          productId: i.productId,
          productUnitId: i.productUnitId,
          quantity: i.quantity,
        })),
        shippingName: shippingInfo.fullName,
        shippingPhone: shippingInfo.phone,
        shippingAddress: shippingInfo.address,
        deliveryMethodId: delivery.id,
        paymentMethodId: payment.id,
      };

      const res = await orderService.createOrder(orderData);

      alert(`Order placed successfully! Order ID: ${res.data.orderId}`);
      navigate("/customer/home");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Create order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-4">📋 Review Order</h3>

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
                      src={item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:8080${item.imageUrl}`) : "/assets/no-image.png"}
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

            <div className="flex justify-between">
              <span>
                {delivery.name} ({delivery.description})
              </span>

              <span className="font-medium">
                {delivery.fee.toLocaleString()}đ
              </span>
            </div>
          </section>

          {/* PAYMENT */}
          <section className="bg-gray-50 rounded-lg p-4 text-sm">
            <h4 className="font-medium mb-2">Payment Method</h4>

            <div className="flex justify-between">
              <span>
                {payment?.name || "Not selected"}
              </span>
            </div>
          </section>

          {/* ORDER SUMMARY */}
          <section className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{delivery.fee.toLocaleString()}đ</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-green-700 text-base">
              <span>Total</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </section>

          <button
            onClick={() => navigate("/checkout/payment")}
            className="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300"
          >
            Back to Payment
          </button>

          <button
            onClick={handleConfirmOrder}
            disabled={subtotal === 0 || loading}
            className={`mt-4 w-full py-3 rounded-xl text-white transition
            ${
              loading || subtotal === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading ? "Placing order..." : "Confirm Order"}
          </button>
    </div>
  );
}
