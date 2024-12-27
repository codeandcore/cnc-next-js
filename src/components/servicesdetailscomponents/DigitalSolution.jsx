'use client'
import React, { useState, useRef } from 'react';
import './DigitalSolution.css';
import Calendly from '../Calendly';

const DigitalSolution = ({
  digital_solution_title,
  digital_solution_content,
  digital_solution_button,
  digital_solution_video,
  digital_solution_image,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
console.log("digital_solution_title",digital_solution_content);

  const playButtonText = isPlaying ? 'Pause' : 'Play';

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
            <div
              dangerouslySetInnerHTML={{ __html: digital_solution_content }}
            ></div>
          )}
        </div>

        <Calendly
          className="btnanglearrow"
          url="https://calendly.com/mayur_soni/hire_dev"
          buttonText={digital_solution_button?.title || 'Let’s talk'}
        />
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

        {digital_solution_image && (
          <div className="digital-solution-image">
            <img src={digital_solution_image.url} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSolution;
