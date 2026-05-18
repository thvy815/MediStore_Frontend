import axios from "axios";
import type { Payment } from "@/types/payment";

const API = "http://localhost:8080/api/payments";

export const paymentService = {
  getAll: () => axios.get<Payment[]>(`${API}/all-history`),
};