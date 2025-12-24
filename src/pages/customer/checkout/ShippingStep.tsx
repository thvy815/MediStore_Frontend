import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/pages/customer/checkout/CheckoutContext";

export default function ShippingStep() {
  const navigate = useNavigate();
  const { setShippingInfo } = useCheckout();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    // ✅ lưu vào context
    setShippingInfo(form);

    // 👉 sang bước Delivery
    navigate("/checkout/delivery");
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* ================= LEFT ================= */}
      <div className="col-span-2 bg-white rounded-xl p-6">
        <h3 className="font-semibold mb-4">🚚 Enter shipping address</h3>

        <div className="space-y-4">
          <Input label="Full Name" name="fullName" onChange={handleChange} />
          <Input label="Phone Number" name="phone" onChange={handleChange} />
          <Input label="Address" name="address" onChange={handleChange} />

          <div className="grid grid-cols-3 gap-4">
            <Input label="City" name="city" onChange={handleChange} />
            <Input label="District" name="district" onChange={handleChange} />
            <Input label="Ward" name="ward" onChange={handleChange} />
          </div>

          <button
            onClick={handleContinue}
            className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
          >
            Continue to Delivery Method
          </button>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <OrderSummary />
    </div>
  );
}

function Input({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        onChange={onChange}
        className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
      />
    </div>
  );
}

/* ================= ORDER SUMMARY ================= */
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
