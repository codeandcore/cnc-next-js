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
  catData
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
  const loadingRef = useRef(false);
  const blogsListRef = useRef(null);

  const fetchBlogs = (category = null, page = 1) => {
    if (loadingRef.current) return;
    setisLoadingk(true);
    loadingRef.current = true;
    let url = `${BASE_URL}/wp-json/wp/v2/posts?per_page=12&page=${page}`;
    if (category) {
      url += `&categories=${category}`;
    }
    fetch(url)
      .then((response) => {

        const total_posts = response.headers.get('X-Wp-Total');
        const total = response.headers.get('X-Wp-Totalpages');
        setTotalPosts(parseInt(total_posts));
        setTotalPages(parseInt(total));
        return response.json();
      })
      .then((data) => {
        // const transformedData = [];
        // for (let i = 0; i < data.length; i += 3) {
        //   const mainPost = {
        //     id: data[i].id,
        //     slug: data[i].slug,
        //     categories_names: data[i].categories_names,
        //     title: data[i].title.rendered,
        //     image: data[i].featured_image_url || "/assets/images/blogImg1.png",
        //     date: new Date(data[i].date).toLocaleDateString('en-GB'),
        //     author: data[i].author_name || 'Codeandcore',
        //     duration: data[i].human_time_diff,
        //     link: data[i].link,
        //     innerdata: [],
        //   };

        //   for (let j = 1; j <= 2; j++) {
        //     if (i + j < data.length) {
        //       mainPost.innerdata.push({
        //         id: data[i + j].id,
        //         slug: data[i + j].slug,
        //         categories_names: data[i + j].categories_names,
        //         title: data[i + j].title.rendered,
        //         image: data[i + j].featured_image_url || "/assets/images/blogImg1.png",
        //         date: new Date(data[i + j].date).toLocaleDateString('en-GB'),
        //         author: data[i + j].author_name || 'Codeandcore',
        //         duration: data[i + j].human_time_diff,
        //         link: data[i + j].link,
        //       });
        //     }
        //   }
        //   transformedData.push(mainPost);
        // }
        setBlogsData(data);
        loadingRef.current = false;
      })
      .catch((error) => {
        console.error('Error fetching data from WordPress API:', error);
        loadingRef.current = false;
      })
      .finally(() => {
        setisLoadingk(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [BASE_URL]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (blogsListRef.current) {
  //       const servicesListBottom =
  //         blogsListRef.current.getBoundingClientRect().bottom + 100;
  //       const windowBottom = window.innerHeight;
  //       if (
  //         servicesListBottom <= windowBottom &&
  //         !loadingRef.current &&
  //         currentPage < totalPages
  //       ) {
  //         setCurrentPage((prevPage) => prevPage + 1);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [currentPage, totalPages]);

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
    fetchBlogs(currentCategory, page);
  };

  const specialBlogContents = [
    {
      backgroundImage: "/assets/images/special-blog-bg1.png",
      title: "Get In Touch with Us",
      content: "We’re here to answer your questions and bring your ideas to life. Reach out today!",
      fontColor: "#FFFFFF",
      btn: {
        type:"primary",
        url: "/contactus",
        label: "Contact Us",
        backgroundColor: "",
        fontColor: "#FFFFFF"
      }
    },
    {
      backgroundImage: "/assets/images/special-blog-bg2.png",
      title: "Powering the future",
      content: "Discover the cutting-edge technologies that drive our solutions.",
      fontColor: "#424242",
      btn: {
        type:"secondary",
        url: "/technologies",
        label: "Our Technologies",
        backgroundColor: "",
        fontColor: "#000000"
      }
    },
    {
      backgroundImage: "/assets/images/special-blog-bg1.png",
      title: "Innovation in Action",
      content: "Explore the projects that showcase our passion for design and technology.",
      fontColor: "#FFFFFF",
      btn: {
        type:"primary",
        url: "/portfolio",
        label: "Our Portfolio",
        backgroundColor: "",
        fontColor: "#FFFFFF"
      }
    },
    {
      backgroundImage: "/assets/images/special-blog-bg2.png",
      title: "Talk to Us Today",
      content: "Have a question or a project in mind? Let’s make your ideas happen!Let’s start a conversation!",
      fontColor: "#424242",
      btn: {
        type:"secondary",
        url: "/contactus",
        label: "Contact Us",
        backgroundColor: "",
        fontColor: "#000000"
      }
    },
  ];


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
              if ((index + 1) % 3 === 0) {
                const specialIndex = (Math.floor(index / 3) % specialBlogContents.length);
                const specialContent = specialBlogContents[specialIndex];
                return (<div key={index} className="blog-item special-layout" style={{ backgroundImage: `url(${specialContent?.backgroundImage})` }}>
                  {/* <Link href={`/blog/${blog.slug}`} className="blog_img">
                    <img src={blog.featured_image_url} alt={blog?.title?.rendered} />
                  </Link>*/}
                  <div className="special-content">
                    <h2 className="special-blog-title" style={{ color: specialContent?.fontColor }}>
                      {specialContent.title}
                    </h2>
                    <p className="content" style={{ color: specialContent?.fontColor }}>{specialContent.content}</p>
                    <Link
                      href={specialContent?.btn.url}
                      style={{
                        // color: specialContent?.btn?.fontColor
                        color:"#ffff"
                      }}
                      className={`btn  ${specialContent?.btn?.type==="primary" ? "" : "btn-secondary"}`}
                     
                    >
                      <em>{specialContent?.btn.label}</em>
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
