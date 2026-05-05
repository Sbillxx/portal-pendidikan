import React, { useMemo } from "react";
import { MainLayout } from "../../layout";
import { HeaderList, TableNotifikasi } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";

const ListNotifikasi = () => {
  const { data, getData } = useGetDataFromApi("notifikasi");

  // Menggunakan useMemo untuk memproses data
  const latestData = useMemo(() => {
    // Filter data yang tidak null
    const validData = data.filter(
      (item) => item.judul !== null && item.pesan !== null
    );

    // Urutkan berdasarkan ObjectId (yang terbaru di atas)
    const sortedData = validData.sort((a, b) => {
      // ObjectId lebih besar berarti lebih baru
      return b.id.localeCompare(a.id);
    });

    // Ambil 10 data teratas
    return sortedData.slice(0, 10).reverse();
  }, [data]);

  return (
    <MainLayout>
      <HeaderList
        path={"/admincms/notifikasi/add"}
        title={`Notifikasi terkini`}
      />
      <TableNotifikasi data={latestData} refresher={getData} />
    </MainLayout>
  );
};

export default ListNotifikasi;
