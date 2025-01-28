'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import './ReviewBanner.css';
import Link from 'next/link';
import FsLightbox from 'fslightbox-react';

const ReviewBanner = React.memo(({
  banner_title,
  banner_description,
  right_side_title,
  discover_more,
}) => {

  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now());
  const [modalVideoKey, setModalVideoKey] = useState();
  const handleSmoothScroll = (e) => {
    e.preventDefault()
    const jobOpeningsSection = document.querySelector('.review_contant');    
    if (jobOpeningsSection) {
      window.scrollTo({
        top: jobOpeningsSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handlePlayClick = () => {
    setModalVideoKey(Date.now())
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
    
  }, [isLightboxOpen]);

  return (
    <div className="review_banner">
      <div className="wrapper ">
        <div className="inner d_flex">
          <div className="col_left">
            {banner_title && <h1>{banner_title}</h1>}
            {banner_description && (
              <p dangerouslySetInnerHTML={{ __html: banner_description }}></p>
            )}
            <div className='all_reviews d_flex'>
            <Link className="see_all" href={""} onClick={(e)=>handleSmoothScroll(e)}>
              <em>
                Read <br /> All Reviews
              </em>{' '}
              <img src={"/assets/images/dd_arrow.svg"} />
            </Link>
            <div className='video_area'>
            <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="video"
            >
              <source src={"/assets/video/reviewVideo2.mp4"} type="video/mp4" />
            </video>
            <div className="play_button" onClick={handlePlayClick}>
                  PLAY
                </div>
              </div>
            </div>
              {/* <FsLightbox
              toggler={isLightboxOpen}
              types={["video"]}
                sources={[
                  "/assets/video/reviewVideo.mp4",
                ]}
                options={{
                  slide: {
                    video: {
                      key:modalVideoKey,
                      width: "100vw",  // Full width
                      height: "90vh",
                      autoplay: true,
                      mute: 1,
                      loop:true                 
                    },
                  },
                }}
              /> */}
            <FsLightbox
              toggler={isLightboxOpen}
              sources={["/assets/video/reviewVideo.mp4?autoplay=1&muted=1&loop=1"]}
              types={["video"]}
            />
          </div>
          <div className="col_right">
            {right_side_title && <h3>{right_side_title}</h3>}
            {discover_more && (
              <div className="inner d_flex">
                {discover_more.map((socialicon, index) => (
                  <a
                    href={socialicon.review_link}
                    target="_blank"
                    className="project_colanimate sp_rt"
                    key={index}
                  >
                    <span className="rt"></span>
                    <span className="rb"></span>
                    <span className="lt"></span>
                    <span className="lb"></span>
                    {socialicon.review_icon && (
                      <div>
                        <img
                          src={socialicon.review_icon.url}
                          alt={socialicon.review_icon.name}
                        />
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
})

export default ReviewBanner;
