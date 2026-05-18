import { useEffect, useState } from "react";
import { Search, Ticket, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import type { Voucher } from "@/types/voucher";

import { voucherService } from "@/services/voucherService";

import VoucherCard from "../../../components/voucher/VoucherCard";

import CreateVoucherModal from "./modal/CreateVoucherModal";

import UpdateVoucherModal from "./modal/UpdateVoucherModal";

export default function VoucherPage() {
  const location = useLocation();

  const [vouchers, setVouchers] = useState<Voucher[]>(
    []
  );

  const [keyword, setKeyword] = useState("");

  const [showCreate, setShowCreate] =
    useState(false);

  const [showUpdate, setShowUpdate] =
    useState(false);

  const [selectedVoucher, setSelectedVoucher] =
    useState<Voucher | null>(null);

  const fetchVouchers = async () => {
    try {
      const res = await voucherService.getAll();

      setVouchers(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm(
      "Delete this voucher?"
    );

    if (!ok) return;

    try {
      await voucherService.delete(id);

      fetchVouchers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const filtered = vouchers.filter((v) =>
    v.code
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r p-5">
        <h2 className="text-xl font-bold">
          Voucher Setting
        </h2>

        <div className="space-y-2 mt-6">
          <Link
            to="/dashboard/voucher"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname ===
              "/admin/voucher"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Ticket className="w-5 h-5" />

            <span>Adjust Voucher</span>
          </Link>

          <Link
            to="/dashboard/voucher/supervise"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname ===
              "/admin/voucher/supervise"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ShieldCheck className="w-5 h-5" />

            <span>Supervise Voucher</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Voucher Management
              </h1>

              <p className="text-gray-500 mt-1">
                Create and manage vouchers
              </p>
            </div>

            <button
              onClick={() =>
                setShowCreate(true)
              }
              className="px-5 py-3 bg-green-600 text-white rounded-xl"
            >
              + Create Voucher
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-6">
            <Search className="w-5 h-5 absolute left-4 top-3 text-gray-400" />

            <input
              placeholder="Search voucher..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              className="w-full border bg-white rounded-xl pl-12 pr-4 py-3"
            />
          </div>

          {/* Voucher list */}
          <div className="space-y-5 mt-8">
            {filtered.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                onEdit={() => {
                  setSelectedVoucher(
                    voucher
                  );

                  setShowUpdate(true);
                }}
                onDelete={() =>
                  handleDelete(voucher.id)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Create */}
      {showCreate && (
        <CreateVoucherModal
          onClose={() =>
            setShowCreate(false)
          }
          onCreated={fetchVouchers}
        />
      )}

      {/* Update */}
      {showUpdate &&
        selectedVoucher && (
          <UpdateVoucherModal
            voucher={selectedVoucher}
            onClose={() =>
              setShowUpdate(false)
            }
            onSaved={fetchVouchers}
          />
        )}
    </div>
  );
}