import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "../components/StarField";

/* ─── ICONS ─────────────────────────────────────────────────────────────── */
const PlanetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <circle cx="12" cy="12" r="6"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.5"/>
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.3-4.3"/>
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 4-7 8-7s8 3 8 7"/>
  </svg>
);
const SendIcon = () => (
  <svg width="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);

/* ─── TIMESTAMP FORMATTER ────────────────────────────────────────────────── */
const formatTime = (isoString) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  if (isToday) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" }) +
    " · " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/* ─── DATE DIVIDER ───────────────────────────────────────────────────────── */
const DateDivider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
      {label}
    </span>
    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
  </div>
);

/* ─── MESSAGE BUBBLE ─────────────────────────────────────────────────────── */
const MessageBubble = ({ msg, onSave, isSaving }) => {
  const isUser = msg.role === "user";
  const isSaved = !!(msg.saved);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: isUser ? "flex-end" : "flex-start",
      gap: 4,
    }}>
      {isUser ? (
        <div style={{
          background: "rgba(255,255,255,0.1)",
          padding: "12px 16px",
          borderRadius: "18px 18px 4px 18px",
          color: "white", maxWidth: "70%", fontSize: 14, lineHeight: 1.5,
        }}>
          {msg.text}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* Image */}
          <div style={{
            width: 240, borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            {msg.imageUrl ? (
              <img src={msg.imageUrl} alt="AI generated" style={{ width: "100%", display: "block" }} />
            ) : (
              <div style={{
                width: "100%", height: 190,
                background: "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.15)",
                  borderTop: "2px solid white",
                  animation: "spin 0.8s linear infinite",
                }} />
              </div>
            )}
          </div>

          {/* Action buttons */}
          {msg.imageUrl && (
            <div style={{ display: "flex", gap: 6, width: 240 }}>
              {/* Download */}
              <button
                onClick={async () => {
                  try {
                    const a = document.createElement("a");
                    if (msg.imageUrl.startsWith("data:")) {
                      a.href = msg.imageUrl;
                    } else {
                      const blob = await fetch(msg.imageUrl).then(r => r.blob());
                      a.href = URL.createObjectURL(blob);
                    }
                    a.download = "ai-image-" + Date.now() + ".png";
                    a.click();
                  } catch (e) {
                    alert("Download failed. Right-click the image to save.");
                  }
                }}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  padding: "7px 0", background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20,
                  color: "white", fontSize: 12, cursor: "pointer",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </button>

              {/* Save */}
              <button
                onClick={() => !isSaved && !isSaving && onSave && onSave(msg)}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  padding: "7px 0",
                  background: isSaved ? "rgba(80,180,120,0.2)" : "rgba(58,90,138,0.4)",
                  border: isSaved ? "1px solid rgba(80,200,120,0.35)" : "1px solid rgba(90,122,170,0.5)",
                  borderRadius: 20, color: "white", fontSize: 12,
                  cursor: isSaved || isSaving ? "default" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isSaved ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Saved
                  </>
                ) : isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {msg.createdAt && (
        <span style={{
          fontSize: 10, color: "rgba(255,255,255,0.25)",
          paddingLeft: isUser ? 0 : 4, paddingRight: isUser ? 4 : 0,
        }}>
          {formatTime(msg.createdAt)}
        </span>
      )}
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function AIPage() {
  const [input, setInput] = useState("");
  const [savingId, setSavingId] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const bottomRef = useRef(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) { setHistoryLoading(false); return; }
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/ai/history/${userId}`);
        const data = await res.json();
        setMessages(data.map((m) => ({
          id: m._id, _id: m._id, role: m.role,
          text: m.text || "", imageUrl: m.imageUrl || "",
          prompt: m.prompt || "", createdAt: m.createdAt,
        })));
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const tempUserId = Date.now();
    const tempAiId = Date.now() + 1;
    const now = new Date().toISOString();

    setInput("");
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { id: tempUserId, role: "user", text, createdAt: now },
      { id: tempAiId, role: "ai", imageUrl: "", prompt: text, createdAt: now },
    ]);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, userId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempAiId ? { ...m, imageUrl: data.result, saved: false } : m
        )
      );
    } catch (err) {
      console.error("AI ERROR:", err);
      setMessages((prev) => prev.filter((m) => m.id !== tempAiId));
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSaveToGallery = async (msg) => {
    if (!userId || !msg.imageUrl || savingId) return;
    setSavingId(msg.id);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/ai/save-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, imageUrl: msg.imageUrl, prompt: msg.prompt || "" }),
      });
      const data = await res.json();
      if (data._id) {
        setMessages((prev) =>
          prev.map((m) =>
            (m.id === msg.id || m._id === msg._id)
              ? { ...m, saved: true, _id: data._id, imageUrl: data.imageUrl }
              : m
          )
        );
      }
    } catch (err) {
      console.error("Manual save failed:", err);
    }
    setSavingId(null);
  };

  const handleClearHistory = async () => {
    try {
      await fetch(`http://127.0.0.1:5000/api/ai/history/${userId}`, { method: "DELETE" });
      setMessages([]);
      setShowClearConfirm(false);
    } catch (err) {
      console.error("Failed to clear history:", err);
    }
  };

  const renderMessages = () => {
    const items = [];
    let lastDate = null;
    messages.forEach((msg) => {
      const msgDate = msg.createdAt ? new Date(msg.createdAt).toDateString() : null;
      if (msgDate && msgDate !== lastDate) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const label = msgDate === today ? "Today"
          : msgDate === yesterday ? "Yesterday"
          : new Date(msg.createdAt).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
        items.push(<DateDivider key={`divider-${msgDate}`} label={label} />);
        lastDate = msgDate;
      }
      items.push(
        <MessageBubble
          key={msg.id || msg._id}
          msg={msg}
          onSave={handleSaveToGallery}
          isSaving={savingId === msg.id}
        />
      );
    });
    return items;
  };

  const navBtn = {
    width: 56, height: 56, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>

      <StarField />

      {/* NAVBAR */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", background: "rgba(10,20,40,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", zIndex: 20,
      }}>
        <button style={navBtn} onClick={() => navigate("/home")}><PlanetIcon /></button>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { icon: <HomeIcon />, path: "/home" },
            { icon: <GridIcon />, path: "/ai" },
            { icon: <EditIcon />, path: "/create" },
            { icon: <SearchIcon />, path: "/search" },
          ].map((item, i) => (
            <button key={i} style={navBtn} onClick={() => navigate(item.path)}>{item.icon}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {messages.length > 0 && (
            <button
              style={{ ...navBtn, width: "auto", borderRadius: 20, padding: "0 12px", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.5)" }}
              onClick={() => setShowClearConfirm(true)}
            >
              <TrashIcon /> Clear
            </button>
          )}
          <button style={navBtn} onClick={() => navigate("/profile")}><UserIcon /></button>
        </div>
      </div>

      {/* CLEAR CONFIRM MODAL */}
      {showClearConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "rgba(15,30,55,0.98)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, padding: 28, maxWidth: 300, width: "90%",
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <p style={{ color: "white", margin: 0, fontSize: 15, textAlign: "center" }}>
              Clear all chat history? This can't be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowClearConfirm(false)} style={{ flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "white", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleClearHistory} style={{ flex: 1, padding: "10px 0", background: "rgba(220,60,60,0.25)", border: "1px solid rgba(220,80,80,0.4)", borderRadius: 10, color: "white", cursor: "pointer" }}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT AREA */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 20px 8px",
        display: "flex", flexDirection: "column", gap: 12,
        position: "relative", zIndex: 10,
      }}>
        {historyLoading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 12, opacity: 0.5 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTop: "2px solid white", animation: "spin 0.8s linear infinite" }} />
            <span style={{ color: "white", fontSize: 13 }}>Loading history...</span>
          </div>
        ) : messages.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 10, opacity: 0.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" style={{ width: 48, height: 48 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12s1.5-3 4-3 4 3 4 3"/>
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round"/>
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p style={{ color: "white", fontSize: 13, margin: 0, textAlign: "center" }}>
              Describe anything to generate an image
            </p>
          </div>
        ) : (
          renderMessages()
        )}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 4px" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.5)", animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }} />
            ))}
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Generating...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div style={{ padding: 16, background: "rgba(10,20,40,0.9)", borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative", zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 30, padding: "10px 12px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe the image you want..."
            disabled={loading}
            style={{ flex: 1, border: "none", background: "transparent", color: "white", outline: "none", fontSize: 14, opacity: loading ? 0.5 : 1 }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{ width: 48, height: 48, borderRadius: "50%", border: "none", background: loading ? "rgba(90,122,170,0.4)" : "linear-gradient(135deg, #3a5a8a, #5a7aaa)", display: "flex", alignItems: "center", justifyContent: "center", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}