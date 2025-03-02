
import BASE_URL from '@/config';
import React, { Suspense } from 'react';
import Head from '@/app/head';
import CasestudingBanner from '@/components/casestudingcomponents/CasestudingBanner';
import CasestudingExploreData from '@/components/casestudingcomponents/CasestudingExploreData';
import OurAwards from '@/components/homecomponents/OurAwards';
import HireUs from '@/components/homecomponents/HireUs';
import Loading from '@/components/Loading';
import homePage from "@/json/homePage.json";
import contactData from "@/json/contact.json";
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/portfolio`
          : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/?slug=portfolio`
  
  const fetchresponse = await fetch(apiUrl, { cache: "no-store" });
    if (!fetchresponse.ok) {
      throw new Error("Failed to fetch data");
    }
    return fetchresponse.json();
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


export default async function portfolioPage() {
    const data = await fetchPageData();
    const CaseStudypageData= data?.id ? data : data[0]
    const IntialData=await fetchIntialData()
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
            portfolio_API={"case-study-list"}
        />
      )}

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
            hireus_list={homePage?.acf?.hireus_list}
            contactData={contactData}
          />
        )}
    </div>
      </Suspense>
  );
};

