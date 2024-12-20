import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Calendly from './Calendly';
import ChatClose from '../assets/images/ChatClose.svg';
import ChatUser from '../assets/images/chatuser.svg';
import FooterLogo from '../assets/images/cnc-logo-black.svg';
import ChatImgk from '../assets/images/ChatImgk.svg';
import WhatsAppImgk from '../assets/images/WhatsAppImgk.svg';
import ScheduleImgk from '../assets/images/ScheduleImgk.svg';

const ChatBoard = ({ isChatOpen, toggleChatBoard }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showInner, setShowInner] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const chatBoardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Email: ${email}`);
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

  return (
    <>
      <div
        ref={chatBoardRef}
        className={`chat-board ${isChatOpen ? 'open' : ''}`}
      >
        <img
          src={ChatClose}
          className="close"
          onClick={toggleChatBoard}
          alt="close"
        />
        <Link to="/" className="chat-logo">
          <img src={FooterLogo} alt="logo" />
        </Link>
        <h2>
          Welcome to <br /> LiveChat
        </h2>
        <div className={`peragrapth ${showInner ? 'hide' : ''}`}>
          We are here to help you! Chat or WhatsApp to connect with us right
          away.
        </div>
        <div className={`inner ${showInner ? 'show' : ''}`}>
          <form onSubmit={handleSubmit} className="chat-form">
            <img src={ChatUser} className="user" />
            <input
              type="text"
              id="name"
              className="in"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name:"
            />
            <input
              type="email"
              id="email"
              className="in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email:"
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
                  src={require('../../assets/images/rotate-right.png')}
                  alt="rotate-right"
                />
              </button>
            </div>
            <button type="submit" className="start-chat-btn">
              Start the chat
            </button>
          </form>
        </div>
        <div className="threebtn">
          <a
            href="javascript:void(0)"
            onClick={handleChatClick}
            className={`btn-chat ${isChatActive ? 'active' : ''}`}
          >
            <img src={ChatImgk} />
            <br />
            Chat
          </a>
          <a href="#" className="btn-whatsapp">
            <img src={WhatsAppImgk} />
            <br />
            WhatsApp
          </a>
          <Calendly
            onClose={toggleChatBoard}
            className="btn-schedule"
            url="https://calendly.com/mayur_soni/hire_dev"
            buttonText={'Schedule'}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBoard;
