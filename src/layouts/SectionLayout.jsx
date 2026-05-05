import { memo } from "react";
import { HeaderSection } from "../components";

const SectionLayout = memo(({
  title,
  arrow,
  children,
  classname,
  isEnd,
  isBeginning,
  handlePrev,
  handleNext,
  variant,
}) => {
  return (
    <section className={`hero-section flex flex-col gap-4 ${classname}`}>
      <HeaderSection
        title={title}
        arrow={arrow}
        handleNext={handleNext}
        handlePrev={handlePrev}
        isBeginning={isBeginning}
        isEnd={isEnd}
        variant={variant}
      />
      {children}
    </section>
  );
});

export default SectionLayout;
