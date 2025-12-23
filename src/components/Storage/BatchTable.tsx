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
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2 border">Batch Number</th>
          <th className="p-2 border">Product Name</th>
          <th className="p-2 border">Supplier</th>
          <th className="p-2 border">Unit Type</th>
          <th className="p-2 border">Quantity</th>
          <th className="p-2 border">Expiry Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((b) => (
          <tr key={b.id} className="border-b hover:bg-gray-50">
            <td className="p-2 border">{b.batchNumber}</td>
            <td className="p-2 border">{b.productName}</td>
            <td className="p-2 border">{b.supplierName}</td>
            <td className="p-2 border">{b.smallestUnitName}</td>
            <td className="p-2 border">{b.quantity}</td>
            <td className="p-2 border">{b.expiryDate}</td>
            <td className="p-2 border">{b.status}</td>
            <td className="p-2 border text-center flex justify-center gap-2">
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
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BatchTable;
