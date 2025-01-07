'use client'
import React, { useEffect, useState, useRef } from 'react';
import './BlogList.css';
import './BlogPageTitle.css'
import Link from 'next/link';
import moment from 'moment';
import Pagination from './Pagination';

const BlogList = ({
  blog_heading,
  blog_content,
  blog_all_categories_label,
  BASE_URL,
  catData,
}) => {
  const [isLoadingk, setisLoadingk] = useState(true);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);


  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };

  const [blogData, setBlogsData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [specialBlogElements,setSpecialBlogElements]=useState([])
  const loadingRef = useRef(false);
  const blogsListRef = useRef(null);
  const fetchBlogs = async (category = null, page = 1) => {
    if (loadingRef.current) return;
    setisLoadingk(true);
    loadingRef.current = true;
  
    try {
      let url = `${BASE_URL}/wp-json/wp/v2/posts?per_page=12&page=${page}`;
      if (category) {
        url += `&categories=${category}`;
      }
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const total_posts = response.headers.get('X-Wp-Total');
      const total = response.headers.get('X-Wp-Totalpages');
      setTotalPosts(parseInt(total_posts));
      setTotalPages(parseInt(total));
  
      const data = await response.json();
      setBlogsData(data);
    } catch (error) {
      console.error('Error fetching data from WordPress API:', error);
    } finally {
      setisLoadingk(false);
      loadingRef.current = false;
    }
  };

  const fetchspecialBlogs = () => {
    fetch('https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all',  { cache: "no-store" } )
    .then(response => response.json())
      .then(data => {
        setSpecialBlogElements(data?.advertise_repeater)
    })
  }

  useEffect(() => {
    fetchBlogs();
   
  }, [BASE_URL]);

  useEffect(() => {
    fetchspecialBlogs()
  },[])

  useEffect(() => {
    fetchBlogs(currentCategory, currentPage);
  }, [currentPage, currentCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
    setBlogsData([]); // Clear previous blogs
    fetchBlogs(category, 1);
  };
  const handlePageChange = (page) => {
    handleSmoothScroll()
    setBlogsData([]); 
    fetchBlogs(currentCategory, page);
  };

  if (!isClient) return null;
  return (
    <div className="blog_main" ref={blogsListRef}>
      <div className="blog_page_title">
        <div className="wrapper d_flex">
          <div className="left_col">
            {blog_heading && (
              <h1>
                {blog_heading} <span>{totalPosts}</span>
              </h1>
            )}
            {blog_content && (
              <p dangerouslySetInnerHTML={{ __html: blog_content }}></p>
            )}
          </div>
          {catData && (
            <ul className="right_col d_flex">
              {blog_all_categories_label && (
                <li
                  className={`category ${currentCategory === null ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(null)}
                >
                  {blog_all_categories_label}
                </li>
              )}
              {catData.map((cat) => (
                <li
                  key={cat.id}
                  className={`category ${currentCategory === cat.id ? 'active' : ''}`}
                  dangerouslySetInnerHTML={{ __html: cat.name }}
                  onClick={() => handleCategoryChange(cat.id)}
                ></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div
        className="loader_blog"
        style={{ display: isLoadingk ? 'block' : 'none' }}
      >
        <img
          src={'../../assets/images/rotate-right.png'}
          alt="rotate-right"
        />
      </div>
      <div className="blog_section">
        <div className="wrapper">
          <div className='blogItemList'>
            {blogData.map((blog, index) => {
              if ((index + 1) % 6 === 0) {
                const specialIndex = (Math.floor(index / 6) % specialBlogElements.length);
                const specialContent = specialBlogElements[specialIndex];
                return (<div key={index} className="blog-item special-layout" style={{ backgroundImage: `url(${specialContent?.background_image?.url})` }}>             
                  <div className="special-content">
                    <h3 className="special-blog-title" style={{ color:specialContent?.button_type==="Primary" ? "#ffff" :"#424242"}}>
                      {specialContent?.title}
                    </h3>
                    <p className="content" style={{ color:specialContent?.button_type==="Primary" ? "#ffff" :"#424242"}}>{specialContent?.subtitle
                    }</p>
                    <Link
                      href={specialContent?.button?.url}
                      style={{ color: specialContent?.button_type === "Primary" ? "#ffff" : "#424242" }}
                      className={`btn  ${specialContent?.button_type==="Primary" ? "" : "btn-secondary"}`}
                    >
                      <em>{specialContent?.button?.title}</em>
                    </Link>
                  </div>
                </div>)
              } else {
                return (
                  <div
                    key={index}
                    className={`blog-item`}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="blog_img"
                    >
                      <img src={blog.featured_image_url} alt={blog?.title?.rendered} />
                    </Link>
                    <div className="blog-content">
                      <div className="blog_info d_flex">
                        <div className="col-left d_flex">
                          <a href={blog.link}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: blog.categories_names,
                              }}
                            ></span>
                          </a>
                          <div className="date">
                            <img src={"/assets/images/dateIcon.svg"} alt="date_icon" />{moment(blog.date).format('D.M.YYYY')}
                          </div>
                        </div>
                      </div>
                      <h3>
                        <Link
                          href={`/blog/${blog.slug}`}
                        >
                          {blog.title?.rendered?.replace(/<\/?br\s*\/?>/gi, ' ')}
                        </Link>
                      </h3>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className='pagination-section'>
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default BlogList;
