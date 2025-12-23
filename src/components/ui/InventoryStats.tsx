type InventoryTab = "IN_STOCK" | "EXPIRING" | "LOW";

interface Props {
  active: InventoryTab;
  inStock: number;
  expiring: number;
  lowStock: number;
  onChange: (key: InventoryTab) => void;
}

const InventoryStats = ({
  active,
  inStock,
  expiring,
  lowStock,
  onChange,
}: Props) => {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium flex gap-2 items-center border";

  return (
    <div className="flex gap-3">
      <button
        className={`${base} ${
          active === "IN_STOCK"
            ? "bg-green-500 text-white border-green-500"
            : "bg-white"
        }`}
        onClick={() => onChange("IN_STOCK")}
      >
        📦 In Stock
        <span className="px-2 rounded-full bg-white/20">{inStock}</span>
      </button>

      <button
        className={`${base} ${
          active === "EXPIRING"
            ? "bg-green-500 text-white border-green-500"
            : "bg-white"
        }`}
        onClick={() => onChange("EXPIRING")}
      >
        ⚠️ Nearby Expire
        <span className="px-2 rounded-full bg-white/20">{expiring}</span>
      </button>

      <button
        className={`${base} ${
          active === "LOW"
            ? "bg-green-500 text-white border-green-500"
            : "bg-white"
        }`}
        onClick={() => onChange("LOW")}
      >
        📉 Low Stock
        <span className="px-2 rounded-full bg-white/20">{lowStock}</span>
      </button>
    </div>
  );
};

export default InventoryStats;
