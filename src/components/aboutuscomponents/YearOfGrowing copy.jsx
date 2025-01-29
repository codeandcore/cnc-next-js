import React, { useState, useRef, useEffect } from 'react';
import 'react-owl-carousel2/src/owl.carousel.css';
import './YearOfGrowing.css';
import YearImg1 from '../../assets/images/year_img1.jpg';
import Sarrow from '../../assets/images/s_arrow.png';
import EllipseIcon from '../../assets/images/ellipse_c.png';

const CustomDots = ({ yearData, activeIndex, handleClick }) => {
  return (
    <div className="custom-dots year d_flex d_flex_at">
      {yearData.map((item, index) => (
        <div
          key={index}
          className={`col ${index === activeIndex ? 'active' : ''} `}
          onClick={() => handleClick(index)}
        >
          <span>{item.year}</span>
        </div>
      ))}
    </div>
  );
};

const YearOfGrowing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  const handleSliderDrag = (event) => {
    setActiveIndex(event.page.index);
  };

  const handleNextClick = () => {
    // if (carouselRef.current) {
    //     carouselRef.current.next();
    //     setActiveIndex((activeIndex + 1) % yearData.length);
    // }

    if (activeIndex < yearData.length - options.items) {
      carouselRef.current.next();
      setActiveIndex((activeIndex + 1) % yearData.length);
    }
  };

  const handlePrevClick = () => {
    // if (carouselRef.current) {
    //     carouselRef.current.prev();
    //     setActiveIndex((activeIndex - 1 + yearData.length) % yearData.length);
    // }
    if (activeIndex > 0) {
      carouselRef.current.prev();
      setActiveIndex((activeIndex - 1 + yearData.length) % yearData.length);
    }
  };

  const yearData = [
    {
      year: '2015',
      description: 'CodeandCore established in Ahmedabad 1',
      image: YearImg1,
      content:
        'Lorem ipsum dolor sit amet consectetur. Tellus dolor netus fringilla ut sed dui. Id rutrum posuere sed vestibulum non risus consequat. Sapien malesuada nunc sit montes viverra. Sed nullam sagittis in interdum lectus at sed vulputate mi. Massa sit felis ultrices ullamcorper commodo neque enim. Cursus quis enim quisque dis sit euismod. Euismod cursus massa congue egestas vitae libero posuere vitae. Ipsum.',
    },
    {
      year: '2017',
      description: 'CodeandCore established in Ahmedabad 2',
      image: YearImg1,
      content:
        'Lorem ipsum dolor sit amet consectetur. Tellus dolor netus fringilla ut sed dui. Id rutrum posuere sed vestibulum non risus consequat. Sapien malesuada nunc sit montes viverra. Sed nullam sagittis in interdum lectus at sed vulputate mi. Massa sit felis ultrices ullamcorper commodo neque enim. Cursus quis enim quisque dis sit euismod. Euismod cursus massa congue egestas vitae libero posuere vitae. Ipsum.',
    },
    {
      year: '2019',
      description: 'CodeandCore established in Ahmedabad 3',
      image: YearImg1,
      content:
        'Lorem ipsum dolor sit amet consectetur. Tellus dolor netus fringilla ut sed dui. Id rutrum posuere sed vestibulum non risus consequat. Sapien malesuada nunc sit montes viverra. Sed nullam sagittis in interdum lectus at sed vulputate mi. Massa sit felis ultrices ullamcorper commodo neque enim. Cursus quis enim quisque dis sit euismod. Euismod cursus massa congue egestas vitae libero posuere vitae. Ipsum.',
    },
    {
      year: '2021',
      description: 'CodeandCore established in Ahmedabad 4',
      image: YearImg1,
      content:
        'Lorem ipsum dolor sit amet consectetur. Tellus dolor netus fringilla ut sed dui. Id rutrum posuere sed vestibulum non risus consequat. Sapien malesuada nunc sit montes viverra. Sed nullam sagittis in interdum lectus at sed vulputate mi. Massa sit felis ultrices ullamcorper commodo neque enim. Cursus quis enim quisque dis sit euismod. Euismod cursus massa congue egestas vitae libero posuere vitae. Ipsum.',
    },
    {
      year: '2023',
      description: 'CodeandCore established in Ahmedabad 5',
      image: YearImg1,
      content:
        'Lorem ipsum dolor sit amet consectetur. Tellus dolor netus fringilla ut sed dui. Id rutrum posuere sed vestibulum non risus consequat. Sapien malesuada nunc sit montes viverra. Sed nullam sagittis in interdum lectus at sed vulputate mi. Massa sit felis ultrices ullamcorper commodo neque enim. Cursus quis enim quisque dis sit euismod. Euismod cursus massa congue egestas vitae libero posuere vitae. Ipsum.',
    },
  ];

  const options = {
    items: 1,
    nav: true,
    dots: false,
    onDragged: handleSliderDrag,
  };

  return (
    <div className="year_of_growing">
      <div className="wrapper">
        <div className="top_col d_flex d_flex_at">
          <h2>09+ years of building expertise and growing with our clients</h2>
          <p>
            Since our inception in 2015, we have helped clients achieve
            sustainable growth in their digital commerce while enabling them to
            render experience-driven customer experiences.
          </p>
        </div>
        <div className="client_slider">
          <CustomDots
            yearData={yearData}
            activeIndex={activeIndex}
            handleClick={handleDotClick}
          />
          <div className="nextprev_sec d_flex">
            <div className="prev" onClick={handlePrevClick}>
              <img src={Sarrow} alt="Previous" />
            </div>
            <div className="next" onClick={handleNextClick}>
              <img src={Sarrow} alt="Next" />{' '}
            </div>
          </div>
          <div className="year_of_contants">
            {/* <OwlCarousel options={options} ref={carouselRef}>
              {yearData.map((item, index) => (
                <div className="col d_flex d_flex_at" key={index}>
                  <div className="left">
                    <h3>
                      {String(item.description).replace(/<\/?br\s*\/?>/gi, ' ')}
                    </h3>
                    <p>
                      {String(item.content).replace(/<\/?br\s*\/?>/gi, ' ')}
                    </p>
                  </div>
                  <div className="right">
                    <div
                      className="bg"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  </div>
                </div>
              ))}
            </OwlCarousel> */}
          </div>
        </div>
      </div>
      <div className="client_plateform">
        <div className="marquee_wrap">
          <div className="marquee" style={{ animationDuration: '80s' }}>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes! we are party animals.
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes, we love to fly to different countries{' '}
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Who cares about the weight
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              EAT MORE, CODE MORE
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes! we are party animals.
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes, we love to fly to different countries{' '}
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Who cares about the weight
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              EAT MORE, CODE MORE
            </div>
          </div>
          <div className="marquee" style={{ animationDuration: '50s' }}>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes! we are party animals.
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes, we love to fly to different countries{' '}
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Who cares about the weight
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              EAT MORE, CODE MORE
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes! we are party animals.
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Yes, we love to fly to different countries{' '}
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              Who cares about the weight
            </div>
            <div className="item">
              <img src={EllipseIcon} alt="circle" />
              EAT MORE, CODE MORE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearOfGrowing;
