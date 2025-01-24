import React, { Suspense } from 'react';
// import Life from '@/homecomponents/Life';
import CareerBanner from '@/components/careercomponents/CareerBanner';
import Perksandbenefits from '@/components/careercomponents/Perksandbenefits';
import JobOpenings from '@/components/careercomponents/JobOpenings';
import SolvingIndustriesChallenges from '@/components/careercomponents/SolvingIndustriesChallenges';
import Life from '@/components/homecomponents/Life';
import Head from '@/app/head';
import Loading from '@/components/Loading';
import "../../../components/homecomponents/Banner.css"
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/career`
      : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/655`
  
  
    const response = await fetch(apiUrl,   { cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };
  const fetchLifeCNCData = async () => {
    const res = await   fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
        : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`,
        { cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
  }
  

export default async function CareerPage() {
    const CareerpageData = await fetchPageData();
    const CNCLifeData = await fetchLifeCNCData();
    const yoastData =  CareerpageData?.yoast_head_json
    return (
      <Suspense fallback={<Loading />}>
       <Head yoastData={yoastData} />
    <div className='main_wrapper'>
       {CareerpageData && (CareerpageData.acf.career_banner_background_image || CareerpageData.acf.career_banner_title || CareerpageData.acf.career_banner_description ||   CareerpageData.acf.career_openings_label
        || CareerpageData.acf.career_right_side_banner_title || CareerpageData.acf.learn_more_about_codeandcore || CareerpageData.acf.banner_clients_list)&&(
       <CareerBanner
         career_banner_background_image={CareerpageData.acf.career_banner_background_image}
         career_banner_title={CareerpageData.acf.career_banner_title}
         career_banner_description={CareerpageData.acf.career_banner_description}
         career_openings_label={CareerpageData.acf.career_openings_label}
         career_opening_link={CareerpageData.acf.career_opening_link}
         select_opening_job = {CareerpageData.acf.select_opening_job}
         career_right_side_banner_title={CareerpageData.acf.career_right_side_banner_title}
         learn_more_about_codeandcore={CareerpageData.acf.learn_more_about_codeandcore}
         career_awards_logo={CareerpageData.acf.banner_clients_list}
 ></CareerBanner>
       )}
        {CareerpageData && (CareerpageData.acf.c_b_title || CareerpageData.acf.c_b_description || CareerpageData.acf.c_benifitis) &&
       <Perksandbenefits
          c_b_title={CareerpageData.acf.c_b_title}
          c_b_description={CareerpageData.acf.c_b_description}
          c_benifitis={CareerpageData.acf.c_benifitis}

       ></Perksandbenefits>
        }
      {CareerpageData && (CareerpageData.acf.jon_opening_title || CareerpageData.acf.job_opening_description || CareerpageData.acf.select_opening_job ||  CareerpageData.acf.connect_content_info) &&
       <JobOpenings
          jon_opening_title = {CareerpageData.acf.jon_opening_title}
          job_opening_description = {CareerpageData.acf.job_opening_description}
          select_opening_job = {CareerpageData.acf.select_opening_job}
          connect_content_info = {CareerpageData.acf.connect_content_info}
          CareerpageData = {CareerpageData}
       ></JobOpenings>
      }
       {CareerpageData && (CareerpageData.acf.sic_title || CareerpageData.acf.solving_industries || CareerpageData.acf.sic_button_name) &&
       <SolvingIndustriesChallenges
          sic_title ={CareerpageData.acf.sic_title}
          solving_industries ={CareerpageData.acf.solving_industries}
          sic_button_name ={CareerpageData.acf.sic_button_name}
          sic_button_link ={CareerpageData.acf.sic_button_link}

       ></SolvingIndustriesChallenges>
      }
       {CNCLifeData && (CNCLifeData?.acf.life_codeandcore_title || CNCLifeData?.acf.life_codeandcore_button_text || CNCLifeData?.acf.life_codeandcore_highlights || CNCLifeData?.acf.life_codeandcore_bottom_text ) && ( 
        <Life
          life_codeandcore_title={CNCLifeData?.acf.life_codeandcore_title}
          life_codeandcore_button_text={CNCLifeData?.acf.life_codeandcore_button_text}
          life_codeandcore_button_url={CNCLifeData?.acf.life_codeandcore_button_url}
          life_codeandcore_highlights={CNCLifeData?.acf.life_codeandcore_highlights}
          life_codeandcore_big_images={CNCLifeData?.acf.life_codeandcore_big_images}
          life_codeandcore_medium_images={CNCLifeData?.acf.life_codeandcore_medium_images}
          life_codeandcore_small_images={CNCLifeData?.acf.life_codeandcore_small_images}
          life_codeandcore_bottom_text={CNCLifeData?.acf.life_codeandcore_bottom_text}
        ></Life>
             )}
        </div>
        </Suspense>
  );
};

