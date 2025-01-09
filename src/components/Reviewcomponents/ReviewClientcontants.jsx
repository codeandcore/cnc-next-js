'use client'
import React, { useRef, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import './ReviewClientsay.css';

const ReviewClientcontants = ({ client_reviews }) => {
  const videoRefs = useRef([]); // Store refs for all videos
  const [muteStates, setMuteStates] = useState([]); // To manage mute/unmute for each video
  const [playStates, setPlayStates] = useState([]); // To manage play/pause for each video

  useEffect(() => {
    const initialMuteStates = client_reviews.map(() => true); // All videos muted by default
    const initialPlayStates = client_reviews.map(() => true); // All videos playing by default
    setMuteStates(initialMuteStates);
    setPlayStates(initialPlayStates);
  }, [client_reviews]);

  const handleMuteToggle = (index) => {
    const newMuteStates = muteStates.map((_, idx) => {
      // Mute all other videos, but toggle the current one
      return idx === index ? !muteStates[index] : true;
    });
    setMuteStates(newMuteStates);

    // Apply the mute/unmute to each video element
    videoRefs.current.forEach((video, idx) => {
      if (video) video.muted = newMuteStates[idx];
    });
  };
  const handlePlayPauseToggle = (index) => {
    const newPlayStates = [...playStates];
    const video = videoRefs.current[index];
    if (newPlayStates[index]) {
      video.pause();
    } else {
      video.play();
    }
    newPlayStates[index] = !newPlayStates[index]; // Toggle the play state for this video
    setPlayStates(newPlayStates);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="review_contant">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {client_reviews &&
          client_reviews.map((item, idx) => (
            <div className="col" key={idx}>
              <div className="top_col">
                <div className="right_col">
                  {item.google_review_icon.link &&
                    item.google_review_icon.url && (
                      <a href={item.google_review_icon.link}>
                        {' '}
                        <img
                          src={item.google_review_icon.url}
                          alt="Google Review Icon"
                        />
                      </a>
                    )}
                  {item.google_reviews && (
                    <div
                      className="star d_flex"
                      data-rate={item.google_reviews}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
                {item.logo && item.logo.url && (
                  <img
                    src={item.logo.url}
                    className="reviewlogo"
                    alt="Client Logo"
                  />
                )}
              </div>
              {item.review_video && item.review_video.url ? (
                <div className="video_col">
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    autoPlay
                    loop
                    muted={muteStates[idx] || true}
                    playsInline
                    preload="metadata"
                    className="video"
                  >
                    <source src={item.review_video.url} type="video/mp4" />
                  </video>
                  <div className="btn_col">
                    <span
                      className="music"
                      onClick={() => handleMuteToggle(idx)}
                    >
                      <img
                        src={muteStates[idx] ? "/assets/images/mute1.svg" : "/assets/images/mute.svg"}
                        alt="Mute/Unmute"
                      />
                    </span>
                    <span
                      className="play_pause"
                      onClick={() => handlePlayPauseToggle(idx)}
                    >
                      <img
                        src={playStates[idx] ? "/assets/images/pause1.svg" : "/assets/images/pause.svg"}
                        alt="Play/Pause"
                      />
                    </span>
                  </div>
                </div>
              ) : item.review_image && item.review_image.url ? (
                <div className="img">
                  <img src={item.review_image.url} alt="Review Image" />
                </div>
              ) : item.review_content ? (
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: item.review_content }}
                  ></p>
                </div>
              ) : null}
              <div className="bottom_col">
                {item.client_image && item.client_image.url && (
                  <div className="user">
                    <img src={item.client_image.url} alt={item.client_name} />
                  </div>
                )}
                <div className="text">
                  <h5>{item.client_name}</h5>
                  <h6>{item.client_designation}</h6>
                </div>
              </div>
            </div>
          ))}
      </Masonry>
    </div>
  );
};

export default ReviewClientcontants;
