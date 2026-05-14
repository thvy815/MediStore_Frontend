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

    stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),
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