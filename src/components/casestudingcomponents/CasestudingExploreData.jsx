'use client'
import React from 'react';
import { useInView } from 'react-intersection-observer';
import './CasestudingExploreData.css';
import ExploreData from '../servicesdetailscomponents/ExploreData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });  
  React.useEffect(() => {
    if (inView && hasMorePages) {
      onLoadMore();
    }
  }, [inView, hasMorePages, onLoadMore]);

  return (
    <>
      <div className="casestuding_exploredata" id='casestudingExploredata'>
        <div className="wrapper">
       {isLoadk ? (
        <div className="skeleton-grid moving-background " style={{ paddingTop: 50 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton-item">
              <Skeleton height={391} width="100%"  />
            </div>
          ))}
           </div>) :
            CaseStudycptData?.length !== 0 ?
              <ExploreData
                CaseStudycptData={CaseStudycptData}
                setPrefetchedData={setPrefetchedData}
                setIsLoading={setIsLoading}
                setIsDone={setIsDone}
                setIsFinish={setIsFinish}
            /> : <p className="no-data-found">No Portfolio Found</p>
          }
            {hasMorePages && (
              <div ref={ref} className="infinite-loader">
                <span className='load-more-spinner'></span>
              </div>
            )}
          </div>
      </div>
    </>
  );
};

export default CasestudingExploreData;
