import { MainLayout } from "../../layout";
import { HeaderList, TableSorotan } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";
import { useEffect, useState } from "react";
import moment from "moment";

const ListSorotan = () => {
  const { data } = useGetDataFromApi("agenda");

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const today = moment();

    const sortedData = data
      .map((item) => ({
        ...item,
        selisih: Math.abs(moment(item.tanggal, "DD MMMM YYYY").diff(today)),
      }))
      .sort((a, b) => a.selisih - b.selisih)
      .slice(0, 5);

    setFilteredData(sortedData);
  }, [data]);
  
  return (
    <MainLayout>
      <HeaderList title={"Sorotan"} />
      <TableSorotan data={filteredData} />
    </MainLayout>
  );
};

export default ListSorotan;
