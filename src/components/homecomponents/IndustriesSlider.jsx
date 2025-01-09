'use client';
import React, { useRef, useState, useEffect } from 'react';
import './IndustriesSlider.css';
import UseOnScreen from '../UseOnScreen';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const IndustriesSlider = ({
  industries_title,
  industries_subtitle,
  industries_list,
}) => {
  var $ = require("jquery");
  if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
  }
  
  // This is for Next.js. On Rect JS remove this line
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
  });
  const location = useRouter();
  // const navigate = useNavigate();
  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  // Refs for the titles and contents
  const titleRefs = useRef([]);
  const contentRefs = useRef([]);

  // Calculate the max height and apply it to titles and content
  useEffect(() => {
    if (industries_list.length > 0) {
      // Get the max height for all titles
      const titleHeights = titleRefs.current.map(
        (title) => title?.offsetHeight || 0,
      );
      const maxTitleHeight = Math.max(...titleHeights);

      // Get the max height for all content
      const contentHeights = contentRefs.current.map(
        (content) => content?.offsetHeight || 0,
      );
      const maxContentHeight = Math.max(...contentHeights);

      // Apply the max height to all titles and content
      titleRefs.current.forEach((title) => {
        if (title) title.style.height = `${maxTitleHeight}px`;
      });

      contentRefs.current.forEach((content) => {
        if (content) content.style.height = `${maxContentHeight}px`;
      });
    }
  }, [industries_list]);


  const handleLinkClick = async (url, urlc, e = null) => {
    // if (location.pathname === url) {
    //     return;
    // }
    // if (e.ctrlKey || e.metaKey) {
    //     return;
    // }
    // e.preventDefault();
    // try {
    //     setIsLoading(true);
    //     setIsDone(false);
    //     setIsFinish(false);
    //     await handleMouseEnter(urlc);
    //     setIsLoading(false);
    //     navigate(url);
    // } catch (error) {
    //     console.error("Error handling link click:", error);
    // }
  };

  const options = {
    items: 3,
    loop: false, 
    margin: 5,
    nav: true,
    autoWidth: true,
    responsive: {
        0: {
            items: 1,
            autoWidth: false,
        },
        768: {
            items: 3,
            autoWidth: true,
        }
    }
};




  return (
    <div
      // ref={ref}
      className="industries_lider"
      // className={`industries_lider ${isVisible ? 'On-screen' : ''}`}
    >
      <div className="wrapper d_flex">
        {industries_title && <h2>{industries_title}</h2>}
        {industries_subtitle && (
          <p dangerouslySetInnerHTML={{ __html: industries_subtitle }} />
        )}
      </div>
      <div className="inner">
      <OwlCarousel    className="owl-theme"
          {...options}>
                    {industries_list.map((item, index) => (
                        <div key={index} className='colin'>
                            <Link href={`industry/${item.button_url.post_name}`}
                                title={`${item.button_url.post_name}`}
                                onClick={(e) =>
                                    handleLinkClick(`/industry/${item.button_url.post_name}`, item.button_url.post_name, e)
                                }
                                className='col'
                                // onMouseEnter={() => handleMouseEnter(item.button_url.post_name)}
                            >
                                <div className='img'>
                                    <div className='bg' style={{ backgroundImage: `url(${item.image.url})` }}></div>
                                    <span className='icon_link'><img src={item.icon.url} alt={item.title} /></span>
                                </div>
                                <h3 className='h2' ref={el => titleRefs.current[index] = el} >{item.title}</h3>
                                <p ref={el => contentRefs.current[index] = el}>{item.content}</p>
                                <div className='btn btnarrow'>
                                    <em>{item.button_text}</em>
                                    <div><img src={"/assets/images/ellipse_arr.png"} alt="Read More" /></div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </OwlCarousel>
      </div>
    </div>
  );
};

export default IndustriesSlider;
