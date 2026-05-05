import MainLayout from "./MainLayout";
import { SectionLayout } from ".";
import { SocialKajian } from "../components";
import { memo } from "react";

const SecondLayout = memo(({ children, title }) => {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SectionLayout title={title} classname={"lg:w-3/5"}>
          {children}
        </SectionLayout>
        <SocialKajian />
      </div>
    </MainLayout>
  );
});

export default SecondLayout;
