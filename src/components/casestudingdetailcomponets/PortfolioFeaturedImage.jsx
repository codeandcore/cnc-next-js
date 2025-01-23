'use client'
import React, { useEffect, useState } from 'react';
import './PortfolioFeatures.css';
import { useRef } from 'react';

const PortfolioFeaturedImage = ({ featured_image_url, videoUrl }) => {
  const ref=useRef(null)
  useEffect(() => {
    if (videoUrl) {      
      const observer = new IntersectionObserver(
        ([entry]) => {
          const element = document.querySelector(".portfolio-image-section");
          if (entry.isIntersecting) {
            if (element) {
              setTimeout(() => {
                element.classList.add("active_video");
              }, 1000);
            }
          } else {
            if (element) {
              element.classList.remove("active_video");
            }
          }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, []);


  return (
    <div ref={ref} className="portfolio-image-section">
        <div className='wrapper'>
            <div className='image-inner'>
                <img src={featured_image_url}alt={"portfolio-image"} className="portfolioImage"/>
               {videoUrl && <video autoPlay loop muted controls  preload="metadata" className="portfolioVideo">
                  <source src={videoUrl?.url} type="video/mp4" />
                </video>}
            </div>
        </div>
    </div>
  );
};

export default PortfolioFeaturedImage;