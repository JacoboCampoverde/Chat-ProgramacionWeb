import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css'; 

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.image) {
      const imageUrl = URL.createObjectURL(formData.image);
      onLogin({ ...formData, image: imageUrl });
    } else {
      onLogin(formData);
    }
  };

  return (
    <div className="login-container">
      <h3 htmlFor="inicio">Iniciar Sesión</h3>
      <form className="login-form" onSubmit={handleSubmit}>   
        <div className="form-group">
          <label htmlFor="alias">Alias</label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Gmail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Foto de Perfil</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
