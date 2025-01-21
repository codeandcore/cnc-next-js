'use client'
import React, { useEffect, useState, useRef } from 'react';
import './BlogList.css';
import './BlogPageTitle.css';
import Link from 'next/link';
import moment from 'moment';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import { ReplaceDomain } from '@/ReplaceDomain';

const BlogList = ({
  blog_heading,
  blog_content,
  blog_all_categories_label,
  BASE_URL,
  catData,
}) => {
  const [isLoadingk, setisLoadingk] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [blogData, setBlogsData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [specialBlogElements, setSpecialBlogElements] = useState([]);
  const loadingRef = useRef(false);
  const blogsListRef = useRef(null);
  const [specialIndexOffset, setSpecialIndexOffset] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    fetch('https://wordpress-1074629-4621962.cloudwaysapps.com/wp-json/options/all', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        setSpecialBlogElements(data?.advertise_repeater);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [BASE_URL]);

  useEffect(() => {
    fetchspecialBlogs();
  }, []);

  useEffect(() => {
    fetchBlogs(currentCategory, currentPage);
  }, [currentPage, currentCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
    setBlogsData([]);
    fetchBlogs(category, 1);
  };

  const handlePageChange = (page) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
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
      {/* <div
        className="loader_blog"
        style={{ display: isLoadingk ? 'block' : 'none' }}
      >
        <img
          src={'../../assets/images/rotate-right.png'}
          alt="rotate-right"
        />
      </div> */}
      <div className="blog_section">
        <div className="wrapper">
          {isLoadingk ? (
            <div className="skeleton-grid moving-background">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-item">
                  <Skeleton height={300} width="100%" style={{ marginBottom: 30 }} />
                  {/* <Skeleton height={30} width="60%" style={{ marginTop: 10 }} /> */}
                  {/* <Skeleton height={20} width="80%" /> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="blogItemList">
              {blogData.map((blog, index) => (
                <div key={index} className="blog-item">
                  <Link href={`/blog/${blog.slug}`} className="blog_img">
                    <img src={blog.featured_image_url} alt={blog?.title?.rendered} />
                  </Link>
                  <div className="blog-content">
                    <div className="blog_info d_flex">
                      <div className="col-left d_flex">
                        <a role="button">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: blog.categories_names,
                            }}
                          ></span>
                        </a>
                        <div className="date">
                          <img src="/assets/images/dateIcon.svg" alt="date_icon" />
                          {moment(blog.date).format('D.M.YYYY')}
                        </div>
                      </div>
                    </div>
                    <h3>
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title?.rendered?.replace(/<\/?br\s*\/?>/gi, ' ')}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="pagination-section">
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BlogList;
