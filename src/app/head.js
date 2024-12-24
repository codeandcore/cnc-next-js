
const Head = ({ yoastData }) => {
    return (
        <>
        <meta
        name="description"
        content={"Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."}
      />
      <link
        rel="icon"
        href="https://new-cnc-next.vercel.app/favicon.ico"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        href="https://new-cnc-next.vercel.app/favicon.ico"
      />
      <title>{yoastData?.og_title || "Codeandcore - Web development studio"}</title>
      
      {yoastData?.og_keywords && (
        <meta name="keywords" content={yoastData.og_keywords} />
      )}
      <meta
        property="og:title"
        content={yoastData?.og_title || "Codeandcore - Web development studio"}
      />
      <meta
        property="og:description"
        content={
          yoastData?.og_description ||
          "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."
        }
      />
      <meta property="og:type" content={yoastData?.og_type || "website"} />
      <meta
        property="og:url"
        content={yoastData?.og_url}
      />
      {yoastData?.og_image && (
        <meta property="og:image" content={yoastData?.og_image[0]?.url} />
      )}
      {yoastData?.canonical && (
        <link rel="canonical" href={yoastData?.canonical} />
      )}
      {yoastData?.twitter_card && (
        <meta name="twitter:card" content={yoastData?.twitter_card} />
      )}
      {yoastData?.og_locale && (
        <meta property="og:locale" content={yoastData?.og_locale} />
      )}
    </>
  );
};

export default Head;