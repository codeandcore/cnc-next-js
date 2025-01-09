'use client'
import React, { useEffect, useState } from 'react';
import './IndustryBanner.css';
import AwardsLogo from '../careercomponents/AwardsLogo';

const IndustryBanner = ({
  banner_gallery,
  banner_title,
  banner_subtitle,
  banner_clients_list,
  banner_background_image,
  banner_background_image_mobile,
  mobile_banner_image,
}) => {
  const [backgroundhomebanner, setBackgroundhomebanner] = useState('');
  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundhomebanner( banner_background_image?.url || '');
    } else {
      setBackgroundhomebanner(banner_background_image_mobile?.url || '');
    }
  }, [banner_background_image, banner_background_image_mobile]);
  return (
    <div
      className="industry_banner"
      style={
        backgroundhomebanner
          ? { backgroundImage: `url(${backgroundhomebanner})` }
          : {}
      }
    >
      <div className="oversection">
        {banner_gallery && (
          <div className="animation_sec wrapper">
            {banner_gallery.map((bannner, index) => (
              <div className={`animation anim_${index + 1}`} key={index}>
                <img src={bannner.url} alt={bannner.title} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="wrapper ">
        <div className="left_col">
          {banner_title && <h1>{banner_title}</h1>}
          {banner_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: banner_subtitle }}></p>
          )}
          {banner_clients_list && (
            <AwardsLogo career_awards_logo={banner_clients_list}></AwardsLogo>
          )}
        </div>
        <div className="right_col">
          <img src={mobile_banner_image.url} />
        </div>
      </div>
    </div>
  );
};

export default IndustryBanner;
