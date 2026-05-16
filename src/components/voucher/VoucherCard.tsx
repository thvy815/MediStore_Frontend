import {
  Pencil,
  Trash2,
  Percent,
  Truck,
  Ticket,
} from "lucide-react";

import type { Voucher } from "@/types/voucher";

interface Props {
  voucher: Voucher;
  onEdit: () => void;
  onDelete: () => void;
}

export default function VoucherCard({
  voucher,
  onEdit,
  onDelete,
}: Props) {
  const getIcon = () => {
    if (voucher.discountType === "percent") {
      return <Percent className="w-5 h-5" />;
    }

    if (voucher.discountType === "freeship") {
      return <Truck className="w-5 h-5" />;
    }

    return <Ticket className="w-5 h-5" />;
  };

   return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm flex justify-between gap-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">
          {getIcon()}
        </div>
         <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">
              {voucher.code}
            </h3>

            <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
              {voucher.discountType}
            </span>

            <span
              className={`px-2 py-1 text-xs rounded-full ${
                voucher.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {voucher.status}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {voucher.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-4 text-sm text-gray-600">
            <div>
              <p>
                Value: {voucher.discountValue}
              </p>

              <p>
                Min Order: {voucher.minOrderValue}
              </p>

              <p>
                Usage: {voucher.usedCount}/
                {voucher.usageLimit}
              </p>
            </div>
             <div>
              <p>
                Per User: {voucher.usagePerUser}
              </p>

              <p>
                Remaining: {voucher.remainingTurns}
              </p>

              <p>
                {voucher.startDate} → {voucher.endDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={onDelete}
          className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}