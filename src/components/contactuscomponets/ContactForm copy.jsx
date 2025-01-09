import React from 'react';
import MapContainer from './MapContainer';
import './ContactForm.css';
import XIcon from '../../assets/images/cs1.png';
import LinkdinIcon from '../../assets/images/cs2.png';
import FbIcon from '../../assets/images/cs3.png';
import InstaIcon from '../../assets/images/cs4.png';
import MapImage from '../../assets/images/map.jpg';

const ContactForm = () => {
  const latitude = 23.08971; // Example latitude
  const longitude = 72.56512; // Example longitude

  return (
    <div className="contact_form">
      <div className="wrapper d_flex">
        <div className="left_col">
          <div className="col">
            <h3>Our Location:</h3>
            <p>
              422 S.V. Square Building, New Ranip, Ahmedabad, Gujarat, India
            </p>
          </div>
          <div className="col">
            <h3>Email address:</h3>
            <a href="mailto:codeandcore@gmail.com">codeandcore@gmail.com</a>
          </div>
          <div className="col">
            <h3>Stay Connected:</h3>
            <div className="social d_flex d_flex_js">
              <a href="#">
                <img src={XIcon} />
              </a>
              <a href="#">
                <img src={LinkdinIcon} />
              </a>
              <a href="#">
                <img src={FbIcon} />
              </a>
              <a href="#">
                <img src={InstaIcon} />
              </a>
            </div>
          </div>
          {/* <img src={MapImage} /> */}
          <div className="map">
            <MapContainer
              latitude={latitude}
              longitude={longitude}
            ></MapContainer>
          </div>
        </div>
        <div className="right_col">
          <form>
            <h2>Let's delve into the fascinating world of your project!</h2>
            <h3>Choose your own Tech Pool...</h3>
            <div className="col d_flex d_flex_js">
              <label htmlFor="checkbox1">
                <input type="checkbox" id="checkbox1" name="checkbox1" />
                Web development
              </label>
              <label htmlFor="checkbox2">
                <input type="checkbox" id="checkbox2" name="checkbox2" />
                Web Designing
              </label>
              <label htmlFor="checkbox3">
                <input type="checkbox" id="checkbox3" name="checkbox3" />
                Site from Scratch
              </label>
              <label htmlFor="checkbox4">
                <input type="checkbox" id="checkbox4" name="checkbox4" />
                UX/UI Design
              </label>
              <label htmlFor="checkbox5">
                <input type="checkbox" id="checkbox5" name="checkbox5" />
                Branding
              </label>
              <label htmlFor="checkbox6">
                <input type="checkbox" id="checkbox6" name="checkbox6" />
                Dashboard
              </label>
              <label htmlFor="checkbox7">
                <input type="checkbox" id="checkbox7" name="checkbox7" />
                Motion
              </label>
              <label htmlFor="checkbox8">
                <input type="checkbox" id="checkbox8" name="checkbox8" />
                Graphic Design
              </label>
              <label htmlFor="checkbox9">
                <input type="checkbox" id="checkbox9" name="checkbox9" />
                Monthly maintenance
              </label>
              <label htmlFor="checkbox10">
                <input type="checkbox" id="checkbox10" name="checkbox10" />
                RND Team
              </label>
              <label htmlFor="checkbox11">
                <input type="checkbox" id="checkbox11" name="checkbox11" />
                Hire a quick developer for small tasks
              </label>
              <label htmlFor="checkbox12">
                <input
                  type="checkbox"
                  id="checkbox12"
                  name="checkbox12"
                  defaultChecked
                />
                Fixed cost project
              </label>
            </div>
            <h3>Project budget (USD)</h3>
            <div className="col d_flex d_flex_js">
              <label htmlFor="radio1">
                <input type="radio" id="radio1" name="budget" defaultChecked />
                &lt;$5K
              </label>
              <label htmlFor="radio2">
                <input type="radio" id="radio2" name="budget" />
                $10K-$20K
              </label>
              <label htmlFor="radio3">
                <input type="radio" id="radio3" name="budget" />
                $30K-$40K
              </label>
              <label htmlFor="radio4">
                <input type="radio" id="radio4" name="budget" />
                Hourly based
              </label>
            </div>
            <div className="wrap d_flex">
              <div className="colin d_flex">
                <input type="text" placeholder="Your name" className="in" />
                <input type="email" placeholder="Your email" className="in" />
              </div>
              <div className="colin d_flex">
                <input
                  type="text"
                  placeholder="Your phone or skype"
                  className="in"
                />
                <input
                  type="text"
                  placeholder="Your company name"
                  className="in"
                />
              </div>
              <div className="colin d_flex">
                <input type="text" placeholder="Your industry" className="in" />
                <input
                  type="text"
                  placeholder="Your website url"
                  className="in"
                />
              </div>
              <textarea
                placeholder="Tell us about the project "
                className="in"
              ></textarea>
              <button type="submit" className="btn sub">
                <em>Submit</em>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
