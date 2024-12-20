'use client'
import React, { useEffect, useState } from 'react';
import AwardsLogo from '../careercomponents/AwardsLogo';
import './ServicesBanner.css';

const ServicesBanner = ({
  banner_background_image,
  banner_background_image_mobile,
  banner_background_video,
  banner_clients_list,
  banner_subtitle,
  banner_title,
}) => {



  const [backgroundhomebanner, setBackgroundhomebanner] = useState('');
  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundhomebanner(banner_background_image?.url || '');
    } else {
      setBackgroundhomebanner(banner_background_image_mobile?.url || '');
    }
  }, [banner_background_image, banner_background_image_mobile]);

  return (
    <div
      className="services_banner"
      style={
        backgroundhomebanner
          ? { backgroundImage: `url(${backgroundhomebanner})` }
          : {}
      }
    >
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
      <div className="wrapper ">
        <div className="inner">
          {banner_title && <h1>{banner_title}</h1>}
          {banner_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: banner_subtitle }}></p>
          )}
        </div>
        {banner_clients_list && (
          <AwardsLogo career_awards_logo={banner_clients_list}></AwardsLogo>
        )}
      </div>
    </div>
  );
};

export default ServicesBanner;
