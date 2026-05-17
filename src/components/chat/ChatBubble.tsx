import { useState } from "react";
import type { ChatMessage, ChatSession, ChatType } from "@/types/chat";
import { chatService } from "@/services/chatService";
import { chatSocketService } from "@/services/chatSocketService";
import "./ChatBubble.css";

const chatOptions = [
  {
    type: "ai" as ChatType,
    title: "Chat với AI",
    description: "Tư vấn nhanh tự động",
  },
  {
    type: "pharmacist" as ChatType,
    title: "Chat với dược sĩ",
    description: "Tư vấn thuốc và đơn thuốc",
  },
  {
    type: "support" as ChatType,
    title: "Chat với CSKH",
    description: "Hỗ trợ đơn hàng và tài khoản",
  },
];

const getCurrentUserId = () => {
  const userStorage = localStorage.getItem("user");
  if (!userStorage) return null;

  try {
    const user = JSON.parse(userStorage);
    return user.id;
  } catch {
    return null;
  }
};

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [endedSessionId, setEndedSessionId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const currentUserId = getCurrentUserId();

  const addMessageIfNotExists = (newMessage: ChatMessage) => {
    setMessages((prev) => {
      const exists = prev.some((msg) => msg.id === newMessage.id);
      if (exists) return prev;
      return [...prev, newMessage];
    });
  };

  const handleSelectChatType = async (type: ChatType) => {
    if (!currentUserId) {
      alert("Bạn cần đăng nhập");
      return;
    }

    try {
      setLoading(true);

      const sessions = await chatService.getSessionsByUser(currentUserId);

      const existingSession = sessions.find(
        (s) => s.type === type && s.status !== "closed"
      );

      const session = existingSession
        ? existingSession
        : await chatService.createSession(currentUserId, type);

      setCurrentSession(session);

      const oldMessages = await chatService.getMessagesBySession(session.id);
      setMessages(oldMessages);

      chatSocketService.connect(session.id, (newMessage) => {
        addMessageIfNotExists(newMessage);
      });
    } catch (error) {
      console.error(error);
      alert("Không thể mở chat");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
  if (!inputMessage.trim() || !currentSession || !currentUserId) return;

  const messageToSend = inputMessage;
  setInputMessage("");

  try {
    await chatService.sendMessage({
      sessionId: currentSession.id,
      senderId: currentUserId,
      senderType: "user",
      message: messageToSend,
    });

  } catch (error) {
    console.error(error);
    alert("Gửi tin nhắn thất bại");
    setInputMessage(messageToSend);
  }
};

  const handleEndSession = async () => {
    if (!currentSession) return;

    const confirmEnd = confirm("Bạn có chắc muốn kết thúc phiên chat này không?");
    if (!confirmEnd) return;

    try {
      await chatService.closeSession(currentSession.id);

      setEndedSessionId(currentSession.id);
      setShowFeedback(true);

      chatSocketService.disconnect();
      setCurrentSession(null);
      setMessages([]);
      setInputMessage("");
    } catch (error) {
      console.error(error);
      alert("Không thể kết thúc phiên chat");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!endedSessionId || rating === 0) return;

    try {
      await chatService.createFeedback({
        sessionId: endedSessionId,
        rating,
        comment,
      });

      alert("Cảm ơn bạn đã đánh giá!");
      setShowFeedback(false);
      setEndedSessionId(null);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      alert("Không thể gửi đánh giá");
    }
  };

  const handleBack = () => {
    chatSocketService.disconnect();
    setCurrentSession(null);
    setMessages([]);
    setInputMessage("");
  };

  const handleClose = () => {
    chatSocketService.disconnect();
    setIsOpen(false);
    setCurrentSession(null);
    setMessages([]);
    setInputMessage("");
  };

            return (
              <div className="chat-wrapper">
                {isOpen && (
                  <div className="chat-box">
                    {showFeedback ? (
            <>
              <div className="chat-header">
                <div>
                  <h3>Đánh giá phiên chat</h3>
                  <p>Bạn thấy trải nghiệm hỗ trợ như thế nào?</p>
                </div>
                <button onClick={() => setShowFeedback(false)}>×</button>
              </div>

              <div className="feedback-box">
                <p>Bạn đánh giá phiên chat này bao nhiêu sao?</p>

                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={star <= rating ? "star active" : "star"}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  className="submit-feedback-btn"
                  onClick={handleSubmitFeedback}
                  disabled={rating === 0}
                >
                  Gửi đánh giá
                </button>
              </div>
            </>
          ) : !currentSession ? (
            <>
              <div className="chat-header">
                <div>
                  <h3>Xin chào!</h3>
                  <p>Bạn muốn được hỗ trợ qua kênh nào?</p>
                </div>
                <button onClick={handleClose}>×</button>
              </div>

              <div className="chat-options">
                {chatOptions.map((option) => (
                  <button
                    key={option.type}
                    className="chat-option"
                    onClick={() => handleSelectChatType(option.type)}
                    disabled={loading}
                  >
                    <strong>{option.title}</strong>
                    <span>{option.description}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="chat-header">
                <button className="back-btn" onClick={handleBack}>
                  ←
                </button>

                <div>
                  <h3>
                    {currentSession.type === "ai"
                      ? "AI Assistant"
                      : currentSession.type === "pharmacist"
                      ? "Dược sĩ"
                      : "Chăm sóc khách hàng"}
                  </h3>
                  <p>🟢 Đang hoạt động</p>
                </div>

                <div className="chat-header-actions">
                  <button className="end-chat-btn" onClick={handleEndSession}>
                    Kết thúc
                  </button>

                  <button onClick={handleClose}>×</button>
                </div>
              </div>

              <div className="chat-messages">
                {messages.length === 0 ? (
                  <p className="empty-message">Hãy bắt đầu cuộc trò chuyện...</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={
                        msg.senderType === "user"
                          ? "message-row user-message"
                          : "message-row other-message"
                      }
                    >
                      <div className="message-bubble">{msg.message}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />

                <button onClick={handleSendMessage}>Gửi</button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        className="chat-floating-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
    </div>
  );
}