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

// ── Nav icons ────────────────────────────────────────────────────────────────
const PlanetIcon = () => (
  <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="6"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

// ── Sample photo groups ───────────────────────────────────────────────────────
const GROUPS = [
  {
    date: "WED, 6-2-26",
    photos: [
      { id: 1, bg: "linear-gradient(135deg,#5a7a3a,#8ab060,#c9b84c)", wide: true, label: "Meadow" },
      { id: 2, bg: "linear-gradient(135deg,#c8a96e,#e8c87c)", wide: false, label: "Room" },
      { id: 3, bg: "linear-gradient(135deg,#4a6a2a,#6a8a4a,#9ab070)", wide: false, label: "Forest" },
      { id: 4, bg: "linear-gradient(135deg,#c87a8a,#e89aaa)", wide: false, label: "Anime" },
      { id: 5, bg: "linear-gradient(135deg,#d4864a,#e8aa6a,#c86040)", wide: false, label: "Flowers" },
      { id: 6, bg: "linear-gradient(135deg,#3a5068,#6080a0)", wide: false, label: "Sunflower" },
      { id: 7, bg: "linear-gradient(135deg,#7a4060,#9a6080)", wide: false, label: "Sunset" },
    ],
  },
  {
    date: "THURS, 7-2-26",
    photos: [
      { id: 8, bg: "linear-gradient(135deg,#8a6a4a,#b08a6a)", wide: false, label: "Vintage" },
      { id: 9, bg: "linear-gradient(135deg,#604030,#805040)", wide: false, label: "Wood" },
      { id: 10, bg: "linear-gradient(135deg,#2a5a2a,#4a8a4a,#6aaa6a)", wide: false, label: "Forest2" },
      { id: 11, bg: "linear-gradient(135deg,#6a5a3a,#9a8a5a)", wide: false, label: "Brown" },
      { id: 12, bg: "linear-gradient(135deg,#e8e0c0,#f0f0d0)", wide: false, label: "Daisies" },
      { id: 13, bg: "linear-gradient(135deg,#406040,#608060)", wide: true, label: "GreenField" },
    ],
  },
  {
    date: "FRI, 8-2-26",
    photos: [
      { id: 14, bg: "linear-gradient(135deg,#c87840,#d8985a,#e0b070)", wide: false, label: "OrangeFlowers" },
      { id: 15, bg: "linear-gradient(135deg,#8a6090,#6040a0,#9070c0)", wide: false, label: "PinkFlowers" },
      { id: 16, bg: "linear-gradient(135deg,#4060a0,#806080,#c08060)", wide: true, label: "Mountain" },
    ],
  },
];

// ── Photo tile ────────────────────────────────────────────────────────────────
const Photo = ({ photo, size = "sm", photos, index  }) => {
  const navigate = useNavigate();
  const sizes = {
    sm:   { width: 70,  height: 70 },
    md:   { width: 90,  height: 90 },
    wide: { width: 160, height: 140 },
    tall: { width: 80,  height: 110 },
  };


  const dim = sizes[size];
  
  return (
    <div style={{
      width: dim.width, height: dim.height,
      borderRadius: 8,
      background: photo.bg,
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "scale(1.04)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
    onClick={() => navigate("/photo", {
    state: {
    photo: photo,
    photos: photos,   
    index: index,
  }
})}
    >
      {/* Subtle texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
      }} />
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function Home() {
  const [activeNav, setActiveNav] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const navItems = [
    { id: "planet", icon: <PlanetIcon />, special: true },
    { id: "home",   icon: <HomeIcon /> },
    { id: "grid",   icon: <GridIcon /> },
    { id: "edit",   icon: <EditIcon /> },
    { id: "search", icon: <SearchIcon /> },
    { id: "user",   icon: <UserIcon />, special: true },
  ];

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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
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
        .group-section {
          animation: fadeUp 0.5s ease both;
        }
        .scroll-btn {
          position: absolute; right: -16px; top: 50%;
          transform: translateY(-50%);
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: white; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 5;
          transition: background 0.2s;
        }
        .scroll-btn:hover { background: rgba(255,255,255,0.22); }
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
        {/* Planet icon (left) */}
        <button className="nav-item special" onClick={()=>navigate("/")} style={{ borderRadius: "50%" }}>
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
          onClick={() => {
            setActiveNav(item.id);  // update active state
            navigate(item.path);    // navigate to route
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>

        {/* User icon (right) */}
        <button className="nav-item special" onClick={()=>navigate("/")} style={{ borderRadius: "50%" }}>
          <UserIcon />
        </button>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        position: "relative", zIndex: 10,
        padding: "20px 24px 32px",
      }}>
        {GROUPS.map((group, gi) => (
          <div
            key={group.date}
            className="group-section"
            style={{
              marginBottom: 28,
              animationDelay: `${gi * 0.12}s`,
              opacity: loaded ? undefined : 0,
            }}
          >
            {/* Date label with plane icon */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: 12,
            }}>
              {gi === 0 && (
                <span style={{ color: "rgba(255,255,255,0.55)", display: "flex" }}>
                  <PlaneIcon />
                </span>
              )}
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.12em",
                fontFamily: "'Exo 2', sans-serif",
              }}>
                {group.date}
              </span>
            </div>

            {/* Photo row inside dashed border box */}
            <div style={{
              border: "1px dashed rgba(255,255,255,0.18)",
              borderRadius: 10,
              padding: "14px 14px 14px 14px",
              position: "relative",
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "flex-start",
              }}>
                {group.photos.map((photo, pi) => {
                  // First group: first photo is wide
                  if (gi === 0 && pi === 0) return <Photo key={photo.id} photo={photo} size="wide" photos={group.photos} index={pi}/>;
                  // First group: photos 1-2 stacked vertically
                  if (gi === 0 && (pi === 1 || pi === 2)) return <Photo key={photo.id} photo={photo} size="sm" photos={group.photos} index={pi}/>;
                  return <Photo key={photo.id} photo={photo} size="sm" photos={group.photos} index={pi} />;
                })}
              </div>

              {/* Scroll arrow for first group */}
              {gi === 0 && (
                <button className="scroll-btn">›</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
