'use client'
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FestivalCelebration.css';

const FestivalCelebration = ({
  celebration_content,
  celebration_list,
  celebration_year_title,
}) => {
  const mainSliders = useRef([]);
  const thumbSliders = useRef([]);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isRendered, setIsRendered] = useState(false);
  // const [sections, setSections] = useState([]);
  const updateSlidesToShow = () => {
    if (window.innerWidth < 375) {
      setSlidesToShow(2);
    } else if (window.innerWidth < 768) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(4);
    }
  };

  useEffect(() => {
    // const handleResize = () => {
    //   setIsRendered(false);
    //   setTimeout(() => setIsRendered(true), 0);
    // };
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsRendered(false);
    setTimeout(() => setIsRendered(true), 0);
  }, [slidesToShow]);

  return (
    <div className="festival_sec">
      <div className="wrapper">
        <div className="title d_flex">
          <div className="img">
            <img src={`/assets/images/cal.png`} alt="Calendar" />
            {celebration_year_title && <span>{celebration_year_title}</span>}
          </div>
          {celebration_content && (
            <p dangerouslySetInnerHTML={{ __html: celebration_content }}></p>
          )}
        </div>
        <div className="inner">
          {celebration_list.length > 0 &&
            celebration_list.map((section, index) => (
              <div key={index} className="image_text_slider d_flex">
                <div className="left_col">
                  <div className="imagelayer">
                    <Slider
                      asNavFor={thumbSliders.current[index]}
                      ref={(slider) => {
                        if (mainSliders.current[index] !== slider) {
                          mainSliders.current[index] = slider;
                        }
                      }}
                      className="main-slider"
                    >
                      {section.gallery.map((slide, slideIndex) => (
                        <div key={slideIndex}>
                          <img src={slide.url} alt={`Slide ${slideIndex}`} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="layer">
                    <Slider
                      asNavFor={mainSliders.current[index]}
                      ref={(slider) => {
                        if (thumbSliders.current[index] !== slider) {
                          thumbSliders.current[index] = slider;
                        }
                      }}
                      slidesToShow={slidesToShow}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      //centerMode={true}
                      className="thumb-slider"
                    >
                      {section.gallery.map((slide, slideIndex) => (
                        <div key={slideIndex} className="slide-margin">
                          <span
                            style={{ backgroundImage: `url(${slide.url})` }}
                          ></span>
                          {/* <img src={slide.url} alt={`Thumbnail ${slideIndex}`} /> */}
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
                <div className="right_col">
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FestivalCelebration;
