'use client'
import React, { useState, useEffect } from 'react';
import './menu.css';
import Link from 'next/link';

const ServicesMenu = ({
  isOpen,
  closeSubmenu,
  closeMenu,
  resetChildMenu,
  services_menu,
  menuTitle,
  handleSmoothScroll,
  handleLinkClick,
  handleMouseEnter,
}) => {
  const [activeChildmenu, setActiveChildmenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const handleChildToggle = (submenu) => {
    setActiveChildmenu((prev) => (prev === submenu ? null : submenu));
  };
  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    if (!isOpen) {
      handleChildToggle(null); // Reset the child menu when the ServicesMenu is closed
      setOpenSubmenu(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (resetChildMenu) {
      handleChildToggle(null); // Reset the child menu when closeMenu is called
      setOpenSubmenu(null);
    }
  }, [resetChildMenu]);

  return (
    <>
      <span
        className="drop-icon"
        onClick={() => handleSubmenuToggle('services')}
      ></span>
      <div
        className={`submenu servicesmenu d_flex ${openSubmenu ? 'slide-open' : ''}`}
      >
        <div className="menutitle">
          <div className="back" onClick={() => handleSubmenuToggle('services')}>
            &lt; Back
          </div>
          {menuTitle}
        </div>
        <div className="left_col">
          {services_menu.technology_title && (
            <Link
              href={`${services_menu.technology_title.url}`}
              className="link"
              onClick={(e) => {
                closeSubmenu();
                closeMenu();
                handleSmoothScroll();
                // handleLinkClick(
                //   `${services_menu.technology_title.url}`,
                //   services_menu.technology_title.url,
                //   e,
                // );
              }}
              onMouseEnter={() =>
                handleMouseEnter(services_menu.technology_title.url)
              }
            >
              {services_menu.technology_title.title}
            </Link>
          )}
          {services_menu.technology_list && (
            <ul className="d_flex">
              {services_menu.technology_list.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={`/technologies/${menu.link.post_name}`}
                    onClick={(e) => {
                      closeSubmenu();
                      closeMenu();
                      handleSmoothScroll();
                      handleLinkClick(
                        `/technologies/${menu.link.post_name}`,
                        menu.link.post_name,
                        e,
                      );
                    }}
                    // onMouseEnter={() =>
                    //   handleMouseEnter(`/${menu.link.post_name}`)
                    // }
                  >
                    <img src={menu.icon.url} alt={menu.icon.title} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="right_col d_flex">
          <div className="colin">
            {services_menu.first_menu_title && (
              <h3>
                <Link
                  href={`/services${services_menu.first_menu_title.url}`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleSmoothScroll();
                    handleLinkClick(
                      `services${services_menu.first_menu_title.url}`,
                      services_menu.first_menu_title.url,
                      e,
                    );
                  }}
                  dangerouslySetInnerHTML={{
                    __html: services_menu.first_menu_title.title,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(services_menu.first_menu_title.url)
                  }
                ></Link>
                <span
                  className="drop-icon"
                  onClick={() => handleChildToggle('evaluationDesign')}
                ></span>
              </h3>
            )}
            <div
              className={`childmenu ${activeChildmenu === 'evaluationDesign' ? 'active' : ''}`}
            >
              <div className="menutitle">
                <div className="back" onClick={() => handleChildToggle(null)}>
                  &lt; Back
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: services_menu.first_menu_title.title,
                  }}
                ></p>
              </div>
              {services_menu.first_menu && (
                <ul>
                  {services_menu.first_menu.map((menu, index) => (
                    <li key={index}>
                      <Link
                        href={`/services${menu.menu_item.url}`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleSmoothScroll();
                          handleLinkClick(
                            `services${menu.menu_item.url}`,
                            menu.menu_item.url,
                            e,
                          );
                        }}
                        dangerouslySetInnerHTML={{
                          __html: menu.menu_item.title,
                        }}
                        onMouseEnter={() =>
                          handleMouseEnter(menu.menu_item.url)
                        }
                      ></Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="colin">
            {services_menu.second_menu_title && (
              <h3>
                <Link
                  href={`/services${services_menu.second_menu_title.url}`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleSmoothScroll();
                    handleLinkClick(
                      `/services${services_menu.second_menu_title.url}`,
                      services_menu.second_menu_title.url,
                      e,
                    );
                  }}
                  dangerouslySetInnerHTML={{
                    __html: services_menu.second_menu_title.title,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(services_menu.second_menu_title.url)
                  }
                ></Link>
                <span
                  className="drop-icon"
                  onClick={() => handleChildToggle('researchDevelopment')}
                ></span>
              </h3>
            )}
            <div
              className={`childmenu ${activeChildmenu === 'researchDevelopment' ? 'active' : ''}`}
            >
              <div className="menutitle">
                <div className="back" onClick={() => handleChildToggle(null)}>
                  &lt; Back
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: services_menu.second_menu_title.title,
                  }}
                ></p>
              </div>
              {services_menu.second_menu && (
                <ul>
                  {services_menu.second_menu.map((menu, index) => (
                    <li key={index}>
                      <Link
                        href={`/services${menu.menu_item.url}`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleSmoothScroll();
                          handleLinkClick(
                            `services${menu.menu_item.url}`,
                            menu.menu_item.url,
                            e,
                          );
                        }}
                        dangerouslySetInnerHTML={{
                          __html: menu.menu_item.title,
                        }}
                        onMouseEnter={() =>
                          handleMouseEnter(menu.menu_item.url)
                        }
                      ></Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="colin">
            {services_menu.third_menu_title && (
              <h3>
                <Link
                  href={`/services${services_menu.third_menu_title.url}`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleSmoothScroll();
                    handleLinkClick(
                      `/services${services_menu.third_menu_title.url}`,
                      services_menu.third_menu_title.url,
                      e,
                    );
                  }}
                  dangerouslySetInnerHTML={{
                    __html: services_menu.third_menu_title.title,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(services_menu.third_menu_title.url)
                  }
                ></Link>
                <span
                  className="drop-icon"
                  onClick={() => handleChildToggle('webdevelopment')}
                ></span>
              </h3>
            )}
            <div
              className={`childmenu ${activeChildmenu === 'webdevelopment' ? 'active' : ''}`}
            >
              <div className="menutitle">
                <div className="back" onClick={() => handleChildToggle(null)}>
                  &lt; Back
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: services_menu.third_menu_title.title,
                  }}
                ></p>
              </div>
              {services_menu.third_menu && (
                <ul>
                  {services_menu.third_menu.map((menu, index) => (
                    <li key={index}>
                      <Link
                        href={`/services${menu.menu_item.url}`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleSmoothScroll();
                          handleLinkClick(
                            `/services${menu.menu_item.url}`,
                            menu.menu_item.url,
                            e,
                          );
                        }}
                        dangerouslySetInnerHTML={{
                          __html: menu.menu_item.title,
                        }}
                        onMouseEnter={() =>
                          handleMouseEnter(menu.menu_item.url)
                        }
                      ></Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="colin">
            {services_menu.fourth_menu_title && (
              <h3>
                <Link
                  href={`/services${services_menu.fourth_menu_title.url}`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleSmoothScroll();
                    handleLinkClick(
                      `services${services_menu.fourth_menu_title.url}`,
                      services_menu.fourth_menu_title.url,
                      e,
                    );
                  }}
                  dangerouslySetInnerHTML={{
                    __html: services_menu.fourth_menu_title.title,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(services_menu.fourth_menu_title.url)
                  }
                ></Link>
                <span
                  className="drop-icon"
                  onClick={() => handleChildToggle('supplyChain')}
                ></span>
              </h3>
            )}
            <div
              className={`childmenu ${activeChildmenu === 'supplyChain' ? 'active' : ''}`}
            >
              <div className="menutitle">
                <div className="back" onClick={() => handleChildToggle(null)}>
                  &lt; Back
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: services_menu.fourth_menu_title.title,
                  }}
                ></p>
              </div>
              {services_menu.fourth_menu && (
                <ul>
                  {services_menu.fourth_menu.map((menu, index) => (
                    <li key={index}>
                      <Link
                        href={`/services${menu.menu_item.url}`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleSmoothScroll();
                          handleLinkClick(
                            `services${menu.menu_item.url}`,
                            menu.menu_item.url,
                            e,
                          );
                        }}
                        dangerouslySetInnerHTML={{
                          __html: menu.menu_item.title,
                        }}
                        onMouseEnter={() =>
                          handleMouseEnter(menu.menu_item.url)
                        }
                      ></Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesMenu;
