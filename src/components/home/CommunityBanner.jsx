import React from 'react';
import '../../css/home.css';

const CommunityBanner = () => {
  return (
    <div className="community-banner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/community.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="community-banner-title">Time to find good people!</div>
      <div className="community-banner-subtitle">A smart job board for the home and family</div>
    </div>
  );
}

export default CommunityBanner;

