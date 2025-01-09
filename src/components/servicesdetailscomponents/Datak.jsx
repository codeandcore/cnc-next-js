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

const Datak = [
  {
    title: '01 Banch',
    fevicon: Branchfevi,
    logo: Banchlogo,
    awwardsIcon: AwwardsIcon,
    awwardlink: 'awwwards.com',
    cases: ['WordPress', 'HTML', 'UI/UX'],
    visitors: '10k+',
    orders: '500+',
    location: 'Canada',
    bgImage: Banchbg,
  },
  {
    title: '02 Sash Window',
    fevicon: Swfevi,
    logo: Sashwindowlogo,
    cases: ['WordPress', 'HTML', 'UI/UX'],
    visitors: '10k+',
    speed: '98%',
    location: 'Uk',
    bgImage: SashWindowbg,
  },
  {
    title: '03 Wieringer',
    fevicon: Wieringerfevi,
    logo: WieringerLogo,
    cases: ['WordPress', 'HTML', 'UI/UX'],
    visitors: '10k+',
    orders: '500+',
    location: 'Canada',
    bgImage: WieringerBg,
  },
  {
    title: '04 cRUI.SE',
    fevicon: Cruifevi,
    logo: CruiLogo,
    cases: ['WordPress', 'HTML', 'UI/UX'],
    visitors: '10k+',
    speed: '98%',
    location: 'Uk',
    bgImage: CruiBg,
  },
];

export default Datak;
