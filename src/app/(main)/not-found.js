import React from 'react';
import Link from 'next/link';
import ExploreWork from '@/components/homecomponents/ExploreWork';
import HireUs from '@/components/homecomponents/HireUs';
import Head from 'next/head';

const Custom404 = async () => {
  const HomePage = await fetchHomepageData()
  const GeneralSetting = await fetchGeneralSettings()
  return (
    <>
       <Head>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content='The page you are looking for does not exist.'
        />
      </Head>
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
            <Link legacyBehavior href="/">
              <a className="btn">Back to Home</a>
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
                  <Link legacyBehavior key={index} href={`/${page.post_name}`}>
                    <a className="btn">{page.post_title}</a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {(GeneralSetting.portfolio_title || GeneralSetting.portfolio_subtitle || GeneralSetting.portfolio_button || GeneralSetting.industry_portfolio_list) && (
        <ExploreWork
          title={GeneralSetting.portfolio_title}
          subtitle={GeneralSetting.portfolio_subtitle}
          button={GeneralSetting.portfolio_button}
          items={GeneralSetting.industry_portfolio_list}
        />
      )}

      {(HomePage?.acf?.hireus_title || HomePage?.acf?.hireus_subtitle || HomePage?.acf?.hireus_button_text || HomePage?.acf?.hireus_list) && (
        <HireUs
          hireus_title={HomePage.acf.hireus_title}
          hireus_subtitle={HomePage.acf.hireus_subtitle}
          hireus_button_text={HomePage.acf.hireus_button_text}
          hireus_list={HomePage.acf.hireus_list}
        />
      )}
    </div>
    </>
  );
};
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchHomepageData() {
  const res = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
        : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`,
         { cache: "no-store" } 
)
  if (!res.ok) throw new Error('Failed to fetch homepage data');
  return res.json();
}
async function fetchGeneralSettings() {
  const generalSettingRes = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/general-setting`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all`,
      { cache: "no-store" } 
)
  if (!generalSettingRes.ok) {
    throw new Error('Failed to fetch general settings');
  }
  return generalSettingRes.json();
}

export default Custom404;
