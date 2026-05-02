import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "../components/StarField";

/* 🔥 ICONS */
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

/* ⬇️ Download / Save icon */
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function AIPage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setInput("");
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", imageUrl: data.result, prompt: text },
      ]);
    } catch (err) {
      console.error("AI ERROR:", err);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Save / download the AI-generated image.
   * Works for both base64 data URLs (HuggingFace) and regular http URLs (fallback).
   */
  const handleSaveImage = async (msg) => {
    try {
      const url = msg.imageUrl;
      const filename = `ai-image-${Date.now()}.png`;

      // If it's already a base64 data URL, download directly
      if (url.startsWith("data:")) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      } else {
        // For external URLs, fetch the blob and trigger download
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(objectUrl);
      }

      // Mark as saved (visual feedback)
      setSavedIds((prev) => new Set([...prev, msg.id]));
    } catch (err) {
      console.error("Save failed:", err);
      alert("Could not save image. Please try right-clicking the image and saving it.");
    }
  };

  const navBtn = {
    width: 56,
    height: 56,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background:
        "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      <StarField />

      {/* 🔥 NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "rgba(10,20,40,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* LEFT */}
        <button style={navBtn} onClick={() => navigate("/home")}>
          <PlanetIcon />
        </button>

        {/* CENTER (FIXED NAVIGATION) */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { icon: <HomeIcon />, path: "/home" },
            { icon: <GridIcon />, path: "/ai" },
            { icon: <EditIcon />, path: "/create" },
            { icon: <SearchIcon />, path: "/search" },
          ].map((item, index) => (
            <button
              key={index}
              style={navBtn}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* RIGHT */}
        <button style={navBtn} onClick={() => navigate("/profile")}>
          <UserIcon />
        </button>
      </div>

      {/* 💬 CHAT */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: "flex",
            justifyContent:
              msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            {msg.role === "ai" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{
                  width: 240,
                  height: 190,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <img
                    src={msg.imageUrl}
                    alt="AI"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* ⬇️ SAVE BUTTON — below each AI image */}
                <button
                  onClick={() => handleSaveImage(msg)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    background: savedIds.has(msg.id)
                      ? "rgba(80,180,120,0.25)"
                      : "rgba(255,255,255,0.1)",
                    border: savedIds.has(msg.id)
                      ? "1px solid rgba(80,200,120,0.4)"
                      : "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 20,
                    color: "white",
                    fontSize: 13,
                    padding: "6px 14px",
                    cursor: "pointer",
                    width: 240,
                    transition: "background 0.2s, border 0.2s",
                  }}
                >
                  <DownloadIcon />
                  {savedIds.has(msg.id) ? "Saved!" : "Save Image"}
                </button>
              </div>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.1)",
                padding: "12px 16px",
                borderRadius: "18px",
                color: "white",
                maxWidth: "70%",
              }}>
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ color: "white", opacity: 0.6 }}>
            Generating image...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ✨ INPUT */}
      <div style={{
        padding: 16,
        background: "rgba(10,20,40,0.9)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 30,
          padding: "10px 12px",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe the image you want..."
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              color: "white",
              outline: "none",
            }}
          />

          <button
            onClick={handleSend}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              background: "linear-gradient(135deg, #3a5a8a, #5a7aaa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
