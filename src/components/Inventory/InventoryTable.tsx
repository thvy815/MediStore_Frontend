import type { InventoryBatchResponse } from "@/types/inventory";

interface Props {
  data: InventoryBatchResponse[];
}

const InventoryTable = ({ data }: Props) => {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-500">
        <tr>
          <th className="p-3 text-left">Batch Number</th>
          <th className="p-3 text-left">Product Name</th>
          <th className="p-3 text-left">Supplier</th>
          <th className="p-3 text-left">Unit Type</th>
          <th className="p-3 text-left">Quantity</th>
          <th className="p-3 text-left">Expiry Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((b) => (
          <tr key={b.id} className="border-t">
            <td className="p-3 text-blue-600 font-medium">
              {b.batchNumber}
            </td>
            <td className="p-3">{b.productName}</td>
            <td className="p-3">{b.supplierName}</td>
            <td className="p-3">{b.unitType}</td>
            <td className="p-3">{b.quantity}</td>
            <td className="p-3">
              {new Date(b.expiryDate).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
