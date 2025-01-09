'use client'
import React, { useEffect, useState } from 'react';
import './Socialmedialife.css';

const Socialmedialife = ({ social_media_title,socialData }) => {
  return (
    <>
      {socialData && socialData.items && (
        <div className="socialmedia_life">
          <div className="wrapper">
            {social_media_title && (
              <h2 dangerouslySetInnerHTML={{ __html: social_media_title }}></h2>
            )}
            <div className="inner d_flex">
              {socialData.items.map((item, idx) => {
                // Check if the item is a video or a channel
                const { kind } = item.id;
                if (kind === 'youtube#video') {
                  return (
                    <div className="col" key={idx}>
                      <a
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.snippet.thumbnails.medium.url}
                          alt={item.snippet.title}
                        />
                        {/* <h3>{item.snippet.title}</h3>
                        <p>{item.snippet.description}</p> */}
                      </a>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Socialmedialife;

// else if (kind === 'youtube#channel') {
//   return (
//     <div className="col" key={idx}>
//       <a
//         href={`https://www.youtube.com/channel/${item.id.channelId}`}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <img
//           src={item.snippet.thumbnails.medium.url}
//           alt={item.snippet.channelTitle}
//         />

//       </a>
//     </div>
//   );
// }
