export async function getServerSideProps({ res }) {
  const baseUrl = "https://idrisiyyah.or.id"; // Ganti dengan domain Anda

  // Daftar endpoint dan prefix
  const endpoints = [
    { path: "/agenda", prefix: "#/content/agenda" },
    { path: "/articles", prefix: "#/content/articles" },
    { path: "/liputan", prefix: "#/content/liputan" },
    { path: "/videokajian", prefix: "#/content/videokajian" },
    { path: "/profile", prefix: "#/content/profile" },
    { path: "/infografik", prefix: "#/content/infografik" },
  ];

  // Fetch data dari semua endpoint
  const allData = await Promise.all(
    endpoints.map(async ({ path, prefix }) => {
      try {
        const response = await fetch(`${baseUrl}${path}`);
        const data = await response.json();
        return data.map((item) => ({
          loc: `${baseUrl}/${prefix}/${item.slug}`,
          lastmod: item.updatedAt
            ? new Date(item.updatedAt).toISOString()
            : null,
          priority: 0.8,
        }));
      } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        return [];
      }
    })
  );

  // Gabungkan semua data dari endpoint
  const sitemapEntries = allData.flat();

  // Buat sitemap XML
  const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>1.0</priority>
        </url>
        ${sitemapEntries
          .map(({ loc, lastmod, priority }) => {
            return `
            <url>
              <loc>${loc}</loc>
              ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
              <priority>${priority}</priority>
            </url>
          `;
          })
          .join("")}
      </urlset>
    `;

  // Set header dan kirim response
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  // Tidak perlu merender halaman
  return {
    props: {},
  };
}

export default function Sitemap() {
  return null; // Tidak ada output halaman
}
