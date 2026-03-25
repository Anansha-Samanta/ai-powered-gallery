  import { useState, useRef, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import flower1 from "../assets/flower1.png";
  import flower2 from "../assets/flower2.jfif";
  import flower3 from "../assets/flower3.jfif";
  import flower4 from "../assets/flower4.jfif";
  import flower5 from "../assets/flower5.jfif";
  import flower6 from "../assets/flower6.jfif";


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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  );
  const SaveIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/>
      <polyline points="7 3 7 8 15 8"/>
    </svg>
  );
  const CartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );

  // ── Collage slot ──────────────────────────────────────────────────────────────
  const CollageSlot = ({ photo, index, onAdd, onRemove }) => {
    const [hov, setHov] = useState(false);

    const SLOT_BG = [
      "linear-gradient(135deg,#1a1e3a,#2a305a,#4a4080)",
      "linear-gradient(135deg,#2a1e3a,#3a2a50,#6a5a80)",
      "linear-gradient(135deg,#1a2a1e,#243830,#3a5040)",
      "linear-gradient(135deg,#3a2010,#5a3820,#8a6030)",
    ];

    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => !photo && onAdd(index)}
        style={{
          borderRadius: 14,
          background: photo ? photo.bg : "rgba(255,255,255,0.04)",
          border: photo ? "none" : "1px dashed rgba(255,255,255,0.18)",
          position: "relative",
          overflow: "hidden",
          cursor: photo ? "default" : "pointer",
          transform: hov ? "scale(1.02)" : "scale(1)",
          transition: "transform 0.2s ease, border-color 0.2s",
          borderColor: hov && !photo ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)",
          animation: `fadeUp 0.45s ${0.15 + index * 0.07}s both ease`,
          aspectRatio: "1/1",
        }}
      >
        {photo ? (
          <>
            <div style={{
              position: "absolute", inset: 0,
              background: photo.bg,
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 55%)",
            }} />
            {hov && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(index); }}
                style={{
                  position: "absolute", top: 8, right: 8,
                  width: 24, height: 24, borderRadius: "50%",
                  background: "rgba(200,50,50,0.8)",
                  border: "none", color: "white",
                  fontSize: 14, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >×</button>
            )}
          </>
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 6,
          }}>
            <span style={{
              fontSize: 22, color: "rgba(255,255,255,0.2)",
              fontWeight: 200, lineHeight: 1,
            }}>+</span>
          </div>
        )}
      </div>
    );
  };

  // ── Main Component ────────────────────────────────────────────────────────────
  export default function CollageMake() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [titleFocused, setTitleFocused] = useState(false);
    const [slots, setSlots] = useState([null, null, null, null]);

    // Sample gallery photos to "pick from"
    const GALLERY = [
      { id: 1, src: flower1 },
      { id: 2, src: flower2 },
      { id: 3, src: flower3 },
      { id: 4, src: flower4 },
      { id: 5, src: flower5 },
      { id: 6, src: flower6 },
    ];

    const [showGallery, setShowGallery] = useState(false);
    const [activeSlot, setActiveSlot] = useState(null);

    useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

    const handleAddToSlot = (slotIndex) => {
      setActiveSlot(slotIndex);
      setShowGallery(true);
    };

    const handlePickPhoto = (photo) => {
      const newSlots = [...slots];
      newSlots[activeSlot] = photo;
      setSlots(newSlots);
      setShowGallery(false);
      setActiveSlot(null);
    };

    const handleRemove = (index) => {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
    };

    const handleAddFromGallery = () => {
      // Find first empty slot
      const empty = slots.findIndex(s => s === null);
      if (empty !== -1) handleAddToSlot(empty);
      else setShowGallery(true);
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
            to   { stroke-dashoffset: -240; }
          }
          @keyframes gallerySlide {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          ::-webkit-scrollbar { width: 3px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
          .title-input::placeholder { color: rgba(255,255,255,0.25); }
          .title-input:focus { outline: none; }
        `}</style>

        <StarField count={150} />

        {/* ── HEADER TITLE ── */}
        <div style={{
          position: "relative", zIndex: 20,
          padding: "20px 28px 0px",
          animation: loaded ? "fadeUp 0.5s ease both" : "none",
          opacity: loaded ? 1 : 0,
        }}>
          {/* Plane + dashed line */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 6,
          }}>
            <span style={{ color: "rgba(255,255,255,0.5)" }}><PlaneIcon /></span>
            <div style={{
              flex: 1, height: 1,
              borderTop: "1px dashed rgba(255,255,255,0.15)",
            }} />
          </div>

          {/* Editable title */}
          <input
            className="title-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
            placeholder="Add collage title."
            style={{
              background: "transparent",
              border: "none",
              borderBottom: `1px dashed ${titleFocused ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"}`,
              color: "white",
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 700,
              fontFamily: "'Orbitron', monospace",
              letterSpacing: "0.04em",
              width: "min(500px, 70vw)",
              paddingBottom: 6,
              transition: "border-color 0.2s",
              caretColor: "rgba(255,255,255,0.7)",
            }}
          />
        </div>

        {/* ── BODY ── */}
        <div style={{
          flex: 1, display: "flex", position: "relative", zIndex: 10,
          overflow: "hidden", padding: "16px 0 16px",
        }}>

          {/* ── LEFT SIDEBAR ── */}
          <div style={{
            width: 100, flexShrink: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center",
            padding: "24px 12px",
            gap: 24,
            position: "relative",
          }}>
            {/* Gray blob bg */}
            <div style={{
              position: "absolute",
              top: "10%", left: "-30%",
              width: "160%", height: "65%",
              background: "radial-gradient(ellipse, rgba(80,100,140,0.18) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />

            {/* Cancel */}
            <button
              onClick={() => navigate("/create")}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                background: "transparent", border: "none",
                cursor: "pointer", color: "rgba(255,255,255,0.55)",
                transition: "color 0.2s",
                animation: "fadeUp 0.45s 0.1s both ease",
                zIndex: 1,
              }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
            >
              <span style={{ fontSize: 22, lineHeight: 1, fontWeight: 200 }}>✕</span>
              <span style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "'Exo 2', sans-serif" }}>
                cancel
              </span>
            </button>

            {/* Save */}
            <button
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                background: "transparent", border: "none",
                cursor: "pointer", color: "rgba(255,255,255,0.55)",
                transition: "color 0.2s",
                animation: "fadeUp 0.45s 0.18s both ease",
                zIndex: 1,
              }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
            >
              <SaveIcon />
              <span style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "'Exo 2', sans-serif" }}>
                save
              </span>
            </button>
          </div>

          {/* ── COLLAGE GRID ── */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 16px",
            position: "relative",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 10,
              width: "min(420px, 58vw)",
              height: "min(420px, 58vw)",
            }}>
              {slots.map((photo, i) => (
                <CollageSlot
                  key={i}
                  photo={photo}
                  index={i}
                  onAdd={handleAddToSlot}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div style={{
            width: 80, flexShrink: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative", gap: 12,
          }}>
            {/* Dashed orbit SVG */}
            <svg style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              pointerEvents: "none",
            }} viewBox="0 0 80 600" preserveAspectRatio="none">
              <path
                d="M 80 60 Q -60 300 80 540"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1"
                strokeDasharray="5 8"
                style={{ animation: "dashFloat 16s linear infinite" }}
              />
            </svg>

            {/* Add photos from gallery button */}
            <button
              onClick={handleAddFromGallery}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                background: "rgba(20,30,55,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: "14px 10px",
                cursor: "pointer",
                color: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
                transition: "background 0.2s, border-color 0.2s",
                animation: "fadeUp 0.5s 0.25s both ease",
                zIndex: 1,
                width: "calc(100% - 12px)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(40,60,100,0.9)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(20,30,55,0.85)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              <CartIcon />
              <span style={{
                fontSize: 9, letterSpacing: "0.1em", textAlign: "center",
                fontFamily: "'Exo 2', sans-serif", lineHeight: 1.5,
              }}>
                add photos{"\n"}from gallery
              </span>
            </button>

            {/* Vertical "back to create" */}
            <div
              onClick={() => navigate("/create")}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                fontSize: 9,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "'Exo 2', sans-serif",
                cursor: "pointer",
                transition: "color 0.2s",
                userSelect: "none",
                marginTop: 8,
                zIndex: 1,
              }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
            >
              back to create
            </div>

            {/* › Arrow */}
            <button
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "white", fontSize: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.2s",
                zIndex: 1,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            >
              ›
            </button>
          </div>
        </div>

        {/* ── GALLERY PICKER OVERLAY ── */}
        {showGallery && (
          <div
            onClick={() => setShowGallery(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: "linear-gradient(135deg, #0d1b2e, #0a1828)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 18,
                padding: 24,
                width: "min(380px, 88vw)",
                animation: "gallerySlide 0.3s ease both",
              }}
            >
              <div style={{
                fontSize: 11, letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Exo 2', sans-serif",
                marginBottom: 16,
              }}>
                pick from gallery
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
              }}>
                {GALLERY.map(photo => (
                  <div
                    key={photo.id}
                    onClick={() => handlePickPhoto(photo)}
                    style={{
                      aspectRatio: "1/1", borderRadius: 10,
                      background: `url(${photo.src}) center/cover no-repeat`, cursor: "pointer",
                      transition: "transform 0.18s, box-shadow 0.18s",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.06)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setShowGallery(false)}
                style={{
                  marginTop: 16, width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8, padding: "8px 0",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 11, letterSpacing: "0.1em",
                  fontFamily: "'Exo 2', sans-serif",
                  cursor: "pointer",
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
