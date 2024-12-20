'use client'
import React, { useState, useEffect } from 'react';
import './CasestudingBanner.css';
import 'react-select2-wrapper/css/select2.css'; // import Select2 CSS
import Select2 from 'react-select2-wrapper';
import AwardsLogo from '../careercomponents/AwardsLogo';
import he from 'he';
const CasestudingBanner = ({
  casestuding_banner_image,
  casestuding_banner_video,
  casestuding_banner_title,
  casestuding_banner_description,
  IndustryTaxonomyeData,
  ServicesTaxonomyeData,
  career_awards_logo_new,
  BASE_URL,
}) => {
  const [CasestudynewData, setCasestudynewData] = useState([]);
  const [currentCategory, setCurrentTaxonomy] = useState(null);
  // Function to generate options for the Industries dropdown
  const generateIndustryOptions = () => {
    let options = [{ id: 'all', text: 'All Industries' }]; // Include "All Industries" as the first option
    if (IndustryTaxonomyeData && IndustryTaxonomyeData.length > 0) {
      options = options.concat(
        IndustryTaxonomyeData.map((industry) => ({
          id: industry.id,
          text: he.decode(industry.name),
        })), // Decode HTML entities
      );
    }
    return options;
  };
  const industryTaxonomyName =
    IndustryTaxonomyeData.length > 0
      ? IndustryTaxonomyeData[0].taxonomy
      : 'Industry';
  // Function to generate options for the services dropdown
  const generateServicesOptions = () => {
    let options = [{ id: 'all', text: 'All Services' }]; // Include "All Industries" as the first option
    if (ServicesTaxonomyeData && ServicesTaxonomyeData.length > 0) {
      options = options.concat(
        ServicesTaxonomyeData.map((service) => ({
          id: service.id,
          text: he.decode(service.name),
        })),
      );
    }
    return options;
  };
  const servicesTaxonomyName =
    ServicesTaxonomyeData.length > 0
      ? ServicesTaxonomyeData[0].taxonomy
      : 'Services';

  const fetchCasestudy = (category = null, t_name, page = 1) => {
    let url = `${BASE_URL}/wp-json/wp/v2/case_study?per_page=1&page=${page}`;
    if (category) {
      url += `&${t_name}=${category}`;
    }
    fetch(url)
      .then((response) => {
        const total_posts = response.headers.get('X-Wp-Total');
        const total = response.headers.get('X-Wp-Totalpages');
        //  setTotalPosts(parseInt(total_posts));
        // setTotalPages(parseInt(total));
        return response.json();
      })
      .then((data) => {
        // Transform data to nest innerdata without duplication
        const transformedData = [];
        for (let i = 0; i < data.length; i += 3) {
          const mainPost = {
            id: data[i].id,
            title: data[i].case_study_post_title,
            slug: data[i].slug,
            tag_logo: data[i].acf.tag_logo,
            case_study_tags: data[i].case_study_tags,
            image: data[i].featured_image_url,
            c_right_side_logo: data[i].c_right_side_logo,
            case_total_visitors: data[i].case_total_visitors,
            case_total_orders: data[i].case_total_orders,
            cases_location: data[i].cases_location,
            google_page_speed: data[i].google_page_speed,
            award_text_and_link: data[i].award_text_and_link,
          };
          transformedData.push(mainPost);
        }
        setCasestudynewData(transformedData);
      })
      .catch((error) =>
        console.error('Error fetching data from WordPress API:', error),
      );
  };

  useEffect(() => {
    // fetchCasestudy();
  }, [BASE_URL]);
  const handleTaxonomyChange = (category, t_name) => {
    setCurrentTaxonomy(category);
    setCurrentPage(1); // Reset to first page when taxonomy changes
    //  fetchCasestudy(category, t_name,1);
  };

  const handlelodmoreChange = (page) => {
    setCurrentPage(page);
    fetchCasestudy(currentCategory, page);
  };
  return (
    <div
      className="casestuding_banner"
      style={
        casestuding_banner_image
          ? { backgroundImage: `url(${casestuding_banner_image.url})` }
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
          {IndustryTaxonomyeData && (
            <div className="selectcol">
              {industryTaxonomyName && (
                <h3>
                  {industryTaxonomyName.charAt(0).toUpperCase() +
                    industryTaxonomyName.slice(1)}
                </h3>
              )}
              <Select2
                data={generateIndustryOptions()} // Pass the dynamically generated options
                options={{ placeholder: 'All Industries' }}
                onChange={(event) =>
                  handleTaxonomyChange(event.target.value, industryTaxonomyName)
                }
              />
            </div>
          )}
          {ServicesTaxonomyeData && (
            <div className="selectcol">
              {servicesTaxonomyName && (
                <h3>
                  {servicesTaxonomyName.charAt(0).toUpperCase() +
                    servicesTaxonomyName.slice(1)}
                </h3>
              )}
              <Select2
                data={generateServicesOptions()}
                options={{ placeholder: 'All Services' }}
                onChange={(event) =>
                  handleTaxonomyChange(event.target.value, servicesTaxonomyName)
                }
              />
            </div>
          )}
        </div>
        {career_awards_logo_new && (
          <AwardsLogo career_awards_logo={career_awards_logo_new}></AwardsLogo>
        )}
      </div>
    </div>
  );
};

export default CasestudingBanner;
