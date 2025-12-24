import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";

export default function ShippingStep() {
  const navigate = useNavigate();
  const { setShippingInfo } = useCheckout();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    // ❌ nếu còn lỗi → không cho đi tiếp
    if (Object.keys(newErrors).length > 0) return;

    // ✅ lưu vào context
    setShippingInfo(form);

    // 👉 sang bước Delivery
    navigate("/checkout/delivery");
  };

  return (
    <>
        <h3 className="font-semibold mb-4">🚚 Enter shipping address</h3>

        <div className="space-y-4">
          <Input label="Full Name" name="fullName" onChange={handleChange} error={errors.fullName} />
          <Input label="Phone Number" name="phone" onChange={handleChange} error={errors.phone} />
          <Input label="Address" name="address" onChange={handleChange} error={errors.address}/>

          <button
            onClick={handleContinue}
            className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
          >
            Continue to Delivery Method
          </button>
        </div>
      </>
  );
}

function Input({
  label,
  name,
  onChange,
  error,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        onChange={onChange}
        className={`mt-1 w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-green-600"
          }`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

