import React, { useRef, useState } from 'react';
import './ReviewClientsay.css';
import Masonry from 'react-masonry-css';
import quata from '../../assets/images/quata.svg';
import Music from '../../assets/images/mute.svg';
import Music1 from '../../assets/images/mute1.svg';
import Pause from '../../assets/images/pause.svg';
import Pause1 from '../../assets/images/pause1.svg';

const ReviewClientcontants = ({ client_reviews }) => {
  const [isMuted, setIsMuted] = useState(true); // To manage mute/unmute
  const [isPlaying, setIsPlaying] = useState(true); // To manage play/pause
  const videoRef = useRef(null); // Reference to the video element

  const handleMuteToggle = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted); // Toggle mute state
  };

  const handlePlayPauseToggle = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying); // Toggle play state
  };

  const breakpointColumnsObj = {
    default: 3, // Number of columns on large screens
    1100: 2, // Number of columns for medium screens
    700: 1, // Number of columns for small screens
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
                <img src={item.logo.url} className="reviewlogo" />
                <div className="right_col">
                  <a href={item.google_review_icon.link}>
                    {' '}
                    <img src={item.google_review_icon.url} />
                  </a>
                  <div className="star d_flex" data-rate={item.google_reviews}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              {item.review_video && item.review_video.url ? (
                <div className="video_col">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    className="video"
                  >
                    <source src={item.review_video.url} type="video/mp4" />
                  </video>
                  <div className="btn_col">
                    <span className="music" onClick={handleMuteToggle}>
                      <img src={isMuted ? Music1 : Music} alt="Mute/Unmute" />
                    </span>
                    <span
                      className="play_pause"
                      onClick={handlePlayPauseToggle}
                    >
                      <img src={isPlaying ? Pause1 : Pause} alt="Play/Pause" />
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
