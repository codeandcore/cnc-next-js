'use client';
import React, { useState, useEffect } from 'react';
import './Banner.css';
import ClientPlateformMarquee from '../homecomponents/ClientPlateformMarquee';
import HirePopup from './HirePopup';

const Banner = ({
  BASE_URL,
  contactData,
  banner_background_image,
  banner_background_mobile_image,
  banner_background_video,
  banner_title,
  banner_subtitle,
  banner_button_text,
  banner_button_url,
  banner_statistics_list,
  banner_rating_platform_list,
  banner_hireus_form_title,
  banner_hireus_form_subtitle,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [backgroundhomebanner, setBackgroundhomebanner] = useState('');
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = ((e.pageX / window.innerWidth) * +60) / 2;
      const y = ((e.pageY / window.innerHeight) * +60) / 2;
      const box = document.querySelector('.ball');
      box.style.transform = `translate(${x}px, ${y}px)`;
    };
    if (window.innerWidth > 768) {
      document.body.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const option = {
    title: banner_hireus_form_title,
    content: banner_hireus_form_subtitle,
  };

  const [activeOpen, setActiveOpen] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveOpen(
        (prevIndex) => (prevIndex + 1) % banner_statistics_list.length,
      );
    }, 2200);

    return () => clearInterval(intervalId);
  }, []);

  const handlePopupToggle = (title, content) => {
    setPopupVisible(!popupVisible);
    setPopupTitle(title);
    setPopupContent(content);
  };
  useEffect(() => {
    if (popupVisible) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [popupVisible]);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundhomebanner(banner_background_image?.url || '');
    } else {
      setBackgroundhomebanner(banner_background_mobile_image?.url || '');
    }
  }, [banner_background_image, banner_background_mobile_image]);

  return (
    <>
      <div className="banner">
        <div
          className="bg"
          style={
            backgroundhomebanner
              ? { backgroundImage: `url(${backgroundhomebanner})` }
              : {}
          }
        ></div>
        {banner_background_video && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="video"
          >
            <source src={banner_background_video.url} type="video/mp4" />
          </video>
        )}
        <div className="wrapper d_flex">
          <div className="left_col">
            {banner_title && <h1>{banner_title}</h1>}
            {banner_subtitle && (
              <p dangerouslySetInnerHTML={{ __html: banner_subtitle }}></p>
            )}
            {banner_button_text && (
              <a
                href="#"
                className="btn ball"
                onClick={() => handlePopupToggle(option.title, option.content)}
              >
                <em
                  dangerouslySetInnerHTML={{
                    __html: `${banner_button_text}<br/><img src='/assets/images/arrow_a.png' alt='arrow' />`,
                  }}
                ></em>
              </a>
            )}
          </div>
          <div className="right_col">
            {banner_statistics_list && banner_statistics_list.length > 0 && (
              <div className="project_colanimate sp_rt">
                <div className="wrap">
                  {banner_statistics_list.map((column, index) => (
                    <div
                      key={index}
                      className={`col ${index === activeOpen ? 'open' : ''}`}
                    >
                      <span className="rt"></span>
                      <span className="rb"></span>
                      <h3>{column.number}</h3>
                      <h4>{column.label}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ClientPlateformMarquee
              banner_ratitest={banner_rating_platform_list}
            />
          </div>
        </div>
      </div>
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

export default Banner;
