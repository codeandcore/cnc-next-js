'use client';
import React, { useEffect, useState, useRef } from 'react';
import './BlogList.css';
import './BlogPageTitle.css';
import Link from 'next/link';
import moment from 'moment';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ReplaceDomain } from '@/ReplaceDomain';
import { useInView } from 'react-intersection-observer';

const BlogList = ({
  blog_heading,
  blog_content,
  blog_all_categories_label,
  BASE_URL,
  catData,
}) => {
  const [isLoadingk, setisLoadingk] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // For infinite loading
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

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchBlogs = async (category = null, page = 1, isLoadMore = false) => {
    if (loadingRef.current) return;
    if (isLoadMore) {
      setIsLoadingMore(true);
    }
    if (page === 1) {
      setisLoadingk(true);
    }

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

      if (page !== 1) {
        setBlogsData((prevData) => [...prevData, ...data]); // Append new data
      } else {
        setBlogsData(data);
      }
    } catch (error) {
      console.error('Error fetching data from WordPress API:', error);
    } finally {
      if (!isLoadMore) {
        setisLoadingk(false);
      } else {
        setIsLoadingMore(false);
      }
      loadingRef.current = false;
    }
  };

  const fetchspecialBlogs = () => {
    fetch(`${process.env.NEXT_PUBLIC_WP_URL}wp-json/options/all`, { cache: 'no-store' })
      .then((respons) => respons.json())
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

  useEffect(() => {
    if (inView && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1); // Trigger loading next page
    }
  }, [inView]);

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
      <div className="blog_section">
        <div className="wrapper">
          {isLoadingk ? (
            <div className="skeleton-grid moving-background" style={{ paddingTop: 50 }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-item">
                  <Skeleton height={300} width="100%" style={{ marginBottom: 30 }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="blogItemList">
              {specialBlogElements?.length!==0 && blogData.map((blog, index) => {
                if ((index + 1) % 6 === 0) {
                  const specialIndex = (specialIndexOffset + Math.floor(index / 6)) % specialBlogElements.length;
                  const specialContent = specialBlogElements[specialIndex];
                  return (
                   specialContent?.background_image?.url && <div
                      key={index}
                      className="blog-item special-layout"
                      style={{ backgroundImage: `url(${specialContent?.background_image?.url})` }}
                    >
                      <div className="special-content">
                       {specialContent?.title && <h3
                          className="special-blog-title"
                          style={{ color: specialContent?.button_type === 'Primary' ? '#ffff' : '#424242' }}
                        >
                          {specialContent?.title}
                        </h3>}
                       {specialContent?.subtitle && <p
                          className="content"
                          style={{ color: specialContent?.button_type === 'Primary' ? '#ffff' : '#424242' }}
                        >
                          {specialContent?.subtitle}
                        </p>}
                        {specialContent?.button?.title && <Link
                          href={specialContent?.button?.url || ''}
                          style={{ color: specialContent?.button_type === 'Primary' ? '#ffff' : '#424242' }}
                          className={`btn ${specialContent?.button_type === 'Primary' ? '' : 'btn-secondary'}`}
                        >
                          <em>{specialContent?.button?.title}</em>
                        </Link>}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className={`blog-item`}>
                      <Link href={`/blog/${blog.slug}`} className="blog_img">
                        <img src={blog.featured_image_url} alt={blog?.title?.rendered} />
                      </Link>
                      <div className="blog-content">
                        <div className="blog_info d_flex">
                          <div className="col-left d_flex">
                            <a href={`/blog/${blog.slug}`}>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: blog.categories_names,
                                }}
                              ></span>
                            </a>
                            <div className="date">
                              <img src={'/assets/images/dateIcon.svg'} alt="date_icon" />
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
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className="pagination-section" style={{textAlign:'center'}}>
        {totalPages > currentPage && (
          <div className="infinite-loader">
            <span className="load-more-spinner"></span>
          </div>
        )}
        {!isLoadingMore && currentPage < totalPages && <div ref={ref}></div>}
      </div>
    </div>
  );
};

export default BlogList;
