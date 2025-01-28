const Head = ({ yoastData }) => {  
    return (
        <>
        <meta
        name="description"
        content={yoastData?.description || "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."}
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
      <title>{yoastData?.title || "Codeandcore - Web development studio"}</title>
      {yoastData?.og_keywords && (
        <meta name="keywords" content={yoastData.og_keywords} />
      )}
      <meta
        property="og:title"
        content={yoastData?.og_title || "Codeandcore - Web development studio"}
      />
      {yoastData?.robots && (
            <meta
              name="robots"
              content={`${yoastData?.robots?.index}, ${yoastData?.robots?.follow}, ${yoastData?.robots["max-image-preview"]}, ${yoastData?.robots["max-snippet"]}, ${yoastData?.robots["max-video-preview"]}`}
            />
          )}
      <meta
        property="og:description"
        content={
          yoastData?.og_description || "Affordable Web Development and Design Indian-based company which offers solid solutions in Frontend development, WordPress, and E-commerce."}
      />
      <meta property="og:type" content={yoastData?.og_type} />
      <meta
        property="og:url"
        content={yoastData?.og_url}
      />
      {yoastData?.og_image && (
        <meta property="og:image" content={yoastData?.og_image[0]?.url} />
      )}
      {yoastData?.canonical && (
        <link rel="canonical" href={yoastData?.canonical?.replace(process.env.NEXT_PUBLIC_WP_URL, process.env.NEXT_PUBLIC_VERCEL_URL)} />
      )}
      {yoastData?.twitter_card && (
        <meta name="twitter:card" content={yoastData?.twitter_card} />
      )}
      {yoastData?.og_locale && (
        <meta property="og:locale" content={yoastData?.og_locale} />
      )}
      {/* Schema JSON-LD */}
      {yoastData?.schema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(yoastData?.schema).replaceAll(process.env.NEXT_PUBLIC_WP_URL, process.env.NEXT_PUBLIC_VERCEL_URL) }}
            />
          )}
          {/* FAQ Schema */}
          {yoastData?.faq_schema?.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON.parse(yoastData?.faq_schema[0])) }}
            />
          )}   
    </>
  );
};

export default Head;