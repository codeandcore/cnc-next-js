'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const PainAreaSection = ({ feature_section_title, features_detail }) => {
  return (
    <div className="pain-area-section">
      <div className='wrapper'>
        <div className='pain-area-inner'>
          <div className='pain-area-content'>
            <h2>Pain Area</h2>
            <p>The primary challenge in this project was to enable users to add an entire product bundle to their cart with a single click, rather than selecting items individually. This feature needed to be implemented seamlessly without compromising user experience. Additionally, maintaining optimal website speed while incorporating custom animations posed a significant challenge, especially given the performance demands of a shopping website. Striking a balance between functionality, aesthetics, and speed was a critical pain point during development.</p>
          </div>
          <div className='pain-area-img'>
            <img src={"/assets/images/intial-goal-image.png"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainAreaSection;