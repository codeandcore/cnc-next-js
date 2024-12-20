'use client'
import React, { useEffect, useState } from 'react';
import './TechnoList.css';
import he from 'he';
import Link from 'next/link';

const TechnoList = ({
  technology_list,
}) => {


  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };

  return (
    <>
      {technology_list && (
        <div className="technolist_sec">
          <div className="wrapper">
            {technology_list.map((techno, index) => (
              <div className="colin" key={index}>
                {techno.technology_title && (
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: he.decode(techno.technology_title),
                    }}
                  ></h2>
                )}
                <div className="wrap d_flex d_flex_at">
                  <div className="left_col">
                    {techno.technology_description && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: he.decode(techno.technology_description),
                        }}
                      ></p>
                    )}
                  </div>
                  {techno.programing_language && (
                    <div className="all_link d_flex d_flex_js">
                      {techno.programing_language.map((program, pindex) => (
                        <Link
                        href={`/technologies/${program.link.post_name}`}
                          onClick={(e) => {
                            handleSmoothScroll();
                            // handleLinkClick(`/technologies/${program.link.post_name}`, program.link.post_name, e);
                          }}
                          key={pindex}
                          // onMouseEnter={() => handleMouseEnter(program.link.post_name)}
                        >
                          {program.icon && <img src={program.icon.url} />}
                          {program.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TechnoList;
