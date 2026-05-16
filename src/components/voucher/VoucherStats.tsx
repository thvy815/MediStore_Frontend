interface Props {
  title: string;
  value: string | number;
  sub?: string;
}

export default function VoucherStats({ title, value, sub }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold mt-2">{value}</h3>

      {sub && (
        <p className="text-xs text-gray-400 mt-1">{sub}</p>
      )}
    </div>
  );
}