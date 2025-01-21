'use client'
import React from 'react';
import { useInView } from 'react-intersection-observer';
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
      <div className="casestuding_exploredata">
        <div className="wrapper">
          {CaseStudycptData?.length !== 0 ? (
            <ExploreData
              CaseStudycptData={CaseStudycptData}
              setPrefetchedData={setPrefetchedData}
              setIsLoading={setIsLoading}
              setIsDone={setIsDone}
              setIsFinish={setIsFinish}
            />
          ) : (
            !isLoadk && <p className="no-data-found">No Portfolio Found</p>
          )}
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
