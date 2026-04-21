import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homeNew.css';

const homeNew = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="team-title">TEAM BLUE</h1>
        <p className="welcome-text">Welcome to the BLUE Team Management</p>
        
        <div className="manage-team-card">
          <h2 className="card-title">Manage Team</h2>
          <div className="button-group">
            <button 
              className="home-button add-button"
              onClick={() => navigate('/add-member')}
            >
              Add<br/>Member
            </button>
            <button 
              className="home-button view-button"
              onClick={() => navigate('/view-members')}
            >
              View<br/>Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homeNew;