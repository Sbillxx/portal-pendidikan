// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001; // Gunakan port berbeda dari React

app.use(cors());
app.use(express.json());

// Endpoint untuk update sitemap
app.post('/update-sitemap', (req, res) => {
  try {
    const { sitemap } = req.body;
    const publicPath = path.join(__dirname, 'public');
    
    // Buat folder public jika belum ada
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }
    
    // Tulis sitemap ke file
    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating sitemap:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle post requests untuk konten baru/update
app.post(['/artikel/kajian', '/liputan', '/agenda', '/videokajian', '/artikel/info', '/infografik', '/profile'], async (req, res, next) => {
  try {
    // Lanjutkan ke next middleware
    next();
    
    // Generate sitemap setelah konten berhasil ditambah/diupdate
    await generateSitemap(BASE_URL, FRONTEND_URL);
    console.log('Sitemap updated after content change');
  } catch (error) {
    console.error('Error updating sitemap:', error);
  }
});

// Handle put/update requests
app.put(['/artikel/kajian/update/:id', '/liputan/update/:id', '/agenda/update/:id', '/videokajian/update/:id', '/artikel/info/update/:id', '/infografik/update/:id', '/profile/update/:id'], async (req, res, next) => {
  try {
    // Lanjutkan ke next middleware
    next();
    
    // Generate sitemap setelah konten diupdate
    await generateSitemap(BASE_URL, FRONTEND_URL);
    console.log('Sitemap updated after content update');
  } catch (error) {
    console.error('Error updating sitemap:', error);
  }
});

// Handle delete requests
app.delete(['/artikel/kajian/:id', '/liputan/:id', '/agenda/:id', '/videokajian/:id', '/artikel/info/:id', '/infografik/:id', '/profile/:id'], async (req, res, next) => {
  try {
    // Lanjutkan ke next middleware
    next();
    
    // Generate sitemap setelah konten dihapus
    await generateSitemap(BASE_URL, FRONTEND_URL);
    console.log('Sitemap updated after content deletion');
  } catch (error) {
    console.error('Error updating sitemap:', error);
  }
});

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  try {
    const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    
    if (fs.existsSync(sitemapPath)) {
      const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } else {
      res.status(404).send('Sitemap not found');
    }
  } catch (error) {
    res.status(500).send('Error reading sitemap');
  }
});



// Serve static files
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Sitemap server running on port ${PORT}`);
});