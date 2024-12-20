import React from 'react';
import './HealthcareSolution.css';
import Calendly from '../Calendly';

const HealthcareSolution = ({ title, subtitle, button }) => {
  return (
    <div className="healthcare_solution">
      <div className="wrapper">
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
        {/* {button && (<a className="btn" href={button.url}><em>{button.title}</em></a>)} */}
        <Calendly
          className="btn"
          url="https://calendly.com/mayur_soni/hire_dev"
          buttonText={button}
        />
      </div>
    </div>
  );
};

export default HealthcareSolution;
