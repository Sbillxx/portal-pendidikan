import { Helmet } from "react-helmet";

const Meta = ({ title, description, image, url, type = "website" }) => {
  // Fungsi untuk mengambil nama file dari URL
  const getImageName = (imageUrl) => {
    if (!imageUrl) return "";
    try {
      return imageUrl.split("/").pop();
    } catch (error) {
      console.error("Error getting image name:", error);
      return "";
    }
  };

  // Dapatkan nama file gambar
  const imageName = getImageName(image);

  // Base URL untuk gambar
  const baseImageUrl = "https://www.idrisiyyah.or.id/uploads/";

  // URL gambar lengkap
  const fullImageUrl = baseImageUrl + imageName;

  return (
    <Helmet>
      {/* Standar */}
      <title>{title}</title>
      <meta
        name="description"
        content={
          description ||
          "Tarekat Idrisiyyah dikenal sebagai tarekat yang dibawa oleh Syaikh al-Akbar Abdul Fattah sejak 1930, melestarikan ajaran tasawuf dan pendidikan Islam."
        }
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          description ||
          "Tarekat Idrisiyyah dikenal sebagai tarekat yang dibawa oleh Syaikh al-Akbar Abdul Fattah sejak 1930, melestarikan ajaran tasawuf dan pendidikan Islam."
        }
      />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type || "article"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={
          description ||
          "Tarekat Idrisiyyah dikenal sebagai tarekat yang dibawa oleh Syaikh al-Akbar Abdul Fattah sejak 1930, melestarikan ajaran tasawuf dan pendidikan Islam."
        }
      />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};

export default Meta;
