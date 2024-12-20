import Head from "@/app/head";
import BlogDetailContent from "@/components/blogdetailcomponents/BlogDetailContent";
import Highlights from "@/components/homecomponents/Highlights";
import HireUs from "@/components/homecomponents/HireUs";
import BASE_URL from "@/config";

const env = process.env.NODE_ENV;
async function fetchData(slug) {
  const apiURL=  env !== "development"
  ? `/data/posts/${slug}`
    : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/posts/?slug=${slug}`
  
    const response = await fetch(apiURL, {
      cache: 'no-store', // Adjust cache as needed
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  
  async function fetchHomeData() {
    const res = await   fetch(
      env !== "development"
          ? `/data/pages/home`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/7`
  )
    if (!res.ok) throw new Error('Failed to fetch homepage data');
    return res.json();
}
  
  async function fetchContactData() {
    const res = await  fetch(
      env !== "development"
          ? `/data/pages/contactus`
          : `https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/wp/v2/pages/1282`
  )
    if (!res.ok) throw new Error('Failed to fetch contact data');
    return res.json();
  }
  

export default async function Page({ params }) {
  const slug = (await params).id
  const blogData = await fetchData(slug)
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
    <>
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
                hireus_list={hireUsData.hireus_list}
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
  </>
      );
  }