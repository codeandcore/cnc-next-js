'use client'
import React, { useState, useEffect, useRef } from 'react';
import Calendly from './Calendly';
import "../components/careercomponents/CareerPopup.css"
import Link from 'next/link';
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const ChatBoard = ({
  isChatOpen,
  toggleChatBoard,
  chatbot_logo,
  chatbot_title,
  chatbot_subtitle,
  chat_name,
  chat_email,
  start_chat_button,
  chat_title,
  whatsapp_link,
  whatsapp_title,
  schedule_title,
  thank_you_message,
  chat_icon,
  whatsapp_icon,
  schedule_icon,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [formData, setFormData] = useState({ code: '' });
  const [showInner, setShowInner] = useState(false);
  const [thankyou, setThankyou] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    code: false,
  }); // Track errors
  const chatBoardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorsObj = {
      name: name === '',
      email: email === '' || !/\S+@\S+\.\S+/.test(email), // Simple email validation
      code: formData.code === '' || formData.code !== captcha,
    };

    setErrors(errorsObj);

    if (!errorsObj.name && !errorsObj.email && !errorsObj.code) {
      // Proceed with form submission
      setThankyou(true);
    }
  };
  const steps = [
    {
      id: 'welcome',
      message: 'Hey there! I’m here to help with anything you need. What’s your name?',
      trigger: 'getName',
    },
    {
      id: 'getName',
      user: true,
      validator: (value) => {
        if (!value.trim()) {
          return 'Please enter a valid name.';
        }
        return true;
      },
      trigger: 'personalizedGreeting',
    },
    {
      id: 'personalizedGreeting',
      message: 'Hey {previousValue}, what’s on your mind? Tell me what you need.',
      trigger: 'projectType',
    },
    {
      id: 'projectType',
      options: [
        { value: 'fullTimeDeveloper', label: 'Hire a full time developer', trigger: 'contactMethod' },
        { value: 'fixedPriceProject', label: 'Fixed price project', trigger: 'contactMethod' },
        { value: 'hourly', label: 'Hire us hourly', trigger: 'contactMethod' },
        { value: 'craftTeam', label: 'Craft your own team', trigger: 'contactMethod' },
        { value: 'siteMaintenance', label: 'Site maintenance', trigger: 'contactMethod' },
        { value: 'applyJob', label: 'Apply for job', trigger: 'applyForJob' },
        { value: 'somethingElse', label: 'Something else', trigger: 'contactMethod' },
      ],
    },
    {
      id: 'contactMethod',
      message: 'How would you prefer we contact you, email or phone?',
      trigger: 'contactPreference',
    },
    {
      id: 'contactPreference',
      options: [
        { value: 'email', label: 'Email', trigger: 'askEmail' },
        { value: 'phone', label: 'Phone', trigger: 'askPhoneNumber' },
      ],
    },
    {
      id: 'askEmail',
      message: 'Please share your email, and an expert will reach out to you.',
      trigger: 'getEmail',
    },
    {
      id: 'getEmail',
      user: true,
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address.';
        }
        return true;
      },
      trigger: 'thankYou',
    },
    {
      id: 'askPhoneNumber',
      message: 'Please share your phone number so we can contact you.',
      trigger: 'getPhoneNumber',
    },
    {
      id: 'getPhoneNumber',
      user: true,
      validator: (value) => {
        const phoneRegex = /^\+?[1-9]\d{9,14}$/; // E.164 format with a minimum of 10 digits
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number with at least 10 digits.';
        }
        return true;
      },
      trigger: 'askPreferredTime',
    },
    {
      id: 'askPreferredTime',
      message: 'What is your preferable US time?',
      trigger: 'preferredTimeOptions',
    },
    {
      id: 'preferredTimeOptions',
      options: [
        { value: 'morning', label: 'Morning', trigger: 'thankYou' },
        { value: 'afternoon', label: 'Afternoon', trigger: 'thankYou' },
        { value: 'evening', label: 'Evening', trigger: 'thankYou' },
      ],
    },
    {
      id: 'applyForJob',
      message: 'Awesome! We have several openings right now. Feel free to apply on our careers page, and our amazing HR team will get back to you soon!',
      trigger: 'shareCareersLink',
    },
    {
      id: 'shareCareersLink',
      component: (
        <CareersLink />
      ),
      end: true,
    },
    {
      id: 'endMessage',
      message: 'Thanks for letting us know! Someone from our team will assist you soon.',
      end: true,
    },
    {
      id: 'thankYou',
      message: 'Alright, we’ll be in touch soon! In the meantime, feel free to explore our latest projects and the technologies we specialize in.',
      trigger: 'refLinks',
    },
    {
      id: 'refLinks',
      component: (
        <AfterThankyouLinks />
      ),
      end: true,
    },
  ];
  
  function CareersLink() {
    return (
      <>
      <div className='rsc-link'>
          <a href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/career`} target="_blank" rel="noopener noreferrer">{`${process.env.NEXT_PUBLIC_VERCEL_URL}/career`}</a>
      </div>
      </>
    );
  }

  function AfterThankyouLinks() {
    return (
      <>
      <div className='rsc-link'>
          <a href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/portfolio`} target="_blank" rel="noopener noreferrer">{`${process.env.NEXT_PUBLIC_VERCEL_URL}/portfolio`}</a>
        </div>
        <div className='rsc-link'>
          <a href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/technologies`} target="_blank" rel="noopener noreferrer">{`${process.env.NEXT_PUBLIC_VERCEL_URL}/technologies`}</a>
      </div>
      <div className='rsc-link'>
          <a href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/services`} target="_blank" rel="noopener noreferrer">{`${process.env.NEXT_PUBLIC_VERCEL_URL}/services`}</a>
      </div>
      </>
    );
  }


  const handleChatClick = (e) => {
    e.preventDefault();
    setShowInner(!showInner);
    setIsChatActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatBoardRef.current &&
        !chatBoardRef.current.contains(event.target)
      ) {
        toggleChatBoard(); // Close the chat board
        setShowInner(false)
        setIsChatActive(false)
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen, toggleChatBoard]);

  const generateCaptcha = () => {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleRegenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor:"linear-gradient(92.06deg, rgb(112, 124, 202) 42.78%, rgb(142, 144, 231) 100%);",
    headerFontColor: "#fff" ,
    headerFontSize: "15px",
    botBubbleColor: "#6167f8",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const handleEnd = ({ steps}) => {    
    const { getName, projectType, getPhoneNumber,getEmail,preferredTimeOptions } = steps;
    console.log("getname",getName?.value);
    
  }
  return (
    <>
      <div
        ref={chatBoardRef}
        className={`chat-board ${isChatOpen ? 'open' : ''}`}
      >
        <img
          src={"/assets/images/ChatClose.svg"}
          className="close"
          onClick={()=>{toggleChatBoard(),    setShowInner(false), setIsChatActive(false)}}
          alt="close"
        />
        {/* <Link to="/"  className="chat-logo" ><img src={FooterLogo} alt="logo"/></Link> */}
        <Link href="/" className="chat-logo">
         <img src={chatbot_logo.url} alt="logo" />
        </Link>
        <h3>{chatbot_title}</h3>
        <div className={`peragrapth ${showInner ? 'hide' : ''}`}>
          {chatbot_subtitle}
        </div>

        {showInner &&
          <ThemeProvider theme={theme}>
            <ChatBot width={"100%"} height="395px" steps={steps} style={{ margin: '0 auto', color: "#fff" }} headerTitle="We are online" headerFontColor="#ffff" hideHeader={true} 
            hideCloseButton={false} handleEnd={handleEnd}    />
          </ThemeProvider>}
        {/* <div
          className={`inner ${showInner ? 'show' : ''} ${thankyou ? 'hide' : ''}`}
        >
          <form onSubmit={handleSubmit} className="chat-form">
            <img src={"/assets/images/chatuser.svg"} className="user" />
            <input
              type="text"
              id="name"
              className={`in ${errors.name ? 'error' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={chat_name}
            />
            <input
              type="email"
              id="email"
              className={`in ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={chat_email}
            />
            <div className="captcha-container">
              <input
                type="text"
                id="code"
                placeholder="Input this code"
                name="code"
                className={`in ${errors.code ? 'error' : ''}`}
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
                  src={"/assets/images/rotate-right.png"}
                  alt="rotate-right"
                />
              </button>
            </div>
            <button type="submit" className="start-chat-btn">
              {start_chat_button}
            </button>
          </form>
          <div className="thankyou">
            <p>{thank_you_message}</p>
          </div>
        </div> */}
        <div className="threebtn">
          <a
            href="javascript:void(0)"
            onClick={handleChatClick}
            className={`btn-chat ${isChatActive ? 'active' : ''}`}
          >
            <img src={chat_icon.url} />
            <br />
            {chat_title}
          </a>
          <a href={whatsapp_link} className="btn-whatsapp">
            <img src={whatsapp_icon.url} />
            <br />
            {whatsapp_title}
          </a>
          <Calendly
            schedule_icon={schedule_icon.url}
            onClose={toggleChatBoard}
            isChat={true}
            className="btn-schedule"
            url="https://calendly.com/mayur_soni/hire_dev"
            buttonText={schedule_title}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBoard;
