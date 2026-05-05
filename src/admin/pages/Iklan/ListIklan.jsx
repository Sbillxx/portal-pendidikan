import { MainLayout } from "../../layout";
import { HeaderList, Success } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";
import TableIklan from "../../components/Table/TableIklan";

const ListIklan = () => {
  const { data, getData } = useGetDataFromApi("iklan");
    
  return (
    <MainLayout>
      <HeaderList path={"/admincms/iklan/add"} title={"Iklan"} />
      <TableIklan data={data} refresher={getData} />
    </MainLayout>
  );
};

export default ListIklan;
