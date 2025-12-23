import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import { productService } from "@/services/productService";
import { productUnitService } from "@/services/productUnitService";
import { supplierService } from "@/services/supplierService";
import { batchService } from "@/services/batchService";
import { lawService } from "@/services/lawService"; // ✅ LAW

import type { ProductResponse } from "@/types/product";
import type { ProductUnitResponse } from "@/types/productUnit";
import type { Supplier } from "@/types/supplier";
import type { Law } from "@/types/law"; // ✅ LAW

interface Props {
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

const CreateStorageModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [units, setUnits] = useState<ProductUnitResponse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [laws, setLaws] = useState<Law[]>([]); // ✅ LAW

  const [form, setForm] = useState({
    productId: "",
    productUnitId: "",
    supplierId: "",
    quantity: 0,
    importPrice: 0,
    manufactureDate: "",
    expiryDate: "",
    lawCode: "", // ✅ LAW
  });

  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [smallestUnit, setSmallestUnit] =
    useState<ProductUnitResponse | null>(null);
  const [showConverted, setShowConverted] = useState(false);

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    const [p, s, l] = await Promise.all([
      productService.getAllAdmin(),
      supplierService.getAll(),
      lawService.getAll(), // ✅ LAW
    ]);

    setProducts(p.data);
    setSuppliers(s.data);
    setLaws(l.data);
  };

  // Khi chọn product → load unit
  const handleProductChange = async (productId: string) => {
    setForm((p) => ({ ...p, productId, productUnitId: "" }));
    setSelectedUnitId("");
    setSmallestUnit(null);
    setShowConverted(false);

    const res = await productUnitService.getByProduct(productId);
    setUnits(res.data);

    const smallest =
      res.data.find((u) => u.conversionFactor === 1) || res.data[0];

    if (smallest) {
      setSmallestUnit(smallest);
      setSelectedUnitId(smallest.id);
      setForm((f) => ({ ...f, productUnitId: smallest.id }));
    }
  };

  // FE-only: quantity quy đổi
  const getConvertedQuantity = () => {
    if (!selectedUnitId || !smallestUnit)
      return { unit: smallestUnit?.unitName || "", quantity: form.quantity };

    const selectedUnit = units.find((u) => u.id === selectedUnitId);
    if (!selectedUnit)
      return { unit: smallestUnit.unitName, quantity: form.quantity };

    return {
      unit: smallestUnit.unitName,
      quantity:
        form.quantity *
        (selectedUnit.conversionFactor / smallestUnit.conversionFactor),
    };
  };

  const handleSubmit = async () => {
    if (
      !form.productId ||
      !form.productUnitId ||
      !form.supplierId ||
      !form.expiryDate
    ) {
      alert("Please fill required fields");
      return;
    }

    if (form.importPrice <= 0) {
      alert("Import price must be greater than 0");
      return;
    }

    try {
      await batchService.create({
        productId: form.productId,
        supplierId: form.supplierId,
        productUnitId: form.productUnitId,
        quantity: Number(form.quantity),
        importPrice: Number(form.importPrice),
        manufactureDate: form.manufactureDate || undefined,
        expiryDate: form.expiryDate,
        batchNumber: `BATCH-${Date.now()}`,
        lawCode: form.lawCode || undefined, // ✅ LAW
      });

      alert("Import batch success");
      await onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error("CREATE BATCH ERROR", err);
      alert(err?.response?.data?.message || "Create batch failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[760px] p-6 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h3 className="text-lg font-semibold">Add Product Into Storage</h3>
            <p className="text-sm text-gray-500">
              Import product batch into inventory
            </p>
          </div>
          <button onClick={onClose}><X /></button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Product */}
          <label>Product</label>
          <select
            className="border rounded-lg p-2 col-span-2"
            value={form.productId}
            onChange={(e) => handleProductChange(e.target.value)}
          >
            <option value="" disabled>-- select product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>

          {/* Unit */}
          <label>Unit Type</label>
          <select
            className="border rounded-lg p-2"
            value={selectedUnitId}
            onChange={(e) => {
              setSelectedUnitId(e.target.value);
              setForm((f) => ({ ...f, productUnitId: e.target.value }));
              setShowConverted(e.target.value !== smallestUnit?.id);
            }}
            disabled={!units.length}
          >
            <option value="" disabled>-- select unit --</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>{u.unitName}</option>
            ))}
          </select>

          {showConverted && smallestUnit && (
            <>
              <label>Smallest Unit (FE-only)</label>
              <input className="border rounded-lg p-2" value={getConvertedQuantity().unit} disabled />
              <label>Converted Quantity (FE-only)</label>
              <input className="border rounded-lg p-2" value={getConvertedQuantity().quantity} disabled />
            </>
          )}

          {/* Supplier */}
          <label>Supplier</label>
          <select
            className="border rounded-lg p-2"
            value={form.supplierId}
            onChange={(e) =>
              setForm((p) => ({ ...p, supplierId: e.target.value }))
            }
          >
            <option value="" disabled>-- select supplier --</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Quantity */}
          <label>Quantity</label>
          <input
            type="number"
            className="border rounded-lg p-2"
            value={form.quantity}
            onChange={(e) =>
              setForm((p) => ({ ...p, quantity: Number(e.target.value) }))
            }
          />

          {/* Import Price */}
          <label>Import Price</label>
          <input
            type="number"
            className="border rounded-lg p-2"
            value={form.importPrice}
            onChange={(e) =>
              setForm((p) => ({ ...p, importPrice: Number(e.target.value) }))
            }
          />

          {/* Law */}
          <label>Law Code</label>
          <select
            className="border rounded-lg p-2 col-span-2"
            value={form.lawCode}
            onChange={(e) =>
              setForm((p) => ({ ...p, lawCode: e.target.value }))
            }
          >
            <option value="">-- no law --</option>
            {laws.map((l) => (
              <option key={l.code} value={l.code}>
                {l.code} - {l.title}
              </option>
            ))}
          </select>

          {/* Manufacture */}
          <label>Manufacture Date</label>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.manufactureDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, manufactureDate: e.target.value }))
            }
          />

          {/* Expiry */}
          <label>Expiry Date</label>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.expiryDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, expiryDate: e.target.value }))
            }
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Import Batch
          </button>
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStorageModal;
