'use client'
import React, { useState } from 'react';
import './PortfolioFeatures.css';

const UniqueElements = ({ title, items }) => {
  return (
    <div className="unique-elements">
      <div className='wrapper'>
        <div className='unique-inner'>
            <h2>{title}</h2>
            <div className='repeter-images'>
                {items?.map((list,index) => {
                    return (
                        <div className='images-item' key={index}>
                            <div className='mainItemDiv'>
                                <div className='itemImage'>
                                    <img src={list?.image?.url}></img>
                                </div>
                                <div className='itemContent'>
                                    <h3>{list?.title}</h3>
                                    <p>{list?.content}</p>
                                </div>
                            </div>
                        </div>
                )
                }
                )}
                          
            </div>
          </div>
         
        </div>
      </div>
  );
};

export default UniqueElements;