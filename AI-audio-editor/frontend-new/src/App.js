import React from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AudioUploader from './components/AudioUploader.jsx';
import './App.css'; // keep your existing CSS if needed

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #800f97ff, #0b111bff)',
      overflowX: 'hidden'
    }}>
      <Navbar />
      <div style={{ flex: 1, width: '100%' }}>
        <AudioUploader />
      </div>
      <Footer />
    </div>
  );
}

export default App;
