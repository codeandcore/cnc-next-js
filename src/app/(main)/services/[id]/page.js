import Head from "@/app/head";
import BlogDetailContent from "@/components/blogdetailcomponents/BlogDetailContent";
import Highlights from "@/components/homecomponents/Highlights";
import HireUs from "@/components/homecomponents/HireUs";
import Loading from "@/components/Loading";
import DigitalSolution from "@/components/servicesdetailscomponents/DigitalSolution";
import ExploreDone from "@/components/servicesdetailscomponents/ExploreDone";
import HowWeHelp from "@/components/servicesdetailscomponents/HowWeHelp";
import QuestionsAnswered from "@/components/servicesdetailscomponents/QuestionsAnswered";
import ServicesDetailsBanner from "@/components/servicesdetailscomponents/ServicesDetailsBanner";
import WhyChooseCompanyDesign from "@/components/servicesdetailscomponents/WhyChooseCompanyDesign";
import BASE_URL from "@/config";
import { Suspense } from "react";
import { getGeneralData } from '@/appStore';
import homePage from "@/json/homePage.json";
import contactData from "@/json/contact.json";
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
  async function fetchData(slug) {
  const apiURL=  env !== "development"
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/${slug}`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/?slug=${slug}`
  
    const response = await fetch(apiURL, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

export default async function Page({ params }) {
  console.log('getGeneralData', getGeneralData());
  const tempData = getGeneralData()
  
  const slug = (await params).id
  
  const data = await fetchData(slug)  
  const serviceData = data?.id ? data : data[0]   
  
  const yoastData = serviceData?.yoast_head_json
  console.log('asasfttuastasKSGgjhbsc',serviceData );
  
  const hireUsData =
  serviceData && serviceData && serviceData?.acf && serviceData?.acf?.hireus_title ? serviceData?.acf : homePage && homePage?.acf ? homePage?.acf : null;
  
  return (
    <>
  <Head yoastData={yoastData} />
  <div className='main_wrapper service-details_page'>
      {serviceData && (serviceData.acf.banner_background_image || serviceData.acf.banner_background_image_mobile || serviceData.acf.banner_background_video || serviceData.acf.banner_title || serviceData.acf.banner_subtitle || serviceData.acf.banner_clients_list) && (
          <ServicesDetailsBanner
          industry_banner_background_image = {serviceData.acf.banner_background_image}
          industry_banner_background_image_mobile = {serviceData.acf.banner_background_image_mobile}
          banner_background_video = {serviceData.acf.banner_background_video}
          banner_title = {serviceData.acf.banner_title}
          banner_subtitle = {serviceData.acf.banner_subtitle}
          banner_clients_list = {serviceData.acf.banner_clients_list}
          ></ServicesDetailsBanner>
      )}
      {serviceData && (serviceData.acf.digital_solution_title || serviceData.acf.digital_solution_content || serviceData.acf.digital_solution_button || serviceData.acf.digital_solution_video || serviceData.acf.digital_solution_image) && (
          <DigitalSolution
          digital_solution_title = {serviceData.acf.digital_solution_title}
          digital_solution_content = {serviceData.acf.digital_solution_content}
          digital_solution_button = {serviceData.acf.digital_solution_button}
          digital_solution_image = {serviceData.acf.digital_solution_image}
          ></DigitalSolution>
      )}
      {serviceData && (serviceData.acf.help_you_title || serviceData.acf.help_you_subtitle || serviceData.acf.help_you_image || serviceData.acf.help_you_list) && (
          <HowWeHelp
          help_you_title = {serviceData.acf.help_you_title}
          help_you_subtitle = {serviceData.acf.help_you_subtitle}
          help_you_image = {serviceData.acf.help_you_image}
          help_you_list = {serviceData.acf.help_you_list}
          ></HowWeHelp>
      )}
      {serviceData && (serviceData.acf.portfolio_title || serviceData.acf.portfolio_subtitle || serviceData.acf.portfolio_button || serviceData.acf?.portfolio_list) && (
          <ExploreDone
          portfolio_title = {serviceData.acf.portfolio_title}
          portfolio_subtitle = {serviceData.acf.portfolio_subtitle}
          portfolio_button = {serviceData.acf.portfolio_button}
          portfolio_list = {serviceData.acf?.portfolio_list}
          tempData={tempData}
          ></ExploreDone>
      )}
      {serviceData && (serviceData.acf.why_choose_title || serviceData.acf.why_choose_subtitle || serviceData.acf.why_choose_list) && (
          <WhyChooseCompanyDesign
          why_choose_title = {serviceData.acf.why_choose_title}
          why_choose_subtitle = {serviceData.acf.why_choose_subtitle}
          why_choose_list = {serviceData.acf.why_choose_list}
          ></WhyChooseCompanyDesign>
      )}
      {serviceData && (serviceData.acf.qa_title_content || serviceData.acf.qa_list) && (
      <QuestionsAnswered
          qa_title_content = {serviceData.acf.qa_title_content}
          qa_list = {serviceData.acf.qa_list}
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
            hireus_list={homePage?.acf?.hireus_list}
            contactData={contactData}
          />
        )}
    </div>
  </>
      );
  }