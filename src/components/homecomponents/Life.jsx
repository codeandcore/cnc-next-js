'use client';
import React, { useState, useEffect } from 'react';
// import BASE_URL from '../../config';
import './Life.css';
import he from 'he';
import UseOnScreen from '../UseOnScreen';
import Link from 'next/link';

const Life = ({
  className,
  life_codeandcore_title,
  life_codeandcore_button_text,
  life_codeandcore_button_url,
  life_codeandcore_highlights,
  life_codeandcore_big_images,
  life_codeandcore_medium_images,
  life_codeandcore_small_images,
  life_codeandcore_bottom_text,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const lifeleftImages = life_codeandcore_big_images;
  const liferightTopImages = life_codeandcore_medium_images;
  const liferightBottomImages = life_codeandcore_small_images;
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightTopImageIndex, setRightTopImageIndex] = useState(0);
  const [rightBottomImageIndex, setRightBottomImageIndex] = useState(0);

  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

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

    return fetch(`/data/pages/${menuItem}`)
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
  useEffect(() => {
    const leftImageInterval = setInterval(() => {
      if (lifeleftImages) {
        setLeftImageIndex(getRandomIndex(lifeleftImages.length));
      }
    }, 7500);

    const rightTopImageInterval = setInterval(() => {
      if (liferightTopImages) {
        setRightTopImageIndex(getRandomIndex(liferightTopImages.length));
      }
    }, 7600);

    const rightBottomImageInterval = setInterval(() => {
      if (liferightBottomImages) {
        setRightBottomImageIndex(getRandomIndex(liferightBottomImages.length));
      }
    }, 7500);

    // Clear intervals on component amount
    return () => {
      clearInterval(leftImageInterval);
      clearInterval(rightTopImageInterval);
      clearInterval(rightBottomImageInterval);
    };
  }, []);
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
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };
  // Function to randomly select an index from the array
  const getRandomIndex = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  };
  const liferenderMarquee = () => {
    if (life_codeandcore_highlights && life_codeandcore_highlights.length > 0) {
      return (
        <div className="marquee" style={{ animationDuration: '35s' }}>
          {life_codeandcore_highlights &&
            life_codeandcore_highlights.map((item, idx) => (
              <div className="item" key={idx}>
                <img src={'/assets/images/ellipse_c.png'} alt="circle" />
                {item.label}
              </div>
            ))}
        </div>
      );
    }
  };

  const scaleValue = isVisible ? 1 : 0.85;
  return (
    <>
      {(life_codeandcore_title ||
        life_codeandcore_button_text ||
        life_codeandcore_highlights ||
        life_codeandcore_big_images ||
        life_codeandcore_medium_images ||
        life_codeandcore_small_images) && (
        <div
          ref={ref}
          style={{
            backgroundImage: `url(/assets/images/career_bg.jpg)`,
          }}
          className={`life_section ${className}`}
        >
          <div className="wrapper">
            <div className="top_colin d_flex">
              <div className="colinl">
                {life_codeandcore_title && (
                  <h2
                    dangerouslySetInnerHTML={{ __html: life_codeandcore_title }}
                  ></h2>
                )}
                {life_codeandcore_button_text && (
                  <Link
                    href={`../${life_codeandcore_button_url.post_name}`}
                    passHref
                    onClick={(e) => {
                      closeMenu();
                      handleSmoothScroll();
                    }}
                    className="btn"
                  >
                    <span></span>
                    <em>{life_codeandcore_button_text}</em>
                  </Link>
                )}
                {life_codeandcore_highlights && (
                  <div className="client_plateform">
                    <div className="marquee_wrap">
                      {liferenderMarquee()}
                      {liferenderMarquee()}
                    </div>
                  </div>
                )}
              </div>
              <div className="colinr d_flex">
                {life_codeandcore_big_images && (
                  <div className="left comman">
                    <img
                      src={lifeleftImages[leftImageIndex].url}
                      alt="Left Image"
                    />
                  </div>
                )}
                {(life_codeandcore_medium_images ||
                  life_codeandcore_small_images) && (
                  <div className="right">
                    {life_codeandcore_medium_images && (
                      <div className="comman img2">
                        {' '}
                        <img
                          src={liferightTopImages[rightTopImageIndex].url}
                          alt="Right Top Image"
                        />{' '}
                      </div>
                    )}
                    {life_codeandcore_small_images && (
                      <div className="comman img3">
                        <img
                          src={liferightBottomImages[rightBottomImageIndex].url}
                          alt="Right Bottom Image"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {life_codeandcore_bottom_text && (
              <div className="bottom_text">
                {life_codeandcore_bottom_text && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: he.decode(life_codeandcore_bottom_text),
                    }}
                  ></div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Life;
