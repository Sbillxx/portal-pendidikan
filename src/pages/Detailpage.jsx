import { useConvertLang, useGetDoubleData } from "../Func/GlobalFunction";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts";
import { ContentCardMultiple, SocialKajian } from "../components";
import { LiputanSection } from "../layouts/HomePage";

const Detailpage = () => {
  const { id } = useParams();
  const { data } = useGetDoubleData();

  const Detail = ({ ele }) => {
    return (
      <ContentCardMultiple
        source={ele.narasumber}
        img={ele.gambar}
        title={useConvertLang(ele, "title")}
        badge={"Headline"}
        text={useConvertLang(ele, "deskripsi")}
        tanggal={ele.tanggal}
        waktu={ele.waktu}
        konten={ele}
      />
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        {data && data.length !== 0
          ? data.map((mainNews) =>
            mainNews.id === id || mainNews._id === id ? (
              <Detail ele={mainNews} />
            ) : null
          )
          : "tidak ada konten tersedia"}

          <SocialKajian />
      </div>
      <LiputanSection/>
    </MainLayout>
  );
};

export default Detailpage;
