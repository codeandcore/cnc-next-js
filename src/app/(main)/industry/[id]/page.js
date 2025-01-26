import Head from "@/app/head";
import ExploreWork from "@/components/homecomponents/ExploreWork";
import HireUs from "@/components/homecomponents/HireUs";
import HealthcareSector from "@/components/industrycomponents/HealthcareSector";
import HealthcareSolution from "@/components/industrycomponents/HealthcareSolution";
import QuestionsAnswered from "@/components/servicesdetailscomponents/QuestionsAnswered";
import ServicesDetailsBanner from "@/components/servicesdetailscomponents/ServicesDetailsBanner";
import WhyChooseCompanyDesign from "@/components/servicesdetailscomponents/WhyChooseCompanyDesign";
import BASE_URL from "@/config";
import { notFound } from "next/navigation";
import HomePage from "@/json/homePage.json";
import contactData from "@/json/contact.json";

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchData(slug) {
  const apiURL=  env !== "development"
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/${slug}`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/?slug=${slug}`
  
    const response = await fetch(apiURL, {
      cache: 'no-store', // Adjust cache as needed
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  

export default async function Page({ params }) {
  const slug = (await params).id
  const data = await fetchData(slug)
    if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
      notFound();
    }
  const yoastData = data ? data?.yoast_head_json : data?.[0]?.yoast_head_json

    const industryData= data?.id ? data : data[0]
  const hireUsData =
  industryData && industryData?.acf && industryData?.acf?.hireus_title
    ? industryData?.acf
    : HomePage && HomePage?.acf
    ? HomePage?.acf
    : null;
  
  return (
    <>
  <Head yoastData={yoastData} />
  <div className='main_wrapper industry-details_page'>
      {industryData && (
        industryData.acf.industry_banner_background_image || 
        industryData.acf.industry_banner_background_image_mobile || 
        industryData.acf.industry_banner_background_video || industryData.acf.industry_banner_title || industryData.acf.industry_banner_subtitle || industryData.acf.industry_banner_clients_list) && (
          <ServicesDetailsBanner
          banner_background_image = {industryData.acf.industry_banner_background_image}
          industry_banner_background_image_mobile = {industryData.acf.industry_banner_background_image_mobile}
          banner_background_video = {industryData.acf.industry_banner_background_video}
          banner_title = {industryData.acf.industry_banner_title}
          banner_subtitle = {industryData.acf.industry_banner_subtitle}
          banner_clients_list = {industryData.acf.industry_banner_clients_list}
          ></ServicesDetailsBanner>
      )}
      {industryData && (industryData.acf.healthcare_sector_title || industryData.acf.healthcare_sector_subtitle || industryData.acf.healthcare_sector_listing) && (
          <HealthcareSector
          title = {industryData.acf.healthcare_sector_title}
          subtitle = {industryData.acf.healthcare_sector_subtitle}
          items = {industryData.acf.healthcare_sector_listing}
          ></HealthcareSector>
      )}
      {industryData && (industryData.acf.healthcare_software_title || industryData.acf.healthcare_software_subtitle || industryData.acf.healthcare_software_listing) && (
     <HealthcareSoftware
        title = {industryData.acf.healthcare_software_title}
        subtitle = {industryData.acf.healthcare_software_subtitle}
        items = {industryData.acf.healthcare_software_listing}
     ></HealthcareSoftware>
    )}
    {industryData && (industryData.acf.software_solution_title || industryData.acf.software_solution_content || industryData.acf.software_solution_button) && (
     <HealthcareSolution
     title = {industryData.acf.software_solution_title}
     subtitle = {industryData.acf.software_solution_content}
     button = {industryData.acf.software_solution_button}
     ></HealthcareSolution>
    )}
      <ExploreWork className='white-bg'
      title = {industryData.acf.industry_portfolio_title}
      subtitle = {industryData.acf.industry_portfolio_subtitle}
      button = {industryData.acf.industry_portfolio_button}
      items = {industryData.acf.industry_portfolio_list}
      ></ExploreWork>
      {industryData && (industryData.acf.industry_why_choose_title || industryData.acf.industry_why_choose_subtitle || industryData.acf.industry_why_choose_list) && (
          <WhyChooseCompanyDesign
          why_choose_title = {industryData.acf.industry_why_choose_title}
          why_choose_subtitle = {industryData.acf.industry_why_choose_subtitle}
          why_choose_list = {industryData.acf.industry_why_choose_list}
          ></WhyChooseCompanyDesign>
      )}
      {industryData && (industryData.acf.industry_qa_title_content || industryData.acf.industry_qa_list) && (
      <QuestionsAnswered
          qa_title_content = {industryData.acf.industry_qa_title_content}
          qa_list = {industryData.acf.industry_qa_list}
      ></QuestionsAnswered>
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
            hireus_list={HomePage?.acf?.hireus_list}
            contactData={contactData}
          />
        )}
    </div>
     </>
      );
  }