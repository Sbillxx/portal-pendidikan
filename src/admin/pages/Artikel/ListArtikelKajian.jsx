import { HeaderList, TableArtikelKajian } from "../../components";
import { MainLayout } from "../../layout";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const ListArtikelKajian = () => {
  
  const {data, getData} = useGetDataFromApi('artikel/kajian')  
  
  return (
    <MainLayout>
      <HeaderList
        path={"/admincms/artikel/kajian/add"}
        title={"Artikel"}
      />
      <TableArtikelKajian data={data} refresher={getData} type="kajian" />
    </MainLayout>
  );
};

export default ListArtikelKajian;
