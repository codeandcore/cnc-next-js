'use client';
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
  portfolio_API,
}) => {
  const [backgroundhomebanner, setBackgroundhomebanner] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState({
    value: 'All Industry',
    label: 'All Industry',
    id: 'all',
  });
  const [selectedService, setSelectedService] = useState('all');
  const [CaseStudycptData, setCaseStudycptData] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [isLoadk, setIsLoadk] = useState(false);

  const options = IndustryTaxonomyeData.map((industry) => ({
    value: industry.slug,
    label: industry.name,
    id: industry.term_id,
  }));
  options.unshift({
    value: 'All Industry',
    label: 'All Industry',
    id: 'all',
  })

  useEffect(() => {
    setBackgroundhomebanner(
      window.innerWidth > 768
        ? casestuding_banner_image?.url || ''
        : banner_background_image_mobile?.url || ''
    );
  }, [casestuding_banner_image, banner_background_image_mobile]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/custom/v1/${portfolio_API}?page=${page}&per_page=${perPage}&industry=${selectedIndustry?.id}&services=${selectedService}`
      );
      const data = await response.json();
      setCaseStudycptData((prevData) =>
        page === 1 ? data.data : [...prevData, ...data.data]
      );
      setHasMorePages(data.current_page < data.total_pages);
    } catch (error) {
      console.error('Error fetching case study data:', error);
    } finally {
      setIsLoadk(false);
    }
  }, [portfolio_API, page, perPage, selectedIndustry, selectedService]);
  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setIsLoadk(true)
  },[])

  const handleIndustryChange = (value) => {
    setIsLoadk(true)
    setSelectedIndustry(value);
    setPage(1); // Reset to the first page
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
                onChange={handleIndustryChange}
                classNamePrefix="select2"
              />
            </div>
            <div className="selectcol">
              <h3>Services</h3>
              {/* Placeholder for services dropdown */}
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
