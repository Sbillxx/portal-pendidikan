import { Link, useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import DeleteModal from "../DeleteModal";
import { useHandleDelete } from "../../../Func/GlobalFunction";
import Toaster from "../Toaster";
import { useEffect, useState } from "react";
import { base_url, get_thumbnail } from "../../../utils/variable";

const TableLiputan = ({ data, page, refresher }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { handleModal, idItem, judulItem, openModal, setOpenModal } =
    useHandleDelete();
  const location = useLocation();

  // Toast notification effect
  useEffect(() => {
    if (location.state?.isSukses) {
      setShowToast(true);
      setToastVisible(true);

      const hideToastTimeout = setTimeout(() => {
        setShowToast(false);
        setTimeout(() => setToastVisible(false), 300);
      }, 3000);

      return () => clearTimeout(hideToastTimeout);
    }
  }, [location]);

  // Scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Toaster showtoast={showToast} visible={toastVisible} />

      <div className="table-container shadow-none outline-none border-none">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Sebagai Headline</Table.HeadCell>
            <Table.HeadCell>Thumbnail</Table.HeadCell>
            <Table.HeadCell>Judul</Table.HeadCell>
            <Table.HeadCell>Narasumber</Table.HeadCell>
            <Table.HeadCell>Tanggal</Table.HeadCell>
            <Table.HeadCell>Waktu</Table.HeadCell>
            <Table.HeadCell>Deskripsi</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {[...data].reverse().map((ele, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={ele._id || ele.id || index}
              >
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
                <Table.Cell>
                  <div className="flex flex-col items-start gap-2 relative">
                    <p className="table-badge absolute">1/{ele.gambar.length}</p>
                    <img
                      className="w-full max-w-32"
                      src={`${get_thumbnail}${
                        Array.isArray(ele.gambar) ? ele.gambar[0] : ele.gambar
                      }`}
                      alt={ele.judul}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white line-clamp-3 truncate max-w-72">
                  <div className="flex items-start gap-2">
                    {index === 0 && (
                      <p className="text-xs px-2 py-1 rounded-full w-fit uppercase bg-idi-200 text-idi-800">
                        Baru
                      </p>
                    )}
                    <p className="truncate">{ele.judul}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>{ele.narasumber}</Table.Cell>
                <Table.Cell>{ele.tanggal}</Table.Cell>
                <Table.Cell>{ele.waktu}</Table.Cell>
                <Table.Cell>
                  <p
                    className="line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: ele.deskripsi }}
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admincms/${page}/${ele._id || ele.id}`}
                      className="font-medium text-blue-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                    <button
                      aria-label="table-delete-button"
                      onClick={() => handleModal(ele._id || ele.id, ele.judul)}
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

      <DeleteModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        namaItem={judulItem}
        deleteFunction={`${base_url}/liputan/delete/${idItem}`}
        refresher={refresher}
      />
    </>
  );
};

export default TableLiputan;
