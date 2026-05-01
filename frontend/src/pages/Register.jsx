import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
const OrbitIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}>
    <ellipse cx="20" cy="20" rx="18" ry="9" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
    <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.9"/>
    <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.6"/>
  </svg>
);
const SnowflakeIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 22, height: 22 }}>
    <line x1="20" y1="4" x2="20" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4" y1="20" x2="36" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8.69" y1="8.69" x2="31.31" y2="31.31" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="31.31" y1="8.69" x2="8.69" y2="31.31" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="3.5" fill="white"/>
    {[0,45,90,135,180,225,270,315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 20 + 13 * Math.cos(rad);
      const y = 20 + 13 * Math.sin(rad);
      return <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6"/>;
    })}
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const PlaneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

const Field = ({ icon, placeholder, type = "text", value, onChange, error, delay = 0, rightEl }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ animation: `fadeUp 0.5s ${delay}s both ease` }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        background: focused
          ? "rgba(255,255,255,0.07)"
          : error
          ? "rgba(180,40,40,0.08)"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          focused
            ? "rgba(140,180,255,0.45)"
            : error
            ? "rgba(200,80,80,0.4)"
            : "rgba(255,255,255,0.1)"
        }`,
        borderRadius: 12,
        padding: "13px 16px",
        transition: "background 0.2s, border-color 0.2s",
      }}>
        <span style={{
          color: focused ? "rgba(140,180,255,0.8)" : error ? "rgba(255,100,100,0.6)" : "rgba(255,255,255,0.3)",
          transition: "color 0.2s", display: "flex", flexShrink: 0,
        }}>
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "rgba(255,255,255,0.88)",
            fontSize: 13, fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "0.06em",
            caretColor: "rgba(140,180,255,0.8)",
          }}
        />
        {rightEl && (
          <span style={{ flexShrink: 0, display: "flex" }}>{rightEl}</span>
        )}
      </div>
      {error && (
        <div style={{
          fontSize: 10, color: "rgba(255,100,100,0.7)",
          fontFamily: "'Exo 2', sans-serif",
          letterSpacing: "0.08em", marginTop: 5, paddingLeft: 4,
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

const StrengthBar = ({ password }) => {
  const getStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6)  score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = getStrength(password);
  const labels = ["", "weak", "fair", "good", "strong", "stellar"];
  const colors = ["", "rgba(220,60,60,0.8)", "rgba(220,140,40,0.8)", "rgba(180,200,60,0.8)", "rgba(60,180,100,0.8)", "rgba(80,160,255,0.9)"];

  if (!password) return null;

  return (
    <div style={{
      animation: "fadeUp 0.3s ease both",
      paddingLeft: 4,
    }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= strength ? colors[strength] : "rgba(255,255,255,0.08)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <div style={{
        fontSize: 9, letterSpacing: "0.14em",
        color: colors[strength],
        fontFamily: "'Exo 2', sans-serif",
        transition: "color 0.3s",
      }}>
        {labels[strength]}
      </div>
    </div>
  );
};

export default function Register() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

const validate = () => {
  const e = {};
  if (!username.trim()) e.username = "username is required";
  if (!password) e.password = "password is required";
  return e;
};

const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }
  setErrors({});
  setSubmitting(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email: username,  // Using username as email for now
        password
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ username: data || "Something went wrong" });
      setSubmitting(false);
      return;
    }

    // ✅ Show success message about email verification
    alert(data.message || "Registration successful! Check your email to verify your account.");
    
    setDone(true);
    setTimeout(() => navigate("/login"), 2000);

  } catch (err) {
    console.error(err);
    setErrors({ username: "Server error, try again" });
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes dashFloat {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -220; }
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.25; transform: scale(1.06); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { outline: none; }
      `}</style>

      <StarField count={160} />

      {/* Nebula glows */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: "40%", height: "50%",
        background: "radial-gradient(ellipse, rgba(40,70,160,0.14) 0%, transparent 70%)",
        animation: "pulseOrb 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: "35%", height: "45%",
        background: "radial-gradient(ellipse, rgba(20,50,120,0.12) 0%, transparent 70%)",
        animation: "pulseOrb 10s ease-in-out infinite 2s",
        pointerEvents: "none",
      }} />

      {/* Dashed orbit SVG */}
      <svg style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.18, zIndex: 1,
      }}>
        <ellipse cx="50%" cy="50%" rx="42%" ry="38%"
          fill="none" stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.8" strokeDasharray="6 10"
          style={{ animation: "dashFloat 22s linear infinite" }}
        />
      </svg>

      {/* ── CARD ── */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "min(420px, 92vw)",
        background: "rgba(10,18,36,0.75)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 20,
        padding: "32px 32px 28px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.7s ease both" : "none",
      }}>

        {/* ── LOGO ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, marginBottom: 28,
          animation: "fadeUp 0.5s 0.1s both ease",
        }}>
          <span style={{ color: "#1a3a6a" }}><OrbitIcon /></span>
          <span style={{
            fontSize: 22, fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif",
            color: "#1a3a6a", letterSpacing: "0.1em",
          }}>
            ANDR
          </span>
          <SnowflakeIcon />
          <span style={{
            fontSize: 22, fontWeight: 900,
            fontFamily: "'Orbitron', sans-serif",
            color: "white", letterSpacing: "0.1em",
            textShadow: "0 2px 20px rgba(100,160,255,0.35)",
          }}>
            MEDA
          </span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}><OrbitIcon /></span>
        </div>

        {/* Divider with label */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24,
          animation: "fadeUp 0.5s 0.15s both ease",
        }}>
          <span style={{ color: "rgba(255,255,255,0.35)" }}><PlaneIcon /></span>
          <div style={{ flex: 1, height: 1, borderTop: "1px dashed rgba(255,255,255,0.1)" }} />
          <span style={{
            fontSize: 9, color: "rgba(255,255,255,0.25)",
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "0.22em", textTransform: "uppercase",
          }}>
            create account
          </span>
          <div style={{ flex: 1, height: 1, borderTop: "1px dashed rgba(255,255,255,0.1)" }} />
        </div>

        {!done ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Username */}
            <Field
              icon={<UserIcon />}
              placeholder="username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                if (errors.username) setErrors(prev => ({ ...prev, username: "" }));
              }}
              error={errors.username}
              delay={0.2}
            />

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Field
                icon={<LockIcon />}
                placeholder="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                }}
                error={errors.password}
                delay={0.28}
                rightEl={
                  <button
                    onClick={() => setShowPw(s => !s)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: showPw ? "rgba(140,180,255,0.7)" : "rgba(255,255,255,0.25)",
                      padding: 0, display: "flex", alignItems: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                    onMouseLeave={e => e.currentTarget.style.color = showPw ? "rgba(140,180,255,0.7)" : "rgba(255,255,255,0.25)"}
                  >
                    <EyeIcon open={showPw} />
                  </button>
                }
              />
              <StrengthBar password={password} />
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                marginTop: 6,
                width: "100%", padding: "14px 0",
                borderRadius: 12,
                background: submitting
                  ? "rgba(60,100,200,0.3)"
                  : "linear-gradient(135deg, rgba(50,90,190,0.7), rgba(80,130,240,0.65))",
                border: "1px solid rgba(100,160,255,0.3)",
                color: "rgba(200,225,255,0.95)",
                fontSize: 12, letterSpacing: "0.18em",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "background 0.25s, transform 0.15s, box-shadow 0.25s",
                boxShadow: submitting ? "none" : "0 4px 24px rgba(60,100,220,0.25)",
                animation: "fadeUp 0.5s 0.36s both ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => {
                if (!submitting) {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(60,110,210,0.85), rgba(100,150,255,0.8))";
                  e.currentTarget.style.boxShadow = "0 6px 32px rgba(60,100,220,0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={e => {
                if (!submitting) {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(50,90,190,0.7), rgba(80,130,240,0.65))";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(60,100,220,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {submitting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{ animation: "spinSlow 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  launching...
                </>
              ) : (
                <>
                  create account
                  <ArrowIcon />
                </>
              )}
            </button>

            {/* Login link */}
            <div style={{
              textAlign: "center", marginTop: 2,
              animation: "fadeUp 0.5s 0.42s both ease",
            }}>
              <span style={{
                fontSize: 11, color: "rgba(255,255,255,0.28)",
                fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.08em",
              }}>
                already drifting?{" "}
              </span>
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 11, color: "rgba(140,180,255,0.7)",
                  fontFamily: "'Exo 2', sans-serif", letterSpacing: "0.08em",
                  padding: 0, transition: "color 0.2s",
                  textDecoration: "underline", textDecorationColor: "rgba(140,180,255,0.3)",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(180,210,255,0.95)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(140,180,255,0.7)"}
              >
                sign in
              </button>
            </div>
          </div>
        ) : (
          // ── SUCCESS STATE ──
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 14, padding: "16px 0 8px",
            animation: "fadeUp 0.5s ease both",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "rgba(60,180,100,0.15)",
              border: "1px solid rgba(80,200,120,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "checkPop 0.5s ease both",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="rgba(100,220,140,0.9)" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div style={{
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Orbitron', sans-serif",
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.08em",
            }}>
              welcome aboard
            </div>
            <div style={{
              fontSize: 10, color: "rgba(255,255,255,0.3)",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "0.12em",
            }}>
              entering orbit...
            </div>
          </div>
        )}
      </div>

      {/* Corner planet decoration */}
      <svg style={{
        position: "absolute", top: 16, right: 20,
        opacity: 0.3, pointerEvents: "none", zIndex: 1,
      }} width="120" height="60" viewBox="0 0 120 60">
        <path d="M 10 50 Q 60 0 110 50"
          fill="none" stroke="rgba(255,255,255,0.5)"
          strokeWidth="1" strokeDasharray="5 8"
          style={{ animation: "dashFloat 14s linear infinite" }}
        />
        <circle cx="90" cy="22" r="9" fill="rgba(60,100,200,0.65)" />
        <circle cx="90" cy="22" r="5" fill="rgba(120,170,255,0.85)" />
        <ellipse cx="90" cy="22" rx="16" ry="5"
          fill="none" stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.8"
          style={{ animation: "spinSlow 12s linear infinite" }}
        />
      </svg>

      {/* Bottom watermark */}
      <div style={{
        position: "absolute", bottom: 16, left: "50%",
        transform: "translateX(-50%)",
        fontSize: 9, color: "rgba(255,255,255,0.12)",
        fontFamily: "'Exo 2', sans-serif",
        letterSpacing: "0.24em", zIndex: 2,
        whiteSpace: "nowrap",
        animation: "fadeIn 1s 0.8s both ease",
      }}>
        andrmeda · space for memories
      </div>
    </div>
  );
}
