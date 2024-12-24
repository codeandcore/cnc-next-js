'use client'
import React, { useState, useRef, useEffect } from 'react';
import './ProjectContries.css';
import dynamic from 'next/dynamic';
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const ProjectCountries = ({ countries_title, countries_list }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainCarouselRef = useRef(null);
  const thumbsCarouselRef = useRef(null);
  
  const [isPrevHidden, setIsPrevHidden] = useState(true);
  const [isNextHidden, setIsNextHidden] = useState(false);

  if (typeof window !== 'undefined') {
    document.addEventListener(
      'touchstart',
      (e) => {}, 
      { passive: true }
    );
  }

  const updateNavigation = (index) => {
    setCurrentIndex(index);
    setIsPrevHidden(index === 0);
    setIsNextHidden(index === countries_list.length - 1);
  };

  const handleTranslated = (e) => {
    if (e?.item) {
      const index = e.item.index;
      updateNavigation(index);
    }
  };
    
  const mainOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    center: true,
    dots: false,
    animateOut: 'fadeOut',
    touchDrag: false,
    mouseDrag: false,
    onTranslated: handleTranslated,
    startPosition: currentIndex
  }

  const options = {
    items: 4,
    margin: 10,
    dots: false,
    nav: false,
    touchDrag: false,
    center: true,
    mouseDrag: false,
    onTranslated: handleTranslated,
    startPosition: currentIndex,
    responsive: {
      0: { items: 2 },
      768: { items: 3 },
      1024: { items: 5 },
      1280: { items: 6 },
    },
  }

  const handleItemClick = (index) => {
    if (mainCarouselRef.current && mainCarouselRef.current.to) {
      mainCarouselRef.current.to(index);
    }
    if (thumbsCarouselRef.current && thumbsCarouselRef.current.to) {
      thumbsCarouselRef.current.to(index);
    }
    updateNavigation(index);
  };

  const handleNextClick = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < countries_list.length) {
      if (mainCarouselRef.current && mainCarouselRef.current.to) {
        mainCarouselRef.current.to(nextIndex);
      }
      if (thumbsCarouselRef.current && thumbsCarouselRef.current.to) {
        thumbsCarouselRef.current.to(nextIndex);
      }
      updateNavigation(nextIndex);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      if (mainCarouselRef.current && mainCarouselRef.current.to) {
        mainCarouselRef.current.to(prevIndex);
      }
      if (thumbsCarouselRef.current && thumbsCarouselRef.current.to) {
        thumbsCarouselRef.current.to(prevIndex);
      }
      updateNavigation(prevIndex);
    }
  };

  return (
    <div className="project_contries">
      <div className="wrapper d_flex d_flex_jc">
        {countries_title && (
          <h2 dangerouslySetInnerHTML={{ __html: countries_title }}></h2>
        )}
        <div className="nextprev_sec d_flex">
          <div
            className={`prev ${isPrevHidden ? 'hide' : ''}`}
            onClick={handlePrevClick}
          >
            <img src={"/assets/images/arrow_ss1.svg"} alt="previous" />
          </div>
          <div
            className={`next ${isNextHidden ? 'hide' : ''}`}
            onClick={handleNextClick}
          >
            <img src={"/assets/images/arrow_ss1.svg"} alt="next" />
          </div>
        </div>
        <div className="inner">
          <div className="contries_wrap">
            <div className="contries_title">
              <OwlCarousel 
                className="owl-theme" 
                ref={thumbsCarouselRef} 
                {...options}
              >
                {countries_list.map((country, index) => (
                  <div
                    className="col"
                    key={index}
                    onClick={() => handleItemClick(index)}
                  >
                    {country.country_map && (
                      <span>
                        <img
                          src={country.country_map.url}
                          alt={country.country_title}
                        />
                      </span>
                    )}
                    {country.country_title && <h3>{country.country_title}</h3>}
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
          <div className="contries_contain">
            <OwlCarousel 
              className="owl-theme" 
              ref={mainCarouselRef} 
              {...mainOptions}
            >
                {countries_list.map((country, index) => (
                  <div key={index} className="colin d_flex">
                    <div className='left_col'>
                      <div className='top_col d_flex d_flex_at'>
                        {country.country_flag && (
                          <div className='img'>
                            <img src={country.country_flag.url} alt="country flag"/>
                          </div>
                        )}
                        {country.country_content && (
                          <p dangerouslySetInnerHTML={{ __html: country.country_content }}></p>
                        )}
                      </div>
                      {country.country_big_map && (
                        <div className='map'>
                          <img src={country.country_big_map.url} alt={country.country_title}/>
                        </div>
                      )}
                    </div>
                    {country.country_content_list && (
                      <div className='right_col'>
                        {country.country_content_list.map((list, index) => (
                          <div className='coltext d_flex d_flex_at' key={index}>
                            <h4>{list.title}</h4>
                            <p>{list.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCountries;