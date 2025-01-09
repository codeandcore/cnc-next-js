'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import './CaseStudies.css';
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import UseOnScreen from '../UseOnScreen';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
const CaseStudies = ({
  case_studies_title,
  case_studies_subtitle,
  case_studies_list,
  BASE_URL,
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
  const location = useRouter();
  const [case_studies_slider_new, setCaseStudyDetail] = useState(null);
  const [fetchedCaseStudies, setFetchedCaseStudies] = useState({});
  const [currentSlideData, setCurrentSlideData] = useState(null); // Track current slide data
  const owlCarouselRef = useRef(null);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  // Fetch case studies when the component mounts
  useEffect(() => {
    fetch(`${BASE_URL}/wp-json/wp/v2/case_study/`)
      .then((response) => response.json())
      .then((data) => setCaseStudyDetail(data))
      .catch((error) =>
        console.error('Error fetching data from WordPress API:', error),
      );
  }, [BASE_URL]);

  // Handle hover state
  const handleSlideMouseEnter = (itemSlug) => {
    setHoveredSlide(itemSlug); // Update hovered state
    handleMouseEnter(itemSlug); // This triggers the hover logic
  };

  // Separate hover and click fetching logic
  const handleMouseEnter = (menuItem) => {
    if (menuItem === '/') {
      menuItem = '/home';
    }

    // Prevent re-fetching if data already exists
    if (!fetchedCaseStudies[menuItem]) {
      return fetch(`/data/case_study/${menuItem}`)
        .then((response) => response.json())
        .then((data) => {
          setFetchedCaseStudies((prevState) => ({
            ...prevState,
            [menuItem]: data,
          }));
          setCurrentSlideData(data); // Set current slide's data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      setCurrentSlideData(fetchedCaseStudies[menuItem]); // Use cached data if available
    }
  };

  const options = useMemo(() => ({
    items: 1,
    loop: false,
    nav: true,
    dots: false,
    autoWidth: true,
    responsive: {
        0: {
            autoWidth: false,
            margin: 20,
        },
        768: {
            autoWidth: true,
            margin: 0,
        }
    }
}), []);

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // 'top' should be a number, not a string
      behavior: 'smooth', // Comma was missing here
    });
  };

  return (
    (case_studies_title || case_studies_subtitle) && (
      <div className="case_studies">
        <div className="wrapper">
          {case_studies_title && <h2>{case_studies_title}</h2>}
          {case_studies_subtitle && <p>{case_studies_subtitle}</p>}
        </div>

        <div className="inner">
              {case_studies_list && (
        <OwlCarousel {...options} ref={owlCarouselRef} className="owl-theme">
            {case_studies_list.map((item, index) => (
         
                <div key={index}
                  className={`colin ${hoveredSlide === item.slug ? 'hovered' : ''}`}
                >
                  <div className="top_col d_flex">
                    <h3>{item.case_study_post_title}</h3>
                    <div className="case d_flex">
                      <span>
                        <img src={item.acf.tag_logo.url} alt={item.case_study_post_title} />
                      </span>
                      <ul className="d_flex">
                        {item.case_study_tags.map((caseItem, index_tag) => (
                          <li key={index_tag}>{caseItem.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
  
                  <div className="img">
                    {item.featured_image_url && (
                      <Link
                        href={`/portfolio/${item.slug}`}
                        onClick={(e) => {
                          handleSmoothScroll();
                        }}
                        className="bg"
                      >
                        <img
                          src={item.featured_image_url}
                          alt={item.case_study_post_title}
                        />
                      </Link>
                    )}
                  </div>
  
                  <div className="bottom_col d_flex">
                    <div className="lcol test">
                      {item.acf && item.acf.c_right_side_logo && item.acf.c_right_side_logo.url && (
                        <div className="lcol_logo">
                          <img src={item.acf.c_right_side_logo.url} alt={item.acf.c_right_side_logo.name} />
                        </div>
                      )}
                      <ul className="d_flex">
                        {item.acf.case_total_visitors && (
                          <li>
                            <h4>{item.acf.case_total_visitors}</h4>
                            <h5>Visitors a day</h5>
                          </li>
                        )}
                        {item.acf.case_total_orders && (
                          <li>
                            <h4>{item.acf.case_total_orders}</h4>
                            <h5>Order a day website</h5>
                          </li>
                        )}
                        {item.acf.AwwardsIcongoogle_page_speed && (
                          <li>
                            <h4>{item.acf.google_page_speed}</h4>
                            <h5>
                              <img src={GoogleIcon} alt="Lighthouse speed" />
                              Lighthouse speed
                            </h5>
                          </li>
                        )}
                      </ul>
                    </div>
  
                    <div className="awward_right_col">
                      {item.acf.cases_location && (
                        <div className="rcol d_flex">
                          <img src={"/assets/images/location.svg"} alt="Location Icon" />
                          {item.acf.cases_location}
                        </div>
                      )}
  
                      {item.acf && item.acf.award_small_logo && item.acf.award_small_logo.url && item.acf.award_link && item.acf.award_text && (
                        <a href={item.acf.award_link} className="awward">
                          <span>{item.acf.award_text}</span>
                          <img
                            src={item.acf.award_small_logo.url}
                            alt={item.acf.award_small_logo.name}
                            className="awwadicon"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
          
            ))}
          </OwlCarousel>
          )}
            </div>
      </div>
    )
  );
};

export default CaseStudies;
