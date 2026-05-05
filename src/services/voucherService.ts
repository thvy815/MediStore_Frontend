import axios from "axios";

export const voucherService = {
  getVouchers: () => axios.get("http://localhost:8080/api/vouchers"),
};