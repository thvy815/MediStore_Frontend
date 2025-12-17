import React from "react";
import type { ProductResponse } from "@/types/product";

interface MedicineCardProps {
  med: ProductResponse;
  onEdit: (m: ProductResponse) => void;
  onDelete: (id: string) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ med, onEdit, onDelete }) => {
  const defaultUnit =
    med.units?.find((u) => u.isDefault) || med.units?.[0];

  const imageSrc =
    med.imageUrl && med.imageUrl.trim() !== ""
      ? med.imageUrl
      : "https://dienmay.hoaphat.com.vn/assets/img/no-image.png";

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 w-full">
      <img
        src={imageSrc}
        alt={med.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Name */}
      <p className="font-semibold mt-3">{med.name}</p>

      {/* Price / Unit */}
      {defaultUnit && (
        <div className="mt-1">
          <p className="text-green-600 font-semibold text-sm">
            {defaultUnit.price.toLocaleString()}đ / {defaultUnit.unitName}
          </p>
        </div>
      )}

      {/* Active or inactive */}
      <span
        className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
          med.isActive
            ? "bg-green-100 text-green-600"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {med.isActive ? "Active" : "Inactive"}
      </span>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm w-full">
          View
        </button>

        <button
          className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm w-full"
          onClick={() => onEdit(med)}
        >
          Edit
        </button>

        <button
          className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm w-full"
          onClick={() => onDelete(med.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;
