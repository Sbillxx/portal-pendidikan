import { MainLayout } from "../../layout";
import { HeaderList, TableAgenda } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const ListAgenda = () => {
  const {data, getData } = useGetDataFromApi('agenda')
  
  return (
    <MainLayout>
      <HeaderList path={"/admincms/agenda/add"} title={"Agenda"} />
      <TableAgenda data={data} page={"agenda"} pageDaftarHadir={"agenda/daftar-hadir"} kategori={'agenda'} refresher={getData}/>
    </MainLayout>
  );
};

export default ListAgenda;
