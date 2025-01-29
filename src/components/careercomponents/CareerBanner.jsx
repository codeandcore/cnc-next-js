'use client'
import React, { useEffect, useState } from 'react';
import AwardsLogo from '../careercomponents/AwardsLogo';
import './CareerBanner.css';
import he from 'he';
import Link from 'next/link';
import FsLightbox from 'fslightbox-react';

const CareerBanner = ({
  career_banner_background_image,
  career_banner_title,
  career_banner_description,
  career_openings_label,
  career_opening_link,
  select_opening_job,
  career_right_side_banner_title,
  learn_more_about_codeandcore,
  career_awards_logo,
}) => {

  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const handleSmoothScroll = () => {
    const jobOpeningsSection = document.querySelector('.jobopenings');
    if (jobOpeningsSection) {
      window.scrollTo({
        top: jobOpeningsSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };
    const handlePlayClick = () => {
      setLightboxOpen(!isLightboxOpen);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          const videoElement = document.querySelector(".fslightbox-container video");
          if (videoElement) {
            
            videoElement.setAttribute("autoplay", "true");
            videoElement.play();
            clearInterval(interval); // Stop once the video element is found and updated
          }
        }, 100); // Retry every 100ms until the video element is available
      
    }, [isLightboxOpen,setLightboxOpen]);
  return (
    <div
      className="career_banner"
      style={
        career_banner_background_image
          ? { backgroundImage: `url(${career_banner_background_image.url})` }
          : {}
      }
    >
      <div className="wrapper ">
        <div className="inner d_flex">
          <div className="col_left">
            {career_banner_title && <h1>{career_banner_title}</h1>}
            {career_banner_description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: he.decode(career_banner_description),
                }}
              ></p>
            )}
            <div className='all_items'>
            {career_openings_label && (
              <a
                className="see_all"
                onClick={handleSmoothScroll}
                dangerouslySetInnerHTML={{
                  __html:
                    he.decode(career_openings_label) +
                    ' <em>(' +
                    select_opening_job.length +
                    ')</em>',
                }}
              />
            )}
            <div className='video_area'>
            <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="video"
            >
            <source src={"/assets/video/career_new_video.mp4"} type="video/mp4" />
            </video>
            <div className="play_button" onClick={handlePlayClick}>
                  PLAY
              </div>
              </div>
            </div>
           
          </div>
      
          <div className="col_right">
            {career_right_side_banner_title && (
              <h3>{career_right_side_banner_title}</h3>
            )}
            {learn_more_about_codeandcore && (
              <div className="inner d_flex">
                {learn_more_about_codeandcore.map((socialicon, index) => (
                  <Link
                    href={socialicon.career_follow_link}
                    target="_blank"
                    className="project_colanimate sp_rt"
                    key={index}
                  >
                    <span className="rt"></span>
                    <span className="rb"></span>
                    <span className="lt"></span>
                    <span className="lb"></span>
                    {socialicon.career_follow_icon && (
                      
                        <img
                          src={socialicon.career_follow_icon.url}
                          alt={socialicon.career_follow_icon.name}
                        />
                      
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
             <FsLightbox
              toggler={isLightboxOpen}
              sources={["/assets/video/career_full_video.mp4?autoplay=1&muted=1&loop=1&controls=1"]}
              types={["video"]}
              />
        {career_awards_logo && (
          <AwardsLogo career_awards_logo={career_awards_logo}></AwardsLogo>
        )}
      </div>
    </div>
  );
};

export default CareerBanner;
