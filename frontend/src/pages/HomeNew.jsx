import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeNew.css';

const HomeNew = () => {
  const navigate = useNavigate();

  return (
    <div className="homenew-container">
      {/* Navigation Button on Right */}
      <button 
        className="nav-button-right"
        onClick={() => navigate('/home')}
      >
        Back to Main
      </button>

      <div className="homenew-content">
        <h1 className="team-title">TEAM BLUE</h1>
        <p className="welcome-text">Welcome to the BLUE Team Management</p>
        
        <div className="manage-team-card">
          <h2 className="card-title">Manage Team</h2>
          <div className="button-group">
            <button 
              className="homenew-button add-button"
              onClick={() => navigate('/add-member')}
            >
              Add<br/>Member
            </button>
            <button 
              className="homenew-button view-button"
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

export default HomeNew;