import React from "react";
import type { BatchResponse } from "@/types/batch";
import { X } from "lucide-react";

interface Props {
  batch: BatchResponse;
  onClose: () => void;
}

const ViewStorageModal: React.FC<Props> = ({ batch, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[760px] p-6 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">View Batch</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Batch Number */}
          <label>Batch Number</label>
          <input
            type="text"
            value={batch.batchNumber}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Product Name */}
          <label>Product Name</label>
          <input
            type="text"
            value={batch.productName}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Unit */}
          <label>Unit Type</label>
          <input
            type="text"
            value={batch.smallestUnitName}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Supplier */}
          <label>Supplier Name</label>
          <input
            type="text"
            value={batch.supplierName}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Quantity Imported */}
          <label>Quantity Imported</label>
          <input
            type="number"
            value={batch.quantityImported}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Quantity Remaining */}
          <label>Quantity Remaining</label>
          <input
            type="number"
            value={batch.quantityRemaining}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Import Price */}
          <label>Import Price</label>
          <input
            type="text"
            value={batch.importPrice}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Law Code */}
          <label>Law Code</label>
          <input
            type="text"
            value={batch.lawCode || ""}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Manufacture Date */}
          <label>Manufacture Date</label>
          <input
            type="date"
            value={batch.manufactureDate || ""}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Expiry Date */}
          <label>Expiry Date</label>
          <input
            type="date"
            value={batch.expiryDate}
            disabled
            className="border rounded-lg p-2"
          />

          {/* Status */}
          <label>Status</label>
          <input
            type="text"
            value={batch.status}
            disabled
            className="border rounded-lg p-2"
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStorageModal;
