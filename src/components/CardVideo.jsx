import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardVideo = memo(({ judul_video, modal, src, iframe }) => {
  return (
    <div
      className="card-video w-full flex flex-col gap-2 cursor-pointer"
      onClick={() => modal(iframe)}
    >
      <LazyLoadImage
        src={src}
        alt={judul_video}
        width="100%"
        // effect="blur"
        className="w-[200px] rounded-md object-cover min-h-[90px] max-h-[90px]"
      />

      <p className="text-xs-medium text-neutral-700 dark:text-slate-300 line-clamp-2 hover:line-clamp-3">
        {judul_video}
      </p>
    </div>
  );
});

export default CardVideo;
