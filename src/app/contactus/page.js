
import BASE_URL from '@/config';
import React from 'react';
import Head from '../head';
import ContactBanner from '@/components/contactuscomponets/ContactBanner';
import ContactForm from '@/components/contactuscomponets/ContactForm';
import ProjectCountries from '@/components/contactuscomponets/ProjectContries';
import "../../components/homecomponents/Banner.css"
import "../../components/careercomponents/CareerPopup.css"


const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
  
  async function fetchHomepageData() {
    const res = await fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
  }
  
  // Fetch contact data server-side
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/contactus`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }

export default async function IndustryPage() {
    const homePage = await fetchHomepageData();
    const contactData = await fetchContactData();
    const yoastData =  contactData?.yoast_head_json


  return (
    <>
  <Head yoastData={yoastData} />
   <div className='main_wrapper'>
      {contactData && (contactData.acf.banner_background_image || contactData.acf.banner_background_video || contactData.acf.banner_title || contactData.acf.banner_subtitle || contactData.acf.banner_statistic_expertise || contactData.acf.banner_statistic_industry || contactData.acf.banner_statistic_projects || pageData.acf.banner_rating_platform_list)  && (
      <ContactBanner
      banner_background_image={contactData.acf.banner_background_image}
      banner_background_video={contactData.acf.banner_background_video}
      banner_title={contactData.acf.banner_title}
      banner_subtitle={contactData.acf.banner_subtitle}
      banner_statistic_expertise={contactData.acf.banner_statistic_expertise}
      banner_statistic_industry={contactData.acf.banner_statistic_industry}
      banner_statistic_projects={contactData.acf.banner_statistic_projects}
      banner_rating_platform_list={homePage?.acf?.banner_rating_platform_list}
      ></ContactBanner>
      )}
      {contactData && (contactData.acf.contact_form_location_label || contactData.acf.contact_form_location_address || contactData.acf.contact_form_email_label || contactData.acf.contact_form_email_address || contactData.acf.contact_form_social_label || contactData.acf.contact_form_facebook_link || contactData.acf.contact_form_twitter_link || contactData.acf.contact_form_linkedin_link || contactData.acf.contact_form_instagram_link || contactData.acf.google_map_latitude || contactData.acf.google_map_longitude || contactData.acf.contact_form_title || contactData.acf.contact_form_service_label || contactData.acf.contact_form_service_list || contactData.acf.contact_form_budget_label || contactData.acf.contact_form_budget_list || contactData.acf.contact_social_links ) && (
      <ContactForm
      BASE_URL={BASE_URL}
      contact_form_location_label={contactData.acf.contact_form_location_label}
      contact_form_location_address={contactData.acf.contact_form_location_address}
      contact_form_email_label={contactData.acf.contact_form_email_label}
      contact_form_email_address={contactData.acf.contact_form_email_address}
      contact_form_social_label={contactData.acf.contact_form_social_label}
      contact_form_facebook_link={contactData.acf.contact_form_facebook_link}
      contact_form_twitter_link={contactData.acf.contact_form_twitter_link}
      contact_form_linkedin_link={contactData.acf.contact_form_linkedin_link}
      contact_form_instagram_link={contactData.acf.contact_form_instagram_link}
      google_map_latitude={contactData.acf.google_map_latitude}
      google_map_longitude={contactData.acf.google_map_longitude}
      contact_form_title={contactData.acf.contact_form_title}
      contact_form_service_label={contactData.acf.contact_form_service_label}
      contact_social_links={contactData.acf.contact_social_links}
      contact_form_budget_label={contactData.acf.contact_form_budget_label}
      contact_form_budget_list={contactData.acf.contact_form_budget_list}
      contact_social_icon={contactData.acf.contact_social_icon}
      ></ContactForm>
      )}

  {contactData && (contactData.acf.developer_title || contactData.acf.developer_subtitle || contactData.acf.developer_button) && (
      <div className='are_you_dev'>
        <div className='wrapper d_flex'>
          <div className='left_col'>
          {contactData.acf.developer_title && ( <h2>{contactData.acf.developer_title}</h2> )}
          {contactData.acf.developer_subtitle && ( <p>{contactData.acf.developer_subtitle}</p> )}
          </div>
          {contactData.acf.developer_button && (<a href={contactData.acf.developer_button.url} className="btn btnarrow"><em>{contactData.acf.developer_button.title}</em> <div><img src={"/assets/images/ellipse_arr.png"} alt={contactData.acf.developer_button.title}/></div></a>)}
        </div>
      </div>
  )}
  {contactData && (contactData.acf.countries_title || contactData.acf.countries_list) && (
      <ProjectCountries
      countries_title={contactData.acf.countries_title}
      countries_list={contactData.acf.countries_list}
     />
  )}
    </div> 
      </>
  );
};

