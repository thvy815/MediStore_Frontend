import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import FormField from "@/components/ui/FormField";

import type { Category } from "@/types/category";
import type { Brand } from "@/types/brand";
import type { Unit } from "@/types/unit";
import type {
  ProductRequest,
  ProductUnitRequest,
  ProductResponse,
} from "@/types/product";

import { categoryService } from "@/services/categoryService";
import { brandService } from "@/services/brandService";
import { unitService } from "@/services/unitService";
import { productService } from "@/services/productService";

interface Props {
  medicine: ProductResponse;
  onClose: () => void;
  onSave: () => void;
}

const UpdateMedicineModal: React.FC<Props> = ({
  medicine,
  onClose,
  onSave,
}) => {
  /* ================= Master data ================= */
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [unitsList, setUnitsList] = useState<Unit[]>([]);

  /* ================= Form ================= */
  const [formData, setFormData] = useState<ProductRequest>({
    code: medicine.code || "",
    name: medicine.name || "",
    brandId: "",
    categoryId: "",
    description: medicine.description || "",
    ingredients: medicine.ingredients || "",
    imageUrl: medicine.imageUrl || "",
    prescriptionRequired: medicine.prescriptionRequired,
    isActive: medicine.isActive,
    units: [],
  });

  const [productUnits, setProductUnits] = useState<ProductUnitRequest[]>(
    medicine.units.map((u) => ({
      unitId: u.id,
      conversionFactor: u.conversionFactor,
      price: u.price,
      isDefault: u.isDefault,
    }))
  );

  /* ================= Init ================= */
  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    const [cat, brand, unit] = await Promise.all([
      categoryService.getAll(),
      brandService.getAll(),
      unitService.getAll(),
    ]);

    setCategories(cat.data);
    setBrands(brand.data);
    setUnitsList(unit.data);

    const foundBrand = brand.data.find(
      (b) => b.name === medicine.brandName
    );
    const foundCategory = cat.data.find(
      (c) => c.name === medicine.categoryName
    );

    setFormData((p) => ({
      ...p,
      brandId: foundBrand?.id || "",
      categoryId: foundCategory?.id || "",
    }));
  };

  /* ================= Handlers ================= */
  const handleChange = (field: keyof ProductRequest, value: any) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  /* ================= Units ================= */
  const addUnit = () => {
    setProductUnits((prev) => [
      ...prev,
      {
        unitId: "",
        conversionFactor: "",
        price: "",
        isDefault: prev.length === 0,
      },
    ]);
  };

  const updateUnit = (
    index: number,
    field: keyof ProductUnitRequest,
    value: any
  ) => {
    setProductUnits((prev) =>
      prev.map((u, i) =>
        i === index ? { ...u, [field]: value } : u
      )
    );
  };

  const removeUnit = (index: number) => {
    setProductUnits((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (!next.some((u) => u.isDefault) && next.length > 0) {
        next[0].isDefault = true;
      }
      return [...next];
    });
  };

  const toggleDefault = (index: number) => {
    setProductUnits((prev) =>
      prev.map((u, i) => ({
        ...u,
        isDefault: i === index,
      }))
    );
  };

  /* ================= Submit ================= */
  const handleUpdate = async () => {
    const payload: ProductRequest = {
      ...formData,
      units: productUnits.map((u) => ({
        unitId: u.unitId,
        conversionFactor: Number(u.conversionFactor),
        price: Number(u.price),
        isDefault: u.isDefault,
      })),
    };

    await productService.update(medicine.id, payload);

    onSave();
    onClose();
  };

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Update Product</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Old info */}
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg mb-5">
          Editing product: <b>{medicine.name}</b> (Code: {medicine.code})
        </div>

        {/* ===== Form giống Create ===== */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Product Name"
            required
            value={formData.name}
            onChange={(v) => handleChange("name", v)}
          />

          <FormField
            label="Product Code"
            value={formData.code}
            onChange={(v) => handleChange("code", v)}
          />

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              className="mt-1 w-full border rounded-lg p-2"
              value={formData.categoryId}
              onChange={(e) =>
                handleChange("categoryId", e.target.value)
              }
            >
              <option value="">-- select category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="text-sm font-medium">Brand</label>
            <select
              className="mt-1 w-full border rounded-lg p-2"
              value={formData.brandId}
              onChange={(e) =>
                handleChange("brandId", e.target.value)
              }
            >
              <option value="">-- select brand --</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <FormField
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={(v) => handleChange("description", v)}
          />

          <FormField
            label="Ingredients"
            type="textarea"
            value={formData.ingredients}
            onChange={(v) => handleChange("ingredients", v)}
          />

          <div className="col-span-2">
            <FormField
              label="Image URL"
              value={formData.imageUrl}
              onChange={(v) => handleChange("imageUrl", v)}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 mt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.prescriptionRequired}
              onChange={(e) =>
                handleChange("prescriptionRequired", e.target.checked)
              }
            />
            Prescription required
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                handleChange("isActive", e.target.checked)
              }
            />
            Active
          </label>
        </div>

        {/* Units */}
        <div className="mt-6 border rounded p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Units</h3>
            <button
              onClick={addUnit}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              + Add unit
            </button>
          </div>

          <div className="space-y-3">
            {productUnits.map((u, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-3 items-center border p-3 rounded"
              >
                <select
                  className="border p-2 rounded"
                  value={u.unitId}
                  onChange={(e) =>
                    updateUnit(i, "unitId", e.target.value)
                  }
                >
                  <option value="">Unit</option>
                  {unitsList.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Factor"
                  className="border p-2 rounded"
                  value={u.conversionFactor}
                  onChange={(e) =>
                    updateUnit(i, "conversionFactor", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded"
                  value={u.price}
                  onChange={(e) =>
                    updateUnit(i, "price", e.target.value)
                  }
                />

                <button
                  onClick={() => toggleDefault(i)}
                  className={`px-3 py-1 text-sm rounded ${
                    u.isDefault
                      ? "bg-green-600 text-white"
                      : "border"
                  }`}
                >
                  {u.isDefault ? "Default" : "Set default"}
                </button>

                <button
                  onClick={() => removeUnit(i)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMedicineModal;
