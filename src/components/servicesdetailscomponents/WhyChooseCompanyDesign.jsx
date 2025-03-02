'use client';

import React, { useState, useEffect } from 'react';
import './WhyChooseCompanyDesign.css';

const WhyChooseCompanyDesign = ({
  why_choose_title,
  why_choose_subtitle,
  why_choose_list,
}) => {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <div className="why_choose_companydesign">
      <div className="wrapper">
        <div className="top_col d_flex">
          {clientReady && why_choose_title && (
            <h2 dangerouslySetInnerHTML={{ __html: why_choose_title }}></h2>
          )}
          {clientReady && why_choose_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: why_choose_subtitle }}></p>
          )}
        </div>
        {clientReady && why_choose_list && (
          <div className="inner d_flex">
            {why_choose_list.map((item, index) => (
              <div className="col" key={index}>
                {item.icon && (
                  <span>
                    <img src={item.icon.url} alt={item.icon.name} />
                  </span>
                )}
                {item.title && <h3>{item.title}</h3>}
                {item.content && <p>{item.content}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhyChooseCompanyDesign;
