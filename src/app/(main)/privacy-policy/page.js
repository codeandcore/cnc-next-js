
import React, { Suspense } from 'react';
import Head from '@/app/head';
import he from 'he';
import HireUs from '@/components/homecomponents/HireUs';
import BASE_URL from '@/config';
import Loading from '@/components/Loading';


const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/privacy-policy`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/3618`
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
async function fetchhomePage() {
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

export default async function page() {
    const pageData = await fetchPageData();
    const homePage = await fetchhomePage();
    const contactData = await fetchContactData();
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
  {pageData &&
    <div className='policy-page refund_policy'>
          <div className='wrapper'>
              <div className='title'>
              {pageData.title && <h1>{pageData.title.rendered}</h1>}
              </div>
              {pageData.acf.content_editor && <div className='inner' dangerouslySetInnerHTML={{ __html: he.decode(pageData.acf.content_editor) }}>
              </div>
              }
          </div>
    </div>
    }
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
      </Suspense>
  );
};

