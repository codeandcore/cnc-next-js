import React from 'react';
import './WhoWeAre.css';
import he from 'he';

const WhoWeAre = ({
  a_os_title,
  a_os_sub_title,
  certified_list,
  a_wwa_right_side_title,
  a_wwa_about_description,
  goal_and_vision_section,
}) => {
  return (
    <div className="who_weare_sec">
      <div className="wrapper d_flex d_flex_at">
        <div className="our_story">
          {a_os_title && <span>{a_os_title}</span>}
          {a_os_sub_title && <h2>{a_os_sub_title}</h2>}
          {certified_list && (
            <ul className="d_flex">
              {certified_list.map((column, index) => (
                <li key={index}>
                  <img src={column.a_cl_image.url} alt={column.a_cl_title} />
                  <h4>{column.a_cl_title}</h4>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="we_are">
          {a_wwa_right_side_title && <h3>{a_wwa_right_side_title}</h3>}
          <p
            dangerouslySetInnerHTML={{
              __html: he.decode(a_wwa_about_description),
            }}
          ></p>
          {goal_and_vision_section && (
            <ul className="d_flex d_flex_at">
              {goal_and_vision_section.map((column, index) => (
                <li key={index}>
                  <img src={column.a_gv_icon.url} alt={column.a_cl_title} />
                  <h3>{column.a_gv_title}</h3>
                  <p>{column.a_gv_description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
