import React from 'react';
import './Perksandbenefits.css';
import he from 'he';

const Perksandbenefits = ({ c_b_title, c_b_description, c_benifitis }) => {
  return (
    <div className="perks_benefits">
      <div className="wrapper ">
        <div className="inner d_flex">
          <div className="left_col">
            {c_b_title && <h2>{c_b_title}</h2>}
            {c_b_description && (
              <p
                dangerouslySetInnerHTML={{ __html: he.decode(c_b_description) }}
              ></p>
            )}
          </div>
          {c_benifitis && (
            <div className="right_col">
              {c_benifitis.map((c_advantage, index) => (
                <div className="colin" key={index}>
                  {c_advantage.c_b_icon && (
                    <img src={c_advantage.c_b_icon.url} alt={c_b_title} />
                  )}
                  <h3>{c_advantage.c_b_label}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: he.decode(c_advantage.c_b_content),
                    }}
                  ></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perksandbenefits;
