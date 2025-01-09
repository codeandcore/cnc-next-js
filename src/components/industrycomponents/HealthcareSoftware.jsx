import React from 'react';
import './HealthcareSoftware.css';
import SoftwareImg1 from '../../assets/images/softwareimg1.svg';
import SoftwareImg2 from '../../assets/images/softwareimg2.svg';
import SoftwareImg3 from '../../assets/images/softwareimg3.svg';
import SoftwareImg4 from '../../assets/images/softwareimg4.svg';

const HealthcareSoftware = ({ title, subtitle, items }) => {
  return (
    <div className="healthcare_software">
      <div className="wrapper">
        <div className="top_col">
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>
        {items && (
          <div className="wrap d_flex">
            {items.map((item, index) => (
              <div className="col">
                {item.healthcare_software_image && (
                  <img src={item.healthcare_software_image.url} />
                )}
                {item.healthcare_software_title && (
                  <h3>{item.healthcare_software_title}</h3>
                )}
                {item.healthcare_software_content && (
                  <p>{item.healthcare_software_content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareSoftware;
