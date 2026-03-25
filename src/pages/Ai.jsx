import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Star field ──────────────────────────────────────────────────────────────
const StarField = ({ count = 150 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.55 + 0.15,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  ).current;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          borderRadius: "50%", backgroundColor: "#fff",
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
};

// ── Icons ──────────────────────────────────────────────────────────────────
const PlanetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="6"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.5"/>
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

// ❌ DO NOT CHANGE BELOW (kept same)

const AttachIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="M21 15l-5-5L5 21"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

// ── Sunset image placeholder (CSS drawn) ──────────────────────────────────
const SunsetImage = () => (
  <div style={{
    width: "100%", height: "100%",
    borderRadius: 12,
    background: "linear-gradient(180deg, #1a2a4a 0%, #2a3a6a 15%, #8b4513 30%, #ff6b35 45%, #ff8c42 55%, #ffb347 65%, #4a90d9 70%, #2a5a8a 85%, #1a3a5a 100%)",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Sun */}
    <div style={{
      position: "absolute",
      bottom: "36%", left: "50%",
      transform: "translateX(-50%)",
      width: 48, height: 24,
      borderRadius: "50% 50% 0 0",
      background: "radial-gradient(circle at 50% 100%, #fff176, #ffcc02, #ff8c00)",
      boxShadow: "0 0 30px 15px rgba(255,180,0,0.4)",
    }} />
    {/* Horizon glow */}
    <div style={{
      position: "absolute",
      bottom: "34%", left: 0, right: 0, height: 40,
      background: "linear-gradient(180deg, transparent, rgba(255,120,0,0.35))",
    }} />
    {/* Water reflection */}
    <div style={{
      position: "absolute",
      bottom: 0, left: 0, right: 0, top: "34%",
      background: "linear-gradient(180deg, #1a4060 0%, #0d2a40 60%, #061520 100%)",
    }} />
    {/* Sun reflection on water */}
    <div style={{
      position: "absolute",
      bottom: 0, left: "50%",
      transform: "translateX(-50%)",
      width: 30, height: "34%",
      background: "linear-gradient(180deg, rgba(255,180,0,0.5), transparent)",
      filter: "blur(4px)",
    }} />
    {/* Cloud streaks */}
    {[
      { top: "12%", left: "10%", width: "25%", opacity: 0.35 },
      { top: "18%", right: "8%", width: "20%", opacity: 0.25 },
      { top: "8%",  left: "40%", width: "18%", opacity: 0.2  },
    ].map((c, i) => (
      <div key={i} style={{
        position: "absolute", ...c,
        height: 6, borderRadius: 3,
        background: "rgba(255,200,150,0.8)",
        filter: "blur(2px)",
      }} />
    ))}
  </div>
);

// ── Typing indicator ────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, padding: "10px 14px", alignItems: "center" }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{
        width: 7, height: 7, borderRadius: "50%",
        background: "rgba(255,255,255,0.5)",
        animation: `dotBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
      }} />
    ))}
  </div>
);

// ── Main AI Page ─────────────────────────────────────────────────────────────
export default function AIPage() {
  const [activeNav, setActiveNav] = useState("grid");
  const [input, setInput] = useState("");
  const navigate =  useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, role: "user", text: "create an image of a scenic sunset" },
    { id: 2, role: "ai",   image: true },
  ]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", image: true, prompt: text }]);
    }, 1800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Exo 2', 'Orbitron', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;500;600&display=swap');
        @keyframes twinkle {
          0%   { opacity: 0.1;  transform: scale(0.8); }
          100% { opacity: 0.85; transform: scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(-6px); opacity: 1;   }
        }
        @keyframes imageReveal {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        .nav-btn {
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 50%;
          cursor: pointer; border: none; background: transparent;
          color: rgba(255,255,255,0.45);
          transition: background 0.2s, color 0.2s;
        }
          .nav-btn svg {
  width: 32px;
  height: 32px;
}
        .nav-btn:hover  { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); }
        .nav-btn.active { background: rgba(255,255,255,0.12); color: white; }
        .nav-btn.special {
          background: rgba(15,30,60,0.85);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
        }
        .input-bar {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 30px;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-family: 'Exo 2', sans-serif;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          resize: none;
        }
        .input-bar::placeholder { color: rgba(255,255,255,0.25); }
        .input-bar:focus {
          border-color: rgba(100,160,255,0.4);
          background: rgba(255,255,255,0.1);
        }
        .icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%;
          cursor: pointer; border: none;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.5);
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.15); color: white; }
        .send-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 50%;
          cursor: pointer; border: none;
          background: linear-gradient(135deg, #3a5a8a, #5a7aaa);
          color: white;
          transition: transform 0.15s, box-shadow 0.2s;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(60,100,180,0.3);
        }
        .send-btn:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(60,100,180,0.45); }
        .send-btn:active { transform: scale(0.96); }
        .ai-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #2a4a7a, #3a6aaa);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(100,160,255,0.3);
          box-shadow: 0 0 12px rgba(60,100,200,0.2);
        }
        .user-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .dl-btn {
          position: absolute; bottom: 10px; right: 10px;
          display: flex; align-items: center; gap: 5px;
          padding: 5px 10px; border-radius: 16px;
          background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7); font-size: 11px;
          cursor: pointer; font-family: 'Exo 2', sans-serif;
          transition: background 0.2s;
        }
        .dl-btn:hover { background: rgba(0,0,0,0.75); color: white; }
        .bubble-user {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px 18px 4px 18px;
          padding: 10px 16px;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          font-family: 'Exo 2', sans-serif;
          max-width: 320px;
          line-height: 1.5;
          backdrop-filter: blur(8px);
        }
        .bubble-ai {
          background: rgba(30,50,90,0.5);
          border: 1px solid rgba(80,130,220,0.2);
          border-radius: 4px 18px 18px 18px;
          padding: 10px 16px;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-family: 'Exo 2', sans-serif;
          max-width: 320px;
          line-height: 1.5;
          backdrop-filter: blur(8px);
        }
      `}</style>

      <StarField count={160} />

      {/* Nebula glow */}
      <div style={{
        position: "absolute", top: "20%", left: "20%",
        width: "60%", height: "50%",
        background: "radial-gradient(ellipse, rgba(30,60,140,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── TOP NAVBAR ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px 10px",
        background: "linear-gradient(180deg, rgba(8,16,32,0.92) 0%, rgba(8,16,32,0.5) 100%)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.6s ease both" : "none",
      }}>
        <button className="nav-btn special" onClick={() => navigate("/home")} style={{ borderRadius: "50%" }}>
          <PlanetIcon />
        </button>

        <div style={{ display: "flex", gap: 4 }}>
          {[
        { id: "home",   icon: <HomeIcon />,   path: "/home" },
        { id: "grid",   icon: <GridIcon />,   path: "/ai" },
        { id: "edit",   icon: <EditIcon />,   path: "/create" },
        { id: "search", icon: <SearchIcon />, path: "/search" },
          ].map(n => (
            <button
              key={n.id}
              className={`nav-btn${activeNav === n.id ? " active" : ""}`}
              onClick={() => {setActiveNav(n.id); navigate(n.path);}}
            >{n.icon}</button>
          ))}
        </div>

                <button className="nav-btn special" onClick={() => navigate("/profile")} style={{ borderRadius: "50%" }}>
          <UserIcon />
        </button>
      </div>

      {/* ── CHAT AREA ── */}
      <div style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        position: "relative", zIndex: 10,
        padding: "24px 20px 12px",
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-start",
              gap: 10,
              animation: `fadeUp 0.4s ${idx === 0 ? "0.1s" : "0s"} both ease`,
            }}
          >
            {/* Avatar */}
            {msg.role === "ai" ? (
              <div className="ai-avatar">
                <GridIcon />
              </div>
            ) : (
              <div className="user-avatar">
                <UserIcon />
              </div>
            )}

            {/* Content */}
            {msg.image ? (
              <div style={{
                position: "relative",
                width: 220, height: 175,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                animation: "imageReveal 0.5s 0.1s both ease",
                flexShrink: 0,
              }}>
                <SunsetImage />
                <button className="dl-btn">
                  <DownloadIcon /> Save
                </button>
              </div>
            ) : (
              <div className={msg.role === "user" ? "bubble-user" : "bubble-ai"}>
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div className="ai-avatar"><GridIcon /></div>
            <div style={{
              background: "rgba(30,50,90,0.5)",
              border: "1px solid rgba(80,130,220,0.2)",
              borderRadius: "4px 18px 18px 18px",
              backdropFilter: "blur(8px)",
            }}>
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <div style={{
        position: "relative", zIndex: 20,
        padding: "12px 16px 18px",
        background: "linear-gradient(0deg, rgba(6,14,26,0.95) 0%, rgba(6,14,26,0.6) 100%)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.6s 0.2s both ease" : "none",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 32,
          padding: "6px 8px 6px 12px",
        }}>
          {/* Attach */}
          <button className="icon-btn" style={{ background: "none" }}>
            <AttachIcon />
          </button>
          {/* Image */}
          <button className="icon-btn" style={{ background: "none" }}>
            <ImageIcon />
          </button>

          {/* Text input */}
          <input
            className="input-bar"
            style={{
              flex: 1, border: "none", background: "transparent",
              padding: "6px 4px",
            }}
            placeholder="Ask AI to create an image..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />

          {/* Send */}
          <button
            className="send-btn"
            onClick={handleSend}
            style={{ opacity: input.trim() ? 1 : 0.5 }}
          >
            <SendIcon />
          </button>
        </div>

        {/* Hint text */}
        <div style={{
          textAlign: "center", marginTop: 8,
          fontSize: 10, color: "rgba(255,255,255,0.2)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.05em",
        }}>
          Andromeda AI · Describe any image you'd like to create
        </div>
      </div>
    </div>
  );
}
