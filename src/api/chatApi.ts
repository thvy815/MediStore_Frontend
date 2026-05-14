import type {
  ChatMessage,
  ChatSession,
  ChatType,
  CreateChatSessionRequest,
  SendChatMessageRequest,
} from "../types/chat";

const API_URL = "http://localhost:8080/api/chat";

export const createChatSession = async (
  userId: string,
  type: ChatType
): Promise<ChatSession> => {
  const body: CreateChatSessionRequest = {
    userId,
    type,
  };

  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Không thể tạo phiên chat");
  }

  return res.json();
};

export const sendChatMessage = async (
  data: SendChatMessageRequest
): Promise<ChatMessage> => {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Không thể gửi tin nhắn");
  }

  return res.json();
};

export const getChatMessages = async (
  sessionId: string
): Promise<ChatMessage[]> => {
  const res = await fetch(`${API_URL}/sessions/${sessionId}/messages`);

  if (!res.ok) {
    throw new Error("Không thể lấy tin nhắn");
  }

  return res.json();
};