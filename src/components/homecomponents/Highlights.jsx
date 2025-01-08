'use client';
import React, { useState, useRef, useEffect } from 'react';
import './Highlights.css';
// import ArrowsIcon from '../../assets/images/arrow_ss1.svg';
import UseOnScreen from '../UseOnScreen';
import Link from 'next/link';
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
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
  var $ = require("jquery");
  if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
  }
  
  // This is for Next.js. On Rect JS remove this line
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
  });
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const owlCarouselRef = useRef(null);
  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  const handleTranslated = () => {
    if (owlCarouselRef.current && owlCarouselRef.current.props) {
      const itemCount = owlCarouselRef.current.props.children.length - 3;
      const currentIndex = owlCarouselRef.current.currentPosition;

      // Update button states based on current index
      setIsPrevDisabled(currentIndex === 0);
      setIsNextDisabled(currentIndex === itemCount);
    }
  };


  const options = {
    items: 4,
    loop: false,
    nav: true,
    dots: false,
    autoWidth: true,
    onTranslated: handleTranslated,
  };

  // const handleNext = () => {
  //   if (owlCarouselRef.current) {
  //     console.log('owlCarouselRef.current', owlCarouselRef.current);
  //     owlCarouselRef.current.next();
  //     handleTranslated();
  //   }
  // };
  const dateFormatCnc = (postDate) => {
    const date = new Date(postDate);

    const day = String(date.getDate()).padStart(2, '0'); // "06"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // "09"
    const year = date.getFullYear(); // "2023"

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  // const handlePrev = () => {
  //   if (owlCarouselRef.current) {
  //     console.log('owlCarouselRef.current1', owlCarouselRef);
  //     owlCarouselRef.current.prev();
  //     handleTranslated();
  //   }
  // };

  useEffect(() => {
    handleTranslated();
  }, [owlCarouselRef]);

  return (
    <div
      className="our_highlights"
      //  ref={ref}
      //  className={`our_highlights ${className} ${isVisible ? 'On-screen' : ''}`}
    >
      <div className="wrapper">
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
      <div className="inner">
        {our_blogs && our_blogs.length > 0 ? (
           <OwlCarousel {...options} ref={owlCarouselRef} className="owl-theme">
            {our_blogs.map((item, index) => (
                <div className="col" key={index}>
                  <Link href={`/blog/${item.post_name}`} className="img">
                    <div
                      className="bg"
                      style={{
                        backgroundImage: `url(${item.featured_image_url})`,
                      }}
                    ></div>
                  </Link>
                  <div className="text">
                    <div className="btn_col d_flex">
                      <Link href={`/blog/${item.post_name}`} className="btnmix">
                        <em
                          dangerouslySetInnerHTML={{
                            __html: item.categories_names,
                          }}
                        ></em>
                      </Link>
                      <span className="date">
                        <img src={'/assets/images/date.svg'} alt="Date Icon" />{' '}
                        {dateFormatCnc(item.post_date)}
                      </span>
                    </div>
                    <Link href={`/blog/${item.post_name}`} className="link">
                      {item.post_title}
                    </Link>
                    <label className="d_flex">
                      By{' '}
                      <Link href={`/blog/${item.post_name}`}>
                        {item.author_name}
                      </Link>
                      <span>{item.relative_modified_date}</span>
                    </label>
                  </div>
                </div>
        
            ))}
          </OwlCarousel>
        ) : (
          <div>No blogs available</div>
        )}
      </div>
    </div>
  );
};

export default Highlights;
