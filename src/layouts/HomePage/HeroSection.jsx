import { memo } from "react";
import AgendaSection from "./AgendaSection";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  useConvertLang,
  useConvertToSlug,
  useGetDoubleData,
} from "../../Func/GlobalFunction";
import { ImageComponent } from "../../components";

const HeroSection = () => {

  const { data } = useGetDoubleData();

  const NoHeadlinePlaceholder = () => (
    <article className="h-72 lg:h-[465px] bg-gray-100 rounded-lg flex items-center justify-center"></article>
  );

  return (
    <section
      className="hero-section flex flex-col xl:flex-row justify-between gap-8 w-full"
      aria-labelledby="hero-section-heading"
    >
      <div className="xl:w-7/12 w-full">
        <div className="h-fit xl:h-fit 2xl:h-fit">
          {!data || data.length === 0 ? (
            <NoHeadlinePlaceholder />
          ) : (
            <Carousel
              leftControl={
                <button
                  className="dark:bg-neutral-800 bg-neutral-50/70 rounded-full h-10 w-10 flex items-center justify-center"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-6 h-6 text-neutral-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              }
              rightControl={
                <button
                  className="dark:bg-neutral-800 bg-neutral-50/70 rounded-full h-10 w-10 flex items-center justify-center"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-6 h-6 text-neutral-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              }
              className="text-transparent flex gap-2"
              slideInterval={2000}
            >
              {data.map((ele, i) => (
                <ImageComponent key={i} ele={ele} />
              ))}
            </Carousel>
          )}
        </div>
      </div>
      <AgendaSection />
    </section>
  );
};

export default HeroSection;
