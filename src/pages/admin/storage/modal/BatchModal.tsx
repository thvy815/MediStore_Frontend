import React, { useEffect, useState } from "react";
import type { BatchResponse } from "@/types/batch";
import { batchService } from "@/services/batchService";
import { productUnitService } from "@/services/productUnitService";
import { supplierService } from "@/services/supplierService";
import { X } from "lucide-react";

interface Props {
  batch: BatchResponse;
  onClose: () => void;
  onSuccess?: () => void;
  mode?: "view" | "edit";
}

const statusOptions = ["valid", "expired", "recalled"];

const BatchModal: React.FC<Props> = ({ batch, onClose, onSuccess, mode = "view" }) => {
  const [form, setForm] = useState<BatchResponse>({ ...batch });
  const [editMode, setEditMode] = useState(mode === "edit");
  const [units, setUnits] = useState<{ id: string; unitName: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (editMode) fetchUnitsAndSuppliers();
  }, [editMode]);

  const fetchUnitsAndSuppliers = async () => {
    try {
      const u = await productUnitService.getByProduct(batch.productId);
      setUnits(u.data);
      const s = await supplierService.getAll();
      setSuppliers(s.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!batch.id) return;
    try {
      await batchService.update(batch.id, form);
      alert("Batch updated successfully");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Update batch failed");
    }
  };

  const handleRecall = async () => {
    if (!batch.id) return;
    try {
      await batchService.recall(batch.id);
      alert("Batch recalled successfully");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Recall batch failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[760px] p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">{editMode ? "Edit Batch" : "Batch Details"}</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Batch Number"
            className="border rounded-lg p-2 col-span-2"
            value={form.batchNumber}
            disabled={!editMode}
            onChange={e => setForm(f => ({ ...f, batchNumber: e.target.value }))}
          />

          <input
            type="text"
            placeholder="Product Name"
            className="border rounded-lg p-2"
            value={form.productName}
            disabled
          />

          {/* Unit Type */}
          {editMode ? (
            <select
              className="border rounded-lg p-2"
              value={form.smallestUnitName}
              onChange={e => setForm(f => ({ ...f, smallestUnitName: e.target.value }))}
            >
              {units.map(u => <option key={u.id} value={u.unitName}>{u.unitName}</option>)}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Unit Type"
              className="border rounded-lg p-2"
              value={form.smallestUnitName}
              disabled
            />
          )}

          {/* Supplier */}
          {editMode ? (
            <select
              className="border rounded-lg p-2"
              value={form.supplierId}
              onChange={e => {
                const s = suppliers.find(s => s.id === e.target.value);
                if (s) setForm(f => ({ ...f, supplierId: s.id, supplierName: s.name }));
              }}
            >
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Supplier Name"
              className="border rounded-lg p-2"
              value={form.supplierName}
              disabled
            />
          )}

          <input
            type="number"
            placeholder="Quantity"
            className="border rounded-lg p-2"
            value={form.quantity}
            disabled={!editMode}
            onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))}
          />

          <input
            type="date"
            placeholder="Manufacture Date"
            className="border rounded-lg p-2"
            value={form.manufactureDate || ""}
            disabled={!editMode}
            onChange={e => setForm(f => ({ ...f, manufactureDate: e.target.value }))}
          />

          <input
            type="date"
            placeholder="Expiry Date"
            className="border rounded-lg p-2"
            value={form.expiryDate}
            disabled={!editMode}
            onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
          />

          <select
            className="border rounded-lg p-2"
            value={form.status}
            disabled={!editMode}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          >
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          {!editMode ? (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button onClick={onClose} className="border px-4 py-2 rounded-lg">Close</button>
            </>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={handleRecall}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Recall
              </button>
              <button
                onClick={onClose}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchModal;
