'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const IntialGoals = ({ title,content,image }) => {
  return (
    <div className="intial-goal">
      <div className='wrapper'>
        <div className='intial-inner'>
          <div className='intial-goal-content'>
          <h2>{title}</h2>
          <div className='' dangerouslySetInnerHTML={{ __html: content}}></div>
          </div>
          <div className='intial-goal-img'>
          <img src={image?.url} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntialGoals;