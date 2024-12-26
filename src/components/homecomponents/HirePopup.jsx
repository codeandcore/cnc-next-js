'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import syncIcon  from "../../../public/assets/images/sync.png"
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

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'phone':
        const phoneRegex = /^\d{9,10}$/;
        return phoneRegex.test(value);
      case 'website':
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return urlRegex.test(value);
      case 'projectDescription':
        return value.trim().length >= 3
      default:
        return value.trim().length > 0;
    }
  };

  const checkAllFieldsFilled = (data) => {
    const requiredFields = ['name', 'email', 'phone', 'website', 'projectDescription'];
    
    // Check if all required fields are present and pass validation
    const allFieldsValid = requiredFields.every(field => {
      const value = data[field].trim();
      return value !== '' && validateField(field, value);
    });

    // Update showChooseYour based on validation result
    setShowChooseYour(allFieldsValid);
    return allFieldsValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData;

    console.log(name)

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
    
    // Clear error for the field being changed
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    // Check and update visibility of additional sections
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
    let errors = {};

    if (!data.code || !data.code.trim()) {
      errors.code = 'Captcha code is required';
    } else if (data.code !== captcha) {
      errors.code = 'Captcha code is incorrect';
    }
    if (!data.name || !data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.email || !data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateField('email', data.email)) {
      errors.email = 'Invalid email format';
    }
    if (!data.phone || !data.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!validateField('phone', data.phone)) {
      errors.phone = 'Phone number should be 9 to 10 digits';
    }
    if (!data.website || !data.website.trim()) {
      errors.website = 'Website is required';
    } else if (!validateField('website', data.website)) {
      errors.website = 'Invalid website URL';
    }
    if (!data.projectDescription || !data.projectDescription.trim()) {
      errors.projectDescription = 'Project description is required';
    }
    if (data.service.length === 0) {
      errors.checkbox = 'At least one service must be selected';
    }
    if (!data.budget) {
      errors.budget = 'Please select a budget option';
    }

    return errors;
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
    getUserIp();
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: title,
    }));
  }, [title]);

  const clearFormData = () =>{
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
    })
    setShowChooseYour(false)
  }

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
          <div className="contents">
            <div className="middle_ban">
              <div className="colin d_flex">
                <input
                  type="text"
                  id="name"
                  placeholder="Name & Company*"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`in ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`in ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
              <div className="colin d_flex">
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`in ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
                <input
                  type="text"
                  placeholder="Please add your website here"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`in ${errors.website ? 'error' : ''}`}
                />
                {errors.website && <span className="error-msg">{errors.website}</span>}
              </div>
              <textarea
                placeholder="Tell us more about your project :"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className={`in ${errors.projectDescription ? 'error' : ''}`}
              ></textarea>
              {errors.projectDescription && (
                <span className="error-msg">{errors.projectDescription}</span>
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
                    {errors.checkbox && (
                      <span className="error-msg">{errors.checkbox}</span>
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
                >
                  {loading ? (
                    <span className="loaderdata" style={{ display: "inline-flex",padding:'17px 0px' }}>
                      <Image  
                        className='hp_rotate_img'
                        width={25}  
                        height={25} src={syncIcon} alt="rotate-right" />
                    </span>
                  ) : (
                    <em>Submit</em>
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default HirePopup;