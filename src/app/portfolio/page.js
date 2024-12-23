
import BASE_URL from '@/config';
import React, { Suspense } from 'react';
import Head from '../head';
import CasestudingBanner from '@/components/casestudingcomponents/CasestudingBanner';
import CasestudingExploreData from '@/components/casestudingcomponents/CasestudingExploreData';
import OurAwards from '@/components/homecomponents/OurAwards';
import HireUs from '@/components/homecomponents/HireUs';
import Loading from '@/components/Loading';

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/portfolio`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/?slug=portfolio`
  
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
  
const fetchIntialData = async () => {
    const apiUrl =
    env !== "development"
          ? `${BASE_URL}/wp-json/custom/v1/case-study-taxonomies`
          : `${BASE_URL}/wp-json/custom/v1/case-study-taxonomies`
  
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
  
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

export default async function portfolioPage() {
    const data = await fetchPageData();
    const CaseStudypageData= data?.id ? data : data[0]
    const homePage = await fetchHomepageData();
    const IntialData=await fetchIntialData()
    const contactData = await fetchContactData();
    const yoastData =  CaseStudypageData?.yoast_head_json

    const hireUsData =
    CaseStudypageData && CaseStudypageData?.acf && CaseStudypageData?.acf.hireus_title
      ? CaseStudypageData?.acf
      : homePage && homePage?.acf
      ? homePage?.acf
      : null;

  return (
<Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
  <div className="main_wrapper">
      {CaseStudypageData && (
        <CasestudingBanner
          banner_background_image_mobile={
            CaseStudypageData?.acf?.banner_background_image_mobile
          }
          casestuding_banner_image={
            CaseStudypageData.acf.casestuding_banner_image
          }
          casestuding_banner_video={
            CaseStudypageData.acf.casestuding_banner_video
          }
          casestuding_banner_title={
            CaseStudypageData.acf.casestuding_banner_title
          }
          casestuding_banner_description={
            CaseStudypageData.acf.casestuding_banner_description
          }
          IndustryTaxonomyeData={IntialData?.industries}
          ServicesTaxonomyeData={IntialData?.services}
          career_awards_logo_new={CaseStudypageData.acf.banner_clients_list}
        />
      )}

        {/* <div className='loader_blog' style={{ display: isLoadk ? 'block' : 'none' }}>
            <img src={"/assets/images/rotate-right.png"} alt='rotate-right' />
        </div> */}
       
     

      {homePage && (
        <OurAwards
          className="ourawardgray"
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
      </Suspense>
  );
};

