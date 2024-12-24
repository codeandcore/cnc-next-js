"use client"

import Head from 'next/head';
import HireUs from '@/components/homecomponents/HireUs';
import ExploreWork from '@/components/homecomponents/ExploreWork';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Thankyou = () => {
  const navigate = useRouter();
  const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
  const [pageData, setPageData] = useState({
    generalSettings: null,
    homepageData: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [generalSettings, homepageData] = await Promise.all([
          fetch(
            env !== "development"
              ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/general-setting`
              : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all`,
            { cache: "no-store" }
          ).then(res => {
            if (!res.ok) throw new Error('Failed to fetch general settings');
            return res.json();
          }),
          fetch(
            env !== "development"
              ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
              : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`,
            { cache: "no-store" }
          ).then(res => {
            if (!res.ok) throw new Error('Failed to fetch homepage data');
            return res.json();
          })
        ]);

        setPageData({
          generalSettings,
          homepageData
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  if (!pageData.generalSettings) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-US" />
        <title>Thank You</title>
      </Head>
      <div className="main_wrapper">
        <div className="error_sec thankyou_sec">
          <div className="wrapper d_flex">
            <div className="left_col">
              <div className="img_col">
                {pageData.generalSettings.thankyou_image_title && (
                  <span 
                    dangerouslySetInnerHTML={{ 
                      __html: pageData.generalSettings.thankyou_image_title 
                    }}
                  />
                )}
                {pageData.generalSettings.thankyou_image && (
                  <img 
                    src={pageData.generalSettings.thankyou_image.url} 
                    alt={pageData.generalSettings.thankyou_image.title} 
                  />
                )}
              </div>
            </div>
            <div className="right_col">
              {pageData.generalSettings.thankyou_title && (
                <h1 
                  dangerouslySetInnerHTML={{ 
                    __html: pageData.generalSettings.thankyou_title 
                  }}
                />
              )}
              {pageData.generalSettings.thankyou_content && (
                <p 
                  dangerouslySetInnerHTML={{ 
                    __html: pageData.generalSettings.thankyou_content 
                  }}
                />
              )}
              <button
                className="btn"
                onClick={() => navigate.push("/")}
                style={{
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <em>Back to Home</em>
              </button>
              {pageData.generalSettings.thankyou_social_links && (
                <div className="social_icon d_flex d_flex_js">
                  {pageData.generalSettings.thankyou_social_links.map((page, index) => (
                    <a 
                      href={page.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      key={index}
                    >
                      <img src={page.icon.url} alt={page.icon.title} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <ExploreWork 
          title={pageData.generalSettings.thankyou_portfolio_title}
          subtitle={pageData.generalSettings.thankyou_portfolio_subtitle}
          button={pageData.generalSettings.thankyou_portfolio_button}
          items={pageData.generalSettings.thankyou_portfolio_list}
        />
        {pageData.homepageData && (
          <HireUs
            hireus_title={pageData.homepageData?.acf.hireus_title}
            hireus_subtitle={pageData.homepageData?.acf.hireus_subtitle}
            hireus_button_text={pageData.homepageData?.acf.hireus_button_text}
            hireus_list={pageData.homepageData?.acf.hireus_list}
          />
        )}
      </div>
    </>
  );
};

export default Thankyou;