
import BASE_URL from '@/config';
import React from 'react';
import Head from '../head';
import ContactBanner from '@/components/contactuscomponets/ContactBanner';
import ContactForm from '@/components/contactuscomponets/ContactForm';
import ProjectCountries from '@/components/contactuscomponets/ProjectContries';
import "../../components/homecomponents/Banner.css"
import "../../components/careercomponents/CareerPopup.css"
import TechnoBanner from '@/components/technologiescomponents/TechnoBanner';
import TechnoList from '@/components/technologiescomponents/TechnoList';
import HireUs from '@/components/homecomponents/HireUs';


const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
  
async function fetchPageData() {
    const res = await fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/technologies`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1842`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
  }

  async function fetchHomepageData() {
    const res = await fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
  }
  
  // Fetch contact data server-side
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/contactus`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }

export default async function IndustryPage() {
    const pageData = await fetchPageData();
    const homePage = await fetchHomepageData();
    const contactData = await fetchContactData();
    const yoastData =  contactData?.yoast_head_json

    const hireUsData =
    pageData && pageData?.acf && pageData?.acf?.hireus_title
      ? pageData?.acf
      : homePage && homePage?.acf
      ? homePage?.acf
      : null;

  return (
    <>
  <Head yoastData={yoastData} />
  <div className='main_wrapper'>
      {pageData && (
        pageData.acf.banner_background_image ||
        pageData.acf.banner_background_image_mobile ||
        pageData.acf.technologies_banner_background_video ||
        pageData.acf.banner_clients_list || 
        pageData.acf.banner_description || 
        pageData.acf.banner_title) &&(
       <TechnoBanner
       technologies_banner_background_video={
              pageData.acf.technologies_banner_background_video
            }
       banner_background_image={pageData.acf.banner_background_image}
       banner_background_image_mobile={pageData.acf.banner_background_image_mobile}
       banner_clients_list={pageData.acf.banner_clients_list}
       banner_description={pageData.acf.banner_description}
       banner_title={pageData.acf.banner_title}
       ></TechnoBanner>
      )}
      {pageData && (pageData.acf.technology_list) && (
       <TechnoList
       technology_list={pageData.acf.technology_list}

       ></TechnoList>
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

