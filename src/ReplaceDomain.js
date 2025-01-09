export const ReplaceDomain = (url, newDomain = '') => {
    if (!url) return url; // If the URL is undefined or null, return it as-is

    try {
        const parsedUrl = new URL(url); // Parse the URL
        const updatedUrl = `${newDomain || parsedUrl.origin}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
        return updatedUrl;
    } catch (e) {
        console.error("Invalid URL provided:", url);
        return url; // Return the original URL if parsing fails
    }
};