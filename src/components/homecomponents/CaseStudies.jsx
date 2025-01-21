"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import "./CaseStudies.css";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import UseOnScreen from "../UseOnScreen";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BASE_URL from "@/config";
const CaseStudies = ({
  case_studies_title,
  case_studies_subtitle,
  case_studies_list,
}) => {
  var $ = require("jquery");
  if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
  }
  // This is for Next.js. On Rect JS remove this line
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });
  const [portfoliodata, setPortfoliodata] = useState(null);
  const owlCarouselRef = useRef(null);
  const [hoveredSlide, setHoveredSlide] = useState(null);

  // Fetch case studies when the component mounts
  useEffect(() => {
    fetch(`${BASE_URL}/wp-json/custom/v1/case-study-list?page=1&per_page=2`)
      .then((response) => response.json())
      .then((data) => setPortfoliodata(data))
      .catch((error) =>
        console.error("Error fetching data from WordPress API:", error)
      );
  }, [BASE_URL]);
  const options = useMemo(
    () => ({
      items: 1,
      loop: false,
      nav: true,
      dots: false,
      autoWidth: true,
      responsive: {
        0: {
          autoWidth: false,
          margin: 20,
        },
        768: {
          autoWidth: true,
          margin: 0,
        },
      },
    }),
    []
  );

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // 'top' should be a number, not a string
      behavior: "smooth", // Comma was missing here
    });
  };

  const caseStudyData =
    case_studies_list && case_studies_list?.length !== 0
      ? case_studies_list
      : portfoliodata?.data;
  return (
    <div className="case_studies">
      <div className="wrapper">
        {case_studies_title ? (
          <h2>{case_studies_title}</h2>
        ) : (
          <h2>Explore what we have done.</h2>
        )}
        {case_studies_subtitle ? (
          <p>{case_studies_subtitle}</p>
        ) : (
          <p>
            See why over 200+ clients happily return to us to provide dedicated
            teams to drive their innovations!
          </p>
        )}
      </div>

      <div className="inner">
        {caseStudyData && (
          <OwlCarousel {...options} ref={owlCarouselRef} className="owl-theme">
            {caseStudyData.map((item, index) => (
              <div
                key={index}
                className={`colin ${hoveredSlide === item.slug ? "hovered" : ""}`}
              >
                <div className="top_col d_flex">
                  <h3>{item.case_study_post_title}</h3>
                  <div className="case d_flex">
                    <span>
                      <img
                        src={item.acf.tag_logo.url}
                        alt={item.case_study_post_title}
                      />
                    </span>
                    <ul className="d_flex">
                      {item.case_study_tags.map((caseItem, index_tag) => (
                        <li key={index_tag}>{caseItem.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="img">
                  {item.featured_image_url && (
                    <Link
                      href={`/portfolio/${item.slug}`}
                      onClick={(e) => {
                        handleSmoothScroll();
                      }}
                      className="bg"
                    >
                      <img
                        src={item.featured_image_url}
                        alt={item.case_study_post_title}
                      />
                    </Link>
                  )}
                </div>

                <div className="bottom_col d_flex">
                  <div className="lcol test">
                    {item.acf &&
                      item.acf.c_right_side_logo &&
                      item.acf.c_right_side_logo.url && (
                        <div className="lcol_logo">
                          <img
                            src={item.acf.c_right_side_logo.url}
                            alt={item.acf.c_right_side_logo.name}
                          />
                        </div>
                      )}
                    <ul className="d_flex">
                      {item.acf.case_total_visitors && (
                        <li>
                          <h4>{item.acf.case_total_visitors}</h4>
                          <h5>Visitors a day</h5>
                        </li>
                      )}
                      {item.acf.case_total_orders && (
                        <li>
                          <h4>{item.acf.case_total_orders}</h4>
                          <h5>Order a day website</h5>
                        </li>
                      )}
                      {item.acf.AwwardsIcongoogle_page_speed && (
                        <li>
                          <h4>{item.acf.google_page_speed}</h4>
                          <h5>
                            <img src={GoogleIcon} alt="Lighthouse speed" />
                            Lighthouse speed
                          </h5>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="awward_right_col">
                    {item.acf.cases_location && (
                      <div className="rcol d_flex">
                        <img
                          src={"/assets/images/location.svg"}
                          alt="Location Icon"
                        />
                        {item.acf.cases_location}
                      </div>
                    )}

                    {item.acf &&
                      item.acf.award_small_logo &&
                      item.acf.award_small_logo.url &&
                      item.acf.award_link &&
                      item.acf.award_text && (
                        <a href={item.acf.award_link} className="awward">
                          <span>{item.acf.award_text}</span>
                          <img
                            src={item.acf.award_small_logo.url}
                            alt={item.acf.award_small_logo.name}
                            className="awwadicon"
                          />
                        </a>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
