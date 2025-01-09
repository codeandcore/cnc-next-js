'use client'
import React from 'react';
import './CasestudingExploreData.css';
import ExploreData from '../servicesdetailscomponents/ExploreData';

const CasestudingExploreData = ({
  CaseStudycptData,
  onLoadMore,
  hasMorePages,
  setPrefetchedData,
  setIsLoading,
  setIsDone,
  setIsFinish,
  isLoadk,
}) => {
  return (
    <>
        <div className="casestuding_exploredata">
        <div className="wrapper">
        {CaseStudycptData?.length!==0 ? (
            <ExploreData
              CaseStudycptData={CaseStudycptData}
              setPrefetchedData={setPrefetchedData}
              setIsLoading={setIsLoading}
              setIsDone={setIsDone}
              setIsFinish={setIsFinish}
            /> ) : (!isLoadk && <p className='no-data-found'>No Portfolio Found</p>)}
            <span
              className="loaderdata"
              style={{ display: isLoadk ? 'inline-block' : 'none' }}
            >
              <img
                src={'/assets/images/rotate-right.png'}
                alt="rotate-right"
              />
            </span>
            {hasMorePages && CaseStudycptData?.length>0 && (
              <button className="btn" onClick={onLoadMore}>
                <em>Load More</em>
              </button>
            )}
          </div>
        </div>
    </>
  );
};

export default CasestudingExploreData;
