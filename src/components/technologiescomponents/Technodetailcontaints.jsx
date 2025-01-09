'use client'
import React, { useEffect, useState } from 'react';
import './Technodetailcontaints.css';
import Link from 'next/link';

const Technodetailcontaints = ({
  title,
  subtitle,
  content,
  technoloy_icon,
}) => {


  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };

  return (
    <div className="technodetail_sec">
      <div className="wrapper">
        <Link
          href="/technologies"
          className="btn btnarrow"
        >
          <div>
            <img src={"/assets/images/ellipse_arr.png"} />
          </div>
          <em>BACK TO TECHNOLOGIES</em>
        </Link>
        <div className="project_title d_flex ">
          <div className="left_col">
            {title && <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>}
            {subtitle && <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>}
          </div>
          <div className="pro_logo d_flex d_flex_jc">
            {technoloy_icon && <img src={technoloy_icon.url} />}
          </div>
        </div>
        {content && (
          <div
            className="techno_content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Technodetailcontaints;
