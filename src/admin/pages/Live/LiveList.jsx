import { MainLayout } from "../../layout";
import { HeaderList, TableLive } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const LiveList = () => {
    const {data, getData } = useGetDataFromApi('live')
    
  return (
    <MainLayout>
      <HeaderList title={"Live Streaming"} />

      <TableLive
        data={data}
        page={"live"}
        kategori={"live"}
        refresher={getData}
      />
      
    </MainLayout>
  );
};

export default LiveList;
