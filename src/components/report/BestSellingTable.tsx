import type { BestSellingProduct } from "@/types/report";

interface Props {
  products: BestSellingProduct[];
}

export default function BestSellingTable({ products }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-5">
      <h2 className="text-lg font-bold mb-4">Best Selling Products</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Product</th>
            <th className="text-left py-3">Sold</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{item.productName}</td>
              <td>{item.quantitySold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}