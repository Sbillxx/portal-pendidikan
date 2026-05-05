import moment from "moment";
import { useTranslation } from "react-i18next";
import { parse as parseDate, format, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { useConvertLang } from "../Func/GlobalFunction";
import EmbedComponent from "./EmbedComponent";
import ShareButton from "./ShareButton";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";
import { get_thumbnail } from "../utils/variable";

const ContentCardVideo = ({
  badge,
  img,
  title,
  text,
  tanggal,
  waktu,
  source,
  konten,
  pageName,
}) => {
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
    if (!date) return today;

    return format(date, "EEEE", { locale: id });
  };

  return (
    <div className="flex flex-col gap-8 lg:w-6/12 order-first">
      <div className="flex flex-col gap-3">
        <div className="badge cursor-pointer text-small-medium w-fit bg-idi-900 rounded-md py-2 px-4 text-white font-medium">
          {badge}
        </div>

        {/* Heading utama menggunakan H1 */}
        <h1 className="text-xl-semibold text-neutral-900 dark:text-slate-300">
          {title}
        </h1>

        {/* Subjudul atau sumber menggunakan H2 */}
        <h2 className="text-small-regular text-neutral-900 dark:text-neutral-400">
          {source}
        </h2>

        {/* Konten gambar/video */}
        {img !== "" && <EmbedComponent link={img} />}
      </div>

      <div className="flex items-center justify-between">
        {/* Tanggal dan waktu sebagai informasi tambahan */}
        <h3 className="flex items-center gap-2 text-neutral-500">
          <span className="text-small-medium dark:text-neutral-400 flex items-center gap-2">
            <HiOutlineCalendar />
            {useConvertLang(konten, "tanggal")}
          </span>

          {waktu && (
            <span className="text-small-medium dark:text-neutral-400 flex items-center gap-2">
              <HiOutlineClock />
              {waktu},
            </span>
          )}

          <span className="text-small-medium text-idi-700 font-semibold pl-2">
            {t(
              `days.${
                getDayName(tanggal) === "Minggu"
                  ? "ahad"
                  : getDayName(tanggal).toLocaleLowerCase()
              }`
            )}
          </span>
        </h3>

        {/* Tombol berbagi */}
        <ShareButton
          title={`${pageName} - ${title || "memuat.."}`}
          imageUrl={`${get_thumbnail}${img || "memuat..."}`}
          description={text}
        />
      </div>

      {/* Konten artikel */}
      <div
        className="text-neutral-700 text-small-medium dark:text-neutral-400 break-words"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
};

export default ContentCardVideo;
