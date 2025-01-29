'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import syncIcon from "../../../public/assets/images/sync.png"
import rightRotate from "../../../public/assets/images/rotate-right.png"
import BASE_URL from '@/config';

const HirePopup = ({
  isVisible,
  onClose,
  title,
  content,
  contact_form_service_label,
  contact_form_service_list,
  contact_form_budget_label,
  contact_form_budget_list,
  className,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    website: '',
    title: title,
    projectDescription: '',
    service: [],
    budget: '',
    code: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showChooseYour, setShowChooseYour] = useState(false);
  const [showProjectBudget, setShowProjectBudget] = useState(false);
  const location = useRouter();
  const [userIp, setUserIp] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    };
    // Add event listener for the ESC key
    window.addEventListener('keydown', handleEscKey);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'phone':
        const phoneRegex = /^\d{9,10}$/;
        return phoneRegex.test(value);
      // case 'website':
      //   const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      //   return urlRegex.test(value);
      case 'projectDescription':
        return value.trim().length >= 3;
      default:
        return value.trim().length > 0;
    }
  };

  const getErrorMessage = (name, value) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'phone':
        if (!value.trim()) return 'Phone is required';
        return !/^\d{9,10}$/.test(value) ? 'Phone number should be 9-10 digits' : '';
      // case 'website':
      //   if (!value.trim()) return 'Website is required';
      //   return !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value) ? 'Invalid website URL' : '';
      case 'projectDescription':
        return value.length <= 3 ? 'Project description is required' : '';
      case 'service':
        return value.length === 0 ? 'At least one service must be selected' : '';
      case 'budget':
        return !value ? 'Please select a budget option' : '';
      case 'code':
        if (!value.trim()) return 'Captcha code is required';
        return value !== captcha ? 'Incorrect captcha code' : '';
      default:
        return '';
    }
  };

  const checkAllFieldsFilled = (data) => {
    const requiredFields = ['name', 'email', 'phone', 'projectDescription'];
    const allFieldsValid = requiredFields.every(field => {
      const value = data[field].trim();
      return value !== '' && validateField(field, value);
    });
    setShowChooseYour(allFieldsValid);
    return allFieldsValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone" && value.length > 10) {
      return; 
    }

    let updatedFormData;
    if (type === 'checkbox') {
      const updatedServices = checked
        ? [...formData.service, value]
        : formData.service.filter((service) => service !== value);
      updatedFormData = {
        ...formData,
        service: updatedServices,
      };
    } else if (type === 'radio') {
      updatedFormData = {
        ...formData,
        budget: value,
      };
    } else {
      updatedFormData = {
        ...formData,
        [name]: value,
      };
    }

    setFormData(updatedFormData);
    
    // Validate field on change and show error message
    const errorMessage = getErrorMessage(name, type === 'checkbox' ? updatedFormData.service : value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));

    // Check if all fields are valid
    checkAllFieldsFilled(updatedFormData);
  };

  const handleRegenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const generateCaptcha = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const getUserIp = () => {
    axios
      .get('https://api.ipify.org?format=json')
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

  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach(field => {
      const value = field === 'service' ? data[field] : data[field]?.toString();
      const errorMessage = getErrorMessage(field, value);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    const queryParams1 = new URLSearchParams(location.search);
    formData.ip = userIp;
    formData.country = userCountry;
    formData.source = queryParams1.get('source');
    formData.from_page = location.pathname;

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/wp-json/custom/v1/contact-form`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );
        if (!response.ok) {
          setLoading(false);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLoading(false);
        window.location.href = '/thankyou';
      } catch (error) {
        setLoading(false);
        console.error('Error submitting form:', error);
      }
    } else {
      handleSmoothScroll();
    }
  };

  const handleSmoothScroll = () => {
    const section = document.querySelector('.hire_popup .contents');
    if (section) {
      section.scrollIntoView({
        top: 0,
        behavior: 'auto',
      });
    }
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
    // getUserIp();
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: title,
    }));
  }, [title]);

  const clearFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      website: '',
      title: title,
      projectDescription: '',
      service: [],
      budget: '',
      code: '',
    });
    setShowChooseYour(false);
    setErrors({});
  };

  return (
    <section className={`hire_popup ${className} ${isVisible ? 'open' : ''} `}>
      <div className="bg" onClick={() => {clearFormData(),onClose()}}></div>
      <div className="inner">
        <div className="close" onClick={() => {clearFormData(),onClose()}}>
          x
        </div>
        <form onSubmit={handleSubmit}>
          <div className="top_ban">
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
          </div>
          <div style={{height : showChooseYour === true ? '50vh':'35vh'}} className="contents">
            <div className="middle_ban">
              <div className="colin d_flex">
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    placeholder="Name & Company*"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`in ${errors.name ? 'error' : ''}`}
                  />
                  {/* {errors.name && <span style={{color: 'red',fontSize:'12px',lineHeight:'0px'}}>{errors.name}</span>} */}
                </div>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`in ${errors.email ? 'error' : ''}`}
                  />
                  {/* {errors.email && <span style={{color: 'red',fontSize:'12px',lineHeight:'0px'}}>{errors.email}</span>} */}
                </div>
              </div>
              <div className="colin d_flex">
                <div className="input-wrapper">
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number*"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className={`in ${errors.phone ? 'error' : ''}`}
                  />
                  {/* {errors.phone && <span  style={{color: 'red',fontSize:'12px',lineHeight:'0px'}}>{errors.phone}</span>} */}
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Please add your website here"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={`in ${errors.website ? 'error' : ''}`}
                  />
                  {/* {errors.website && <span  style={{color: 'red',fontSize:'12px',lineHeight:'0px'}}>{errors.website}</span>} */}
                </div>
              </div>
              <div >
                <textarea
                  placeholder="Tell us more about your project :*"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className={`in ${errors.projectDescription ? 'error' : ''}`}
                ></textarea>
                {/* {errors.projectDescription && (
                  <span  style={{color: 'red',fontSize:'12px',lineHeight:'0px'}}>{errors.projectDescription}</span>
                )} */}
              </div>
               {!showChooseYour && (Object.values(errors).some(value => value !== "")) && (
                <div className="error-form">
                  <p>*Some required fields are missing or contain errors. Please complete all fields.</p>
                </div>
              )}
            </div>
            {contact_form_service_list && showChooseYour && (
              <div className="choose_your">
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
                    {errors.service && (
                      <span className="error-msg" >{errors.service}</span>
                    )}
                  </div>
                )}
              </div>
            )}
            {contact_form_budget_list && showChooseYour && (
              <div className="project_budget">
                {contact_form_budget_label && <h3>{contact_form_budget_label}</h3>}
                <div className="col d_flex d_flex_js">
                  {contact_form_budget_list.map((service, index) => {
                    const checkboxId = `radio${index + 1}`;
                    return (
                      <label htmlFor={checkboxId} key={index}>
                        <input
                          type="radio"
                          id={checkboxId}
                          name="budget"
                          checked={formData.budget === service.label}
                          onChange={handleChange}
                          value={service.label}
                        />
                        {service.label}
                      </label>
                    );
                  })}
                  {errors.budget && <span className="error-msg">{errors.budget}</span>}
                </div>
                <div style={{position:'relative'}} className="captcha-container">
                  <input
                    type="text"
                    id="code"
                    placeholder="Input this code"
                    name="code"
                    className={`in ${errors.code ? "error" : ""}`}
                    value={formData.code}
                    onChange={handleChange}
                  />
                  <div style={{display:'flex',columnGap:'10px',alignItems:'center',position:'absolute',right:'0px',top:'16px'}}>
                    <div style={{backgroundColor:'#000',width:'65px',textAlign:'center',letterSpacing:'2px',color:'white'}} className="captcha">{captcha}</div>
                    <Image
                      style={{cursor:"pointer"}}
                      onClick={handleRegenerateCaptcha}
                      src={rightRotate}
                      alt="rotate-right"
                      width={20}  
                      height={20} 
                    />
                  </div>
                  {errors.code && <span className='captcha_err' style={{color:'red'}}>{errors.code}</span>}
                </div>
                <input
                  type="hidden"
                  className="title"
                  value={title}
                  name="title"
                />
                <button
                 type="submit"
                 onClick={handleSmoothScroll}
                 className="btn sub"
                 disabled={loading}
                 style={{marginTop:'15px'}}
               >
                 {loading ? (
                <div className="infinite-loader">
                <span className="load-spinner"></span>
              </div>
                 ) : (
                   <em>Submit</em>
                 )}
                </button>
                {Object.values(errors).some(value => value !== "") && (
  <div className="error-form">
    <p>*Some required fields are missing or contain errors. Please complete all fields.</p>
  </div>
)}

             </div>
           )}
         </div>
       </form>
     </div>
           <style>
            {
              `
                .contents::-webkit-scrollbar {
                    width: 5px;
                  }

                  /* Track */
                  ::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 5px grey; 
                    border-radius: 10px;
                  }
                  
                  /* Handle */
                  ::-webkit-scrollbar-thumb {
                    background: #1f2770; 
                    border-radius: 10px;
                  }

                  /* Handle on hover */
                  ::-webkit-scrollbar-thumb:hover {
                    background: #1f2770; 
                  }
                input::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                .input-wrapper{
                  width :calc(50% - 17px);
                }
                 .captcha_err{
                    font-size:16px;
                  }
                @media only screen and (min-width: 300px) and (max-width: 1023px) {
                   .input-wrapper{
                    width :calc(100% - 0px);
                  }
                @media only screen and (min-width: 300px) and (max-width: 767px) {
                    .captcha_err{
                    font-size:11px;
                    padding-bottom:10px;
                  }
                }

              `
            }
           </style>
     
   </section>
 );
};

export default HirePopup;