
import React, { Suspense } from 'react';
import Head from '@/app/head';
import he from 'he';
import HireUs from '@/components/homecomponents/HireUs';
import BASE_URL from '@/config';
import Loading from '@/components/Loading';
import Link from 'next/link';
import ExploreWork from '@/components/homecomponents/ExploreWork';


const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;

async function fetchhomePage() {
  const fetchhomeres = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
        : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`,{ cache: "no-store" } 
)
  if (!fetchhomeres.ok) throw new Error('Failed to fetch homepage data');
  return fetchhomeres.json();
}

const fetchGeneralSetting = async () => {
    const apiUrl =
    env !== "development"
    ? `/data/general-setting`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/options/all`
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};

  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/contactus`
          : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/1282`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }

export default async function terms() {
  const homepage= await fetchhomePage()
    const GeneralSetting = await fetchGeneralSetting();
    const contactData = await fetchContactData();
    const yoastData =  GeneralSetting?.yoast_head_json

  return (
<Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
  <div className='main_wrapper'>
      <div className='error_sec thankyou_sec'>
        <div className='wrapper d_flex '>
          <div className='left_col'>
          <div className='img_col'>
          {GeneralSetting.thankyou_image_title && (<span dangerouslySetInnerHTML={{ __html: GeneralSetting.thankyou_image_title }}></span>)}
          {GeneralSetting.thankyou_image && (<img src={GeneralSetting.thankyou_image.url} alt={GeneralSetting.thankyou_image.title} />)}
          </div>
          </div>
          <div className='right_col'>
          {GeneralSetting.thankyou_title && (<h1 dangerouslySetInnerHTML={{ __html: GeneralSetting.thankyou_title }}></h1>)}
            {GeneralSetting.thankyou_content && (<p dangerouslySetInnerHTML={{ __html: GeneralSetting.thankyou_content }}></p>)}
            <Link className="btn" href="/"><em>Back to Home</em></Link>
            {GeneralSetting.thankyou_social_links && (
            <div className='social_icon d_flex d_flex_js'>
              {GeneralSetting.thankyou_social_links.map((page, index) => (
                <Link key={index} href={page.url} target='_blank' rel="noreferrer"><img src={page.icon.url} alt={page.icon.title} /></Link>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    
      <ExploreWork
      title = {GeneralSetting?.thankyou_portfolio_title}
      subtitle = {GeneralSetting?.thankyou_portfolio_subtitle}
      button = {GeneralSetting?.thankyou_portfolio_button}
      items = {GeneralSetting?.thankyou_portfolio_list}
      ></ExploreWork>
      
      {homepage && (homepage?.acf.hireus_title || homepage?.acf.hireus_subtitle || homepage?.acf.hireus_button_text || homepage?.acf.hireus_list) &&(
        <HireUs
        BASE_URL={BASE_URL}
        hireus_title={homepage?.acf.hireus_title}
        hireus_subtitle={homepage?.acf.hireus_subtitle}
        hireus_button_text={homepage?.acf.hireus_button_text}
        hireus_list={homepage?.acf.hireus_list}
        contactData={contactData}
        ></HireUs>
        )}
    </div>
      </Suspense>
  );
};

