import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ViewMembers.css';

const ViewMembers = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="view-members-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="view-members-container">
      <h1 className="view-members-title">Team Members</h1>
      
      <div className="members-grid">
        {members.length === 0 ? (
          <p className="no-members">No team members added yet.</p>
        ) : (
          members.map(member => (
            <div 
              key={member._id} 
              className="member-card"
              onClick={() => navigate(`/member/${member._id}`)}
            >
              <div className="member-image-container">
                {member.image ? (
                  <img 
                    src={`http://localhost:5000/uploads/${member.image}`} 
                    alt={member.name}
                    className="member-image"
                  />
                ) : (
                  <div className="member-image-placeholder">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.degree}</p>
                <p className="member-year">Year: {member.year}</p>
                <p className="member-roll">Roll: {member.rollNumber}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/team')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ViewMembers;