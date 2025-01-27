'use client'
import React, { useEffect, useState } from 'react';
import './JobOpenings.css';
import he from 'he';
import BASE_URL from '../../config';
import CareerPopup from './CareerPopup';

const JobOpenings = ({
  jon_opening_title,
  job_opening_description,
  select_opening_job,
  connect_content_info,
  CareerpageData,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [jobOpeningCount, setJobOpeningCount] = useState(0);

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);


  const toggleWrap = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handlePopupToggle = (title) => {
    setPopupVisible(!popupVisible);
    setPopupTitle(title);
  };
  //Function to handle smooth scrolling
  const handleSmoothScroll = (index) => {
    const sections = document.querySelectorAll('.jobopenings .colin'); // Get all sections
    const section = sections[index]; // Target the section based on the index

    if (section) {
      // Scroll to the section smoothly
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // After the scroll is completed, offset the position by -150px
      setTimeout(() => {
        window.scrollBy({
          top: -150,
          behavior: 'smooth',
        });
      }, 0.01); // Adjust delay as needed
    }
  };


  useEffect(() => {
    setJobOpeningCount(select_opening_job.length);
  }, [select_opening_job]);

  
  if (!isClient) return null;

  return (
    <>
      <div className="jobopenings">
        <div className="wrapper">
          {jon_opening_title && (
            <h2>
              {jon_opening_title}{' '}
              <span>{jobOpeningCount.toString().padStart(2, '0')}</span>
            </h2>
          )}
          {job_opening_description && (
            <p
              dangerouslySetInnerHTML={{
                __html: he.decode(job_opening_description),
              }}
            ></p>
          )}
          {select_opening_job && (
            <>
              {select_opening_job.map((job, index) => (
                <div className="colin" key={index}>
                  <div className="top_col d_flex">
                    <div className="left d_flex">
                      {job.post_acf.job_title_logo && (
                        <div className="img">
                          <img
                            src={job.post_acf.job_title_logo}
                            alt={job.post_acf.job_details_title}
                          />
                        </div>
                      )}
                      <div className="text">
                        {job.post_acf.job_details_title && (
                          <h3>{job.post_acf.job_details_title}</h3>
                        )}
                        {job.post_acf.job_location && (
                          <span>Location: {job.post_acf.job_location}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className="btn btnarrow dark"
                      onClick={() =>
                        handlePopupToggle(job.post_acf.job_details_title)
                      }
                    >
                      <em>APPLY NOW</em>
                      <div className='arrow_img'>
                        <img src={"/assets/images/ellipse_arr_hover.png"} alt="Read More" />
                        <img src={"/assets/images/ellipse_arr.png"} alt="Read More"  className='hover_img'/>
                      </div>
                    </span>
                  </div>
                  {job.post_acf.salary && (
                    <label>
                      <span>Salary:</span> {job.post_acf.salary}
                    </label>
                  )}
                  {job.post_acf.job_details_experience && (
                    <label>
                      <span>Experience:</span>{' '}
                      {job.post_acf.job_details_experience}
                    </label>
                  )}
                  {job.post_acf.job_details_vacancies && (
                    <label>
                      <span>Vacancies:</span>{' '}
                      {job.post_acf.job_details_vacancies}
                    </label>
                  )}
                  {job.post_acf.job_skills_blog && (
                    <label>
                      <span>Skills:</span>{' '}
                      {job.post_acf.job_skills_blog
                        .map((skill) => skill.job_skills)
                        .join(', ')}
                    </label>
                  )}
                  <div
                    className={`wrap ${expandedIndex === index ? 'expanded' : ''}`}
                  >
                    {job.post_acf.job_overview && (
                      <div className="col">
                        <h4>Job Overview:</h4>
                        {job.post_acf.job_overview && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: he.decode(job.post_acf.job_overview),
                            }}
                          ></p>
                        )}
                      </div>
                    )}
                    {job.post_acf.job_responsibilities && (
                      <div className="col">
                        <h4>Responsibilities:</h4>
                        <ul>
                          {job.post_acf.job_responsibilities.map(
                            (responsibility, idx) => (
                              <li key={idx}>
                                {responsibility.resposibility_label}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                    {job.post_acf.job_qualifications && (
                      <div className="col">
                        <h4>Qualifications:</h4>
                        <ul>
                          {job.post_acf.job_qualifications.map(
                            (qualification, idx) => (
                              <li key={idx}>{qualification.lable_job}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                    {job.post_acf
                      .required_experience_skills_and_qualifications && (
                      <div className="col">
                        <h4>
                          Required Experience, Skills, and Qualifications:
                        </h4>
                        <ul>
                          {job.post_acf.required_experience_skills_and_qualifications.map(
                            (requiredexperience, idx) => (
                              <li key={idx}>{requiredexperience.esq_abel}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                    {job.post_acf.life_job_codeandcore && (
                      <div className="col">
                        <h4>Life @ codeandcore:</h4>
                        {job.post_acf.life_job_codeandcore.map((link, idx) => (
                          <p key={idx}>
                            <a href={link.ljc_label} target="_blank">
                              {link.ljc_label}
                            </a>
                          </p>
                        ))}
                      </div>
                    )}
                    <span
                      className="btn btnarrow  dark"
                      onClick={() =>
                        handlePopupToggle(job.post_acf.job_details_title)
                      }
                    >
                      <em>APPLY NOW</em>
                      <div className='arrow_img'>
                        <img src={"/assets/images/ellipse_arr_hover.png"} alt="Read More" />
                        <img src={"/assets/images/ellipse_arr.png"} alt="Read More"  className='hover_img'/>
                      </div>
                    </span>
                  </div>
                  {/* onClick={() => { closeMenu();  }}  */}
                  <button
                    className={`btn ${expandedIndex === index ? 'active' : ''}`}
                    onClick={() => {
                      toggleWrap(index);
                      handleSmoothScroll(index);
                    }}
                  >
                    {expandedIndex === index ? (
                      <em>Read less</em>
                    ) : (
                      <em>Read more</em>
                    )}
                    <img src={"/assets/images/arrow.png"} alt="read_more" />
                  </button>
                </div>
              ))}
            </>
          )}
          {connect_content_info && (
            <div className="connect_with">
              {connect_content_info && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: he.decode(connect_content_info),
                  }}
                ></p>
              )}
            </div>
          )}
        </div>
      </div>
      <CareerPopup
        BASE_URL={BASE_URL}
        isVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title={popupTitle}
        CareerpageData={CareerpageData}
      />
    </>
  );
};

export default JobOpenings;
