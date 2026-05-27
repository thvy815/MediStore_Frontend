import type {
  ChatMessage,
  ChatSession,
  ChatType,
  CreateChatSessionRequest,
  SendChatMessageRequest,
} from "../types/chat";

import { api } from "@/api/axios";

const BASE_URL = "/chat";

export const createChatSession = async (
  userId: string,
  type: ChatType
): Promise<ChatSession> => {
  const body: CreateChatSessionRequest = {
    userId,
    type,
  };

  const res = await api.post(`${BASE_URL}/sessions`, body);

  return res.data;
};

export const sendChatMessage = async (
  data: SendChatMessageRequest
): Promise<ChatMessage> => {
  const res = await api.post(`${BASE_URL}/messages`, data);

  return res.data;
};

export const getChatMessages = async (
  sessionId: string
): Promise<ChatMessage[]> => {
  const res = await api.get(
    `${BASE_URL}/sessions/${sessionId}/messages`
  );

  return res.data;
};