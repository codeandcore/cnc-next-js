'use client'
import React, { useEffect, useState } from 'react';
import './ServicesDetailsBanner.css';

const ServicesDetailsBanner = ({
  banner_background_image,
  industry_banner_background_image_mobile,
  banner_background_video,
  banner_title,
  banner_subtitle,
  banner_clients_list,
}) => {
  const [backgroundhomebanner, setBackgroundhomebanner] = useState('');
  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundhomebanner(banner_background_image?.url || '');
    } else {
      setBackgroundhomebanner(industry_banner_background_image_mobile?.url || '');
    }
  }, [banner_background_image, industry_banner_background_image_mobile]);
  return (
    <div
      className="servicesdetails_banner"
      style={
        backgroundhomebanner
          ? { backgroundImage: `url(${backgroundhomebanner})` }
          : {}
      }
    >
      {banner_background_video && (
        <video
          key={banner_background_video?.url}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="video"
        >
          <source src={banner_background_video?.url} type="video/mp4" />
        </video>
      )}
      <div className="wrapper ">
        <div className="inner d_flex">
          <div className="col_left">
            <h1 dangerouslySetInnerHTML={{ __html: banner_title }}></h1>
            <div dangerouslySetInnerHTML={{ __html: banner_subtitle }}></div>
            <div className="inner d_flex">
              {banner_clients_list.map((client, index) => (
                <a
                  href={client.url}
                  target="_blank"
                  className="project_colanimate sp_rt"
                  key={index}
                  rel="noreferrer"
                >
                  <span className="rt"></span>
                  <span className="rb"></span>
                  <span className="lt"></span>
                  <span className="lb"></span>
                  {client.logo && (
                    <img src={client.logo.url} alt={client.logo.name} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsBanner;
