import React from 'react';
import './HappyHours.css';

const HappyHours = ({
  our_culture_small_title,
  our_culture_title,
  our_culture_first_gallery,
  our_culture_second_gallery,
  our_culture_bottom_content,
}) => {
  return (
    <div className="happy_hours">
      {our_culture_small_title && <span>{our_culture_small_title}</span>}
      {our_culture_title && (
        <h2 dangerouslySetInnerHTML={{ __html: our_culture_title }}></h2>
      )}
      <div className="marquee_sec">
        {our_culture_first_gallery && (
          <div className="marquee_ltr">
            <div className="marquee_wrap">
              <div className="marquee" style={{ animationDuration: '80s' }}>
                {our_culture_first_gallery.map((item, idx) => (
                  <img src={item.url} alt={item.alt} key={idx}/>
                ))}
              </div>
              <div className="marquee" style={{ animationDuration: '80s' }}>
                {our_culture_first_gallery.map((item, idx) => (
                  <img src={item.url} alt={item.alt} key={idx} />
                ))}
              </div>
            </div>
          </div>
        )}
        {our_culture_second_gallery && (
          <div className="marquee_rtl">
            <div className="marquee_wrap">
              <div className="marquee" style={{ animationDuration: '80s' }}>
                {our_culture_second_gallery.map((item, idx) => (
                  <img src={item.url} alt={item.alt} key={idx} />
                ))}
              </div>
              <div className="marquee" style={{ animationDuration: '80s' }}>
                {our_culture_second_gallery.map((item, idx) => (
                  <img src={item.url} alt={item.alt} key={idx} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {our_culture_bottom_content && (
        <p dangerouslySetInnerHTML={{ __html: our_culture_bottom_content }}></p>
      )}
    </div>
  );
};

export default HappyHours;
