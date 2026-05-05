import React, { useEffect } from "react";
import { MainLayout } from "../layouts";
import { SocialKajian } from "../components";
import ContentCard from "../components/ContentCard";
import { useParams } from "react-router-dom";
import { useConvertLang, useFindContent } from "../Func/GlobalFunction";
import { useTranslation } from "react-i18next";

const SorotanDetail = () => {
  const { id } = useParams();
  const { contentFound } = useFindContent("agenda", id);
  const { t } = useTranslation();

  const Sorotan = ({ ele }) => {
    return (
      <ContentCard
        konten={ele}
        source={ele.narasumber}
        img={ele.gambar}
        title={useConvertLang(ele, "title")}
        badge={t("title.section.sorotan")}
        text={useConvertLang(ele, "deskripsi")}
        tanggal={ele.tanggal}
        waktu={ele.waktu}
      />
    );
  };
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SocialKajian />
        {contentFound ? <Sorotan ele={contentFound} /> : "konten tidak d temukan"}
      </div>
    </MainLayout>
  );
};

export default SorotanDetail;
