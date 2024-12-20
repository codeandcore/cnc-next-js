import React, { useState, useEffect, useRef } from 'react';
import './Banner.css';
import ClientPlateformMarquee from '../homecomponents/ClientPlateformMarquee';
import BannerBg from '../../assets/images/banner.jpg';
import ArrowIcon from '../../assets/images/arrow_a.png';
import BannerVideo from '../../assets/video/homebanner.mp4';

const Banner = () => {
  const totalColumns = 3; // Assuming you have 5 columns
  const columnsData = [
    {
      type: 'projects',
      title: 'Enacted IT Projects',
      count: 345,
    },
    {
      type: 'clients',
      title: 'Satisfied Clients',
      count: 500,
    },
    {
      type: 'employees',
      title: 'Dedicated Employees',
      count: 250,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const bannerRef = useRef(null);
  const ballRef = useRef(null);
  let mouseX = 0;
  let mouseY = 0;
  let ballX = 0;
  let ballY = 0;
  let speed = 0.1;
  let isMouseOverBanner = false;

  useEffect(() => {
    if (window.innerWidth > 768) {
      const banner = bannerRef.current;
      const ball = ballRef.current;

      const animate = () => {
        if (isMouseOverBanner) {
          let distX = mouseX - ballX - 1;
          let distY = mouseY - ballY - 1;

          ballX = ballX + distX * speed;
          ballY = ballY + distY * speed;

          //ball.style.left = "-" + ballX + "px";
          //ball.style.top = "-" +  ballY + "px";
          ball.style.left = ballX + 'px';
          ball.style.top = ballY + 'px';
        }

        requestAnimationFrame(animate);
      };

      const handleMouseOverBanner = () => {
        isMouseOverBanner = true;
      };

      const handleMouseOutBanner = () => {
        isMouseOverBanner = false;
      };

      const handleMouseMove = (event) => {
        mouseX = event.pageX;
        mouseY = event.pageY;
      };

      animate();

      banner.addEventListener('mouseover', handleMouseOverBanner);
      banner.addEventListener('mouseout', handleMouseOutBanner);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        banner.removeEventListener('mouseover', handleMouseOverBanner);
        banner.removeEventListener('mouseout', handleMouseOutBanner);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="banner" ref={bannerRef}>
      <div className="bg" style={{ backgroundImage: `url(${BannerBg})` }}></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="video"
      >
        <source src={BannerVideo} type="video/mp4" />
      </video>
      <div className="wrapper d_flex">
        <div className="left_col">
          <h1>
            Turn your vision into reality <br />
            with our expert software <br />
            development agency.
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
            <br /> Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s,
          </p>
          <a href="#" className="btn ball" ref={ballRef}>
            <em>
              Let’s Discuss <br /> your project <br />
              <img src={ArrowIcon} />
            </em>
          </a>
        </div>
        <div className="right_col">
          <div className="project_colanimate sp_rt">
            <span className="rt"></span>
            <span className="rb"></span>
            <div className="wrap">
              {columnsData.map((column, index) => (
                <div
                  key={index}
                  className={`col ${activeIndex === index ? 'active' : ''}`}
                >
                  <h3>{column.count}+</h3>
                  <h4>{column.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <ClientPlateformMarquee></ClientPlateformMarquee>
        </div>
      </div>
    </div>
  );
};

export default Banner;
