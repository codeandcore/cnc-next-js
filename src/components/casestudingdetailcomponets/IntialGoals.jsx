'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const IntialGoals = ({ feature_section_title, features_detail }) => {
  return (
    <div className="intial-goal">
      <div className='wrapper'>
        <div className='intial-inner'>
          <div className='intial-goal-content'>
            <h2>initial goal</h2>
            <p>One of our esteemed European clients in the clothing industry envisioned an online shopping store that would stand out for its simplicity, elegance, and efficiency. They aimed for a design that was clean and modern, reflecting their brand's professional image and aligning with the dynamic trends of the fashion world. Additionally, the platform needed to be developed swiftly and seamlessly, ensuring timely delivery without compromising quality. A key priority was creating an intuitive and user-friendly experience that would make online shopping easy and enjoyable for customers, ultimately boosting engagement and driving sales in the competitive clothing market.</p>
          </div>
          <div className='intial-goal-img'>
            <img src={"/assets/images/intial-goal-image.png"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntialGoals;