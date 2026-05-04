import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);
  


  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  const handleReset = async () => {
    const res = await apifetch(
      `/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      alert(data);
    }
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(160deg, #0d1b2e 0%, #0a1525 50%, #060e1a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Exo 2', sans-serif",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Stars */}
      <div style={{ position: "absolute", inset: 0 }}>
        {[...Array(120)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "2px",
            height: "2px",
            background: "white",
            opacity: 0.5,
          }} />
        ))}
      </div>

      {/* Card */}
      <div style={{
        width: "360px",
        background: "rgba(10,18,36,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "40px 30px",
        textAlign: "center",
        backdropFilter: "blur(20px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        zIndex: 10,
        opacity: loaded ? 1 : 0,
        transition: "0.5s"
      }}>

        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "0.18em",
          marginBottom: "20px",
          textAlign:"center",
          width:"100%",
          display:"block",
        }}>
          ANDROMEDA
        </h1>

        {!done ? (
          <>
            <p style={{ opacity: 0.6 }}>Enter new password</p>

            <input
              type="password"
              placeholder="new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "white"
              }}
            />

            <button
              onClick={handleReset}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #3a6df0, #5b8cff)",
                color: "white",
                cursor: "pointer"
              }}
            >
              reset password
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: "40px", color: "lightgreen" }}>✔</div>
            <p>Password reset successful</p>
            <p style={{ fontSize: "12px", opacity: 0.5 }}>
              Redirecting...
            </p>
          </>
        )}
      </div>
    </div>
  );
}