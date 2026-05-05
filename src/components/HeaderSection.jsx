import { memo } from "react";
import { chevron } from "../assets";
import { useTranslation } from "react-i18next";

const HeaderSection = memo(
  ({ title, arrow, isEnd, isBeginning, handleNext, handlePrev, variant }) => {
    const { t } = useTranslation();

    const headerClass =
      variant === "green"
        ? "bg-gradient-to-r from-pesantrenGreen-800 to-pesantrenGreen-500 shadow-lg"
        : "bg-idi-800 dark:bg-idi-950";

    return (
      <div className="header-section flex items-center justify-between border-0 border-b-2 border-dotted border-neutral-300 dark:border-neutral-700 w-full mb-2 min-w-0">
        <h2
          className={`rounded-t-xl w-fit px-4 py-3 text-xs-semibold dark:text-slate-300 text-white shrink-0 ${headerClass}`}
        >
          {t(`title.section.${title}`)}
        </h2>

        {arrow && (
          <div className="flex gap-2 items-center w-fit">
            <button
              aria-label="previous"
              onClick={handlePrev}
              className={`border border-neutral-500 bg-neutral-300 hover:bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 ${isBeginning ? "opacity-50" : "opacity-100"
                }`}
            >
              <img
                src={chevron}
                alt="previous-arrow"
                className="w-3 h-3 rotate-180"
              />
            </button>
            <button
              aria-label="next"
              onClick={handleNext}
              className={`border border-neutral-500 bg-white hover:bg-neutral-100 rounded-full p-1 ${isEnd ? "opacity-50" : "opacity-100"
                }`}
            >
              <img src={chevron} alt="next-arrow" className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default HeaderSection;
