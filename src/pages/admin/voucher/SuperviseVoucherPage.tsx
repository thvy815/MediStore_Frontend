import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Ticket,
  Settings2,
  Activity,
  BarChart3,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { voucherService } from "@/services/voucherService";

import type {
  Voucher,
  VoucherHistory,
} from "@/types/voucher";

import VoucherUsageTable from "../../../components/voucher/VoucherUsageTable";
import VoucherConditionForm from "../../../components/voucher/VoucherConditionForm";
import VoucherReportCard from "../../../components/voucher/VoucherReportCard";

type TabType =
  | "conditions"
  | "usage"
  | "reports";

export default function SuperviseVoucherPage() {
  const location = useLocation();

  const [vouchers, setVouchers] =
    useState<Voucher[]>([]);

  const [selectedVoucher, setSelectedVoucher] =
    useState<Voucher | null>(null);

  const [history, setHistory] =
    useState<VoucherHistory[]>([]);

  const [activeTab, setActiveTab] =
    useState<TabType>("conditions");

  // lấy history của tất cả voucher
  const fetchAllHistory =
    async (
      voucherList: Voucher[]
    ) => {
      try {
        const responses =
          await Promise.all(
            voucherList.map(
              (voucher) =>
                voucherService.getHistory(
                  voucher.id
                )
            )
          );

        const mergedHistory =
          responses.flatMap(
            (res) => res.data
          );

        setHistory(
          mergedHistory
        );
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    const init =
      async () => {
        try {
          const res =
            await voucherService.getAll();

          const voucherData =
            res.data;

          setVouchers(
            voucherData
          );

          if (
            voucherData.length >
            0
          ) {
            setSelectedVoucher(
              voucherData[0]
            );
          }

          // preload usage all voucher
          fetchAllHistory(
            voucherData
          );
        } catch (err) {
          console.error(err);
        }
      };

    init();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r p-5">
        <h2 className="text-xl font-bold">
          Voucher Setting
        </h2>

        <div className="space-y-2 mt-6">
          <Link
            to="/admin/voucher"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname ===
              "/admin/voucher"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span>
              Adjust Voucher
            </span>
          </Link>

          <Link
            to="/admin/voucher/supervise"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname ===
              "/admin/voucher/supervise"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>
              Supervise Voucher
            </span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-bold">
            Supervise Voucher
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor and control
            voucher operations
          </p>

          {/* Tabs */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              onClick={() =>
                setActiveTab(
                  "conditions"
                )
              }
              className={`rounded-2xl border p-5 flex items-center gap-4 transition ${
                activeTab ===
                "conditions"
                  ? "border-green-500 bg-green-50"
                  : "bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeTab ===
                  "conditions"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Settings2 className="w-5 h-5" />
              </div>

              <div className="text-left">
                <p className="font-semibold">
                  Set Conditions
                </p>

                <p className="text-sm text-gray-500">
                  Configure limits
                </p>
              </div>
            </button>

            <button
              onClick={() =>
                setActiveTab("usage")
              }
              className={`rounded-2xl border p-5 flex items-center gap-4 transition ${
                activeTab ===
                "usage"
                  ? "border-green-500 bg-green-50"
                  : "bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeTab ===
                  "usage"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Activity className="w-5 h-5" />
              </div>

              <div className="text-left">
                <p className="font-semibold">
                  Track Usage
                </p>

                <p className="text-sm text-gray-500">
                  Monitor activity
                </p>
              </div>
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "reports"
                )
              }
              className={`rounded-2xl border p-5 flex items-center gap-4 transition ${
                activeTab ===
                "reports"
                  ? "border-green-500 bg-green-50"
                  : "bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeTab ===
                  "reports"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </div>

              <div className="text-left">
                <p className="font-semibold">
                  Reports
                </p>

                <p className="text-sm text-gray-500">
                  View analytics
                </p>
              </div>
            </button>
          </div>

          {/* CONDITIONS */}
          {activeTab ===
            "conditions" && (
            <>
              <div className="bg-white border rounded-2xl p-5 mt-6">
                <label className="text-sm text-gray-500">
                  Select Voucher
                </label>

                <select
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                  value={
                    selectedVoucher?.id ||
                    ""
                  }
                  onChange={(
                    e
                  ) => {
                    const found =
                      vouchers.find(
                        (
                          v
                        ) =>
                          v.id ===
                          e.target
                            .value
                      );

                    if (
                      found
                    ) {
                      setSelectedVoucher(
                        found
                      );
                    }
                  }}
                >
                  {vouchers.map(
                    (
                      voucher
                    ) => (
                      <option
                        key={
                          voucher.id
                        }
                        value={
                          voucher.id
                        }
                      >
                        {
                          voucher.code
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              {selectedVoucher && (
                <div className="mt-6">
                  <VoucherConditionForm
                    voucher={
                        selectedVoucher
                    }
                    onUpdated={(
                        updated
                    ) => {
                        setSelectedVoucher(
                        updated
                        );

                        setVouchers(
                        (prev) =>
                            prev.map((v) =>
                            v.id ===
                            updated.id
                                ? updated
                                : v
                            )
                        );
                    }}
                    />
                </div>
              )}
            </>
          )}

          {/* USAGE */}
          {activeTab ===
            "usage" && (
            <div className="mt-6">
              <VoucherUsageTable
                history={
                  history
                }
              />
            </div>
          )}

          {/* REPORTS */}
          {activeTab ===
            "reports" && (
            <div className="space-y-5 mt-6">
              {vouchers.map(
                (
                  voucher,
                  index
                ) => (
                  <VoucherReportCard
                    key={
                      voucher.id
                    }
                    rank={
                      index +
                      1
                    }
                    code={
                      voucher.code
                    }
                    description={
                      voucher.description
                    }
                    used={
                      voucher.usedCount
                    }
                    limit={
                      voucher.usageLimit
                    }
                    type={
                      voucher.discountType
                    }
                    discount={
                      voucher.discountValue
                    }
                    remaining={
                      voucher.remainingTurns
                    }
                    status={
                      voucher.status
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}