'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const DavelopmentApproach = ({ content,title,image }) => {
  return (
    <div className="developing-section">
      <div className='wrapper'>
        <div className='developing-inner'>
          {title && <div className='developing-content'>
            <h2>{title}</h2>
            <div className='' dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>}
         {image?.url && <div className='developing-img'>
            <img src={image?.url} />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DavelopmentApproach; 