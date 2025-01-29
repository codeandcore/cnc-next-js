'use client'
import React, { useEffect, useState } from 'react';

const ProjectLogoMarquee = ({ banner_clients_list }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (banner_clients_list && banner_clients_list.length > 0) {
      // Set a random active index
      const randomIndex = Math.floor(Math.random() * banner_clients_list.length);
      setActiveIndex(randomIndex);

      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * banner_clients_list.length);
        setActiveIndex(randomIndex);
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);

    }
  }, [banner_clients_list]);

  const renderMarquee = () => {
    if (banner_clients_list && banner_clients_list.length > 0) {
      return (
        <div className="marquee">
          {banner_clients_list.map((item, idx) => (
            <div
              className={`item ${idx === activeIndex ? 'active' : ''}`}
              key={idx}
            >
              <img src={item.logo.url} alt="client logo" />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      {banner_clients_list && banner_clients_list.length > 0 && (
        <div className="client_plateform project_logo_marquee">
          <div className="marquee_wrap">
            {renderMarquee()}
            {renderMarquee()}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectLogoMarquee;
