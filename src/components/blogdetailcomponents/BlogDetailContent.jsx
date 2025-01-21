'use client'
import React, { useState, useRef, useEffect } from 'react';
import './BlogDetailContent.css';
import Link from 'next/link';

const BlogDetailContent = ({
  blogData,
}) => {

  const [fullUrl, setFullUrl] = useState("");
  const [htmlRendered, setHtmlRendered] = useState(blogData?.content?.rendered)
  const contentRef = useRef(null);
  const [tocItems, setTocItems] = useState([]);
  const [activeTocItem, setActiveTocItem] = useState(null);
  useEffect(() => {
    const currentUrl = `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
    setFullUrl(currentUrl);
  }, []);
  const extractHeadings = () => {
    const content = contentRef.current;
    const headings = content.querySelectorAll('h2'); 
    console.log('headings', headings);
    
    const toc = Array.from(headings)
      .filter((heading) => heading.innerText.trim() !== '')
      .map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.innerText.trim(),
        level: heading.tagName,
      }));

    setTocItems(toc);

    // Add id to headings for linking
    headings.forEach((heading, index) => {
      if (heading.innerText.trim() !== '') {
        heading.setAttribute('id', `heading-${index}`);
      }
    });
  };

  const addIdInHeading = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const headings = doc.querySelectorAll("h2");
    headings.forEach((heading, index) => {
      heading.setAttribute("id", `heading-${index}`);
    });
    return doc.body.innerHTML;
  }

  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        extractHeadings();
        setHtmlRendered(addIdInHeading(blogData?.content?.rendered))
      }, 200);
    }
  }, [blogData]);

  const handleSmoothScroll = (id, index) => {
    setActiveTocItem(index);

    const element = document.getElementById(id);
    
    if (element) {      
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const indate = new Date(blogData.date).toLocaleDateString('en-GB');
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`;
  const instagramShareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(fullUrl)}`;

  return (
    <div className="blog_detail_section">
      <div className="wrapper">
        <Link
          href="/blog"
          className="btn btnarrow"
        >
          <div>
            <img src={"/assets/images/ellipse_arr.png"} alt="back_icon" />
          </div>
          <em>Back to blog page</em>
        </Link>
        <h1 dangerouslySetInnerHTML={{ __html: blogData.title.rendered }}></h1>
        <div className="blog_info d_flex">
          <a href="#" className="btnmix">
            <em
              dangerouslySetInnerHTML={{ __html: blogData.categories_names }}
            ></em>
          </a>
          <span className="date">
            <img src={"/assets/images/dateIcon.svg"} alt="date_icon" /> {indate}
          </span>
        </div>
        <div className="inner d_flex">
          {tocItems.length > 0 ? (
            <div className="left_col">
              <h3>Table of Contents</h3>
              <ul>
                {tocItems.map((item, index) => (
                  <li
                    key={index}
                    className={`toc-item toc-${item.level.toLowerCase()} ${activeTocItem === index ? 'active' : ''}`}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSmoothScroll(item.id, index);
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className={`right_col ${tocItems?.length=== 0 ? "full_width" : "" }`}>
            <div className={`blogImg ${tocItems?.length=== 0 ? "full_width" : "" }`}>
              <img
                src={blogData.featured_image_url}
                alt={blogData.title.rendered}
              />
            </div>
            <div className="social_info d_flex">
              <div className="col-left">
                <label className="d_flex">
                  <img
                    src="https://cnc-website-new.vercel.app/static/media/cnc-icon.09e954fca17c18c6bad08092915f4437.svg"
                    alt="date_icon"
                  />
                  By <a href="#">{blogData.author_name}</a>
                  <span>{blogData.human_time_diff}</span>
                </label>
              </div>
              <ul className="share-icons d_flex">
                <li>
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={"/assets/images/fs1.svg"} alt="twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href={linkedInShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={"/assets/images/fs2.svg"} alt="linkedin" />
                  </a>
                </li>
                <li>
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={"/assets/images/fs3.svg"} alt="facebook" />
                  </a>
                </li>
                <li>
                  <a
                    href={instagramShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={"/assets/images/fs4.svg"} alt="instagram" />
                  </a>
                </li>
              </ul>
            </div>
            {<div
              className="blog_detail_content"
              id='blog_content'
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: htmlRendered }}
            ></div>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetailContent;
