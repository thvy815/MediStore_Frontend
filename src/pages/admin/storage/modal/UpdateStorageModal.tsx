import React, { useEffect, useState } from "react";
import type { BatchResponse } from "@/types/batch";
import type { Law } from "@/types/law";
import { batchService } from "@/services/batchService";
import { lawService } from "@/services/lawService";
import { X } from "lucide-react";

interface Props {
  batch: BatchResponse;
  onClose: () => void;
  onSuccess?: () => void;
}

const UpdateStorageModal: React.FC<Props> = ({ batch, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    batchNumber: batch.batchNumber,
    manufactureDate: batch.manufactureDate,
    expiryDate: batch.expiryDate,
    lawCode: batch.lawCode || "",
  });

  const [laws, setLaws] = useState<Law[]>([]);

  useEffect(() => {
    fetchLaws();
  }, []);

  const fetchLaws = async () => {
    try {
      const res = await lawService.getAll();
      setLaws(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!batch.id) return;

    try {
      await batchService.update(batch.id, {
        batchNumber: form.batchNumber,
        manufactureDate: form.manufactureDate || undefined,
        expiryDate: form.expiryDate,
        lawCode: form.lawCode || undefined,
      });

      alert("Batch updated successfully");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Update batch failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[700px] p-6 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">Update Batch</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <label>Batch Number</label>
          <input
            type="text"
            className="border rounded-lg p-2"
            value={form.batchNumber}
            onChange={e =>
              setForm(f => ({ ...f, batchNumber: e.target.value }))
            }
          />

          <label>Product Name</label>
          <input
            type="text"
            className="border rounded-lg p-2"
            value={batch.productName}
            disabled
          />

          <label>Manufacture Date</label>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.manufactureDate || ""}
            onChange={e =>
              setForm(f => ({ ...f, manufactureDate: e.target.value }))
            }
          />

          <label>Expiry Date</label>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.expiryDate}
            onChange={e =>
              setForm(f => ({ ...f, expiryDate: e.target.value }))
            }
          />

          <label className="col-span-2">Applied Law</label>
          <select
            className="border rounded-lg p-2 col-span-2"
            value={form.lawCode}
            onChange={e =>
              setForm(f => ({ ...f, lawCode: e.target.value }))
            }
          >
            <option value="">-- No law --</option>
            {laws.map(l => (
              <option key={l.code} value={l.code}>
                {l.code} - {l.title}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStorageModal;
