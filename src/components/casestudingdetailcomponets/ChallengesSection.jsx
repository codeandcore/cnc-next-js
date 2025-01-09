'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const ChallengesSection = ({ title,content,image }) => {
  return (
    <div className="challenging-section">
      <div className='wrapper'>
        <div className='challenging-inner'>
          <div className='challenging-img'>
            <h2>{title}</h2>
           {image?.url && <div className='pain-area-img'>
              <img src={image?.url} alt={title} />
            </div>}
          </div>
         {content && <div className='challenging-content'>
            <div className='' dangerouslySetInnerHTML={{ __html: content}}></div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;