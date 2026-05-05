import { memo } from "react";
import { Link } from "react-router-dom";
import { useConvertLang, useConvertToSlug } from "../Func/GlobalFunction";
import { GetHeadlineImage } from "../utils/function";

const ImageComponent = memo(({ ele }) => {

  const title = useConvertLang(ele, "title");
  const slug = useConvertToSlug(title);
  const { imgSrc, altText } = GetHeadlineImage(ele);

  return (
    <article className="relative">
      <Link
        to={`headline/${ele.id || ele._id}/${slug}`}
        className="block h-fit max-h-[456px] overflow-hidden"
        aria-label={`Read more about ${title}`}
      >
        <img
          src={imgSrc}
          alt={altText}
          className="rounded-lg object-cover w-full h-72 lg:h-[465px]"
          width={850}
          height={456}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </Link>
    </article>
  );
});

// Add display name for better debugging
ImageComponent.displayName = "ImageComponent";

export default ImageComponent;
