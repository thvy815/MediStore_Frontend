import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/contexts/CheckoutContext";
import { voucherService } from "@/services/voucherService";
import type { Voucher } from "@/types/voucher";

export default function VoucherStep() {
  const navigate = useNavigate();
  const { voucher, setVoucher } = useCheckout();

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVouchers = async () => {
      try {
       const res = await voucherService.getAll();
        setVouchers(
  res.data.filter((v: Voucher) => v.status === "active")
);
      } catch (err) {
        console.error("Failed to load vouchers", err);
      } finally {
        setLoading(false);
      }
    };

    loadVouchers();
  }, []);

  const chooseVoucher = (item: Voucher) => {
    setVoucher(item);
  };

  const removeVoucher = () => {
    setVoucher(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="font-semibold mb-4 text-lg">
        🎟️ Choose voucher
      </h3>

      <div
        onClick={removeVoucher}
        className={`border rounded-lg p-4 mb-4 cursor-pointer ${
          !voucher ? "border-green-600 bg-green-50" : "border-gray-200"
        }`}
      >
        <p className="font-medium">Không dùng voucher</p>
        <p className="text-sm text-gray-500">
          Tiếp tục thanh toán không áp dụng mã giảm giá
        </p>
      </div>

      <div className="space-y-3">
        {vouchers.map((item) => (
          <div
            key={item.id}
            onClick={() => chooseVoucher(item)}
            className={`border p-4 rounded-lg cursor-pointer ${
              voucher?.id === item.id
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.code}</p>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>

                {item.minOrderValue > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Đơn tối thiểu: {item.minOrderValue.toLocaleString()}đ
                  </p>
                )}
              </div>

              <span className="text-green-600 font-semibold">
                {item.discountType === "percent"
                  ? `-${item.discountValue}%`
                  : item.discountType === "fixed"
                  ? `-${item.discountValue.toLocaleString()}đ`
                  : "Freeship"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/checkout/payment")}
        className="mt-4 w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300"
      >
        Back to Payment
      </button>

      <button
        onClick={() => navigate("/checkout/review")}
        className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
      >
        Continue
      </button>
    </div>
  );
}