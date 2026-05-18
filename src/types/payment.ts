export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  status: string;
  paymentUrl: string;
  transactionRef: string;
  paymentMethod: string;
  createdAt: string;
}