import React from 'react';
import '../../css/HowItWorks.css'

export const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <div className="header">
        <h1>How It Works?</h1>
      </div>
      <div className="content">
        <div className="left-section">
          <h2>Want to introduce yourself to an employee?</h2>
          <div className="stage">
            <span className="stage-number">1.</span> Register easily and post an ad
          </div>
          <div className="stage">
            <span className="stage-number">2.</span> Looking for a convenient and advanced system
          </div>
          <div className="stage">
            <span className="stage-number">3.</span> Apply with a click and get an answer... or wait for inquiries
          </div>
          <div className="stage">
            <span className="stage-number">4.</span> Make contact
          </div>
        </div>
        <div className="divider"></div>
        <div className="right-section">
          <h2>Want to find a professional?</h2>
          <div className="stage">
            <span className="stage-number">1.</span> Create a free personal profile
          </div>
          <div className="stage">
            <span className="stage-number">2.</span> Looking for a convenient and advanced system
          </div>
          <div className="stage">
            <span className="stage-number">3.</span> Find the most suitable professional for you
          </div>
        </div>
      </div>
    </div>
  );
};

