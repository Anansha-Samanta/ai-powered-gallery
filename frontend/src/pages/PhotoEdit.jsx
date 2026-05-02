import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StarField = ({ count = 100 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
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
const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);
const ResetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);
const CropIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);
const TextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
);
const StickerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

// ── Adjustment slider ─────────────────────────────────────────────────────────
const AdjSlider = ({ label, value, onChange, min = 0, max = 200, default: def = 100, delay = 0 }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{
      animation: `fadeUp 0.4s ${delay}s both ease`,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 6,
      }}>
        <span style={{
          fontSize: 10, color: "rgba(255,255,255,0.5)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.12em",
        }}>
          {label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontSize: 10, color: value !== def ? "rgba(140,180,255,0.9)" : "rgba(255,255,255,0.3)",
            fontFamily: "'Exo 2', monospace", letterSpacing: "0.06em",
            minWidth: 28, textAlign: "right",
          }}>
            {value}
          </span>
          {value !== def && (
            <button
              onClick={() => onChange(def)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.3)", padding: 0,
                display: "flex", alignItems: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >
              <ResetIcon />
            </button>
          )}
        </div>
      </div>
      <div style={{ position: "relative", height: 4 }}>
        {/* Track bg */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
        }} />
        {/* Filled track */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${pct}%`,
          borderRadius: 4,
          background: value !== def
            ? "linear-gradient(90deg, rgba(80,120,220,0.8), rgba(140,180,255,0.9))"
            : "rgba(255,255,255,0.25)",
          transition: "background 0.2s",
        }} />
        {/* Center tick mark */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 1, height: 8,
          background: "rgba(255,255,255,0.15)",
          marginTop: -2,
        }} />
        <input
          type="range" min={min} max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0,
            width: "100%", opacity: 0,
            cursor: "pointer", height: "100%",
            margin: 0,
          }}
        />
        {/* Thumb */}
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 7px)`,
          top: "50%", transform: "translateY(-50%)",
          width: 14, height: 14, borderRadius: "50%",
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          pointerEvents: "none",
          transition: "left 0s",
        }} />
      </div>
    </div>
  );
};

// ── Filter preset ─────────────────────────────────────────────────────────────
const FILTERS = [
  { id: "none",    label: "original", css: "" },
  { id: "cool",    label: "frost",    css: "hue-rotate(180deg) saturate(1.2)" },
  { id: "warm",    label: "golden",   css: "sepia(0.4) saturate(1.3) brightness(1.05)" },
  { id: "mono",    label: "lunar",    css: "grayscale(1) contrast(1.1)" },
  { id: "fade",    label: "nebula",   css: "contrast(0.85) saturate(0.7) brightness(1.1)" },
  { id: "vivid",   label: "nova",     css: "saturate(1.8) contrast(1.1)" },
  { id: "dark",    label: "void",     css: "brightness(0.75) contrast(1.2) saturate(0.9)" },
  { id: "dreamy",  label: "haze",     css: "blur(0.5px) brightness(1.05) saturate(1.3)" },
];

// ── Tool tab ──────────────────────────────────────────────────────────────────
const ToolTab = ({ id, icon, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    style={{
      flex: 1,  // ← each tab takes equal width
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: "12px 14px",
      background: active ? "rgba(255,255,255,0.07)" : "transparent",
      border: "none",
      borderBottom: active ? "2px solid rgba(140,180,255,0.7)" : "2px solid transparent",
      cursor: "pointer",
      color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
      transition: "background 0.2s, color 0.2s",
    }}
  >
    {icon}
    <span style={{ fontSize: 9, letterSpacing: "0.1em", fontFamily: "'Exo 2', sans-serif" }}>
      {label}
    </span>
  </button>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function PhotoEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("adjust");
  const [activeFilter, setActiveFilter] = useState("none");

  const photo = location.state?.photo || {
    bg: "linear-gradient(135deg,#c87a8a,#e89aaa)",
    label: "photo",
    id: 1,
  };
  const returnState = {
    photo: location.state?.photo,
    photos: location.state?.photos,
    index: location.state?.index,
  };

  // Adjustments state
  const DEFAULTS = {
    brightness: 100, contrast: 100, saturation: 100,
    warmth: 100, fade: 0, vignette: 0, sharpness: 100,
  };
  const [adj, setAdj] = useState({ ...DEFAULTS });
  const setOne = (key) => (val) => setAdj(prev => ({ ...prev, [key]: val }));

  const hasChanges = activeFilter !== "none" ||
    Object.keys(DEFAULTS).some(k => adj[k] !== DEFAULTS[k]);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  // Build CSS filter string
  const cssFilter = [
    FILTERS.find(f => f.id === activeFilter)?.css || "",
    `brightness(${adj.brightness}%)`,
    `contrast(${adj.contrast}%)`,
    `saturate(${adj.saturation}%)`,
    adj.warmth !== 100 ? `sepia(${(adj.warmth - 100) * 0.005})` : "",
  ].filter(Boolean).join(" ");

  const handleReset = () => {
    setAdj({ ...DEFAULTS });
    setActiveFilter("none");
  };

  // Add this ref at the top of the component
const imgRef = useRef(null);

// Add this function inside the component
const [saving, setSaving] = useState(false);

const handleSave = async () => {
  if (saving) return;
  setSaving(true);

  try {
    const photoId = photo._id || photo.id;
    if (!photoId) { alert("No photo ID found"); setSaving(false); return; }

    const proxyRes = await fetch(
      `http://localhost:5000/api/images/proxy?url=${encodeURIComponent(photo.src)}`
    );
    if (!proxyRes.ok) throw new Error("Proxy fetch failed");

    const blob = await proxyRes.blob();
    const imageBitmap = await createImageBitmap(blob);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = cssFilter || "none";
    ctx.drawImage(imageBitmap, 0, 0);

    const editedBlob = await new Promise(resolve =>
      canvas.toBlob(resolve, "image/jpeg", 0.75) // ← lower quality = smaller file = faster upload
    );

    console.log("Blob size:", editedBlob.size, "bytes");

    const formData = new FormData();
    formData.append("image", editedBlob, "edited.jpg");

    const res = await fetch(`http://localhost:5000/api/images/${photoId}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) throw new Error("Save failed");
    const updated = await res.json();

    navigate("/photo", {
      state: {
        photo: { ...photo, src: updated.imageUrl, imageUrl: updated.imageUrl },
        photos: location.state?.photos,
        index: location.state?.index,
      },
      replace: true,
    });

  } catch (err) {
    console.error("Save error:", err);
    alert("Failed to save, please try again");
  } finally {
    setSaving(false);
  }
};

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(160deg, #0a1520 0%, #080f1a 50%, #040a12 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Exo 2', 'Orbitron', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;500;600&display=swap');
        @keyframes twinkle {
          0%   { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dashFloat {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -200; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        input[type=range] { -webkit-appearance: none; appearance: none; }
        
      `}</style>

      <StarField count={100} />

      {/* ── TOP BAR ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px",
        background: "linear-gradient(180deg,rgba(8,16,30,0.95) 0%,rgba(8,16,30,0.5) 100%)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
      }}>
        {/* Cancel */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20, padding: "6px 14px",
            color: "rgba(255,255,255,0.5)", cursor: "pointer",
            fontSize: 11, letterSpacing: "0.12em",
            fontFamily: "'Exo 2', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "rgba(255,255,255,0.9)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.35)" }}><PlaneIcon /></span>
          cancel
        </button>

        {/* Center label */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <span style={{
            fontSize: 12, fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif",
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.1em",
          }}>
            edit photo
          </span>
          {hasChanges && (
            <span style={{
              fontSize: 9, color: "rgba(140,180,255,0.7)",
              fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.14em",
            }}>
              unsaved changes
            </span>
          )}
        </div>

        {/* Save + Reset */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {hasChanges && (
            <button
              onClick={handleReset}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20, padding: "6px 12px",
                color: "rgba(255,255,255,0.4)", cursor: "pointer",
                fontSize: 10  , letterSpacing: "0.1em",
                fontFamily: "'Exo 2', sans-serif",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <ResetIcon /> reset
            </button>
          )}
<button
  onClick={handleSave}
  disabled={saving}
  style={{
    display: "flex", alignItems: "center", gap: 7,
    background: saving ? "rgba(80,120,220,0.5)" : hasChanges ? "rgba(80,120,220,0.25)" : "rgba(255,255,255,0.06)",
    border: `1px solid ${hasChanges ? "rgba(140,180,255,0.4)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 20, padding: "6px 16px",
    color: hasChanges ? "rgba(160,200,255,0.95)" : "rgba(255,255,255,0.45)",
    cursor: saving ? "not-allowed" : "pointer",
    fontSize: 11, letterSpacing: "0.1em",
    fontFamily: "'Exo 2', sans-serif",
    transition: "all 0.2s",
    opacity: saving ? 0.8 : 1,
  }}
>
  {saving ? (
    <>
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "2px solid white",
        animation: "spin 0.8s linear infinite",
        flexShrink: 0,
      }} />
      saving...
    </>
  ) : (
    <><SaveIcon /> save</>
  )}
</button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{
        flex: 1, display: "flex", overflow: "hidden",
        position: "relative", zIndex: 10,
      }}>

        {/* ── PHOTO PREVIEW ── */}
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", padding: "24px",
        }}>
          {/* Comparison strip hint */}
          <div style={{
            position: "absolute", bottom: 14, left: "50%",
            transform: "translateX(-50%)",
            fontSize: 9, color: "rgba(255,255,255,0.2)",
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.14em",
            whiteSpace: "nowrap",
            animation: "fadeUp 0.5s 0.4s both ease",
          }}>
            {hasChanges ? "edited" : "original"}
          </div>

          <div style={{
            position: "relative",
            animation: loaded ? "slideIn 0.5s 0.15s both ease" : "none",
            opacity: loaded ? undefined : 0,
          }}>
            {/* Glow behind photo */}
            <div style={{
              position: "absolute", inset: -20,
              background: "radial-gradient(ellipse, rgba(80,120,220,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Polaroid frame */}
            <div style={{
              background: "#ddd9cc",
              borderRadius: 12,
              padding: "12px 12px 36px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              position: "relative",
            }}>
              {/* Photo with live filter */}
<div style={{
  width: "min(300px, 45vw)",
  aspectRatio: "3/4",
  borderRadius: 6,
  overflow: "hidden",
  position: "relative",
  filter: cssFilter,
  background: photo.src ? "none" : photo.bg, // 👈 fallback only
}}>
  {photo.src ? (
    <img
      ref={imgRef}
      src={photo.src}
      alt={photo.label}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }}
    />
  ) : null}
</div>

              <div style={{
                marginTop: 8, textAlign: "center",
                fontSize: 9, color: "rgba(30,30,30,0.4)",
                fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
              }}>
                {photo.label}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: TOOLS ── */}
        <div style={{
          width: 240, flexShrink: 0,
          display: "flex", flexDirection: "column",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(6,12,24,0.8)",
          backdropFilter: "blur(14px)",
          position: "relative", zIndex: 1,
          opacity: loaded ? 1 : 0,
          animation: loaded ? "fadeUp 0.5s 0.2s both ease" : "none",
        }}>

          {/* Tool tabs */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            overflowX: "auto",
          }}>
            <ToolTab id="adjust"  icon={<FilterIcon />} label="adjust"  active={activeTab === "adjust"}  onClick={setActiveTab} />
            <ToolTab id="filters" icon={<CropIcon />}   label="filters" active={activeTab === "filters"} onClick={setActiveTab} />
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

            {/* ── ADJUST TAB ── */}
            {activeTab === "adjust" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <AdjSlider label="brightness" value={adj.brightness} onChange={setOne("brightness")} min={0} max={200} default={100} delay={0.05} />
                <AdjSlider label="contrast"   value={adj.contrast}   onChange={setOne("contrast")}   min={0} max={200} default={100} delay={0.10} />
                <AdjSlider label="saturation" value={adj.saturation} onChange={setOne("saturation")} min={0} max={200} default={100} delay={0.15} />
                <AdjSlider label="warmth"     value={adj.warmth}     onChange={setOne("warmth")}     min={0} max={200} default={100} delay={0.20} />
                <AdjSlider label="fade"       value={adj.fade}       onChange={setOne("fade")}       min={0} max={100} default={0}   delay={0.25} />
                <AdjSlider label="vignette"   value={adj.vignette}   onChange={setOne("vignette")}   min={0} max={100} default={0}   delay={0.30} />
              </div>
            )}

            {/* ── FILTERS TAB ── */}
            {activeTab === "filters" && (
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 10,
                animation: "fadeUp 0.3s ease both",
              }}>
                {FILTERS.map((f, i) => (
                  <div
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: activeFilter === f.id
                        ? "2px solid rgba(140,180,255,0.7)"
                        : "2px solid rgba(255,255,255,0.05)",
                      transition: "border-color 0.2s, transform 0.2s",
                      transform: activeFilter === f.id ? "scale(1.03)" : "scale(1)",
                      animation: `fadeUp 0.35s ${i * 0.04}s both ease`,
                    }}
                    onMouseEnter={e => {
                      if (activeFilter !== f.id) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                    onMouseLeave={e => {
                      if (activeFilter !== f.id) e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    {/* Filter preview swatch */}
                    <div style={{
                      height: 70,
                      backgroundImage: `url(${photo.bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: f.css,
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(160deg,rgba(255,255,255,0.08) 0%,transparent 55%)",
                      }} />
                    </div>
                    <div style={{
                      padding: "5px 8px",
                      background: activeFilter === f.id ? "rgba(80,120,220,0.2)" : "rgba(255,255,255,0.03)",
                      fontSize: 9, letterSpacing: "0.1em",
                      color: activeFilter === f.id ? "rgba(160,200,255,0.9)" : "rgba(255,255,255,0.45)",
                      fontFamily: "'Exo 2', sans-serif",
                      textAlign: "center",
                      transition: "background 0.2s, color 0.2s",
                    }}>
                      {f.label}
                    </div>
                  </div>
                ))}
              </div>
            )}



          </div>

          {/* Vertical deco arc */}
          <svg style={{
            position: "absolute", right: -1, top: 0, bottom: 0,
            width: 8, height: "100%", pointerEvents: "none", opacity: 0.2,
          }} viewBox="0 0 8 800" preserveAspectRatio="none">
            <path d="M 8 0 Q -4 400 8 800"
              fill="none" stroke="rgba(255,255,255,0.5)"
              strokeWidth="1" strokeDasharray="4 8"
              style={{ animation: "dashFloat 20s linear infinite" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
