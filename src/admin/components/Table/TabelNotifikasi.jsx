import { Table } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineBell } from "react-icons/hi";
import { useHandleDelete } from "../../../Func/GlobalFunction";
import { DeleteModal } from "..";
import { base_url } from "../../../utils/variable";
import { submitPushNotif } from "../../../lib/functions";

const TabelNotifikasi = ({ data, refresher }) => {
  const { handleModal, idItem, judulItem, openModal, setOpenModal } =
    useHandleDelete();
  const [sendingStatus, setSendingStatus] = useState({});

  const handleSendNotification = async (notification) => {
    // Set loading state untuk notifikasi spesifik
    setSendingStatus((prev) => ({
      ...prev,
      [notification.id]: { loading: true },
    }));

    try {
      const notifSent = await submitPushNotif(
        {
          title: notification.judul,
          message: notification.pesan,
        },
        (status) => {
          setSendingStatus((prev) => ({
            ...prev,
            [notification.id]: { message: status, loading: false },
          }));

          // Clear status after 3 seconds
          setTimeout(() => {
            setSendingStatus((prev) => {
              const newState = { ...prev };
              delete newState[notification.id];
              return newState;
            });
          }, 3000);
        },
        "push-notif"
      );

      if (!notifSent) {
        throw new Error("Gagal mengirim notifikasi");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setSendingStatus((prev) => ({
        ...prev,
        [notification.id]: {
          message: "Gagal mengirim notifikasi",
          loading: false,
          error: true,
        },
      }));
    }
  };

  return (
    <div className="table-container">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Judul</Table.HeadCell>
          <Table.HeadCell>Pesan Notifikasi</Table.HeadCell>
          <Table.HeadCell>Aksi</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {[...data].reverse().map((ele, index) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white line-clamp-3 max-w-72">
                <p className="truncate">{ele.judul}</p>
              </Table.Cell>
              <Table.Cell>{ele.pesan}</Table.Cell>
              <Table.Cell className="flex items-center gap-x-5">
                <>
                  <button
                    className={`flex items-center gap-2 px-3 py-1 rounded ${
                      sendingStatus[ele.id]?.loading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-colors`}
                    onClick={() => handleSendNotification(ele)}
                    disabled={sendingStatus[ele.id]?.loading}
                  >
                    <HiOutlineBell className="w-4 h-4" />
                    {sendingStatus[ele.id]?.loading
                      ? "Mengirim..."
                      : "Kirim Ulang"}
                  </button>
                  {sendingStatus[ele.id]?.message && (
                    <div
                      className={`absolute top-0 right-10 mt-1 px-2 py-1 rounded text-sm ${
                        sendingStatus[ele.id]?.error
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {sendingStatus[ele.id].message}
                    </div>
                  )}
                </>
                <button
                  aria-label="table-delete-button"
                  onClick={() => handleModal(ele.id || ele._id, ele.judul)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <DeleteModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        namaItem={judulItem}
        deleteFunction={`${base_url}/notifikasi/${idItem}`}
        refresher={refresher}
      />
    </div>
  );
};

export default TabelNotifikasi;
