import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";
import parse from "html-react-parser";
import DeleteModal from "../DeleteModal";
import { useHandleDelete } from "../../../Func/GlobalFunction";
import Toaster from "../Toaster";
import { base_url, get_thumbnail } from "../../../utils/variable";

const TableArtikelKajian = ({ data, refresher, type }) => {
  const [showToast, setShowToast] = useState("");
  const [toastVisible, setToastVisible] = useState("");
  const { handleModal, idItem, judulItem, openModal, setOpenModal } =
    useHandleDelete();

  const location = useLocation();

  // ! useEffect
  useEffect(() => {
    if (location.state?.isSukses) {
      setShowToast(true);
      setTimeout(() => {
        setToastVisible(true);
      }, 100);

      setTimeout(() => {
        setShowToast(false);
        setTimeout(() => {
          setToastVisible(false);
        }, 300);
      }, 3000);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Toaster showtoast={showToast} visible={toastVisible} />
      <div className="table-container">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Sebagai Headline</Table.HeadCell>
            <Table.HeadCell>Thumbnail</Table.HeadCell>
            <Table.HeadCell>Judul</Table.HeadCell>
            <Table.HeadCell>Narasumber</Table.HeadCell>
            <Table.HeadCell>Tanggal</Table.HeadCell>
            <Table.HeadCell>Waktu</Table.HeadCell>
            <Table.HeadCell>Deskripsi</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {[...data].reverse().map((ele, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="w-max">
                    {ele.headline ? (
                      <p
                        className={`font-semibold text-center ${
                          ele.headline === "true"
                            ? "text-idi-800 bg-idi-200 table-badge"
                            : "table-badge"
                        }`}
                      >
                        {ele.headline === "true" ? "Aktif" : "Tidak Aktif"}
                      </p>
                    ) : (
                      <p className="table-badge font-semibold text-center">
                        Tidak Aktif{" "}
                      </p>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell className="">
                  <img
                    className="w-full max-w-32"
                    src={`${get_thumbnail}${ele.gambar}`}
                    alt={ele.judul}
                    srcset=""
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white line-clamp-3 truncate max-w-72">
                  <div className="flex items-start gap-2">
                    {index === 0 && (
                      <p className=" text-idi-800 uppercase px-2 py-1 bg-idi-200 rounded-full text-xs w-fit">
                        baru
                      </p>
                    )}
                    <p className="truncate">{ele.judul_artikel || ele.judul}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>{ele.narasumber}</Table.Cell>
                <Table.Cell>{ele.tanggal}</Table.Cell>
                <Table.Cell className="">
                  <p>{ele.waktu}</p>
                </Table.Cell>

                <Table.Cell>
                  <p className="line-clamp-2">
                    {ele.deskripsi && parse(ele.deskripsi)}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/admincms/artikel/kajian/${ele._id}`}
                      className="font-medium text-blue-600 hover:underline dark:text-cyan-500 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      aria-label="table-delete-button"
                      onClick={() =>
                        handleModal(ele._id || ele.id, ele.judul_artikel)
                      }
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* open modal */}
      <DeleteModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        namaItem={judulItem}
        deleteFunction={`${base_url}/artikel/kajian/delete/${idItem}`}
        refresher={refresher}
      />
      {/* open modal */}
    </>
  );
};

export default TableArtikelKajian;
