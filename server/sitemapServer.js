// Frontend: server/sitemapServer.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve sitemap.xml statically
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint untuk menerima sitemap dari backend
app.post('/api/sitemap', async (req, res) => {
  try {
    const { sitemap } = req.body;
    
    // Pastikan direktori public ada
    const publicPath = path.join(__dirname, '../public');
    await fs.mkdir(publicPath, { recursive: true });
    
    // Tulis sitemap ke file
    await fs.writeFile(path.join(publicPath, 'sitemap.xml'), sitemap);
    
    res.status(200).json({ message: 'Sitemap updated successfully' });
  } catch (error) {
    console.error('Error saving sitemap:', error);
    res.status(500).json({ message: 'Error saving sitemap', error: error.message });
  }
});

const PORT = process.env.SITEMAP_SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Sitemap server running on port ${PORT}`);
});