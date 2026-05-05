const fs = require("fs");
const axios = require("axios");
const path = require("path");
const https = require("https");

console.log("Starting sitemap generation...");

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const baseUrl = "https://api.idrisiyyah.or.id:3000";
const websiteUrl = "https://idrisiyyah.or.id"; // URL website frontend

// Konfigurasi untuk setiap endpoint
const endpoints = [
  {
    path: "/artikel/kajian",
    changefreq: "daily",
    priority: "0.8",
    urlPattern: (item) =>
      `/content/artikel-kajian/${item.id || item._id}/${generateSlug(item.judul_artikel)}`,
  },
  {
    path: "/agenda",
    changefreq: "weekly",
    priority: "0.7",
    urlPattern: (item) =>
      `/content/agenda/${item.id || item._id}/${generateSlug(item.judul)}`,
  },
  {
    path: "/profile",
    changefreq: "monthly",
    priority: "0.6",
    urlPattern: (item) =>
      `/content/profile/${item.id || item._id}/${generateSlug(item.judul)}`,
  },
  {
    path: "/liputan",
    changefreq: "weekly",
    priority: "0.7",
    urlPattern: (item) =>
      `/content/liputan/${item.id || item._id}/${generateSlug(item.judul)}`,
  },
  {
    path: "/videokajian",
    changefreq: "weekly",
    priority: "0.8",
    urlPattern: (item) =>
      `/content/videokajian/${item.id || item._id}/${generateSlug(item.judul_videokajian)}`,
  },
  {
    path: "/infografik",
    changefreq: "weekly",
    priority: "0.7",
    urlPattern: (item) =>
      `/content/infografik/${item.id || item._id}/${generateSlug(item.judul)}`,
  },
];

// Fungsi untuk membuat slug
function generateSlug(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Fungsi validasi dan fallback tanggal
function validateDate(date) {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate) ? parsedDate.toISOString() : new Date().toISOString();
}

async function generateSitemap() {
  console.log("Initializing sitemap generation...");

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  // Tambahkan homepage
  sitemap += `  <url>
    <loc>${websiteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;

  // Tambahkan halaman statis penting
  const staticPages = ["/livestreaming"];
  staticPages.forEach((page) => {
    sitemap += `  <url>
    <loc>${websiteUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
  });

  // Proses endpoint dinamis
  for (const endpoint of endpoints) {
    console.log(`Processing endpoint: ${endpoint.path}`);
    try {
      const response = await axios.get(`${baseUrl}${endpoint.path}`);
      const items = response.data;

      if (Array.isArray(items)) {
        console.log(`Found ${items.length} items for ${endpoint.path}`);
        items.forEach((item) => {
          const updatedAt = validateDate(item.updatedAt || item.tanggal);
          const url = endpoint.urlPattern(item);

          if (url) {
            let firstImage = "";
            
            if (Array.isArray(item.gambar)) {
              // Jika gambar berbentuk array, ambil elemen pertama
              firstImage = item.gambar.length > 0 ? item.gambar[0] : "";
            } else if (typeof item.gambar === "string") {
              // Jika gambar berbentuk string, pisahkan dengan koma (jika ada banyak)
              const images = item.gambar.split(",").map((img) => img.trim());
              firstImage = images.length > 0 ? images[0] : "";
            }

            sitemap += `  <url>
    <loc>${websiteUrl}${url}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>${endpoint.changefreq}</changefreq>
    <priority>${endpoint.priority}</priority>${
      firstImage
        ? `
    <image:image>
      <image:loc>https://www.idrisiyyah.or.id/uploads/${firstImage}</image:loc>
    </image:image>`
        : ""
    }
  </url>\n`;
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint.path}:`, error.message);
    }
  }

  sitemap += `</urlset>`;

  // Tuliskan file ke disk
  try {
    const publicDir = path.resolve(__dirname, "../public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(filePath, sitemap);
    console.log(`Sitemap successfully generated at: ${filePath}`);
  } catch (error) {
    console.error("Error writing sitemap file:", error.message);
  }
}

// Jalankan generate sitemap
generateSitemap()
  .then(() => console.log("Sitemap generation completed successfully"))
  .catch((error) => {
    console.error("Error during sitemap generation:", error.message);
    process.exit(1);
  });
