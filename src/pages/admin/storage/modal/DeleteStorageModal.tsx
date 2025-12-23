import React from "react";
import type { BatchResponse } from "@/types/batch";
import { batchService } from "@/services/batchService";
import { X } from "lucide-react";

interface Props {
  batch: BatchResponse;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteStorageModal: React.FC<Props> = ({ batch, onClose, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await batchService.recall(batch.id);
      alert("Batch deleted (status set to recalled)");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[400px] p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">Delete Batch</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <p className="mt-4">Are you sure you want to delete batch <strong>{batch.batchNumber}</strong>?</p>
        <div className="flex gap-3 mt-6 justify-end">
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStorageModal;
