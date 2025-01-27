const express = require("express");
const path = require("path");
const { kv } = require("@vercel/kv");
const cache = require("./cache");
const generateJson = require("./api/generateJson");
const axios = require('axios');

const app = express();
console.log("hello");

// Middleware to parse JSON
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/api/generateJson", generateJson);
const htmlstring = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security Interupted</title>
    <style>
      body {
        background-color: #80808091; /* Light gray background */
        color: #333;
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        text-align: center;
      }
      .icon {
        font-size: 50px;
        color: #ffcc00; /* Yellow for the exclamation icon */
      }
      .heading {
        font-size: 24px;
        color: #333;
        margin: 10px 0;
      }
      .subheading {
        font-size: 18px;
        color: #666; /* Grayish text for subheading */
        margin: 5px 0;
      }
      .ip-text {
        font-size: 16px;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 10px 0;
      }
      button {
        background-color: black;
        color: white;
        border: none;
        padding: 12px 25px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        margin-top: 20px;
        text-decoration: none;
      }
      button:hover {
        background-color: lightgray;
      }
      .bottom-anc {
        position: absolute;
        bottom: 40px;
      }
    </style>
  </head>
  <body>
    <div class="icon">⚠️</div>
    <h1 class="heading">Security Layer Activated</h1>
    <p class="subheading">Suspicious Activity Detected</p>
    <p class="ip-text">IP Captured</p>
  </body>
  </html>
`;

app.get("/data/:type?/:fileName", async (req, res) => {
    const { type, fileName } = req.params;
    let fileNameForKv;
    try {
      fileNameForKv = type === "options" ? "cnc-options" : `cnc-${type}-${fileName}`;
  
      const cachedData = cache.get(fileNameForKv);
      if (cachedData) {
        return res.send(cachedData);
      }
  
      const datajson = await kv.get(fileNameForKv);
      if (!datajson) {
        return res.status(404).json({ message: "Data not found." });
      }
      cache.set(fileNameForKv, datajson);
      res.send(datajson);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
const generateSitemap = async (type) => {
  const sitemapUrl =
    type === "sitemap"
      ? `${process.env.NEXT_PUBLIC_WP_URL}/sitemap.xml`
      : `${process.env.NEXT_PUBLIC_WP_URL}/${type}.xml`;

  try {
    const mainSitemap = await axios.get(sitemapUrl);
    let filteredSitemap = mainSitemap.data.replace(
      '<?xml-stylesheet type="text/xsl" href="//wordpress-1074629-4621962.cloudwaysapps.com/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>',
      ""
    );

    const urlPattern = /https:\/\/wordpress-1074629-4621962\.cloudwaysapps\.com/g;
    filteredSitemap = filteredSitemap.replace(urlPattern, `https://new-cnc-next.vercel.app`);

    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder({
      xmldec: { version: "1.0", encoding: "UTF-8" },
      renderOpts: { pretty: true, indent: "  ", newline: "\n" },
    });
    const parsedXml = await parser.parseStringPromise(filteredSitemap);
    let beautifiedXml = builder.buildObject(parsedXml);

    const sitemapCount = (beautifiedXml.match(/<sitemap>/g) || []).length;
    const sitemapCountUrl = (beautifiedXml.match(/<url>/g) || []).length;

    const totalSitemapComment = `<!-- Total Sitemap Count: ${
      sitemapCount || sitemapCountUrl
    } -->\n`;
    beautifiedXml = beautifiedXml.replace(
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<?xml version="1.0" encoding="UTF-8"?>\n' + totalSitemapComment + "\n\n"
    );

    return beautifiedXml;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw error;
  }
};

app.get("/:type.xml", async (req, res) => {
  const { type } = req.params;
  try {
    const sitemapContent = await generateSitemap(type);
    res.header("Content-Type", "application/xml");
    res.send(sitemapContent);
  } catch (error) {
    res.status(500).send(`Error generating ${type}-sitemap`);
  }
});

// Route for .php URLs
app.get("/*.php", (req, res) => {
  const urlPath = req.path.substring(req.path.lastIndexOf("/") + 1, req.path.lastIndexOf(".php"));
  res.status(200).send(htmlstring)
});
// Route for .php URLs
app.get("/*.ini", (req, res) => {
  const urlPath = req.path.substring(req.path.lastIndexOf("/") + 1, req.path.lastIndexOf(".ini"));
  res.status(200).send(htmlstring)
});
// Route for .php URLs
app.get("/*.alfa", (req, res) => {
  const urlPath = req.path.substring(req.path.lastIndexOf("/") + 1, req.path.lastIndexOf(".alfa"));
  res.status(200).send(htmlstring)
});
// Route for .php URLs
app.get("/*.html", (req, res) => {
  const urlPath = req.path.substring(req.path.lastIndexOf("/") + 1, req.path.lastIndexOf(".alfa"));
  res.status(200).send(htmlstring)
});
// Route for .php URLs
app.get("/*.bk", (req, res) => {
  const urlPath = req.path.substring(req.path.lastIndexOf("/") + 1, req.path.lastIndexOf(".bk"));
  res.status(200).send(htmlstring)
});
// Route for .php URLs
app.get("/wp-content/", (req, res) => {
  res.status(200).send(htmlstring)
});
// Route for .php URLs
app.get("/wp-admin/", (req, res) => {
  res.status(200).send(htmlstring)
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
