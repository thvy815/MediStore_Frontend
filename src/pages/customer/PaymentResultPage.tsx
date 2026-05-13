import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentResult() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  const responseCode = params.get("vnp_ResponseCode");
  const txnRef = params.get("vnp_TxnRef");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        if (responseCode === "00") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
      }
    };

    checkPayment();
  }, [responseCode]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px] text-center">
        
        {status === "loading" && <p>Processing payment...</p>}

        {status === "success" && (
          <>
            <h2 className="text-green-600 text-xl font-bold">
              Payment Success 🎉
            </h2>
            <p className="mt-2">Transaction: {txnRef}</p>

            <button
              onClick={() => navigate("/customer/orders")}
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded"
            >
              View Orders
            </button>
          </>
        )}

        {status === "failed" && (
          <>
            <h2 className="text-red-600 text-xl font-bold">
              Payment Failed ❌
            </h2>
            <p className="mt-2">Please try again</p>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Back to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}