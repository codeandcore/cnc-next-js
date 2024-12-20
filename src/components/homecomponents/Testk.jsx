import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';

const Testk = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [remainingItems, setRemainingItems] = useState(0);

  const options = {
    items: 2,
    loop: false,
    margin: 5,
    nav: true,
  };

  const handleCarouselChanged = (event) => {
    setCurrentSlide(event.page.index);
  };

  useEffect(() => {
    const calculateRemainingItems = () => {
      setRemainingItems(totalSlides - currentSlide - options.items);
    };

    calculateRemainingItems();

    return () => {
      // Cleanup code if needed
    };
  }, [currentSlide, totalSlides]);

  return (
    <div className="container">
      <OwlCarousel
        options={options}
        onChanged={handleCarouselChanged}
        ref={(el) => setTotalSlides(el?.state?.total || 0)}
      >
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
        <div>Five</div>
        <div>Six</div>
        <div>Seven</div>
        <div>Eight</div>
        <div>Nine</div>
        <div>Ten</div>
      </OwlCarousel>
      <div id="counter">{remainingItems}</div>
    </div>
  );
};

export default Testk;
