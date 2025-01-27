import React from 'react';
import Banner from '@/components/homecomponents/Banner';
import StackTechnologies from '@/components/homecomponents/StackTechnologies';
import WhyChoose from '@/components/homecomponents/WhyChoose';
import CaseStudies from '@/components/homecomponents/CaseStudies';
import Life from '@/components/homecomponents/Life';
import OurAwards from '@/components/homecomponents/OurAwards';
import HireUs from '@/components/homecomponents/HireUs';
import BASE_URL from '@/config';
import Head from '@/app/head';
import Highlights from '@/components/homecomponents/Highlights';
import ClientsSay from '@/components/homecomponents/ClientsSay';
import "@/components/homecomponents/Banner.css"
import ProjectLogoMarquee from '@/components/homecomponents/ProjectLogoMarquee';
import TabContaint from '@/components/homecomponents/TabContaint';
import IndustriesSlider from '@/components/homecomponents/IndustriesSlider';
import contactData from "@/json/contact.json";
function stripHtmlTags(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
}

function cleanHtmlString(htmlString) {
  return htmlString.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/g, ' ');
}
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const Homepage = async ({
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
  const HomePage = await fetchHomepageData();
  
  const yoastData = HomePage?.yoast_head_json   
  return (
    <>
  <Head yoastData={yoastData} />
    <div className="main_wrapper">
      {HomePage &&
        (HomePage?.acf?.banner_background_image ||
          HomePage?.acf?.banner_background_mobile_image ||
          HomePage?.acf?.banner_background_video ||
          HomePage?.acf?.banner_title ||
          HomePage?.acf?.banner_button_text) && (
          <Banner
            BASE_URL="BASE_URL"
            banner_background_image={HomePage.acf.banner_background_image}
            banner_background_mobile_image={
              HomePage.acf.banner_background_mobile_image
            }
            banner_background_video={HomePage.acf.banner_background_video}
            banner_title={stripHtmlTags(HomePage.acf.banner_title)}
            banner_subtitle={cleanHtmlString(HomePage.acf.banner_subtitle)}
            banner_button_text={HomePage.acf.banner_button_text}
            banner_button_url={HomePage.acf.banner_button_url}
            banner_statistics_list={HomePage.acf.banner_statistics_list}
            banner_rating_platform_list={
              HomePage.acf.banner_rating_platform_list
            }
            banner_hireus_form_title={HomePage.acf.banner_hireus_form_title}
            banner_hireus_form_subtitle={
              HomePage.acf.banner_hireus_form_subtitle
            }
            contactData={contactData}
          />
        )}
      {HomePage && HomePage.acf.banner_clients_list && (
        <ProjectLogoMarquee
          banner_clients_list={HomePage.acf.banner_clients_list}
        ></ProjectLogoMarquee>
      )}
      {HomePage && HomePage.acf.service_list && (
        <TabContaint
          service_list={HomePage.acf.service_list}
          prefetchedData={[]}
          setIsLoading={setIsLoading}
          setIsDone={setIsDone}
          setIsFinish={setIsFinish}
        ></TabContaint>
      )}
      {HomePage &&
        (HomePage.acf.industries_title ||
          HomePage.acf.industries_subtitle ||
          HomePage.acf.industries_list) && (
          <IndustriesSlider
            industries_title={HomePage.acf.industries_title}
            industries_subtitle={HomePage.acf.industries_subtitle}
            industries_list={HomePage.acf.industries_list}
          ></IndustriesSlider>
        )}
      {HomePage &&
        (HomePage.acf.technologies_title ||
          HomePage.acf.technologies_bg_image ||
          HomePage.acf.technologies_content ||
          HomePage.acf.technologies_list) && (
          <StackTechnologies
            technologies_title={HomePage.acf.technologies_title}
            technologies_bg_image={HomePage.acf.technologies_bg_image}
            technologies_content={HomePage.acf.technologies_content}
            technologies_button_text={HomePage.acf.technologies_button_text}
            technologies_button_url={HomePage.acf.technologies_button_url}
            technologies_list={HomePage.acf.technologies_list}
            setIsLoading={setIsLoading}
            setIsDone={setIsDone}
            setIsFinish={setIsFinish}
          ></StackTechnologies>
        )}
      {HomePage &&
        (HomePage.acf.chooseus_title || HomePage.acf.chooseus_content) && (
          <WhyChoose
            chooseus_title={HomePage.acf.chooseus_title}
            chooseus_content={HomePage.acf.chooseus_content}
            chooseus_years_title={HomePage.acf.chooseus_years_title}
            chooseus_years_subtitle={HomePage.acf.chooseus_years_subtitle}
            chooseus_years_image={HomePage.acf.chooseus_years_image}
            chooseus_adobe_title={HomePage.acf.chooseus_adobe_title}
            chooseus_adobe_image={HomePage.acf.chooseus_adobe_image}
            chooseus_languages_title={HomePage.acf.chooseus_languages_title}
            chooseus_languages_subtitle={
              HomePage.acf.chooseus_languages_subtitle
            }
            chooseus_languages_image={HomePage.acf.chooseus_languages_image}
            savvy_content={HomePage.acf.savvy_content}
            chooseus_clients_title={HomePage.acf.chooseus_clients_title}
            chooseus_clients_subtitle={HomePage.acf.chooseus_clients_subtitle}
            chooseus_clients_image={HomePage.acf.chooseus_clients_image}
            chooseus_projects_delivered_title={
              HomePage.acf.chooseus_projects_delivered_title
            }
            chooseus_projects_delivered_subtitle={
              HomePage.acf.chooseus_projects_delivered_subtitle
            }
            chooseus_projects_delivered_image={
              HomePage.acf.chooseus_projects_delivered_image
            }
            chooseus_digital_products_title={
              HomePage.acf.chooseus_digital_products_title
            }
            chooseus_digital_products_button_text={
              HomePage.acf.chooseus_digital_products_button_text
            }
            chooseus_digital_products_button_url={
              HomePage.acf.chooseus_digital_products_button_url
            }
            chooseus_team_title={HomePage.acf.chooseus_team_title}
            chooseus_team_subtitle={HomePage.acf.chooseus_team_subtitle}
            chooseus_digital_form_title={
              HomePage.acf.chooseus_digital_form_title
            }
            chooseus_digital_form_subtitle={
              HomePage.acf.chooseus_digital_form_subtitle
            }
            chooseus_team_image={HomePage.acf.chooseus_team_image}
            chooseus_iso_title={HomePage.acf.chooseus_iso_title}
            chooseus_iso_image={HomePage.acf.chooseus_iso_image}
            chooseus_pagespeed_title={HomePage.acf.chooseus_pagespeed_title}
            chooseus_pagespeed_image={HomePage.acf.chooseus_pagespeed_image}
            chooseus_iso_text={HomePage.acf.chooseus_iso_text}
            chooseus_flexible_hiring_icon={
              HomePage.acf.chooseus_flexible_hiring_icon
            }
            chooseus_digital_products_image={
              HomePage.acf.chooseus_digital_products_image
            }
            chooseus_pagespeed_button_text={
              HomePage.acf.chooseus_pagespeed_button
            }
            chooseus_pagespeed_button_url={
              HomePage.acf.chooseus_pagespeed_button_url
            }
          ></WhyChoose>
        )}
     
          <CaseStudies
            case_studies_title={HomePage?.acf?.case_studies_title}
            case_studies_subtitle={HomePage?.acf?.case_studies_subtitle}
            case_studies_list={HomePage?.acf?.portfolio_list}
          ></CaseStudies>
      {HomePage &&
        (HomePage.acf.life_codeandcore_title ||
          HomePage.acf.life_codeandcore_button_text ||
          HomePage.acf.life_codeandcore_highlights ||
          HomePage.acf.life_codeandcore_bottom_text) && (
          <Life
            life_codeandcore_title={HomePage.acf.life_codeandcore_title}
            life_codeandcore_button_text={
              HomePage.acf.life_codeandcore_button_text
            }
            life_codeandcore_button_url={
              HomePage.acf.life_codeandcore_button_url
            }
            life_codeandcore_highlights={
              HomePage.acf.life_codeandcore_highlights
            }
            life_codeandcore_big_images={
              HomePage.acf.life_codeandcore_big_images
            }
            life_codeandcore_medium_images={
              HomePage.acf.life_codeandcore_medium_images
            }
            life_codeandcore_small_images={
              HomePage.acf.life_codeandcore_small_images
            }
            life_codeandcore_bottom_text={
              HomePage.acf.life_codeandcore_bottom_text
            }
            // setPrefetchedData={setPrefetchedData}
            setIsLoading={setIsLoading}
            setIsDone={setIsDone}
            setIsFinish={setIsFinish}
          ></Life>
        )}
      {(HomePage && (HomePage.acf.our_blogs_title || HomePage.acf.our_blogs_subtitle || HomePage.acf.our_blogs))&& (
          <Highlights
          our_blogs_title={HomePage.acf.our_blogs_title}
          our_blogs_subtitle={HomePage.acf.our_blogs_subtitle}
          our_blogs={HomePage.acf.our_blogs}
          // setPrefetchedData={setPrefetchedData}
          setIsLoading={setIsLoading}
          setIsDone={setIsDone}
          setIsFinish={setIsFinish}
          ></Highlights>
        )}
      {(HomePage && (HomePage.acf.our_clients_title || HomePage.acf.our_clients_subtitle || HomePage.acf.our_clients_button_text || HomePage.acf.our_clients_button_url || HomePage.acf.our_clients_testimonials))&& (
        <ClientsSay
        our_clients_title={HomePage.acf.our_clients_title} 
        our_clients_subtitle={HomePage.acf.our_clients_subtitle} 
        our_clients_button_text={HomePage.acf.our_clients_button_text} 
        our_clients_button_url={HomePage.acf.our_clients_button_url} 
        our_clients_testimonials={HomePage.acf.our_clients_testimonials} 
        ></ClientsSay>
        )}
      {HomePage &&
        (HomePage.acf.our_awards_title ||
          HomePage.acf.our_awards_subtitle ||
          HomePage.acf.our_awards_list) && (
          <OurAwards
            title={HomePage.acf.our_awards_title}
            content={HomePage.acf.our_awards_subtitle}
            our_awards_images={HomePage.acf.our_awards_list}
          />
        )}
      {HomePage &&
        (HomePage.acf.hireus_title ||
          HomePage.acf.hireus_subtitle ||
          HomePage.acf.hireus_button_text ||
          HomePage.acf.hireus_list) && (
          <HireUs
            BASE_URL={BASE_URL}
            hireus_title={HomePage.acf.hireus_title}
            hireus_subtitle={HomePage.acf.hireus_subtitle}
            hireus_button_text={HomePage.acf.hireus_button_text}
            hireus_list={HomePage.acf.hireus_list}
            contactData={contactData}
          ></HireUs>
        )}
    </div>
      </>
  );
};

// Server-side rendering

async function fetchHomepageData() {
  const res = await   fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
        : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`,
         { cache: "no-store" } 
)
  if (!res.ok) throw new Error('Failed to fetch homepage data');
  return res.json();
}


export default Homepage;
