import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteCollage, updateCollage } from "../api/collageApi";
import { fetchMyImages } from "../api/albumApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
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
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const SwapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
  </svg>
);

// ── Sidebar button ────────────────────────────────────────────────────────────
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
          ? danger ? "rgba(220,60,60,0.15)" : active ? "rgba(100,160,255,0.18)" : "rgba(255,255,255,0.08)"
          : active ? "rgba(100,160,255,0.1)" : "transparent",
        border: active ? "1px solid rgba(100,160,255,0.25)" : "none",
        borderRadius: 10, padding: "10px 8px",
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

// ── Collage cell ──────────────────────────────────────────────────────────────
const CollageCell = ({ slot, index, zoomed, editMode, onRemove, onSwap }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: zoomed ? 10 : 12,
        backgroundImage: slot?.src ? `url(${slot.src})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: slot?.src
          ? editMode ? "2px solid rgba(220,80,80,0.4)" : "none"
          : "1px dashed rgba(255,255,255,0.15)",
        position: "relative", overflow: "hidden",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-radius 0.3s",
        transform: hov && slot?.src && !editMode ? "scale(1.025)" : "scale(1)",
        boxShadow: hov && slot?.src && !editMode
          ? "0 10px 30px rgba(0,0,0,0.45)"
          : "0 2px 10px rgba(0,0,0,0.25)",
        animation: `cellReveal 0.55s ${0.15 + index * 0.09}s both cubic-bezier(0.23,1,0.32,1)`,
      }}
    >
      {slot?.src && (
        <>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg,rgba(255,255,255,0.1) 0%,transparent 55%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
            opacity: 0.5, pointerEvents: "none",
          }} />
        </>
      )}

      {/* Edit mode overlay */}
      {editMode && slot?.src && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.12)",
          display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
          padding: 6, gap: 5,
        }}>
          <button
            onClick={() => onSwap(index)}
            style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "rgba(80,140,255,0.88)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
            title="swap photo"
          >
            <SwapIcon />
          </button>
          <button
            onClick={() => onRemove(index)}
            style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "rgba(200,40,40,0.92)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
            title="remove photo"
          >
            <XIcon />
          </button>
        </div>
      )}

      {/* Edit mode: empty slot */}
      {editMode && !slot?.src && (
        <div
          onClick={() => onSwap(index)}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 6,
            cursor: "pointer", background: "rgba(100,160,255,0.05)",
            border: "1.5px dashed rgba(100,160,255,0.3)",
            borderRadius: 12,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(100,160,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(100,160,255,0.05)"}
        >
          <span style={{ fontSize: 20, color: "rgba(140,190,255,0.5)", fontWeight: 200 }}>+</span>
          <span style={{
            fontSize: 8, color: "rgba(140,190,255,0.4)",
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.12em",
          }}>add photo</span>
        </div>
      )}
    </div>
  );
};

// ── Image picker modal ────────────────────────────────────────────────────────
const ImagePickerModal = ({ onClose, onPick, currentSrc }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyImages()
      .then(imgs => setImages(imgs.map(img => ({ id: img._id, src: img.imageUrl, label: img.title || img.aiCaption || "photo" }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 360, maxHeight: "78vh",
          background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16, padding: "22px 18px",
          display: "flex", flexDirection: "column", gap: 14,
          animation: "fadeUp 0.25s ease both",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{
          fontSize: 12, fontWeight: 700,
          fontFamily: "'Orbitron', sans-serif",
          color: "white", letterSpacing: "0.12em",
          textTransform: "lowercase",
        }}>
          pick a photo
        </div>

        <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
          {loading ? (
            <div style={{
              padding: "28px 0", textAlign: "center",
              color: "rgba(255,255,255,0.25)", fontSize: 11,
              fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.15em",
            }}>loading…</div>
          ) : images.length === 0 ? (
            <div style={{
              padding: "28px 0", textAlign: "center",
              color: "rgba(255,255,255,0.25)", fontSize: 11,
              fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.15em",
            }}>no photos found</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {images.map(img => {
                const isCurrent = img.src === currentSrc;
                return (
                  <div
                    key={img.id}
                    onClick={() => !isCurrent && onPick(img.src)}
                    style={{
                      aspectRatio: "1/1", borderRadius: 8,
                      backgroundImage: `url(${img.src})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      cursor: isCurrent ? "default" : "pointer",
                      position: "relative", overflow: "hidden",
                      outline: isCurrent ? "2px solid rgba(100,180,255,0.7)" : "2px solid transparent",
                      opacity: isCurrent ? 0.55 : 1,
                      transition: "outline 0.15s, opacity 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {isCurrent && (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(60,130,220,0.25)",
                      }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%",
                          background: "rgba(100,180,255,0.9)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white",
                        }}>
                          <CheckIcon />
                        </div>
                      </div>
                    )}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "8px 5px 3px",
                      background: "linear-gradient(0deg,rgba(0,0,0,0.6) 0%,transparent 100%)",
                    }}>
                      <span style={{
                        fontSize: 7, color: "rgba(255,255,255,0.5)",
                        fontFamily: "'Exo 2', sans-serif",
                        display: "block", overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{img.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            padding: "8px 0", borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)", cursor: "pointer",
            fontSize: 11, fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
            flexShrink: 0,
          }}
        >cancel</button>
      </div>
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
  const [editMode, setEditMode] = useState(false);
  const [slots, setSlots] = useState([]);
  const [saving, setSaving] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const collage = location.state?.collage;
  const collageId = collage?._id;

  useEffect(() => {
    const photos = collage?.photos || collage?.slots?.map(s => s?.src) || [];
    const filled = photos.map(src => (src ? { src } : null));
    const padded = [...filled, null, null, null, null].slice(0, 4);
    setSlots(padded);
  }, []);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const filledCount = slots.filter(s => s?.src).length;

  const handleRemove = (index) => {
    setSlots(prev => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleSwap = (index) => {
    setActiveSlot(index);
    setShowPicker(true);
  };

  const handlePick = (src) => {
    setSlots(prev => {
      const next = [...prev];
      next[activeSlot] = { src };
      return next;
    });
    setShowPicker(false);
    setActiveSlot(null);
  };

  const handleSave = async () => {
    if (!collageId) { setEditMode(false); return; }
    setSaving(true);
    try {
      const photos = slots.map(s => s?.src || null).filter(Boolean);
      await updateCollage(collageId, { photos, title: collage.label || collage.title });
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    const photos = collage?.photos || collage?.slots?.map(s => s?.src) || [];
    const filled = photos.map(src => (src ? { src } : null));
    setSlots([...filled, null, null, null, null].slice(0, 4));
    setEditMode(false);
  };

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: editMode
        ? "linear-gradient(160deg, #1a0d0e 0%, #120a0b 50%, #080508 100%)"
        : "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Exo 2', 'Orbitron', sans-serif",
      position: "relative", overflow: "hidden",
      transition: "background 0.4s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;500;600&display=swap');
        @keyframes twinkle { 0% { opacity: 0.1; transform: scale(0.8); } 100% { opacity: 0.85; transform: scale(1.3); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cellReveal { from { opacity: 0; transform: scale(0.88) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes dashFloat { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -220; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      <StarField count={160} />

      {showPicker && (
        <ImagePickerModal
          onClose={() => { setShowPicker(false); setActiveSlot(null); }}
          onPick={handlePick}
          currentSrc={slots[activeSlot]?.src}
        />
      )}

      {/* ── TOP HEADER ── */}
      <div style={{
        position: "relative", zIndex: 20,
        padding: "14px 24px 10px",
        background: editMode
          ? "linear-gradient(180deg,rgba(35,10,12,0.92) 0%,rgba(20,8,10,0.3) 100%)"
          : "linear-gradient(180deg,rgba(10,20,40,0.9) 0%,rgba(10,20,40,0.3) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${editMode ? "rgba(220,80,80,0.18)" : "rgba(255,255,255,0.06)"}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}>
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
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.11)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}><PlaneIcon /></span>
          back
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif",
            color: "white", letterSpacing: "0.1em",
            textTransform: "lowercase",
          }}>
            {collage?.label || collage?.title || "collage"}
          </span>
          <span style={{
            fontSize: 10, letterSpacing: "0.18em",
            fontFamily: "'Exo 2', sans-serif",
            color: editMode ? "rgba(255,140,140,0.6)" : "rgba(255,255,255,0.3)",
            transition: "color 0.3s",
          }}>
            {editMode ? "✎ editing mode" : `collage · ${filledCount} photos`}
          </span>
        </div>

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
        >i</button>
      </div>

      {/* ── INFO STRIP ── */}
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
            { label: "photos", value: filledCount },
            { label: "layout", value: "2 × 2" },
            { label: "status", value: editMode ? "editing" : "view" },
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
      <div style={{ flex: 1, display: "flex", position: "relative", zIndex: 10, overflow: "hidden" }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          width: 72, flexShrink: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", padding: "20px 8px", gap: 4,
          borderRight: `1px solid ${editMode ? "rgba(220,80,80,0.12)" : "rgba(255,255,255,0.05)"}`,
          background: editMode ? "rgba(22,8,9,0.6)" : "rgba(8,16,30,0.55)",
          backdropFilter: "blur(10px)",
          transition: "background 0.4s, border-color 0.4s",
        }}>
          {!editMode ? (
            <SideBtn icon={<EditIcon />} label="edit" delay={0.16} onClick={() => setEditMode(true)} />
          ) : (
            <>
              <SideBtn
                icon={saving ? <span style={{ fontSize: 11 }}>…</span> : <CheckIcon />}
                label={saving ? "saving" : "done"}
                active delay={0}
                onClick={handleSave}
              />
              <SideBtn icon={<XIcon />} label="cancel" delay={0.06} onClick={handleCancelEdit} />
            </>
          )}

          {!editMode && (
            <SideBtn
              icon={zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
              label={zoomed ? "fit" : "zoom"}
              delay={0.22}
              onClick={() => setZoomed(z => !z)}
              active={zoomed}
            />
          )}

          <div style={{ flex: 1 }} />

          <SideBtn
            icon={<TrashIcon />}
            label="trash"
            delay={0.34}
            danger
            onClick={async () => {
              if (!collageId) return;
              if (!window.confirm("Delete this collage?")) return;
              try {
                await deleteCollage(collageId);
                navigate("/create");
              } catch (err) {
                alert(err.message);
              }
            }}
          />
        </div>

        {/* ── COLLAGE DISPLAY ── */}
        <div style={{
          flex: 1, display: "flex",
          alignItems: "center", justifyContent: "center",
          padding: "24px 16px",
          position: "relative", overflow: "hidden",
          flexDirection: "column", gap: 12,
        }}>
          {editMode && (
            <div style={{
              padding: "8px 16px",
              background: "rgba(220,60,60,0.08)",
              border: "1px solid rgba(220,80,80,0.2)",
              borderRadius: 10,
              display: "flex", alignItems: "center", gap: 10,
              animation: "fadeUp 0.2s ease both",
            }}>
              <span style={{
                fontSize: 10, color: "rgba(255,140,140,0.7)",
                fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.12em",
              }}>
                tap <span style={{ color: "rgba(100,160,255,0.8)" }}>↕</span> to swap · tap <span style={{ color: "rgba(255,100,100,0.8)" }}>✕</span> to remove
              </span>
            </div>
          )}

          <div style={{
            position: "absolute",
            width: "50%", height: "60%",
            background: editMode
              ? "radial-gradient(ellipse, rgba(200,60,60,0.05) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(60,100,200,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            transition: "background 0.4s",
          }} />

          <div style={{
            position: "relative",
            transform: zoomed && !editMode ? "scale(1.15)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            transformOrigin: "center center",
          }}>
            <div style={{
              background: editMode ? "rgba(25,12,14,0.88)" : "rgba(14,24,44,0.85)",
              border: `1px solid ${editMode ? "rgba(220,80,80,0.2)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 18, padding: 14,
              backdropFilter: "blur(10px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)",
              animation: loaded ? "fadeUp 0.6s 0.2s both ease" : "none",
              opacity: loaded ? undefined : 0,
              transition: "background 0.4s, border-color 0.4s",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 8,
                width: "min(360px, 52vw)",
                height: "min(360px, 52vw)",
              }}>
                {slots.map((slot, i) => (
                  <CollageCell
                    key={i} slot={slot} index={i}
                    zoomed={zoomed} editMode={editMode}
                    onRemove={handleRemove} onSwap={handleSwap}
                  />
                ))}
              </div>

              <div style={{
                marginTop: 12,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 4px",
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  fontFamily: "'Orbitron', sans-serif",
                  color: editMode ? "rgba(255,140,140,0.45)" : "rgba(255,255,255,0.5)",
                  letterSpacing: "0.14em", textTransform: "lowercase",
                  transition: "color 0.3s",
                }}>
                  {collage?.label || collage?.title || "collage"}
                </span>
                <span style={{
                  fontSize: 9, color: "rgba(255,255,255,0.2)",
                  fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
                }}>
                  @andrmeda
                </span>
              </div>
            </div>

            <svg style={{
              position: "absolute", top: -24, right: -24,
              width: 80, height: 80, pointerEvents: "none",
              opacity: editMode ? 0.15 : 0.35,
              transition: "opacity 0.3s",
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
          overflow: "hidden", gap: 14,
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
          </svg>
          <div style={{
            writingMode: "vertical-rl", textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: 8, fontWeight: 600,
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.14)",
            fontFamily: "'Orbitron', sans-serif",
            textTransform: "uppercase",
            userSelect: "none", zIndex: 1,
          }}>
            {collage?.label || collage?.title || "collage"}&nbsp;&nbsp;✕&nbsp;&nbsp;collage
          </div>
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
          >›</button>
        </div>
      </div>
    </div>
  );
}
