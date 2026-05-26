import { useEffect, useMemo, useState } from "react";
import { chatService } from "@/services/chatService";
import { webSocketService } from "@/services/webSocketService";
import type { ChatMessage, ChatSession } from "@/types/chat";

export default function ChatSessionManagement() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "ai" | "support" | "pharmacist">("all");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchSessions();

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const connectToSessionSocket = (sessionId: string) => {
  webSocketService.connectChat(sessionId, (newMsg) => {
    setMessages((prev) => {
      const newMsgId = newMsg.id || newMsg.messageId;

      const exists = prev.some((m) => {
        const oldMsgId = m.id || m.messageId;
        return newMsgId && oldMsgId && oldMsgId === newMsgId;
      });

      if (exists) return prev;

      return [...prev, newMsg];
    });
  });
};

  const fetchSessions = async () => {
    const data = await chatService.getAllSessions();

    const sortedData = [...data].sort((a, b) => {
      if (a.status === "active" && b.status !== "active") return -1;
      if (a.status !== "active" && b.status === "active") return 1;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setSessions(sortedData);

    if (sortedData.length > 0) {
      setSelectedSession(sortedData[0]);
      await fetchMessages(sortedData[0].id);
      connectToSessionSocket(sortedData[0].id);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    const data = await chatService.getMessagesBySession(sessionId);
    setMessages(data);
  };

  const handleSelectSession = async (session: ChatSession) => {
    setSelectedSession(session);
    await fetchMessages(session.id);
    connectToSessionSocket(session.id);
  };

  const handleCloseSession = async () => {
    if (!selectedSession) return;

    await chatService.closeSession(selectedSession.id);
    await fetchSessions();
  };

  const handleSendStaffMessage = async () => {
    if (!selectedSession || !newMessage.trim()) return;

    await chatService.sendMessage({
      sessionId: selectedSession.id,
      senderId: null,
      senderType: "staff",
      message: newMessage.trim(),
    });

    setNewMessage("");
  };

  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => {
        const keyword = search.toLowerCase();

        const matchSearch =
          s.id.toLowerCase().includes(keyword) ||
          s.userId?.toLowerCase().includes(keyword);

        const matchStatus =
          statusFilter === "all" || s.status?.toLowerCase() === statusFilter;

        const matchType =
          typeFilter === "all" || s.type?.toLowerCase() === typeFilter;

        return matchSearch && matchStatus && matchType;
      })
      .sort((a, b) => {
        if (a.status === "active" && b.status !== "active") return -1;
        if (a.status !== "active" && b.status === "active") return 1;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [sessions, search, statusFilter, typeFilter]);

  const totalSessions = sessions.length;
  const activeSessions = sessions.filter((s) => s.status === "active").length;
  const closedSessions = sessions.filter((s) => s.status === "closed").length;

  const handleDownloadHistory = () => {
    if (!selectedSession) return;

    const content = messages
      .map((m) => `[${m.senderType}] ${m.message}`)
      .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${selectedSession.id}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Chat Session Management</h2>
        <p style={styles.subtitle}>Manage active chat sessions and view chat history</p>
      </div>

      <div style={styles.main}>
        <div style={styles.sidebar}>
          <input
            style={styles.searchInput}
            placeholder="Search by session ID or user ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={styles.filterRow}>
            <button style={filterBtn(statusFilter === "all")} onClick={() => setStatusFilter("all")}>
              All
            </button>
            <button style={filterBtn(statusFilter === "active")} onClick={() => setStatusFilter("active")}>
              Active
            </button>
            <button style={filterBtn(statusFilter === "closed")} onClick={() => setStatusFilter("closed")}>
              Closed
            </button>
          </div>

          <select
            style={styles.select}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="all">All Types</option>
            <option value="ai">AI</option>
            <option value="support">Support</option>
            <option value="pharmacist">Pharmacist</option>
          </select>

          <div style={styles.sessionList}>
            {filteredSessions.map((session) => {
              const selected = selectedSession?.id === session.id;
              const active = session.status === "active";

              return (
                <div
                  key={session.id}
                  style={{
                    ...styles.sessionCard,
                    ...(selected ? styles.sessionCardActive : {}),
                  }}
                  onClick={() => handleSelectSession(session)}
                >
                  <div style={styles.sessionTop}>
                    <strong>{session.type.toUpperCase()} Chat</strong>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: active ? "#dcfce7" : "#f1f5f9",
                        color: active ? "#15803d" : "#475569",
                      }}
                    >
                      {session.status}
                    </span>
                  </div>

                  <p style={styles.smallText}>Session: {session.id.slice(0, 8)}</p>
                  <p style={styles.smallText}>User: {session.userId?.slice(0, 8) || "Guest"}</p>
                  <p style={styles.smallText}>{formatDate(session.createdAt)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.chatPanel}>
          {selectedSession ? (
            <>
              <div style={styles.chatHeader}>
                <div>
                  <h3 style={styles.chatTitle}>{selectedSession.type.toUpperCase()} Chat</h3>
                  <p style={styles.infoText}>Session ID: {selectedSession.id}</p>
                  <p style={styles.infoText}>User ID: {selectedSession.userId || "Guest"}</p>

                  <div style={styles.infoGrid}>
                    <div>
                      <span style={styles.label}>Status</span>
                      <p>{selectedSession.status}</p>
                    </div>

                    <div>
                      <span style={styles.label}>Created</span>
                      <p>{formatDate(selectedSession.createdAt)}</p>
                    </div>

                    <div>
                      <span style={styles.label}>Ended</span>
                      <p>
                        {selectedSession.endedAt
                          ? formatDate(selectedSession.endedAt)
                          : "Ongoing"}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={styles.actionRow}>
                  {selectedSession.status === "active" && (
                    <button style={styles.endButton} onClick={handleCloseSession}>
                      End Chat
                    </button>
                  )}

                  <button style={styles.downloadButton} onClick={handleDownloadHistory}>
                    Download History
                  </button>
                </div>
              </div>

              <div style={styles.messageArea}>
                {messages.length === 0 ? (
                  <div style={styles.empty}>No messages</div>
                ) : (
                  messages.map((msg, index) => {
                    const isStaff =
                      msg.senderType === "staff" || msg.senderType === "admin";

                    return (
                      <div
                        key={msg.id || msg.messageId || index}
                        style={{
                          ...styles.messageWrapper,
                          justifyContent: isStaff ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            ...styles.messageBubble,
                            backgroundColor: isStaff ? "#16a34a" : "#ffffff",
                            color: isStaff ? "#ffffff" : "#334155",
                          }}
                        >
                          <div style={styles.sender}>
                            {isStaff ? "Staff" : "Customer"}
                          </div>

                          <div>{msg.message}</div>

                          <div style={styles.time}>{formatTime(msg.createdAt)}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {selectedSession.status === "active" && (
                <div style={styles.inputArea}>
                  <input
                    style={styles.messageInput}
                    placeholder="Type a reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendStaffMessage();
                      }
                    }}
                  />

                  <button style={styles.sendButton} onClick={handleSendStaffMessage}>
                    Send
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={styles.empty}>No session selected</div>
          )}
        </div>
      </div>

      <div style={styles.stats}>
        <StatBox title="Total Sessions" value={totalSessions} />
        <StatBox title="Active Sessions" value={activeSessions} green />
        <StatBox title="Closed Sessions" value={closedSessions} />
        <StatBox title="Visible Sessions" value={filteredSessions.length} yellow />
      </div>
    </div>
  );
}

function StatBox({
  title,
  value,
  green,
  yellow,
}: {
  title: string;
  value: string | number;
  green?: boolean;
  yellow?: boolean;
}) {
  return (
    <div
      style={{
        ...styles.statBox,
        backgroundColor: green ? "#f0fdf4" : yellow ? "#fefce8" : "#ffffff",
      }}
    >
      <p style={styles.statTitle}>{title}</p>
      <strong style={styles.statValue}>{value}</strong>
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "";
  return value.replace("T", " ").slice(0, 16);
}

function formatTime(value?: string) {
  if (!value) return "";
  return value.slice(11, 16);
}

function filterBtn(active: boolean): React.CSSProperties {
  return {
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: active ? "#16a34a" : "#f1f5f9",
    color: active ? "#ffffff" : "#475569",
    fontWeight: 600,
  };
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "20px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    color: "#1e293b",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
  },
  title: {
    margin: 0,
    fontSize: "22px",
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#64748b",
  },
  main: {
    display: "grid",
    gridTemplateColumns: "330px 1fr",
    gap: "20px",
  },
  sidebar: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },
  searchInput: {
    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    border: "1px solid #dbe3ef",
    marginBottom: "12px",
    boxSizing: "border-box",
  },
  filterRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #dbe3ef",
    marginBottom: "14px",
  },
  sessionList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "520px",
    overflowY: "auto",
  },
  sessionCard: {
    padding: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
  },
  sessionCardActive: {
    backgroundColor: "#ecfdf5",
    borderColor: "#22c55e",
  },
  sessionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    fontSize: "12px",
    borderRadius: "999px",
    padding: "4px 8px",
    textTransform: "capitalize",
  },
  smallText: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#64748b",
  },
  chatPanel: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },
  chatHeader: {
    padding: "18px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  chatTitle: {
    margin: 0,
    fontSize: "18px",
  },
  infoText: {
    color: "#64748b",
    margin: "6px 0",
    fontSize: "13px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "120px 180px 180px",
    gap: "14px",
    marginTop: "12px",
  },
  label: {
    color: "#94a3b8",
    fontSize: "12px",
  },
  actionRow: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
  },
  endButton: {
    border: "none",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  downloadButton: {
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  messageArea: {
    padding: "18px",
    backgroundColor: "#f1f5f9",
    minHeight: "360px",
    maxHeight: "520px",
    overflowY: "auto",
  },
  messageWrapper: {
    display: "flex",
    marginBottom: "12px",
  },
  messageBubble: {
    maxWidth: "65%",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  },
  sender: {
    fontSize: "11px",
    opacity: 0.8,
    marginBottom: "5px",
    textTransform: "capitalize",
  },
  time: {
    fontSize: "11px",
    opacity: 0.7,
    marginTop: "6px",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    padding: "16px",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
  },
  messageInput: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #dbe3ef",
    outline: "none",
    fontSize: "14px",
  },
  sendButton: {
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    padding: "0 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  },
  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
  },
  stats: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },
  statBox: {
    textAlign: "center",
    padding: "18px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },
  statTitle: {
    margin: "0 0 8px",
    color: "#64748b",
  },
  statValue: {
    fontSize: "22px",
  },
};