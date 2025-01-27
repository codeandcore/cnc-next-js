'use client';
import React, { useState, useRef } from 'react';
import './ClientsSay.css';
// import Sarrow from '../../assets/images/arrow_ss1.svg';
import UseOnScreen from '../UseOnScreen';
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const ClientsSay = ({
  our_clients_title,
  our_clients_subtitle,
  our_clients_button_text,
  our_clients_button_url,
  our_clients_testimonials,
}) => {


  const options = {
    items: 1,
    loop: false,
    nav: true,
    dots: false,
    // autoHeight:true,
};

  const owlCarouselRef = useRef(null);
  const [ref, isVisible] = UseOnScreen({ threshold: 0.3 });
  var $ = require("jquery");
  if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
  }
  
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
  });
  const changecorousel = () => {
    setTimeout(() => {
      document.querySelector('.our_clientssay .owl-stage-outer').style.height = `${document.querySelector('.our_clientssay .owl-item.active').offsetHeight}px`
    }, 200);
  }
  return (
    <div
      className={`our_clientssay ${isVisible ? 'section-visible' : ''}`}
      ref={ref}
    >
      <div className="wrapper d_flex">
        <div className="left_col">
          {our_clients_title && (
            <h2 dangerouslySetInnerHTML={{ __html: our_clients_title }} />
          )}
          {our_clients_subtitle && <p>{our_clients_subtitle}</p>}
          {our_clients_button_text && our_clients_button_url && (
            <a href={our_clients_button_url} className="btn btnarrow ">
              <span></span>
              <em>{our_clients_button_text}</em>
              <div>
                <img
                  src={'/assets/images/ellipse_arr.png'}
                  alt="Double Quote"
                />
              </div>
            </a>
          )}
        </div>
        <div className="right_col">
          {our_clients_testimonials && our_clients_testimonials.length > 0 && (
                   <OwlCarousel {...options} ref={owlCarouselRef} onChange={changecorousel} className="owl-theme">
  {our_clients_testimonials.map((item, index) => (
    <div className="col" key={index}>
      <h2 dangerouslySetInnerHTML={{ __html: item.testimonial }} />
      <div className="clintlist d_flex">
        <ul className="d_flex">
          {item.person_photo && (
            <li>
              <img
                src={item.person_photo.url}
                alt={item.person_photo.name}
              />
            </li>
          )}
          {item.company_logo && (
            <li>
              <img
                src={item.company_logo.url}
                alt={item.company_logo.name}
              />
            </li>
          )}
        </ul>
        <div className="text">
          <h4>{item.clientName}</h4>
          <label className="d_flex">{item.person_name}</label>
          <label
            className="d_flex"
            dangerouslySetInnerHTML={{
              __html: item.person_designation,
            }}
          ></label>
        </div>
      </div>
    </div>
  ))}
</OwlCarousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsSay;
