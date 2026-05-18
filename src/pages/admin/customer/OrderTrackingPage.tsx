import { useEffect, useState } from "react";
import { CreditCard, Truck, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import type { Order } from "@/types/order";
import { orderService } from "@/services/orderService";

export default function OrderTrackingPage() {
  const location = useLocation();

  const [orders, setOrders] = useState<Order[]>([]);
  const [customerKeyword, setCustomerKeyword] = useState("");
  const [statusKeyword, setStatusKeyword] = useState("");
  const [dateKeyword, setDateKeyword] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await orderService.getAll();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkDelivered = async (orderId: string) => {
    if (!confirm("Xác nhận đơn hàng đã giao?")) return;

    try {
      await orderService.markDelivered(orderId);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  const filtered = orders
    .filter((o) => {
      const customerMatch =
        !customerKeyword ||
        (o.shippingName || "")
          .toLowerCase()
          .includes(customerKeyword.toLowerCase());

      const statusMatch =
        !statusKeyword ||
        (o.status || "").toLowerCase() === statusKeyword.toLowerCase();

      const dateMatch =
        !dateKeyword ||
        (o.createdAt && o.createdAt.slice(0, 10) === dateKeyword);

      return customerMatch && statusMatch && dateMatch;
    })
    .sort((a, b) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <div className="w-[240px] bg-white border-r p-5">
        <h2 className="text-xl font-bold">Customer</h2>

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
              location.pathname === "/admin/customer/order"
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
              location.pathname === "/admin/customer/list"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Customer List</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Order Tracking</h1>
            <p className="text-gray-500 mt-1">
              Monitor and manage all customer orders
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <input
              placeholder="Search customer..."
              value={customerKeyword}
              onChange={(e) => setCustomerKeyword(e.target.value)}
              className="border bg-white rounded-xl px-4 py-3"
            />

            <select
              value={statusKeyword}
              onChange={(e) => setStatusKeyword(e.target.value)}
              className="border bg-white rounded-xl px-4 py-3"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <input
              type="date"
              value={dateKeyword}
              onChange={(e) => setDateKeyword(e.target.value)}
              className="border bg-white rounded-xl px-4 py-3"
            />
          </div>

          <div className="mt-8 bg-white rounded-2xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((order) => (
                  <tr key={order.orderId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">
                          {order.shippingName || "-"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.shippingPhone || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {order.orderId.slice(0, 8).toUpperCase()}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("vi-VN")
                        : "-"}
                    </td>

                    <td className="px-6 py-4">
                      {order.items?.length || 0} items
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {Number(order.totalAmount || 0).toLocaleString("vi-VN")}đ
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {order.status === "pending" ? (
                        <button
                          onClick={() => handleMarkDelivered(order.orderId)}
                          className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-medium hover:bg-green-700"
                        >
                          Mark Delivered
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">No action</span>
                      )}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-500">
                      No orders found
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