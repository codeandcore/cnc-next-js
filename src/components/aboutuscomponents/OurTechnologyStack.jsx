'use client'
import React, { useState, useRef } from 'react';
import './OurEmployeeandtech.css';
import Link from 'next/link';

const OurTechnologyStack = ({
  a_right_side_section_title,
  technology_stack,
  setPrefetchedData,
}) => {

  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleWrap = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
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

    return fetch(`/data/posts/${menuItem}`)
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
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };
  return (
    <div className="our_technology_stack">
      {a_right_side_section_title && <h2>{a_right_side_section_title}</h2>}
      {technology_stack && (
        <div className="inner">
          {technology_stack.map((category, index) => (
            <div
              key={index}
              className={` colin ${expandedIndex === index ? 'active' : ''}`}
            >
              <h3
                className={`${expandedIndex === index ? 'active' : ''}`}
                onClick={() => toggleWrap(index)}
              >
                {category.a_t_title} <img src={"/assets/images/pluceicon.svg"} alt="Pluce Icon" />
              </h3>
              <div
                className={` all_link d_flex ${expandedIndex === index ? 'expanded' : ''}`}
              >
                {category.a_t_list_items.map((icon, idx) => (
                  <Link
                    key={idx}
                    href={`/technologies/${icon.a_t_link.post_name}`}
                    onClick={(e) => {
                      closeMenu();
                      // handleLinkClick(`/technologies/${icon.a_t_link.post_name}`, icon.a_t_link.post_name, e);
                    }}
                    // onMouseEnter={() => handleMouseEnter(icon.a_t_link.post_name)} key={idx}
                  >
                    <img src={icon.a_t_icon.url} alt={icon.a_t_label} />{' '}
                    {icon.a_t_label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurTechnologyStack;
