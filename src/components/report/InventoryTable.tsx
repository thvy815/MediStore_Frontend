import type { InventoryReport } from "@/types/report";

interface Props {
  products: InventoryReport[];
}

export default function InventoryTable({
  products,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-5">
      <h2 className="text-lg font-bold mb-4">
        Inventory Report
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Product</th>
            <th className="text-left py-3">Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">
                {item.productName}
              </td>

              <td>{item.remainingQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}