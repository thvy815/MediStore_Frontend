import type {
  ChatMessage,
  ChatSession,
  ChatType,
  SendChatMessageRequest,
} from "@/types/chat";

const API_URL = "http://localhost:8080/api/chat";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const chatService = {
  createSession: async (
    userId: string,
    type: ChatType
  ): Promise<ChatSession> => {
    const res = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, type }),
    });

    if (!res.ok) {
      throw new Error("Không thể tạo phiên chat");
    }

    return res.json();
  },

  getSessionsByUser: async (userId: string): Promise<ChatSession[]> => {
    const res = await fetch(`${API_URL}/sessions/user/${userId}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Không thể lấy danh sách phiên chat");
    }

    return res.json();
  },

  getActiveSessionsByType: async (
    type: ChatType
  ): Promise<ChatSession[]> => {
    const res = await fetch(`${API_URL}/sessions/type/${type}/active`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Không thể lấy phiên chat đang hoạt động");
    }

    return res.json();
  },

  getMessagesBySession: async (
    sessionId: string
  ): Promise<ChatMessage[]> => {
    const res = await fetch(`${API_URL}/sessions/${sessionId}/messages`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Không thể lấy tin nhắn");
    }

    return res.json();
  },

  sendMessage: async (
    data: SendChatMessageRequest
  ): Promise<ChatMessage> => {
    const res = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Không thể gửi tin nhắn");
    }

    return res.json();
  },

  getAllSessions: async (): Promise<ChatSession[]> => {
    const res = await fetch(`${API_URL}/sessions`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Không thể lấy tất cả phiên chat");
    }

    return res.json();
  },

  getSessionsByType: async (type: ChatType): Promise<ChatSession[]> => {
    const res = await fetch(`${API_URL}/sessions/type/${type}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Không thể lấy phiên chat theo loại");
    }

    return res.json();
  },

  closeSession: async (sessionId: string): Promise<ChatSession> => {
    const res = await fetch(`${API_URL}/sessions/${sessionId}/close`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Không thể đóng phiên chat");
    }

    return res.json();
  },

  createFeedback: async (data: {
    sessionId: string;
    rating: number;
    comment: string;
  }): Promise<string> => {
    const res = await fetch(`${API_URL}/feedbacks`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Không thể gửi đánh giá");
    }

    return res.text();
  },
};