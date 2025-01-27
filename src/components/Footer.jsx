'use client';
import React, { useEffect, useState } from 'react';
import ChatBoard from './ChatBoard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import FsLightbox from 'fslightbox-react';

const Footer = ({ ApiData }) => {
  const [showBackTop, setShowBackTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  };

  const quickLinksChunks = chunkArray(ApiData.quick_links || [], 4);
  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: 'auto',
    });
  };

  /* back to top  */
  // Function to handle scroll events
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowBackTop(true);
    } else {
      setShowBackTop(false);
    }
  };

  // Scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChatBoard = () => {
    setIsChatOpen(!isChatOpen);
  };

  return ApiData ? (
    <>
      <div className="sticky-btn">
        <span
          className={`back-top ${showBackTop ? 'show' : ''}`}
          onClick={scrollToTop}
        >
          <img src={'/assets/images/backtop.svg'} />
        </span>
        <span
          className={`chatbord ${showBackTop ? 'show' : ''}`}
          onClick={toggleChatBoard}
        >
          <img src={'/assets/images/chat-icon.svg'} />
        </span>
      </div>

      {(ApiData.chatbot_logo ||
        ApiData.chatbot_title ||
        ApiData.chatbot_subtitle ||
        ApiData.chat_name ||
        ApiData.chat_email ||
        ApiData.start_chat_button ||
        ApiData.chat_title ||
        ApiData.whatsapp_link ||
        ApiData.whatsapp_title ||
        ApiData.schedule_title ||
        ApiData.thank_you_message ||
        ApiData.chat_icon ||
        ApiData.whatsapp_icon ||
        ApiData.schedule_icon) && (
        <ChatBoard
          isChatOpen={isChatOpen}
          toggleChatBoard={toggleChatBoard}
          chatbot_logo={ApiData.chatbot_logo}
          chatbot_title={ApiData.chatbot_title}
          chatbot_subtitle={ApiData.chatbot_subtitle}
          chat_name={ApiData.chat_name}
          chat_email={ApiData.chat_email}
          start_chat_button={ApiData.start_chat_button}
          chat_title={ApiData.chat_title}
          whatsapp_link={ApiData.whatsapp_link}
          whatsapp_title={ApiData.whatsapp_title}
          schedule_title={ApiData.schedule_title}
          thank_you_message={ApiData.thank_you_message}
          chat_icon={ApiData.chat_icon}
          whatsapp_icon={ApiData.whatsapp_icon}
          schedule_icon={ApiData.schedule_icon}
        />
      )}

<footer>
  <div className="wrapper">
    <Link href="/" className={`footer_logo ${router?.pathname === '/' ? 'current' : ''}`}>
      <img src={'/assets/images/cnc-logo-black.svg'} alt="logo" />
    </Link>

    <div className="footer_top d_flex">
      {(ApiData.footer_location ||
        ApiData.footer_location_title ||
        ApiData.footer_location_map) && (
        <div className="col">
          {ApiData.footer_location_title && <h3>{ApiData.footer_location_title}</h3>}
          {ApiData.footer_location && <p>{ApiData.footer_location}</p>}
          {ApiData.footer_location_map && (
            <Link
              href={ApiData.footer_location_map.url}
              target={ApiData.footer_location_map.target}
              className="our_location_link"
            >
              {ApiData.footer_location_map.title}
            </Link>
          )}
        </div>
      )}

      {(ApiData.stay_connected_title || ApiData.social_share_list) && (
        <div className="col middle-col">
          {ApiData.stay_connected_title && <h3>{ApiData.stay_connected_title}</h3>}
          <div className="social d_flex">
            {ApiData.social_share_list.map((social, index) => (
              <a href={social.social_url} key={index} target="_blank">
                <img
                  src={social.social_icon.url}
                  alt={social.social_icon.name}
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {(ApiData.quick_links_title || ApiData.quick_links) && (
        <div className="col">
          {ApiData.quick_links_title && <h3>{ApiData.quick_links_title}</h3>}
          <div className="wrap d_flex">
            {quickLinksChunks.map((chunk, index) => (
              <ul key={index}>
                {chunk.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.menu_link}
                      onClick={(e) => {
                        // handleSmoothScroll();
                        // handleLinkClick(link.menu_link, e);
                      }}
                      className={`${router.pathname === link.menu_link ? 'current' : ''}`}
                    >
                      {link.menu_label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>

    {(ApiData.certified_by_title ||
      ApiData.certified_by_list ||
      ApiData.reviews_list ||
      ApiData.reviews_title ||
      ApiData.partnerships_list ||
      ApiData.partnerships_title) && (
      <div className="footer_mid d_flex">
        {(ApiData.certified_by_title || ApiData.certified_by_list) && (
          <div className="col">
            {ApiData.certified_by_title && <h3>{ApiData.certified_by_title}</h3>}
            {ApiData.certified_by_list && (
              <div className="logos d_flex">
                      {ApiData.certified_by_list.map((menuItem, index) => {
                        return (
                          <a role='button' key={index} target="_blank" onClick={(e)=>{e?.preventDefault(),setIsPDFOpen(!isPDFOpen)}} style={{cursor: `${menuItem.url ? "pointer" : ""}`}} >
                          <img
                            src={menuItem.logo.url}
                            alt={menuItem.logo.name}
                          />
                        </a>
                        )
                      })}
              </div>
            )}
          </div>
        )}
        {(ApiData.reviews_title || ApiData.reviews_list) && (
          <div className="col">
            {ApiData.reviews_title && <h3>{ApiData.reviews_title}</h3>}
            {ApiData.reviews_list && (
              <div className="logos d_flex">
                {ApiData.reviews_list.map((menuItem, index) => (
                  <a href={menuItem.url} key={index} target="_blank">
                    <img
                      src={menuItem.logo.url}
                      alt={menuItem.logo.name}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {(ApiData.contact_sales_title || ApiData.contact_sales_list) && (
          <div className="col">
            {ApiData.contact_sales_title && <h3>{ApiData.contact_sales_title}</h3>}
            {ApiData.contact_sales_list && (
              <ul className="saless_list d_flex">
                {ApiData.contact_sales_list.map((menuItem, index) => (
                  <li key={index}>
                    <Link href={menuItem.link} target="_blank">
                      <span>
                        <img
                          src={menuItem.logo.url}
                          alt={menuItem.logo.name}
                        />
                      </span>
                      {menuItem.text}
                      <span className="flag-icon">
                        <img
                          src={menuItem.flag_logo.url}
                          alt={menuItem.flag_logo.name}
                          width="30"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )}

    {(ApiData.copyright_text || ApiData.copyright_menu) && (
      <div className="footer_bottom d_flex">
        <p>
          ©{currentYear} {ApiData.copyright_text}
        </p>
        {ApiData.copyright_menu && (
          <ul className="d_flex">
            {ApiData.copyright_menu.map((menuItem, index) => (
              <li key={index}>
                <Link
                  href={menuItem.url}
                  // onClick={(e) => {
                  //   handleSmoothScroll();
                  // }}
                  className={`${router.pathname === menuItem.url ? 'current' : ''}`}
                >
                  {menuItem.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
        </div>
                    <FsLightbox
                      toggler={isPDFOpen}
                      sources={["/assets/images/ISO-Certificate.jpg"]}
                      types={["image"]}
                    />
</footer>
    </>
  ) : null;
};
export default Footer;
