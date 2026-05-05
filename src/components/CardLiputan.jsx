import { TanggalWaktu } from "./index";
import { Link } from "react-router-dom";
import { useConvertLang, useConvertToSlug } from "../Func/GlobalFunction";
import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { get_thumbnail } from "../utils/variable";

const CardLiputan = memo(({ liputan, type = "berita", variant }) => {
  const title = useConvertLang(liputan, "title");
  const date = useConvertLang(liputan, "tanggal");
  const slug = useConvertToSlug(title);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder-image.jpg";
    if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
    return `${get_thumbnail}${imagePath}`;
  };

  const currentImage = Array.isArray(liputan.gambar) ? liputan.gambar[0] : liputan.gambar;

  return (
    <Link
      to={`/content/${type}/${liputan.id || liputan._id}/${slug}`}
      className="flex flex-col gap-3 group"
    >
      <div className="img-thumnail w-full h-[160px] bg-neutral-400 rounded-2xl overflow-hidden relative">
        <LazyLoadImage
          src={getImageUrl(currentImage)}
          alt={title}
          width="100%"
          height="auto"
          // effect="blur"
          className="img-thumnail w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {variant === "green" && (
          <div className="absolute inset-x-2 bottom-2 bg-pesantrenGreen-600/90 backdrop-blur-sm p-2 rounded-lg z-10">
            <p className="text-[10px] text-white font-Montserrat font-semibold line-clamp-2">
              {title}
            </p>
          </div>
        )}
      </div>
      <div className="content-text flex flex-col gap-1">
        <h2 className="text-small-semibold text-neutral-800 line-clamp-2 dark:text-slate-300 group-hover:text-pesantrenGreen-700 transition-colors">
          {title}
        </h2>
        <TanggalWaktu tanggal={date} />
      </div>
    </Link>
  );
});

export default CardLiputan;
