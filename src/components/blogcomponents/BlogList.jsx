'use client'
import React, { useEffect, useState, useRef } from 'react';
import './BlogList.css';
import './BlogPageTitle.css'
import Link from 'next/link';

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
    let url = `${BASE_URL}/wp-json/wp/v2/posts?per_page=9&page=${page}`;
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
        const transformedData = [];
        for (let i = 0; i < data.length; i += 3) {
          const mainPost = {
            id: data[i].id,
            slug: data[i].slug,
            categories_names: data[i].categories_names,
            title: data[i].title.rendered,
            image: data[i].featured_image_url || "/assets/images/blogImg1.png",
            date: new Date(data[i].date).toLocaleDateString('en-GB'),
            author: data[i].author_name || 'Codeandcore',
            duration: data[i].human_time_diff,
            link: data[i].link,
            innerdata: [],
          };

          for (let j = 1; j <= 2; j++) {
            if (i + j < data.length) {
              mainPost.innerdata.push({
                id: data[i + j].id,
                slug: data[i + j].slug,
                categories_names: data[i + j].categories_names,
                title: data[i + j].title.rendered,
                image: data[i + j].featured_image_url || "/assets/images/blogImg1.png",
                date: new Date(data[i + j].date).toLocaleDateString('en-GB'),
                author: data[i + j].author_name || 'Codeandcore',
                duration: data[i + j].human_time_diff,
                link: data[i + j].link,
              });
            }
          }
          transformedData.push(mainPost);
        }
        setBlogsData((prevBlogs) => [...prevBlogs, ...transformedData]);
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

  useEffect(() => {
    const handleScroll = () => {
      if (blogsListRef.current) {
        const servicesListBottom =
          blogsListRef.current.getBoundingClientRect().bottom + 100;
        const windowBottom = window.innerHeight;
        if (
          servicesListBottom <= windowBottom &&
          !loadingRef.current &&
          currentPage < totalPages
        ) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchBlogs(currentCategory, currentPage);
  }, [currentPage, currentCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
    setBlogsData([]); // Clear previous blogs
    fetchBlogs(category, 1);
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
          {blogData.map((blog, index) => {
            return (
              <div key={blog.id} className="blog_row">
                <div className="blog_list">
                  <Link
                    href={`/blog/${blog.slug}`}
                    // onMouseEnter={() => handleMouseEnter(blog.slug)}
                    className="blog_img"
                  >
                    <img src={blog.image} alt={blog.title} />
                  </Link>
                  <div className="blog-content">
                    <div className="blog_info d_flex">
                      <div className="col-left d_flex">
                        <a href={blog.link} className="btnmix">
                          <em
                            dangerouslySetInnerHTML={{
                              __html: blog.categories_names,
                            }}
                          ></em>
                        </a>
                        <span className="date">
                          <img src={"/assets/images/dateIcon.svg"} alt="date_icon" /> {blog.date}
                        </span>
                      </div>
                      <div className="col-right">
                        <label className="d_flex">
                          <img src={"../../assets/images/cnc-icon.svg"} alt="time_icon" /> By{' '}
                          <a href="#">{blog.author}</a>
                          <span>{blog.duration}</span>
                        </label>
                      </div>
                    </div>
                    <h3>
                      <Link
                        href={`/blog/${blog.slug}`}
                        // onMouseEnter={() => handleMouseEnter(blog.slug)}
                      >
                        {/* {blog.title} */}
                        {blog.title.replace(/<\/?br\s*\/?>/gi, ' ')}
                      </Link>
                    </h3>
                  </div>
                </div>
                <div className="blog_list">
                  {blog.innerdata.map((innerItem) => (
                    <div key={innerItem.id} className="blog_small">
                      <Link
                        href={`/blog/${innerItem.slug}`}
                        // onMouseEnter={() => handleMouseEnter(innerItem.slug)}
                        className="blog_img"
                      >
                        <img src={innerItem.image} alt={blog.title} />
                      </Link>
                      <div className="blog-content">
                        <div className="blog_info d_flex">
                          <div className="col-left d_flex">
                            <a href={innerItem.link} className="btnmix">
                              <em
                                dangerouslySetInnerHTML={{
                                  __html: innerItem.categories_names,
                                }}
                              ></em>
                            </a>
                            <span className="date">
                              <img src={"/assets/images/dateIcon.svg"} alt="date_icon" />{' '}
                              {innerItem.date}
                            </span>
                          </div>
                        </div>
                        <h3>
                          <Link
                            href={`/blog/${innerItem.slug}`}
                            // onMouseEnter={() => handleMouseEnter(innerItem.slug)}
                          >
                            {innerItem.title}
                          </Link>
                        </h3>
                        <div className="col-right">
                          <label className="d_flex">
                            <img src={"/assets/images/cnc-icon.svg"} alt="time_icon" /> By{' '}
                            <Link
                              href={`/blog/${innerItem.slug}`}
                            >
                              {innerItem.author}
                            </Link>
                            <span>{innerItem.duration}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
