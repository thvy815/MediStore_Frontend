import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import MedicineCard from "@/components/medicine/MedicineCard";
import { productService } from "@/services/productService";
import type { ProductResponse } from "@/types/product";

import CreateMedicineModal from "./modal/CreateMedicineModal";
import UpdateMedicineModal from "./modal/UpdateMedicineModal";

const MedicinesPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);

  // Load all products
  const fetchProducts = async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search API
  const handleSearch = async () => {
    if (!searchKeyword.trim()) return fetchProducts();

    try {
      const res = await productService.search(searchKeyword);
      setProducts(res.data);
    } catch (e) {
      console.error("Search error:", e);
    }
  };

  // Edit
  const handleEdit = (product: ProductResponse) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  // Update product active
  const handleToggleActive = async (id: string, nextActive: boolean) => {
    try {
      await productService.updateActive(id, nextActive);
      fetchProducts(); // reload list
    } catch (e) {
      console.error("Toggle active error:", e);
      alert("Update status failed");
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-6">

        <h2 className="text-2xl font-semibold">Product Management</h2>
        <p className="text-gray-500 text-base">
          Create and manage products for your pharmacy
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Products" value={products.length.toString()} />
          <StatCard title="Active" value="—" />
          <StatCard title="Categories" value="—" />
          <StatCard title="Brands" value="—" />
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              placeholder="Search product..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={() => setShowCreateModal(true)}
          >
            + Create New Product
          </button>
        </div>

        {/* Product list */}
        <div className="grid grid-cols-5 gap-5 mt-8">
          {products.map((prod) => (
            <MedicineCard
              key={prod.id}
              med={prod}            // Card xài chung
              onEdit={() => handleEdit(prod)}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>

        {/* Modals */}
        {showCreateModal && (
          <CreateMedicineModal
            onClose={() => setShowCreateModal(false)}
            onCreated={fetchProducts}
          />
        )}

        {showUpdateModal && selectedProduct && (
          <UpdateMedicineModal
            medicine={selectedProduct}
            onClose={() => setShowUpdateModal(false)}
            onSave={fetchProducts}
          />
        )}
      </div>
    </div>
  );
};

export default MedicinesPage;
