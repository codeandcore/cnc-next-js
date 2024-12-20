import React from 'react';
import './AwardsLogo.css';

const AwardsLogo = ({ career_awards_logo }) => {
  return (
    career_awards_logo && (
      <ul className="awards_logo d_flex">
        {career_awards_logo.map((award_icon, index) => (
          <li key={index}>
            {award_icon.logo && (
              <img src={award_icon.logo.url} alt={award_icon.logo.name} />
            )}
          </li>
        ))}
      </ul>
    )
  );
};

export default AwardsLogo;
