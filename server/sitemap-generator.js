const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const { createGzip } = require('zlib');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function generateSitemap(BASE_URL, FRONTEND_URL) {
  try {
    // Fetch all content
    const endpoints = [
      '/artikel/kajian',
      '/liputan',
      '/agenda',
      '/videokajian',
      '/artikel/info',
      '/infografik',
      '/profile'
    ];

    const responses = await Promise.all(
      endpoints.map(endpoint =>
        axios.get(`${BASE_URL}${endpoint}`, {
          httpsAgent: new (require('https')).Agent({
            rejectUnauthorized: false
          })
        })
      )
    );

    // Prepare links array for sitemap
    let links = [
      { url: '/', changefreq: 'daily', priority: 1 },
      { url: '/bisnis', changefreq: 'weekly', priority: 0.8 },
      { url: '/lembaga', changefreq: 'weekly', priority: 0.8 },
      { url: '/pendidikan', changefreq: 'weekly', priority: 0.8 },
      { url: '/livestreaming', changefreq: 'daily', priority: 0.9 },
      { url: '/kumpulan/artikel-kajian', changefreq: 'daily', priority: 0.9 },
      { url: '/kumpulan/liputan', changefreq: 'daily', priority: 0.9 }
    ];

    // Process content for sitemap
    responses.forEach((response, index) => {
      const items = response.data;
      const endpoint = endpoints[index].split('/')[1] || endpoints[index].split('/')[2];

      items.forEach(item => {
        const id = item._id || item.id;
        const title = item.judul_artikel || item.judul || item.judul_video;
        const slug = title
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        if (id && slug) {
          let linkItem = {
            url: `/content/${endpoint}/${id}/${slug}`,
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date().toISOString()
          };

          // Handle images if available
          if (item.gambar && Array.isArray(item.gambar)) {
            linkItem.img = item.gambar.map(imgUrl => ({
              url: `${FRONTEND_URL}/public/${imgUrl}`
            }));
          }

          links.push(linkItem);
        }
      });
    });

    // Generate sitemap
    const stream = new SitemapStream({ hostname: FRONTEND_URL });
    const data = await streamToPromise(Readable.from(links).pipe(stream));

    // Save sitemap
    const publicDir = path.resolve(__dirname, '../build');
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), data);

    // Create gzipped version
    const gzipped = await streamToPromise(Readable.from(data).pipe(createGzip()));
    await fs.writeFile(path.join(publicDir, 'sitemap.xml.gz'), gzipped);

    console.log('Sitemap generated successfully');
    return true;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return false;
  }
}

module.exports = generateSitemap;
