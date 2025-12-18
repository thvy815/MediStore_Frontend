import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import FormField from "@/components/ui/FormField";

import type { Category } from "@/types/category";
import type { Brand } from "@/types/brand";
import type { Unit } from "@/types/unit";
import type { ProductRequest, ProductUnitRequest } from "@/types/product";

import { categoryService } from "@/services/categoryService";
import { brandService } from "@/services/brandService";
import { unitService } from "@/services/unitService";
import { productService } from "@/services/productService";

import AddBrandModal from "./AddBrandModal";
import AddCategoryModal from "./AddCategoryModal";
import AddUnitModal from "./AddUnitModal";

type AddType = "category" | "brand" | "unit";

interface Props {
  onClose: () => void;
  onCreated?: () => void;
}

const ADD_NEW_VALUE = "__add_new__";

const CreateMedicineModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [unitsList, setUnitsList] = useState<Unit[]>([]);
  const [addType, setAddType] = useState<AddType | null>(null);
  const [productUnits, setProductUnits] = useState<ProductUnitRequest[]>([
    {
      unitId: "",
      conversionFactor: "",
      price: "",
      isDefault: true, // row unit đầu tiên mặc định là default
    },
  ]);

  const [formData, setFormData] = useState<ProductRequest>({
    code: "",
    name: "",
    brandId: "",
    categoryId: "",
    description: "",
    ingredients: "",
    imageUrl: "",
    prescriptionRequired: false,
    isActive: true,
    units: [],
  });

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
  };

  const handleChange = (field: keyof ProductRequest, value: any) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  /* ================= Units ================= */
  const addEmptyUnitRow = () => {
    setProductUnits((prev) => [
      ...prev,
      {
        unitId: "",
        conversionFactor: "",
        price: "",
        isDefault: prev.length === 0, // dòng đầu auto default
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
        isDefault: i === index ? !u.isDefault : false,
      }))
    );
  };

  /* ================= Submit ================= */

  const handleCreate = async () => {
    if (!formData.name) {
      return alert("Missing required fields");
    }
    if (productUnits.length === 0) {
      return alert("Please add at least one unit");
    }

    const unitsPayload: ProductUnitRequest[] = productUnits.map((u) => ({
      unitId: u.unitId,
      conversionFactor: Number(u.conversionFactor),
      price: Number(u.price),
      isDefault: u.isDefault,
    }));

    await productService.create({
      ...formData,
      units: unitsPayload,
    });

    onCreated?.();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <div className="bg-white w-[900px] max-h-[90vh] rounded-xl shadow-lg p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Create New Product</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Form */}
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
                  e.target.value === ADD_NEW_VALUE
                    ? setAddType("category")
                    : handleChange("categoryId", e.target.value)
                }
              >
                <option value="" disabled>-- select category --</option>
                <option value={ADD_NEW_VALUE}>➕ Add new category</option>
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
                  e.target.value === ADD_NEW_VALUE
                    ? setAddType("brand")
                    : handleChange("brandId", e.target.value)
                }
              >
                <option value="" disabled>-- select brand --</option>
                <option value={ADD_NEW_VALUE}>➕ Add new brand</option>
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

            <div className="col-span-2 -mt-2">
              <FormField
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(v) => handleChange("imageUrl", v)}
              />
            </div>
          </div>

          {/* Prescription & Active */}
          <div className="flex items-center gap-6 col-span-2 mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.prescriptionRequired}
                onChange={(e) =>
                  handleChange("prescriptionRequired", e.target.checked)
                }
              />
              <span className="text-sm font-medium">
                Prescription required
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  handleChange("isActive", e.target.checked)
                }
              />
              <span className="text-sm font-medium">
                Active
              </span>
            </label>
          </div>

          {/* Units */}
          <div className="mt-6 border rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Units</h3>
              <button
                onClick={addEmptyUnitRow}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
              >
                + Add unit
              </button>
            </div>

            <div className="space-y-3">
              {productUnits.map((u, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-3 items-center border rounded p-3"
                >
                  {/* Unit */}
                  <select
                    className="border rounded p-2 col-span-1"
                    value={u.unitId}
                    onChange={(e) =>
                      e.target.value === ADD_NEW_VALUE
                        ? setAddType("unit")
                        : updateUnit(index, "unitId", e.target.value)
                    }
                  >
                    <option value="">Unit</option>
                    {unitsList.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                    <option value={ADD_NEW_VALUE}>➕ Add new unit</option>
                  </select>

                  {/* Conversion */}
                  <input
                    type="number"
                    placeholder="Factor"
                    className="border rounded p-2"
                    value={u.conversionFactor}
                    onChange={(e) =>
                      updateUnit(
                        index,
                        "conversionFactor",
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />

                  {/* Price */}
                  <input
                    type="number"
                    placeholder="Price"
                    className="border rounded p-2"
                    value={u.price}
                    onChange={(e) =>
                      updateUnit(
                        index,
                        "price",
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />

                  {/* Default */}
                  <button
                    onClick={() => toggleDefault(index)}
                    className={`px-3 py-1 text-sm rounded ${
                      u.isDefault
                        ? "bg-green-600 text-white"
                        : "border"
                    }`}
                  >
                    {u.isDefault ? "Default" : "Set default"}
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => removeUnit(index)}
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
              onClick={handleCreate}
              className="bg-green-600 text-white px-5 py-2 rounded"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>

      {addType === "category" && (
        <AddCategoryModal
          onClose={() => setAddType(null)}
          onCreated={async (category) => {
            await fetchInit();
            setFormData((p) => ({
              ...p,
              categoryId: category.id,
            }));
          }}
        />
      )}

      {addType === "brand" && (
        <AddBrandModal
          onClose={() => setAddType(null)}
          onCreated={async (brand) => {
            await fetchInit();
            setFormData((p) => ({
              ...p,
              brandId: brand.id,
            }));
          }}
        />
      )}

      {addType === "unit" && (
        <AddUnitModal
          onClose={() => setAddType(null)}
          onCreated={async (unit) => {
            await fetchInit();
            setFormData((p) => ({
              ...p,
              unitId: unit.id,
            }));
          }}
        />
      )}
    </>
  );
};

export default CreateMedicineModal;
