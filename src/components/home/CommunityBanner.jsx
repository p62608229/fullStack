import React from 'react';
import '../../css/home.css';

const CommunityBanner = () => {
  return (
    <div className="community-banner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/community.jpg)`, backgroundSize: 'contain', backgroundPosition: 'center' }}>
      <div className="community-banner-title">working for you</div>
      <div className="community-banner-subtitle">A smart job board for home and family</div>
    </div>
  );
}

export default CommunityBanner;

