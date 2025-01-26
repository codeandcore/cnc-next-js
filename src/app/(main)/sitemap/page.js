
import React, { Suspense } from 'react';
import Head from '@/app/head';
import HireUs from '@/components/homecomponents/HireUs';
import BASE_URL from '@/config';
import SitemapList from '@/components/sitemapcomponents/SitemapList';
import Loading from '@/components/Loading';
import homePage from "@/json/homePage.json";
import contactData from "@/json/contact.json";

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/sitemap`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/3470`
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
export default async function page() {
  const pageData = await fetchPageData();  
    const yoastData =  pageData?.yoast_head_json
    const hireUsData =
    pageData && pageData?.acf && pageData?.acf.hireus_title
      ? pageData?.acf
      : homePage && homePage?.acf
      ? homePage?.acf
                : null;
  return (
    <Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
<SitemapList pageData={pageData}/>
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
      </Suspense>
  );
};

