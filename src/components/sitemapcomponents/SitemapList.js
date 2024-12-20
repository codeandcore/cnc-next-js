'use client'
import Link from "next/link";
import { useState } from "react";

const SitemapList = ({ pageData }) => {
    const [activeSection, setActiveSection] = useState('pages');
    return (
        pageData && (pageData?.title || pageData?.custom_json) &&(
            <div className='policy-page site-map'>
                 <div className='wrapper'>
                     <div className='title'>
                     {pageData.title && (<h1>{pageData.title.rendered}</h1>)}
                     </div>
                     <div className='inner d_flex'>
                      <div className='left-col'>
                      {pageData.custom_json.data && (
                         <ul>
                             {Object.keys(pageData.custom_json.data).map((item, index) => (
                             <li key={index}                     
                             className={activeSection === item ? 'active' : ''} 
                              >
                               <Link 
                               href={`#${item}`}
                                onClick={(e) => {e.preventDefault();setActiveSection(item);}} 
                                smooth
                                
                                >{item}</Link>
                             </li>
                           ))}
                         </ul>
                      )}
                      </div>
                      <div className='right-col'>
                      {Object.keys(pageData.custom_json.data).map((item, index) => (
                       activeSection === item ? (
                      <div className='colin' id={item} key={index}>
                             <h3>{item}</h3>
                             <div className='wrap d_flex'>
                             {pageData.custom_json.data[item].map((list, ind) => (
                                 
                                 <Link
                                 href={item !== 'pages' ? `/${item}/${list.slug}` : `/${list.slug}`} key={ind} className="btn btnarrow" >
                                     <em dangerouslySetInnerHTML={{ __html: list.name }}></em>
                                     <div> <img src={"/assets/images/ellipse_arr.png"} /> </div>
                                 </Link>
                             ))}
                             </div>                    
                         </div>
                       ) : null
                          ))}
                      </div>
                     </div>
                 </div>
            </div>
             )
    )
}
export default SitemapList