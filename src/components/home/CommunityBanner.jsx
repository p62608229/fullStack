import React from 'react';

const CommunityBanner = () => {
  const containerStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/community.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    padding: '20px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Time to find good people!</div>
      <div style={subtitleStyle}>A smart job board for the home and family</div>
    </div>
  );
}

export default CommunityBanner;
