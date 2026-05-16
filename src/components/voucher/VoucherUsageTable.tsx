import { Search } from "lucide-react";
import type { VoucherHistory } from "@/types/voucher";

interface Props {
  history: VoucherHistory[];
}

export default function VoucherUsageTable({
  history,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b">
        <h3 className="text-lg font-semibold">
          Usage History
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Track who used vouchers and
          usage activity
        </p>
      </div>

      {/* Search */}
      <div className="p-5 border-b">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Search by customer, order ID or voucher code..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="text-left p-4">
                Voucher Code
              </th>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Order ID
              </th>

              <th className="text-left p-4">
                Discount
              </th>

              <th className="text-left p-4">
                Used At
              </th>

              <th className="text-left p-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.orderId}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <span className="text-blue-600 font-medium">
                    {item.voucherCode}
                  </span>
                </td>

                <td className="p-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      {item.customerName}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  {item.orderId}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  -
                  {item.discountAmount.toLocaleString()}
                  đ
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(
                    item.usedAt
                  ).toLocaleString(
                    "vi-VN"
                  )}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Completed
                  </span>
                </td>
              </tr>
            ))}

            {history.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  No usage history
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-5 text-sm text-gray-500 border-t">
        <span>
          Showing {history.length}{" "}
          records
        </span>

        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-gray-400">
            Previous
          </button>

          <button className="w-10 h-10 rounded-lg bg-green-500 text-white">
            1
          </button>

          <button className="px-4 py-2 border rounded-lg text-gray-400">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}