'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const ChallengesSection = ({ title,content,image }) => {
  return (
    <div className="challenging-section">
      <div className='wrapper'>
        <div className='challenging-inner'>
          <div className='challenging-content'>
            <h2>{title}</h2>
            <div className='' dangerouslySetInnerHTML={{ __html: content}}></div>
          </div>
          <div className='challenging-img'>
          <div className='pain-area-img'>
            <img src={image?.url} alt={title} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;