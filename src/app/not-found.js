import React from 'react';

import Link from 'next/link';
import ExploreWork from '@/components/homecomponents/ExploreWork';
import HireUs from '@/components/homecomponents/HireUs';
import Head from './head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Custom404 = async () => {
  const HomePage = await fetchHomepageData()
  const GeneralSetting = await fetchGeneralSettings()
  return (
    <>
       <Header
            logo={GeneralSetting?.header_white_logo}
            header_black_logo={GeneralSetting?.header_black_logo}
            button_text={GeneralSetting?.header_button_text}
            button_url={GeneralSetting?.header_button_url}
            main_menu={GeneralSetting?.main_menu}
            industry_menu={GeneralSetting?.industry_menu}
            services_menu={GeneralSetting?.services_menu}
            additional_css={GeneralSetting?.additional_css}
          />

      <div className="main_wrapper">
      <div className="error_sec">
        <div className="wrapper d_flex d_flex_at">
          <div className="left_col">
            {GeneralSetting.error_background_image && (
              <img
                src={GeneralSetting.error_background_image.url}
                alt={GeneralSetting.error_background_image.title || 'Error Background'}
              />
            )}
          </div>
          <div className="right_col">
            {GeneralSetting.error_title && (
              <h1 dangerouslySetInnerHTML={{ __html: GeneralSetting.error_title }}></h1>
            )}
            {GeneralSetting.error_content && (
              <div dangerouslySetInnerHTML={{ __html: GeneralSetting.error_content }}></div>
              )}

            <Link href="/" className='btn'>
                  Back to Home
                </Link>

          </div>
        </div>
      </div>

      {GeneralSetting.error_you_may_like_title && (
        <div className="pages_loop">
          <div className="wrapper">
            <h2 dangerouslySetInnerHTML={{ __html: GeneralSetting.error_you_may_like_title }}></h2>
            {GeneralSetting.error_like_pages_list && (
              <div className="inner d_flex d_flex_jc">
                {GeneralSetting.error_like_pages_list.map((page, index) => (
                  <Link className="btn" key={index} href={`/${page.post_name}`}>
                    {page.post_title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
 
        <ExploreWork
          title={GeneralSetting?.portfolio_title}
          subtitle={GeneralSetting?.portfolio_subtitle}
          button={GeneralSetting?.portfolio_button}
          items={GeneralSetting?.industry_portfolio_list}
        />
      {(HomePage?.acf?.hireus_title || HomePage?.acf?.hireus_subtitle || HomePage?.acf?.hireus_button_text || HomePage?.acf?.hireus_list) && (
        <HireUs
          hireus_title={HomePage.acf.hireus_title}
          hireus_subtitle={HomePage.acf.hireus_subtitle}
          hireus_button_text={HomePage.acf.hireus_button_text}
          hireus_list={HomePage.acf.hireus_list}
        />
      )}
      </div>
      <Footer ApiData={GeneralSetting}/>
    </>
  );
};
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchHomepageData() {
  const res = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
        : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`,
         { cache: "no-store" } 
)
  if (!res.ok) throw new Error('Failed to fetch homepage data');
  return res.json();
}
async function fetchGeneralSettings() {
  const generalSettingRes = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/general-setting`
      : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/options/all`,
      { cache: "no-store" } 
)
  if (!generalSettingRes.ok) {
    throw new Error('Failed to fetch general settings');
  }
  return generalSettingRes.json();
}

export default Custom404;
