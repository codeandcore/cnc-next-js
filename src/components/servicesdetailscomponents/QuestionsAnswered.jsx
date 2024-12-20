'use client'
import React, { useState } from 'react';
import './QuestionsAnswered.css';

const QuestionsAnswered = ({ qa_title_content, qa_list }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleWrap = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="questions_answered">
      <div className="wrapper d_flex">
        {qa_title_content && (
          <div
            className="left_col"
            dangerouslySetInnerHTML={{ __html: qa_title_content }}
          ></div>
        )}
        {qa_list && (
          <div className="right_col">
            {qa_list.map((item, index) => (
              <div className="colin" key={index}>
                <h3
                  className={`${expandedIndex === index ? 'active' : ''}`}
                  onClick={() => toggleWrap(index)}
                >
                  {item.question} <img src={"/assets/images/pluceicon.png"} alt="plus icon" />
                </h3>
                <p
                  className={`${expandedIndex === index ? 'expanded' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsAnswered;
