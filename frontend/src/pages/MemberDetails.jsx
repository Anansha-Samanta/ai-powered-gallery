import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MemberDetails.css';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberDetails();
  }, [id]);

  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/members/${id}`);
      setMember(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching member details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="member-details-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="member-details-container">
        <div className="error">Member not found</div>
      </div>
    );
  }

  return (
    <div className="member-details-container">
      <div className="member-details-card">
        <div className="member-header">
          {member.image ? (
            <img 
              src={`http://localhost:5000/uploads/${member.image}`} 
              alt={member.name}
              className="member-detail-image"
            />
          ) : (
            <div className="member-detail-placeholder">
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="member-detail-name">{member.name}</h1>
          <p className="member-detail-degree">{member.degree}</p>
        </div>

        <div className="member-details-content">
          <div className="detail-row">
            <span className="detail-label">Roll Number:</span>
            <span className="detail-value">{member.rollNumber}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Year:</span>
            <span className="detail-value">{member.year}</span>
          </div>

          {member.hobbies && (
            <div className="detail-row">
              <span className="detail-label">Hobbies:</span>
              <span className="detail-value">{member.hobbies}</span>
            </div>
          )}

          {member.certificate && (
            <div className="detail-row">
              <span className="detail-label">Certificate:</span>
              <span className="detail-value">{member.certificate}</span>
            </div>
          )}

          {member.internship && (
            <div className="detail-row">
              <span className="detail-label">Internship:</span>
              <span className="detail-value">{member.internship}</span>
            </div>
          )}

          {member.aboutProject && (
            <div className="detail-section">
              <h3 className="section-title">About Project</h3>
              <p className="section-text">{member.aboutProject}</p>
            </div>
          )}

          {member.aboutYourAim && (
            <div className="detail-section">
              <h3 className="section-title">About Your Aim</h3>
              <p className="section-text">{member.aboutYourAim}</p>
            </div>
          )}
        </div>

        <button 
          className="back-detail-button"
          onClick={() => navigate('/view-members')}
        >
          Back to Members
        </button>
      </div>
    </div>
  );
};

export default MemberDetails;