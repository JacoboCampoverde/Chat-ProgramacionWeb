import React, { useState, useEffect } from 'react';
import Message from './message';
import Login from './login';
import UserProfile from './userprofile';
import '../styles/chat.css'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userprofile, setUserProfile] = useState({
    alias: '',
    email: '',
    image: '',
  });

  const [typingUsers, setTypingUsers] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    localStorage.clear();
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setLoggedIn(true);
    }
  }, []);
  
  useEffect(() => {
    if (!loaded) {
      const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      setMessages(storedMessages);
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'messages') {
        setMessages(JSON.parse(e.newValue));
      } else if (e.key === 'typing') {
        const typingData = JSON.parse(e.newValue);
        if (typingData && typingData.alias !== userprofile.alias) {
          setTypingUsers(prev => ({ ...prev, [typingData.alias]: typingData.isTyping }));
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
    }, [userprofile.alias]);

   const handleLogin = ({ alias, email, image, password }) => {
    setUserProfile({ alias, email, image, password });
    setLoggedIn(true);
    localStorage.setItem('userprofile', JSON.stringify({ alias, email, image, password }));
  };

  const handleImageChange = (newImage) => {
    const imageUrl = URL.createObjectURL(newImage);
    setUserProfile(prevProfile => ({ ...prevProfile, image: imageUrl }));
    localStorage.setItem('userprofile', JSON.stringify({ ...userprofile, image: imageUrl }));
  };

  const handleBlockContact = () => {
    alert(`Contacto ${userprofile.alias} bloqueado.`);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '' && attachedFiles.length === 0) return;
    const newMessage = {
      text: inputText,
      files: attachedFiles.map(file => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      })),
      sender: userprofile.alias,
      image: userprofile.image,
      timestamp: new Date().toLocaleString(), 
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setAttachedFiles([]);
    setTypingUsers(prev => ({ ...prev, [userprofile.alias]: false }));
    localStorage.setItem('typing', JSON.stringify({ alias: userprofile.alias, isTyping: false }));
  };

  const handleEditMessage = (index, newText) => {
    const updatedMessages = [...messages];
    updatedMessages[index].text = newText;
    setMessages(updatedMessages);
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setTypingUsers(prev => ({ ...prev, [userprofile.alias]: true }));
    localStorage.setItem('typing', JSON.stringify({ alias: userprofile.alias, isTyping: true }));
  };

  const handleInputBlur = () => {
    setTypingUsers(prev => ({ ...prev, [userprofile.alias]: false }));
    localStorage.setItem('typing', JSON.stringify({ alias: userprofile.alias, isTyping: false }));
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(files);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {loggedIn ? (
        <>
         <UserProfile
           alias={userprofile.alias}
           email={userprofile.email}
           image={userprofile.image}
           onImageChange={handleImageChange}
           onBlockContact={handleBlockContact}
         />             
      <div className="messages-container">
      {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              files={message.files}
              sender={message.sender}
              image={message.image}
              timestamp={message.timestamp}
              onEdit={
                message.sender === userprofile.alias
                  ? () => {
                      const newText = prompt('Edita tu mensaje:', message.text);
                      handleEditMessage(index, newText);
                    }
                  : null
              }
              onDelete={
                message.sender === userprofile.alias
                  ? () => handleDeleteMessage(index)
                  : null
              }
            />
        ))}
            {Object.keys(typingUsers).map(user => 
              user !== userprofile.alias && typingUsers[user] && (
                <div key={user} className="typing-indicator">
                  {user} está escribiendo...
                </div>
        )
      )}  
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          onBlur={handleInputBlur}
          placeholder="Escribe un mensaje..."
        />
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
      </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Chat;
