import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

// ── Sidebar Icons ─────────────────────────────────────────────────────────────
const ShareIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
  </svg>
);
const EditIcon2 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ZoomIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.35-4.35"/>
    <path d="M11 8v6M8 11h6"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
  </svg>
);
const AlbumAddIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <path d="M3 9h18M12 13v4M10 15h4"/>
  </svg>
);
const PlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

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
          ? danger ? "rgba(220,60,60,0.15)" : "rgba(255,255,255,0.1)"
          : "transparent",
        border: "none", borderRadius: 10, padding: "10px 8px",
        cursor: "pointer",
        color: hov
          ? danger ? "rgba(255,100,100,0.95)" : "rgba(255,255,255,0.95)"
          : danger ? "rgba(255,100,100,0.55)" : "rgba(255,255,255,0.5)",
        transition: "background 0.2s, color 0.2s",
        width: "100%",
        animation: `fadeUp 0.45s ${delay}s both ease`,
      }}
    >
      {icon}
      <span style={{
        fontSize: 9.5, letterSpacing: "0.1em",
        fontFamily: "'Exo 2', sans-serif", fontWeight: 400,
      }}>
        {label}
      </span>
    </button>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function SinglePic() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // photo passed via router state, or fallback
  const photo = location.state?.photo || {
    bg: "linear-gradient(135deg,#c87a8a,#e89aaa)",
    label: "Anime",
    id: 4,
  };
  // All photos in the group for prev/next, passed via state
  const photos = location.state?.photos || [photo];
  const currentIndex = location.state?.index ?? 0;

  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);

  const goNext = () => {
    const next = currentIndex + 1;
    if (next < photos.length) {
      navigate("/photo", {
        state: { photo: photos[next], photos, index: next },
        replace: true,
      });
    }
  };

  const goPrev = () => {
    const prev = currentIndex - 1;
    if (prev >= 0) {
      navigate("/photo", {
        state: { photo: photos[prev], photos, index: prev },
        replace: true,
      });
    }
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
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashFloat {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -200; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <StarField count={160} />

      {/* ── TOP DECO BAR ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px 10px",
        background: "linear-gradient(180deg, rgba(10,20,40,0.88) 0%, rgba(10,20,40,0.3) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
        opacity: loaded ? 1 : 0,
      }}>
        {/* Back button */}
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
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "rgba(255,255,255,0.9)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}><PlaneIcon /></span>
          back to gallery
        </button>

        {/* Dashed orbit arc top-right */}
        <svg width="200" height="40" viewBox="0 0 200 40" style={{ overflow: "visible", opacity: 0.35 }}>
          <path
            d="M 0 35 Q 100 -10 200 35"
            fill="none" stroke="rgba(255,255,255,0.6)"
            strokeWidth="1" strokeDasharray="5 7"
            style={{ animation: "dashFloat 14s linear infinite" }}
          />
          <circle cx="155" cy="12" r="8" fill="rgba(80,120,200,0.7)" />
          <circle cx="155" cy="12" r="4" fill="rgba(140,180,255,0.9)" />
        </svg>
      </div>

      {/* ── MAIN BODY ── */}
      <div style={{
        flex: 1, display: "flex", position: "relative", zIndex: 10, overflow: "hidden",
      }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          width: 82, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "28px 8px 20px",
          gap: 4,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(8,16,30,0.6)",
          backdropFilter: "blur(10px)",
        }}>
          <SideBtn icon={<ShareIcon />}   label="share"  delay={0.1} />
          <SideBtn icon={<EditIcon2 />} label="edit" delay={0.16} onClick={() => { navigate("/editphoto", { state: { photo } }); }} />
<SideBtn icon={<ZoomIcon />}    label="zoom"   delay={0.22} onClick={() => setZoomed(z => !z)} />
          <div style={{ flex: 1 }} />
          <SideBtn icon={<TrashIcon />}   label="trash"  delay={0.28} danger />
          <SideBtn icon={<AlbumAddIcon />} label="album" delay={0.34} />
        </div>

        {/* ── PHOTO AREA ── */}
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", padding: "28px 0",
          overflow: "hidden",
        }}>

          {/* Photo frame */}
          <div style={{
            position: "relative",
            animation: loaded ? "slideIn 0.55s 0.15s both ease" : "none",
            opacity: loaded ? undefined : 0,
          }}>
            {/* Outer glow */}
            <div style={{
              position: "absolute", inset: -12,
              borderRadius: 20,
              background: "radial-gradient(ellipse, rgba(100,150,255,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* White card frame */}
            <div style={{
              background: "#e8e4d8",
              borderRadius: 14,
              padding: "14px 14px 40px 14px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
              position: "relative",
              transform: zoomed ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)",
              maxWidth: "min(460px, 70vw)",
            }}>
              {/* Watermark */}
              <div style={{
                position: "absolute", top: 22, right: 22,
                fontSize: 10, color: "rgba(180,80,80,0.7)",
                fontFamily: "'Exo 2', sans-serif",
                letterSpacing: "0.06em", zIndex: 3,
                pointerEvents: "none",
              }}>
                @andrmeda
              </div>

              {/* The photo itself */}
              <div style={{
                width: "min(400px, 60vw)",
                aspectRatio: "3 / 4",
                borderRadius: 8,
                background: photo.bg,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* If real image URL provided */}
                {photo.src && (
                  <img
                    src={photo.src}
                    alt={photo.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                  />
                )}
                {/* Sheen */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 55%)",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Photo label under image */}
              <div style={{
                marginTop: 8,
                textAlign: "center",
                fontSize: 11,
                color: "rgba(30,30,30,0.5)",
                fontFamily: "'Exo 2', sans-serif",
                letterSpacing: "0.1em",
              }}>
                {photo.label}
              </div>
            </div>

            {/* Prev arrow */}
            {currentIndex > 0 && (
              <button
                onClick={goPrev}
                style={{
                  position: "absolute", left: -22, top: "50%",
                  transform: "translateY(-50%)",
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "white", fontSize: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", backdropFilter: "blur(6px)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                ‹
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          width: 44, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 0,
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          position: "relative", overflow: "hidden",
        }}>

          {/* SVG orbit arc */}
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none",
          }} viewBox="0 0 44 600" preserveAspectRatio="none">
            <path
              d="M 44 80 Q -40 300 44 520"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{ animation: "dashFloat 16s linear infinite" }}
            />
          </svg>

          {/* Vertical "back to gallery" text */}
          <div style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: 9,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 400,
            textTransform: "lowercase",
            cursor: "pointer",
            transition: "color 0.2s",
            userSelect: "none",
            marginBottom: 16,
          }}
          onClick={() => navigate(-1)}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
          >
            back to gallery
          </div>

          {/* Next arrow */}
          {currentIndex < photos.length - 1 && (
            <button
              onClick={goNext}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white", fontSize: 17,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.2s",
                marginTop: 12,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
