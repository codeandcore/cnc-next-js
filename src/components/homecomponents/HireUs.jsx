'use client';
import React, { useEffect, useState } from 'react';
import './HireUs.css';
import Calendly from '../Calendly';
// import BannerVideo from "../../assets/video/hire.mp4";
import HirePopup from './HirePopup';
import UseOnScreen from '../UseOnScreen';

const HireUs = ({
  BASE_URL,
  hireus_title,
  hireus_subtitle,
  hireus_button_text,
  hireus_list,
  contactData,
}) => {
  // const [showMenu, setShowMenu] = useState(false);
  // const [contactData, setContactData] = useState(null);
  const [addUlClass, setAddUlClass] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [ref, isVisible] = UseOnScreen({ threshold: 0.1 });

  useEffect(() => {
    // Only execute in the client-side (browser)
    setIsMobile(window.innerWidth <= 767);
  }, []); // Empty dependency array to run only once after component mounts

  const handleBtnHover = () => {
    setAddUlClass(true);
  };

  const handleParentHoverOut = () => {
    setAddUlClass(false);
  };
  const handlePopupToggle = (title, content) => {
    setPopupVisible(!popupVisible);
    setPopupTitle(title);
    setPopupContent(content);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // const scaleValue = isVisible ? 1 : 1.15;
  return (
    <>
      <div
        ref={ref}
        style={{
          transform: `scale(${scaleValue})`,
        }}
        className="hireto_meetyou"
        onMouseLeave={handleParentHoverOut}
      >
        <div
          className="bg"
          style={{
            backgroundImage: `url(${isMobile ? '/assets/images/hiremobile_bg.jpg' : '/assets/images/hire_bg.jpg'})`,
          }}
        ></div>
        {!isMobile && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="video"
          >
            <source src={'/assets/video/hire.mp4'} type="video/mp4" />
          </video>
        )}
        <div className="wrapper d_flex">
          {hireus_title && (
            <h2 dangerouslySetInnerHTML={{ __html: hireus_title }}></h2>
          )}
          {hireus_subtitle && (
            <h3 dangerouslySetInnerHTML={{ __html: hireus_subtitle }}></h3>
          )}
          {hireus_list && hireus_list.length > 0 && (
            <div className="allbtn">
              {hireus_button_text && (
                <a
                  href="javascript:void(0)"
                  className={`btn ${addUlClass ? 'hide' : ''}`}
                  onMouseEnter={handleBtnHover}
                >
                  <span></span>
                  <em>{hireus_button_text}</em>
                </a>
              )}
              <Calendly
                className={`btn ${addUlClass ? 'hide' : ''}`}
                url="https://calendly.com/mayur_soni/hire_dev"
                buttonText={"Let's Talk"}
              />
              {/* {addUlClass ? ( */}
              <ul className={`d_flex ${addUlClass ? 'show' : ''}`}>
                {hireus_list.map((column, index) => (
                  <li key={index}>
                    <div
                      className="btn"
                      onClick={() =>
                        handlePopupToggle(
                          column.button_text,
                          column.button_content,
                        )
                      }
                    >
                      <span></span>
                      <em>{column.button_text}</em>
                    </div>
                  </li>
                ))}
              </ul>
              {/* ) : (
                        onMouseLeave={handleBtnLeave}
                    )} */}
            </div>
          )}
        </div>
      </div>
      {/* <HirePopup isVisible={popupVisible} title={popupTitle} content={popupContent} onClose={handlePopupToggle}  /> */}
      {contactData && (
        <HirePopup
          BASE_URL={BASE_URL}
          contact_form_service_label={
            contactData.acf.contact_form_service_label
          }
          contact_form_service_list={contactData.acf.contact_form_service_list}
          contact_form_budget_label={contactData.acf.contact_form_budget_label}
          contact_form_budget_list={contactData.acf.contact_form_budget_list}
          isVisible={popupVisible}
          onClose={() => setPopupVisible(false)}
          title={popupTitle}
          content={popupContent}
        />
      )}
    </>
  );
};

export default HireUs;
