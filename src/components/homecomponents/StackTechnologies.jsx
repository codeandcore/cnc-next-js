"use client";
import React, { useState, useEffect , useRef } from "react";
import "./StackTechnologies.css";
import he from "he";
import UseOnScreen from "../UseOnScreen";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const StackTechnologies = ({
  technologies_title,
  technologies_bg_image,
  technologies_content,
  technologies_button_text,
  technologies_button_url,
  technologies_list,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
}) => {
  const location = useRouter();
  const [toggleIsactive, setToggleIsactive] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [resetChildMenu, setResetChildMenu] = useState(false);

  const sectionRef = useRef(null); // Ref for the section
  const [isVisible, setIsVisible] = useState(false);

  // Function to check visibility of the element
  const checkVisibility = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const whyearlyOffset = 350;

    if (rect.top <= windowHeight - whyearlyOffset && rect.bottom >= -whyearlyOffset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);
  useEffect(() => {
    if (isVisible) {
      const colinElements = document.querySelectorAll('.stack_technologies .colin');
      colinElements.forEach((colin, index) => {
        setTimeout(() => {
          colin.classList.add('active');
        }, index * 80);
      });
      const colinElements_bg = document.querySelector('.stack_technologies');
      if (colinElements_bg) {
        setTimeout(() => {
          colinElements_bg.classList.add('active_bg');
        }, 150);
      }
    }
  }, [isVisible]);

  const closeMenu = () => {
    setMenuOpen(false);
    setToggleIsactive(false);
    setOpenSubmenu(false);
    setResetChildMenu(true);
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Adjust the value as needed
      behavior: "auto",
    });
  };

  return (
    <div ref={sectionRef} className="stack_technologies">
      <div
        className="bg"
        style={
          technologies_bg_image
            ? { backgroundImage: `url(${technologies_bg_image.url})` }
            : {}
        }
      ></div>

      <div className="wrapper d_flex">
        <div className="left_col">
          {technologies_title && <h2>{technologies_title}</h2>}
          {technologies_content && (
            <p dangerouslySetInnerHTML={{ __html: technologies_content }}></p>
          )}

          {technologies_button_text && (
            <Link
              href={technologies_button_url.post_name}
              className="btn"
              onClick={(e) => {
                closeMenu();
                handleSmoothScroll();
              }}
            >
              <span></span>
              <em>{technologies_button_text}</em>
            </Link>
          )}
        </div>

        {technologies_list && technologies_list.length > 0 && (
          <div className="right_col d_flex d_flex_at">
            <div className="coll">
              {technologies_list.slice(0, 2).map((tech, index) => (
                <div className="colin" key={index}>
                  <h3>{tech.title}</h3>
                  <div className="all_link d_flex">
                    {tech.list_items.map((item, itemIndex) => (
                      <Link
                        href={`/technologies/${item.link.post_name}`}
                        key={itemIndex}
                        onClick={(e) => {
                          closeMenu();
                        }}
                      >
                        <Image
                          src={item.icon.url}
                          alt={item.label}
                          width={50}
                          height={50}
                        />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="colr">
              {technologies_list.slice(2).map((tech, index_i) => (
                <div className="colin" key={index_i}>
                  <h3>{tech.title}</h3>
                  <div className="all_link d_flex">
                    {tech.list_items.map((item, itemIndex_i) => (
                      <Link
                        href={`/technologies/${item.link.post_name}`}
                        key={itemIndex_i}
                        onClick={(e) => {
                          closeMenu();
                        }}
                      >
                        <Image
                          src={item.icon.url}
                          alt={item.label}
                          width={50}
                          height={50}
                        />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackTechnologies;
