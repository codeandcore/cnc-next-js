import Head from "@/app/head";
import BlogDetailContent from "@/components/blogdetailcomponents/BlogDetailContent";
import Highlights from "@/components/homecomponents/Highlights";
import HireUs from "@/components/homecomponents/HireUs";
import Loading from "@/components/Loading";
import Technodetailcontaints from "@/components/technologiescomponents/Technodetailcontaints";
import BASE_URL from "@/config";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const env = process.env.NEXT_PUBLIC_REACT_APP_ENV;
async function fetchData(slug) {
  const apiURL=  env !== "development"
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/${slug}`
    : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/?slug=${slug}`
  
    const response = await fetch(apiURL, {
      cache: 'no-store', // Adjust cache as needed
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  
  async function fetchHomeData() {
    const fetchHomeres = await   fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/home`
          : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/7`,{ cache: "no-store" } 
  )
    if (!fetchHomeres.ok) throw new Error('Failed to fetch homepage data');
    return fetchHomeres.json();
}
  
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/page/contactus`
          : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/pages/1282`,{ cache: "no-store" } 
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }
  

export default async function Page({ params }) {
  const slug = (await params).id
  const data = await fetchData(slug)
    if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
      notFound();
    }
  const technoData=data?.id ? data : data[0]
  const yoastData =technoData?.yoast_head_json
  const HomePage = await fetchHomeData()
  const contactData = await fetchContactData();
  const hireUsData =
  data &&  technoData?.acf && technoData?.acf?.hireus_title
    ? technoData?.acf
    : HomePage && HomePage?.acf
    ? HomePage?.acf
    : null;
  
  return (
    <Suspense fallback={<Loading />}>
     <Head yoastData={yoastData} />
         <div className='main_wrapper'>
      {technoData && (technoData.acf.title || technoData.acf.subtitle || technoData.acf.content || technoData.acf.technoloy_icon) &&(
       <Technodetailcontaints
       title={technoData.acf.title}
       subtitle={technoData.acf.subtitle}
       content={technoData.acf.content}
       technoloy_icon={technoData.acf.technoloy_icon}
       ></Technodetailcontaints>
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