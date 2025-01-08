'use client'
import React, { useState, useRef, useEffect } from 'react';
import './CasestudingContaints.css';
import Link from 'next/link';


const CasestudingContaints = ({
  CaseStudycptData,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {

  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);
  const leftColRef = useRef(null);

  // Hook to handle video elements in .left_col
  useEffect(() => {
    if (leftColRef.current) {
      const videoElements = leftColRef.current.querySelectorAll('video');
      videoElements.forEach((video) => {
        video.loop = true; // Set the loop attribute
      });
    }
  }, [CaseStudycptData]); // Run the effect when CaseStudycptData changes



  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };
  
  return (
    <div className="casestuding_containts">
      <div className="wrapper">
        <Link
          href={`/portfolio/`}
          // onMouseEnter={() => handleMouseEnter('portfolio')}
          className="btn btnarrow"
        >
          <div>
            <img src={"/assets/images/ellipse_arr.png"} alt="back" />
          </div>
          <em>Back to Portfolio</em>
        </Link>
        <div className="project_title d_flex">
          {CaseStudycptData?.acf?.detail_post_title && (
            <h1>{CaseStudycptData?.acf?.detail_post_title}</h1>
          )}
          {CaseStudycptData?.acf?.c_right_side_logo && (
            <div className="pro_logo d_flex d_flex_jc">
              <img
                src={CaseStudycptData?.acf?.c_right_side_logo.url}
                alt={CaseStudycptData?.acf?.c_right_side_logo.name}
              />
            </div>
          )}
        </div>
        <div className="case_awward d_flex">
          <div className="case d_flex">
            {CaseStudycptData?.acf?.tag_logo && (
              <span>
                <img
                  src={CaseStudycptData?.acf.tag_logo.url}
                  alt={CaseStudycptData?.acf.tag_logo.name}
                />
              </span>
            )}
            {CaseStudycptData?.case_study_tags && (
              <ul className="d_flex">
                {CaseStudycptData.case_study_tags.map((caseItem, index) => (
                  <li key={index}>{caseItem.name}</li>
                ))}
              </ul>
            )}
          </div>
          {CaseStudycptData?.acf?.award_logo && (
            /* <div className='awward'>
                  {CaseStudycptData.acf.award_logo.map((logoawd, index) => (
                    logoawd.logo_url ? ( 
                     <a href={logoawd.logo_url}><img src={logoawd.c_al_logo.url} key={index} alt={logoawd.c_al_logo.name}/></a>
                    ) : null
                  ))}        
              </div> */
            <div className="awward">
              {CaseStudycptData.acf.award_logo.map((logoawd, index) =>
                logoawd.c_al_logo && logoawd.c_al_logo.url ? ( // Check if logo exists
                  logoawd.logo_url ? ( // If URL exists, wrap in a link
                    <a href={logoawd.logo_url} key={index} target="_blank">
                      <img
                        src={logoawd.c_al_logo.url}
                        alt={logoawd.c_al_logo.name}
                      />
                    </a>
                  ) : (
                    // If no URL, just display the logo
                    <img
                      src={logoawd.c_al_logo.url}
                      key={index}
                      alt={logoawd.c_al_logo.name}
                    />
                  )
                ) : null, // If no logo, render nothing
              )}
            </div>
          )}
        </div>
        {CaseStudycptData?.acf.cases_short_description && (
          <label
            dangerouslySetInnerHTML={{
              __html: CaseStudycptData.acf.cases_short_description,
            }}
          ></label>
        )}
      

        <div className="about_client ">
        <div className="industry_col">
            <div className="ndustry">
              
            </div>

            {CaseStudycptData?.acf?.case_technology_used && (
              <div className="technology">
                <h4>TECHNOLOGY USED</h4>
                <ul className="d_flex d_flex_js">
                  {CaseStudycptData.acf.case_technology_used.map(
                    (technology, index) => (
                      <li key={index}>
                        <a href={`/technologies/${technology.technology_link.post_name}`}>
                          <img
                            src={technology.c_technology_logo.url}
                            alt="TECHNOLOGY USED"
                          />
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
          {/* <div className="left_col" ref={leftColRef}>
            {CaseStudycptData?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: CaseStudycptData.content.rendered,
                }}
              ></div>
            )}
          </div> */}
          
        </div>
      </div>
    </div>
  );
};

export default CasestudingContaints;
