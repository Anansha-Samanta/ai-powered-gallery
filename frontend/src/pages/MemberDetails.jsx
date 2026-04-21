import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/members/${id}`);
        setMember(res.data);
      } catch (err) {
        setError("Member not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f5f7fa",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif", color: "#888", fontSize: 16,
      }}>
        Loading...
      </div>
    );
  }

  if (error || !member) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f5f7fa",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16,
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        <div style={{ color: "#c0392b", fontSize: 15 }}>{error || "Member not found."}</div>
        <button onClick={() => navigate("/view-members")} style={{
          background: "#1a6ed8", color: "#fff", border: "none",
          borderRadius: 6, padding: "8px 20px", fontSize: 13,
          fontWeight: 600, cursor: "pointer",
        }}>
          ← Back to Members
        </button>
      </div>
    );
  }

  const imageUrl = member.profileImage
    ? `${BASE_URL}/uploads/${member.profileImage}`
    : null;

  const initials = member.name
    .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7fa",
      fontFamily: "'Segoe UI', sans-serif",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 16px 60px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        width: "100%",
        maxWidth: 480,
        overflow: "hidden",
      }}>

        {/* ── Top image ── */}
        <div style={{
          width: "100%",
          height: 220,
          background: "#e8f0fe",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "#dce8ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 38, fontWeight: 700, color: "#3a6fd8",
            }}>
              {initials}
            </div>
          )}
        </div>

        {/* ── Name & Degree ── */}
        <div style={{ textAlign: "center", padding: "20px 24px 4px" }}>
          <h2 style={{
            margin: "0 0 4px",
            fontSize: 20,
            fontWeight: 700,
            color: "#1a1a2e",
          }}>
            {member.name}
          </h2>
          <p style={{
            margin: 0,
            fontSize: 13,
            color: "#666",
          }}>
            {member.degree} - {member.year}
          </p>
        </div>

        {/* ── Detail rows ── */}
        <div style={{ padding: "18px 28px 8px" }}>

          {member.rollNumber && (
            <DetailRow label="Roll Number" value={member.rollNumber} />
          )}
          {member.aboutProject && (
            <DetailRow label="Project" value={member.aboutProject} />
          )}
          {member.certificate && (
            <DetailRow label="Certificate" value={member.certificate} />
          )}
          {member.internship && (
            <DetailRow label="Internship" value={member.internship} />
          )}
          {member.aboutYourAim && (
            <DetailRow label="About Your Aim" value={member.aboutYourAim} />
          )}

          {/* Hobbies pills */}
          {member.hobbies && member.hobbies.length > 0 && (
            <div style={{ marginTop: 14, marginBottom: 8 }}>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a2e",
                marginRight: 10,
              }}>
                Hobbies:
              </span>
              <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                {member.hobbies.map((hobby, i) => (
                  <span key={i} style={{
                    background: "#1a6ed8",
                    color: "#fff",
                    borderRadius: 20,
                    padding: "4px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                  }}>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Back button ── */}
        <div style={{ padding: "16px 28px 28px" }}>
          <button
            onClick={() => navigate("/view-members")}
            style={{
              width: "100%",
              background: "#1a6ed8",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "11px 0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#1557b0"}
            onMouseLeave={e => e.currentTarget.style.background = "#1a6ed8"}
          >
            ← Back to Members
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Reusable detail row ───────────────────────────────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div style={{
      display: "flex",
      gap: 8,
      marginBottom: 10,
      fontSize: 13,
      lineHeight: 1.5,
    }}>
      <span style={{ fontWeight: 700, color: "#1a1a2e", whiteSpace: "nowrap" }}>
        {label}:
      </span>
      <span style={{ color: "#444" }}>
        {value}
      </span>
    </div>
  );
}