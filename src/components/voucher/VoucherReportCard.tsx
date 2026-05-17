interface Props {
  rank: number;
  code: string;
  description: string;
  used: number;
  limit: number;
  type: string;
  discount: number;
  remaining: number;
  status: string;
}

export default function VoucherReportCard({
  rank,
  code,
  description,
  used,
  limit,
  type,
  discount,
  remaining,
  status,
}: Props) {
  const percent = Math.round(
    (used / limit) * 100
  );

  return (
    <div className="bg-white border rounded-2xl p-5">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            #{rank}
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {code}
            </h3>

            <p className="text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm h-fit ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-5 mt-5 text-sm">
        <div>
          <p className="text-gray-400">
            Total Uses
          </p>

          <p className="font-semibold mt-1">
            {used}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Usage Rate
          </p>

          <p className="font-semibold mt-1">
            {percent}%
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Type
          </p>

          <p className="font-semibold mt-1">
            {type}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Discount
          </p>

          <p className="font-semibold mt-1">
            {discount}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Remaining
          </p>

          <p className="font-semibold mt-1">
            {remaining}
          </p>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full mt-5 overflow-hidden">
        <div
          style={{
            width: `${percent}%`,
          }}
          className="h-full bg-green-500"
        />
      </div>
    </div>
  );
}