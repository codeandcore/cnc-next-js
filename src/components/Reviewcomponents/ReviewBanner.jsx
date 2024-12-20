'use client'
import React from 'react';
import './ReviewBanner.css';
import Link from 'next/link';

const ReviewBanner = ({
  banner_title,
  banner_description,
  right_side_title,
  discover_more,
}) => {
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

  return (
    <div className="review_banner">
      <div className="wrapper ">
        <div className="inner d_flex">
          <div className="col_left">
            {banner_title && <h1>{banner_title}</h1>}
            {banner_description && (
              <p dangerouslySetInnerHTML={{ __html: banner_description }}></p>
            )}
            <Link className="see_all" href={""} onClick={(e)=>handleSmoothScroll(e)}>
              <em>
                Read <br /> All Reviews
              </em>{' '}
              <img src={"/assets/images/dd_arrow.svg"} />
            </Link>
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
};

export default ReviewBanner;
