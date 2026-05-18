import { useEffect, useState } from "react";
import {
  Pencil,
  Save,
  X,
} from "lucide-react";

import { voucherService } from "@/services/voucherService";

import type {
  Voucher,
} from "@/types/voucher";

interface Props {
  voucher: Voucher;

  onUpdated?: (
    voucher: Voucher
  ) => void;
}

export default function VoucherConditionForm({
  voucher,
  onUpdated,
}: Props) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      minOrderValue:
        voucher.minOrderValue || 0,

      maxDiscount:
        voucher.maxDiscount || 0,

      usageLimit:
        voucher.usageLimit || 0,

      usagePerUser:
        voucher.usagePerUser || 0,

      startDate:
        voucher.startDate || "",

      endDate:
        voucher.endDate || "",
    });

  useEffect(() => {
    setForm({
      minOrderValue:
        voucher.minOrderValue || 0,

      maxDiscount:
        voucher.maxDiscount || 0,

      usageLimit:
        voucher.usageLimit || 0,

      usagePerUser:
        voucher.usagePerUser || 0,

      startDate:
        voucher.startDate || "",

      endDate:
        voucher.endDate || "",
    });

    setIsEditing(false);
  }, [voucher]);

  const handleChange = (
    key: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave =
    async () => {
      try {
        setLoading(true);

        const payload = {
          code: voucher.code,
          description:
            voucher.description,
          discountType:
            voucher.discountType,
          discountValue:
            voucher.discountValue,
          status:
            voucher.status,

          minOrderValue:
            Number(
              form.minOrderValue
            ),

          maxDiscount:
            Number(
              form.maxDiscount
            ),

          usageLimit:
            Number(
              form.usageLimit
            ),

          usagePerUser:
            Number(
              form.usagePerUser
            ),

          startDate:
            form.startDate,

          endDate:
            form.endDate,
        };

        const res =
          await voucherService.update(
            voucher.id,
            payload
          );

        onUpdated?.(
          res
        );

        setIsEditing(false);

        alert(
          "Update conditions successfully"
        );
      } catch (err) {
        console.error(err);

        alert(
          "Failed to update voucher"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-white border rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Set Conditions of
            Use
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Configure voucher
            restrictions
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() =>
              setIsEditing(
                true
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
          >
            <Pencil className="w-4 h-4" />
            Edit Conditions
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsEditing(
                  false
                );

                setForm({
                  minOrderValue:
                    voucher.minOrderValue ||
                    0,

                  maxDiscount:
                    voucher.maxDiscount ||
                    0,

                  usageLimit:
                    voucher.usageLimit ||
                    0,

                  usagePerUser:
                    voucher.usagePerUser ||
                    0,

                  startDate:
                    voucher.startDate ||
                    "",

                  endDate:
                    voucher.endDate ||
                    "",
                });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>

            <button
              onClick={
                handleSave
              }
              disabled={
                loading
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />

              {loading
                ? "Saving..."
                : "Save Conditions"}
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-5 mt-6">
        <FormField
          label="Minimum Purchase"
          value={
            form.minOrderValue
          }
          disabled={
            !isEditing
          }
          onChange={(
            value
          ) =>
            handleChange(
              "minOrderValue",
              value
            )
          }
        />

        <FormField
          label="Max Discount"
          value={
            form.maxDiscount
          }
          disabled={
            !isEditing
          }
          onChange={(
            value
          ) =>
            handleChange(
              "maxDiscount",
              value
            )
          }
        />

        <FormField
          label="Usage Limit"
          value={
            form.usageLimit
          }
          disabled={
            !isEditing
          }
          onChange={(
            value
          ) =>
            handleChange(
              "usageLimit",
              value
            )
          }
        />

        <FormField
          label="Usage Per User"
          value={
            form.usagePerUser
          }
          disabled={
            !isEditing
          }
          onChange={(
            value
          ) =>
            handleChange(
              "usagePerUser",
              value
            )
          }
        />

        <FormField
          type="date"
          label="Start Date"
          value={
            form.startDate
          }
          disabled={
            !isEditing
          }
          onChange={(
            value
          ) =>
            handleChange(
              "startDate",
              value
            )
          }
        />

        <FormField
          type="date"
          label="End Date"
          value={
            form.endDate
          }
          disabled={
            !isEditing
          }
          onChange={(
            value
          ) =>
            handleChange(
              "endDate",
              value
            )
          }
        />
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: any;
  disabled?: boolean;
  type?: string;
  onChange: (
    value: string
  ) => void;
}

function FormField({
  label,
  value,
  disabled,
  type = "number",
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="text-sm text-gray-500">
        {label}
      </label>

      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className={`w-full border rounded-xl px-4 py-3 mt-2 ${
          disabled
            ? "bg-gray-50 text-gray-500"
            : "bg-white"
        }`}
      />
    </div>
  );
}