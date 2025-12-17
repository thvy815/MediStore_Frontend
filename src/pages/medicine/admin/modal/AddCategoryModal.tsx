import React, { useState } from "react";
import { X } from "lucide-react";
import FormField from "@/components/ui/FormField";
import { categoryService } from "@/services/categoryService";
import type { Category } from "@/types/category";

interface Props {
  onClose: () => void;
  onCreated: (category: Category) => void;
}

const AddCategoryModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    const res = await categoryService.create({
      name: form.name,
      description: form.description || undefined,
    });

    onCreated(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Category</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <FormField
            label="Category name"
            required
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          />

          <FormField
            label="Description"
            type="textarea"
            value={form.description}
            onChange={(v) =>
              setForm((p) => ({ ...p, description: v }))
            }
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
