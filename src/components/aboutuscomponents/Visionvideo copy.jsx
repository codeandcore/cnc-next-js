import React, { useEffect, useState, useRef } from 'react';
import './Visionvideo.css';
import Sound from '../../assets/images/sound.svg';

const Visionvideo = () => {
  const [isMuted, setIsMuted] = useState(true); // Mute by default
  const iframeRef = useRef(null); // Reference for the iframe element
  const playerRef = useRef(null); // Reference for the YouTube Player object

  useEffect(() => {
    // Function to handle YouTube iFrame API loading and player initialization
    const onPlayerReady = (event) => {
      event.target.mute(); // Mute the video by default when ready
    };

    const onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(iframeRef.current, {
        videoId: 'mq55jlunseI',
        events: {
          onReady: onPlayerReady,
        },
      });
      playerRef.current = player; // Attach the player object to playerRef
    };

    // Load the YouTube iFrame API if it hasn't been loaded already
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute(); // Unmute the video
      } else {
        playerRef.current.mute(); // Mute the video
      }
      setIsMuted(!isMuted); // Toggle mute state
    }
  };

  return (
    <div className="vision_video">
      <div id="player">
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/mq55jlunseI?enablejsapi=1&autoplay=1&controls=0&mute=1&loop=1&playlist=mq55jlunseI"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Vision Video"
        ></iframe>
      </div>
      {/* Change class based on mute/unmute state */}
      <span
        className={`play ${isMuted ? 'mutevideo' : ''}`}
        onClick={toggleMute}
      >
        <img src={Sound} alt="Sound Toggle" />
      </span>
    </div>
  );
};

export default Visionvideo;
