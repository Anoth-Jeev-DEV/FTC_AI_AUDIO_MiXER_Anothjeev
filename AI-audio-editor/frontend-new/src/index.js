import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // optional CSS reset


// Apply global body styles to remove white borders
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.boxSizing = 'border-box';
document.body.style.height = '100%';
document.body.style.width = '100%';
document.body.style.background = 'linear-gradient(135deg, #800f97ff, #0b111bff)';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.overflowX = 'hidden'; // prevent horizontal scroll if any

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
