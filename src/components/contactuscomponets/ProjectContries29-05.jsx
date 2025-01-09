import React, { useState, useRef } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';
import './ProjectContries.css';
// import data from './projectCountriesData.json';
import ArrowsIcon from '../../assets/images/arrow_ss1.svg';
const CustomDots = ({ countriesdata, activeIndex, handleClick }) => {
  return (
    <div className="contries_wrap">
      <div className="contries_title d_flex d_flex_jc">
        {countriesdata.map((country, index) => (
          <div
            key={index}
            className={`col ${index === activeIndex ? 'active' : ''} `}
            onClick={() => handleClick(index)}
          >
            <span>
              <img src={require(`../../assets/images/${country.icon}.png`)} />
            </span>
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCountries = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Set the initial activeTab state
  const carouselRef = useRef(null);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  const handleNextClick = () => {
    if (activeIndex < countriesdata.length - options.items) {
      carouselRef.current.next();
      setActiveIndex((activeIndex + 1) % countriesdata.length);
    }
  };

  const handlePrevClick = () => {
    if (activeIndex > 0) {
      carouselRef.current.prev();
      setActiveIndex(
        (activeIndex - 1 + countriesdata.length) % countriesdata.length,
      );
    }
  };

  const countriesdata = [
    {
      id: 'ISREAL',
      name: 'Israel',
      icon: 'Israelicon',
      flag: 'israelflag',
      map: 'Israelmap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Europe',
      name: 'Europe',
      icon: 'europeicon',
      flag: 'europeflag',
      map: 'europemap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Unitedstate',
      name: 'United State',
      icon: 'unitedstateicon',
      flag: 'unitedstateflag',
      map: 'unitedstatemap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Canada',
      name: 'Canada',
      icon: 'canadaicon',
      flag: 'canadaflag',
      map: 'canadamap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Dubai',
      name: 'Dubai',
      icon: 'dubaiicon',
      flag: 'dubaiflag',
      map: 'dubaimap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Ireland',
      name: 'Ireland',
      icon: 'irelandicon',
      flag: 'irelandflag',
      map: 'irelandmap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Germany',
      name: 'Germany',
      icon: 'germanyicon',
      flag: 'germanyflag',
      map: 'germanymap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Denmany',
      name: 'Denmany',
      icon: 'denmanyicon',
      flag: 'denmanyflag',
      map: 'denmanymap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Unitedkin',
      name: 'United kingdom',
      icon: 'unitedkinicon',
      flag: 'unitedkingdom',
      map: 'unitedkinmap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Italy',
      name: 'Italy',
      icon: 'italyicon',
      flag: 'italyflag',
      map: 'italymap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Australia',
      name: 'Australia',
      icon: 'australiaicon',
      flag: 'australiaflag',
      map: 'australiamap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'France',
      name: 'France',
      icon: 'franceicon',
      flag: 'franceflag',
      map: 'francemap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
    {
      id: 'Mexico',
      name: 'Mexico',
      icon: 'mexicoicon',
      flag: 'mexicoflag',
      map: 'mexicomap',
      clients: '185+',
      projectsCompleted: '435+',
      industries:
        'Tourism, Energy, Healthcare, Manufacturing, Technology and Innovation, Agriculture, Retail and Consumer Goods, etc...',
      technologyUtilized:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
      projectsDescription:
        'Site from Scratch, UX/UI Design, Web Designing, Web development, Monthly maintenance',
    },
  ];
  // Calculate the initial active index for dots
  // const initialActiveIndex = Math.floor(countriesdata.length / 2);

  //   const handleSliderDrag = (event) => {
  //     setActiveIndex(event.page.index);
  //     console.log('Slider dragged, activeIndex:', activeIndex);
  // };
  const options = {
    items: 1,
    nav: true,
    dots: false,
    // onDragged: handleSliderDrag,
  };

  return (
    <div className="project_contries">
      <div className="wrapper d_flex d_flex_jc">
        <h2>
          Until now we have successfully delivered
          <br /> projects in all these countries
        </h2>
        <div className="nextprev_sec d_flex">
          <div className="prev" onClick={handlePrevClick}>
            <img src={ArrowsIcon} />
          </div>
          <div className="next" onClick={handleNextClick}>
            <img src={ArrowsIcon} />{' '}
          </div>
        </div>
        <div className="inner">
          <CustomDots
            countriesdata={countriesdata}
            activeIndex={activeIndex}
            // activeIndex={initialActiveIndex}
            handleClick={handleDotClick}
          ></CustomDots>

          <div className="contries_contain">
            <OwlCarousel options={options} ref={carouselRef}>
              {countriesdata.map((country, index) => (
                <div key={index} className="colin d_flex ">
                  <div className="left_col">
                    <div className="top_col d_flex d_flex_at">
                      <div className="img">
                        <img
                          src={require(
                            `../../assets/images/${country.flag}.png`,
                          )}
                        />
                      </div>
                      <p>
                        {country.name}, nestled at the crossroads of the Middle
                        East, boasts a vibrant blend of ancient history, modern
                        innovation, and diverse cultures, making it a
                        captivating and significant nation in the region.
                      </p>
                    </div>
                    <div className="map">
                      <img
                        src={require(`../../assets/images/${country.map}.png`)}
                      />
                    </div>
                  </div>
                  <div className="right_col">
                    <div className="coltext d_flex d_flex_at">
                      <h4>We handle a total of {country.name}'s clients: </h4>
                      <p>{country.clients}</p>
                    </div>
                    <div className="coltext d_flex d_flex_at">
                      <h4>We have completed a total of projects:</h4>
                      <p>{country.projectsCompleted}</p>
                    </div>
                    <div className="coltext d_flex d_flex_at">
                      <h4>We handle industries in {country.name}:</h4>
                      <p>{country.industries}</p>
                    </div>
                    <div className="coltext d_flex d_flex_at">
                      <h4>We utilized technology:</h4>
                      <p>{country.technologyUtilized}</p>
                    </div>
                    <div className="coltext d_flex d_flex_at">
                      <h4>In these projects, we create:</h4>
                      <p>{country.projectsDescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCountries;
