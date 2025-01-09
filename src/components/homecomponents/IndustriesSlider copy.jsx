import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';
import './IndustriesSlider.css';
import EllipseArrow from '../../assets/images/ellipse_arr.png';
import UseOnScreen from '../UseOnScreen';

const IndustriesSlider = ({
  industries_title,
  industries_subtitle,
  industries_list,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fetchedPages, setFetchedPages] = useState({});
  const [hoveredItemData, setHoveredItemData] = useState(null);
  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  // Refs for the titles and contents
  const titleRefs = useRef([]);
  const contentRefs = useRef([]);

  // Calculate the max height and apply it to titles and content
  useEffect(() => {
    if (industries_list.length > 0) {
      // Get the max height for all titles
      const titleHeights = titleRefs.current.map(
        (title) => title?.offsetHeight || 0,
      );
      const maxTitleHeight = Math.max(...titleHeights);

      // Get the max height for all content
      const contentHeights = contentRefs.current.map(
        (content) => content?.offsetHeight || 0,
      );
      const maxContentHeight = Math.max(...contentHeights);

      // Apply the max height to all titles and content
      titleRefs.current.forEach((title) => {
        if (title) title.style.height = `${maxTitleHeight}px`;
      });

      contentRefs.current.forEach((content) => {
        if (content) content.style.height = `${maxContentHeight}px`;
      });
    }
  }, [industries_list]);

  const handleMouseEnter = (menuItem) => {
    if (menuItem === '/') {
      menuItem = '/home';
    }

    if (!fetchedPages[menuItem]) {
      return fetch(`/data/pages/${menuItem}`)
        .then((response) => response.json())
        .then((data) => {
          setFetchedPages((prevState) => ({ ...prevState, [menuItem]: data }));
          setHoveredItemData(data);
          setPrefetchedData(data);
          localStorage.setItem('prefetchedData', JSON.stringify(data));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      setHoveredItemData(fetchedPages[menuItem]);
    }
  };

  const handleLinkClick = async (url, urlc, e = null) => {
    // if (location.pathname === url) {
    //     return;
    // }
    // if (e.ctrlKey || e.metaKey) {
    //     return;
    // }
    // e.preventDefault();
    // try {
    //     setIsLoading(true);
    //     setIsDone(false);
    //     setIsFinish(false);
    //     await handleMouseEnter(urlc);
    //     setIsLoading(false);
    //     navigate(url);
    // } catch (error) {
    //     console.error("Error handling link click:", error);
    // }
  };

  const options = {
    items: 3,
    loop: false,
    margin: 5,
    nav: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
        autoWidth: false,
      },
      768: {
        items: 3,
        autoWidth: true,
      },
    },
  };

  const owlCarouselRef = useRef(null);

  useEffect(() => {
    const menuItem = location.pathname === '/' ? '/home' : location.pathname;

    if (!fetchedPages[menuItem]) {
      fetch(`/data/pages/${menuItem}`)
        .then((response) => response.json())
        .then((data) => {
          setFetchedPages((prevState) => ({ ...prevState, [menuItem]: data }));
          setPrefetchedData(data);
        });
    }
  }, [location.pathname, setPrefetchedData, fetchedPages]);

  return (
    <div
      ref={ref}
      className={`industries_lider ${isVisible ? 'On-screen' : ''}`}
    >
      <div className="wrapper d_flex">
        {industries_title && <h2>{industries_title}</h2>}
        {industries_subtitle && (
          <p dangerouslySetInnerHTML={{ __html: industries_subtitle }} />
        )}
      </div>
      <div className="inner">
        <OwlCarousel options={options} ref={owlCarouselRef}>
          {industries_list.map((item, index) => (
            <div key={index} className="colin">
              <Link
                to={`industry/${item.button_url.post_name}`}
                title={`${item.button_url.post_name}`}
                onClick={(e) =>
                  handleLinkClick(
                    `/industry/${item.button_url.post_name}`,
                    item.button_url.post_name,
                    e,
                  )
                }
                className="col"
                // onMouseEnter={() => handleMouseEnter(item.button_url.post_name)}
              >
                <div className="img">
                  <div
                    className="bg"
                    style={{ backgroundImage: `url(${item.image.url})` }}
                  ></div>
                  <span className="icon_link">
                    <img src={item.icon.url} alt={item.title} />
                  </span>
                </div>
                <h3
                  className="h2"
                  ref={(el) => (titleRefs.current[index] = el)}
                >
                  {item.title}
                </h3>
                <p ref={(el) => (contentRefs.current[index] = el)}>
                  {item.content}
                </p>
                <div className="btn btnarrow">
                  <em>{item.button_text}</em>
                  <div>
                    <img src={EllipseArrow} alt="Read More" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default IndustriesSlider;
