import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Star field ────────────────────────────────────────────────────────────────
const StarField = ({ count = 120 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
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

// ── Nav Icons ─────────────────────────────────────────────────────────────────
const PlanetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="6"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.5"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const GridIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const EditIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);
const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

// ── Section row icons ─────────────────────────────────────────────────────────
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const StorageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const PaletteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/>
    <circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/>
    <path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const FileTextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ── Toggle switch ─────────────────────────────────────────────────────────────
const Toggle = ({ on, onChange }) => (
  <div
    onClick={() => onChange(!on)}
    style={{
      width: 38, height: 22, borderRadius: 11,
      background: on ? "rgba(80,140,255,0.75)" : "rgba(255,255,255,0.12)",
      position: "relative", cursor: "pointer",
      transition: "background 0.25s",
      border: `1px solid ${on ? "rgba(120,170,255,0.5)" : "rgba(255,255,255,0.1)"}`,
      flexShrink: 0,
    }}
  >
    <div style={{
      position: "absolute", top: 2,
      left: on ? "calc(100% - 18px)" : 2,
      width: 16, height: 16, borderRadius: "50%",
      background: "white",
      transition: "left 0.25s cubic-bezier(0.23,1,0.32,1)",
      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    }} />
  </div>
);

// ── Row item ──────────────────────────────────────────────────────────────────
const Row = ({ icon, label, sub, right, onClick, danger = false, delay = 0, toggle, toggleVal, onToggle }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "13px 16px",
        borderRadius: 12,
        background: hov && onClick ? "rgba(255,255,255,0.05)" : "transparent",
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.18s",
        animation: `fadeUp 0.4s ${delay}s both ease`,
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: danger ? "rgba(180,40,40,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${danger ? "rgba(200,60,60,0.2)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        color: danger ? "rgba(255,100,100,0.8)" : "rgba(255,255,255,0.55)",
      }}>
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, color: danger ? "rgba(255,100,100,0.85)" : "rgba(255,255,255,0.8)",
          fontFamily: "'Exo 2', sans-serif",
          letterSpacing: "0.04em",
        }}>
          {label}
        </div>
        {sub && (
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.28)",
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em",
            marginTop: 1,
          }}>
            {sub}
          </div>
        )}
      </div>

      {toggle ? (
        <Toggle on={toggleVal} onChange={onToggle} />
      ) : right ? (
        <span style={{
          fontSize: 10, color: "rgba(255,255,255,0.3)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em",
          marginRight: 4,
        }}>
          {right}
        </span>
      ) : onClick ? (
        <span style={{ color: "rgba(255,255,255,0.2)" }}>
          <ChevronRight />
        </span>
      ) : null}
    </div>
  );
};

// ── Section header ────────────────────────────────────────────────────────────
const Section = ({ title, delay = 0 }) => (
  <div style={{
    padding: "6px 4px 4px",
    fontSize: 9, color: "rgba(255,255,255,0.25)",
    fontFamily: "'Exo 2', sans-serif",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    animation: `fadeUp 0.4s ${delay}s both ease`,
  }}>
    {title}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function Profile() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeNav, setActiveNav] = useState("user");
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Mock user data
  const user = {
    name: "priya",
    handle: "@priya",
    joined: "jan 2026",
    albums: 2,
    collages: 1,
  };

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

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
          0%   { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.85; transform: scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashFloat {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -200; }
        }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(80,120,220,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(80,120,220,0); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .nav-item {
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 50%;
          cursor: pointer; transition: background 0.2s ease, color 0.2s ease;
          color: rgba(255,255,255,0.45);
          border: none; background: transparent;
        }
        .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.07); }
        .nav-item.active { color: white; background: rgba(255,255,255,0.12); }
        .nav-item.special { color: white; background: rgba(20,40,80,0.8); border: 1px solid rgba(255,255,255,0.15); }
                  .nav-item svg {
  width: 32px;
  height: 32px;
}
      `}</style>

      <StarField count={120} />

      {/* ── TOP NAV ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px 10px",
        background: "linear-gradient(180deg,rgba(10,20,40,0.9) 0%,rgba(10,20,40,0.4) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
      }}>
        <button className="nav-item special" onClick={() => navigate("/home")} style={{ borderRadius: "50%" }}>
          <PlanetIcon />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[
            { id: "home",   icon: <HomeIcon />,   path: "/home" },
            { id: "grid",   icon: <GridIcon />,   path: "/ai" },
            { id: "edit",   icon: <EditIcon />,   path: "/create" },
            { id: "search", icon: <SearchIcon />, path: "/search" },
          ].map(item => (
            <button
              key={item.id}
              className={`nav-item${activeNav === item.id ? " active" : ""}`}
              onClick={() => { setActiveNav(item.id); navigate(item.path); }}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <button className="nav-item special" style={{ borderRadius: "50%" }}>
          <UserIcon />
        </button>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div style={{
        flex: 1, overflowY: "auto",
        position: "relative", zIndex: 10,
      }}>

        {/* ── PROFILE HERO ── */}
        <div style={{
          position: "relative",
          padding: "28px 24px 0",
          display: "flex", flexDirection: "column", alignItems: "center",
          overflow: "hidden",
        }}>
          {/* Nebula bg */}
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "80%", height: "100%",
            background: "radial-gradient(ellipse, rgba(50,80,160,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Dashed orbit arc */}
          <svg style={{
            position: "absolute", top: 0, left: 0, right: 0,
            width: "100%", height: 120, pointerEvents: "none", opacity: 0.2,
          }} viewBox="0 0 400 120" preserveAspectRatio="none">
            <path d="M -20 100 Q 200 -20 420 100"
              fill="none" stroke="rgba(255,255,255,0.5)"
              strokeWidth="1" strokeDasharray="5 8"
              style={{ animation: "dashFloat 16s linear infinite" }}
            />
          </svg>

          {/* Avatar */}
          <div style={{
            position: "relative",
            animation: "fadeUp 0.5s 0.1s both ease",
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg,#2a4a8a,#4a6aaa,#7a9acc)",
              border: "2px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, color: "rgba(255,255,255,0.8)",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              animation: "avatarPulse 4s ease-in-out infinite",
              position: "relative", overflow: "hidden",
            }}>
              <span style={{ textTransform: "uppercase", letterSpacing: 0 }}>
                {user.name.charAt(0)}
              </span>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(160deg,rgba(255,255,255,0.15) 0%,transparent 55%)",
              }} />
            </div>
            {/* Edit avatar button */}
            <button
              style={{
                position: "absolute", bottom: 0, right: 0,
                width: 24, height: 24, borderRadius: "50%",
                background: "rgba(20,40,80,0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", padding: 0,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(50,80,160,0.95)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(20,40,80,0.95)"}
            >
              <CameraIcon />
            </button>
          </div>

          {/* Name + handle */}
          <div style={{
            marginTop: 12, textAlign: "center",
            animation: "fadeUp 0.5s 0.18s both ease",
          }}>
            <div style={{
              fontSize: 18, fontWeight: 700,
              fontFamily: "'Orbitron', sans-serif",
              color: "white", letterSpacing: "0.08em",
            }}>
              {user.name}
            </div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.35)",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "0.1em", marginTop: 2,
            }}>
              {user.handle} · joined {user.joined}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{
            display: "flex", gap: 0,
            marginTop: 20, marginBottom: 24,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14, overflow: "hidden",
            width: "100%", maxWidth: 320,
            animation: "fadeUp 0.5s 0.25s both ease",
          }}>
            {[
              { val: user.photos,   label: "photos" },
              { val: user.albums,   label: "albums" },
              { val: user.collages, label: "collages" },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, padding: "14px 8px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div style={{
                  fontSize: 18, fontWeight: 700,
                  fontFamily: "'Orbitron', sans-serif",
                  color: "rgba(255,255,255,0.88)",
                  letterSpacing: "0.04em",
                }}>
                  {stat.val}
                </div>
                <div style={{
                  fontSize: 9, color: "rgba(255,255,255,0.3)",
                  fontFamily: "'Exo 2', sans-serif",
                  letterSpacing: "0.14em", marginTop: 3,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SETTINGS LIST ── */}
        <div style={{
          padding: "0 16px 32px",
          display: "flex", flexDirection: "column", gap: 2,
          maxWidth: 520, margin: "0 auto",
          width: "100%",
        }}>

          {/* Account */}
          <Section title="account" delay={0.2} />
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, overflow: "hidden",
            marginBottom: 10,
          }}>
            <Row icon={<UserIcon />}    label="edit profile"     sub="name, bio, avatar"     onClick={() => {}} delay={0.22} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<LockIcon />}    label="change password"  sub="last changed 14 days ago" onClick={() => {}} delay={0.26} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<StorageIcon />} label="storage"          sub="2.1 gb of 5 gb used"   right="42%"         onClick={() => {}} delay={0.30} />
          </div>

          {/* Preferences */}
          <Section title="preferences" delay={0.33} />
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, overflow: "hidden",
            marginBottom: 10,
          }}>
            <Row icon={<BellIcon />}    label="notifications"    toggle toggleVal={notifications} onToggle={setNotifications} delay={0.35} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<StorageIcon />} label="auto backup"      sub="backup new photos automatically" toggle toggleVal={autoBackup} onToggle={setAutoBackup} delay={0.38} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<PaletteIcon />} label="appearance"       sub="dark mode · space theme" onClick={() => {}} delay={0.41} right="space" />
          </div>

          {/* Privacy & Legal */}
          <Section title="privacy & legal" delay={0.44} />
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, overflow: "hidden",
            marginBottom: 10,
          }}>
            <Row icon={<ShieldIcon />}   label="privacy policy"    onClick={() => {}} delay={0.46} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<FileTextIcon />} label="terms & conditions" onClick={() => {}} delay={0.49} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<LockIcon />}     label="data & permissions" sub="manage what we access" onClick={() => {}} delay={0.52} />
          </div>

          {/* Support */}
          <Section title="support" delay={0.54} />
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, overflow: "hidden",
            marginBottom: 10,
          }}>
            <Row icon={<HelpIcon />} label="help & feedback" onClick={() => {}} delay={0.56} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
            <Row icon={<InfoIcon />} label="about andrmeda"  sub="v1.0.0 · build 2026.03" onClick={() => {}} delay={0.59} />
          </div>

          {/* Logout */}
          <div style={{
            background: "rgba(180,40,40,0.06)",
            border: "1px solid rgba(180,40,40,0.14)",
            borderRadius: 14, overflow: "hidden",
            animation: "fadeUp 0.4s 0.62s both ease",
          }}>
            <Row
              icon={<LogoutIcon />}
              label="log out"
              danger
              onClick={() => setShowLogoutConfirm(true)}
            />
          </div>

          {/* Version tag */}
          <div style={{
            textAlign: "center", marginTop: 20,
            fontSize: 9, color: "rgba(255,255,255,0.15)",
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "0.2em",
            animation: "fadeUp 0.4s 0.65s both ease",
          }}>
            andrmeda · space for memories
          </div>
        </div>
      </div>

      {/* ── LOGOUT CONFIRM MODAL ── */}
      {showLogoutConfirm && (
        <div
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #0d1b2e, #0a1828)",
              border: "1px solid rgba(180,40,40,0.25)",
              borderRadius: 18, padding: "28px 28px 22px",
              width: "min(320px, 88vw)",
              animation: "fadeUp 0.3s ease both",
              textAlign: "center",
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(180,40,40,0.15)",
              border: "1px solid rgba(200,60,60,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
              color: "rgba(255,100,100,0.8)",
            }}>
              <LogoutIcon />
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700,
              fontFamily: "'Orbitron', sans-serif",
              color: "white", letterSpacing: "0.06em",
              marginBottom: 8,
            }}>
              log out?
            </div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.4)",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "0.06em", lineHeight: 1.6,
              marginBottom: 22,
            }}>
              you'll need to sign in again<br />to access your memories
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1, padding: "10px 0",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10, color: "rgba(255,255,255,0.6)",
                  fontSize: 11, letterSpacing: "0.1em",
                  fontFamily: "'Exo 2', sans-serif",
                  cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              >
                cancel
              </button>
              <button
                onClick={() => navigate("/")}
                style={{
                  flex: 1, padding: "10px 0",
                  background: "rgba(180,40,40,0.25)",
                  border: "1px solid rgba(200,60,60,0.35)",
                  borderRadius: 10, color: "rgba(255,120,120,0.95)",
                  fontSize: 11, letterSpacing: "0.1em",
                  fontFamily: "'Exo 2', sans-serif",
                  cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(180,40,40,0.4)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(180,40,40,0.25)"}
              >
                log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
