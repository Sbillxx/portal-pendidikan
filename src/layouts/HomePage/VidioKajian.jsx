import React, { useEffect, useRef, useState } from "react";
import SectionLayout from "../SectionLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CardVideo, SecondaryButton } from "../../components";
import { Navigation } from "swiper/modules";
import { useGetDataFromApi } from "../../Func/GlobalFunction";
import { useLanguage } from "../../Func/LanguageContext";
import { get_thumbnail } from "../../utils/variable";

const VidioKajian = () => {
  const { data } = useGetDataFromApi("videokajian");
  const { bahasa } = useLanguage();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

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

  const [preview, setPreview] = useState(false);
  const [frameSrc, setFrameSrc] = useState();

  const showPreview = (frame) => {
    setPreview(!preview);
    setFrameSrc(frame);
  };

  useEffect(() => {
    if (frameSrc) {
      if (frameSrc.includes("instagram.com")) {
        if (!window.instgrm) {
          const script = document.createElement('script');
          script.src = '//www.instagram.com/embed.js';
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          };
        } else {
          window.instgrm.Embeds.process();
        }
      } else if (frameSrc.includes("tiktok.com")) {
        if (!window.tiktok) {
          const script = document.createElement('script');
          script.src = 'https://www.tiktok.com/embed.js';
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => {
            if (window.tiktok) {
              window.tiktok.loadEmbedScript();
            }
          };
        } else {
          window.tiktok.loadEmbedScript();
        }
      }
    }
  }, [frameSrc]);

  const getVideoId = (url) => {
    const regex = /\/video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const renderVideoEmbed = (link) => {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      return (
        <iframe
          className="h-[300px] lg:h-[400px] w-full rounded-lg"
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      );
    } else if (link.includes("instagram.com")) {
      return (
        <blockquote
          className="instagram-media rounded-[3px] max-w-[550px] min-w-[326px] min-h-[326px] p-0 m-0 w-[calc(100%-2px)] overflow-y-scroll"
          data-instgrm-permalink={link}
          data-instgrm-version="14"
        ></blockquote>
      );
    } else if (link.includes("tiktok.com")) {
      return (
        <blockquote
          className="tiktok-embed rounded-[3px] max-w-[500px] min-w-[326px] min-h-[326px] p-0 m-0 w-[calc(100%-2px)] overflow-y-scroll"
          cite={link}
          data-video-id={getVideoId(link)}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              className="text-blue-500 hover:underline"
            >
              Loading TikTok embed...
            </a>
          </section>
        </blockquote>
      );
    } else {
      return <p>Unsupported video platform.</p>;
    }
  };

  return (
    <SectionLayout
      title={"videokajian"}
      arrow={true}
      classname={"w-full xl:w-7/12"}
      handleNext={handleNext}
      handlePrev={handlePrev}
      isBeginning={isBeginning}
      isEnd={isEnd}
    >
      <Swiper
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
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
        className="w-full xl:max-w-[594px]"
      >
        {[...data].reverse().map((ele, index) => (
          <SwiperSlide key={index}>
            <CardVideo
              judul_video={
                bahasa === "ar"
                  ? ele.judul_videoArab
                  : bahasa === "en"
                    ? ele.judul_videoEng
                    : ele.judul_video
              }
              modal={showPreview}
              src={`${get_thumbnail}${ele.gambar}`}
              iframe={ele.link_video}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SecondaryButton path={"/kumpulan/videokajian"} />
      {preview && (
        <div className="w-full h-full fixed z-50 inset-0 bg-neutral-500/40 flex items-center justify-center p-5">
          <div className="max-w-[600px] lg:min-w-[600px] items-end gap-3 h-max rounded-lg bg-white dark:bg-neutral-800 flex flex-col p-3">
            <div className="max-h-[400px] w-full overflow-y-scroll">
              {renderVideoEmbed(frameSrc)}
            </div>
            <button
              aria-label="close"
              onClick={() => setPreview(false)}
              className="text-small-semibold text-center lg:w-fit px-3 py-2 bg-idi-800 dark:bg-idi-700 text-white rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};

export default VidioKajian;
