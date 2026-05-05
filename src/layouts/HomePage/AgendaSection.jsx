import { SecondaryButton } from "../../components";
import SectionLayout from "../SectionLayout";
import { Link } from "react-router-dom";
import {
  getConvertLang,
  useArabDateParsing,
  useConvertLang,
  useConvertToSlug,
  useDateParsing,
  useEngDateParsing,
  useGetDataFromApi,
  useDayName,
} from "../../Func/GlobalFunction";
import { parse, format, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { useLanguage } from "../../Func/LanguageContext";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { HiClock } from "react-icons/hi";
import { Badge } from "flowbite-react";
import Pulse from "../../components/Pulse";
import { DUMMY_AGENDA } from "../../utils/dummyData";

const AgendaSection = () => {
  const { t, i18n } = useTranslation();
  const { bahasa } = useLanguage();
  const { data: apiData } = useGetDataFromApi("agenda");
  const { getDayName, getTranslatedDayName, formatDate: sharedFormatDate } = useDayName();

  const today = moment().format("DD MMMM YYYY");
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  const dummy = DUMMY_AGENDA[currentLang] || DUMMY_AGENDA["id"] || [];
  const data = (apiData && apiData.length > 0) ? apiData : dummy;

  // Fungsi untuk parsing tanggal dari format API
  const parseApiDate = (dateString) => {
    if (!dateString) return moment().subtract(1000, 'years');

    // Handle Indonesian month names even if in other locales
    const indonesianMonths = {
      'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
      'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };

    const parts = dateString.split(' ');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = indonesianMonths[parts[1]];
      const year = parts[2];

      if (month && year !== '0001') {
        const parsedDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        if (parsedDate.isValid()) return parsedDate;
      }
    }

    const fallbackDate = moment(dateString, ['DD MMMM YYYY', 'D MMMM YYYY', 'DD MMM YYYY', 'D MMM YYYY', 'MMMM DD, YYYY']);
    if (fallbackDate.isValid()) return fallbackDate;

    return moment().subtract(1000, 'years');
  };

  const { formatDate } = useDateParsing();
  const { formatEnglishDate } = useEngDateParsing();
  const { formatArabDate } = useArabDateParsing();

  const AgendaCard = ({ ele }) => {
    const slug = useConvertToSlug(getConvertLang(ele, "title", "id"));
    const itemId = ele.id || ele._id;
    const itemDate = ele.tanggal || today;

    return (
      <article className="agenda-card flex flex-col gap-2">
        <Link
          key={itemId}
          to={`/content/agenda/${itemId}/${slug}`}
          className="flex flex-col gap-2"
          aria-label={`Read agenda details for ${getConvertLang(ele, "title", bahasa)}`}
        >
          <div className="card flex items-start gap-4">
            <div
              className="angka w-full max-w-[100px] flex-col h-full min-h-[95px] max-h-[95px] text-center text-white rounded bg-gradient-to-b from-idi-700 to-idi-700 flex items-center justify-center p-2"
              aria-label="Date and day information"
            >
              <p className="text-small-regular">
                {getTranslatedDayName(itemDate)}
              </p>
              <p className="text-lg-semibold">
                {bahasa === "ar" && formatArabDate(ele.tanggalArab || ele.tanggal)}
                {bahasa === "en" && formatEnglishDate(ele.tanggalEng || ele.tanggal)}
                {bahasa === "id" && formatDate(ele.tanggal)}
              </p>
            </div>

            <header className="text-card flex flex-col gap-2 flex-1">
              {ele.tanggal === today && (
                <Badge
                  color="failure"
                  className="w-max px-3 py-1 bg-gradient-to-r flex items-center shadow-lg bg-neutral-100 rounded-full border border-neutral-300 text-idi-900"
                  aria-label="Today's agenda"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-idi-900 font-bold">AGENDA HARI INI</span>
                  </div>
                </Badge>
              )}
              <h2 className="text-base-semibold lg:text-xl-semibold text-neutral-900 dark:text-slate-300 flex items-center pl-1">
                {(() => {
                  if (ele.waktuTayang) {
                    const waktuTayang = moment(ele.waktuTayang, "HH:mm");
                    const sekarang = moment();
                    const selisihMenit = sekarang.diff(waktuTayang, "minutes");

                    if (selisihMenit >= 0 && selisihMenit <= 120) {
                      return <Pulse />;
                    }
                  }
                  return null;
                })()}
                <span className="line-clamp-2 flex-1">
                  {getConvertLang(ele, "title", bahasa)}
                </span>
              </h2>
              <h3 className="text-xs-medium dark:text-neutral-400 text-neutral-600">
                {getConvertLang(ele, "narasumber", bahasa) || t("agenda.noSpeaker") || "No speaker information"}
              </h3>
              <div className="flex items-center gap-2 text-neutral-500 flex-wrap">
                <h4 className="text-xs-medium dark:text-neutral-400">
                  {getConvertLang(ele, "tanggal", bahasa)}
                </h4>
                {ele.waktu && (
                  <>
                    <div className="divider h-[12px] w-[0.5px] bg-neutral-400"></div>
                    <p className="text-xs-medium dark:text-neutral-400">
                      {ele.waktu}
                    </p>
                  </>
                )}
                <div className="divider h-[12px] w-[0.5px] bg-neutral-400"></div>
                <p className="text-xs-medium text-idi-700 font-semibold">
                  {getTranslatedDayName(itemDate)}
                </p>
              </div>
            </header>
          </div>
        </Link>
      </article>
    );
  };

  return (
    <SectionLayout
      title="agenda"
      arrow={false}
      classname="w-full xl:w-5/12"
      aria-labelledby="agenda-section-title"
    >
      <div className="flex flex-col gap-4">
        {[...data]
          .sort((a, b) => {
            const dateA = parseApiDate(a.tanggal);
            const dateB = parseApiDate(b.tanggal);
            return dateB.isBefore(dateA) ? -1 : 1;
          })
          .slice(0, 3)
          .map((ele, index) => (
            <AgendaCard ele={ele} key={index} />
          ))}
      </div>
      <SecondaryButton path={"/kumpulan/agenda"} />
    </SectionLayout>
  );
};

export default AgendaSection;