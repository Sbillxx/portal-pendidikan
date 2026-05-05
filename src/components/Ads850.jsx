import { memo, useEffect, useState } from "react";
import { useGetDataFromApi } from "../Func/GlobalFunction";
import { Carousel } from "flowbite-react";
import { useLanguage } from "../Func/LanguageContext";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { get_thumbnail } from "../utils/variable";

const Ads850 = ({ data: ads }) => {
  const today = moment().format("DD MMMM YYYY");
  const { bahasa } = useLanguage();

  if (!ads) return <p className="text-white">No ads available.</p>;

  const src = (ads.gambar?.startsWith("/") || ads.gambar?.startsWith("http"))
    ? ads.gambar
    : `${get_thumbnail}${ads.gambar}`;

  return (
    <a
      href={ads.url}
      className="relative border overflow-hidden w-full h-full block rounded-lg min-h-[150px]"
    >
      <LazyLoadImage
        src={src}
        alt={ads.judul}
        loading="lazy"
        width="100%"
        height="auto"
        className="w-full h-full border object-cover rounded-lg"
      />
      <div className="bg-gradient-to-t from-neutral-700 to-transparent absolute inset-x-0 bottom-0 p-4 h-32 flex flex-col justify-end gap-2 rounded-b-lg bg-opacity-35">
        <div className="badge text-xs-medium w-fit bg-brand-600 rounded-md py-[4px] px-2 text-white">
          ADS
        </div>
        <h2 className="text-white text-xl-semibold">
          {bahasa === "ar" && (ads.judulArab || today)}
          {bahasa === "en" && (ads.judulEng || today)}
          {bahasa === "id" && (ads.judul || today)}
        </h2>
        <div className="flex gap-4 text-white text-xs-medium">
          <div className="flex items-center gap-2">
            <p>{ads.sumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              {bahasa === "ar" && (ads.tanggalArab || today)}
              {bahasa === "en" && (ads.tanggalEng || today)}
              {bahasa === "id" && (ads.tanggal || today)}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Ads850;
