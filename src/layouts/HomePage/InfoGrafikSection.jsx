import SectionLayout from "../SectionLayout";
import { SecondaryButton } from "../../components";
import { Link } from "react-router-dom";
import {
  useConvertLang,
  useConvertToSlug,
  useGetDataFromApi,
} from "../../Func/GlobalFunction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { get_thumbnail } from "../../utils/variable";

const InfoGrafikSection = ({ variant }) => {
  const { data } = useGetDataFromApi("infografik");

  const InfografikCard = ({ ele }) => {
    const slug = useConvertToSlug(ele.judul);
    return (
      <Link
        to={`/content/infografik/${ele.id}/${slug}`}
        className="info-grafik-card flex flex-col gap-4"
      >
        <LazyLoadImage
          src={`${get_thumbnail}${ele.gambar[0]}`}
          alt="infografik-thumbnail"
          width="100%"
          height="auto"
          // effect="blur"
          className="h-[500px] w-[400px] object-cover rounded-2xl "
        />
        <p className="text-sm font-semibold text-neutral-600 dark:text-slate-300">
          {useConvertLang(ele, "title")}
        </p>
      </Link>
    );
  };

  return (
    <SectionLayout title="infografik" arrow={false} variant={variant}>
      <div className="flex flex-col lg:grid lg:grid-cols-3 xl:flex-row gap-8">
        {[...data]
          .reverse()
          .slice(0, 3)
          .map((ele, i) => (
            <InfografikCard ele={ele} key={i} />
          ))}
      </div>
      <SecondaryButton path={"/kumpulan/infografik"} variant={variant} />
    </SectionLayout>
  );
};

export default InfoGrafikSection;
