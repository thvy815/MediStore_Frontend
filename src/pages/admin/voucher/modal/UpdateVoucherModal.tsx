import { useState } from "react";
import type { Voucher } from "@/types/voucher";
import { voucherService } from "@/services/voucherService";

interface Props {
  voucher: Voucher;
  onClose: () => void;
  onSaved: () => void;
}

export default function UpdateVoucherModal({
  voucher,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState({
    code: voucher.code,
    description: voucher.description,
    discountType: voucher.discountType,
    discountValue: voucher.discountValue,
    minOrderValue: voucher.minOrderValue,
    maxDiscount: voucher.maxDiscount || 0,
    startDate: voucher.startDate,
    endDate: voucher.endDate,
    usageLimit: voucher.usageLimit,
    usagePerUser: voucher.usagePerUser,
    status: voucher.status as "active" | "inactive",
  });

  const handleSubmit = async () => {
    try {
      await voucherService.update(voucher.id, form);
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update voucher failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[750px] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Update Voucher
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-sm text-gray-500">
              Voucher Code
            </label>

            <input
              value={form.code}
              onChange={(e) =>
                setForm({
                  ...form,
                  code: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "active" | "inactive",
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-500">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Discount Type
            </label>

            <select
              value={form.discountType}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountType: e.target.value as "percent" | "fixed" | "freeship",
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            >
              <option value="percent">
                Percent
              </option>

              <option value="fixed">
                Fixed
              </option>

              <option value="freeship">
                Free Ship
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Discount Value
            </label>

            <input
              type="number"
              value={form.discountValue}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountValue: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Min Order Value
            </label>

            <input
              type="number"
              value={form.minOrderValue}
              onChange={(e) =>
                setForm({
                  ...form,
                  minOrderValue: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Max Discount
            </label>

            <input
              type="number"
              value={form.maxDiscount}
              onChange={(e) =>
                setForm({
                  ...form,
                  maxDiscount: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Usage Limit
            </label>

            <input
              type="number"
              value={form.usageLimit}
              onChange={(e) =>
                setForm({
                  ...form,
                  usageLimit: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Usage Per User
            </label>

            <input
              type="number"
              value={form.usagePerUser}
              onChange={(e) =>
                setForm({
                  ...form,
                  usagePerUser: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Start Date
            </label>

            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              End Date
            </label>

            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-3 bg-green-600 text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}