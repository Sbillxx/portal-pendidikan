import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { parse as parseDate, format, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { useConvertLang } from "../Func/GlobalFunction";
import { Carousel } from "flowbite-react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineCalendar,
  HiOutlineClock,
} from "react-icons/hi";
import ShareButton from "./ShareButton";
import { get_thumbnail } from "../utils/variable";

const ContentCard = memo(
  ({ badge, img, title, text, tanggal, waktu, source, konten, pageName }) => {
    const { t } = useTranslation();
    const today = moment().format("dddd");
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const convertedDate = useConvertLang(konten || {}, "tanggal");

    // ! Image Variable
    const images = React.useMemo(() => {
      if (Array.isArray(img)) return img;
      if (konten?.gambar && Array.isArray(konten.gambar)) return konten.gambar;
      return img ? [img] : [];
    }, [img, konten]);

    // ! Parse Date
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

      return null;
    };

    // ! Get Day Name Function
    const getDayName = (dateString) => {
      const date = parseDateString(dateString);
      if (!date || date === undefined) return today;
      return format(date, "EEEE", { locale: id });
    };

    useEffect(() => {
      const loadImages = () => {
        const imagePromises = images.map((imagePath) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = getImageUrl(imagePath);
            img.onload = () => resolve(imagePath);
            img.onerror = () => resolve(null);
          });
        });

        Promise.all(imagePromises).then((loadedImages) => {
          setImagesLoaded(loadedImages.filter(Boolean));
        });
      };

      loadImages();
    }, [images]);

    // ! Get Image URL Function
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "/placeholder-image.jpg";
      if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
      return `${get_thumbnail}${imagePath}`;
    };

    // ! Component Render Image
    const renderImages = () => {
      if (images.length <= 0) return null;

      if (images.length === 1) {
        return (
          <div className="w-full relative">
            <img
              src={getImageUrl(images[0])}
              alt={title}
              className="rounded-lg w-full"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          </div>
        );
      }

      return (
        <div className="w-full">
          <Carousel
            slide={false}
            className="relative w-full h-full"
            leftControl={
              <div className="dark:bg-neutral-800 bg-neutral-50 rounded-full h-10 w-10 flex items-center justify-center">
                <HiArrowLeft className="text-neutral-900 dark:text-neutral-300 h-5 w-5" />
              </div>
            }
            rightControl={
              <div className="dark:bg-neutral-800 bg-neutral-50 rounded-full h-10 w-10 flex items-center justify-center">
                <HiArrowRight className="text-neutral-900 dark:text-neutral-300 h-5 w-5" />
              </div>
            }
            indicators={true}
          >
            {images.map((imagePath, i) => (
              <div key={i} className="relative w-full h-auto">
                <img
                  src={getImageUrl(imagePath)}
                  alt={`${title} ${i + 1}`}
                  className="rounded-lg w-full h-auto"
                  loading={i === 0 ? "eager" : "eager"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      );
    };

    return (
      <article className="flex flex-col gap-8 lg:w-6/12 order-first">
        <div className="flex flex-col gap-3">
          <div className="badge"> {t(`title.section.${(badge || "").replace(/\s+/g, "").toLowerCase()}`)}</div>

          {/* Main heading for the content */}
          <h1 className="text-2xl-semibold text-neutral-900 dark:text-slate-300">
            {useConvertLang(konten, "title")}
          </h1>

          {/* Subheading for source information if available */}
          {source && (
            <h2 className="text-small-regular text-neutral-900 dark:text-neutral-400">
              {source}
            </h2>
          )}
          {renderImages()}
        </div>

        {/* Date and time information section */}
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4">
          <h3 className="flex items-center gap-2 text-neutral-500">
            <span className="text-small-medium dark:text-neutral-400 flex items-center gap-2">
              <HiOutlineCalendar />
              {convertedDate}
            </span>

            {waktu && (
              <span className="text-small-medium dark:text-neutral-400 flex items-center gap-2">
                <HiOutlineClock />
                {waktu},
              </span>
            )}

            <span className="text-small-medium text-idi-700 font-semibold pl-2">
              {t(
                `days.${getDayName(tanggal) === "Minggu"
                  ? "ahad"
                  : getDayName(tanggal).toLowerCase()
                }`
              )}
            </span>
          </h3>

          <ShareButton
            title={`${pageName} - ${title || ""}`}
            imageUrl={getImageUrl(images[0])}
            description={text?.replace(/<[^>]*>/g, "").slice(0, 160)}
            id={konten?.id || konten?._id}
            content={konten}
            pageName={pageName}
          />
        </div>

        {/* Content text section */}
        <div
          className="content-body text-neutral-700 text-small-medium dark:text-neutral-400 break-words whitespace-normal [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800"
          dangerouslySetInnerHTML={{
            __html: useConvertLang(konten, "deskripsi"),
          }}
        />
      </article>
    );
  }
);

ContentCard.displayName = "ContentCard";

export default ContentCard;
