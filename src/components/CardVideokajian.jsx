import React, { memo } from "react";

const CardVideokajian = memo(({
  thumbnail,
  source,
  date,
  title,
  desc,
  time,
  newLink,
  onShowPreview
}) => {
  return (
    <article
      onClick={() => onShowPreview(newLink)}
      className="flex flex-col gap-2 py-3 border-b dark:border-b-neutral-400 cursor-pointer"
    >
      <div className="card flex flex-col lg:flex-row items-start gap-4">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="lg:w-2/5 rounded-lg w-full max-h-52"
            loading="lazy"
          />
        )}
        <div className="text-card flex flex-col gap-2">
          {/* Main title of the video */}
          <h2 className="text-base-semibold line-clamp-2 lg:text-xl-semibold text-neutral-900 dark:text-slate-300">
            {title}
          </h2>

          {/* Source and metadata section */}
          {source && (
            <div className="flex flex-col gap-2">
              {/* Source information as a subheading */}
              <h2 className="text-xs-medium text-neutral-700 dark:text-neutral-400">{source}</h2>
              
              {/* Time and date information */}
              <div className="flex flex-row items-center gap-2 divide-x-2">
                <time className="text-xs-medium text-neutral-700 dark:text-neutral-400" dateTime={date}>{date}</time>
                <time className="text-small-semibold text-neutral-900 px-3" dateTime={time}>{time}</time>
              </div>
            </div>
          )}

          {/* Description section */}
          <div
            className="text-sm-medium lg:text-small-medium text-neutral-700 dark:text-neutral-400 line-clamp-2 lg:line-clamp-4"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
      </div>
    </article>
  );
});

CardVideokajian.displayName = 'CardVideokajian';

export default CardVideokajian;