
import React, { Suspense } from 'react';
import Head from '@/app/head';
import ReviewBanner from '@/components/Reviewcomponents/ReviewBanner';
import ReviewClientsay from '@/components/Reviewcomponents/ReviewClientsay';
import ReviewAwards from '@/components/Reviewcomponents/ReviewAwards';
import Loading from '@/components/Loading';


const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/review`
          : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/2896`
  
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
  

export default async function page() {
    const ReviewpageData = await fetchPageData();

    const yoastData =  ReviewpageData?.yoast_head_json

  return (
    <Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
  {ReviewpageData && (ReviewpageData.acf.banner_title || ReviewpageData.acf.banner_description || ReviewpageData.acf.right_side_title || ReviewpageData.acf.discover_more )&&(
      <ReviewBanner
      banner_title={ReviewpageData.acf.banner_title}
      banner_description={ReviewpageData.acf.banner_description}
      right_side_title={ReviewpageData.acf.right_side_title}
      discover_more={ReviewpageData.acf.discover_more}

      />      
      )}
      {ReviewpageData && (ReviewpageData.acf.what_client_say_title || ReviewpageData.acf.client_listing || ReviewpageData.acf.client_reviews )&&(
        <ReviewClientsay
           what_client_say_title={ReviewpageData.acf.what_client_say_title}
           client_listing={ReviewpageData.acf.client_listing}
           client_reviews={ReviewpageData.acf.client_reviews}
         />
      )}
      {ReviewpageData && (ReviewpageData.acf.awards_title || ReviewpageData.acf.awards_subtitle || ReviewpageData.acf.awards_listing_ltr || ReviewpageData.acf.awards_listing_rtl) && (
        <ReviewAwards
          awards_title={ReviewpageData.acf.awards_title}
          awards_subtitle={ReviewpageData.acf.awards_subtitle}
          awards_listing_ltr={ReviewpageData.acf.awards_listing_ltr}
          awards_listing_rtl={ReviewpageData.acf.awards_listing_rtl}
         />
      )}
      </Suspense>
  );
};

