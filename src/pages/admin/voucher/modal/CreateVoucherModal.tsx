import { useState } from "react";
import { voucherService } from "@/services/voucherService";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateVoucherModal({
  onClose,
  onCreated,
}: Props) {
  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "percent",
    discountValue: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    startDate: "",
    endDate: "",
    usageLimit: 0,
    usagePerUser: 1,
    status: "active",
  });

  const handleSubmit = async () => {
    try {
      await voucherService.create(form);
      onCreated();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Create voucher failed");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[700px] p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          Create Voucher
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Voucher code"
            className="border rounded-lg px-4 py-2"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value,
              })
            }
          />

          <select
            className="border rounded-lg px-4 py-2"
            value={form.discountType}
            onChange={(e) =>
              setForm({
                ...form,
                discountType: e.target.value,
              })
            }
          >
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
            <option value="freeship">Free Ship</option>
          </select>

          <textarea
            placeholder="Description"
            className="border rounded-lg px-4 py-2 col-span-2"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Discount value"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                discountValue: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Min order"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                minOrderValue: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            placeholder="Max discount"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                maxDiscount: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Usage limit"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                usageLimit: Number(e.target.value),
              })
            }
          />
           <input
            type="number"
            placeholder="Usage per user"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                usagePerUser: Number(e.target.value),
              })
            }
          />

          <input
            type="date"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                startDate: e.target.value,
              })
            }
          />
          <input
            type="date"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                endDate: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >
            Create Voucher
          </button>
        </div>
      </div>
    </div>
  );
}