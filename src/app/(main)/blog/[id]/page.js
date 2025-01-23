import Head from "@/app/head";
import BlogDetailContent from "@/components/blogdetailcomponents/BlogDetailContent";
import Highlights from "@/components/homecomponents/Highlights";
import HireUs from "@/components/homecomponents/HireUs";
import Loading from "@/components/Loading";
import BASE_URL from "@/config";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchData(slug) {
  const apiURL=  env !== "development"
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/posts/${slug}`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/posts/?slug=${slug}`
  
    const response = await fetch(apiURL, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  
  async function fetchHomeData() {
    const fetchHome = await   fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/home`
        : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`,
        { cache: "no-store" } 
  )
    if (!fetchHome.ok) throw new Error('Failed to fetch homepage data');
    return fetchHome.json();
}
  
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/pages/contactus`
        : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`,
        { cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }
  

export default async function Page({ params }) {
  const slug = (await params).id
  const blogData = await fetchData(slug)
  if (!blogData || (Array.isArray(blogData) && blogData.length === 0) || Object.keys(blogData).length === 0) {
      notFound();
  }
  const yoastData = blogData ? blogData?.yoast_head_json : blogData?.[0]?.yoast_head_json
  const HomePage = await fetchHomeData()
  const contactData = await fetchContactData();
  const hireUsData =
  blogData && blogData && blogData?.acf && blogData?.acf?.hireus_title
    ? blogData?.acf
    : HomePage && HomePage?.acf
    ? HomePage?.acf
    : null;
  

  
  return (
    <Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
        <div className='main_wrapper'>
          {blogData && (
            <BlogDetailContent blogData={blogData?.content ? blogData : blogData[0]} />
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
    
          {(HomePage && (HomePage.acf.our_blogs_title || HomePage.acf.our_blogs_subtitle || HomePage.acf.our_blogs))&& (
              <Highlights className='perpalbg'
              our_blogs_title={HomePage.acf.our_blogs_title}
              our_blogs_subtitle={HomePage.acf.our_blogs_subtitle}
              our_blogs={HomePage.acf.our_blogs}
             
              ></Highlights>
            )}
      </div>
  </Suspense>
      );
  }