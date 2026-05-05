import React, { useEffect, useRef, useState } from "react";
import SectionLayout from "../SectionLayout";
import { CardLiputan, SecondaryButton } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { useGetDataFromApi } from "../../Func/GlobalFunction";
import { useTranslation } from "react-i18next";
import { DUMMY_BERITA, DUMMY_ARTIKEL } from "../../utils/dummyData";

const LiputanSection = ({ classname, type = "berita", variant }) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  const endpoint = type === "artikel" ? "artikel/kajian" : "liputan";
  const { data } = useGetDataFromApi(endpoint);

  const dummyData = type === "artikel"
    ? (DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"] || [])
    : (DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || []);

  const finalData = (data && data.length > 0) ? data : dummyData;

  const titleKey = type === "artikel" ? "artikel" : "berita";

  // ! data

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  // ! function
  const handleSwiper = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleNext = () => {
    swiperRef.current.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.slidePrev();
  };
  return (
    <SectionLayout
      title={titleKey}
      arrow={true}
      classname={"w-full"}
      variant={variant}
      isBeginning={isBeginning}
      isEnd={isEnd}
      handleNext={handleNext}
      handlePrev={handlePrev}
    >
      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          handleSwiper(swiper);
        }}
        initialSlide={0}
        modules={[Navigation]}
        onSlideChange={(swiper) => handleSwiper(swiper)}
        className="w-full"
      >
        {[...finalData].reverse().map((item, index) => (
          <SwiperSlide key={item.id || item._id}>
            <CardLiputan liputan={item} type={type} variant={variant} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SecondaryButton path={`/kumpulan/${type}`} variant={variant} />
    </SectionLayout>
  );
};

export default LiputanSection;
