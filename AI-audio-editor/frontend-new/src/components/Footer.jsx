import React from 'react';

const Footer = () => (
  <footer
    style={{
      position: 'fixed',      // stay fixed at bottom
      bottom: 0,
      left: 0,
      width: '100%',          // span full width
      textAlign: 'center',
      padding: '10px 0',      // more comfortable padding
      background: 'linear-gradient(90deg, #36363eff, #16043d)',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      zIndex: 1000,           // ensure it stays on top
    }}
  >
    <p style={{ margin: '5px 0' }}>
      © {new Date().getFullYear()} Anothjeev - All rights reserved
    </p>
    <p style={{ margin: '5px 0' }}>
      <a
        href="https://www.linkedin.com/in/anothjeev-a-29b253196/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#0e76a8', // LinkedIn blue
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.color = '#fff')}
        onMouseOut={(e) => (e.target.style.color = '#0e76a8')}
      >
        LinkedIn Profile
      </a>
    </p>
  </footer>
);

export default Footer;
