
import CaseStudies from '@/components/homecomponents/CaseStudies';
import ClientsSay from '@/components/homecomponents/ClientsSay';
import HireUs from '@/components/homecomponents/HireUs';
import OurAwards from '@/components/homecomponents/OurAwards';
import OurApproach from '@/components/servicescomponents/OurApproach';
import ServicesBanner from '@/components/servicescomponents/ServicesBanner';
import ServicesList from '@/components/servicescomponents/ServicesList';
import BASE_URL from '@/config';
import React from 'react';
import Head from '../head';

const env = process.env.NODE_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
          ? `/data/pages/services`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/609`
  
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

export default async function ServicePage() {
  const serviceData = await fetchPageData();
  const homePage = await fetchHomepageData();
  const contactData = await fetchContactData();
  const yoastData =  serviceData?.yoast_head_json

  const hireUsData =
  serviceData && serviceData && serviceData?.acf && serviceData?.acf?.hireus_title
    ? serviceData?.acf
    : homePage && homePage?.acf
    ? homePage?.acf
    : null;

  return (
    <>
  <Head yoastData={yoastData} />
    <div className='main_wrapper'>
      {serviceData && (serviceData.acf.banner_background_image || serviceData.acf.banner_background_image_mobile || serviceData.acf.banner_background_video || serviceData.acf.banner_clients_list || serviceData.acf.banner_subtitle || serviceData.acf.banner_title) && (
       <ServicesBanner
      banner_background_image_mobile={homePage && homePage.acf ? homePage.acf.banner_background_image_mobile : ''}
       banner_background_image={serviceData.acf.banner_background_image}
       banner_background_video={serviceData.acf.banner_background_video}
       banner_clients_list={serviceData.acf.banner_clients_list}
       banner_subtitle={serviceData.acf.banner_subtitle}
       banner_title={serviceData.acf.banner_title}
       ></ServicesBanner>
      )}  
      {serviceData && (serviceData.acf.service_title || serviceData.acf.service_content || serviceData.acf.service_list || serviceData.acf.service_view_all_button) && (
       <ServicesList
       service_title={serviceData.acf.service_title}
       service_content={serviceData.acf.service_content}
       service_list={serviceData.acf.service_list}
       service_view_all_button={serviceData.acf.service_view_all_button}
       ></ServicesList>
      )}
      
       <OurApproach
       our_approach_title={serviceData.acf.our_approach_title}
       our_approach_subtitle={serviceData.acf.our_approach_subtitle}
       our_approach_list={serviceData.acf.our_approach_list}
       ></OurApproach>
   
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

