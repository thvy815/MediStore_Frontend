import { createContext, useContext, useState } from "react";
import type { CartItem } from "@/types/cart";
import type { Voucher } from "@/types/voucher";

export type CheckoutItem = {
  productId: string;
  productUnitId: string;
  quantity: number;
  unitPrice: number;
};

export type ShippingInfo = {
  fullName: string;
  phone: string;
  address: string;
};

export type DeliveryInfo = {
  id: string;
  fee: number;
  name: string;
  description: string;
  estimatedDays: number;
};

export type PaymentInfo = {
  id: string;
  code: string;
  name: string;
};

type CheckoutState = {
  selectedItems: CartItem[];
  setSelectedItems: (items: CartItem[]) => void;

  shippingInfo?: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;

  delivery: DeliveryInfo;
  setDelivery: (d: DeliveryInfo) => void;

  payment?: PaymentInfo;
  setPayment: (p: PaymentInfo) => void;

  voucher: Voucher | null;
  setVoucher: (v: Voucher | null) => void;
};

const CheckoutContext = createContext<CheckoutState | null>(null);

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | undefined>();

  const [delivery, setDelivery] = useState<DeliveryInfo>({
    id: "",
    fee: 0,
    name: "",
    description: "",
    estimatedDays: 0,
  });

  const [payment, setPayment] = useState<PaymentInfo | undefined>();

  const [voucher, setVoucher] = useState<Voucher | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        shippingInfo,
        setShippingInfo,
        delivery,
        setDelivery,
        payment,
        setPayment,
        voucher,
        setVoucher,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);

  if (!ctx) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }

  return ctx;
};