import React, { useEffect, useState } from "react";
import SectionLayout from "../SectionLayout";
import { CardSorotan } from "../../components";
import { getConvertLang, useDayName, useGetDataFromApi } from "../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../Func/LanguageContext";

import { DUMMY_BERITA } from "../../utils/dummyData";

const Sorotan = ({ variant }) => {
  const { data: apiData } = useGetDataFromApi("liputan");
  const [filteredData, setFilteredData] = useState([]);
  const { t, i18n } = useTranslation();
  const { bahasa } = useLanguage();
  const { getTranslatedDayName, getDayName } = useDayName();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  useEffect(() => {
    const dummy = DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || [];
    const data = (apiData && apiData.length > 0) ? apiData : dummy;

    const today = moment();

    const sortedData = data
      .map((item) => {
        const itemDate = moment(item.tanggal, ["DD MMMM YYYY", "D MMMM YYYY", "MMMM DD, YYYY"]);
        return {
          ...item,
          selisih: Math.abs(itemDate.diff(today)),
          internalDayName: getDayName(item.tanggal),
        };
      })
      .sort((a, b) => a.selisih - b.selisih)
      .slice(0, 5);

    setFilteredData(sortedData);
  }, [apiData, currentLang, getDayName]);

  const SorotanCard = ({ ele }) => {
    return (
      <CardSorotan
        id={ele.id}
        judul_sorotan={getConvertLang(ele, "title", bahasa)}
        kategori_sorotan={t("title.section.sorotan")}
        tanggal={getConvertLang(ele, "tanggal", bahasa)}
        waktu={ele.waktu}
        hari={getTranslatedDayName(ele.tanggal)}
      />
    );
  };

  return (
    <SectionLayout title={"sorotan"} classname={"w-full xl:w-5/12"} variant={variant}>
      <div className="sorotan-section flex flex-col lg:grid lg:grid-cols-2 xl:flex gap-6">
        {[...filteredData]
          .reverse()
          .slice(0, 3)
          .map((sorotan, index) => (
            <SorotanCard ele={sorotan} key={index} />
          ))}
      </div>
    </SectionLayout>
  );
};

export default Sorotan;
