import React from 'react';

const ClientPlateformMarquee = ({ banner_ratitest }) => {
  return (
    <>
      {banner_ratitest && (
        <div className="client_plateform">
          <div className="marquee_wrap">
            <div className="marquee" style={{ animationDuration: '20s' }}>
              {banner_ratitest &&
                banner_ratitest.map((item, idx) => (
                  <div className="item" key={idx}>
                    <img src={item.logo.url} alt={item.text} />
                    {item.text}
                  </div>
                ))}
            </div>
            <div className="marquee" style={{ animationDuration: '20s' }}>
              {banner_ratitest &&
                banner_ratitest.map((item, idx) => (
                  <div className="item" key={idx}>
                    <img src={item.logo.url} alt={item.text} />
                    {item.text}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientPlateformMarquee;
