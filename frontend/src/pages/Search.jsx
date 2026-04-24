import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import flower1 from "../assets/flower1.jfif";
import flower2 from "../assets/flower2.jfif";
import flower3 from "../assets/flower3.jfif";
import flower4 from "../assets/flower4.jfif";
import flower5 from "../assets/flower5.jfif";
import flower6 from "../assets/flower6.jfif";
import searchgrid1 from "../assets/searchgrid1.jfif";
import searchgrid2 from "../assets/searchgrid2.jfif";
import searchgrid3 from "../assets/searchgrid3.jfif";
import searchgrid4 from "../assets/searchgrid4.jfif";
import searchgrid5 from "../assets/searchgrid5.jfif";
import searchgrid6 from "../assets/searchgrid6.jfif";
import searchgrid7 from "../assets/searchgrid7.jfif";
import searchgrid8 from "../assets/searchgrid8.jfif";
import searchgrid9 from "../assets/searchgrid9.jfif";
import home1 from "../assets/home1.jfif";
import home2 from "../assets/home2.jfif";


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

// ── Nav Icons (UPDATED ONLY HERE) ───────────────────────────────────────────
const PlanetIcon = () => (
  <svg className="planet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

const SearchIconSVG = () => (
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

// ❌ DO NOT CHANGE
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FLOWER_PHOTOS = [
  { id: 1, src: flower6, size: "wide" },
  { id: 2,  src: flower1, size: "sm" },
  { id: 3,  src: flower2, size: "sm" },
  { id: 4,  src: flower3, size: "sm" },
  { id: 5,  src: flower4, size: "sm" },
  { id: 6,  src: flower5, size: "sm" },
];

const GRID_PHOTOS = [
  { id: 1, src: searchgrid1 },
  { id: 2, src: searchgrid2 },
  { id: 3, src: searchgrid3 },
  { id: 4, src: searchgrid4 },
  { id: 5, src: searchgrid5 },
  { id: 6, src: searchgrid6 },
  { id: 7, src: searchgrid7 },
  { id: 8, src: searchgrid8 },
  { id: 9, src: searchgrid9 },
];

const SUGGESTIONS = ["flowers", "sunset", "forest", "ocean"];

const PhotoTile = ({ photo, onClick }) => {
  const isWide = photo.size === "wide";
  return (
    <div
      onClick={() => onClick && onClick(photo)}
      style={{
        width: isWide ? 160 : 90,
        height: 110,
        borderRadius: 10,
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
            <img
        src={photo.src}
        alt="flower"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
      }} />
    </div>
  );
};


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


export default function SearchPage() {
  const [activeNav, setActiveNav] = useState("search");
  const [query, setQuery] = useState("flower");
  const [results, setResults] = useState(FLOWER_PHOTOS);
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);


const handleSearch = async (q) => {
  const trimmed = (q ?? query).trim();
  setQuery(trimmed);
  if (!trimmed) { setResults([]); return; }

  setLoading(true);
  try {
    const userId = localStorage.getItem("userId");
    const res = await fetch(
      `http://localhost:5000/api/images/search?userId=${userId}&q=${encodeURIComponent(trimmed)}`
    );
    const data = await res.json();

    // Map backend images to the shape PhotoTile expects
    const mapped = data.map((img, i) => ({
      id: img._id,
      src: img.imageUrl,
      size: i === 0 ? "wide" : "sm",
      label: img.title || img.aiCaption || "photo",
    }));

    setResults(mapped);
  } catch (err) {
    console.error("Search failed:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
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
          width: 56px; height: 56px; border-radius: 50%;
          cursor: pointer; border: none; background: transparent;
          color: rgba(255,255,255,0.45);
          transition: background 0.2s, color 0.2s;
        }
          .nav-btn svg {
  width: 32px;
  height: 32px;
}
  .planet-icon {
  width: 36px;
  height: 36px;
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

      <div style={{
        position: "absolute", top: "30%", left: "20%",
        width: "60%", height: "50%",
        background: "radial-gradient(ellipse, rgba(30,60,140,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

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
        <button className="nav-btn special" onClick={() => navigate("/home")} style={{ borderRadius: "50%" }}>
          <PlanetIcon />
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {[
{ id: "home",   icon: <HomeIcon />,   path: "/home" },
        { id: "grid",   icon: <GridIcon />,   path: "/ai" },
        { id: "edit",   icon: <EditIcon />,   path: "/create" },
        { id: "search", icon: <SearchIconSVG />, path: "/search" },
          ].map(n => (
            <button key={n.id}
              className={`nav-btn${activeNav === n.id ? " active" : ""}`}
              onClick={() => {setActiveNav(n.id); navigate(n.path);}}
            >{n.icon}</button>
          ))}
        </div>
        <button className="nav-btn special" onClick={() => navigate("/profile")} style={{ borderRadius: "50%" }}>
          <UserIcon />
        </button>
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
  flex: 1,
  position: "relative",
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  padding: "16px 20px 0",
}}>
  {results.length > 0 ? (
    <>
      {/* FIXED (non-scroll) content */}
      <div>
        <div style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.08em",
          marginBottom: 14,
        }}>
          {results.length} results for{" "}
          <span style={{ color: "rgba(255,255,255,0.6)" }}>
            "{query}"
          </span>
        </div>

        <div style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 8,
        }}>
          {results.map((photo) => (
            <PhotoTile key={photo.id} photo={photo} />
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 20,
        overflowY: "scroll",
        paddingBottom: 20,
        minHeight: 0,
        flex: 1,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 8,
        }}>
          {GRID_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              style={{
                aspectRatio: "0.5/0.5",
                borderRadius: 8,
                backgroundImage: `url(${photo.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  ) : (
    <EmptyState />
  )}
</div>
    </div>
  );
}
