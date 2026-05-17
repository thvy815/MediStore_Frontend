import { api } from "@/api/axios";
import { getUserId } from "@/utils/auth";

export const productReviewService = {
  createReview: (data: {
    productId: string;
    orderItemId: string;
    rating: number;
    comment: string;
  }) => {
    const userId = getUserId();
    if (!userId) return Promise.reject("NOT_LOGIN");

    return api.post("/product-reviews", {
      userId,
      ...data,
    });
  },

  getAllReviews: () => {
    return api.get("/product-reviews");
  },

  getReviewsByProduct: (productId: string) => {
    return api.get(`/product-reviews/product/${productId}`);
  },

  getReviewsByUser: (userId: string) => {
    return api.get(`/product-reviews/user/${userId}`);
  },

  updateReview: (
    reviewId: string,
    data: {
      rating: number;
      comment: string;
    }
  ) => {
    return api.put(`/product-reviews/${reviewId}`, data);
  },

  deleteReview: (reviewId: string) => {
    return api.delete(`/product-reviews/${reviewId}`);
  },
};