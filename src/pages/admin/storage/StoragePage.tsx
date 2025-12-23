import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";

import AdminLayout from "./AdminLayout";
import StorageStats from "../../../components/ui/StorageStats";
import CreateStorageModal from "./modal/CreateStorageModal";
import ViewStorageModal from "./modal/ViewStorageModal";
import UpdateStorageModal from "./modal/UpdateStorageModal";

import BatchTable from "../../../components/Storage/BatchTable";
import { batchService } from "@/services/batchService";
import type { BatchResponse } from "@/types/batch";

const StoragePage: React.FC = () => {
  const [batches, setBatches] = useState<BatchResponse[]>([]);
  const [keyword, setKeyword] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [viewBatch, setViewBatch] = useState<BatchResponse | null>(null);
  const [editBatch, setEditBatch] = useState<BatchResponse | null>(null);

  const fetchBatches = async () => {
    try {
      const res = await batchService.getAll();
      setBatches(res.data);
    } catch (err) {
      console.error("Fetch batches error", err);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleSearch = () => {
    const key = keyword.trim().toLowerCase();
    if (!key) return fetchBatches();

    setBatches((prev) =>
      prev.filter(
        (b) =>
          b.batchNumber.toLowerCase().includes(key) ||
          b.status.toLowerCase().includes(key)
      )
    );
  };

  return (
    <AdminLayout>
      <div className="w-full bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-semibold">Batch Management</h2>
            <p className="text-gray-500">Manage all product batches in storage</p>
          </div>

          {/* STATS */}
          <div className="mt-6">
            <StorageStats items={batches} />
          </div>

          {/* SEARCH + CREATE */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Search by batch number or status..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <button
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 whitespace-nowrap"
                onClick={() => setShowCreate(true)}
              >
                <Plus size={18} /> Create New Batch
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-6 bg-white rounded-xl shadow-sm">
            <BatchTable
              data={batches}
              onView={(b) => setViewBatch(b)}
              onEdit={(b) =>{
                if (b.status === "recalled") {
                  alert("Cannot edit batch because it has been recalled");
                  return;
                }
                setEditBatch(b)}
              }
              onDelete={async (b) => {
                if (!confirm("Are you sure you want to recall this batch?")) return;
                await batchService.recall(b.id);
                fetchBatches();
              }}
            />
          </div>

          {/* CREATE MODAL */}
          {showCreate && (
            <CreateStorageModal
              onClose={() => setShowCreate(false)}
              onSuccess={fetchBatches}
            />
          )}

          {/* VIEW MODAL */}
          {viewBatch && (
            <ViewStorageModal
              batch={viewBatch}
              onClose={() => setViewBatch(null)}
            />
          )}

          {/* UPDATE MODAL */}
          {editBatch && (
            <UpdateStorageModal
              batch={editBatch}
              onClose={() => setEditBatch(null)}
              onSuccess={fetchBatches}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default StoragePage;
