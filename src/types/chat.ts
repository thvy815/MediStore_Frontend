export type ChatType = "ai" | "support" | "pharmacist";

export interface ChatSession {
  id: string;
  userId: string;
  type: ChatType;
  status: string;
  createdAt: string;
  endedAt?: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string | null;
  senderType: "user" | "staff" | "ai";
  message: string;
  createdAt: string;
}

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