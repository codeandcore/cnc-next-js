'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const DeliverableOutline = ({ title, items }) => {
  return (
    <div className="delevery-outline">
      <div className='wrapper'>
        <div className='delevery-inner'>
          <div className='delevery-content'>
            <h2>{title}</h2>
            <div className='items-repeter'>
                {items?.map((list,index) => {
                    return (
                        <div className='repeterItem' key={index}>
                            <span className='countItem'>{index + 1}</span>
                          
                            <p>{list?.content}</p>
                        </div>
                )
                }
                )}
                          
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DeliverableOutline;