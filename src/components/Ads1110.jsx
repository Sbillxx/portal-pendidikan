import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { get_thumbnail } from "../utils/variable";

const Ads1110 = memo(({ data }) => {
  const src = (data.gambar?.startsWith("/") || data.gambar?.startsWith("http"))
    ? data.gambar
    : `${get_thumbnail}${data.gambar}`;

  return (
    <a href={data.url} className="max-h-48 rounded-xl w-full block overflow-hidden">
      <LazyLoadImage
        src={src}
        alt={data.judul || "Iklan"}
        className="w-full max-h-40 object-cover rounded-lg"
        width="100%"
        height="auto"
      // effect="blur"
      />
    </a>
  );
});

export default Ads1110;
