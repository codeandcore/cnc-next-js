'use client';
import './OurEmployeeandtech.css';
import React, { useRef, useEffect } from 'react';
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
  items: 1,
  loop: false,
  margin: 0,
  nav: true,
};


const OurEmployeeExperience = ({
  a_left_side_section_title,
  employee_experience_detail,
}) => {

  var $ = require("jquery");
  if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
  }
  
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
  });
const changecorousel = () => {
  setTimeout(() => {
    document.querySelector('.our_employee_experience .owl-stage-outer').style.height = `${document.querySelector('.our_employee_experience .owl-item.active').offsetHeight}px`
  }, 200);
}
  return (
    <div className="our_employee_experience">
      <h2>{a_left_side_section_title}</h2>
      {employee_experience_detail && (
        <OwlCarousel
          onChange={changecorousel}
          className="owl-theme"
          {...options}
       >
          {employee_experience_detail.map((experience, index) => (
            <div key={index} className="colin">
              {experience.a_employee_image && (
                <div className="img">
                  <div
                    className="bg"
                    style={{
                      backgroundImage: `url(${experience.a_employee_image.url})`,
                    }}
                  ></div>
                </div>
              )}
              <div className="text">
                <h3>
                  <img src={"/assets/images/quata1.png"} />
                  <strong>{experience.a_employee_name} / </strong>
                  {experience.a_employee_role}
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: experience.employee_quote,
                  }}
                ></p>
              </div>
            </div>
          ))}

       </OwlCarousel>
      )}
    </div>
  );
};

export default OurEmployeeExperience;
