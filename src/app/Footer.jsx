import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#443f3f',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed', // Set position to fixed
    bottom: 0, // Align to the bottom of the viewport
    left: 0, // Align to the left edge of the viewport
    width: '100%', // Occupy full width
  };

  return (
    <footer style={footerStyle}>
      We are not responsible for content uploaded to the Helpbook by users. Employers are responsible for hiring as required. <br />
      © 2011-2024 All rights reserved to Kasliva Ltd.
    </footer>
  );
}

export default Footer;
