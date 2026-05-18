import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  Truck,
  Calendar,
  DollarSign,
  Star,
  X,
} from "lucide-react";

import { productReviewService } from "@/services/productReviewService";
import { useAuth } from "@/contexts/AuthContext";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedOrderItemId, setSelectedOrderItemId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!user?.id) {
      navigate("/customer/home");
      return;
    }

    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getUserOrders(user!.id);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
  if (!confirm("Xác nhận bạn đã nhận được hàng?")) return;

  try {
    await orderService.completeOrder(orderId, user!.id);

    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? { ...order, status: "completed" }
          : order
      )
    );
  } catch (error) {
    console.error(error);
    alert("Không thể cập nhật trạng thái đơn hàng");
  }
};

const handleCancelOrder = async (orderId: string) => {
  if (!confirm("Bạn có chắc muốn huỷ đơn hàng này?")) return;

  try {
    await orderService.cancelOrder(orderId, user!.id);

    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? { ...order, status: "cancelled" }
          : order
      )
    );
  } catch (error) {
    console.error(error);
    alert("Không thể huỷ đơn hàng");
  }
};

  const openReviewModal = (order: Order) => {
    if (order.status !== "completed") return;

    const firstItem = order.items[0];

    setReviewOrder(order);
    setSelectedProductId(firstItem?.productId || "");
    setSelectedOrderItemId(firstItem?.orderItemId || "");
    setRating(0);
    setComment("");
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedProductId) {
      alert("Vui lòng chọn sản phẩm cần đánh giá");
      return;
    }

    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }

    try {
      await productReviewService.createReview({
        orderItemId: selectedOrderItemId,
        productId: selectedProductId,
        rating,
        comment,
      });

      alert("Cảm ơn bạn đã đánh giá sản phẩm!");
      setShowReviewModal(false);
      setReviewOrder(null);
      setSelectedProductId("");
      setSelectedOrderItemId("");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      alert("Không thể gửi đánh giá. Có thể bạn đã đánh giá sản phẩm này rồi.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Đơn hàng của tôi
            </h1>

            <div className="text-sm text-gray-500">
              Tổng cộng: {orders.length} đơn hàng
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có đơn hàng nào
              </h3>
              <p className="text-gray-500">
                Khi bạn đặt hàng, đơn hàng sẽ xuất hiện ở đây.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const status = order.status?.toLowerCase();

                return (
                  <div
                    key={order.orderId}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Đơn hàng #{order.orderId.slice(-8)}
                        </span>

                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(order.totalAmount)}
                        </div>

                        <div className="text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "vi-VN"
                              )
                            : "-"}
                        </div>

                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleCompleteOrder(order.orderId)}
                            disabled={status !== "delivered"}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              status === "delivered"
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            Đã nhận hàng
                          </button>

                          <button
                            onClick={() => handleCancelOrder(order.orderId)}
                            disabled={status !== "pending"}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              status === "pending"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            Huỷ đơn
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-700">
                            Thông tin giao hàng
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <strong>{order.shippingName}</strong>
                          </p>
                          <p>{order.shippingAddress}</p>
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {order.shippingPhone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-700">
                            Phương thức giao hàng
                          </span>
                        </div>

                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>{order.deliveryMethodName}</strong>
                          </p>
                          <p className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            Phí ship: {formatCurrency(order.shippingFee)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-700 mb-3">
                        Sản phẩm ({order.items.length})
                      </h4>

                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.orderItemId}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {item.productName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} {item.unitName} ×{" "}
                                {formatCurrency(item.unitPrice)}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                {formatCurrency(item.quantity * item.unitPrice)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => openReviewModal(order)}
                        disabled={status !== "completed"}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          status === "completed"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Viết đánh giá
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showReviewModal && reviewOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Viết đánh giá</h2>

              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn sản phẩm
              </label>

              <select
                value={selectedOrderItemId}
                onChange={(e) => {
                  const item = reviewOrder.items.find(
                    (i) => i.orderItemId === e.target.value
                  );

                  setSelectedOrderItemId(e.target.value);
                  setSelectedProductId(item?.productId || "");
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {reviewOrder.items.map((item) => (
                  <option key={item.orderItemId} value={item.orderItemId}>
                    {item.productName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Đánh giá</p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    <Star
                      size={30}
                      className={
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhận xét
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px]"
              />
            </div>

            <button
              onClick={handleSubmitReview}
              disabled={rating === 0}
              className={`w-full py-2 rounded-lg font-medium ${
                rating === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      )}
    </div>
  );
}