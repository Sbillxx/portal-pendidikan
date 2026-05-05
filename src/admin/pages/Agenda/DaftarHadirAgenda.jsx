import { MainLayout } from "../../layout";
import { TableDaftarHadirAgenda } from "../../components";
import { useGetDataFromApi } from "../../../Func/GlobalFunction";
import { Breadcrumb } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";

const DaftarHadirAgenda = () => {
  const { id } = useParams();

  const { data, getData } = useGetDataFromApi("agenda", "daftar-hadir", id);

  return (
    <MainLayout>
      <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
        <Link to={`/admincms/agenda`}>
          <Breadcrumb.Item>Semua Agenda</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item href="#" icon={HiUser} className="text-gray-500">
          Daftar Hadir
          <span className="font-bold pl-1 text-idi-700">
            {" "}
            ({data.length} Jemaah Hadir){" "}
          </span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <TableDaftarHadirAgenda
        data={data}
        page={"agenda"}
        pageDaftarHadir={"daftar-hadir"}
        kategori={"agenda"}
        refresher={getData}
      />
    </MainLayout>
  );
};

export default DaftarHadirAgenda;
