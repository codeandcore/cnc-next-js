'use client'
import React, { useState } from 'react';
import './SolvingIndustriesChallenges.css';
import he from 'he';
import Link from 'next/link';

const SolvingIndustriesChallenges = ({
  sic_title,
  solving_industries,
  sic_button_name,
  sic_button_link,
}) => {
  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };
  return (
    <div className="industries_challenges">
      <div className="wrapper">
        {sic_title && <h2>{sic_title}</h2>}
        {solving_industries && (
          <div className="wrap d_flex">
            {solving_industries.slice(0, 2).map((industry, index) => (
              <Link
                href={industry.page_link}
                className={`col col${index + 1}`}
                key={index}
                onClick={handleSmoothScroll}
              >
                {industry.sic_image && (
                  <img src={industry.sic_image.url} alt={industry.si_label} />
                )}
                <div className="text">
                  {industry.si_label && (
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: he.decode(industry.si_label),
                      }}
                    ></h3>
                  )}
                  {industry.si_content && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: he.decode(industry.si_content),
                      }}
                    ></p>
                  )}
                </div>
              </Link>
            ))}
            <div className="colin d_flex">
              {solving_industries.slice(2).map((industry, index) => (
                <Link
                  href={industry.page_link}
                  className={`col col${index + 3}`}
                  key={index}
                  onClick={handleSmoothScroll}
                >
                  {industry.sic_image && (
                    <img src={industry.sic_image.url} alt={industry.si_label} />
                  )}
                  <div className="text">
                    {industry.si_label && (
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: he.decode(industry.si_label),
                        }}
                      ></h3>
                    )}
                    {industry.si_content && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: he.decode(industry.si_content),
                        }}
                      ></p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {sic_button_link && (
              <div className="mid">
                <Link
                  href={sic_button_link}
                  className="btn ball"
                  onClick={handleSmoothScroll}
                >
                  <em>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: he.decode(sic_button_name),
                      }}
                    />
                    <br />
                    <img src={"/assets/images/arrow_a.png"} alt="arrow" />
                  </em>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolvingIndustriesChallenges;
