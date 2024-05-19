import React from 'react';
import PropTypes from 'prop-types';
import '../styles/user.css'; // Importa el archivo de estilos del usuario

const User = ({ alias, image }) => {
  return (
    <div className="user-container">
      <img className="user-image" src={image} alt={alias} />
      <div className="user-alias">{alias}</div>
    </div>
  );
};

User.propTypes = {
  alias: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default User;
