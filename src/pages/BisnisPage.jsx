import { MainLayout, SectionLayout } from "../layouts";
import { SocialKajian } from "../components";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const BisnisPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={"Tarekat Idrisiyyah - Bisnis"}>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SectionLayout title={"business"} classname={"lg:w-3/5"}>
          <p className="text-neutral-700 text-small-medium dark:text-slate-300">
            {parse(t("ekonomi"))}
          </p>
        </SectionLayout>
        <SocialKajian />
      </div>
    </MainLayout>
  );
};

export default BisnisPage;
