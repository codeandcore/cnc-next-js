'use client'
import React, { useEffect, useState } from 'react';
import './ExploreDone.css';
import ExploreData from './ExploreData';
import Link from 'next/link';
import BASE_URL from '@/config';

const ExploreDone = ({
  portfolio_title,
  portfolio_subtitle,
  portfolio_button,
  portfolio_list,
}) => {
  const [portfoliodata, setPortfoliodata] = useState(null);
  useEffect(() => {
    fetch(`${BASE_URL}/wp-json/custom/v1/case-study-list?page=1&per_page=2`)
      .then((response) => response.json())
      .then((data) => setPortfoliodata(data))
      .catch((error) =>
        console.error('Error fetching data from WordPress API:', error),
      );
  }, [BASE_URL]);

  const casestudy_list = portfolio_list && portfolio_list?.length !== 0 ? portfolio_list : portfoliodata  
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
        {casestudy_list && (
          <ExploreData CaseStudycptData={casestudy_list?.data}></ExploreData>
        )}
      </div>
    </div>
  );
};

export default ExploreDone;
