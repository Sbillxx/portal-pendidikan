import { MainLayout } from "../../layout";
import { HeaderList, TableList } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const VideoKajian = () => {
  const { data, getData } = useGetDataFromApi("videokajian");  

  return (
    <MainLayout>
      <HeaderList
        path={"/admincms/videokajian/tambahvideo"}
        title={"Vidio kajian"}
      />
      <TableList data={data} page={"videokajian"} refresher={getData} />
    </MainLayout>
  );
};

export default VideoKajian;
