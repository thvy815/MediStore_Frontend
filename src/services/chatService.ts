import { api } from "@/api/axios";
import type {
  ChatMessage,
  ChatSession,
  ChatType,
  SendChatMessageRequest,
} from "@/types/chat";

export const chatService = {
  createSession: async (
    userId: string,
    type: ChatType
  ): Promise<ChatSession> => {
    const res = await api.post<ChatSession>("/chat/sessions", {
      userId,
      type,
    });

    return res.data;
  },

  getSessionsByUser: async (userId: string): Promise<ChatSession[]> => {
    const res = await api.get<ChatSession[]>(`/chat/sessions/user/${userId}`);

    return res.data;
  },

  getActiveSessionsByType: async (
    type: ChatType
  ): Promise<ChatSession[]> => {
    const res = await api.get<ChatSession[]>(
      `/chat/sessions/type/${type}/active`
    );

    return res.data;
  },

  getMessagesBySession: async (
    sessionId: string
  ): Promise<ChatMessage[]> => {
    const res = await api.get<ChatMessage[]>(
      `/chat/sessions/${sessionId}/messages`
    );

    return res.data;
  },

  sendMessage: async (
    data: SendChatMessageRequest
  ): Promise<ChatMessage> => {
    const res = await api.post<ChatMessage>("/chat/messages", data);

    return res.data;
  },

  getAllSessions: async (): Promise<ChatSession[]> => {
    const res = await api.get<ChatSession[]>("/chat/sessions");

    return res.data;
  },

  getSessionsByType: async (type: ChatType): Promise<ChatSession[]> => {
    const res = await api.get<ChatSession[]>(`/chat/sessions/type/${type}`);

    return res.data;
  },

  closeSession: async (sessionId: string): Promise<ChatSession> => {
    const res = await api.put<ChatSession>(
      `/chat/sessions/${sessionId}/close`
    );

    return res.data;
  },

  createFeedback: async (data: {
    sessionId: string;
    rating: number;
    comment: string;
  }): Promise<string> => {
    const res = await api.post<string>("/chat/feedbacks", data);

    return res.data;
  },
};