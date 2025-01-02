'use client'
import React, { useState, useEffect, useRef } from 'react';
import Calendly from './Calendly';
import "../components/careercomponents/CareerPopup.css"
import Link from 'next/link';

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

  const handleChatClick = (e) => {
    e.preventDefault();
    setShowInner(true);
    setIsChatActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatBoardRef.current &&
        !chatBoardRef.current.contains(event.target)
      ) {
        toggleChatBoard(); // Close the chat board
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

  return (
    <>
      <div
        ref={chatBoardRef}
        className={`chat-board ${isChatOpen ? 'open' : ''}`}
      >
        <img
          src={"/assets/images/ChatClose.svg"}
          className="close"
          onClick={toggleChatBoard}
          alt="close"
        />
        {/* <Link to="/"  className="chat-logo" ><img src={FooterLogo} alt="logo"/></Link> */}
        <Link href="/" className="chat-logo">
  <img src={chatbot_logo.url} alt="logo" />
</Link>
        <h2>{chatbot_title}</h2>
        <div className={`peragrapth ${showInner ? 'hide' : ''}`}>
          {chatbot_subtitle}
        </div>
        <div
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
        </div>
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
