'use client'
import React, { useState, useEffect } from 'react';
import './ExploreDone.css';
import Link from 'next/link';

const ExploreData = ({
  className,
  CaseStudycptData,
  setPrefetchedData,

}) => {

  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };
  const handleMouseEnter = (menuItem) => {
    if (menuItem === '/') {
      menuItem = '/home';
    }

    return fetch(`/data/case_study/${menuItem}`)
      .then((response) => response.json())
      .then((data) => {
        return new Promise((resolve, reject) => {
          try {
            setPrefetchedData(data);
            localStorage.setItem('prefetchedData', JSON.stringify(data));
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return Promise.reject(error);
      });
  };
  const handleLinkClick = async (url, urlc, e = null) => {
    // if (location.pathname === url) {
    //   return;
    // }
    // if (e.ctrlKey || e.metaKey) {
    //   return;
    // }
    // e.preventDefault();
    // try {
    //   setIsLoading(true);
    //   setIsDone(false);
    //   setIsFinish(false);
    //   await handleMouseEnter(urlc);
    //   setIsLoading(false);
    //   navigate(url);
    // } catch (error) {
    //   console.error("Error handling link click:", error);
    // }
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  return (
    <div className={`explore_data ${className}`}>
      <div className="inner d_flex">
        {CaseStudycptData.map((item, index) => (
          <div key={index} className="colin">
            <div className="top_col d_flex">
              <h3>{item.case_study_post_title}</h3>
              <div className="case d_flex">
                {item.acf.tag_logo && (
                  <span>
                    <img
                      src={item.acf.tag_logo.url}
                      alt={item.acf.tag_logo.name}
                    />
                  </span>
                )}
                {item.case_study_tags && (
                  <ul className="d_flex">
                    {item.case_study_tags.map((caseItem, index) => (
                      <li key={index}>{caseItem.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="img">
              <Link
                href={`/portfolio/${item.slug}`}
                onClick={(e) => {
                  closeMenu();
                  handleSmoothScroll();
                  //  handleLinkClick(`/portfolio/${item.slug}`, item.slug, e);
                }}
                //  onMouseEnter={() => handleMouseEnter(item.slug)}
                className="bg"
                style={
                  item.featured_image_url
                    ? { backgroundImage: `url(${item.featured_image_url})` }
                    : {}
                }
              ></Link>
            </div>
            <div className="bottom_col d_flex">
              <div className="lcol">
                {item.acf.c_right_side_logo && (
                  <div className="lcol_logo">
                    <img
                      src={item.acf.c_right_side_logo.url}
                      alt={item.acf.c_right_side_logo.name}
                    />
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
                        <img src={"/assets/images/google.png"} alt="Lighthouse speed" />
                        Lighthouse speed
                      </h5>
                    </li>
                  )}
                </ul>
              </div>
              <div className="awward_right_col">
                {item.acf.cases_location && (
                  <div className="rcol d_flex">
                    <img src={"/assets/images/location.svg"} alt="location" />
                    {item.acf.cases_location}
                  </div>
                )}

                {item.acf &&
                  item.acf.award_small_logo &&
                  item.acf.award_small_logo.url &&
                  item.acf.award_link &&
                  item.acf.award_text && (
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
      </div>
    </div>
  );
};

export default ExploreData;
