import parse from "html-react-parser";
import { Carousel } from "flowbite-react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { parse as parseDate, format, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useConvertLang } from "../Func/GlobalFunction";
import moment from "moment";
import { memo } from "react";
import { get_thumbnail } from "../utils/variable";

const ContentCardMultiple = memo(
  ({ badge, img, title, text, tanggal, waktu, source, konten }) => {
    const { t } = useTranslation();
    const today = moment().format("DD MMMM YYYY");

    const parseDateString = (dateString) => {
      const formats = [
        "d MMMM yyyy",
        "dd MMMM yyyy",
        "d MMM yyyy",
        "dd MMM yyyy",
        "yyyy-MM-dd",
        "dd-MM-yyyy",
      ];

      for (let fmt of formats) {
        const date = parseDate(dateString, fmt, new Date(), { locale: id });
        if (isValid(date)) {
          return date;
        }
      }

      console.error(`Unable to parse date: ${dateString}`);
      return null;
    };

    const getDayName = (dateString) => {
      const date = parseDateString(dateString);
      if (!date || date === undefined) return today;

      return format(date, "EEEE", { locale: id });
    };

    const LiputanImage = ({ ele, title }) => {
      return (
        <img
          src={`${get_thumbnail}${ele}`}
          alt={title}
          loading="lazy"
          className="rounded-lg object-cover w-full"
        />
      );
    };

    return (
      <div className="flex flex-col gap-8 lg:w-6/12 order-first lg:order-first">
        <div className="flex flex-col gap-3">
          <div className="badge text-small-medium w-fit bg-idi-900 rounded-md py-2 px-4 text-white font-medium">
            {badge}
          </div>
          <h1 className="text-xl-semibold text-neutral-900 dark:text-slate-300">
            {title}
          </h1>

          <h2 className="text-small-regular text-neutral-900 dark:text-slate-300">
            oleh, {source}
          </h2>

          <div className="flex items-center gap-2 text-neutral-500 divide-x-2">
            <p className="text-small-medium dark:text-neutral-400">
              {useConvertLang(konten, "tanggal")}
            </p>

            {waktu && (
              <p className="text-small-medium dark:text-neutral-400 pl-2">
                {waktu}
              </p>
            )}

            <p className="text-small-medium text-idi-700 font-semibold pl-2">
              {t(
                `days.${
                  getDayName(tanggal) === "Minggu"
                    ? "ahad"
                    : getDayName(tanggal).toLocaleLowerCase()
                }`
              )}
            </p>
          </div>

          {Array.isArray(img) ? (
            <Carousel
              className="relative h-max w-full group"
              leftControl={
                <div className="bg-slate-200/50 rounded-full p-2 transition-all duration-300 group-hover:visible invisible">
                  <HiArrowLeft className="text-neutral-700" />
                </div>
              }
              rightControl={
                <div className="bg-slate-200/50 rounded-full p-2 transition-all duration-300 group-hover:visible invisible">
                  <HiArrowRight className="text-neutral-700" />
                </div>
              }
              slideInterval={2000}
            >
              {img.map((ele, i) => (
                <LiputanImage ele={ele} title={title} key={i} />
              ))}
            </Carousel>
          ) : (
            <img
              src={`${get_thumbnail}${img}`}
              alt={title}
              className="w-full h-auto"
              loading="eager"
            />
          )}
        </div>

        <div className="text-neutral-700 text-small-medium dark:text-slate-300">
          {parse(text)}
        </div>
      </div>
    );
  }
);

export default ContentCardMultiple;
