import React, { useEffect, useState } from "react";
import type { BatchResponse, UpdateBatchRequest } from "@/types/batch";
import { batchService } from "@/services/batchService";
import { productUnitService } from "@/services/productUnitService";
import { supplierService } from "@/services/supplierService";
import { X } from "lucide-react";

interface Props {
  batch: BatchResponse;
  onClose: () => void;
  onSuccess?: () => void;
}

const statusOptions = ["valid", "expired", "recalled"];

const UpdateStorageModal: React.FC<Props> = ({ batch, onClose, onSuccess }) => {
  const [form, setForm] = useState<BatchResponse>({ ...batch });
  const [units, setUnits] = useState<{ id: string; unitName: string; conversionFactor: number }[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
  const [selectedUnitName, setSelectedUnitName] = useState(batch.smallestUnitName); // unit user chọn
  const [showConverted, setShowConverted] = useState(false);

  useEffect(() => {
    fetchUnitsAndSuppliers();
  }, []);

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

  // Tính FE-only: quantity quy đổi sang smallest unit
  // Tính FE-only: quantity quy đổi sang smallest unit
const getConvertedQuantity = () => {
  if (!selectedUnitName || selectedUnitName === batch.smallestUnitName) {
    return { unit: batch.smallestUnitName, quantity: form.quantity };
  }

  // Tìm unit người dùng chọn
  const selectedUnit = units.find(u => u.unitName === selectedUnitName);
  // Tìm smallest unit
  const smallestUnit = units.find(u => u.conversionFactor === 1);

  if (!selectedUnit || !smallestUnit) {
    return { unit: batch.smallestUnitName, quantity: form.quantity };
  }

  // FE-only: tính quantity quy đổi theo conversionFactor
  const convertedQty = form.quantity * (selectedUnit.conversionFactor / smallestUnit.conversionFactor);

  return { unit: smallestUnit.unitName, quantity: convertedQty };
};


  const handleUpdate = async () => {
    if (!batch.id) return;

    try {
      const payload: UpdateBatchRequest = {
        batchNumber: form.batchNumber,
        manufactureDate: form.manufactureDate,
        expiryDate: form.expiryDate,
        quantity: form.quantity,
        productUnitId: units.find(u => u.unitName === selectedUnitName)?.id || "",
        supplierId: form.supplierId,
        status: form.status,
      };

      await batchService.update(batch.id, payload);

      alert("Batch updated successfully");
      onSuccess?.(); // reload table
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Update batch failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[760px] p-6 max-h-[90vh] overflow-auto">
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
            onChange={e => setForm(f => ({ ...f, batchNumber: e.target.value }))}
          />

          <label>Product Name</label>
          <input type="text" className="border rounded-lg p-2" value={form.productName} disabled />

          <label>Unit Type</label>
          <select
            className="border rounded-lg p-2"
            value={selectedUnitName}
            onChange={e => {
              setSelectedUnitName(e.target.value);
              setShowConverted(e.target.value !== batch.smallestUnitName);
            }}
          >
            <option value="">--Select Unit--</option>
            {units.map(u => (
              <option key={u.id} value={u.unitName}>
                {u.unitName}
              </option>
            ))}
          </select>

          {/* FE-only converted quantity */}
          {showConverted && (
            <>
              <label>Smallest Unit (FE-only)</label>
              <input type="text" className="border rounded-lg p-2" value={getConvertedQuantity().unit} disabled />
              <label>Converted Quantity (FE-only)</label>
              <input type="number" className="border rounded-lg p-2" value={getConvertedQuantity().quantity} disabled />
            </>
          )}

          <label>Supplier</label>
          <select
            className="border rounded-lg p-2"
            value={form.supplierId}
            onChange={e => {
              const s = suppliers.find(s => s.id === e.target.value);
              if (s) setForm(f => ({ ...f, supplierId: s.id, supplierName: s.name }));
            }}
          >
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            type="number"
            className="border rounded-lg p-2"
            value={form.quantity}
            onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))}
          />

          <label>Manufacture Date</label>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.manufactureDate || ""}
            onChange={e => setForm(f => ({ ...f, manufactureDate: e.target.value }))}
          />

          <label>Expiry Date</label>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.expiryDate}
            onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
          />

          <label>Status</label>
          <select
            className="border rounded-lg p-2"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          >
            {statusOptions.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6 justify-end">
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStorageModal;
