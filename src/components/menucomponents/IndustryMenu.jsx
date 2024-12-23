'use client'
import React, { useState, useEffect } from 'react';
import './menu.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const IndustryMenu = ({
  isOpen,
  closeSubmenu,
  closeMenu,
  industry_menu,
  menuTitle,
  handleSmoothScroll,
  handleLinkClick,
  resetChildMenu,
}) => {
  const [activeChildmenu, setActiveChildmenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [industryContent, SetIndustryContent] = useState(null);
  const pathname = usePathname();
  
  const handleChildToggle = (submenu) => {
    setActiveChildmenu((prev) => (prev === submenu ? null : submenu));
  };
  
  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };
  
  useEffect(() => {
    SetIndustryContent(industry_menu?.industry_content);
  }, [industry_menu?.industry_content]);

  useEffect(() => {
    if (!isOpen) {
      handleChildToggle(null);
      setOpenSubmenu(null);
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (resetChildMenu) {
      handleChildToggle(null);
      setOpenSubmenu(null);
    }
  }, [resetChildMenu]);

  const isLinkActive = (url) => {
    const normalizedPathname = pathname.replace(/\/$/, '').toLowerCase();
    const normalizedUrl = url.replace(/\/$/, '').toLowerCase();
    
    const fullPath = normalizedUrl.startsWith('/') ? normalizedUrl : `/industry${normalizedUrl}`;
    
    return normalizedPathname === fullPath;
  };

  const getActiveLinkStyle = (url) => ({
      color: isLinkActive(url) ? 'black' : '',
      fontWeight: isLinkActive(url) ? '700' : '',
  });
  
  return (
    <>
      <span
        className="drop-icon"
        onClick={() => handleSubmenuToggle('industry')}
      ></span>
      <div
        className={`submenu industrymenu d_flex ${openSubmenu ? 'slide-open' : ''}`}
      >
        <div className="menutitle">
          <div className="back" onClick={() => handleSubmenuToggle('industry')}>
            &lt; Back
          </div>
          {menuTitle}
        </div>
        <div className="left_col">
          {industry_menu.industry_title && (
            <Link
              href={`/industry${industry_menu.industry_title.url}`}
              // className="link"
              
              onClick={(e) => {
                closeSubmenu();
                closeMenu();
                handleSmoothScroll();
                handleLinkClick(
                  `industry${industry_menu.industry_title.url}`,
                  industry_menu.industry_title.url,
                  e,
                );
              }}
            >
              {industry_menu.industry_title.title}
            </Link>
          )}
          <p
            dangerouslySetInnerHTML={{ __html: industryContent }}
          ></p>
        </div>
        <div className="right_col d_flex">
          {industry_menu.industry_menu && (
            <ul>
              {industry_menu.industry_menu.map((menu, index) => {
                const fullUrl = `/industry${menu.menu_item.url}`;
                return (
                  <li key={index} >
                    <Link
                      style={getActiveLinkStyle(fullUrl)}
                      href={fullUrl}
                      onClick={(e) => {
                        closeSubmenu();
                        closeMenu();
                        handleSmoothScroll();
                        handleLinkClick(
                          `industry${menu.menu_item.url}`,
                          menu.menu_item.url,
                          e,
                        );
                      }}
                    >
                      <span>
                        <img src={menu.icon.url} alt={menu.icon.alt} />
                      </span>
                      {menu.menu_item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="img">
            {industry_menu.industry_image && (
              <img
                src={industry_menu.industry_image.url}
                alt={industry_menu.industry_image.alt}
              />
            )}
            {industry_menu.industry_image_content && (
              <p
                dangerouslySetInnerHTML={{
                  __html: industry_menu.industry_image_content,
                }}
              ></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryMenu;