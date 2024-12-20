import React from 'react';
import './OurAwards.css';

const OurAwards = ({ className, title, content, our_awards_images }) => {
  const renderAwards = () => {
    if (our_awards_images && Array.isArray(our_awards_images)) {
      return our_awards_images.map((award, index) => (
        <li key={index}>
          <img src={award.logo.url} alt={award.logo.title} />
        </li>
      ));
    }
    return null; // Return null if acf or our_awards_images is not valid
  };
  return (
    <div className={`our_awards ${className}`}>
      <div className="wrapper d_flex">
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        <ul className="d_flex">{renderAwards()}</ul>
      </div>
    </div>
  );
};

export default OurAwards;
