import SectionLayout from "../layouts/SectionLayout";
import { Card, SecondaryButton } from ".";
import { useConvertLang, useGetDataFromApi } from "../Func/GlobalFunction";
import { useTranslation } from "react-i18next";
import { get_thumbnail } from "../utils/variable";
import { DUMMY_ARTIKEL, DUMMY_BERITA } from "../utils/dummyData";

const KajianSection = ({ type = "artikel" }) => {
  const endpoint = type.includes("-") ? type.replace("-", "/") : type;
  const { data } = useGetDataFromApi(endpoint);
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  const dummyData = type === "berita"
    ? (DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"])
    : (DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"]);

  const finalData = (data && data.length > 0) ? data : dummyData;

  const titleKey = type === "berita" ? "berita" : "artikel";

  const KajianCard = ({ ele }) => {
    const getThumbnailUrl = (img) => {
      const firstImg = Array.isArray(img) ? img[0] : img;
      if (!firstImg) return "/placeholder-image.jpg";
      if (firstImg.startsWith("/")) return firstImg;
      return `${get_thumbnail}${firstImg}`;
    };

    const isNews = type === "berita";

    return (
      <Card
        page={type}
        name={"kajian"}
        id={ele.id || ele._id}
        badge={false}
        date={useConvertLang(ele, "tanggal")}
        time={ele.waktu}
        img={getThumbnailUrl(ele.gambar)}
        layout={"row"}
        penceramah={ele.narasumber || ele.penulis}
        text={t(`nav.${isNews ? 'berita' : 'artikelkajian'}`)}
        title={useConvertLang(ele, "title")}
      />
    );
  };

  return (
    <SectionLayout title={titleKey}>
      <div className="flex flex-col gap-4">
        {[...finalData].reverse().slice(0, 4).map((ele, i) => (
          <KajianCard ele={ele} key={i} />
        ))}
        <SecondaryButton path={`/kumpulan/${type}`} />
      </div>
    </SectionLayout>
  );
};

export default KajianSection;
