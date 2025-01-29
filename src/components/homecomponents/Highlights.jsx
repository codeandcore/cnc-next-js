'use client';
import React, { useState, useRef, useEffect } from 'react';
import './Highlights.css';
// import ArrowsIcon from '../../assets/images/arrow_ss1.svg';
import UseOnScreen from '../UseOnScreen';
import Link from 'next/link';
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import moment from 'moment';
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const Highlights = ({
  className,
  our_blogs_title,
  our_blogs_subtitle,
  our_blogs,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {

  const owlCarouselRef = useRef(null);
  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  const handleTranslated = () => {
    if (owlCarouselRef.current && owlCarouselRef.current.props) {
      const itemCount = owlCarouselRef.current.props.children.length - 3;
      const currentIndex = owlCarouselRef.current.currentPosition;
    }
  };
  const options = {
    items: 5,
    loop: false,
    nav: true,
    dots: false,
    autoWidth: true,
    onTranslated: handleTranslated,
    startPosition: 0
  };

  // const handleNext = () => {
  //   if (owlCarouselRef.current) {
  //     console.log('owlCarouselRef.current', owlCarouselRef.current);
  //     owlCarouselRef.current.next();
  //     handleTranslated();
  //   }
  // };


  // const handlePrev = () => {
  //   if (owlCarouselRef.current) {
  //     console.log('owlCarouselRef.current1', owlCarouselRef);
  //     owlCarouselRef.current.prev();
  //     handleTranslated();
  //   }
  // };
  const [sliderStyles, setSliderStyles] = useState({});
  const wrapperRef = useRef(null);
  useEffect(() => {
      const adjustSliderPosition = () => {
        if (wrapperRef.current) {
          const wrapperWidth = wrapperRef.current.offsetWidth; // Wrapper width in pixels
          const screenWidth = window.innerWidth; // Full screen width in pixels
          const sliderLeft = (screenWidth - wrapperWidth) / 2;
  
          console.log(sliderLeft);
          // Set styles to align the slider
          setSliderStyles({
            paddingLeft: `${sliderLeft}px`, // Offset slider to start from the left edge
          });
        }
      };
  
      adjustSliderPosition();
      window.addEventListener("resize", adjustSliderPosition); // Recalculate on window resize
  
      return () => {
        window.removeEventListener("resize", adjustSliderPosition);
      };
    }, []);

  useEffect(() => {
    handleTranslated();
  }, [owlCarouselRef]);

  return (
    <div
      className="our_highlights"
    //  ref={ref}
    //  className={`our_highlights ${className} ${isVisible ? 'On-screen' : ''}`}
    >
      <div className="wrapper" ref={wrapperRef}>
        {our_blogs_title && <h2>{our_blogs_title}</h2>}
        {our_blogs_subtitle && <p>{our_blogs_subtitle}</p>}
        {/* <div className='nextprev_sec d_flex'>
          <div 
            className={`prev ${isPrevDisabled ? 'hide' : ''}`} 
            onClick={handlePrev}
          >
            <img src={ArrowsIcon} alt="previous" />
          </div>
          <div 
            className={`next ${isNextDisabled ? 'hide' : ''}`} 
            onClick={handleNext}
          >
            <img src={ArrowsIcon} alt="next" />
          </div>
        </div> */}
      </div>
      <div className="inner" style={sliderStyles}>
        {our_blogs && our_blogs.length > 0 ? (
          <OwlCarousel {...options} ref={owlCarouselRef} className="owl-theme">
            {our_blogs.map((item, index) => (
              <div className="col" key={index}>
                <Link href={`/blog/${item.post_name}`} className="img">
                  <img src={item.featured_image_url} alt={item?.title?.rendered} />
                </Link>
                <div className="text">
                  <div className="btn_col d_flex">
                    <div className="col-left d_flex">
                      <a href={`/blog/${item.post_name}`}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.categories_names,
                          }}
                        ></span>
                      </a>
                      <div className="date">
                        <img src={"/assets/images/dateIcon.svg"} alt="date_icon" />{moment(item?.date).format('D.M.YYYY')}
                      </div>
                    </div>
                  </div>
                  <h3>
                  <Link href={`/blog/${item.post_name}`}>
                      {item.post_title}
                    </Link>
                  </h3>
  
                </div>
              </div>

            ))}
          </OwlCarousel>
        ) : (
          <div>No blogs available</div>
        )}
      </div>
      {/* <div className="wrapper">
      </div> */}
    </div>
  );
};

export default Highlights;
