import React, { useState, useRef, useEffect } from 'react';
import './DigitalSolution.css';

const DigitalSolution = ({
  digital_solution_title,
  digital_solution_content,
  digital_solution_button,
  digital_solution_video,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [calendlyReady, setCalendlyReady] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playButtonText = isPlaying ? 'Pause' : 'Play';
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
        url: 'https://calendly.com/mayur_soni/hire_dev', // Replace with your Calendly link
      });
    } else {
      console.error('Calendly script not ready yet.');
    }
    return false;
  };
  return (
    <div className="digital_solution">
      <div className="wrapper d_flex">
        <div className="left_col">
          {digital_solution_title && (
            <h2
              dangerouslySetInnerHTML={{ __html: digital_solution_title }}
            ></h2>
          )}
          {digital_solution_content && (
            <p
              dangerouslySetInnerHTML={{ __html: digital_solution_content }}
            ></p>
          )}
        </div>
        {/* {digital_solution_button && (<a href={digital_solution_button.url} className='btnanglearrow' >{digital_solution_button.title}</a>)} */}
        {/* Calendly link button */}

        <a
          href=""
          className="btnanglearrow"
          onClick={handleCalendlyPopup} // Trigger Calendly popup on click
        >
          Lets talk
        </a>

        {digital_solution_video && (
          <div className="video_sec d_flex">
            <video
              loop
              muted
              playsInline
              preload="metadata"
              className="video"
              ref={videoRef}
            >
              <source src={digital_solution_video.url} type="video/mp4" />
            </video>
            <span className="d_flex" onClick={toggleVideo}>
              {playButtonText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSolution;
