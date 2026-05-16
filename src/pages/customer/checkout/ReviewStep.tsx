import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";
import { orderService } from "@/services/orderService";
import { useState } from "react";

export default function ReviewStep() {
  const navigate = useNavigate();

  const { selectedItems, shippingInfo, delivery, payment, voucher } =
    useCheckout();

  const [loading, setLoading] = useState(false);

  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

  const deliveryFee = delivery?.fee || 0;
  const beforeDiscount = subtotal + deliveryFee;

  let discountAmount = 0;

  if (voucher) {
    if (voucher.discountType === "percent") {
      discountAmount = beforeDiscount * (voucher.discountValue / 100);

      if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
        discountAmount = voucher.maxDiscount;
      }
    }

    if (voucher.discountType === "fixed") {
      discountAmount = voucher.discountValue;
    }

    if (voucher.discountType === "freeship") {
      discountAmount = deliveryFee;
    }

    if (discountAmount > beforeDiscount) {
      discountAmount = beforeDiscount;
    }
  }

  const total = beforeDiscount - discountAmount;
  

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
          cartItemId: i.id,
          productId: i.productId,
          productUnitId: i.productUnitId,
          quantity: i.quantity,
        })),
        shippingName: shippingInfo.fullName,
        shippingPhone: shippingInfo.phone,
        shippingAddress: shippingInfo.address,
        deliveryMethodId: delivery.id,
        paymentMethodId: payment.id,
        voucherCode: voucher ? voucher.code : null,
      };

      // 1. Tạo order trước
      const res = await orderService.createOrder(orderData);
      const orderId = res.data.orderId;
      console.log("ORDER DATA:", orderData);

      // 2. Nếu không phải VNPay → done luôn
      if (payment.code !== "vnpay") {
        alert("Order placed successfully!");
        navigate("/orders");
        return;
      }

      // 3. VNPay flow
      const r = await fetch("http://localhost:8080/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          paymentMethodId: payment.id,
          amount: total,
        }),
      });

      if (!r.ok) {
        const err = await r.text();
        throw new Error(err);
      }

      const paymentRes = await r.json();

      console.log("VNPay response:", paymentRes);

      const paymentUrl =
        paymentRes?.paymentUrl || paymentRes?.data?.paymentUrl;

      if (!paymentUrl) {
        console.error("Invalid VNPay response:", paymentRes);
        alert("Không tạo được VNPay URL");
        return;
      }

      window.location.href = paymentUrl;

      // backend trả về URL VNPay
      window.location.href = paymentRes.paymentUrl;
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "response" in err
          ? (err as any).response?.data?.message
          : undefined;
      alert(message || "Create order failed");
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
          <p>
            <b>Name:</b> {shippingInfo.fullName}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phone}
          </p>
          <p>
            <b>Address:</b> {shippingInfo.address}
          </p>
        </section>
      )}

      {/* ORDER ITEMS */}
      <section className="mt-4">
        <h4 className="font-medium mb-2">Order Items</h4>

        <div className="space-y-3">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    item.imageUrl
                      ? item.imageUrl.startsWith("http")
                        ? item.imageUrl
                        : `http://localhost:8080${item.imageUrl}`
                      : "/assets/no-image.png"
                  }
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
      <section className="bg-gray-50 rounded-lg p-4 text-sm mt-4">
        <h4 className="font-medium mb-2">Delivery Method</h4>

        <div className="flex justify-between">
          <span>
            {delivery.name} ({delivery.description})
          </span>

          <span className="font-medium">
            {deliveryFee.toLocaleString()}đ
          </span>
        </div>
      </section>

      {/* PAYMENT */}
      <section className="bg-gray-50 rounded-lg p-4 text-sm mt-4">
        <h4 className="font-medium mb-2">Payment Method</h4>

        <div className="flex justify-between">
          <span>{payment?.name || "Not selected"}</span>
        </div>
      </section>

      {/* VOUCHER */}
      <section className="bg-gray-50 rounded-lg p-4 text-sm mt-4">
        <h4 className="font-medium mb-2">Voucher</h4>

        {voucher ? (
          <div className="flex justify-between">
            <span>
              {voucher.code} - {voucher.description}
            </span>
            <span className="font-medium text-green-700">
              -{discountAmount.toLocaleString()}đ
            </span>
          </div>
        ) : (
          <span className="text-gray-500">No voucher selected</span>
        )}
      </section>

      {/* ORDER SUMMARY */}
      <section className="bg-gray-50 rounded-lg p-4 text-sm space-y-2 mt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>{deliveryFee.toLocaleString()}đ</span>
        </div>

        {voucher && (
          <div className="flex justify-between text-green-700">
            <span>Voucher Discount</span>
            <span>-{discountAmount.toLocaleString()}đ</span>
          </div>
        )}

        <hr />

        <div className="flex justify-between font-semibold text-green-700 text-base">
          <span>Total</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </section>

      <button
        onClick={() => navigate("/checkout/voucher")}
        className="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300"
      >
        Back to Voucher
      </button>

      <button
        onClick={handleConfirmOrder}
        disabled={subtotal === 0 || loading}
        className={`mt-4 w-full py-3 rounded-xl text-white transition ${
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