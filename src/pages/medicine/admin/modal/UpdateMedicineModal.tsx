import React, { useState } from "react";
import { X, PenLine, Package, Calendar, Box } from "lucide-react";
import FormField from "@/components/ui/FormField";

interface UpdateMedicineModalProps {
  medicine: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}

const UpdateMedicineModal: React.FC<UpdateMedicineModalProps> = ({
  medicine,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({ ...medicine });

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Medicine</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Info Tag */}
        <div className="bg-green-100 border border-green-300 px-4 py-2 rounded-lg text-green-700 mb-5">
          Editing: {formData.name} (ID: {formData.id})
        </div>

        <div className="grid grid-cols-2 gap-4">

          <FormField
            label="Medicine Code"
            required
            value={formData.code}
            onChange={(v) => handleChange("code", v)}
          />

          <FormField
            label="Medicine Name"
            required
            icon={<PenLine className="w-4 h-4" />}
            value={formData.name}
            onChange={(v) => handleChange("name", v)}
          />

          <FormField
            label="Category"
            required
            value={formData.category}
            onChange={(v) => handleChange("category", v)}
          />

          <FormField
            label="Active Ingredient"
            required
            value={formData.ingredient}
            onChange={(v) => handleChange("ingredient", v)}
          />

          <FormField
            label="Price (VND)"
            required
            value={formData.price}
            onChange={(v) => handleChange("price", v)}
          />

          <FormField
            label="Current Stock"
            icon={<Box className="w-4 h-4" />}
            value={formData.stock}
            onChange={(v) => handleChange("stock", v)}
          />

          <FormField
            label="Total Stock Capacity"
            icon={<Box className="w-4 h-4" />}
            value={formData.capacity}
            onChange={(v) => handleChange("capacity", v)}
          />

          <FormField
            label="Manufacturer"
            required
            icon={<Package className="w-4 h-4" />}
            value={formData.manufacturer}
            onChange={(v) => handleChange("manufacturer", v)}
          />

          <FormField
            label="Expiry Date"
            required
            type="date"
            icon={<Calendar className="w-4 h-4" />}
            value={formData.expiryDate}
            onChange={(v) => handleChange("expiryDate", v)}
          />

          {/* Status toggle */}
          <div>
            <label className="font-medium mb-1 block">Status</label>
            <button
              onClick={() =>
                handleChange(
                  "status",
                  formData.status === "Active" ? "Inactive" : "Active"
                )
              }
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                formData.status === "Active"
                  ? "border-green-600 text-green-700 bg-green-100"
                  : "border-gray-400 text-gray-600"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-current"></span>
              {formData.status}
            </button>
          </div>

          <div className="col-span-2">
            <FormField
              label="Usage Instructions"
              required
              type="textarea"
              value={formData.instructions}
              onChange={(v) => handleChange("instructions", v)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMedicineModal;
