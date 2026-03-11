import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="circle-left"></div>
      <div className="circle-right"></div>

      <div className="title">
        <span>ANDR</span>
        <span className="star">✦</span>
        <span>MEDA</span>
      </div>

      <button
        className="enter-btn"
        onClick={() => navigate("/login")}
      >
        Enter →
      </button>
    </div>
  );
}