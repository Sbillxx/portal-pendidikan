import { MainLayout } from "../../layout";
import { HeaderList, TableLiputan } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const Liputan = () => {
  const {data, getData} = useGetDataFromApi('liputan')  
  return (
    <MainLayout>
      <HeaderList
        path={"/admincms/liputan/tambahliputan"}
        title={"Konten Liputan"}
      />
      <TableLiputan page={"liputan"} data={data} refresher={getData} />
    </MainLayout>
  );
};

export default Liputan;
