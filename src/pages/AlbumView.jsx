import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import decor1 from "../assets/decor1.jfif";
import decor2 from "../assets/decor2.jfif";
import decor3 from "../assets/decor3.jfif";
import decor4 from "../assets/decor4.jfif";
import decor5 from "../assets/decor5.jfif";
import decor6 from "../assets/decor6.jfif";
import decor7 from "../assets/decor7.jfif";
import decor8 from "../assets/decor8.jfif";
import decor9 from "../assets/decor9.jfif";
import decor10 from "../assets/decor7.jfif";
import decor11 from "../assets/decor8.jfif";
import decor12 from "../assets/decor9.jfif";


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

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
  </svg>
);
const GridViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const ListViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="4" rx="1"/>
    <rect x="3" y="10" width="18" height="4" rx="1"/>
    <rect x="3" y="16" width="18" height="4" rx="1"/>
  </svg>
);

// ── Fallback photos if none passed ────────────────────────────────────────────
const FALLBACK_PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  bg: [
    decor1, decor2, decor3, decor4, decor5, decor6, decor12, decor7, decor8, decor9, decor10, decor11,
  ][i % 12],
  label: `photo_${String(i + 1).padStart(2, "0")}`,
}));

// ── Photo tile ────────────────────────────────────────────────────────────────
const PhotoTile = ({ photo, index, onClick, viewMode }) => {
  const [hov, setHov] = useState(false);

  if (viewMode === "list") {
    return (
      <div
        onClick={() => onClick(photo, index)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "10px 14px",
          borderRadius: 10,
          background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          cursor: "pointer",
          transition: "background 0.2s",
          animation: `fadeUp 0.4s ${0.05 + index * 0.04}s both ease`,
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 8,
          backgroundImage: `url(${photo.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center", flexShrink: 0,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg,rgba(255,255,255,0.1) 0%,transparent 55%)",
          }} />
        </div>
        <span style={{
          fontSize: 12, color: "rgba(255,255,255,0.65)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.08em",
          flex: 1,
        }}>
          {photo.label}
        </span>
        <span style={{
          fontSize: 10, color: "rgba(255,255,255,0.25)",
          fontFamily: "'Exo 2', sans-serif",
        }}>
          ›
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(photo, index)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        aspectRatio: "1/1",
        borderRadius: 10,
        backgroundImage: `url(${photo.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", overflow: "hidden",
        cursor: "pointer",
        transform: hov ? "scale(1.04)" : "scale(1)",
        boxShadow: hov ? "0 10px 28px rgba(0,0,0,0.5)" : "0 3px 12px rgba(0,0,0,0.3)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        animation: `fadeUp 0.4s ${0.05 + index * 0.04}s both ease`,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg,rgba(255,255,255,0.09) 0%,transparent 55%)",
      }} />
      {hov && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>⊕</span>
        </div>
      )}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "14px 8px 6px",
        background: "linear-gradient(0deg,rgba(0,0,0,0.6) 0%,transparent 100%)",
      }}>
        <span style={{
          fontSize: 9, color: "rgba(255,255,255,0.6)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.08em",
        }}>
          {photo.label}
        </span>
      </div>
    </div>
  );
};

// ── Sidebar action button ─────────────────────────────────────────────────────
const SideBtn = ({ icon, label, onClick, danger = false, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        background: hov
          ? danger ? "rgba(220,60,60,0.15)" : "rgba(255,255,255,0.08)"
          : "transparent",
        border: "none", borderRadius: 10, padding: "10px 8px",
        cursor: "pointer",
        color: hov
          ? danger ? "rgba(255,100,100,0.95)" : "rgba(255,255,255,0.95)"
          : danger ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.45)",
        transition: "background 0.2s, color 0.2s",
        width: "100%",
        animation: `fadeUp 0.4s ${delay}s both ease`,
      }}
    >
      {icon}
      <span style={{
        fontSize: 9, letterSpacing: "0.1em",
        fontFamily: "'Exo 2', sans-serif",
      }}>
        {label}
      </span>
    </button>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function AlbumView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [cols, setCols] = useState(3);

  const album = location.state?.album || {
    label: "decor",
    bg: "linear-gradient(135deg,#2a2a2a,#4a4040,#6a5a50)",
    count: 12,
  };
  const photos = location.state?.photos || FALLBACK_PHOTOS;

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const handlePhotoClick = (photo, index) => {
    navigate("/photo", {
      state: { photo, photos, index },
    });
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
          0%   { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.85; transform: scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashFloat {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -220; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      <StarField count={160} />

      {/* ── TOP HEADER ── */}
      <div style={{
        position: "relative", zIndex: 20,
        padding: "16px 24px 12px",
        background: "linear-gradient(180deg,rgba(10,20,40,0.9) 0%,rgba(10,20,40,0.3) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
      }}>
        {/* Back pill */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20, padding: "6px 14px",
            color: "rgba(255,255,255,0.55)", cursor: "pointer",
            fontSize: 11, letterSpacing: "0.12em",
            fontFamily: "'Exo 2', sans-serif",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.11)";
            e.currentTarget.style.color = "rgba(255,255,255,0.9)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}><PlaneIcon /></span>
          back
        </button>

        {/* Album title + count */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif",
            color: "white", letterSpacing: "0.1em",
            textTransform: "lowercase",
          }}>
            {album.label}
          </span>
          <span style={{
            fontSize: 10, color: "rgba(255,255,255,0.35)",
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.15em",
          }}>
            {photos.length} photos
          </span>
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { mode: "grid", icon: <GridViewIcon /> },
            { mode: "list", icon: <ListViewIcon /> },
          ].map(({ mode, icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: viewMode === mode ? "rgba(255,255,255,0.12)" : "transparent",
                border: "1px solid",
                borderColor: viewMode === mode ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)",
                color: viewMode === mode ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{
        flex: 1, display: "flex", position: "relative", zIndex: 10, overflow: "hidden",
      }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          width: 72, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "20px 8px",
          gap: 4,
          borderRight: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(8,16,30,0.55)",
          backdropFilter: "blur(10px)",
        }}>
          {/* Album cover swatch */}
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: album.bg,
            marginBottom: 14, flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.1)",
            animation: "fadeUp 0.4s 0.05s both ease",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg,rgba(255,255,255,0.12) 0%,transparent 55%)",
            }} />
          </div>

          <SideBtn icon={<EditIcon />}  label="edit"  delay={0.1} />
          <SideBtn icon={<ShareIcon />} label="share" delay={0.16} />
          <div style={{ flex: 1 }} />
          <SideBtn icon={<TrashIcon />} label="trash" danger delay={0.22} />
        </div>

        {/* ── PHOTO GRID / LIST ── */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "20px 20px 28px",
          position: "relative",
        }}>

          {/* Grid cols control (only in grid mode) */}
          {viewMode === "grid" && (
            <div style={{
              display: "flex", gap: 6, marginBottom: 16,
              animation: "fadeUp 0.4s 0.1s both ease",
            }}>
              {[2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setCols(n)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 12,
                    background: cols === n ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                    border: "1px solid",
                    borderColor: cols === n ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                    color: cols === n ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                    fontSize: 10, letterSpacing: "0.1em",
                    fontFamily: "'Exo 2', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                >
                  {n}×
                </button>
              ))}
            </div>
          )}

          {viewMode === "grid" ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 8,
            }}>
              {photos.map((photo, i) => (
                <PhotoTile
                  key={photo.id}
                  photo={photo}
                  index={i}
                  onClick={handlePhotoClick}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {photos.map((photo, i) => (
                <PhotoTile
                  key={photo.id}
                  photo={photo}
                  index={i}
                  onClick={handlePhotoClick}
                  viewMode="list"
                />
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT DECO PANEL ── */}
        <div style={{
          width: 44, flexShrink: 0,
          position: "relative",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}>
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none",
          }} viewBox="0 0 44 600" preserveAspectRatio="none">
            <path
              d="M 44 60 Q -40 300 44 540"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{ animation: "dashFloat 18s linear infinite" }}
            />
            <circle cx="8" cy="200" r="2" fill="rgba(255,255,255,0.15)" />
            <circle cx="40" cy="320" r="1.5" fill="rgba(255,255,255,0.1)" />
            <circle cx="12" cy="440" r="2" fill="rgba(255,255,255,0.12)" />
          </svg>

          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translateX(-50%) translateY(-50%) rotate(90deg)",
            whiteSpace: "nowrap",
            fontSize: 8, fontWeight: 600,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.15)",
            fontFamily: "'Orbitron', sans-serif",
            textTransform: "uppercase",
          }}>
            {album.label}&nbsp;&nbsp;✕&nbsp;&nbsp;album
          </div>
        </div>
      </div>
    </div>
  );
}
