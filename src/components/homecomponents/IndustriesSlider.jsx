"use client";
import React, { useRef, useState, useEffect } from "react";
import "./IndustriesSlider.css";
import UseOnScreen from "../UseOnScreen";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
        (title) => title?.offsetHeight || 0
      );
      const maxTitleHeight = Math.max(...titleHeights);

      // Get the max height for all content
      const contentHeights = contentRefs.current.map(
        (content) => content?.offsetHeight || 0
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
      },
    },
  };

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

  return (
    <div
      className="industries_lider"
      // className={`industries_lider ${isVisible ? 'On-screen' : ''}`}
    >
      <div className="wrapper d_flex" ref={wrapperRef}>
        {industries_title && <h2>{industries_title}</h2>}
        {industries_subtitle && (
          <p dangerouslySetInnerHTML={{ __html: industries_subtitle }} />
        )}
      </div>
      <div className="inner" style={sliderStyles}>
        <OwlCarousel className="owl-theme" {...options}>
          {industries_list.map((item, index) => (
            <div key={index} className="colin">
              <Link
                href={`industry/${item.button_url.post_name}`}
                title={`${item.button_url.post_name}`}
                onClick={(e) =>
                  handleLinkClick(
                    `/industry/${item.button_url.post_name}`,
                    item.button_url.post_name,
                    e
                  )
                }
                className="col"
                // onMouseEnter={() => handleMouseEnter(item.button_url.post_name)}
              >
                <div className="img">
                  <div className="overflow_animi">
                    <div
                      className="bg"
                      style={{ backgroundImage: `url(${item.image.url})` }}
                    ></div>
                  </div>
                  <span className="icon_link">
                    <img src={item.icon.url} alt={item.title} />
                  </span>
                </div>
                <h3
                  className="h2"
                  ref={(el) => (titleRefs.current[index] = el)}
                >
                  {item.title}
                </h3>
                <p ref={(el) => (contentRefs.current[index] = el)}>
                  {item.content}
                </p>
                <div className="btn btnarrow">
                  <em>{item.button_text}</em>
                  <div className="arrow_img">
                    <img
                      src={"/assets/images/ellipse_arr.png"}
                      alt="Read More"
                    />
                    <img
                      src={"/assets/images/ellipse_arr_hover.png"}
                      alt="Read More"
                      className="hover_img"
                    />
                  </div>
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
