import BlogList from '@/components/blogcomponents/BlogList';
import HireUs from '@/components/homecomponents/HireUs';
import BASE_URL from '@/config';
import React, { Suspense } from 'react';
import Head from '@/app/head';
import Loading from '@/components/Loading';

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
const fetchPageData = async () => {
    const apiUrl =
    env !== "development"
            ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/blog`
            : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/1219`
  
    const responsePageData = await fetch(apiUrl,{ cache: "no-store" } );
    if (!responsePageData.ok) {
      throw new Error("Failed to fetch data");
    }
    return responsePageData.json();
};
  
const fetchHireUsData = async () => {
    const apiUrl =
    env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`

  
    const response = await fetch(apiUrl,{ cache: "no-store" } );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
};
  
const fetchContactData = async () => {
    const apiUrl =
    env !== "development"
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/contactus`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/1282`
  
    const responseContactData = await fetch(apiUrl, { cache: "no-store" } );
    if (!responseContactData.ok) {
      throw new Error("Failed to fetch data");
    }
    return responseContactData.json();
};

const fetchCategoryData = async () => {
    const apiUrl =
    env !== "development"
    ? `${BASE_URL}/wp-json/wp/v2/categories`
    : `${BASE_URL}/wp-json/wp/v2/categories`
  
    const responseCategoryData = await fetch(apiUrl, { cache: "no-store" } );
    if (!responseCategoryData.ok) {
      throw new Error("Failed to fetch data");
    }
    return responseCategoryData.json();
};


export default async function BlogPage() {
    const pageData = await fetchPageData();
    const hireUsData= await fetchHireUsData()
    const contactData = await fetchContactData();
    const catData=await fetchCategoryData()
const yoastData=pageData?.yoast_head_json

 
  return (
    <Suspense fallback={<Loading />}>
  <Head yoastData={yoastData} />
    <div className='main_wrapper'>
      {pageData && (pageData.acf.blog_heading || pageData.acf.blog_content || pageData.acf.blog_all_categories_label) &&(
      <BlogList
      blog_heading = {pageData.acf.blog_heading}
      blog_content = {pageData.acf.blog_content}
      blog_all_categories_label = {pageData.acf.blog_all_categories_label}
                  BASE_URL={BASE_URL} 
                  catData={catData}
      />
      )}
      {hireUsData &&
        (hireUsData.acf?.hireus_title ||
            hireUsData.acf?.hireus_subtitle ||
            hireUsData.acf?.hireus_button_text ||
            hireUsData.acf?.hireus_list) && (
          <HireUs
            BASE_URL={BASE_URL}
            hireus_title={hireUsData.acf?.hireus_title}
            hireus_subtitle={hireUsData.acf?.hireus_subtitle}
            hireus_button_text={hireUsData.acf?.hireus_button_text}
            hireus_list={hireUsData.acf?.hireus_list}
            contactData={contactData}
          />
        )}
      </div>
      </Suspense>
  );
};

