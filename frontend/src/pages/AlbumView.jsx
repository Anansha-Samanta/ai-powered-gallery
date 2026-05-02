import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAlbum, deleteAlbum, updateAlbum, fetchMyImages } from "../api/albumApi";

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
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

// ── Photo tile ────────────────────────────────────────────────────────────────
const PhotoTile = ({ photo, index, onClick, viewMode, editMode, onDeleteRequest }) => {
  const [hov, setHov] = useState(false);

  if (viewMode === "list") {
    return (
      <div
        onClick={() => !editMode && onClick(photo, index)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "10px 14px",
          borderRadius: 10,
          background: editMode
            ? "rgba(220,60,60,0.07)"
            : hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${editMode ? "rgba(220,80,80,0.2)" : "rgba(255,255,255,0.07)"}`,
          cursor: editMode ? "default" : "pointer",
          transition: "background 0.2s",
          animation: `fadeUp 0.4s ${0.05 + index * 0.04}s both ease`,
          position: "relative",
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
        {editMode ? (
          <button
            onClick={() => onDeleteRequest(photo)}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(220,60,60,0.8)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", flexShrink: 0,
            }}
          >
            <XIcon />
          </button>
        ) : (
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Exo 2', sans-serif" }}>›</span>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => !editMode && onClick(photo, index)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        aspectRatio: "1/1",
        borderRadius: 10,
        backgroundImage: `url(${photo.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", overflow: "hidden",
        cursor: editMode ? "default" : "pointer",
        transform: hov && !editMode ? "scale(1.04)" : "scale(1)",
        boxShadow: hov && !editMode ? "0 10px 28px rgba(0,0,0,0.5)" : "0 3px 12px rgba(0,0,0,0.3)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        animation: `fadeUp 0.4s ${0.05 + index * 0.04}s both ease`,
        outline: editMode ? "2px solid rgba(220,80,80,0.35)" : "none",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg,rgba(255,255,255,0.09) 0%,transparent 55%)",
      }} />

      {/* Edit mode: delete button */}
      {editMode && (
        <button
          onClick={() => onDeleteRequest(photo)}
          style={{
            position: "absolute", top: 6, right: 6,
            width: 26, height: 26, borderRadius: "50%",
            background: "rgba(200,40,40,0.92)",
            border: "1.5px solid rgba(255,255,255,0.3)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", zIndex: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <XIcon />
        </button>
      )}

      {hov && !editMode && (
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

// ── Add Photo Modal ───────────────────────────────────────────────────────────
const AddPhotoModal = ({ onClose, onAdd, adding, existingIds = [] }) => {
  const [myImages, setMyImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selected, setSelected] = useState(new Set()); // image._id values

  useEffect(() => {
    fetchMyImages()
      .then(imgs => {
        // Filter out images already in the album
        setMyImages(imgs.filter(img => !existingIds.includes(img._id)));
      })
      .catch(console.error)
      .finally(() => setLoadingImages(false));
  }, []);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 380, maxHeight: "80vh",
          background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: "24px 20px",
          display: "flex", flexDirection: "column", gap: 16,
          animation: "fadeUp 0.25s ease both",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: 13, fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif",
            color: "white", letterSpacing: "0.12em",
            textTransform: "lowercase",
          }}>
            add photos
          </span>
          {selected.size > 0 && (
            <span style={{
              fontSize: 10, color: "rgba(140,210,255,0.7)",
              fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
            }}>
              {selected.size} selected
            </span>
          )}
        </div>

        {/* Image grid */}
        <div style={{
          overflowY: "auto", flex: 1,
          minHeight: 0,
        }}>
          {loadingImages ? (
            <div style={{
              padding: "32px 0", textAlign: "center",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Exo 2', sans-serif", fontSize: 11, letterSpacing: "0.15em",
            }}>
              loading your photos…
            </div>
          ) : myImages.length === 0 ? (
            <div style={{
              padding: "32px 0", textAlign: "center",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Exo 2', sans-serif", fontSize: 11, letterSpacing: "0.15em",
            }}>
              no photos available to add
            </div>
          ) : (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6,
            }}>
              {myImages.map(img => {
                const sel = selected.has(img._id);
                return (
                  <div
                    key={img._id}
                    onClick={() => toggle(img._id)}
                    style={{
                      aspectRatio: "1/1", borderRadius: 8,
                      backgroundImage: `url(${img.imageUrl})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      cursor: "pointer", position: "relative", overflow: "hidden",
                      outline: sel ? "2px solid rgba(100,180,255,0.8)" : "2px solid transparent",
                      transition: "outline 0.15s",
                    }}
                  >
                    {sel && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(60,130,220,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          background: "rgba(100,180,255,0.9)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff",
                        }}>
                          <CheckIcon />
                        </div>
                      </div>
                    )}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "10px 5px 4px",
                      background: "linear-gradient(0deg,rgba(0,0,0,0.6) 0%,transparent 100%)",
                    }}>
                      <span style={{
                        fontSize: 8, color: "rgba(255,255,255,0.55)",
                        fontFamily: "'Exo 2', sans-serif",
                        display: "block",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {img.title || img.aiCaption || "photo"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "9px 0",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, color: "rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: 11,
              fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
            }}
          >
            cancel
          </button>
          <button
            onClick={() => onAdd([...selected])}
            disabled={selected.size === 0 || adding}
            style={{
              flex: 1, padding: "9px 0",
              background: selected.size > 0 ? "rgba(100,180,255,0.15)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${selected.size > 0 ? "rgba(100,180,255,0.35)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 8,
              color: selected.size > 0 ? "rgba(140,210,255,0.9)" : "rgba(255,255,255,0.2)",
              cursor: selected.size > 0 ? "pointer" : "not-allowed",
              fontSize: 11, fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "0.1em", transition: "all 0.2s",
            }}
          >
            {adding ? "adding…" : `add${selected.size > 0 ? ` (${selected.size})` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
const DeletePhotoConfirm = ({ photo, onConfirm, onCancel, deleting }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 200,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  }} onClick={onCancel}>
    <div
      onClick={e => e.stopPropagation()}
      style={{
        width: 300,
        background: "linear-gradient(160deg, #1a0d0d 0%, #150a0a 100%)",
        border: "1px solid rgba(220,80,80,0.25)",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: 16,
        animation: "fadeUp 0.2s ease both",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}
    >
      {/* Thumb */}
      <div style={{
        width: 60, height: 60, borderRadius: 10,
        backgroundImage: `url(${photo.bg})`,
        backgroundSize: "cover", backgroundPosition: "center",
        margin: "0 auto",
        border: "1.5px solid rgba(220,80,80,0.3)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 12, fontWeight: 700,
          fontFamily: "'Orbitron', sans-serif",
          color: "rgba(255,120,120,0.9)", letterSpacing: "0.12em",
          marginBottom: 6,
        }}>
          remove photo?
        </div>
        <div style={{
          fontSize: 10, color: "rgba(255,255,255,0.3)",
          fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.08em",
        }}>
          "{photo.label}" will be removed from this album.
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1, padding: "9px 0",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, color: "rgba(255,255,255,0.4)",
            cursor: "pointer", fontSize: 11,
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
          }}
        >
          cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={deleting}
          style={{
            flex: 1, padding: "9px 0",
            background: "rgba(200,50,50,0.2)",
            border: "1px solid rgba(200,70,70,0.4)",
            borderRadius: 8, color: "rgba(255,120,120,0.9)",
            cursor: "pointer", fontSize: 11,
            fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
          }}
        >
          {deleting ? "removing…" : "remove"}
        </button>
      </div>
    </div>
  </div>
);

// ── Sidebar action button ─────────────────────────────────────────────────────
const SideBtn = ({ icon, label, onClick, danger = false, active = false, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        background: active
          ? "rgba(100,180,255,0.12)"
          : hov
            ? danger ? "rgba(220,60,60,0.15)" : "rgba(255,255,255,0.08)"
            : "transparent",
        border: active ? "1px solid rgba(100,180,255,0.25)" : "none",
        borderRadius: 10, padding: "10px 8px",
        cursor: "pointer",
        color: active
          ? "rgba(140,210,255,0.95)"
          : hov
            ? danger ? "rgba(255,100,100,0.95)" : "rgba(255,255,255,0.95)"
            : danger ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.45)",
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

// ── Main Component ────────────────────────────────────────────────────────────
export default function AlbumView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [cols, setCols] = useState(3);
  const { albumId } = location.state || {};
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    if (!albumId) { console.error("No albumId passed in location.state!"); return; }
    fetchAlbum(albumId)
      .then(data => {
        console.log("[AlbumView] initial fetchAlbum response:", data);
        const albumObj = data?.album ?? data?.data ?? data;
        setAlbum(albumObj);
        const images = albumObj?.images ?? [];
        setPhotos(
          images
            .filter(img => img && typeof img === "object" && img.imageUrl)
            .map(img => ({
              id: img._id,
              bg: img.imageUrl,
              src: img.imageUrl,
              label: img.title || img.aiCaption || "photo",
            }))
        );
      })
      .catch(console.error);
  }, [albumId]);

  const handleDelete = async () => {
    if (!confirm("Delete this album?")) return;
    await deleteAlbum(albumId);
    navigate(-1);
  };

  const handlePhotoClick = (photo, index) => {
    navigate("/photo", {
      state: { photo: { ...photo, src: photo.src || photo.bg }, photos, index },
    });
  };

  // helper: extract photos defensively from any API response shape
  const extractPhotos = (data) => {
    const album = data?.album ?? data?.data ?? data;
    const images = album?.images ?? [];
    console.log("[AlbumView] raw album from API:", album);
    console.log("[AlbumView] images array:", images);
    return images
      .filter(img => img && typeof img === "object" && img.imageUrl)
      .map(img => ({
        id: img._id,
        bg: img.imageUrl,
        src: img.imageUrl,
        label: img.title || img.aiCaption || "photo",
      }));
  };

  // ── Add photos ──
  const handleAddPhoto = async (imageIds) => {
    if (!imageIds.length) return;
    setAdding(true);
    try {
      await updateAlbum(albumId, { addImageIds: imageIds });
      const fresh = await fetchAlbum(albumId);
      console.log("[AlbumView] fetchAlbum after add:", fresh);
      setAlbum(fresh?.album ?? fresh?.data ?? fresh);
      setPhotos(extractPhotos(fresh));
      setShowAddModal(false);
    } catch (err) {
      console.error("[AlbumView] handleAddPhoto error:", err);
    } finally {
      setAdding(false);
    }
  };

  // ── Remove photo ──
  const handleConfirmDelete = async () => {
    if (!photoToDelete) return;
    setDeleting(true);
    try {
      await updateAlbum(albumId, { removeImageIds: [photoToDelete.id] });
      const fresh = await fetchAlbum(albumId);
      console.log("[AlbumView] fetchAlbum after remove:", fresh);
      setAlbum(fresh?.album ?? fresh?.data ?? fresh);
      setPhotos(extractPhotos(fresh));
      setPhotoToDelete(null);
    } catch (err) {
      console.error("[AlbumView] handleConfirmDelete error:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (!album) return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(255,255,255,0.3)",
      fontFamily: "'Exo 2', sans-serif",
      fontSize: 12, letterSpacing: "0.2em",
    }}>
      loading...
    </div>
  );

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

      {/* Modals */}
      {showAddModal && (
        <AddPhotoModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPhoto}
          adding={adding}
          existingIds={photos.map(p => p.id)}
        />
      )}
      {photoToDelete && (
        <DeletePhotoConfirm
          photo={photoToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPhotoToDelete(null)}
          deleting={deleting}
        />
      )}

      {/* ── TOP HEADER ── */}
      <div style={{
        position: "relative", zIndex: 20,
        padding: "16px 24px 12px",
        background: editMode
          ? "linear-gradient(180deg,rgba(30,10,10,0.92) 0%,rgba(20,8,8,0.3) 100%)"
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

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif",
            color: "white", letterSpacing: "0.1em",
            textTransform: "lowercase",
          }}>
            {album.title}
          </span>
          <span style={{
            fontSize: 10, letterSpacing: "0.15em",
            fontFamily: "'Exo 2', sans-serif",
            color: editMode ? "rgba(255,140,140,0.6)" : "rgba(255,255,255,0.35)",
            transition: "color 0.3s",
          }}>
            {editMode ? "✎ editing mode" : `${photos.length} photos`}
          </span>
        </div>

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
      <div style={{ flex: 1, display: "flex", position: "relative", zIndex: 10, overflow: "hidden" }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          width: 72, flexShrink: 0,
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "20px 8px", gap: 4,
          borderRight: `1px solid ${editMode ? "rgba(220,80,80,0.12)" : "rgba(255,255,255,0.05)"}`,
          background: editMode ? "rgba(20,8,8,0.55)" : "rgba(8,16,30,0.55)",
          backdropFilter: "blur(10px)",
          transition: "background 0.4s, border-color 0.4s",
        }}>
          {/* Album cover swatch */}
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: album.coverImage
              ? `url(${album.coverImage})`
              : "linear-gradient(135deg,#2a2a2a,#4a4040,#6a5a50)",
            backgroundSize: "cover", backgroundPosition: "center",
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

          <SideBtn
            icon={editMode ? <CheckIcon /> : <EditIcon />}
            label={editMode ? "done" : "edit"}
            active={editMode}
            delay={0.1}
            onClick={() => setEditMode(v => !v)}
          />
          

          {/* Add photo button — only visible in edit mode */}
          {editMode && (
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                width: "100%", borderRadius: 10,
                padding: "10px 8px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                background: "rgba(100,180,255,0.1)",
                border: "1px solid rgba(100,180,255,0.22)",
                cursor: "pointer",
                color: "rgba(140,210,255,0.8)",
                animation: "fadeUp 0.25s ease both",
              }}
            >
              <PlusIcon />
              <span style={{ fontSize: 9, letterSpacing: "0.1em", fontFamily: "'Exo 2', sans-serif" }}>add</span>
            </button>
          )}

          <div style={{ flex: 1 }} />
          <SideBtn icon={<TrashIcon />} label="trash" danger onClick={handleDelete} delay={0.22} />
        </div>

        {/* ── PHOTO GRID / LIST ── */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "20px 20px 28px",
          position: "relative",
        }}>
          {/* Edit mode banner */}
          {editMode && (
            <div style={{
              marginBottom: 14, padding: "10px 14px",
              background: "rgba(220,60,60,0.08)",
              border: "1px solid rgba(220,80,80,0.2)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              animation: "fadeUp 0.2s ease both",
            }}>
              <span style={{
                fontSize: 10, color: "rgba(255,140,140,0.7)",
                fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.12em",
              }}>
                tap ✕ to remove · tap + to add photos
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 12px", borderRadius: 8,
                  background: "rgba(100,180,255,0.12)",
                  border: "1px solid rgba(100,180,255,0.25)",
                  color: "rgba(140,210,255,0.85)",
                  cursor: "pointer", fontSize: 10,
                  fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em",
                }}
              >
                <PlusIcon /> add photo
              </button>
            </div>
          )}

          {/* Grid cols control (only in grid mode, not edit) */}
          {viewMode === "grid" && !editMode && (
            <div style={{
              display: "flex", gap: 6, marginBottom: 16,
              animation: "fadeUp 0.4s 0.1s both ease",
            }}>
              {[2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setCols(n)}
                  style={{
                    padding: "4px 12px", borderRadius: 12,
                    background: cols === n ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                    border: "1px solid",
                    borderColor: cols === n ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                    color: cols === n ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                    fontSize: 10, letterSpacing: "0.1em",
                    fontFamily: "'Exo 2', sans-serif",
                    cursor: "pointer", transition: "all 0.18s",
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
                  editMode={editMode}
                  onDeleteRequest={setPhotoToDelete}
                />
              ))}

              {/* Add tile in grid edit mode */}
              {editMode && (
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    aspectRatio: "1/1", borderRadius: 10,
                    background: "rgba(100,180,255,0.05)",
                    border: "1.5px dashed rgba(100,180,255,0.25)",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 8,
                    color: "rgba(140,210,255,0.5)",
                    animation: `fadeUp 0.4s ${0.05 + photos.length * 0.04}s both ease`,
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(100,180,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(100,180,255,0.45)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(100,180,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(100,180,255,0.25)";
                  }}
                >
                  <PlusIcon />
                  <span style={{
                    fontSize: 9, letterSpacing: "0.15em",
                    fontFamily: "'Exo 2', sans-serif",
                  }}>add photo</span>
                </button>
              )}
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
                  editMode={editMode}
                  onDeleteRequest={setPhotoToDelete}
                />
              ))}

              {/* Add row in list edit mode */}
              {editMode && (
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "10px 14px", borderRadius: 10,
                    background: "rgba(100,180,255,0.05)",
                    border: "1.5px dashed rgba(100,180,255,0.22)",
                    cursor: "pointer", color: "rgba(140,210,255,0.5)",
                    animation: `fadeUp 0.4s ${0.05 + photos.length * 0.04}s both ease`,
                  }}
                >
                  <PlusIcon />
                  <span style={{ fontSize: 11, fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em" }}>
                    add photo
                  </span>
                </button>
              )}
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
            {album.title}&nbsp;&nbsp;✕&nbsp;&nbsp;album
          </div>
        </div>
      </div>
    </div>
  );
}
