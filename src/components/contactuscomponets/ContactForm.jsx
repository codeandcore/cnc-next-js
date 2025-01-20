"use client";
import React, { useState, useEffect } from "react";
import "./ContactForm.css";

import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BASE_URL from "@/config";
const MapContainer = dynamic(() => import("./MapContainer"), { ssr: false });

const ContactForm = ({
  // BASE_URL,
  contact_form_location_label,
  contact_form_location_address,
  contact_form_email_label,
  contact_form_email_address,
  contact_form_social_label,
  contact_form_facebook_link,
  contact_form_twitter_link,
  contact_form_linkedin_link,
  contact_form_instagram_link,
  google_map_latitude,
  google_map_longitude,
  contact_form_title,
  contact_form_service_label,
  contact_form_service_list,
  contact_form_budget_label,
  contact_form_budget_list,
  contact_social_links,
}) => {
  const latitude = google_map_latitude; // Example latitude
  const longitude = google_map_longitude; // Example longitude
  const [captcha, setCaptcha] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    website: "",
    projectDescription: "",
    service: [],
    budget: "",
    code: "",
  });

  const [errors, setErrors] = useState({});
  const [userIp, setUserIp] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const location = useRouter();

  const generateCaptcha = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
    // getUserIp();
  }, []);

  const handleRegenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
  };
  const getUserIp = () => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        if (response && response.data && response.data.ip) {
          setUserIp(response.data.ip);
          axios
            .get(`https://ipapi.co/${response.data.ip}/json/`)
            .then((res) => {
              setUserCountry(res.data.country_name);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedServices = checked
        ? [...formData.service, value]
        : formData.service.filter((service) => service !== value);
      setFormData({
        ...formData,
        service: updatedServices,
      });
    } else if (type === "radio") {
      setFormData({
        ...formData,
        budget: value,
      });
    } else if (name === "projectDescription") {
      // handle projectDescription separately
      setFormData({
        ...formData,
        projectDescription: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    const queryParams1 = new URLSearchParams(location.search);
    formData.ip = userIp;
    formData.country = userCountry;
    formData.source = queryParams1.get("source");
    formData.from_page = location.pathname;
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmit(true);
      try {
        const response = await fetch(
          `${BASE_URL}/wp-json/custom/v1/contact-form`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          setIsSubmit(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIsSubmit(false);
        window.location.href = "/thankyou";
      } catch (error) {
        setIsSubmit(false);
        console.error("Error submitting form:", error);
      }
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    }
    // if (!data.phone.trim()) {
    //     errors.phone = 'Phone is required';
    // }
    if (!data.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{9,10}$/.test(data.phone)) {
      errors.phone = "Phone number should be 9 to 10 digits";
    }
    if (!data.company.trim()) {
      errors.company = "Company is required";
    }
    if (!data.industry.trim()) {
      errors.industry = "Industry is required";
    }
    if (!data.website.trim()) {
      errors.website = "Website is required";
    }

    // if (data.service.length === 0) {
    //     errors.checkbox = 'At least one service must be selected';
    // }
    if (!data.budget) {
      errors.budget = "Please select a budget option";
    }
    if (!data.code.trim()) {
      errors.code = "Captcha code is required";
    } else if (data.code !== captcha) {
      errors.code = "Captcha code is incorrect";
    }
    return errors;
  };

  return (
    <div className="contact_form">
      <div className="wrapper d_flex">
        <div className="left_col">
          <div className="col">
            {contact_form_location_label && (
              <h3>{contact_form_location_label}</h3>
            )}
            {contact_form_location_address && (
              <p>{contact_form_location_address}</p>
            )}
          </div>
          <div className="col">
            {contact_form_email_label && <h3>{contact_form_email_label}</h3>}
            {contact_form_email_address && (
              <Link href={`mailto:${contact_form_email_address}`}>
                {contact_form_email_address}
              </Link>
            )}
          </div>
          <div className="col">
            {contact_form_social_label && <h3>{contact_form_social_label}</h3>}
            {/* <div className='social d_flex d_flex_js'>
                            {contact_form_twitter_link && ( <a href={contact_form_facebook_link} target="_blank" rel="noreferrer"><img src={XIcon} alt="X Icon" /></a>)}
                            {contact_form_linkedin_link && (<a href={contact_form_twitter_link} target="_blank" rel="noreferrer"><img src={LinkdinIcon} alt="LinkedIn Icon" /></a>)}
                            {contact_form_facebook_link && (<a href={contact_form_facebook_link} target="_blank" rel="noreferrer"><img src={FbIcon} alt="Facebook Icon" /></a>)}
                            {contact_form_instagram_link && (<a href={contact_form_instagram_link} target="_blank" rel="noreferrer"><img src={InstaIcon} alt="Instagram Icon" /></a>)}
                        </div> */}
            {contact_social_links && (
              <div className="social d_flex d_flex_js">
                {contact_social_links.map((social, index) => (
                  <a
                    href={social.contact_social_url}
                    key={index}
                    target="_blank"
                  >
                    <img
                      src={social.contact_social_icon.url}
                      alt={social.contact_social_icon.name}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
          {latitude && longitude && (
            <div className="googlemap">
              <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.2151856884298!2d72.56236427498078!3d23.0892173138386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83c9798b2561%3A0xea359d55ac73c5fd!2sCode%20and%20core%20Tech%20LLP!5e0!3m2!1sen!2sin!4v1737405960700!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
        <div className="right_col">
          <form onSubmit={handleSubmit}>
            {contact_form_title && <h2>{contact_form_title}</h2>}
            {contact_form_service_label && (
              <h3>{contact_form_service_label}</h3>
            )}
            {contact_form_service_list && (
              <div className="col d_flex d_flex_js">
                {contact_form_service_list.map((service, index) => (
                  <label htmlFor={`checkbox${index}`} key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox${index}`}
                      name="service"
                      checked={formData.service.includes(service.label)}
                      onChange={handleChange}
                      value={service.label}
                    />
                    {service.label}
                  </label>
                ))}
                {errors.checkbox && (
                  <span className="error-msg">{errors.checkbox}</span>
                )}
              </div>
            )}
            {contact_form_budget_label && <h3>{contact_form_budget_label}</h3>}
            {contact_form_budget_list && (
              <div className="col d_flex d_flex_js">
                {contact_form_budget_list.map((service, index) => {
                  const checkboxId = `radio${index + 1}`;
                  return (
                    <label htmlFor={checkboxId} key={index}>
                      <input
                        type="radio"
                        id={checkboxId}
                        name="budget"
                        checked={formData.budget[checkboxId]}
                        onChange={handleChange}
                        value={service.label}
                      />
                      {service.label}
                    </label>
                  );
                })}
                {errors.budget && (
                  <span className="error-msg">{errors.budget}</span>
                )}
              </div>
            )}
            <div className="wrap d_flex">
              <div className="colin d_flex">
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`in ${errors.name ? "error" : ""}`}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`in ${errors.email ? "error" : ""}`}
                />
              </div>
              <div className="colin d_flex">
                <input
                  type="text"
                  id="phone"
                  placeholder="Your phone or skype"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`in ${errors.phone ? "error" : ""}`}
                  pattern="[0-9]{9,10}"
                />
                <input
                  type="text"
                  placeholder="Your company name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`in ${errors.company ? "error" : ""}`}
                />
              </div>
              <div className="colin d_flex">
                <input
                  type="text"
                  placeholder="Your industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`in ${errors.industry ? "error" : ""}`}
                />
                <input
                  type="text"
                  placeholder="Your website url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`in ${errors.website ? "error" : ""}`}
                />
              </div>
              <textarea
                placeholder="Tell us about the project "
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="in"
              ></textarea>
              <div className="captcha-container">
                <input
                  type="text"
                  id="code"
                  placeholder="Input this code"
                  name="code"
                  className={`in ${errors.code ? "error" : ""}`}
                  value={formData.code}
                  onChange={handleChange}
                />
                <div className="captcha">{captcha}</div>
                <button
                  type="button"
                  className="regenerate-btn"
                  onClick={handleRegenerateCaptcha}
                >
                  <img
                    src={"../../assets/images/rotate-right.png"}
                    alt="rotate-right"
                  />
                </button>
              </div>
              <div className="submit_col">
                <button type="submit" className="btn sub" disabled={isSubmit}>
                  {isSubmit ? (
                    <span
                      className="loaderdata"
                      style={{ display: isSubmit ? "inline-flex" : "none" }}
                    >
                      <img
                        src={"../../assets/images/sync.png"}
                        alt="rotate-right"
                      />
                    </span>
                  ) : (
                    <em>Submit</em>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
