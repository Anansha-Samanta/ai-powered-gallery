import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import food1 from "../assets/food1.jfif";
import food2 from "../assets/food2.jfif";
import food3 from "../assets/food3.jfif";
import food4 from "../assets/food4.jfif";


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

const PlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
  </svg>
);
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
  </svg>
);
const ZoomInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
  </svg>
);
const ZoomOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.35-4.35M8 11h6"/>
  </svg>
);

const FALLBACK_COLLAGE = {
  label: "food",
  slots: [
    { src: food1 },
    { src: food2 },
    { src: food3 },
    { src: food4 },
  ],
};

const SideBtn = ({ icon, label, onClick, danger = false, delay = 0, active = false }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        background: hov
          ? danger ? "rgba(220,60,60,0.15)" : active ? "rgba(100,160,255,0.12)" : "rgba(255,255,255,0.08)"
          : active ? "rgba(100,160,255,0.07)" : "transparent",
        border: "none", borderRadius: 10, padding: "10px 8px",
        cursor: "pointer",
        color: hov
          ? danger ? "rgba(255,100,100,0.95)" : "rgba(255,255,255,0.95)"
          : danger ? "rgba(255,100,100,0.5)" : active ? "rgba(140,190,255,0.9)" : "rgba(255,255,255,0.45)",
        transition: "background 0.2s, color 0.2s",
        width: "100%",
        animation: `fadeUp 0.4s ${delay}s both ease`,
      }}
    >
      {icon}
      <span style={{ fontSize: 9, letterSpacing: "0.1em", fontFamily: "'Exo 2', sans-serif" }}>
        {label}
      </span>
    </button>
  );
};

const CollageCell = ({ slot, index, zoomed }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}  
      style={{
        borderRadius: zoomed ? 10 : 12,
        backgroundImage: `url(${slot.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: slot ? "none" : "1px dashed rgba(255,255,255,0.15)",
        position: "relative", overflow: "hidden",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-radius 0.3s",
        transform: hov && slot ? "scale(1.025)" : "scale(1)",
        boxShadow: hov && slot ? "0 10px 30px rgba(0,0,0,0.45)" : "0 2px 10px rgba(0,0,0,0.25)",
        animation: `cellReveal 0.55s ${0.15 + index * 0.09}s both cubic-bezier(0.23,1,0.32,1)`,
      }}
    >
      {slot && (
        <>
          <div style={{ position: "absolute", inset: 0, background: slot.bg }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg,rgba(255,255,255,0.1) 0%,transparent 55%)",
          }} />
          {/* Grain */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
            opacity: 0.5, pointerEvents: "none",
          }} />
        </>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function CollageView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const collage = location.state?.collage || FALLBACK_COLLAGE;
  // slots: array of up to 4 { bg } objects, nulls for empty
  const slots = collage.slots || [null, null, null, null];
  // pad to 4
  const paddedSlots = [...slots, ...Array(4)].slice(0, 4);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  // Layout variants based on how many real slots
  const filledCount = paddedSlots.filter(Boolean).length;

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
        @keyframes cellReveal {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes dashFloat {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -220; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      <StarField count={160} />

      {/* ── TOP HEADER ── */}
      <div style={{
        position: "relative", zIndex: 20,
        padding: "14px 24px 10px",
        background: "linear-gradient(180deg,rgba(10,20,40,0.9) 0%,rgba(10,20,40,0.3) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
      }}>
        {/* Back */}
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

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif",
            color: "white", letterSpacing: "0.1em",
            textTransform: "lowercase",
          }}>
            {collage.label}
          </span>
          <span style={{
            fontSize: 10, color: "rgba(255,255,255,0.3)",
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.18em",
          }}>
            collage · {filledCount} photos
          </span>
        </div>

        {/* Info toggle */}
        <button
          onClick={() => setShowInfo(s => !s)}
          style={{
            width: 34, height: 34, borderRadius: "50%",
            background: showInfo ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: showInfo ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
            fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          i
        </button>
      </div>

      {/* ── INFO STRIP (collapsible) ── */}
      {showInfo && (
        <div style={{
          position: "relative", zIndex: 18,
          padding: "10px 24px",
          background: "rgba(10,20,40,0.7)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", gap: 24,
          animation: "slideDown 0.25s ease both",
        }}>
          {[
            { label: "created", value: "7 feb 2026" },
            { label: "photos", value: filledCount },
            { label: "layout", value: "2 × 2" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{
                fontSize: 9, color: "rgba(255,255,255,0.3)",
                fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}>{item.label}</span>
              <span style={{
                fontSize: 12, color: "rgba(255,255,255,0.75)",
                fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em",
              }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

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
          <SideBtn icon={<ShareIcon />}   label="share"    delay={0.1} />
          <SideBtn icon={<EditIcon />}    label="edit"     delay={0.16}
            onClick={() => navigate("/collage", { state: { collage } })} />
          <SideBtn
            icon={zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
            label={zoomed ? "fit" : "zoom"}
            delay={0.22}
            onClick={() => setZoomed(z => !z)}
            active={zoomed}
          />
          <SideBtn icon={<DownloadIcon />} label="save"   delay={0.28} />
          <div style={{ flex: 1 }} />
          <SideBtn icon={<TrashIcon />}   label="trash"   delay={0.34} danger />
        </div>

        {/* ── COLLAGE DISPLAY ── */}
        <div style={{
          flex: 1, display: "flex",
          alignItems: "center", justifyContent: "center",
          padding: "24px 16px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Outer glow behind collage */}
          <div style={{
            position: "absolute",
            width: "50%", height: "60%",
            background: "radial-gradient(ellipse, rgba(60,100,200,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Collage frame */}
          <div style={{
            position: "relative",
            transform: zoomed ? "scale(1.15)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            transformOrigin: "center center",
          }}>
            {/* Polaroid-style outer frame */}
            <div style={{
              background: "rgba(14,24,44,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 18,
              padding: 14,
              backdropFilter: "blur(10px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)",
              animation: loaded ? "fadeUp 0.6s 0.2s both ease" : "none",
              opacity: loaded ? undefined : 0,
            }}>

              {/* 2×2 collage grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 8,
                width: "min(360px, 52vw)",
                height: "min(360px, 52vw)",
              }}>
                {paddedSlots.map((slot, i) => (
                  <CollageCell key={i} slot={slot} index={i} zoomed={zoomed} />
                ))}
              </div>

              {/* Bottom label strip */}
              <div style={{
                marginTop: 12,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 4px",
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  fontFamily: "'Orbitron', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.14em",
                  textTransform: "lowercase",
                }}>
                  {collage.label}
                </span>
                <span style={{
                  fontSize: 9, color: "rgba(255,255,255,0.2)",
                  fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
                }}>
                  @andrmeda
                </span>
              </div>
            </div>

            {/* Corner orbit foodation */}
            <svg style={{
              position: "absolute", top: -24, right: -24,
              width: 80, height: 80, pointerEvents: "none", opacity: 0.35,
            }} viewBox="0 0 80 80">
              <circle cx="60" cy="20" r="6" fill="rgba(80,140,255,0.7)" />
              <circle cx="60" cy="20" r="3" fill="rgba(160,200,255,0.9)" />
              <path d="M 60 20 Q 20 20 20 60"
                fill="none" stroke="rgba(255,255,255,0.3)"
                strokeWidth="1" strokeDasharray="4 6" />
            </svg>
          </div>
        </div>

        {/* ── RIGHT DECO PANEL ── */}
        <div style={{
          width: 44, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          overflow: "hidden",
          gap: 14,
        }}>
          {/* Arc */}
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
          </svg>

          {/* Vertical label */}
          <div style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: 8, fontWeight: 600,
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.14)",
            fontFamily: "'Orbitron', sans-serif",
            textTransform: "uppercase",
            userSelect: "none",
            zIndex: 1,
          }}>
            {collage.label}&nbsp;&nbsp;✕&nbsp;&nbsp;collage
          </div>

          {/* › arrow */}
          <button
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "white", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
