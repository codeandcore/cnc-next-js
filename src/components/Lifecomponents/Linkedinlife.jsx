'use client'
import React, { useEffect, useState } from 'react';
import './Socialmedialife.css';

const Linkedinlife = ({ social_media_linkdin_title }) => {
  useEffect(() => {
    // Append the script dynamically
    const script = document.createElement('script');
    script.src =
      'https://widgets.sociablekit.com/linkedin-page-posts/widget.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="socialmedia_life socialmedia_linkdin">
      <div className="wrapper">
        {social_media_linkdin_title && (
          <h2
            dangerouslySetInnerHTML={{ __html: social_media_linkdin_title }}
          ></h2>
        )}
        <div className="inner d_flex">
          <div className="sk-ww-linkedin-page-post" data-embed-id="25488018"></div>
        </div>
      </div>
    </div>
  );
};

export default Linkedinlife;
