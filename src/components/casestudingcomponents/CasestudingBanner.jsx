'use client'
import React, { useState, useEffect, useCallback } from 'react';
import './CasestudingBanner.css';
import AwardsLogo from '../careercomponents/AwardsLogo';
import he from 'he';
import CasestudingExploreData from './CasestudingExploreData';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
const CasestudingBanner = ({
  casestuding_banner_image,
  banner_background_image_mobile,
  casestuding_banner_video,
  casestuding_banner_title,
  casestuding_banner_description,
  IndustryTaxonomyeData,
  career_awards_logo_new,
  isLoadingk,
  BASE_URL,
}) => {

  const [backgroundhomebanner, setBackgroundhomebanner] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState({
    value: "All Industry",
    label: "All Industry",
    id: "all"
});
  const [selectedService, setSelectedService] = useState("all");
  const [CaseStudycptData, setCaseStudycptData] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [isLoadk, setIsLoadk] = useState(false);
  // Initialize state with IndustryTaxonomyeData
  const options = IndustryTaxonomyeData.map(industry => ({
    value: industry.slug,
    label: industry.name,
    id:industry.term_id
}));


  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundhomebanner(casestuding_banner_image?.url || '');
    } else {
      setBackgroundhomebanner(banner_background_image_mobile?.url || '');
    }
  }, [casestuding_banner_image, banner_background_image_mobile]);

  
  const handleLoadMore = () => {
    setIsLoadk(true);
    setPage((prevPage) => prevPage + 1);
  };

  const fetchData =  async () => {
    setIsLoadk(true);
    try {
      const response = await fetch(
        `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/custom/v1/case-study-list?page=${page}&per_page=${perPage}&industry=${selectedIndustry?.id}&services=${selectedService}`
      );
      const data = await response.json();
      setIsLoadk(false);
      setHasMorePages(data.current_page < data.total_pages);
      setCaseStudycptData((prevData) =>
        page === 1 ? data.data : [...prevData, ...data.data]
      ); // Reset data if page is 1
      setPerPage(8)
    } catch (error) {
      setIsLoadk(false);
      console.error("Error fetching case study data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, selectedIndustry]);

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    setIsLoadk(true);
    setPage(1);
    setCaseStudycptData([]); // Clear previous data
  };

  return (
    <>
      <div
      className="casestuding_banner"
      style={
        backgroundhomebanner
          ? { backgroundImage: `url(${backgroundhomebanner})` }
          : {}
      }
    >
      {casestuding_banner_video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="video"
        >
          <source src={casestuding_banner_video.url} type="video/mp4" />
        </video>
      )}
      <div className="wrapper">
        {casestuding_banner_title && (
          <h1
            dangerouslySetInnerHTML={{
              __html: he.decode(casestuding_banner_title),
            }}
          ></h1>
        )}
        {casestuding_banner_description && (
          <p>{casestuding_banner_description}</p>
        )}
        <div className="wrap d_flex d_flex_js">
          <div className="selectcol">
            <h3>Industries</h3>
              <Select
                isSearchable={false}
                options={options}
                value={selectedIndustry}
                placeholder="All Industry"
                onChange={(e) => {
                  handleIndustryChange(e)
                }}
                classNamePrefix="select2" 
              />
          </div>
          <div className="selectcol">
            <h3>Services</h3>
            {/* <Select2
              data={generateServicesOptions()}
              value={selectedService}
              options={{ placeholder: 'All Services' }}
              onSelect={(e) => handleServiceChange(e.target.value)}
            /> */}
          </div>
          <span
            className="loaderdata"
            style={{ display: isLoadingk ? 'inline-block' : 'none' }}
          >
            <img
              src={'/assets/images/rotate-right.png'}
              alt="rotate-right"
            />
          </span>
        </div>
        {career_awards_logo_new && (
          <AwardsLogo career_awards_logo={career_awards_logo_new} />
        )}
      </div>
      </div>
    <CasestudingExploreData
        CaseStudycptData={CaseStudycptData}
        onLoadMore={handleLoadMore}
        hasMorePages={hasMorePages}
        isLoadk={isLoadk}
      />
      </>
  );
};

export default CasestudingBanner;
