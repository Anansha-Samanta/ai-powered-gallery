import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddMember.css';

const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('${import.meta.env.VITE_API_URL}/api/members', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Team member added successfully!');
      navigate('/view-members');
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add team member. Please try again.');
    }
  };

  return (
    <div className="add-member-container">
      <div className="add-member-card">
        <h1 className="add-member-title">Add Team Member</h1>
        
        <form onSubmit={handleSubmit} className="add-member-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />

          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="form-input"
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
            className="form-input"
          />

          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
            required
            className="form-input"
          />

          <textarea
            name="aboutProject"
            placeholder="About Project"
            value={formData.aboutProject}
            onChange={handleChange}
            className="form-textarea"
            rows="3"
          />

          <input
            type="text"
            name="hobbies"
            placeholder="Hobbies (comma separated)"
            value={formData.hobbies}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="certificate"
            placeholder="Certificate"
            value={formData.certificate}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="internship"
            placeholder="Internship"
            value={formData.internship}
            onChange={handleChange}
            className="form-input"
          />

          <textarea
            name="aboutYourAim"
            placeholder="About Your Aim"
            value={formData.aboutYourAim}
            onChange={handleChange}
            className="form-textarea"
            rows="3"
          />

          <div className="file-input-container">
            <label className="file-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input-hidden"
              />
              <span className="file-input-text">
                Browse... {formData.image ? formData.image.name : 'No file selected'}
              </span>
            </label>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;