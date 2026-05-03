import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StarField = ({ count = 120 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.3, opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 4 + 2, delay: Math.random() * 5,
    }))
  ).current;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          borderRadius: "50%", backgroundColor: "#fff", opacity: s.opacity,
          animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlanetIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="6"/><ellipse cx="12" cy="12" rx="11" ry="4.5"/></svg>;
const HomeIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
const GridIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const EditNavIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const SearchIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>;
const UserIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const CameraIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const PaletteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const FileTextIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const HelpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const InfoIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const LogoutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const EditPenIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const ChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
const XIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// ── Reusable Row ──────────────────────────────────────────────────────────────
const Row = ({ icon, label, sub, right, onClick, danger = false, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: "13px 16px",
        borderRadius: 12,
        background: hov && onClick ? "rgba(255,255,255,0.05)" : "transparent",
        cursor: onClick ? "pointer" : "default", transition: "background 0.18s",
        animation: `fadeUp 0.4s ${delay}s both ease`,
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: danger ? "rgba(180,40,40,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${danger ? "rgba(200,60,60,0.2)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        color: danger ? "rgba(255,100,100,0.8)" : "rgba(255,255,255,0.55)",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: danger ? "rgba(255,100,100,0.85)" : "rgba(255,255,255,0.8)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.04em" }}>
          {label}
        </div>
        {sub && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em", marginTop: 1 }}>{sub}</div>}
      </div>
      {right ? (
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em", marginRight: 4 }}>{right}</span>
      ) : onClick ? (
        <span style={{ color: "rgba(255,255,255,0.2)" }}><ChevronRight /></span>
      ) : null}
    </div>
  );
};

const Section = ({ title, delay = 0 }) => (
  <div style={{ padding: "6px 4px 4px", fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.22em", textTransform: "uppercase", animation: `fadeUp 0.4s ${delay}s both ease` }}>
    {title}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", marginBottom: 10, ...style }}>
    {children}
  </div>
);

const Divider = () => <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />;

// ── Inline edit field ─────────────────────────────────────────────────────────
const InlineField = ({ label, value, onChange, onSave, onCancel, type = "text", placeholder }) => (
  <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em" }}>{label}</span>
    <div style={{ display: "flex", gap: 8 }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        style={{
          flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8, padding: "8px 12px", color: "white", fontSize: 13,
          fontFamily: "'Exo 2', sans-serif", outline: "none",
        }}
      />
      <button onClick={onSave} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(80,140,80,0.25)", border: "1px solid rgba(100,180,100,0.3)", color: "rgba(120,220,120,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckIcon /></button>
      <button onClick={onCancel} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><XIcon /></button>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function Profile() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const fileInputRef = useRef(null);

  // Profile data from DB
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ photoCount: 0, albumCount: 0, collageCount: 0 });

  // Edit states
  const [editingName, setEditingName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [nameVal, setNameVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [toast, setToast] = useState(null);

  const userId = localStorage.getItem("userId");

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

  // Fetch profile
  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${API}/api/auth/profile/${userId}`);
        const data = await res.json();
        setProfile(data);
        setStats({ photoCount: data.photoCount, albumCount: data.albumCount, collageCount: data.collageCount });
        setNameVal(data.username || "");
      } catch (e) {
        console.error("Failed to load profile:", e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, [userId]);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  // Save name
  const saveName = async () => {
    if (!nameVal.trim()) return;
    setSavingName(true);
    try {
      const res = await fetch(`${API}/api/auth/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: nameVal.trim() }),
      });
      const data = await res.json();
      setProfile(prev => ({ ...prev, username: data.username }));
      setEditingName(false);
      showToast("Name updated");
    } catch {
      showToast("Failed to update name", false);
    }
    setSavingName(false);
  };

  // Save password
  const savePassword = async () => {
    if (passVal.length < 6) { showToast("Password must be 6+ chars", false); return; }
    setSavingPass(true);
    try {
      await fetch(`${API}/api/auth/profile/${userId}`, {
          method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passVal }),
      });
      setPassVal("");
      setEditingPassword(false);
      showToast("Password updated");
    } catch {
      showToast("Failed to update password", false);
    }
    setSavingPass(false);
  };

  // Upload profile picture
const handlePicUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploadingPic(true);
  try {
    const formData = new FormData();
    formData.append("image", file);

    // ← hits auth route, NOT image route
    const res = await fetch(`${API}/api/auth/profile/${userId}/picture`, {
            method: "POST",
      body: formData,
    });
    const data = await res.json();
    setProfile(prev => ({ ...prev, profilePic: data.profilePic }));
    showToast("Profile picture updated");
  } catch {
    showToast("Failed to upload picture", false);
  }
  setUploadingPic(false);
};

  const initials = profile?.username?.charAt(0)?.toUpperCase() || "?";

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
        @keyframes twinkle { 0% { opacity:0.1; transform:scale(0.8); } 100% { opacity:0.85; transform:scale(1.3); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes dashFloat { from { stroke-dashoffset:0; } to { stroke-dashoffset:-200; } }
        @keyframes avatarPulse { 0%,100% { box-shadow:0 0 0 0 rgba(80,120,220,0.3); } 50% { box-shadow:0 0 0 8px rgba(80,120,220,0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .nav-btn { display:flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:50%; cursor:pointer; transition:background 0.2s, color 0.2s; color:rgba(255,255,255,0.45); border:none; background:transparent; }
        .nav-btn:hover { color:rgba(255,255,255,0.85); background:rgba(255,255,255,0.07); }
        .nav-btn.special { color:white; background:rgba(20,40,80,0.8); border:1px solid rgba(255,255,255,0.15); }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      <StarField count={120} />

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
          zIndex: 200, background: toast.ok ? "rgba(60,120,60,0.95)" : "rgba(150,40,40,0.95)",
          border: `1px solid ${toast.ok ? "rgba(100,200,100,0.4)" : "rgba(220,80,80,0.4)"}`,
          borderRadius: 20, padding: "8px 20px",
          color: "white", fontSize: 12, fontFamily: "'Exo 2', sans-serif",
          letterSpacing: "0.08em", animation: "fadeUp 0.3s ease both",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePicUpload} />

      {/* ── TOP NAV ── */}
      <div style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px 10px",
        background: "linear-gradient(180deg,rgba(10,20,40,0.9) 0%,rgba(10,20,40,0.4) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.5s ease both" : "none",
      }}>
        <button className="nav-btn special" onClick={() => navigate("/home")}><PlanetIcon /></button>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[
            { icon: <HomeIcon />, path: "/home" },
            { icon: <GridIcon />, path: "/ai" },
            { icon: <EditNavIcon />, path: "/create" },
            { icon: <SearchIcon />, path: "/search" },
          ].map((item, i) => (
            <button key={i} className="nav-btn" onClick={() => navigate(item.path)}>{item.icon}</button>
          ))}
        </div>
        <button className="nav-btn special"><UserIcon /></button>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 10 }}>

        {/* ── HERO ── */}
        <div style={{ position: "relative", padding: "32px 24px 0", display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden" }}>
          {/* Nebula bg */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: "100%", background: "radial-gradient(ellipse, rgba(50,80,160,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Avatar */}
          <div style={{ position: "relative", animation: "fadeUp 0.5s 0.1s both ease" }}>
            <div style={{
              width: 84, height: 84, borderRadius: "50%",
              background: profile?.profilePic ? "none" : "linear-gradient(135deg,#2a4a8a,#4a6aaa,#7a9acc)",
              border: "2px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 30, color: "rgba(255,255,255,0.85)",
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
              animation: "avatarPulse 4s ease-in-out infinite",
              overflow: "hidden", position: "relative",
            }}>
              {profile?.profilePic ? (
                <img src={profile.profilePic} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span>{initials}</span>
              )}
              {uploadingPic && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", animation: "spin 0.8s linear infinite" }} />
                </div>
              )}
            </div>
            {/* Camera button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: "absolute", bottom: 0, right: 0,
                width: 26, height: 26, borderRadius: "50%",
                background: "rgba(20,40,80,0.95)", border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", padding: 0, transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(50,80,160,0.95)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(20,40,80,0.95)"}
            >
              <CameraIcon />
            </button>
          </div>

          {/* Name + email */}
          <div style={{ marginTop: 12, textAlign: "center", animation: "fadeUp 0.5s 0.18s both ease" }}>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", color: "white", letterSpacing: "0.08em" }}>
              {profile?.username || "—"}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.1em", marginTop: 3 }}>
              {profile?.email || ""}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 0, marginTop: 20, marginBottom: 28,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14, overflow: "hidden", width: "100%", maxWidth: 320,
            animation: "fadeUp 0.5s 0.25s both ease",
          }}>
            {[
              { val: stats.photoCount,   label: "photos" },
              { val: stats.albumCount,   label: "albums" },
              { val: stats.collageCount, label: "collages" },
            ].map((stat, i) => (
              <div key={stat.label} style={{ flex: 1, padding: "14px 8px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", color: "rgba(255,255,255,0.88)", letterSpacing: "0.04em" }}>
                  {stat.val ?? "—"}
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.14em", marginTop: 3 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SETTINGS ── */}
        <div style={{ padding: "0 16px 40px", display: "flex", flexDirection: "column", gap: 2, maxWidth: 520, margin: "0 auto", width: "100%" }}>

          {/* Account */}
          <Section title="account" delay={0.2} />
          <Card>
            {/* Edit name */}
            {editingName ? (
              <InlineField
                label="display name"
                value={nameVal}
                onChange={setNameVal}
                onSave={saveName}
                onCancel={() => { setEditingName(false); setNameVal(profile?.username || ""); }}
                placeholder="your name"
              />
            ) : (
              <Row icon={<EditPenIcon />} label="edit name" sub={profile?.username || "—"} onClick={() => setEditingName(true)} delay={0.22} />
            )}

            <Divider />

            {/* Change password */}
            {editingPassword ? (
              <InlineField
                label="new password"
                value={passVal}
                onChange={setPassVal}
                onSave={savePassword}
                onCancel={() => { setEditingPassword(false); setPassVal(""); }}
                type="password"
                placeholder="min 6 characters"
              />
            ) : (
              <Row icon={<LockIcon />} label="change password" sub="update your login password" onClick={() => setEditingPassword(true)} delay={0.26} />
            )}
          </Card>

          {/* Appearance */}
          <Section title="appearance" delay={0.3} />
          <Card>
            <Row icon={<PaletteIcon />} label="theme" sub="space · star field" right="active" delay={0.32} />
          </Card>

          {/* Privacy & Legal */}
          <Section title="privacy & legal" delay={0.36} />
          <Card>
            <Row icon={<ShieldIcon />}   label="privacy policy"     onClick={() => {}} delay={0.38} />
            <Divider />
            <Row icon={<FileTextIcon />} label="terms & conditions"  onClick={() => {}} delay={0.41} />
          </Card>

          {/* Support */}
          <Section title="support" delay={0.44} />
          <Card>
            <Row icon={<HelpIcon />} label="help & feedback" onClick={() => {}} delay={0.46} />
            <Divider />
            <Row icon={<InfoIcon />} label="about andrmeda" sub="v1.0.0 · build 2026.05" onClick={() => {}} delay={0.49} />
          </Card>

          {/* Logout */}
          <div style={{ background: "rgba(180,40,40,0.06)", border: "1px solid rgba(180,40,40,0.14)", borderRadius: 14, overflow: "hidden", animation: "fadeUp 0.4s 0.52s both ease" }}>
            <Row icon={<LogoutIcon />} label="log out" danger onClick={() => setShowLogoutConfirm(true)} />
          </div>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.2em", animation: "fadeUp 0.4s 0.55s both ease" }}>
            andrmeda · space for memories
          </div>
        </div>
      </div>

      {/* ── LOGOUT MODAL ── */}
      {showLogoutConfirm && (
        <div onClick={() => setShowLogoutConfirm(false)} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(135deg,#0d1b2e,#0a1828)", border: "1px solid rgba(180,40,40,0.25)", borderRadius: 18, padding: "28px 28px 22px", width: "min(320px,88vw)", animation: "fadeUp 0.3s ease both", textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(180,40,40,0.15)", border: "1px solid rgba(200,60,60,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "rgba(255,100,100,0.8)" }}>
              <LogoutIcon />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", color: "white", letterSpacing: "0.06em", marginBottom: 8 }}>log out?</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.06em", lineHeight: 1.6, marginBottom: 22 }}>
              you'll need to sign in again<br />to access your memories
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.1em", fontFamily: "'Exo 2', sans-serif", cursor: "pointer" }}>cancel</button>
              <button onClick={() => { localStorage.clear(); navigate("/"); }} style={{ flex: 1, padding: "10px 0", background: "rgba(180,40,40,0.25)", border: "1px solid rgba(200,60,60,0.35)", borderRadius: 10, color: "rgba(255,120,120,0.95)", fontSize: 11, letterSpacing: "0.1em", fontFamily: "'Exo 2', sans-serif", cursor: "pointer" }}>log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}