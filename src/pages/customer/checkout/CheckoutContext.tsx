import { createContext, useContext, useState } from "react";
import type { CartItem } from "@/types/cart";

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
  city: string;
  district: string;
  ward: string;
};

export type DeliveryInfo = {
  id: "standard" | "express";
  fee: number;
};

type CheckoutState = {
  selectedItems: CartItem[];
  setSelectedItems: (items: CartItem[]) => void;

  shippingInfo?: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;

  delivery: DeliveryInfo;
  setDelivery: (d: DeliveryInfo) => void;
};

const CheckoutContext = createContext<CheckoutState | null>(null);

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | undefined>();
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    id: "standard",
    fee: 30000,
  });

  return (
    <CheckoutContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        shippingInfo,
        setShippingInfo,
        delivery,
        setDelivery,
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
