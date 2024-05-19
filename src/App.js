import React from 'react';
import Chat from './components/chat';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatcito</h1>
        <Chat /> {/* Utiliza el componente Chat */}
      </header>

    </div>
  );
}

export default App;