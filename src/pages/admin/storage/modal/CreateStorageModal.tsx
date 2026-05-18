import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import { productService } from "@/services/productService";
import { productUnitService } from "@/services/productUnitService";
import { supplierService } from "@/services/supplierService";
import { batchService } from "@/services/batchService";
import { lawService } from "@/services/lawService";

import type { ProductResponse } from "@/types/product";
import type { ProductUnitResponse } from "@/types/productUnit";
import type { Supplier } from "@/types/supplier";
import type { Law } from "@/types/law";

interface Props {
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

const CreateStorageModal: React.FC<Props> = ({
  onClose,
  onSuccess,
}) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [units, setUnits] = useState<ProductUnitResponse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [laws, setLaws] = useState<Law[]>([]);

  const [form, setForm] = useState({
  productId: "",
  productUnitId: "",
  supplierId: "",
  quantity: "",
  importPrice: "",
  manufactureDate: "",
  expiryDate: "",
  lawCode: "",
  isActive: true,
});

  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [smallestUnit, setSmallestUnit] =
    useState<ProductUnitResponse | null>(null);

  const [showConverted, setShowConverted] = useState(false);

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    try {
      const [p, s, l] = await Promise.all([
        productService.getAllAdmin(),
        supplierService.getAll(),
        lawService.getAll(),
      ]);

      setProducts(p.data);
      setSuppliers(s.data);
      setLaws(l.data);
    } catch (err) {
      console.error("Fetch init data error", err);
    }
  };

  const handleProductChange = async (productId: string) => {
    setForm((p) => ({
      ...p,
      productId,
      productUnitId: "",
    }));

    setSelectedUnitId("");
    setSmallestUnit(null);
    setShowConverted(false);

    try {
      const res = await productUnitService.getByProduct(productId);

      setUnits(res.data);

      const smallest =
        res.data.find((u) => u.conversionFactor === 1) ||
        res.data[0];

      if (smallest) {
        setSmallestUnit(smallest);
        setSelectedUnitId(smallest.id);

        setForm((f) => ({
          ...f,
          productUnitId: smallest.id,
        }));
      }
    } catch (err) {
      console.error("Fetch product units error", err);
    }
  };

  const getConvertedQuantity = () => {
    if (!selectedUnitId || !smallestUnit) {
      return {
        unit: smallestUnit?.unitName || "",
        quantity: form.quantity,
      };
    }

    const selectedUnit = units.find(
      (u) => u.id === selectedUnitId
    );

    if (!selectedUnit) {
      return {
        unit: smallestUnit.unitName,
        quantity: form.quantity,
      };
    }

    return {
      unit: smallestUnit.unitName,
      quantity:
        Number(form.quantity) *
        (selectedUnit.conversionFactor /
          smallestUnit.conversionFactor),
    };
  };

  const handleSubmit = async () => {
    if (
      !form.productId.trim() ||
      !form.productUnitId.trim() ||
      !form.supplierId.trim() ||
      !form.expiryDate
    ) {
      alert("Please fill required fields");
      return;
    }

    if (Number(form.importPrice) <= 0) {
      alert("Import price must be greater than 0");
      return;
    }

    try {
      await batchService.create({
          productId: form.productId || "",
          supplierId: form.supplierId || "",
          productUnitId: form.productUnitId || "",
          quantity: Number(form.quantity),
          importPrice: Number(form.importPrice),
          manufactureDate: form.manufactureDate || undefined,
          expiryDate: form.expiryDate || "",
          batchNumber: `BATCH-${Date.now()}`,
          lawCode: form.lawCode || undefined,
        });

      alert("Import batch success");

      await onSuccess?.();

      onClose();
    } catch (err: any) {
      console.error("CREATE BATCH ERROR", err);

      alert(
        err?.response?.data?.message ||
          "Create batch failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-5 border-b bg-gray-50">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Add Product Into Storage
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Import product batch into inventory
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* BODY */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* PRODUCT */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Product
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                value={form.productId}
                onChange={(e) =>
                  handleProductChange(e.target.value)
                }
              >
                <option value="" disabled>
                  -- select product --
                </option>

                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} - {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* UNIT */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Unit Type
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                value={selectedUnitId}
                onChange={(e) => {
                  setSelectedUnitId(e.target.value);

                  setForm((f) => ({
                    ...f,
                    productUnitId: e.target.value,
                  }));

                  setShowConverted(
                    e.target.value !== smallestUnit?.id
                  );
                }}
                disabled={!units.length}
              >
                <option value="" disabled>
                  -- select unit --
                </option>

                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.unitName}
                  </option>
                ))}
              </select>
            </div>

            {/* SUPPLIER */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Supplier
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                value={form.supplierId}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    supplierId: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  -- select supplier --
                </option>

                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* QUANTITY */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                placeholder="Enter quantity"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.quantity}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    quantity: e.target.value,
                  }))
                }
              />
            </div>

            {/* IMPORT PRICE */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Import Price
              </label>

              <input
                type="number"
                inputMode="decimal"
                min={1}
                step={1}
                placeholder="Enter import price"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.importPrice}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    importPrice: e.target.value,
                  }))
                }
              />
            </div>

            {/* CONVERTED */}
            {showConverted && smallestUnit && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Smallest Unit
                  </label>

                  <input
                    disabled
                    className="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-600"
                    value={getConvertedQuantity().unit}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Converted Quantity
                  </label>

                  <input
                    disabled
                    className="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-600"
                    value={
                      getConvertedQuantity().quantity
                    }
                  />
                </div>
              </>
            )}

            {/* LAW */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Law Code
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                value={form.lawCode}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    lawCode: e.target.value,
                  }))
                }
              >
                <option value="">
                  -- no law --
                </option>

                {laws.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.code} - {l.title}
                  </option>
                ))}
              </select>
            </div>

            {/* MANUFACTURE DATE */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Manufacture Date
              </label>

              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.manufactureDate}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    manufactureDate: e.target.value,
                  }))
                }
              />
            </div>

            {/* EXPIRY DATE */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Expiry Date
              </label>

              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.expiryDate}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    expiryDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
          >
            Import Batch
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStorageModal;