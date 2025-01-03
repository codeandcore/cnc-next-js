'use client'
import React from 'react';
import './ExploreDone.css';
import ExploreData from './ExploreData';
import Link from 'next/link';

const ExploreDone = ({
  portfolio_title,
  portfolio_subtitle,
  portfolio_button,
  portfolio_list,
}) => {
  return (
    <div className="explore_we_done">
      <div className="wrapper d_flex">
        <div className="left_col">
          {portfolio_title && (
            <h2 dangerouslySetInnerHTML={{ __html: portfolio_title }}></h2>
          )}
          {portfolio_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: portfolio_subtitle }}></p>
          )}
        </div>
        {portfolio_button && (
          <Link href={portfolio_button.url} className="btn">
            {portfolio_button.title}
          </Link>
        )}
        {portfolio_list && (
          <ExploreData CaseStudycptData={portfolio_list}></ExploreData>
        )}
      </div>
    </div>
  );
};

export default ExploreDone;
