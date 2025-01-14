'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const SolutionSection = ({ title, content, authorname, review_content, reviewLogo, authorImage }) => {
    
  return (
    <div className="solution-section">
      <div className='wrapper'>
        <div className='solution-inner'>
          <div className='solution-content'>
          {title &&  <h2>{title}</h2>}
          {content && <div className='' dangerouslySetInnerHTML={{ __html: content}}></div>}
          </div>
                 {review_content && reviewLogo && authorImage &&  <div className='review'>
                      <div className='imgObj'><img src="/assets/images/quest-icon.svg" alt="" /></div>
                      <div className='review-logo'>
                      <img src={reviewLogo?.url} alt={title} />
                      </div>
                      <div className='review-content'>
                          <p>{review_content}</p>
                      </div>
                      <div className='author-details'>
                          <div className='author-photo'><img src={authorImage?.url}></img></div>
                          <span>{authorname}</span>
                      </div>
                      
                  </div>}
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;