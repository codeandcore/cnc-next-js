'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const IndustrysList = ({
  service_title,
  service_content,
  service_list,
  service_view_all_button,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(5);
  const servicesListRef = useRef(null);
  const servicesRefs = useRef([]);
  const observerRef = useRef(null);
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

  const toggleWrap = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleScroll = () => {
    if (servicesListRef.current) {
      const servicesListBottom =
        servicesListRef.current.getBoundingClientRect().bottom + 100;
      const windowBottom = window.innerHeight;
      if (servicesListBottom <= windowBottom) {
        setVisibleCount((prevCount) =>
          Math.min(prevCount + 5, service_list.length),
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
      },
    );

    servicesRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    observerRef.current = observer;

    return () => {
      servicesRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [visibleCount]);

  return (
    <div className="services_list" ref={servicesListRef}>
      <div className="wrapper">
        <div className="top_col d_flex">
          {service_title && (
            <h2>
              {service_title} <span>{service_list.length}</span>
            </h2>
          )}
          {service_content && (
            <p dangerouslySetInnerHTML={{ __html: service_content }} />
          )}
        </div>
        <div className="services_accordion">
          {service_list.slice(0, visibleCount).map((service, index) => (
            <div
              className="colin"
              key={index}
              ref={(el) => (servicesRefs.current[index] = el)}
            >
              <div
                onClick={() => toggleWrap(index)}
                className={`top_title d_flex ${expandedIndex === index ? 'active' : ''}`}
              >
                {service.icon && (
                  <span>
                    <img src={service.icon.url} alt={service.icon.title} />
                  </span>
                )}
                <h3>{service.title}</h3>
                <div className="btnsimple">
                  <img src={"/assets/images/arrow_ss1.svg"} alt="Read More" />
                </div>
              </div>
              <div
                className={`wrap d_flex ${expandedIndex === index ? 'expanded' : ''}`}
              >
                <div
                  className="img"
                  style={{ backgroundImage: `url(${service.image.url}` }}
                >
                  {' '}
                </div>
                {service.icon && (
                  <div className="text">
                    {service.list.map((item, childindex) => (
                      <div className="col d_flex" key={childindex}>
                        <span>
                          {childindex + 1 < 10
                            ? `0${childindex + 1}`
                            : childindex + 1}
                        </span>
                        <h4>{item.title}</h4>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                        {item.link && (
                          <Link
                            href={`/services/${item.link.post_name}`}
                            onClick={(e) => {
                              closeMenu();
                              handleSmoothScroll();
                              // handleLinkClick(`/services/${item.link.post_name}`, item.link.post_name, e);
                            }}
                           
                            className="btnarrow btn"
                          >
                            <em>Read More</em>
                            <div>
                              <img src={"/assets/images/ellipse_arr.png"} alt="Read More" />
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* {service_view_all_button && (<a href={service_view_all_button.url} className="btn"><em>{service_view_all_button.title}</em></a>)} */}
      </div>
    </div>
  );
};

export default IndustrysList;
