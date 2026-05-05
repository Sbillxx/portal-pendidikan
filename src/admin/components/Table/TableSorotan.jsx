import { Table } from "flowbite-react";
import React, { useEffect } from "react";

const TableSorotan = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
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
              <Table.Cell className=" whitespace-nowrap font-medium text-gray-900 dark:text-white line-clamp-3  max-w-72">
                <p className="truncate">{ele.judul}</p>
              </Table.Cell>

              <Table.Cell>{ele.narasumber}</Table.Cell>

              <Table.Cell>{ele.tanggal}</Table.Cell>

              <Table.Cell>{ele.waktu} </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableSorotan;
