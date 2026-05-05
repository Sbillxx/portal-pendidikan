import { MainLayout } from "../layouts";
import {
  HeroSection,
  InfoGrafikSection,
  Kajian,
  LiputanSection,
  Sorotan,
} from "../layouts/HomePage";
import { Ads1110, Ads850 } from "../components";
import { useGetDataFromApi } from "../Func/GlobalFunction";
import { DUMMY_IKLAN } from "../utils/dummyData";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { data: apiIklan, isLoading, error } = useGetDataFromApi("iklan");
  const { i18n } = useTranslation();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  // Use API data if available, otherwise fallback to DUMMY_IKLAN
  const iklanData = (apiIklan && apiIklan.length > 0) ? apiIklan : DUMMY_IKLAN;

  const iklan1110Array = iklanData.filter((iklan) => iklan.ukuran === "1110") || [];
  const reversed1110 = [...iklan1110Array].reverse();

  const iklan850 = iklanData.find((iklan) => iklan.ukuran === "850");

  return (
    <MainLayout>
      {/* TOP AREA */}
      <HeroSection />

      {/* MIDDLE AREA */}
      <div className="flex flex-col xl:flex-row gap-8 justify-between mt-8">
        <Kajian />
        <Sorotan />
      </div>

      <div className="mt-8">
        {reversed1110.length > 0 && (
          <Ads1110 number={1} data={reversed1110[0]} />
        )}
      </div>

      <div className="mt-8">
        <LiputanSection type="liputan" />
      </div>
    </MainLayout>
  );
};

export default HomePage;
