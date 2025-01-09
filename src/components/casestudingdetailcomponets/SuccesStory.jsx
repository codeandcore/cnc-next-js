'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const SuccesStory = ({ title, items,content }) => {
  return (
    <div className="succes-story">
      <div className='wrapper'>
        <div className='succes-inner'>
            <div className='success-output'>
                <h2>{title}</h2>
                <div className='success-item-list'>
                    {items?.map((list,index) => {
                        return (
                            <div className='images-item' key={index}>
                                <div className='mainItemDiv'>
                                    <div className='itemImage'>
                                        <img src={list?.icon?.url}></img>
                                    </div>
                                    <div className='itemContent'>
                                        <h3>{list?.number}</h3>
                                        <span>{list?.sub_title}</span>
                                    </div>
                                </div>
                            </div>
                    )
                    }
                    )}                       
                </div>
             </div>
            <div className='success-content' dangerouslySetInnerHTML={{ __html: content}}>
                      
            </div>
          </div>
        </div>
      </div>
  );
};

export default SuccesStory;