'use client';
import React, { useState } from 'react';
import './TabContaint.css';
import he from 'he';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const TabContaint = ({ service_list }) => {
  const location = useRouter();
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
  // const handleMouseEnter = (menuItem) => {
  //   if (menuItem === "/") {
  //     menuItem = "/home";
  //   }
  //   return fetch(`/data/pages/${menuItem}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       return new Promise((resolve, reject) => {
  //         try {
  //           // setPrefetchedData(data);
  //           localStorage.setItem('prefetchedData', JSON.stringify(data));
  //           resolve();
  //         } catch (error) {
  //           reject(error);
  //         }
  //       });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //         return Promise.reject(error);
  //       });
  //   };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };
  // console.log({(service_list)});
  const [activeTab, setActiveTab] = useState('tab1');
  const toggleTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="tab_section">
      <div className="wrapper d_flex d_flex_at">
        <div className="tabtitle">
          {service_list &&
            service_list.map((item, idx_a) => (
              <div
                className={`tablink ${
                  activeTab === `tab${idx_a + 1}` ? 'active' : ''
                }`}
                datatype={`tab${idx_a + 1}`}
                onClick={() => toggleTab(`tab${idx_a + 1}`)}
                key={idx_a + 1}
              >
                {/* <span className='number'>0{idx}</span> */}
                <span className="number">
                  {idx_a < 9 ? `0${idx_a + 1}` : idx_a + 1}
                </span>
                <h2>{item.title}</h2>
                <div className="text">
                  {item.tags &&
                    item.tags.map((item_service, idx_s) => (
                      <Link
                        href={`/services/${item_service.post_name}`}
                        key={idx_s}
                        onClick={(e) => {
                          closeMenu();
                          handleSmoothScroll();
                        }}
                      >
                        {item_service.post_title}
                      </Link>
                    ))}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: he.decode(item.description),
                    }}
                  ></p>
                  {item && (
                    <Link
                      href={`/services/${item.button_url.post_name}`}
                      className="btn btnarrow"
                      onClick={(e) => {
                        closeMenu();
                        handleSmoothScroll();
                      }}
                      // onMouseEnter={() => handleMouseEnter(`/${item.button_url.post_name}`)}
                    >
                      <em>{item.button_text}</em>
                      <div>
                        <img
                          src={'/assets/images/ellipse_arr.png'}
                          alt={item.title}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="tabcontaints">
          {service_list &&
            service_list.map((item, idx_i) => (
              <div
                className={`tabcontaint ${
                  activeTab === `tab${idx_i + 1}` ? 'active' : ''
                }`}
                id={`tab${idx_i + 1}`}
                key={idx_i}
              >
                <img src={item.image.url} alt={item.image.name} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TabContaint;
