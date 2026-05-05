import { Link, useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import DeleteModal from "../DeleteModal";
import { useHandleDelete } from "../../../Func/GlobalFunction";
import Toaster from "../Toaster";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { base_url, get_thumbnail } from "../../../utils/variable";
import moment from 'moment';
import 'moment/locale/id';
// Fungsi untuk mendapatkan warna berdasarkan nama
const getRandomColor = (nama) => {
    const colors = [
        "bg-red-500", "bg-blue-500", "bg-green-500",
        "bg-yellow-500", "bg-purple-500", "bg-pink-500",
        "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    ];

    if (!nama) return "bg-gray-500"; // Jika nama kosong, gunakan warna default

    // Gunakan kode ASCII karakter pertama untuk memilih warna
    const index = nama.charCodeAt(0) % colors.length;
    return colors[index];
};

const TableDaftarHadirAgenda = ({ data, refresher }) => {
    const [showToast, setShowToast] = useState("");
    const [toastVisible, setToastVisible] = useState("");

    const { handleModal, idItem, judulItem, openModal, setOpenModal } =
        useHandleDelete();

    const location = useLocation();

    useEffect(() => {
        if (location.state?.isSukses) {
            setShowToast(true);
            setTimeout(() => setToastVisible(true), 100);
            setTimeout(() => {
                setShowToast(false);
                setTimeout(() => setToastVisible(false), 300);
            }, 3000);
        }
    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <>
            <Toaster showtoast={showToast} visible={toastVisible} />
            <div className="table-container w-full overflow-x-auto">
                <div className="min-w-[1400px]">
                    <Table striped className="min-w-2000px">
                        <Table.Head>
                            <Table.HeadCell></Table.HeadCell>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>No Telepon</Table.HeadCell>
                            <Table.HeadCell>No.Id</Table.HeadCell>
                            <Table.HeadCell>Lokasi Absen</Table.HeadCell>
                            <Table.HeadCell>Waktu Absen</Table.HeadCell>
                            <Table.HeadCell>Tanggal Absen</Table.HeadCell>
                    
                        </Table.Head>

                        <Table.Body className="divide-y">
                            {[...data].reverse().map((ele, index) => (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={index}
                                >
                                    <Table.Cell>
                                        <div className={`profile w-10 h-10 border-4 border-opacity-20 rounded-full border-gray-300 flex justify-center  items-center font-bold ${getRandomColor(ele.nama)}`}>
                                            <p className="text-white uppercase">
                                                {ele.nama ? ele.nama[0] : ""}
                                            </p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white line-clamp-3 max-w-72">
                                        {ele.nama}
                                    </Table.Cell>
                                    <Table.Cell>{ele.nomorTelepon}</Table.Cell>
                                    <Table.Cell>{ele.noId}</Table.Cell>
                                    <Table.Cell>{ele.lokasi ? ele.lokasi : "Ups tidak ada alamat"}</Table.Cell>
                                    <Table.Cell>{ele.waktuKehadiran} </Table.Cell>
                                    <Table.Cell>    
                                        {moment(ele.tanggal).locale('id').format('DD MMMM YYYY')}
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
                    deleteFunction={`${base_url}/agenda/delete/${idItem}`}
                    refresher={refresher}
                />
            </div>
        </>
    );
};

export default TableDaftarHadirAgenda;
