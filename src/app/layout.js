import Loading from '../components/Loading';
import $ from 'jquery';
import './globals.css';
import Header from '../components/Header';
import { Suspense } from 'react';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import NextTopLoader from 'nextjs-toploader';
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchGeneralSettings() {
  const generalSettingRes = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/general-setting`
        : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all`
)
  if (!generalSettingRes.ok) {
    throw new Error('Failed to fetch general settings');
  }
  return generalSettingRes.json();
}

export default async function RootLayout({ children }) {
  const generalSetting = await fetchGeneralSettings();

  return (
    <html lang="en">
   <head>
    <meta charSet="utf-8" />  
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
      <body>
        <Suspense fallback={<Loading />}>
          <NextTopLoader showSpinner={false} height={5} />
        <ScrollToTop />
          <Header
            logo={generalSetting.header_white_logo}
            header_black_logo={generalSetting.header_black_logo}
            button_text={generalSetting.header_button_text}
            button_url={generalSetting.header_button_url}
            main_menu={generalSetting.main_menu}
            industry_menu={generalSetting.industry_menu}
            services_menu={generalSetting.services_menu}
            additional_css={generalSetting.additional_css}
          />
          {/* Main content (page content) */}
          <main>{children}</main>
          <Footer ApiData={generalSetting}/>
        </Suspense>

      </body>
    </html>
  );
}
