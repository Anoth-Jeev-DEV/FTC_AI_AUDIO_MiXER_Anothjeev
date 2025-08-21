import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import displayImage from '../assets/fblogo.png';
import audioIcon from '../assets/ftc.png';
import Footer from './Footer';

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [numBgms, setNumBgms] = useState(1);
  const [wishName, setWishName] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [editedAudioUrl, setEditedAudioUrl] = useState(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    "உங்கள் ஒலிப்பதிவுகளை சிறப்பிக்க இந்த செயலியை பயன்படுத்துங்கள். அதி திறன் வாய்ந்த AI தொழில்நுட்பம் உங்கள் பிறந்த நாள் வாழ்த்துக்களை பின்னணி இசை கொடுத்து வழங்க காத்திருக்கிறது",
    "The ultimate tool to create personalized voice wishes effortlessly. Automatically mixes your voice with Tamil BGMs using AI technology",
    "நண்பர்களால் நண்பர்களுக்காக ...... "
  ];

  // Handle mobile resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loop the texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % texts.length);
    }, 4000); // change text every 4 seconds
    return () => clearInterval(interval);
  }, [texts.length]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('voice', file);
    formData.append('num_bgms', numBgms);

    try {
      const response = await axios.post('http://127.0.0.1:5000/edit-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setEditedAudioUrl(url);

    } catch (error) {
      console.error('Error editing audio:', error);
      alert('Failed to edit audio. Please try again.');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!editedAudioUrl) return;
    const a = document.createElement('a');
    a.href = editedAudioUrl;
    a.download = wishName.trim() !== '' ? `${wishName.trim()}.mp3` : 'edited_wish.mp3';
    a.click();
  };

  const handleTryAgain = () => {
    setEditedAudioUrl(null);
    setProgress(0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #800f97ff, #0b111bff)',
      color: '#fff',
      padding: '20px 10px',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Full-page Gang Logo */}
      <motion.img
        src={displayImage}
        alt="Gang Logo Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 100,
          width: '50%',
          height: '90%',
          objectFit: 'cover',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: '28px', color: '#f4d801ff', marginBottom: '20px', textAlign: 'center', zIndex: 1 }}
      >
        FTC AI Audio Mixer
      </motion.h1>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        justifyContent: 'center',
        gap: '30px',
        width: '100%',
        maxWidth: '1100px',
        marginBottom: '40px',
        zIndex: 1
      }}>
        {/* Left Side: Text */}
        <div style={{
          flex: isMobile ? 'unset' : 0.6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isMobile ? 'center' : 'flex-start',
          minHeight: '300px',
          padding: '0 10px',
          textAlign: isMobile ? 'center' : 'left',
          position: 'relative'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              style={{ maxWidth: '500px', fontSize: '18px', lineHeight: '1.8' }}
            >
              {texts[currentTextIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Upload Container */}
        <div style={{
          flex: isMobile ? 'unset' : 0.35,
          width: isMobile ? '90%' : '300px',
          minHeight: 'auto',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '25px 15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <motion.img
            src={audioIcon}
            alt="Audio"
            style={{ width: '120px', borderRadius: '50%', boxShadow: '0 0 20px #ff6ec7,0 0 40px #ff6ec7,0 0 60px #ff6ec7' }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <h2 style={{ color: '#ff6ec7', margin: 0 }}>Upload Your Voice Wish </h2>
          Merge, clean, and correct audio before upload

          {!editedAudioUrl && (
            <>
              <input
                type="text"
                placeholder="Enter the wish name"
                value={wishName}
                onChange={e => setWishName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', outline: 'none', background: 'rgba(38,9,225,0.15)', color:'#fff', fontSize:'14px' }}
              />
              <input
                type="file"
                accept="audio/*"
                onChange={e => setFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', outline: 'none', background: 'rgba(255,255,255,0.15)', color:'#fff', fontSize:'14px' }}
              />
              <select
                value={numBgms}
                onChange={e => setNumBgms(parseInt(e.target.value))}
                style={{ width:'100%', padding:'8px', borderRadius:'8px', border:'none', background:'rgba(255,255,255,0.15)', color:'#000', cursor:'pointer' }}
              >
                {[1,2,3].map(n => <option key={n} value={n}>{n} BGM</option>)}
              </select>
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                style={{ width:'100%', padding:'12px', borderRadius:'10px', border:'none', background: loading ? '#999':'linear-gradient(90deg,#6d68f9ff,#ff6ec7ff)', color:'#0d0d0dff', fontWeight:'600', cursor: loading ? 'not-allowed':'pointer' }}
              >
                {loading ? 'Processing...':'Edit'}
              </button>
              {loading && (
                <div style={{ width:'100%' }}>
                  <div style={{height:'8px', background:'rgba(255,255,255,0.15)', borderRadius:'6px', overflow:'hidden'}}>
                    <motion.div initial={{width:0}} animate={{width:`${progress}%`}} transition={{duration:0.3}} style={{height:'100%', background:'linear-gradient(90deg,#ff6ec7,#d200b3ff)', borderRadius:'6px'}}/>
                  </div>
                </div>
              )}
            </>
          )}

          {editedAudioUrl && (
            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'10px', alignItems:'center' }}>
              <audio controls src={editedAudioUrl} style={{ width:'100%' }} />
              <div style={{ display:'flex', gap:'10px', width:'100%' }}>
                <button onClick={handleDownload} style={{ flex:1, padding:'10px', borderRadius:'8px', border:'none', background:'#6d68f9ff', color:'#fff', fontWeight:'600' }}>Download</button>
                <button onClick={handleTryAgain} style={{ flex:1, padding:'10px', borderRadius:'8px', border:'none', background:'#ff6ec7ff', color:'#0d0d0dff', fontWeight:'600' }}>Try Again</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ width:'100%', paddingTop:'25px', paddingBottom:'40px', zIndex: 1 }}>
        <Footer isHamburgerWhite={isMobile} />
      </div>
    </div>
  );
};

export default AudioUploader;
