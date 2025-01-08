'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const PortfolioFeaturedImage = ({ featured_image_url }) => {
  // State to track active feature

  // Function to handle tab click

  return (

    <div className="portfolio-image-section">
        <div className='wrapper'>
            <img
            src={featured_image_url}
            alt={"portfolio-image"}
            />
        </div>
    </div>

  );
};

export default PortfolioFeaturedImage;