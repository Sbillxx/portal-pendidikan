import { MainLayout } from "../../layout";
import { HeaderList, TabelInfo } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const ListInfografik = () => {
  const { data, getData } = useGetDataFromApi("infografik");

  return (
    <MainLayout>
      <HeaderList path={"/admincms/infografik/add"} title={"Infografik"} />
      <TabelInfo data={data} page={"infografik"} refresher={getData} />
    </MainLayout>
  );
};

export default ListInfografik;
