'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const DavelopmentApproach = ({ content,title,image }) => {
  return (
    <div className="pain-area-section">
      <div className='wrapper'>
        <div className='pain-area-inner'>
          <div className='pain-area-content'>
            <h2>{title}</h2>
            <div className='' dangerouslySetInnerHTML={{ __html: content}}></div>
          </div>
          <div className='pain-area-img'>
            <img src={image?.url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DavelopmentApproach;