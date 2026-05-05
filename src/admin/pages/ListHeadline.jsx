import React from "react";
import { useGetDoubleData } from "../../Func/GlobalFunction";
import { MainLayout } from "../layout";
import { HeaderList } from "../components";
import { Table } from "flowbite-react";

const ListHeadline = () => {
  const { data } = useGetDoubleData();

  const renderBadge = (type) => {
    if (type === "artikel") {
      return (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
          Artikel
        </span>
      );
    } else if (type === "liputan") {
      return (
        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
          Liputan
        </span>
      );
    } else {
      return (
        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
          Unknown
        </span>
      );
    }
  };

  return (
    <MainLayout>
      <HeaderList title={"headline"} />
      {data && (
        <div className="table-container">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Judul</Table.HeadCell>
              <Table.HeadCell>Narasumber</Table.HeadCell>
              <Table.HeadCell>Tanggal</Table.HeadCell>
              <Table.HeadCell>Waktu</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {[...data].reverse().map((ele, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white line-clamp-3 max-w-72">
                    <div className="flex items-center gap-2">
                      {ele.judul ? renderBadge("liputan") : renderBadge("artikel") }
                      <p className="truncate">{ele.judul || ele.judul_artikel}</p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{ele.narasumber}</Table.Cell>

                  <Table.Cell>{ele.tanggal}</Table.Cell>

                  <Table.Cell>{ele.waktu}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </MainLayout>
  );
};

export default ListHeadline;
