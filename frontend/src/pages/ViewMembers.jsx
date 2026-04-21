import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const MemberCard = ({ member, onViewDetails }) => {
  const imageUrl = member.profileImage
    ? `${BASE_URL}/uploads/${member.profileImage}`
    : null;

  const initials = member.name
    .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.10)";
      }}
    >
      {/* Image area */}
      <div style={{
        width: "100%",
        height: 180,
        background: "#f0f4ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "#dce8ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 700, color: "#3a6fd8",
            fontFamily: "sans-serif",
          }}>
            {initials}
          </div>
        )}
      </div>

      {/* Info area */}
      <div style={{
        padding: "16px 16px 20px",
        textAlign: "center",
        width: "100%",
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 15,
          color: "#1a1a2e",
          marginBottom: 4,
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          {member.name}
        </div>
        <div style={{
          fontSize: 13,
          color: "#555",
          marginBottom: 14,
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          Roll Number: {member.rollNumber}
        </div>
        <button
          onClick={() => onViewDetails(member._id)}
          style={{
            background: "#1a6ed8",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 24px",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.05em",
            cursor: "pointer",
            fontFamily: "'Segoe UI', sans-serif",
            textTransform: "uppercase",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#1557b0"}
          onMouseLeave={e => e.currentTarget.style.background = "#1a6ed8"}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/members`);
        setMembers(res.data);
      } catch (err) {
        setError("Failed to load members. Make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

// REPLACE the entire return block's outer div and grid div:

return (
  <div style={{
    minHeight: "100vh",
    background: "#f5f7fa",
    fontFamily: "'Segoe UI', sans-serif",
  }}>
    {/* Header */}
    <div style={{
      background: "#fff",
      borderBottom: "1px solid #e8eaf0",
      padding: "16px 32px",           // ← reduced from 40px
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>
        Team Members
      </h2>
      <button
        onClick={() => navigate("/add-member")}
        style={{
          background: "#1a6ed8", color: "#fff", border: "none",
          borderRadius: 6, padding: "8px 20px", fontSize: 13,
          fontWeight: 600, cursor: "pointer",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#1557b0"}
        onMouseLeave={e => e.currentTarget.style.background = "#1a6ed8"}
      >
        + Add Member
      </button>
    </div>

    {/* Page title */}
    <div style={{ textAlign: "center", padding: "28px 32px 16px" }}>
      <h1 style={{
        margin: 0, fontSize: 26, fontWeight: 800, color: "#1a6ed8",
        letterSpacing: "0.04em", textTransform: "uppercase",
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        Meet Our Amazing Team
      </h1>
    </div>

    {/* Content */}
    <div style={{ padding: "0 32px 60px" }}>   {/* ← reduced side padding */}
      {loading ? (
        <div style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", height: 200, color: "#888", fontSize: 15,
        }}>
          Loading members...
        </div>
      ) : error ? (
        <div style={{
          background: "#fff0f0", border: "1px solid #ffcccc",
          borderRadius: 8, padding: "16px 20px", color: "#c0392b", fontSize: 14,
        }}>
          {error}
        </div>
      ) : members.length === 0 ? (
        <div style={{
          textAlign: "center", color: "#aaa", fontSize: 15, padding: "80px 0",
        }}>
          No members found. Add your first member!
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",  // ← fixed 3 columns always
          gap: 22,
        }}>
          {members.map(member => (
            <MemberCard
              key={member._id}
              member={member}
              onViewDetails={(id) => navigate(`/member/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);
}