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
}