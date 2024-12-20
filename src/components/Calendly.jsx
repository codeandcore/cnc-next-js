'use client'
import React, { useEffect, useState } from 'react';

const Calendly = ({
  url,
  className,
  buttonText = 'Let’s talk',
  onClose,
  schedule_icon,
}) => {
  const [calendlyReady, setCalendlyReady] = useState(false);

  // Dynamically load Calendly script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyReady(true); // Set calendlyReady to true when the script loads
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script on component unmount
    };
  }, []);

  // Handle Calendly Popup
  const handleCalendlyPopup = (e) => {
    e.preventDefault();
    if (calendlyReady && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url, // Use the provided Calendly link
      });
    } else {
      console.error('Calendly script not ready yet.');
    }
    return false;
  };

  const handleClick = (e) => {
    handleCalendlyPopup(e); // Call Calendly popup function
    onClose(); // Call toggleChatBoard function
  };

  return (
    <a
      href="#"
      className={className}
      onClick={handleClick} // Trigger Calendly popup on click
    >
      <img src={schedule_icon} />
      <br />
      <em>{buttonText}</em>
    </a>
  );
};

export default Calendly;
