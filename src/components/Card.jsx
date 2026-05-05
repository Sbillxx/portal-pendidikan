import { memo } from "react";
import { Link } from "react-router-dom";
import { useConvertToSlug } from "../Func/GlobalFunction";

const Card = memo(
  ({
    page,
    id,
    img,
    date,
    penceramah,
    title,
    text,
    badge,
    time,
    isPenceramah,
  }) => {
    const slug = useConvertToSlug(title);
    // Backup image jika gagal load
    const fallbackImage = "/placeholder-image.jpg"; // Simpan placeholder di public folder

    const handleImageError = (e) => {
      // Hanya ganti ke fallback image jika current src bukan fallback
      if (e.target.src !== fallbackImage) {
        e.target.src = fallbackImage;
      }
      // Remove error handler setelah fallback diterapkan
      e.target.onerror = null;
    };

    return (
      <Link
        to={`/content/${page}/${id}/${slug}`}
        className="flex flex-col gap-2"
      >
        <div className="card flex items-start gap-4 flex-col lg:flex-row">
          <img
            src={img}
            alt={title}
            className="lg:w-1/3 min-w-36 min-h-20 max-h-52 lg:max-h-28 rounded-md object-cover"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="text-card flex flex-col gap-2 w-full">
            {badge && (
              <div className="text-xs-medium py-1 px-2 w-fit bg-idi-800 rounded-lg text-white">
                {text}
              </div>
            )}

            <h2 className="text-small-semibold text-neutral-900 line-clamp-2 dark:text-slate-300">
              {title}
            </h2>

            <div className="flex flex-col">
              {isPenceramah && (
                <p className="text-xs-semibold text-neutral-600 dark:text-neutral-400">
                  {penceramah}
                </p>
              )}
              <div className="flex items-center gap-2 text-neutral-500 flex-wrap">
                <p className="text-xs-medium dark:text-neutral-400">{date}</p>
                {time && (
                  <>
                    <div className="divider h-[12px] w-[0.5px] bg-neutral-400" />
                    <p className="text-xs-medium dark:text-neutral-400">
                      {time}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

Card.displayName = "Card";

export default Card;
