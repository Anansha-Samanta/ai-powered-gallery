import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchgrid8 from "../assets/searchgrid8.jfif";
import searchgrid9 from "../assets/searchgrid9.jfif";
import searchgrid2 from "../assets/searchgrid2.jfif";
import searchgrid7 from "../assets/searchgrid7.jfif";
import flower1 from "../assets/flower1.jfif";
import flower6 from "../assets/flower6.jfif";
import home1 from "../assets/home1.jfif";

import searchgrid3 from "../assets/searchgrid3.jfif";
import searchgrid1 from "../assets/searchgrid1.jfif";
import searchgrid5 from "../assets/searchgrid5.jfif";
import searchgrid4 from "../assets/searchgrid4.jfif";
import flower3 from "../assets/flower3.jfif";
import flower4 from "../assets/flower4.jfif";

import searchgrid6 from "../assets/searchgrid6.jfif";
import flower2 from "../assets/flower2.jfif";
import flower5 from "../assets/flower5.jfif";

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

// ── Nav icons (ONLY CHANGE: removed width & height) ─────────────────────────
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

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

const GROUPS = [
  {
    date: "WED, 6-2-26",
    photos: [
      { id: 1, src: flower1, wide: true, label: "flower" },
      { id: 2, src: home1, wide: false, label: "ocean" },
      { id: 3, src: searchgrid2, wide: false, label: "Candle" },
      { id: 4, src: searchgrid8, wide: false, label: "starfish" },
      { id: 5, src: searchgrid9, wide: false, label: "sunset" },
      { id: 6, src: searchgrid7, wide: false, label: "fish" },
      { id: 7, src: flower6, wide: false, label: "meadow" },
    ],
  },
  {
    date: "THURS, 7-2-26",
    photos: [
      { id: 8, src: searchgrid3, wide: true, label: "balloons" },
      { id: 9, src: searchgrid1, wide: false, label: "ocean" },
      { id: 10, src: searchgrid5, wide: false, label: "aesthetic" },
      { id: 11, src: searchgrid4, wide: false, label: "candle" },
      { id: 12, src: flower3, wide: false, label: "flower" },
      { id: 13, src: flower4, wide: false, label: "flower" },
    ],
  },
  {
    date: "FRI, 8-2-26",
    photos: [
      { id: 14, src: searchgrid6, wide: false, label: "bug" },
      { id: 15, src: flower2, wide: false, label: "flower" },
      { id: 16, src: flower5, wide: true, label: "flower" },
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

        <img
        src={photo.src}
        alt="flower"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />


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
          width: 56px; height: 56px; border-radius: 50%;
          cursor: pointer; transition: background 0.2s ease, color 0.2s ease;
          color: rgba(255,255,255,0.45);
          border: none; background: transparent;
        }
          .nav-item svg {
  width: 32px;
  height: 32px;
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
        <button className="nav-item special" onClick={()=>navigate("/profile")} style={{ borderRadius: "50%" }}>
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
