import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';
import './ExploreDone.css';
import { Link, useLocation } from 'react-router-dom';
import Banchlogo from '../../assets/images/banchlogo.png';
import Sashwindowlogo from '../../assets/images/sashwindow.png';
import LocationIcon from '../../assets/images/location.svg';
import AwwardsLayer from '../../assets/images/awwards.svg';
import AwwardsIcon from '../../assets/images/awwardsicon.png';
// import ArrowsIcon from '../../assets/images/arrow_ss1.svg';
import GoogleIcon from '../../assets/images/google.png';
import Banchbg from '../../assets/images/banchbg.jpg';
import SashWindowbg from '../../assets/images/sashwindow.jpg';
import Branchfevi from '../../assets/images/branchfevi.png';
import Swfevi from '../../assets/images/swfevi.png';
import Wieringerfevi from '../../assets/images/Wieringerfevi.png';
import WieringerLogo from '../../assets/images/WieringerLogo.png';
import WieringerBg from '../../assets/images/WieringerBg.jpg';

import Cruifevi from '../../assets/images/Cruifevi.png';
import CruiLogo from '../../assets/images/CruiLogo.png';
import CruiBg from '../../assets/images/CruiBg.jpg';

const ExploreData = ({ useSlider = false, Datak }) => {
  const options = {
    items: 1,
    loop: true,
    nav: false,
    dots: false,
    autoWidth: true,
    slideSpeed: 500,
  };

  if (useSlider) {
    return (
      <div className="inner d_flex">
        <OwlCarousel options={options}>
          {Datak.map((item, index) => (
            <div key={index} className="colin">
              <div className="top_col d_flex">
                <h3>{item.title}</h3>
                {item.cases && item.cases!==0 && <div className="case d_flex">
                  <span>
                    <img src={item.fevicon} alt="" />
                  </span>
                  <ul className="d_flex">
                    {item.cases.map((caseItem, index) => (
                      <li key={index}>{caseItem}</li>
                    ))}
                  </ul>
                </div>}
              </div>
              <div className="img">
                <Link
                  to="/casestudingdetail"
                  className="bg"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                ></Link>
                {item.awwardsIcon && (
                  <div className="awward">
                    <img src={AwwardsLayer} alt="" className="awwardbg" />
                    <img src={item.awwardsIcon} alt="" className="awwadicon" />
                    <div className="link">
                      <strong>Hounorable Mentioned in</strong>
                      <a href={`https://${item.awwardlink}`} target="_blank">
                        {item.awwardlink}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="bottom_col d_flex">
                <div className="lcol">
                  <img src={item.logo} alt="" />
                  <ul className="d_flex">
                    {item.visitors && (
                      <li>
                        <h4>{item.visitors}</h4>
                        <h5>Visitors a day</h5>
                      </li>
                    )}
                    {item.orders && (
                      <li>
                        <h4>{item.orders}</h4>
                        <h5>Order a day website</h5>
                      </li>
                    )}
                    {item.speed && (
                      <li>
                        <h4>{item.speed}</h4>
                        <h5>
                          <img src={GoogleIcon} />
                          Lighthouse speed
                        </h5>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="rcol d_flex">
                  <img src={LocationIcon} alt="" />
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    );
  } else {
    return (
      <div className="explore_data ">
        <div className="inner d_flex">
          {Datak.map((item, index) => (
            <div key={index} className="colin">
              <div className="top_col d_flex">
                <h3>{item.title}</h3>
                <div className="case d_flex">
                  <span>
                    <img src={item.fevicon} alt="" />
                  </span>
                  <ul className="d_flex">
                    {item.cases.map((caseItem, index) => (
                      <li key={index}>{caseItem}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="img">
                <Link
                  to="/casestudingdetail"
                  className="bg"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                ></Link>
                {item.awwardsIcon && (
                  <div className="awward">
                    <img src={AwwardsLayer} alt="" className="awwardbg" />
                    <img src={item.awwardsIcon} alt="" className="awwadicon" />
                    <div className="link">
                      <strong>Hounorable Mentioned in</strong>
                      <a href={`https://${item.awwardlink}`} target="_blank">
                        {item.awwardlink}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="bottom_col d_flex">
                <div className="lcol">
                  <div className="lcol_logo">
                    <img src={item.logo} alt="" />
                  </div>
                  <ul className="d_flex">
                    {item.visitors && (
                      <li>
                        <h4>{item.visitors}</h4>
                        <h5>Visitors a day</h5>
                      </li>
                    )}
                    {item.orders && (
                      <li>
                        <h4>{item.orders}</h4>
                        <h5>Order a day website</h5>
                      </li>
                    )}
                    {item.speed && (
                      <li>
                        <h4>{item.speed}</h4>
                        <h5>
                          <img src={GoogleIcon} />
                          Lighthouse speed
                        </h5>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="rcol d_flex">
                  <img src={LocationIcon} alt="" />
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ExploreData;
