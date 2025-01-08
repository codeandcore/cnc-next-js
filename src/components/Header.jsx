'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ServicesMenu from './menucomponents/ServicesMenu';
import IndustryMenu from './menucomponents/IndustryMenu';

const Header = ({
  logo,
  header_black_logo,
  button_text,
  button_url,
  main_menu,
  industry_menu,
  services_menu,
  additional_css,
}) => {
  // const [prefetchedData, setPrefetchedDataState] = useState(() => {
  //   const savedData = localStorage.getItem("prefetchedData");
  //   return savedData ? JSON.parse(savedData) : {};
  // });
  const router = useRouter();
  const pathname=usePathname()
  // Use Next.js router
  const [headerActive, setHeaderActive] = useState(false);
  const [headerIsactive, setHeaderIsactive] = useState(false);
  const [headerClass, setHeaderClass] = useState('');
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  // For mobile menu
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;

  const handleSubmenuToggle = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const closeSubmenu = () => {
    setOpenSubmenu(null);
  };

  const handleMouseEnter = (menuItem) => {
    // if (menuItem === '/') {
    //   menuItem = '/home';
    // }
    // return fetch(
    //   env !== 'development'
    //     ? `/data/pages/${menuItem}`
    //     : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/?slug=${menuItem}`,
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     return new Promise((resolve, reject) => {
    //       try {
    //         setPrefetchedDataState((prevState) => {
    //           const newData = { ...prevState, data };
    //           localStorage.setItem(
    //             'prefetchedData',
    //             JSON.stringify(newData.data),
    //           );
    //           return newData;
    //         });
    //         setPrefetchedData(data);
    //         resolve();
    //       } catch (error) {
    //         reject(error);
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     return Promise.reject(error);
    //   });
  };

  const handleLinkClick = async (url, urlc, e = null) => {
    // setIsFinish(false);
    // setIsDone(false);
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsDone(true);
    //   setTimeout(() => {
    //     setIsFinish(true);
    //   }, 1000);
    // }, 100);
    // if (router.pathname === url) {
    //   return;
    // }
    // if (e.ctrlKey || e.metaKey) {
    //   return;
    // }
    // e.preventDefault();
    // try {
    //   await handleMouseEnter(urlc);
    //   router.push(url); // Use router.push for navigation
    // } catch (error) {
    //   console.error('Error handling link click:', error);
    // }

    try {
      const submenus = document.querySelectorAll(".submenu");
      submenus.forEach((submenu) => {
        submenu.style.display = 'none';
      });
  
      if (typeof handleLinkClick === 'function') {
        handleLinkClick(url, name, e);
      }
  
      setTimeout(() => {
        submenus.forEach((submenu) => {
          submenu.style.display = ''; 
        });
      }, 100);
  
    } catch (error) {
      console.error('Error handling menu click:', error);
    }
  };

  

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
    setToggleIsactive((prevState) => !prevState);
    setResetChildMenu((prev) => !prev);
    setOpenSubmenu((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(null);
    setResetChildMenu(true);
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };

  const renderSubMenu = (
    subMenuType,
    isOpen,
    closeSubmenu,
    closeMenu,
    resetChildMenu,
    menuTitle,
    handleSmoothScroll,
    handleMouseEnter,
  ) => {
    switch (subMenuType) {
      case 'service':
        return <ServicesMenu
        isOpen={isOpen}
        closeSubmenu={closeSubmenu}
        closeMenu={closeMenu}
        resetChildMenu={resetChildMenu}
        services_menu={services_menu}
        menuTitle={menuTitle}
        handleSmoothScroll={handleSmoothScroll}
        handleMouseEnter={handleMouseEnter}
      />
        
      case 'industry':
        return  <IndustryMenu
          isOpen={isOpen}
          closeSubmenu={closeSubmenu}
          closeMenu={closeMenu}
          resetChildMenu={resetChildMenu}
          industry_menu={industry_menu}
          menuTitle={menuTitle}
          handleSmoothScroll={handleSmoothScroll}
          handleMouseEnter={handleMouseEnter}
        />
      
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setHeaderActive(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setHeaderIsactive(isScrollingDown);

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  useEffect(() => {
    if (!pathname) {
      return; // Exit early if router.pathname is not yet available
    }
    
    if (
      pathname.startsWith('/blog') ||
      pathname.startsWith('/portfolio') ||
     pathname.startsWith('/technologies') ||
    pathname.startsWith('/refund-policy') ||
    pathname.startsWith('/warranty') ||
    pathname.startsWith('/privacy-policy') ||
     pathname.startsWith('/terms') ||
      pathname.startsWith('/portfolio/:slug') ||
      pathname.startsWith('/casestudy/:slug') ||
    pathname.startsWith('/sitemap')
    ) {
      setHeaderClass('header-black'); // Update header class
    }
   else if (pathname.includes("/casestudy")) {
      setHeaderClass('header-black');
    }
    else {
      setHeaderClass('header-white');
    }
  }, [pathname]);
  

  useEffect(() => {
    setResetChildMenu(false); // Reset the resetChildMenu flag after the menu has been closed
  }, [resetChildMenu]);

  let logoImage = logo.url;
  if (headerClass === 'header-white') {
    logoImage = logo.url;
  } else if (headerClass === 'header-black') {
    logoImage = header_black_logo.url;
  }

  const handleNavigation = (url, e, keepMenuOpen = false) => {
    window.scrollTo({
      top: 0, 
      behavior: "auto",
    });

    if (!keepMenuOpen) {
      setMenuOpen(false);
      setOpenSubmenu(null);
    }

    const cleanUrl = url.replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
    router.push(`/${cleanUrl}`);
  };

  return (
    <>
      {additional_css && <style>{additional_css}</style>}

      <header
       
        className={`d-flex ${headerActive ? 'fixed' : ''} ${
          headerIsactive ? 'isactive' : ''
        } ${headerClass}`}
      >
        <a
          href="#"
          className={`togglemenu ${isMenuOpen ? 'on' : ''}`}
          onClick={handleMenuToggle}
        >
          <span></span>
        </a>
        <div className="wrapper d_flex">
          {logo && (
            <Link
              href="/"
              onClick={(e) => {
                closeMenu();
              }}
              className={`brand ${router.pathname === '/' ? 'current' : ''}`}
            >
              <img src={logoImage} alt="logo" />
              <img
                src={'/assets/images/cnc-logo-icon.svg'}
                className="logoIcon"
                alt="logo"
              />
            </Link>
          )}
          <div className={`menucol ${toggleIsactive ? 'open' : ''}`}>
            <Link
            
              href="/"
              onClick={() => {
                closeMenu();
              }}
              className="brandmobile"
            >
              <img src={'/assets/images/cnc-logo-icon.svg'} alt="" />
            </Link>
            {main_menu && (
              <ul className="d_flex">
                {main_menu.map((column, index) => (
                  <li
                    key={index}
                    className={` ${
                      openSubmenu === column.menu.title ? 'open' : ''
                    } ${column.sub_menu_type !== 'none' ? 'drop' : ''}`}
                  >
                    <Link
                      onClick={(e) => handleNavigation(column.menu.url, e)}
                      href={column.menu.url}
                      className={`${
                        pathname === column.menu.url ? "current" : ""
                      }`}
                    >
                      {column.menu.title}
                    </Link>
                    {column.sub_menu_type &&
                      renderSubMenu(
                        column.sub_menu_type,
                        openSubmenu === column.menu.title,
                        closeSubmenu,
                        closeMenu,
                        resetChildMenu,
                        column.menu.title,
                        handleSmoothScroll,
                        handleMouseEnter,
                        handleNavigation
                      )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {button_text && (
            <Link
              href={button_url}
              onClick={(e) => {
                closeMenu();
              }}
              className="btn"
            >
              <em>{button_text}</em>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
