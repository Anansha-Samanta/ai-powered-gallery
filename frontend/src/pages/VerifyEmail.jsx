import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await apiFetch(
          `/api/auth/verify-email/${token}`
        );
        console.log("STATUS:", res.status);
        if (res.ok) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 2500);
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Exo 2', sans-serif",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Stars */}
      <div style={{ position: "absolute", inset: 0 }}>
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "2px",
              height: "2px",
              background: "white",
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div
        style={{
          width: "360px",
          background: "rgba(10,18,36,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "40px 30px",
          textAlign: "center",
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          zIndex: 10,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "0.15em",
            marginBottom: "20px",
          }}
        >
          ANDRMEDA
        </h1>

        {/* Status UI */}
        {status === "verifying" && (
          <>
            <div
              style={{
                margin: "20px auto",
                width: "40px",
                height: "40px",
                border: "3px solid rgba(255,255,255,0.2)",
                borderTop: "3px solid rgba(100,160,255,0.9)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ opacity: 0.7 }}>Verifying your signal...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "rgba(100,220,140,0.9)",
              }}
            >
              ✔
            </div>
            <p>Email verified successfully</p>
            <p style={{ fontSize: "12px", opacity: 0.5 }}>
              Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div
              style={{
                fontSize: "40px",
                marginBottom: "10px",
                color: "rgba(255,80,80,0.9)",
              }}
            >
              ✖
            </div>
            <p>Invalid or expired link</p>
          </>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;500&display=swap');

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}