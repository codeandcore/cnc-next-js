'use client'
import React, { useState, useRef } from 'react';
import dynamic from "next/dynamic";
import './YearOfGrowing.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CustomDots = ({ year_of_growing, activeIndex, handleClick }) => {
  return (
    <>
      {year_of_growing && (
        <div className="custom-dots year d_flex d_flex_at">
          {year_of_growing.map((item, index) => (
            <div
              key={index}
              className={`col ${index === activeIndex ? 'active' : ''} `}
              onClick={() => handleClick(index)}
            >
              <span>{item.a_yog_year}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const YearOfGrowing = React.memo(
  ({
    a_y_left_side_title,
    a_y_right_side_description,
    year_of_growing,
    a_y_codeandcore_highlights,
  }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    var $ = require("jquery");
    if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
    }
    
    const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
    });

    const handleDotClick = (index) => {
      if (carouselRef.current) {
        carouselRef.current.to(index);
        setActiveIndex(index);
      }
    };

    const handlePrevClick = () => {
      if (activeIndex > 0) {
        carouselRef.current.prev();
        setActiveIndex(
          (activeIndex - 1 + year_of_growing.length) % year_of_growing.length,
        );
      }
    };

    const handleNextClick = () => {
      if (activeIndex < year_of_growing.length - options1.items) {
        carouselRef.current.next();
        setActiveIndex((activeIndex + 1) % year_of_growing.length);
      }
    };

    const handleSliderDrag = (event) => {
      setActiveIndex(event.page.index);
    };
    const options1 = {
      items: 1,
      nav: false,
      loop: false,
      dots: false,
      // autoHeight: true, // Part of options object
      onDragged: handleSliderDrag,
    };
    const liferenderMarquee = () => {
      if (a_y_codeandcore_highlights && a_y_codeandcore_highlights.length > 0) {
        return (
          <div className="marquee" style={{ animationDuration: '50s' }}>
            {a_y_codeandcore_highlights &&
              a_y_codeandcore_highlights.map((item, idx) => (
                <div className="item" key={idx}>
                  <img src={"/assets/images/ellipse_c.png"} alt="circle" />
                  {item.a_y_h_label}
                </div>
              ))}
          </div>
        );
      }
    };
    return (
      <div className="year_of_growing">
        <div className="wrapper">
          <div className="top_col d_flex d_flex_at">
            {a_y_left_side_title && <h2>{a_y_left_side_title}</h2>}
            {a_y_right_side_description && <p>{a_y_right_side_description}</p>}
          </div>
          <div className="client_slider">
            <CustomDots
              year_of_growing={year_of_growing}
              activeIndex={activeIndex}
              handleClick={handleDotClick}
            />
            <div className="nextprev_sec d_flex">
              <div
                className={`prev ${activeIndex === 0 ? 'hide' : ''}`}
                onClick={handlePrevClick}
              >
                <img src={"/assets/images/arrow_ss1.svg"} alt="Previous" />
              </div>
              <div
                className={`next ${activeIndex === year_of_growing.length - 1 ? 'hide' : ''}`}
                onClick={handleNextClick}
              >
                <img src={"/assets/images/arrow_ss1.svg"} alt="Next" />{' '}
              </div>
            </div>
            {year_of_growing && (
              <div className="year_of_contants">
                <OwlCarousel className="owl-theme" ref={carouselRef }
                  {...options1}>
                  {year_of_growing.map((item, index) => (
                    <div className="col d_flex d_flex_at" key={index}>
                      <div className="left">
                        <h3>
                          {item.a_yog_title.replace(/<\/?br\s*\/?>/gi, ' ')}
                        </h3>
                        <p>
                          {item.a_yog_content.replace(/<\/?br\s*\/?>/gi, ' ')}
                        </p>
                      </div>
                      <div className="right">
                       
                        <img src={item.a_yog_image.url} />
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            )}
          </div>
        </div>
        {a_y_codeandcore_highlights && (
          <div className="client_plateform">
            <div className="marquee_wrap">
              {liferenderMarquee()}
              {liferenderMarquee()}
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default YearOfGrowing;
