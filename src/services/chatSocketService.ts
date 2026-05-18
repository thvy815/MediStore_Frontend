import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ChatMessage } from "@/types/chat";

let stompClient: Client | null = null;

export const chatSocketService = {
  connect: (
    sessionId: string,
    onMessageReceived: (message: ChatMessage) => void
  ) => {
    stompClient?.deactivate();

    const token = localStorage.getItem("accessToken");

    stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_API_URL}/ws-chat`),

      connectHeaders: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ WebSocket connected");

        stompClient?.subscribe(`/topic/chat/${sessionId}`, (message) => {
          console.log("📩 Received:", message.body);
          onMessageReceived(JSON.parse(message.body));
        });
      },

      onWebSocketError: (error) => {
        console.error("❌ WebSocket error:", error);
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame);
      },
    });

    stompClient.activate();
  },

  disconnect: () => {
    stompClient?.deactivate();
    stompClient = null;
  },
};