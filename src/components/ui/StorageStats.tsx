import StatCard from "@/components/ui/StatCard";
import type { BatchResponse } from "@/types/batch";

interface Props {
  items: BatchResponse[];
}

const StorageStats: React.FC<Props> = ({ items }) => {
  const totalBatches = items.length;
  const valid = items.filter(b => b.status === "valid").length;
  const expired = items.filter(b => b.status === "expired").length;
  const recalled = items.filter(b => b.status === "recalled").length;

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <StatCard title="Total Batches" value={totalBatches.toString()} />
      <StatCard title="Valid Batches" value={valid.toString()} />
      <StatCard title="Expired Batches" value={expired.toString()} />
      <StatCard title="Recalled Batches" value={recalled.toString()} />
    </div>
  );
};

export default StorageStats;
