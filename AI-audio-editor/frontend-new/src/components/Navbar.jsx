import React, { useState } from 'react';
import logo from '../assets/ftcaudio.png';  // correct relative path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '6px 20px', // smaller height
        background: 'linear-gradient(90deg, #482d65ff, #16043dff)', 
        color: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        position: 'relative'
      }}
    >
      {/* Logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '70px' }} // smaller logo for balance
        />
        <h1 style={{ fontSize: '22px', margin: 0 }}>Friends Tamil Chat</h1>
      </div>

      {/* Desktop Menu */}
      <div className="nav-links" style={styles.navLinks}>
        <a href="https://www.friendstamilchat.net/chat/" style={styles.link}>Chat</a>
        <a href="https://www.friendstamilchat.in/forum/" style={styles.link}>Forum</a>
        <a href="https://www.friendstamilchat.net/fm.php" style={styles.link}>FM</a>
        <a href="https://friendstamilmp3.net/" style={styles.link}>Mp3</a>
      </div>

      {/* Hamburger Button */}
      <div className="hamburger" style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={styles.mobileMenu}>
          <a href="#chat" style={styles.mobileLink}>Chat</a>
          <a href="#forum" style={styles.mobileLink}>Forum</a>
          <a href="#fm" style={styles.mobileLink}>FM</a>
          <a href="#mp3" style={styles.mobileLink}>Mp3</a>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navLinks: {
    display: 'flex',
    gap: '25px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '18px',
    transition: 'color 0.3s ease',
  },
  hamburger: {
    display: 'none', // hidden on desktop
    flexDirection: 'column',
    cursor: 'pointer',
    gap: '4px',
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: 'yellow',
    borderRadius: '2px',
  },
  mobileMenu: {
    position: 'absolute',
    top: '60px',
    right: '20px',
    background: '#fff',
    color: '#000',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    zIndex: 1000,
  },
  mobileLink: {
    padding: '10px',
    textDecoration: 'none',
    color: '#020202ff',
    fontWeight: '600',
    fontSize: '16px',
  },
};

// Apply hover via CSS injection
const addHoverEffect = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    nav a:hover {
      color: blue !important;
    }
    @media (max-width: 768px) {
      .nav-links {
        display: none !important; /* hide desktop menu */
      }
      .hamburger {
        display: flex !important; /* show hamburger */
      }
    }
  `;
  document.head.appendChild(style);
};
addHoverEffect();

export default Navbar;
