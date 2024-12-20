
import BASE_URL from '@/config';
import React from 'react';
import Head from '../head';
import HireUs from '@/components/homecomponents/HireUs';
import Life from '@/components/homecomponents/Life';
import HappyHours from '@/components/Lifecomponents/HappyHours';
import Linkedinlife from '@/components/Lifecomponents/Linkedinlife';
import Socialmedialife from '@/components/Lifecomponents/Socialmedialife';
import FestivalCelebration from '@/components/Lifecomponents/FestivalCelebration';

const env = process.env.NODE_ENV;
const fetchhomePage = async () => {
    const apiUrl =
    env !== "development"
    ? `/data/pages/life-at-cnc`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1665`
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};


const fetchYoutubeMedia = async () => {
    const apiUrl =
    env !== "development"
    ? `/data/youtube-feeds`
    : `https://cnc-website-new.vercel.app/data/youtube-feeds`
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};

  async function fetchHomehomePage() {
    const res = await fetch(
      env !== "development"
          ? `/data/pages/home`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
  }
  
  // Fetch contact data server-side
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `/data/pages/contactus`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }

export default async function portfolioPage() {
    const cncData = await fetchhomePage();
    const homePage = await fetchHomehomePage();
    const contactData = await fetchContactData();
    const socialData= await fetchYoutubeMedia()
    const yoastData =  cncData?.yoast_head_json

    const hireUsData =
    cncData && cncData?.acf && cncData?.acf.hireus_title
      ? cncData?.acf
      : homePage && homePage?.acf
      ? homePage?.acf
                : null;
    
  return (
    <>
  <Head yoastData={yoastData} />
  <div className='main_wrapper'>
       {homePage && (homePage.acf.life_codeandcore_title || homePage.acf.life_codeandcore_button_text || homePage.acf.life_codeandcore_highlights || homePage.acf.life_codeandcore_bottom_text ) && ( 
        <Life
        className={'lifebanner'}
          life_codeandcore_title={homePage.acf.life_codeandcore_title}
          life_codeandcore_button_text={homePage.acf.life_codeandcore_button_text}
          life_codeandcore_button_url={homePage.acf.life_codeandcore_button_url}
          life_codeandcore_highlights={homePage.acf.life_codeandcore_highlights}
          life_codeandcore_big_images={homePage.acf.life_codeandcore_big_images}
          life_codeandcore_medium_images={homePage.acf.life_codeandcore_medium_images}
          life_codeandcore_small_images={homePage.acf.life_codeandcore_small_images}
          life_codeandcore_bottom_text={homePage.acf.life_codeandcore_bottom_text}
        ></Life>
             )}
      {cncData && (cncData.acf.our_culture_small_title || cncData.acf.our_culture_title || cncData.acf.our_culture_first_gallery || cncData.acf.our_culture_second_gallery) && 
        <HappyHours
        our_culture_small_title = {cncData.acf.our_culture_small_title}
        our_culture_title = {cncData.acf.our_culture_title}
        our_culture_first_gallery = {cncData.acf.our_culture_first_gallery}
        our_culture_second_gallery = {cncData.acf.our_culture_second_gallery}
        our_culture_bottom_content = {cncData.acf.our_culture_bottom_content}
        />
      }
      {cncData && (cncData.acf.celebration_content || cncData.acf.celebration_list || cncData.acf.celebration_year_title) && 
      <FestivalCelebration
      celebration_content = {cncData.acf.celebration_content}
      celebration_list = {cncData.acf.celebration_list}
      celebration_year_title = {cncData.acf.celebration_year_title}
      />
      }
      {cncData &&
      <Linkedinlife
        social_media_linkdin_title = {cncData.acf.social_media_linkdin_title}
       />
      }
      {cncData &&
      <Socialmedialife
                  social_media_title={cncData.acf.social_media_title}
                  socialData={ socialData}      

      />
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
    </div>
      </>
  );
};

