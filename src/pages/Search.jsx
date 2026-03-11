import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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

// ── Nav Icons ───────────────────────────────────────────────────────────────
const PlanetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="6"/><ellipse cx="12" cy="12" rx="11" ry="4.5"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SearchIconSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ── Photo data with CSS gradients mimicking photo themes ────────────────────
const FLOWER_PHOTOS = [
  { id: 1,  bg: "linear-gradient(160deg,#5a7a3a 0%,#8ab060 40%,#c9b84c 100%)", size: "wide" },
  { id: 2,  bg: "linear-gradient(160deg,#3a4a2a 0%,#5a6a3a 50%,#8a9a5a 100%)", size: "sm" },
  { id: 3,  bg: "linear-gradient(160deg,#c87840 0%,#d8985a 50%,#e0b070 100%)", size: "sm" },
  { id: 4,  bg: "linear-gradient(160deg,#e8e0c0 0%,#f0ead8 50%,#d8d0b0 100%)", size: "sm" },
  { id: 5,  bg: "linear-gradient(160deg,#8a6a4a 0%,#b0906a 50%,#c8a880 100%)", size: "sm" },
  { id: 6,  bg: "linear-gradient(160deg,#d4704a 0%,#e89060 50%,#c06040 100%)", size: "sm" },
];

const SUGGESTIONS = ["flowers", "sunset", "anime", "forest", "galaxy", "portrait", "mountains", "ocean"];

// ── Photo tile ──────────────────────────────────────────────────────────────
const PhotoTile = ({ photo, onClick }) => {
  const isWide = photo.size === "wide";
  return (
    <div
      onClick={() => onClick && onClick(photo)}
      style={{
        width: isWide ? 160 : 90,
        height: 110,
        borderRadius: 10,
        background: photo.bg,
        flexShrink: 0,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
      }} />
    </div>
  );
};

// ── Empty state ─────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", flex: 1, gap: 14,
    color: "rgba(255,255,255,0.2)",
    animation: "fadeUp 0.5s ease both",
  }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
    </svg>
    <p style={{
      fontSize: 13, fontFamily: "'Exo 2', sans-serif",
      letterSpacing: "0.05em", margin: 0,
    }}>Search for photos in your gallery</p>
  </div>
);

// ── Main Search Page ────────────────────────────────────────────────────────
export default function SearchPage() {
  const [activeNav, setActiveNav] = useState("search");
  const [query, setQuery] = useState("flower");
  const [results, setResults] = useState(FLOWER_PHOTOS);
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const handleSearch = (q) => {
    const trimmed = (q ?? query).trim().toLowerCase();
    setQuery(trimmed);
    if (!trimmed) { setResults([]); return; }
    // Simulate filtering with colour-themed results
    const palettes = {
      flower:   ["#5a7a3a,#8ab060,#c9b84c", "#3a4a2a,#5a6a3a,#8a9a5a", "#c87840,#d8985a,#e0b070", "#e8e0c0,#f0ead8,#d8d0b0", "#8a6a4a,#b0906a,#c8a880", "#d4704a,#e89060,#c06040"],
      sunset:   ["#ff6b35,#ff8c42,#c06030", "#8b4513,#ff6b35,#ffb347", "#3a5068,#ff6b35,#8b3a13", "#c86040,#e08050,#a04020", "#d4864a,#e8aa6a,#b07040", "#8a3020,#c05030,#e07050"],
      anime:    ["#c87a8a,#e89aaa,#f0b0c0", "#7a4060,#9a6080,#b080a0", "#9a70b0,#b090d0,#d0b0e0", "#8060a0,#a080c0,#c0a0e0", "#6a4080,#8a60a0,#aa80c0", "#504070,#706090,#9080b0"],
      forest:   ["#2a5a2a,#4a8a4a,#6aaa6a", "#1a4a1a,#3a7a3a,#5aaa5a", "#405a30,#608050,#809070", "#304820,#506840,#708860", "#3a6030,#5a8050,#7aa070", "#284018,#486038,#688058"],
      galaxy:   ["#0a0a2a,#1a1a4a,#2a2a6a", "#0a102a,#1a2050,#2a3070", "#101840,#202860,#303880", "#0d1535,#1d2555,#2d3575", "#0a0f28,#1a1f48,#2a2f68", "#08102a,#18204a,#28306a"],
      default:  ["#4a6a8a,#6a8aaa,#8aaaca", "#3a5a7a,#5a7a9a,#7a9aba", "#2a4a6a,#4a6a8a,#6a8aaa", "#506070,#708090,#90a0b0", "#405060,#607080,#8090a0", "#304050,#506070,#708090"],
    };
    const key = Object.keys(palettes).find(k => trimmed.includes(k)) || "default";
    const chosen = palettes[key];
    const sizes = ["wide", "sm", "sm", "sm", "sm", "sm"];
    setResults(chosen.map((bg, i) => ({
      id: i + 1,
      bg: `linear-gradient(160deg,#${bg.split(",")[0]?.trim() || "444"} 0%,#${bg.split(",")[1]?.trim() || "666"} 50%,#${bg.split(",")[2]?.trim() || "888"} 100%)`,
      size: sizes[i],
    })));
  };

  const handleClear = () => { setQuery(""); setResults([]); inputRef.current?.focus(); };

  const handleSuggestion = (s) => {
    setQuery(s);
    handleSearch(s);
  };

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 55%, #060e1a 100%)",
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
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        ::-webkit-scrollbar { height: 3px; width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        .nav-btn {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 50%;
          cursor: pointer; border: none; background: transparent;
          color: rgba(255,255,255,0.45);
          transition: background 0.2s, color 0.2s;
        }
        .nav-btn:hover  { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); }
        .nav-btn.active { background: rgba(255,255,255,0.13); color: white; }
        .nav-btn.special {
          background: rgba(15,30,60,0.85);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
        }
        .search-input {
          flex: 1; border: none; background: transparent;
          color: rgba(255,255,255,0.9);
          font-size: 15px; font-family: 'Exo 2', sans-serif;
          font-weight: 400; outline: none; padding: 0 4px;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .chip {
          padding: 5px 14px; border-radius: 20px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.55);
          font-size: 12px; font-family: 'Exo 2', sans-serif;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .chip:hover {
          background: rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.9);
          border-color: rgba(255,255,255,0.25);
        }
        .chip.active {
          background: rgba(80,130,220,0.2);
          border-color: rgba(80,130,220,0.4);
          color: white;
        }
      `}</style>

      <StarField count={160} />

      {/* Nebula glow */}
      <div style={{
        position: "absolute", top: "30%", left: "20%",
        width: "60%", height: "50%",
        background: "radial-gradient(ellipse, rgba(30,60,140,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── TOP NAV ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px 10px",
        background: "linear-gradient(180deg, rgba(8,16,32,0.92) 0%, rgba(8,16,32,0.5) 100%)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
      }}>
        <button className="nav-btn special"><PlanetIcon /></button>
        <div style={{ display: "flex", gap: 4 }}>
          {[
{ id: "home",   icon: <HomeIcon />,   path: "/home" },
        { id: "grid",   icon: <GridIcon />,   path: "/ai" },
        { id: "edit",   icon: <EditIcon />,   path: "" },
        { id: "search", icon: <SearchIconSVG />, path: "/search" },
          ].map(n => (
            <button key={n.id}
              className={`nav-btn${activeNav === n.id ? " active" : ""}`}
              onClick={() => {setActiveNav(n.id); navigate(n.path);}}
            >{n.icon}</button>
          ))}
        </div>
        <button className="nav-btn special"><UserIcon /></button>
      </div>

      {/* ── SEARCH SECTION ── */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "18px 20px 0",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s 0.1s both ease" : "none",
      }}>
        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.08)",
          border: `1px solid ${focused ? "rgba(100,160,255,0.45)" : "rgba(255,255,255,0.14)"}`,
          borderRadius: 30,
          padding: "10px 14px",
          transition: "border-color 0.25s, background 0.25s",
          backdropFilter: "blur(10px)",
        }}>
          <span style={{ color: "rgba(255,255,255,0.4)", display: "flex", flexShrink: 0 }}>
            <SearchIconSVG />
          </span>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search photos…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          {query && (
            <button
              onClick={handleClear}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "none", borderRadius: "50%",
                width: 22, height: 22,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "rgba(255,255,255,0.6)",
                flexShrink: 0, transition: "background 0.2s",
              }}
            ><XIcon /></button>
          )}
        </div>

        {/* Suggestion chips */}
        <div style={{
          display: "flex", gap: 8, overflowX: "auto",
          padding: "12px 0 4px",
          scrollbarWidth: "none",
        }}>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              className={`chip${query.toLowerCase() === s ? " active" : ""}`}
              onClick={() => handleSuggestion(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div style={{
        flex: 1, position: "relative", zIndex: 10,
        padding: "16px 20px 24px",
        overflowY: "auto", overflowX: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {results.length > 0 ? (
          <>
            {/* Results count */}
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.3)",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "0.08em", marginBottom: 14,
              animation: "fadeUp 0.3s ease both",
            }}>
              {results.length} results for &nbsp;
              <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>"{query}"</span>
            </div>

            {/* Photo row — horizontal scroll */}
            <div style={{
              display: "flex", gap: 10, overflowX: "auto",
              paddingBottom: 8,
              animation: "slideIn 0.4s ease both",
            }}>
              {results.map((photo, i) => (
                <div key={photo.id} style={{ animation: `fadeUp 0.35s ${i * 0.05}s both ease` }}>
                  <PhotoTile photo={photo} />
                </div>
              ))}
            </div>

            {/* Grid view below */}
            <div style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              animation: "fadeUp 0.5s 0.15s both ease",
            }}>
              {[...results, ...results].slice(0, 9).map((photo, i) => (
                <div key={`g-${i}`} style={{
                  height: 90, borderRadius: 8,
                  background: photo.bg,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.07)",
                  position: "relative", overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.45)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                >
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                  }} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
