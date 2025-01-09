import { useState, useEffect, useRef } from 'react';

const UseOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        // Set visibility to true only once, when it first becomes visible
        setIsVisible(true);
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Clean up on unmount
      }
    };
  }, [options, isVisible]);

  return [ref, isVisible];
};

export default UseOnScreen;
