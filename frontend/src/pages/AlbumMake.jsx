import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyImages, createAlbum } from "../api/albumApi";

import searchgrid1 from "../assets/searchgrid1.jfif";
import searchgrid2 from "../assets/searchgrid2.jfif";
import searchgrid3 from "../assets/searchgrid3.jfif";
import searchgrid4 from "../assets/searchgrid4.jfif";
import searchgrid5 from "../assets/searchgrid5.jfif";
import searchgrid6 from "../assets/searchgrid6.jfif";
import searchgrid7 from "../assets/searchgrid7.jfif";
import searchgrid8 from "../assets/searchgrid8.jfif";

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

// ── Pill dot ─────────────────────────────────────────────────────────────────
const Dot = ({ filled = false }) => (
  <div style={{
    width: filled ? 10 : 8,
    height: filled ? 10 : 8,
    borderRadius: "50%",
    background: filled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
    border: filled ? "none" : "1px solid rgba(255,255,255,0.3)",
    transition: "all 0.2s",
  }} />
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function AlbumMake() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [titleFocused, setTitleFocused] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [dropHov, setDropHov] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [saving, setSaving] = useState(false);

const GALLERY = [
  { id: 1, src: searchgrid1 },
  { id: 2, src: searchgrid2 },
  { id: 3, src: searchgrid3 },
  { id: 4, src: searchgrid4 },
  { id: 5, src: searchgrid5 },
  { id: 6, src: searchgrid6 },
  { id: 7, src: searchgrid7 },
  { id: 8, src: searchgrid8 },
];

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
  if (!showGallery) return;
  fetchMyImages()
    .then(imgs => setGallery(
      imgs.map(img => ({ id: img._id, src: img.imageUrl }))
    ))
    .catch(console.error);
}, [showGallery]);

const handleSave = async () => {
  if (!title.trim() && photos.length === 0) return;
  setSaving(true);
  try {
    const album = await createAlbum({
      title,
      imageIds: photos.map(p => p.id)
    });
    console.log("Created album:", album); // 🔥 add this
    navigate("/create");  // go back to create page where albums list is
  } catch (err) {
    console.error("Save failed:", err);   // 🔥 check this in console
    alert("Failed to save album: " + err.message);
  } finally {
    setSaving(false);
  }
};

  const handlePickPhoto = (photo) => {
    if (!photos.find(p => p.id === photo.id)) {
      setPhotos(prev => [...prev, photo]);
    }
    setShowGallery(false);
  };

  const handleRemovePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
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
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.03); opacity: 1; }
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

        <input
          className="title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          placeholder="Add album title."
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
          {/* Gray blob */}
          <div style={{
            position: "absolute",
            top: "5%", left: "-30%",
            width: "160%", height: "70%",
            background: "radial-gradient(ellipse, rgba(70,90,130,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }} />

          {/* Dots decorations */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 6,
            alignItems: "center", marginBottom: -8,
            animation: "fadeUp 0.45s 0.05s both ease",
            zIndex: 1,
          }}>
            <Dot filled />
            <Dot />
          </div>

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

          {/* Dot */}
          <div style={{ zIndex: 1 }}><Dot /></div>

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
            onClick={handleSave}
          >
            <SaveIcon />
            <span style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "'Exo 2', sans-serif" }}>
              save
            </span>
          </button>
        </div>

        {/* ── MAIN CONTENT AREA ── */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 16px", position: "relative",
        }}>

          {photos.length === 0 ? (
            // Empty state — big drop circle
            <div
              onMouseEnter={() => setDropHov(true)}
              onMouseLeave={() => setDropHov(false)}
              onClick={() => setShowGallery(true)}
              style={{
                width: "min(280px, 50vw)",
                height: "min(280px, 50vw)",
                borderRadius: "50%",
                background: dropHov
                  ? "rgba(40,60,100,0.55)"
                  : "rgba(20,35,65,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.25s, transform 0.25s",
                transform: dropHov ? "scale(1.03)" : "scale(1)",
                animation: "fadeUp 0.5s 0.2s both ease",
              }}
            >
              <span style={{
                fontSize: 13, letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Exo 2', sans-serif",
                textAlign: "center", lineHeight: 1.8,
              }}>
                add photos<br />from gallery
              </span>
              <span style={{
                marginTop: 14, fontSize: 28,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 100, lineHeight: 1,
                animation: "pulse 2.5s ease-in-out infinite",
              }}>+</span>
            </div>
          ) : (
            // Photos added — show grid + add more
            <div style={{
              width: "min(500px, 72vw)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}>
                {photos.map((photo, i) => (
                  <div
                    key={photo.id}
                    style={{
                      aspectRatio: "1/1", borderRadius: 10,
                      backgroundImage: `url(${photo.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center", position: "relative",
                      overflow: "hidden", cursor: "pointer",
                      animation: `fadeUp 0.4s ${i * 0.06}s both ease`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelector(".remove-btn").style.opacity = "1";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.querySelector(".remove-btn").style.opacity = "0";
                    }}
                  >
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(160deg,rgba(255,255,255,0.08) 0%,transparent 55%)",
                    }} />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemovePhoto(photo.id)}
                      style={{
                        position: "absolute", top: 5, right: 5,
                        width: 20, height: 20, borderRadius: "50%",
                        background: "rgba(180,40,40,0.85)",
                        border: "none", color: "white",
                        fontSize: 12, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0, transition: "opacity 0.2s",
                      }}
                    >×</button>
                  </div>
                ))}

                {/* Add more slot */}
                <div
                  onClick={() => setShowGallery(true)}
                  style={{
                    aspectRatio: "1/1", borderRadius: 10,
                    border: "1px dashed rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <span style={{ fontSize: 20, color: "rgba(255,255,255,0.25)", fontWeight: 200 }}>+</span>
                </div>
              </div>

              <div style={{
                fontSize: 10, color: "rgba(255,255,255,0.3)",
                fontFamily: "'Exo 2', sans-serif",
                letterSpacing: "0.12em", textAlign: "center",
              }}>
                {photos.length} photo{photos.length !== 1 ? "s" : ""} added
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          width: 52, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative", gap: 12,
        }}>
          {/* Dashed arc */}
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none",
          }} viewBox="0 0 52 600" preserveAspectRatio="none">
            <path
              d="M 52 60 Q -50 300 52 540"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              strokeDasharray="5 8"
              style={{ animation: "dashFloat 18s linear infinite" }}
            />
          </svg>

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
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "white", fontSize: 17,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
              zIndex: 1, marginTop: 8,
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
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(7px)",
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
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
            }}>
<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
  {gallery.length === 0 ? (
    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, gridColumn: "span 4" }}>
      loading...
    </span>
  ) : (
    gallery.map(photo => (
      <div
        key={photo.id}
        onClick={() => handlePickPhoto(photo)}
        style={{
          aspectRatio: "1/1", borderRadius: 10,
          backgroundImage: `url(${photo.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center", cursor: "pointer",
          transition: "transform 0.18s, box-shadow 0.18s",
          border: photos.find(p => p.id === photo.id)
            ? "2px solid rgba(100,180,255,0.6)"
            : "1px solid rgba(255,255,255,0.08)",
          opacity: photos.find(p => p.id === photo.id) ? 0.5 : 1,
        }}
        onMouseEnter={e => {
          if (!photos.find(p => p.id === photo.id)) {
            e.currentTarget.style.transform = "scale(1.07)";
          }
        }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      />
    ))
  )}
</div>
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
              done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
