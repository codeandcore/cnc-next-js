
import BASE_URL from '@/config';
import React from 'react';
import Head from '../head';
import "../../components/industrycomponents/ServicesList.css"
import OurAwards from '@/components/homecomponents/OurAwards';
import HireUs from '@/components/homecomponents/HireUs';
import IndustryBanner from '@/components/industrycomponents/IndustryBanner';
import IndustrysList from '@/components/industrycomponents/IndustrysList';
import OurApproach from '@/components/servicescomponents/OurApproach';
import CaseStudies from '@/components/homecomponents/CaseStudies';
import ClientsSay from '@/components/homecomponents/ClientsSay';

const env = process.env.NODE_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
        ? `/data/pages/industry`
            : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/710`
  
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
  
  async function fetchHomepageData() {
    const res = await fetch(
      env !== "development"
          ? `/data/pages/home`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
  }
  
  // Fetch contact data server-side
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `/data/pages/contactus`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }

export default async function IndustryPage() {
    const IndustryData = await fetchPageData();
    const homePage = await fetchHomepageData();
    const contactData = await fetchContactData();
    const yoastData =  IndustryData?.yoast_head_json

    const hireUsData =
    IndustryData && IndustryData?.acf && IndustryData?.acf.hireus_title
      ? IndustryData?.acf
      : homePage && homePage?.acf
      ? homePage?.acf
      : null;

  return (
    <>
  <Head yoastData={yoastData} />
  <div className='main_wrapper'>
      {IndustryData && (IndustryData.acf.banner_gallery || IndustryData.acf.banner_title || IndustryData.acf.banner_subtitle || IndustryData.acf.banner_clients_list 
        || IndustryData.acf.banner_background_image 
        || IndustryData.acf.banner_background_image_mobile
        || IndustryData.acf.mobile_banner_image
      ) && (
       <IndustryBanner
       banner_gallery={IndustryData.acf.banner_gallery}
       banner_title={IndustryData.acf.banner_title}
       banner_subtitle={IndustryData.acf.banner_subtitle}
       banner_clients_list={IndustryData.acf.banner_clients_list}
       banner_background_image={IndustryData.acf.banner_background_image}
       banner_background_image_mobile={IndustryData.acf.banner_background_image_mobile}
       mobile_banner_image={IndustryData.acf.mobile_banner_image}
       ></IndustryBanner>
      )}
       {IndustryData && (IndustryData.acf.industry_title || IndustryData.acf.industry_content || IndustryData.acf.industry_list || IndustryData.acf.industry_view_all_button) && (
       <IndustrysList
       service_title={IndustryData.acf.industry_title}
       service_content={IndustryData.acf.industry_content}
       service_list={IndustryData.acf.industry_list}
       service_view_all_button={IndustryData.acf.industry_view_all_button}
       ></IndustrysList>
      )}
      {IndustryData && (IndustryData.acf.our_approach_title || IndustryData.acf.our_approach_subtitle || IndustryData.acf.our_approach_list) && (
       <OurApproach
       our_approach_title={IndustryData.acf.our_approach_title}
       our_approach_subtitle={IndustryData.acf.our_approach_subtitle}
       our_approach_list={IndustryData.acf.our_approach_list}
       ></OurApproach>
      )}
       {homePage && (homePage.acf.case_studies_title || homePage.acf.case_studies_subtitle || homePage.acf.case_studies_slider) && ( 
        <CaseStudies
          case_studies_title={homePage.acf.case_studies_title}
          case_studies_subtitle={homePage.acf.case_studies_subtitle}
          case_studies_list={homePage.acf.portfolio_list}
          BASE_URL ={BASE_URL}
        >
        </CaseStudies>
           )}            
        {(homePage && (homePage.acf.our_clients_title || homePage.acf.our_clients_subtitle || homePage.acf.our_clients_button_text || homePage.acf.our_clients_button_url || homePage.acf.our_clients_testimonials))&& (
        <ClientsSay
        our_clients_title={homePage.acf.our_clients_title} 
        our_clients_subtitle={homePage.acf.our_clients_subtitle} 
        our_clients_button_text={homePage.acf.our_clients_button_text} 
        our_clients_button_url={homePage.acf.our_clients_button_url} 
        our_clients_testimonials={homePage.acf.our_clients_testimonials} 
        ></ClientsSay>
        )}
        {(homePage && (homePage.acf.our_awards_title || homePage.acf.our_awards_subtitle || homePage.acf.our_awards_list))&& (
          <OurAwards 
            title={homePage.acf.our_awards_title} 
            content={homePage.acf.our_awards_subtitle}
            our_awards_images={homePage.acf.our_awards_list}
          />
        )}
        {hireUsData &&
        (hireUsData.hireus_title ||
          hireUsData.hireus_subtitle ||
          hireUsData.hireus_button_text ||
          hireUsData.hireus_list) && (
          <HireUs
            BASE_URL={BASE_URL}
            hireus_title={hireUsData.hireus_title}
            hireus_subtitle={hireUsData.hireus_subtitle}
            hireus_button_text={hireUsData.hireus_button_text}
            hireus_list={hireUsData.hireus_list}
            contactData={contactData}
          />
        )}
    </div>
      </>
  );
};

