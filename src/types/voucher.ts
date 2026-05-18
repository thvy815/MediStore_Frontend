export interface Voucher {
  id: string;
  code: string;
  description: string;
  discountType: "percent" | "fixed" | "freeship";
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number | null;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usagePerUser: number;
  status: string;

  usedCount: number;
  remainingTurns: number;

  createdAt: string;
}

export interface VoucherHistory {
  userId: string;
  customerName: string;
  orderId: string;
  voucherCode: string;
  discountAmount: number;
  usedAt: string;
}

export interface VoucherRequest {
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number | null;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usagePerUser: number;
  status: string;
}