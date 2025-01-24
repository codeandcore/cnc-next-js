import React, { Suspense } from "react";
import WhoWeAre from "@/components/aboutuscomponents/WhoWeAre";
import VisionImage from "@/components/aboutuscomponents/VisionImage";
import Visionvideo from "@/components/aboutuscomponents/Visionvideo";
import OurEmployeeandtech from "@/components/aboutuscomponents/OurEmployeeandtech";
import YearOfGrowing from "@/components/aboutuscomponents/YearOfGrowing";
import NewLook from "@/components/aboutuscomponents/NewLook";
import RecognitionsAwards from "@/components/aboutuscomponents/RecognitionsAwards";
import HireUs from "@/components/homecomponents/HireUs";
import Head from "../../head";
import Loading from "@/components/Loading";
import AboutBanner from "@/components/aboutuscomponents/AboutBanner";
const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
  const apiUrl =
    env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/about-us`
      : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/389`
  
  const response = await fetch(apiUrl,{ cache: "no-store" } );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
async function fetchHomepageData() {
  const res = await fetch(
    env !== "development"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
        : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`,{ cache: "no-store" } 
)
  if (!res.ok) throw new Error('Failed to fetch homepage data');
  return res.json();
}

export default async function AboutUsPage() {
  const pageData = await fetchPageData();
  const homePage = await fetchHomepageData();
  const hireUsData =  pageData?.acf?.hireus_title
  ? pageData.acf :  homePage && homePage?.acf
      ? homePage?.acf : homePage?.acf
  return (
    <Suspense fallback={<Loading />}>
  <Head yoastData={pageData?.yoast_head_json} />
    <div className="main_wrapper">
      {pageData?.acf?.about_banner_title && (
        <AboutBanner
          about_banner_background_image={pageData.acf.about_banner_background_image}
          about_banner_mobile_background_image={pageData.acf.about_banner_mobile_background_image}
          about_banner_background_video={pageData.acf.about_banner_background_video}
          about_banner_title={pageData.acf.about_banner_title}
          about_banner_subtitle={pageData.acf.about_banner_subtitle}
          about_banner_description={pageData.acf.about_banner_description}
          about_banner_rating_platform_list={pageData.acf.about_banner_rating_platform_list}
        />
      )}
      {pageData?.acf?.a_os_title && (
        <WhoWeAre
          a_os_title={pageData.acf.a_os_title}
          a_os_sub_title={pageData.acf.a_os_sub_title}
          certified_list={pageData.acf.certified_list}
          a_wwa_right_side_title={pageData.acf.a_wwa_right_side_title}
          a_wwa_about_description={pageData.acf.a_wwa_about_description}
          goal_and_vision_section={pageData.acf.goal_and_vision_section}
        />
      )}
      <Visionvideo />
      {pageData?.acf?.a_left_side_section_title && (
        <OurEmployeeandtech
          a_left_side_section_title={pageData.acf.a_left_side_section_title}
          employee_experience_detail={pageData.acf.employee_experience_detail}
          a_right_side_section_title={pageData.acf.a_right_side_section_title}
          technology_stack={pageData.acf.technology_stack}
        />
      )}
      {pageData?.acf?.a_y_left_side_title && (
        <YearOfGrowing
          a_y_left_side_title={pageData.acf.a_y_left_side_title}
          a_y_right_side_description={pageData.acf.a_y_right_side_description}
          year_of_growing={pageData.acf.year_of_growing}
          a_y_codeandcore_highlights={pageData.acf.a_y_codeandcore_highlights}
        />
      )}
      {pageData?.acf?.a_nlook_title && (
        <NewLook
          a_nlook_title={pageData.acf.a_nlook_title}
          a_nlook_content={pageData.acf.a_nlook_content}
        />
      )}
      {pageData?.acf?.a_ra_left_side_ttile && (
        <RecognitionsAwards
          a_ra_left_side_ttile={pageData.acf.a_ra_left_side_ttile}
          a_ra_right_side_content={pageData.acf.a_ra_right_side_content}
          a_ra_dev_button_name={pageData.acf.a_ra_dev_button_name}
          a_ra_dev_button_link={pageData.acf.a_ra_dev_button_link}
          a_ra_design_button_name={pageData.acf.a_ra_design_button_name}
          a_ra_design_button_link={pageData.acf.a_ra_design_button_link}
          a_Indastry_slider={pageData.acf.a_Indastry_slider}
          a_award_slider={pageData.acf.a_award_slider}
        />
      )}
      {pageData?.acf?.a_vision_background_image && (
        <VisionImage a_vision_background_image={pageData.acf.a_vision_background_image} />
      )}
      {hireUsData?.hireus_title && (
        <HireUs
          hireus_title={hireUsData.hireus_title}
          hireus_subtitle={hireUsData.hireus_subtitle}
          hireus_button_text={hireUsData.hireus_button_text}
          hireus_list={homePage?.acf?.hireus_list}
        />
      )}
      </div>
      </Suspense>
  );
}
