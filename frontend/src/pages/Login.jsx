import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StarField = ({ count = 160 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ Show specific error message (including verification error)
        alert(data || "Login failed");
        return;
      }

      // ✅ store token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Orbitron', 'Exo 2', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;500;600&display=swap');

        @keyframes twinkle {
          0% { opacity: 0.15; transform: scale(0.8); }
          100% { opacity: 0.9; transform: scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(60,100,180,0.15); }
          50% { box-shadow: 0 0 60px rgba(60,100,180,0.25); }
        }
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          padding: 10px 36px 10px 12px;
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-family: 'Exo 2', sans-serif;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          box-sizing: border-box;
        }
        .input-field::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .input-field:focus {
          border-color: rgba(100,150,255,0.5);
          background: rgba(255,255,255,0.1);
        }
        .signin-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(90deg, #4a5568 0%, #5a6578 100%);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          color: white;
          font-size: 14px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.15s ease;
        }
        .signin-btn:hover {
          background: linear-gradient(90deg, #5a6578 0%, #6a7588 100%);
          transform: translateY(-1px);
        }
        .signin-btn:active {
          transform: translateY(0);
        }
        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 9px 0;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.25);
        }
      `}</style>

      {/* Starfield background */}
      <StarField count={180} />

      {/* Nebula blobs */}
      <div style={{
        position: "absolute", top: "10%", left: "15%",
        width: "35%", height: "40%",
        background: "radial-gradient(ellipse, rgba(40,70,150,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "40%", height: "45%",
        background: "radial-gradient(ellipse, rgba(20,50,120,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ANDROMEDA title */}
      <div style={{
        marginBottom: 28,
        opacity: loaded ? 1 : 0,
        animation: loaded ? "fadeUp 0.7s ease both" : "none",
        animationDelay: "0.1s",
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 4vw, 36px)",
          letterSpacing: "0.22em",
          color: "white",
          textShadow: "0 0 40px rgba(120,170,255,0.3)",
        }}>
          ANDROMEDA
        </span>
      </div>

      {/* Login card */}
      <div style={{
        width: "min(340px, 88vw)",
        background: "rgba(30,45,70,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "32px 28px 28px",
        zIndex: 10,
        animation: "pulseGlow 6s ease-in-out infinite",
        opacity: loaded ? 1 : 0,
        ...(loaded ? { animation: "fadeUp 0.7s 0.2s both ease, pulseGlow 6s 1s ease-in-out infinite" } : {}),
      }}>
        {/* Login heading */}
        <h2 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 300,
          fontSize: 26,
          color: "rgba(255,255,255,0.9)",
          margin: "0 0 22px 0",
          letterSpacing: "0.04em",
        }}>
          Login
        </h2>

        {/* Email field */}
        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 5,
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "0.05em",
          }}>Email</label>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {email && (
              <span style={{
                position: "absolute", right: 10, top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(100,200,100,0.7)", fontSize: 14,
              }}>✓</span>
            )}
          </div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 8 }}>
          <label style={{
            display: "block",
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 5,
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "0.05em",
          }}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPass(v => !v)}
              style={{
                position: "absolute", right: 10, top: "50%",
                transform: "translateY(-50%)",
                background: "none", border: "none",
                cursor: "pointer", padding: 0, display: "flex",
              }}
            >
              <EyeIcon open={showPass} />
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <a href="#" style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            textDecoration: "none",
            fontFamily: "'Exo 2', sans-serif",
            transition: "color 0.2s",
          }} onClick={() => navigate("/forgot-password")}
          onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.75)"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign in button */}
        <button className="signin-btn" onClick={handleLogin}>Sign in</button>

        {/* Or Continue With */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          margin: "20px 0 14px",
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Exo 2', sans-serif",
            whiteSpace: "nowrap",
          }}>Or Continue With</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

  

        {/* Register link */}
        <div style={{ textAlign: "center" }}>
          <span style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            fontFamily: "'Exo 2', sans-serif",
          }}>Don't have an account yet? </span>
          <a href="#" style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}
          onClick={()=>navigate("/register")}
          onMouseEnter={e => e.target.style.color = "white"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
          >
            Register for free
          </a>
        </div>
      </div>
    </div>
  );
}
