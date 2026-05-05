import { SectionLayout } from "../layouts";
import Card from "./Card";
import { useConvertLang, useGetDataFromApi } from "../Func/GlobalFunction";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { get_thumbnail } from "../utils/variable";

const PopularNews = memo(({ route, name }) => {
  const { data } = useGetDataFromApi(route);
  const { t } = useTranslation();

  const Popular = ({ ele }) => {
    const getThumbnailUrl = (img) => {
      const firstImg = Array.isArray(img) ? img[0] : img;
      if (!firstImg) return "/placeholder-image.jpg";
      if (firstImg.startsWith("/") || firstImg.startsWith("http")) return firstImg;
      return `${get_thumbnail}${firstImg}`;
    };

    return (
      <Card
        page={route === "liputan" ? "berita" : (route.includes("/") ? route.split("/").join("-") : route)}
        name={name}
        layout={"row"}
        id={ele.id || ele._id}
        badge={true}
        date={useConvertLang(ele, "tanggal")}
        time={ele.waktu}
        img={getThumbnailUrl(ele.gambar)}
        penceramah={ele.narasumber}
        text={t("title.section.sorotan")}
        title={useConvertLang(ele, "title")}
      />
    );
  };

  return (
    <SectionLayout title={"popularNews"}>
      <div className="flex flex-col gap-4">
        {data.slice(0, 5).map((ele, i) => (
          <Popular ele={ele} key={i} />
        ))}
      </div>
    </SectionLayout>
  );
});

export default PopularNews;
