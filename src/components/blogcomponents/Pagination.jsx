import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, onPageChange,currentPage,setCurrentPage }) => {

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="pagination-container">
      <button className="arrow-button" onClick={handlePrevious} disabled={currentPage === 1}>
        &#x276E;
      </button>
      <div className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <div
              key={page}
              className={`page-number ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </div>
          );
        })}
      </div>
      <button className="arrow-button" onClick={handleNext} disabled={currentPage === totalPages}>
        &#x276F;
      </button>
    </div>
  );
};

export default Pagination;
