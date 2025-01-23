import { Suspense } from "react";
import Head from "@/app/head";
import CasestudingContaints from "@/components/casestudingdetailcomponets/CasestudingContaints";
import PortfolioFeatures from "@/components/casestudingdetailcomponets/PortfolioFeatures";
import ExploreWork from "@/components/homecomponents/ExploreWork";
import HireUs from "@/components/homecomponents/HireUs";
import ProjectLogoMarquee from "@/components/homecomponents/ProjectLogoMarquee";
import Loading from "@/components/Loading";
import BASE_URL from "@/config";
import { notFound } from "next/navigation";
import IntialGoals from "@/components/casestudingdetailcomponets/IntialGoals";
import PortfolioFeaturedImage from "@/components/casestudingdetailcomponets/PortfolioFeaturedImage";
import PainAreaSection from "@/components/casestudingdetailcomponets/PainAreaSection";
import DeliverableOutline from "@/components/casestudingdetailcomponets/DeliverableOutline";
import ChallengesSection from "@/components/casestudingdetailcomponets/ChallengesSection";
import SolutionSection from "@/components/casestudingdetailcomponets/SolutionSection";
import UniqueElements from "@/components/casestudingdetailcomponets/UniqueElements";
import SuccesStory from "@/components/casestudingdetailcomponets/SuccesStory";
import DavelopmentApproach from "@/components/casestudingdetailcomponets/DavelopmentApproach";

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchData(slug) {
  const apiURL =
    env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/posts/${slug}`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/portfolio/?slug=${slug}`;

  try {
    const fetchresponse = await fetch(apiURL, {
      cache: "no-store", // Adjust cache as needed
    });

    if (!fetchresponse.ok) {
      console.error(`Error fetching data for slug: ${slug}`);
      throw new Error("Failed to fetch data");
    }

    const data = await fetchresponse.json(); // Parse the body once here
    return data;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw error;
  }
}

async function fetchHomeData() {
  const apiURL =
    env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`;

  try {
    const fetchHomeresponse = await fetch(apiURL, { cache: "no-store" });

    if (!fetchHomeresponse.ok) {
      console.error("Error fetching homepage data");
      throw new Error("Failed to fetch homepage data");
    }

    const data = await fetchHomeresponse.json(); // Parse the body once here
    return data;
  } catch (error) {
    console.error("Error in fetchHomeData:", error);
    throw error;
  }
}

async function fetchContactData() {
  const apiURL =
    env !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/contactus`
      : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`;

  try {
    const response = await fetch(apiURL, { cache: "no-store" });
    if (!response.ok) {
      console.error("Error fetching contact data");
      throw new Error("Failed to fetch contact data");
    }

    const data = await response.json(); // Parse the body once here
    return data;
  } catch (error) {
    console.error("Error in fetchContactData:", error);
    throw error;
  }
}

export default async function Page({ params }) {
  const slug = (await params).id
  const data = await fetchData(slug)
  if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
    notFound();
  }
  const portfolioData = data?.id ? data : data[0]

  const yoastData = data ? data?.yoast_head_json : data?.[0]?.yoast_head_json
  const HomePage = await fetchHomeData()
  const contactData = await fetchContactData();
  const hireUsData =
    portfolioData && portfolioData?.acf && portfolioData?.acf?.hireus_title
      ? portfolioData?.acf
      : HomePage && HomePage?.acf
        ? HomePage?.acf
        : null;
    
  return (
    <Suspense fallback={<Loading />}>
      <Head yoastData={yoastData} />
      <div className='main_wrapper casestudyMain'>
        {portfolioData && (
          <CasestudingContaints
            CaseStudycptData={portfolioData}
          ></CasestudingContaints>
        )}

        {portfolioData && portfolioData?.acf?.initial_goal_title
          && portfolioData?.acf?.initial_goal_content  && portfolioData?.acf?.initial_goal_image
          && <IntialGoals content={portfolioData?.acf?.initial_goal_content
          } title={portfolioData?.acf?.initial_goal_title} image={portfolioData?.acf?.initial_goal_image
          } />} 
        
        {portfolioData?.featured_image_url && <PortfolioFeaturedImage featured_image_url={portfolioData?.featured_image_url} />}
        {portfolioData && portfolioData?.acf?.pain_area_title
          && portfolioData?.acf?.pain_area_content && portfolioData?.acf?.pain_area_image && <PainAreaSection content={portfolioData?.acf?.pain_area_content} title={portfolioData?.acf?.pain_area_title} image={portfolioData?.acf?.pain_area_image} />}

        {portfolioData && portfolioData?.acf?.development_approach_title
          && portfolioData?.acf?.development_approach_content && portfolioData?.acf?.development_approach_image
          && <DavelopmentApproach content={portfolioData?.acf?.development_approach_content
          } title={portfolioData?.acf?.development_approach_title} image={portfolioData?.acf?.development_approach_image
          } />}
        {portfolioData && portfolioData?.acf?.deliverables_outlined_title && portfolioData?.acf?.deliverables_outlined_list
          && portfolioData?.acf?.deliverables_outlined_list?.length !== 0
          && <DeliverableOutline items={portfolioData?.acf?.deliverables_outlined_list
          } title={portfolioData?.acf?.deliverables_outlined_title} />}
        
        {portfolioData && portfolioData?.acf?.challenges_faced_title
          && portfolioData?.acf?.challenges_faced_content
          && portfolioData?.acf?.challenges_faced_image
          && <ChallengesSection content={portfolioData?.acf?.challenges_faced_content
          } title={portfolioData?.acf?.challenges_faced_title} image={portfolioData?.acf?.challenges_faced_image
          } />}
        
        {portfolioData && portfolioData?.acf?.solution_title
          && portfolioData?.acf?.solution_content
          && <SolutionSection content={portfolioData?.acf?.solution_content
          } title={portfolioData?.acf?.solution_title} reviewLogo={portfolioData?.acf?.testimonial_stars} authorname={portfolioData?.acf?.testimony_name} review_content={portfolioData?.acf?.testimonial_content} authorImage={portfolioData?.acf?.testimony_photo} />}
        
        {portfolioData && portfolioData?.acf?.unique_elements_title && portfolioData?.acf?.unique_elements_list
          && portfolioData?.acf?.unique_elements_list?.length!==0
          && <UniqueElements title={portfolioData?.acf?.unique_elements_title} items={portfolioData?.acf?.unique_elements_list} />}
        

            {portfolioData && portfolioData?.acf?.success_story_title
          && portfolioData?.acf?.success_story_content
          && <SuccesStory title={portfolioData?.acf?.success_story_title} items={portfolioData?.acf?.success_story_list} content={portfolioData?.acf?.success_story_content} />}

          <ExploreWork
            title={portfolioData?.acf?.portfolio_title}
            subtitle={portfolioData?.acf?.portfolio_subtitle}
            button={portfolioData?.acf?.portfolio_button}
            items={portfolioData?.acf?.case_study_portfolio_list}
          ></ExploreWork>

        {HomePage && (HomePage.acf.banner_clients_list) && (
          <ProjectLogoMarquee banner_clients_list={HomePage.acf.banner_clients_list}></ProjectLogoMarquee>
        )}
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
              hireus_list={HomePage?.acf?.hireus_list}
              contactData={contactData}
            />
          )}
      </div>
    </Suspense>
  );
}