import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Star field ──────────────────────────────────────────────────────────────
const StarField = ({ count = 140 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.15,
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

// ── Nav Icons ────────────────────────────────────────────────────────────────
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
const PlaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

// ── New Album Icon ────────────────────────────────────────────────────────────
const NewAlbumIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <path d="M3 9h18"/>
    <path d="M12 13v4M10 15h4"/>
    <path d="M7 5V3M17 5V3"/>
  </svg>
);

// ── New Collage Icon ──────────────────────────────────────────────────────────
const NewCollageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="3" width="8" height="8" rx="1"/>
    <rect x="13" y="3" width="8" height="8" rx="1"/>
    <rect x="3" y="13" width="8" height="8" rx="1"/>
    <rect x="13" y="13" width="8" height="8" rx="1"/>
    <path d="M17 16v4M15 18h4"/>
  </svg>
);

// ── Sample photo data ─────────────────────────────────────────────────────────
const ALBUMS = [
  { id: 1, bg: "linear-gradient(135deg,#2a2a2a,#4a4040,#6a5a50)", label: "friends", count: 24 },
  { id: 2, bg: "linear-gradient(135deg,#1a2a1a,#3a4a3a,#5a6a50)", label: "food", count: 18 },
  { id: 3, bg: "linear-gradient(135deg,#2a1a2a,#4a3040,#6a5060)", label: "chocolate", count: 18 },
];

const COLLAGES = [
  { id: 4, bg: "linear-gradient(135deg,#1e2a3a,#2a3a4a,#3a4a5a)", label: "friends", count: 6 },
  { id: 5, bg: "linear-gradient(135deg,#2a1e1e,#3a2a2a,#4a3030)", label: "food", count: 4 },
  { id: 6, bg: "linear-gradient(135deg,#1a1e2a,#2a2e3a,#3a3e50)", label: "chocolate", count: 18 },
];

// ── Photo Card ────────────────────────────────────────────────────────────────
const PhotoCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 calc(33.333% - 10px)",
        minWidth: 120,
        aspectRatio: "1 / 1",
        borderRadius: 12,
        background: item.bg,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.5)"
          : "0 4px 16px rgba(0,0,0,0.3)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        animation: `fadeUp 0.5s ${0.1 + index * 0.08}s both ease`,
      }}
    >
      {/* Grainy texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        opacity: 0.4,
        pointerEvents: "none",
      }} />
      {/* Sheen */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />
      {/* Label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 100%)",
        padding: "18px 10px 8px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.08em", fontFamily: "'Exo 2', sans-serif",
        }}>
          {item.label}
        </span>
        {item.count && (
          <span style={{
            fontSize: 10, color: "rgba(255,255,255,0.5)",
            fontFamily: "'Exo 2', sans-serif",
          }}>
            {item.count}◎
          </span>
        )}
      </div>
    </div>
  );
};

// ── Sidebar Action Button ─────────────────────────────────────────────────────
const SidebarBtn = ({ icon, label, delay = 0, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        border: "1px dashed rgba(255,255,255,0.22)",
        borderRadius: 14,
        padding: "16px 14px",
        cursor: "pointer",
        color: "rgba(255,255,255,0.7)",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
        borderColor: hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.22)",
        width: "100%",
        animation: `fadeUp 0.5s ${delay}s both ease`,
      }}
    >
      <span style={{ opacity: hovered ? 1 : 0.7, transition: "opacity 0.2s" }}>
        {icon}
      </span>
      <span style={{
        fontSize: 10, letterSpacing: "0.12em",
        fontFamily: "'Exo 2', sans-serif", fontWeight: 400,
        textTransform: "lowercase",
      }}>
        {label}
      </span>
    </button>
  );
};

// ── Section Label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ text, delay = 0 }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: "4px 14px",
    marginBottom: 12,
    animation: `fadeUp 0.5s ${delay}s both ease`,
  }}>
    <span style={{
      fontSize: 11, color: "rgba(255,255,255,0.6)",
      fontFamily: "'Exo 2', sans-serif",
      letterSpacing: "0.12em",
    }}>
      {text}
    </span>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function Create() {
  const [activeNav, setActiveNav] = useState("edit");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

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
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashSpin {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -300; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        .nav-item {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          cursor: pointer; transition: background 0.2s ease, color 0.2s ease;
          color: rgba(255,255,255,0.45);
          border: none; background: transparent;
        }
        .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.07); }
        .nav-item.active { color: white; background: rgba(255,255,255,0.12); }
        .nav-item.special { color: white; background: rgba(20,40,80,0.8); border: 1px solid rgba(255,255,255,0.15); }
      `}</style>

      <StarField count={160} />

      {/* ── TOP NAV BAR ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px 10px",
        background: "linear-gradient(180deg, rgba(10,20,40,0.9) 0%, rgba(10,20,40,0.4) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.6s ease both" : "none",
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

        <button className="nav-item special" onClick={() => navigate("/")} style={{ borderRadius: "50%" }}>
          <UserIcon />
        </button>
      </div>

      {/* ── BODY ── */}
      <div style={{
        flex: 1, display: "flex", position: "relative", zIndex: 10, overflow: "hidden",
      }}>

        {/* ── SIDEBAR ── */}
        <div style={{
          width: 110, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 10,
          padding: "28px 12px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(10,18,34,0.5)",
          backdropFilter: "blur(8px)",
        }}>
          {/* Plane + date hint */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            marginBottom: 8,
            animation: "fadeUp 0.5s 0s both ease",
          }}>
            <span style={{ color: "rgba(255,255,255,0.4)" }}><PlaneIcon /></span>
          </div>

          <SidebarBtn icon={<NewAlbumIcon />}   label="new album"   delay={0.1}  onClick={() => navigate("/album")} />
          <SidebarBtn icon={<NewCollageIcon />} label="new collage" delay={0.18} onClick={() => navigate("/collage")} />        
          </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "24px 20px 24px 24px",
          position: "relative",
        }}>

          {/* Albums section */}
          <div style={{ marginBottom: 28 }}>
            <SectionLabel text="albums :" delay={0.2} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ALBUMS.map((item, i) => (
                <PhotoCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Collages section */}
          <div>
            <SectionLabel text="collages :" delay={0.35} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {COLLAGES.map((item, i) => (
                <PhotoCard key={item.id} item={item} index={i + 3} />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT DECORATIVE PANEL ── */}
        <div style={{
          width: 52, flexShrink: 0,
          position: "relative",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}>
          {/* Dashed orbit arc SVG */}
          <svg
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              pointerEvents: "none",
            }}
            viewBox="0 0 52 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 52 50 Q -80 300 52 550"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              style={{ animation: "dashSpin 18s linear infinite" }}
            />
            <circle cx="52" cy="200" r="3" fill="rgba(255,255,255,0.25)" />
            <circle cx="10" cy="300" r="2" fill="rgba(255,255,255,0.15)" />
            <circle cx="48" cy="400" r="2.5" fill="rgba(255,255,255,0.2)" />
          </svg>

          {/* Vertical "create X curate" text */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translateX(-50%) translateY(-50%) rotate(90deg)",
            whiteSpace: "nowrap",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.22)",
            fontFamily: "'Orbitron', sans-serif",
            textTransform: "uppercase",
            animation: "fadeUp 0.6s 0.4s both ease",
          }}>
            create&nbsp;&nbsp;✕&nbsp;&nbsp;curate
          </div>
        </div>
      </div>
    </div>
  );
}
