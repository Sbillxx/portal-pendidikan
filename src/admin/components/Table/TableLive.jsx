import { Link, useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import DeleteModal from "../DeleteModal";
import { useHandleDelete } from "../../../Func/GlobalFunction";
import Toaster from "../Toaster";
import { useEffect, useState } from "react";

const TableLive = ({ data, page, refresher }) => {
  const [showToast, setShowToast] = useState("");
  const [toastVisible, setToastVisible] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;

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
            <Table.HeadCell>Platform</Table.HeadCell>
            <Table.HeadCell>Status Live</Table.HeadCell>
            <Table.HeadCell>Link Live</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {[...data].reverse().map((ele, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell>{ele.platform}</Table.Cell>

                <Table.Cell>
                  {ele.status === "live" ? "sedang live" : "tidak sedang live"}
                </Table.Cell>

                <Table.Cell>{ele.url}</Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/admincms/${page}/${ele.id || ele._id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-cyan-500 mr-2"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* open modal */}
        <DeleteModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          namaItem={judulItem}
          deleteFunction={`${base_url}/agenda/delete/${idItem}`}
          refresher={refresher}
        />
        {/* open modal */}
      </div>
    </>
  );
};

export default TableLive;
