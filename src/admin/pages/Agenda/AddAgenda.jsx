import React, { useState } from "react";
import { FormLayout, MainLayout } from "../../layout";
import {
  QuillEditor,
  FileUpload,
  InputBase,
  InputDate,
  ButtonForm,
} from "../../components";
import moment from "moment";
import "moment/locale/id";
import { handleAddDate, usePostToApi } from "../../../Func/GlobalFunction";
import { submitToNotif } from "../../../lib/functions";
import { uploads_url } from "../../../utils/variable";
import { stripHtml } from "../../../utils/function";

const AddAgenda = () => {
  const today = moment().format("DD MMMM YYYY");
  const [data, setData] = useState({
    gambar: "",
    judul: "",
    narasumber: "",
    deskripsi: "",
    tanggal: today,
    waktu: "",
    waktuTayang: "", // tambahan
    tanggalTayang: today, // tambahan
    urlTayang: "" // tambahan untuk tautan
  });

 
  const [status, setStatus] = useState("");

  const { handleChange, handleFile, handlePost, fileName, isSuccess, uploadedFileName } =
    usePostToApi(data, setData, "agenda/create", "/admincms/agenda");

  const { AddDate } = handleAddDate(setData, "tanggal"); // untuk tanggal posting
  const { AddDate: AddTayangDate } = handleAddDate(setData, "tanggalTayang"); // untuk tanggal tayang

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handlePost(e);
      const imageUrl = `${uploads_url}${fileName?.name}`;

      // uncomment ini waktu udah selesai
      // const notifSent = await submitToNotif(
      //   {
      //     id: result?.id,
      //     title: `Agenda-${data.judul.slice(0, 20) + "..."}`,
      //     message: `${stripHtml(data.deskripsi).slice(0, 70) + "..."}`,
      //     image: imageUrl,
      //     // Tambahkan data tayang jika diperlukan untuk notifikasi
      //     tayangInfo: {
      //       tanggal: data.tanggalTayang,
      //       waktu: data.waktuTayang,
      //       url: data.urlTayang
      //     }
      //   },
      //   setStatus,
      //   "agenda",
      //   "content"
      // );

      // console.log("Result from handlePost:", result);

      // if (notifSent) {
      //   console.log("Notifikasi berhasil terkirim", imageUrl, fileName);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <MainLayout>
      <FormLayout action={handleSubmit} notif={isSuccess}>
        <FileUpload handleFile={handleFile} value={fileName} />
        <InputBase
          handleChange={handleChange}
          label={"Judul Agenda"}
          name={"judul"}
          value={data.judul}
        />
        <InputBase
          label="Narasumber"
          name="narasumber"
          handleChange={handleChange}
          value={data.narasumber}
        />
        <InputBase
          label="Tautan Siaran"
          name="urlTayang"
          handleChange={handleChange}
          value={data.urlTayang}
          placeholder="Masukkan URL siaran langsung"
        />
        <QuillEditor
          judul="Deskripsi"
          name="deskripsi"
          handleChange={handleChange}
          value={data.deskripsi}
        />

        {/* Bagian Tanggal & Waktu Posting */}
        <div className="posting-section mb-6">
          <h3 className="text-lg font-medium mb-4">Waktu Posting</h3>
          <InputDate getDate={AddDate} konteks={"Posting"} />
          <div className="waktu flex flex-col gap-2 mt-4">
            <p className="text-sm font-medium">Waktu Posting</p>
            <input
              type="time"
              className="rounded-lg border-gray-300 bg-gray-50"
              onChange={handleChange}
              value={data.waktu || ""}
              name="waktu"
            />
          </div>
        </div>

        {/* Bagian Tanggal & Waktu Tayang */}
        <div className="tayang-section mb-6">
          <h3 className="text-lg font-medium mb-4">Waktu Tayang Siaran</h3>
          <InputDate
            getDate={(date) => setData(prev => ({ ...prev, tanggalTayang: date }))}
            konteks={"Tayang"}
          />
          <div className="waktu flex flex-col gap-2 mt-4">
            <p className="text-sm font-medium">Waktu Tayang</p>
            <input
              type="time"
              className="rounded-lg border-gray-300 bg-gray-50"
              onChange={handleChange}
              value={data.waktuTayang || ""}
              name="waktuTayang"
            />
          </div>
        </div>

        {status && <p className="text-sm text-gray-600">{status}</p>}
        <ButtonForm backRoute="/admincms/agenda" />
      </FormLayout>
    </MainLayout>
  );
};

export default AddAgenda;
