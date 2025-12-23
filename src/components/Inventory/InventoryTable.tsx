import type { InventoryBatchResponse } from "@/types/inventory";

interface Props {
  data: InventoryBatchResponse[];
}

const InventoryTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3 text-left">Batch</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Supplier</th>
            <th className="p-3 text-left">Law</th>
            <th className="p-3 text-left">Unit</th>
            <th className="p-3 text-right">Qty Imported</th>
            <th className="p-3 text-right">Qty Remaining</th>
            <th className="p-3 text-right">Import Price</th>
            <th className="p-3 text-left">Expiry</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((b) => (
            <tr key={b.id} className="border-t hover:bg-gray-50">
              {/* Batch */}
              <td className="p-3 font-medium text-blue-600">
                {b.batchNumber}
              </td>

              {/* Product */}
              <td className="p-3">{b.productName}</td>

              {/* Supplier */}
              <td className="p-3">{b.supplierName}</td>

              {/* Law */}
              <td className="p-3">
                {b.lawCode ? (
                  <div>
                    <div className="font-medium">{b.lawCode}</div>
                    <div className="text-xs text-gray-500">
                      {b.lawTitle}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">—</span>
                )}
              </td>

              {/* Unit */}
              <td className="p-3">{b.smallestUnitName}</td>

              {/* Qty Imported */}
              <td className="p-3 text-right">
                {b.quantityImported}
              </td>

              {/* Qty Remaining */}
              <td className="p-3 text-right font-medium">
                {b.quantityRemaining}
              </td>

              {/* Import Price */}
              <td className="p-3 text-right">
                {b.importPrice.toLocaleString()} đ
              </td>

              {/* Expiry */}
              <td className="p-3">
                {new Date(b.expiryDate).toLocaleDateString()}
              </td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      b.status === "valid"
                        ? "bg-green-100 text-green-700"
                        : b.status === "expired"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
