'use client'
import React, { useState, useEffect } from 'react';
import './menu.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

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
    const normalizeUrl = (path) => {
      return '/' + path.replace(/^\/+|\/+$/g, '');
    };

    const normalizedPathname = normalizeUrl(pathname);
    const normalizedUrl = normalizeUrl(url);

    return normalizedPathname === normalizedUrl || 
           normalizedPathname.startsWith(normalizedUrl + '/');
  };

  const handleNavigation = async (url, e) => {
    const submenus = document.querySelector(".servicesmenu");
    if (submenus) {
      submenus.classList.add("menu-hide");
    }
    if (handleLinkClick) {
      handleLinkClick(e);
    }
    setTimeout(() => {
      if (submenus) {
        submenus.classList.remove("menu-hide");
    }
    }, 1000);
  };

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
        <div className="left_col gh">
          {services_menu.technology_title && (
            <Link
              href={`${services_menu.technology_title.url}`}
              className={`link ${isLinkActive(`/technologies${services_menu.technology_title.url}`) ? "active" : "" }`}
              onClick={(e) => {
                closeSubmenu();
                closeMenu();
                handleNavigation(services_menu.technology_title.url, e)
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
                    className={` ${isLinkActive(`/technologies/${menu.link.post_name}`) ? "active" : "" }`}
                    onClick={(e) => {
                      closeSubmenu();
                      closeMenu();
                      handleNavigation(`/technologies/${menu.link.post_name}`, e)
                    }}
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
                  className={`link ${isLinkActive(`/services${services_menu.first_menu_title.url}`) ? "active" : "" }`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleNavigation(`/services${services_menu.first_menu_title.url}`, e)
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
                        className={`link ${isLinkActive(`/services${menu.menu_item.url}`) ? "active" : "" }`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleNavigation(`/services${menu.menu_item.url}`, e)
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
                  className={`link ${isLinkActive(`/services${services_menu.second_menu_title.url}`) ? "active" : "" }`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleNavigation(`/services${services_menu.second_menu_title.url}`, e)
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
                        className={`link ${isLinkActive(`/services${menu.menu_item.url}`) ? "active" : "" }`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleNavigation(`/services${menu.menu_item.url}`, e)
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
                  className={`link ${isLinkActive(`/services${services_menu.third_menu_title.url}`) ? "active" : "" }`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleNavigation(`/services${services_menu.third_menu_title.url}`, e)
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
                        className={`link ${isLinkActive(`/services${menu.menu_item.url}`) ? "active" : "" }`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleNavigation(`/services${menu.menu_item.url}`, e)
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
                  className={`link ${isLinkActive(`/services${services_menu.fourth_menu_title.url}`) ? "active" : "" }`}
                  onClick={(e) => {
                    closeSubmenu();
                    closeMenu();
                    handleNavigation(`/services${services_menu.fourth_menu_title.url}`, e)
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
                        className={`link ${isLinkActive(`/services${menu?.menu_item?.url}`) ? "active" : "" }`}
                        onClick={(e) => {
                          closeSubmenu();
                          closeMenu();
                          handleNavigation(`/services${menu.menu_item.url}`, e)
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