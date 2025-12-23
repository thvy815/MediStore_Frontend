import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { BatchResponse } from "@/types/batch";

interface Props {
  data: BatchResponse[];
  onView?: (batch: BatchResponse) => void;
  onEdit?: (batch: BatchResponse) => void;
  onDelete?: (batch: BatchResponse) => Promise<void>;
}

const BatchTable: React.FC<Props> = ({ data, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Batch No</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Supplier</th>
            <th className="p-2 border">Unit</th>

            <th className="p-2 border text-right">Import Quantity</th>
            <th className="p-2 border text-right">Remaining Quantity</th>
            <th className="p-2 border text-right">Import Price</th>

            <th className="p-2 border">Expiry Date</th>
            <th className="p-2 border text-right">Law Code</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={10} className="p-4 text-center text-gray-500">
                No batches found
              </td>
            </tr>
          )}

          {data.map((b) => (
            <tr key={b.id} className="border-b hover:bg-gray-50">
              <td className="p-2 border">{b.batchNumber}</td>
              <td className="p-2 border">{b.productName}</td>
              <td className="p-2 border">{b.supplierName}</td>
              <td className="p-2 border">{b.smallestUnitName}</td>

              <td className="p-2 border text-right">
                {b.quantityImported}
              </td>

              <td className="p-2 border text-right font-semibold">
                {b.quantityRemaining}
              </td>

              <td className="p-2 border text-right">
                {Number(b.importPrice).toLocaleString("vi-VN")} ₫
              </td>

              <td className="p-2 border">
                {new Date(b.expiryDate).toLocaleDateString("vi-VN")}
              </td>

              <td className="p-2 border text-right">
                {b.lawCode}
              </td>

              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    b.status === "IN_STOCK"
                      ? "bg-green-100 text-green-700"
                      : b.status === "EXPIRING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {b.status}
                </span>
              </td>

              <td className="p-2 border text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView?.(b)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit?.(b)}
                    className="text-green-600 hover:text-green-800"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete?.(b)}
                    className="text-red-600 hover:text-red-800"
                    title="Recall"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchTable;
