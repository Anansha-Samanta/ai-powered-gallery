import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StarField = ({ count = 120, side = "dark" }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }))
  ).current;

  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: side === "dark" ? "#ffffff" : "#1a2a4a",
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

const OrbitIcon = ({ style = {} }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 36, height: 36, ...style }}
  >
    <ellipse
      cx="20"
      cy="20"
      rx="18"
      ry="9"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.8"
    />
    <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.9" />
    <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.6" />
  </svg>
);

const SnowflakeIcon = ({ style = {} }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 32, height: 32, ...style }}
  >
    <line x1="20" y1="4" x2="20" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="8.69" y1="8.69" x2="31.31" y2="31.31" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="31.31" y1="8.69" x2="8.69" y2="31.31" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="4" fill="white" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 20 + 14 * Math.cos(rad);
      const y = 20 + 14 * Math.sin(rad);
      return <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.7" />;
    })}
  </svg>
);

export default function Landing() {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d1b2e",
        fontFamily: "'Orbitron', 'Exo 2', sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap');

        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dashRotate {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -200; }
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.04); }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .card-hover {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: scale(1.015);
          box-shadow: 0 0 60px rgba(100, 160, 255, 0.15);
        }
        .arrow-btn:hover .arrow-icon {
          animation: arrowBounce 0.6s ease infinite;
        }
      `}</style>

      {/* Main card */}
      <div
        className="card-hover"
        style={{
          width: "min(900px, 95vw)",
          height: "min(500px, 90vw)",
          borderRadius: 6,
          overflow: "hidden",
          display: "flex",
          position: "relative",
          boxShadow: "0 30px 100px rgba(0,0,0,0.7)",
          opacity: loaded ? 1 : 0,
          animation: loaded ? "fadeIn 0.8s ease forwards" : "none",
        }}
      >
        {/* LEFT HALF — light gray space */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #8a9bb0 0%, #6b7d94 40%, #5a6e85 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <StarField count={60} side="light" />

          {/* Subtle nebula blobs */}
          <div style={{
            position: "absolute", top: "10%", left: "5%",
            width: "60%", height: "70%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
            animation: "pulseOrb 6s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "5%", right: "10%",
            width: "40%", height: "40%",
            background: "radial-gradient(ellipse, rgba(180,210,255,0.1) 0%, transparent 70%)",
            animation: "pulseOrb 8s ease-in-out infinite 2s",
          }} />
        </div>

        {/* RIGHT HALF — deep navy space */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #0d1b2e 0%, #0a1628 50%, #060e1a 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <StarField count={100} side="dark" />

          {/* Nebula glow */}
          <div style={{
            position: "absolute", top: "20%", right: "5%",
            width: "70%", height: "60%",
            background: "radial-gradient(ellipse, rgba(40,80,160,0.2) 0%, transparent 70%)",
            animation: "pulseOrb 7s ease-in-out infinite 1s",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", left: "5%",
            width: "50%", height: "50%",
            background: "radial-gradient(ellipse, rgba(20,50,120,0.15) 0%, transparent 70%)",
            animation: "pulseOrb 9s ease-in-out infinite 3s",
          }} />
        </div>

        {/* ── CURVED DIVIDER SVG ── */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 900 500"
          preserveAspectRatio="none"
        >
          {/* Dashed orbital arc */}
          <ellipse
            cx="420"
            cy="250"
            rx="300"
            ry="300"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            strokeDasharray="6 8"
            style={{ animation: "dashRotate 20s linear infinite" }}
          />

          {/* The curve that splits the two halves */}
          <path
            d="M 450 -20 Q 280 250 450 520"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* Solid inner arc divider */}
          <path
            d="M 450 0 Q 160 250 450 500 L 450 0 Z"
            fill="url(#curveGrad)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a9bb0" />
              <stop offset="100%" stopColor="#0d1b2e" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── CENTER LOGO TEXT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "fadeIn 1.2s 0.3s both ease",
            }}
          >
            {/* Left orbit icon — dark blue (on gray side) */}
            <OrbitIcon style={{ color: "#0d2a5e", opacity: 0.85 }} />

            {/* ANDR text */}
            <span
              style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#0d2a5e",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              ANDR
            </span>

            {/* Snowflake center icon */}
            <div style={{ margin: "0 2px" }}>
              <SnowflakeIcon />
            </div>

            {/* MEDA text */}
            <span
              style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#ffffff",
                textShadow: "0 2px 30px rgba(100,160,255,0.4)",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              MEDA
            </span>

            {/* Right orbit icon — white (on dark side) */}
            <OrbitIcon style={{ color: "#ffffff", opacity: 0.7 }} />
          </div>
        </div>

        {/* ── RIGHT ARROW BUTTON ── */}
        <button
          className="arrow-btn"
          onClick={() => navigate("/login")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
        >
          <span
            className="arrow-icon"
            style={{
              color: "white",
              fontSize: 18,
              display: "block",
              lineHeight: 1,
            }}
          >
            ›
          </span>
        </button>

        {/* ── LABEL TOP LEFT ── */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 22,
            zIndex: 20,
            color: "rgba(255,255,255,0.35)",
            fontSize: 10,
            letterSpacing: "0.25em",
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 300,
            textTransform: "uppercase",
          }}
        >
         
        </div>
      </div>
    </div>
  );
}
