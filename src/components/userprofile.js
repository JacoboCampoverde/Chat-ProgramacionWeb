import React from 'react';
import PropTypes from 'prop-types';
import '../styles/userprofile.css';

const UserProfile = ({ alias, email, image, onImageChange, onBlockContact }) => {
  return (
    <div className="user-profile">
      <div className="profile-pic-container">
        <img src={image} alt="Profile" className="profile-pic" />
      </div>
      <div className="user-details">
        <span className="user-alias">{alias}</span>
        <span className="user-email">{email}</span>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={e => onImageChange(e.target.files[0])}
      />
      <button onClick={onBlockContact}>Block Contact</button>
    </div>
  );
};

UserProfile.propTypes = {
  alias: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string,
  onImageChange: PropTypes.func.isRequired,
  onBlockContact: PropTypes.func.isRequired,
};

export default UserProfile;
