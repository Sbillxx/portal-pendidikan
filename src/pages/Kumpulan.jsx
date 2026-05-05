import { MainLayout, SectionLayout } from "../layouts";
import { CardArtikel, Pagination, SocialKajian } from "../components";
import {
  getConvertLang,
  useConvertLang,
  useGetDataFromApi,
  usePagination,
} from "../Func/GlobalFunction";
import { useParams } from "react-router-dom";
import { get_thumbnail } from "../utils/variable";
import { useEffect } from "react";
import { DUMMY_BERITA, DUMMY_ARTIKEL } from "../utils/dummyData";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../Func/LanguageContext";

const Kumpulan = () => {
  const { params } = useParams();
  const { i18n } = useTranslation();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  const { data } = useGetDataFromApi(
    params.includes("-") ? params.replace("-", "/") : params
  );

  // Injeksi data dummy jika API kosong
  const dummyBerita = DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || [];
  const dummyArtikel = DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"] || [];

  const finalData = (data && Array.isArray(data) && data.length > 0) ? data : (
    (params === "berita" || params === "liputan") ? dummyBerita : (
      params === "artikel" ? dummyArtikel : []
    )
  );

  const sidebarType = (params === "berita" || params === "liputan") ? "artikel" : "berita";
  const pagename = (params === "berita" || params === "liputan") ? "berita" : "artikel";
  const { currentItems, handlePageChange, totalPages, currentPage } =
    usePagination(finalData);

  // Update document title untuk analytics
  useEffect(() => {
    const dynamicTitle = `Tarekat Idrisiyyah - ${pagename.charAt(0).toUpperCase() + pagename.slice(1)}`;
    document.title = dynamicTitle;
  }, [pagename]);

  const CardKumpulan = ({ ele }) => {
    const getThumbnailUrl = (img) => {
      const firstImg = Array.isArray(img) ? img[0] : img;
      if (!firstImg) return "/placeholder-image.jpg";
      if (firstImg.startsWith("/")) return firstImg;
      return `${get_thumbnail}${firstImg}`;
    };

    const { bahasa } = useLanguage();
    const title = getConvertLang(ele, "title", bahasa);
    const date = getConvertLang(ele, "tanggal", bahasa);
    const desc = getConvertLang(ele, "deskripsi", bahasa);

    return (
      <CardArtikel
        page={params}
        name={"kajian"}
        date={date}
        desc={desc}
        title={title}
        time={ele.waktu}
        source={ele.narasumber || ele.penulis}
        thumbnail={getThumbnailUrl(ele.gambar)}
        id={ele.id || ele._id}
      />
    );
  };

  const dynamicTitle = `Tarekat Idrisiyyah - ${pagename.charAt(0).toUpperCase() + pagename.slice(1)}`;

  return (
    <MainLayout title={dynamicTitle}>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SectionLayout title={pagename} classname={"lg:w-3/5"}>
          {[...currentItems].reverse().map((ele, i) => (
            <CardKumpulan ele={ele} key={i} />
          ))}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

        </SectionLayout>
        <SocialKajian type={sidebarType} />
      </div>
    </MainLayout>
  );
};

export default Kumpulan;