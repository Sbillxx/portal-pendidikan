import { memo } from "react";
import { Link } from "react-router-dom";
import { useConvertToSlug } from "../Func/GlobalFunction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardArtikel = memo(
  ({ thumbnail, source, date, title, desc, id, page, time }) => {
    const slug = useConvertToSlug(title);

    return (
      <Link
        to={`/content/${page}/${id}/${slug}`}
        className="flex flex-col gap-2 py-3 border-b dark:border-b-neutral-500"
      >
        <div className="card flex flex-col lg:flex-row items-start gap-4">
          {thumbnail && (
            <LazyLoadImage
              src={thumbnail}
              alt={title}
              className="lg:w-2/5 min-w-72 h-52 rounded-lg object-cover"
              width="100%"
              height="auto"
              // effect="blur"
            />
          )}

          <div className="text-card flex flex-col gap-2">
            <h2 className="text-lg-semibold lg:text-xl-semibold text-neutral-900 dark:text-slate-300 line-clamp-4">
              {title}
            </h2>
            {source ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs-medium text-neutral-700 dark:text-neutral-400">
                  {source}
                </p>
                <div className="flex flex-row items-center gap-2 divide-x-2">
                  <p className="text-xs-medium text-neutral-700 dark:text-neutral-400">
                    {date}
                  </p>
                  <p className=" text-xs-medium lg:text-small-semibold text-neutral-900 dark:text-slate-300 px-3">
                    {time}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}{" "}
            <p
              className="text-sm-medium mt-2 lg:text-small-medium text-neutral-700 dark:text-neutral-400 line-clamp-2 lg:line-clamp-3"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></p>
          </div>
        </div>
      </Link>
    );
  }
);

export default CardArtikel;
