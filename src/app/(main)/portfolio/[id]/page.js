import { Suspense } from "react";
import Head from "@/app/head";
import CasestudingContaints from "@/components/casestudingdetailcomponets/CasestudingContaints";
import PortfolioFeatures from "@/components/casestudingdetailcomponets/PortfolioFeatures";
import ExploreWork from "@/components/homecomponents/ExploreWork";
import HireUs from "@/components/homecomponents/HireUs";
import ProjectLogoMarquee from "@/components/homecomponents/ProjectLogoMarquee";
import Loading from "@/components/Loading";
import BASE_URL from "@/config";
import { notFound } from "next/navigation";
import IntialGoals from "@/components/casestudingdetailcomponets/IntialGoals";
import PortfolioFeaturedImage from "@/components/casestudingdetailcomponets/PortfolioFeaturedImage";

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchData(slug) {
  const apiURL=  env !== "development"
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/posts/${slug}`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/portfolio/?slug=${slug}`

    const response = await fetch(apiURL, {
      cache: 'no-store', // Adjust cache as needed
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  
  async function fetchHomeData() {
    const res = await   fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
}
  
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/contactus`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }
  

export default async function Page({ params }) {
  const slug = (await params).id
  const data = await fetchData(slug)
  if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
        notFound();
  }
    const portfolioData= data?.id ? data : data[0]
    
  const yoastData = data ? data?.yoast_head_json : data?.[0]?.yoast_head_json
  const HomePage = await fetchHomeData()
  const contactData = await fetchContactData();
  const hireUsData =
  portfolioData && portfolioData?.acf && portfolioData?.acf?.hireus_title
    ? portfolioData?.acf
    : HomePage && HomePage?.acf
    ? HomePage?.acf
    : null;
  
  return (
<Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
  <div className='main_wrapper'>
      {portfolioData && (
        <CasestudingContaints
        CaseStudycptData ={portfolioData}
        ></CasestudingContaints>
      )}
      {/* {portfolioData && (portfolioData?.acf?.feature_section_title || portfolioData?.acf?.features_detail )&& (
       <PortfolioFeatures
       feature_section_title={portfolioData?.acf?.feature_section_title}
       features_detail={portfolioData.acf.features_detail}
       ></PortfolioFeatures>
      )} */}
        
        <IntialGoals />
      {portfolioData?.featured_image_url &&    <PortfolioFeaturedImage featured_image_url={portfolioData?.featured_image_url} />}
        
      {portfolioData && (portfolioData?.acf?.portfolio_title || portfolioData?.acf?.portfolio_subtitle || portfolioData?.acf?.case_study_portfolio_list || portfolioData?.acf?.portfolio_button) && (
      <ExploreWork
      title = {portfolioData.acf.portfolio_title}
      subtitle = {portfolioData.acf.portfolio_subtitle}
      button = {portfolioData.acf.portfolio_button}
      items = {portfolioData.acf.case_study_portfolio_list}
      ></ExploreWork>
        )}
     
      {HomePage && (HomePage.acf.banner_clients_list)&& (
        <ProjectLogoMarquee   banner_clients_list={HomePage.acf.banner_clients_list}></ProjectLogoMarquee>
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
  </Suspense>
      );
  }