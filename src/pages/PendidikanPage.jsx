import { MainLayout, SectionLayout } from "../layouts";
import { SocialKajian } from "../components";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const PendidikanPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={"Tarekat Idrisiyyah - Pendidikan"}>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SectionLayout title={"education"} classname={"lg:w-3/5"}>
          <p className="text-neutral-700 text-small-medium dark:text-slate-300">
            {parse(t("pendidikan"))}
          </p>
        </SectionLayout>
        <SocialKajian />
      </div>
    </MainLayout>
  );
};

export default PendidikanPage;
