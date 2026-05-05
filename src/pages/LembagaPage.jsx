import { MainLayout, SectionLayout } from "../layouts";
import { SocialKajian } from "../components";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const LembagaPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout title={"Tarekat Idrisiyyah - Lembaga"}>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SectionLayout title={"institution"} classname={"lg:w-3/5"}>
          <p className="text-neutral-700 text-small-medium dark:text-slate-300">
            {parse(t("lembaga"))}
          </p>
        </SectionLayout>
        <SocialKajian />
      </div>
    </MainLayout>
  );
};

export default LembagaPage;
