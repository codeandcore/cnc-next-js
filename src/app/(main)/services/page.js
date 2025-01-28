
import CaseStudies from '@/components/homecomponents/CaseStudies';
import ClientsSay from '@/components/homecomponents/ClientsSay';
import HireUs from '@/components/homecomponents/HireUs';
import OurAwards from '@/components/homecomponents/OurAwards';
import OurApproach from '@/components/servicescomponents/OurApproach';
import ServicesBanner from '@/components/servicescomponents/ServicesBanner';
import ServicesList from '@/components/servicescomponents/ServicesList';
import BASE_URL from '@/config';
import React, { Suspense } from 'react';
import Loading from '@/components/Loading';
import Head from '@/app/head';
import homePage from "@/json/homePage.json";
import contactData from "@/json/contact.json";
import { getGeneralData } from '@/appStore';

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/services`
          : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/609`
  
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };
export default async function ServicePage() {
  console.log('getGeneralDatagetGeneralDatagetGeneralData', getGeneralData());
  const generalSettingData = getGeneralData()
  const serviceData = await fetchPageData();
  const yoastData =  serviceData?.yoast_head_json

  const hireUsData =
  serviceData && serviceData && serviceData?.acf && serviceData?.acf?.hireus_title
    ? serviceData?.acf
    : homePage && homePage?.acf
    ? homePage?.acf
    : null;

  return (
    <Suspense fallback={<Loading />}>
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
   
        <CaseStudies
          case_studies_title={homePage?.acf?.case_studies_title}
          case_studies_subtitle={homePage?.acf?.case_studies_subtitle}
          case_studies_list={homePage?.acf?.portfolio_list}
        >
        </CaseStudies>
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
            title={generalSettingData.our_awards_title}
            content={generalSettingData.our_awards_subtitle}
            our_awards_images={generalSettingData.our_awards_list}
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
            hireus_list={homePage?.acf?.hireus_list}
            contactData={contactData}
          />
        )}
      </div>
      </Suspense>
  );
};

