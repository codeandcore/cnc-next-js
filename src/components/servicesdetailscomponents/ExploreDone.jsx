'use client'
import React, { useEffect, useState } from 'react';
import './ExploreDone.css';
import ExploreData from './ExploreData';
import Link from 'next/link';
import BASE_URL from '@/config';
import { getGeneralData } from '@/appStore';

const ExploreDone = ({
  portfolio_title,
  portfolio_subtitle,
  portfolio_button,
  portfolio_list,
}) => {
  const commonPortfolio = getGeneralData() 
  console.log('commonPortfolio', commonPortfolio);

  const [portfoliodata, setPortfoliodata] = useState(commonPortfolio);
  const casestudy_list = portfolio_list && portfolio_list?.length !== 0 ? portfolio_list : commonPortfolio?.portfolio_list
  const portfolioButton = portfolio_button && Object.keys(portfolio_button).length > 0 ? portfolio_button : commonPortfolio?.portfolio_button

  useEffect(()=> {

  })

  return (
    <div className="explore_we_done">
      <div className="wrapper d_flex">
        <div className="left_col">
          {portfolio_title && (
            <h2 dangerouslySetInnerHTML={{ __html: portfolio_title ? portfolio_title : commonPortfolio?.portfolio_title }}></h2>
          )}
          {portfolio_subtitle && (
            <p dangerouslySetInnerHTML={{ __html: portfolio_subtitle ? portfolio_subtitle : commonPortfolio?.portfolio_subtitle }}></p>
          )}
        </div>
        {portfolioButton && (
          <Link href={portfolioButton.url} className="btn">
            {portfolioButton.title}
          </Link>
        )}
        {casestudy_list && (
          <ExploreData CaseStudycptData={portfolio_list && portfolio_list?.length !== 0 ? portfolio_list : casestudy_list}></ExploreData>
        )}
      </div>
    </div>
  );
};

export default ExploreDone;
