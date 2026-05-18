export type ChatType = "ai" | "support" | "pharmacist";

export interface ChatSession {
  id: string;
  userId: string | null;
  type: "ai" | "support" | "pharmacist" | string;
  status: "active" | "closed" | string;
  createdAt: string;
  endedAt: string | null;
}

export type ChatMessage = {
  id?: string;
  messageId?: string;
  sessionId: string;
  senderId: string | null;
  senderType: "user" | "staff" | "admin" | "ai";
  message: string;
  createdAt?: string;
};

export interface CreateChatSessionRequest {
  userId: string;
  type: ChatType;
}

export interface SendChatMessageRequest {
  sessionId: string;
  senderId: string | null;
  senderType: "user" | "staff" | "ai";
  message: string;
}