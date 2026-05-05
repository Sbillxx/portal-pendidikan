// server/index.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const https = require("https");
const generateSitemap = require("./sitemap-generator");

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://api.idrisiyyah.or.id:3000";
const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL || "http://localhost:3001";
const GA_TRACKING_ID = "G-W3G7HCQ6EL"; 
const indexPath = path.resolve(__dirname, "../build/index.html");

let sitemapGenerationInProgress = false;
let lastSitemapGeneration = 0;
const SITEMAP_GENERATION_INTERVAL = 24 * 60 * 60 * 1000;

// Create axios instance with SSL handling
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// Serve static files
app.use(express.static(path.join(__dirname, "../build")));

async function fetchContent(page, id) {
  try {
    let endpoints = [];
    switch (page) {
      case "artikel-kajian":
        endpoints = ["/artikel/kajian"];
        break;
      case "liputan":
        endpoints = ["/liputan"];
        break;
      case "agenda":
        endpoints = ["/agenda"];
        break;
      case "videokajian":
        endpoints = ["/videokajian"];
        break;
      case "artikel-info":  
        endpoints = ["/artikel/info"];
        break;
      case "headline":
        endpoints = ["/liputan", "/artikel/kajian"];
        break;
      case "infografik":
        endpoints = ["/infografik"];
        break;
      case "profile":
        endpoints = ["/profile"];
        break;
      default:
        throw new Error("Unknown content type");
    }

    if (endpoints.length > 1) {
      const responses = await Promise.all(
        endpoints.map((endpoint) => axiosInstance.get(`${BASE_URL}${endpoint}`))
      );
      const combinedData = responses.flatMap((response) => response.data);
      return combinedData.find(
        (content) => content._id === id || content.id === id
      );
    }

    const response = await axiosInstance.get(`${BASE_URL}${endpoints[0]}`);
    return response.data.find(
      (content) => content._id === id || content.id === id
    );
  } catch (error) {
    console.error(`Error fetching ${page}:`, error);
    return null;
  }
}

function cleanHtml(str) {
  return str.replace(/\n\s*/g, "").replace(/>\s+</g, "><").trim();
}

function getContentMeta(content, page) {
  let title = "";
  let description = "";

  switch (page) {
    case "artikel-kajian":
      title = content.judul_artikel;
      description = content.deskripsi;
      break;
    case "liputan":
      title = content.judul;
      description = content.deskripsi;
      break;
    case "agenda":
      title = content.judul;
      description = content.deskripsi;
      break;
    case "videokajian":
      title = content.judul_video;
      description = content.deskripsi;
      break;
    case "artikel-info":
      title = content.judul_artikel;
      description = content.deskripsi;
      break;
    case "headline":
      title = content.judul_artikel ? content.judul_artikel : content.judul;
      description = content.deskripsi;
      break;
    case "infografik":
      title = content.judul;
      description = content.deskripsi;
      break;
    default:
      title = content.judul || content.judul_artikel || "";
      description = content.deskripsi || "";
  }

  return {
    title,
    description: description.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

// Function to get Google Analytics script
function getAnalyticsScript(trackingId, currentUrl, title) {
  const pathname = new URL(currentUrl).pathname;

  return `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      gtag('config', '${trackingId}', {
        send_page_view: false,
        custom_map: {
          custom_title: 'page_title'
        }
      });
      
      // Kirim multiple events untuk memastikan title terekam
      gtag('event', 'page_view', {
        page_title: '${title.replace(/'/g, "\\'")}',
        page_location: '${currentUrl}',
        page_path: '${pathname}',
        custom_title: '${title.replace(/'/g, "\\'")}',
        send_to: '${trackingId}'
      });
      
      gtag('event', 'custom_page_view', {
        event_category: 'navigation',
        event_label: '${title.replace(/'/g, "\\'")}',
        page_title: '${title.replace(/'/g, "\\'")}',
        page_path: '${pathname}',
        send_to: '${trackingId}'
      });
      
      // Update document title untuk memastikan konsistensi
      document.title = '${title.replace(/'/g, "\\'")}';
      
      window.__INITIAL_PAGE__ = {
        path: '${pathname}',
        title: '${title.replace(/'/g, "\\'")}',
        tracked: true,
        timestamp: ${Date.now()}
      };
      
      console.log('SSR Analytics: Tracked', '${pathname}', 'with title:', '${title.replace(
    /'/g,
    "\\'"
  )}');
    </script>
  `;
}
function updateHtml(html, content, page, req) {
  const currentUrl = `${FRONTEND_URL}${req.originalUrl}`;

  if (!content) {
    // For pages without specific content, still add analytics
    const defaultTitle = "Idrisiyyah - Media Pergerakan Tasawuf";
    const analyticsScript = getAnalyticsScript(
      GA_TRACKING_ID,
      currentUrl,
      defaultTitle
    );

    return html.replace("</head>", `${analyticsScript}</head>`);
  }

  const { title, description } = getContentMeta(content, page);
  const fullTitle = `${title} - Idrisiyyah`;

  console.log("Tipe Konten:", page);
  console.log("Struktur Konten:", JSON.stringify(content, null, 2));

  const gambarPath = Array.isArray(content.gambar)
    ? content.gambar.length === 1
      ? content.gambar[0]
      : content.gambar[0]
    : content.gambar;

  console.log("Path Gambar:", gambarPath);

  const imageUrl = content.gambar
    ? `https://www.idrisiyyah.or.id/uploads/${gambarPath}`
    : "";

  console.log("URL Gambar Final:", imageUrl);

  const existingHead = html.match(/<head>[\s\S]*?<\/head>/i)[0];
  const preservedTags = existingHead.match(/<link[^>]*?\/?>/g) || [];
  const preservedScripts =
    existingHead.match(/<script[^>]*?>[\s\S]*?<\/script>/g) || [];

  // Get analytics script
  const analyticsScript = getAnalyticsScript(
    GA_TRACKING_ID,
    currentUrl,
    fullTitle
  );

  const metaTags = cleanHtml(`
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${fullTitle}</title>
      
      <meta name="title" content="${title}">
      <meta name="description" content="${description}">
      
      <meta property="og:type" content="article">
      <meta property="og:url" content="${currentUrl}">
      <meta property="og:site_name" content="Idrisiyyah">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      ${
        imageUrl
          ? `
      <meta property="og:image" content="${imageUrl}">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="og:image:type" content="image/jpeg">`
          : ""
      }
      
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:url" content="${currentUrl}">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      ${imageUrl ? `<meta name="twitter:image" content="${imageUrl}">` : ""}
      
      ${preservedTags.join("")}
      
      ${analyticsScript}
      
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify({
          currentContent: content,
          contentType: page,
        })};
      </script>
      ${preservedScripts.join("")}
    </head>
  `);

  console.log("Meta Tags yang Dihasilkan:", metaTags);

  return html.replace(/<head>[\s\S]*?<\/head>/i, metaTags);
}

// Handle content routes
app.get(
  ["/content/:page/:id/:slug", "/headline/:id/:slug"],
  async (req, res) => {
    try {
      const { page, id } = req.params;
      const contentType = req.path.startsWith("/headline") ? "headline" : page;

      console.log(`Fetching ${contentType} with ID:`, id);

      const content = await fetchContent(contentType, id);
      console.log("Content found:", content ? "yes" : "no");

      const now = Date.now();
      if (
        !sitemapGenerationInProgress &&
        now - lastSitemapGeneration > SITEMAP_GENERATION_INTERVAL
      ) {
        sitemapGenerationInProgress = true;
        await generateSitemap(BASE_URL, FRONTEND_URL);
        lastSitemapGeneration = now;
        sitemapGenerationInProgress = false;
      }

      if (!content) {
        console.log("Content not found, sending 404");
        return res
          .status(404)
          .sendFile(path.join(__dirname, "../build/index.html"));
      }

      fs.readFile(indexPath, "utf8", (err, htmlData) => {
        if (err) {
          console.error("Error reading index.html:", err);
          return res.status(500).send("Error reading index.html");
        }

        const updatedHtml = updateHtml(htmlData, content, contentType, req);

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        return res.send(updatedHtml);
      });
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).send("Server error");
    }
  }
);

// Handle other routes with analytics
const publicRoutes = [
  "/",
  "/bisnis",
  "/lembaga",
  "/pendidikan",
  "/livestreaming",
  "/kumpulan/:params",
];

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/sitemap.xml"));
});

app.get("/sitemap.xml.gz", (req, res) => {
  res.header("Content-Encoding", "gzip");
  res.sendFile(path.join(__dirname, "../build/sitemap.xml.gz"));
});

app.get(publicRoutes, (req, res) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading index.html:", err);
      return res.status(500).send("Error reading index.html");
    }

    // Add analytics to public routes too
    const updatedHtml = updateHtml(htmlData, null, null, req);
    res.send(updatedHtml);
  });
});

// Handle 404
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../build/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Application error:", err);
  res.status(500).sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});
