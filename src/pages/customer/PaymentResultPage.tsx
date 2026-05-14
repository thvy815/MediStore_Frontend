import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentResult() {

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  const responseCode = params.get("vnp_ResponseCode");

  const transactionStatus = params.get("vnp_TransactionStatus");

  const txnRef = params.get("vnp_TxnRef");

  useEffect(() => {

    const updatePayment = async () => {

      try {

        // SUCCESS
        if (
          responseCode === "00" &&
          transactionStatus === "00"
        ) {

          // CALL BE UPDATE STATUS
          await axios.post(
            `http://localhost:8080/api/payments/success/${txnRef}`
          );

          setStatus("success");

        } else {

          setStatus("failed");
        }

      } catch (err) {

        console.error(err);

        setStatus("failed");
      }
    };

    updatePayment();

  }, [responseCode, transactionStatus, txnRef]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[420px] text-center">

        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold">
              Processing Payment...
            </h2>

            <p className="mt-2 text-gray-500">
              Please wait
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Success 🎉
            </h2>

            <p className="mt-4">
              Transaction Ref:
            </p>

            <p className="font-semibold break-all">
              {txnRef}
            </p>

            <button
              onClick={() => navigate("/customer/orders")}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
            >
              View Orders
            </button>
          </>
        )}

        {status === "failed" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">
              Payment Failed ❌
            </h2>

            <p className="mt-4 text-gray-600">
              Your payment could not be completed.
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl"
            >
              Back to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}