import { HeaderList, TableArtikel } from "../../components";
import { MainLayout } from "../../layout";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const ListArtikel = () => {
  const {data, getData} = useGetDataFromApi('artikel/info')

  return (
    <MainLayout>
      <HeaderList path={"/admincms/artikel/info/add"} title={"Artikel Info"} />
      <TableArtikel data={data} refresher={getData} />
    </MainLayout>
  );
};

export default ListArtikel;
