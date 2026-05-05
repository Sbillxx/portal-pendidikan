import SectionLayout from "../SectionLayout";
import { Card, SecondaryButton } from "../../components";
import { getConvertLang, useGetDataFromApi } from "../../Func/GlobalFunction";
import { useTranslation } from "react-i18next";
import { get_thumbnail } from "../../utils/variable";
import { DUMMY_ARTIKEL } from "../../utils/dummyData";
import { useLanguage } from "../../Func/LanguageContext";

const Kajian = ({ variant }) => {
  const { data: apiData } = useGetDataFromApi("artikel/kajian");
  const { t, i18n } = useTranslation();
  const { bahasa } = useLanguage();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  const dummyData = DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"] || [];
  const data = (apiData && apiData.length > 0) ? apiData : dummyData;

  const KajianCard = ({ ele }) => {
    const imgSrc = ele.gambar?.startsWith("/") ? ele.gambar : `${get_thumbnail}${ele.gambar}`;
    const title = getConvertLang(ele, "title", bahasa);

    return (
      <Card
        page={"artikel"}
        name={"kajian"}
        id={ele.id || ele._id}
        date={ele.tanggal}
        time={ele.waktu}
        img={imgSrc}
        layout={"row"}
        penceramah={ele.narasumber}
        text={t("nav.articles")}
        title={title}
      />
    );
  };

  return (
    <SectionLayout title={"artikel"} classname={"w-full"} variant={variant}>
      <div className="content-container flex flex-col h-full justify-between gap-8">
        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
          {[...data].reverse().slice(0, 6).map((kajian, index) => (
            <KajianCard ele={kajian} key={index} />
          ))}
        </div>
        <SecondaryButton path={"/kumpulan/artikel"} variant={variant} />
      </div>
    </SectionLayout>
  );
};

export default Kajian;
