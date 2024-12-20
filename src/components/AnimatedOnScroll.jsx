import React, { useRef, useEffect } from 'react';
import './AnimatedOnScroll.css';

const AnimatedOnScroll = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a class to the element when it becomes visible
          entry.target.classList.add('animate');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust as needed
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className="animated-element">
      {/* Your content goes here */}
    </div>
  );
};

export default AnimatedOnScroll;
