import { useEffect, useState } from "react";
import {
  CreditCard,
  Truck,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import type { Payment } from "@/types/payment";
import { paymentService } from "@/services/paymentService";

export default function TransactionHistoryPage() {
  const location = useLocation();

  const [payments, setPayments] = useState<Payment[]>([]);

  const [customerKeyword, setCustomerKeyword] =
    useState("");

  const [methodKeyword, setMethodKeyword] =
    useState("");

  const [dateKeyword, setDateKeyword] =
    useState("");

  const fetchPayments = async () => {
    try {
      const res = await paymentService.getAll();
      setPayments(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filtered = payments
  .filter((p) => {
    const customerMatch =
      !customerKeyword ||
      (p.customerName || "")
        .toLowerCase()
        .includes(customerKeyword.toLowerCase());

    const methodMatch =
      !methodKeyword ||
      (p.paymentMethod || "")
        .toLowerCase()
        .includes(methodKeyword.toLowerCase());

    const dateMatch =
      !dateKeyword ||
      (p.createdAt &&
        p.createdAt.slice(0, 10) === dateKeyword);

    return (
      customerMatch &&
      methodMatch &&
      dateMatch
    );
  })
  .sort((a, b) => {
    return (
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r p-5">
        <h2 className="text-xl font-bold">
          Customer
        </h2>

        <div className="space-y-2 mt-6">
          <Link
            to="/admin/customer"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === "/admin/customer"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Transaction History</span>
          </Link>

          <Link
            to="/admin/customer/order"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname ===
              "/admin/customer/order"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Truck className="w-5 h-5" />
            <span>Order Tracking</span>
          </Link>

          <Link
            to="/admin/customer/list"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname ===
              "/admin/customer/list"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Customer List</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          <div>
            <h1 className="text-3xl font-bold">
              Transaction Management
            </h1>

            <p className="text-gray-500 mt-1">
              View and manage all payment transactions
            </p>
          </div>

          {/* Search Filters */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <input
              placeholder="Search customer..."
              value={customerKeyword}
              onChange={(e) =>
                setCustomerKeyword(
                  e.target.value
                )
              }
              className="border bg-white rounded-xl px-4 py-3"
            />

            <select
                value={methodKeyword}
                onChange={(e) =>
                    setMethodKeyword(e.target.value)
                }
                className="border bg-white rounded-xl px-4 py-3"
                >
                <option value="">
                    All payment methods
                </option>
                <option value="Cash on Delivery">
                    Cash on Delivery
                </option>
                <option value="VN Pay">
                    VN Pay
                </option>
            </select>

            <input
                type="date"
                value={dateKeyword}
                onChange={(e) =>
                    setDateKeyword(e.target.value)
                }
                className="border bg-white rounded-xl px-4 py-3"
            />
          </div>

          {/* Table */}
          <div className="mt-8 bg-white rounded-2xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left">
                  <th className="px-6 py-4">
                    Customer
                  </th>
                  <th className="px-6 py-4">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4">
                    Date & Time
                  </th>
                  <th className="px-6 py-4">
                    Payment Method
                  </th>
                  <th className="px-6 py-4">
                    Amount
                  </th>
                  <th className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {payment.customerName || "-"}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {payment.transactionRef || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {payment.createdAt
                        ? new Date(
                            payment.createdAt
                          ).toLocaleString(
                            "vi-VN"
                          )
                        : "-"}
                    </td>

                    <td className="px-6 py-4">
                      {payment.paymentMethod ||
                        "-"}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {Number(
                        payment.amount || 0
                      ).toLocaleString("vi-VN")}
                      đ
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status ===
                          "success"
                            ? "bg-green-100 text-green-700"
                            : payment.status ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status || "-"}
                      </span>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-500"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}