import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/message.css'; 

const Message = ({ text, files, sender, image, timestamp, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`message ${sender === 'me' ? 'sent' : 'received'}`} onClick={handleClick}>
      <div className="message-header">
        {image && <img src={image} alt="Profile" className="message-profile-pic" />}
        <div className="message-sender">{sender}</div>
      </div>
      {showMenu && (
        <div className="message-menu">
          {onEdit && <button onClick={() => onEdit()}>Editar</button>}
          {onDelete && <button onClick={() => onDelete()}>Eliminar</button>}
        </div>
      )}
      <div className="message-content">
        <div className="message-text">{text}</div>
        {files && files.map((file, index) => (
          <div key={index}>
            <a href={file.url} download={file.name}>
              {file.name} ({file.type})
            </a>
          </div>
        ))}
      </div>
      <div className="message-timestamp">{timestamp}</div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  })),
  sender: PropTypes.string.isRequired,
  image: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Message;
