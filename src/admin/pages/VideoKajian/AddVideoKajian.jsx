import React, { useState } from "react";
import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  FileUpload,
  InputBase,
  InputDate,
  QuillEditor,
} from "../../components";
import moment from "moment";
import "moment/locale/id";
import { handleAddDate, usePostToApi } from "../../../Func/GlobalFunction";

const AddVideoKajian = () => {
  const today = moment().format("DD MMMM YYYY");

  const [data, setData] = useState({
    gambar: "",
    judul_video: "",
    link: "",
    narasumber: "",
    deskripsi: "",
    tanggal: today,
    waktu: "",
  });

  const { handleChange, handleFile, handlePost, fileName, isSuccess } =
    usePostToApi(data, setData, "videokajian", "/admincms/videokajian");

  const { AddDate } = handleAddDate(setData);

  return (
    <MainLayout>
      <FormLayout action={handlePost} notif={isSuccess}>
        <FileUpload handleFile={handleFile} value={fileName} />

        <InputBase
          handleChange={handleChange}
          name="judul_video"
          label={"Judul vidio"}
          id={"judulvidio"}
        />

        <InputBase
          handleChange={handleChange}
          name="link_video"
          label={"Link vidio"}
          id={"link"}
        />

        <InputBase
          handleChange={handleChange}
          name="narasumber"
          label={"Narasumber"}
          id={"narasumber"}
        />

        <QuillEditor
          handleChange={handleChange}
          name="deskripsi"
          judul={"Deskripsi"}
          value={data.deskripsi}
        />

        <InputDate getDate={AddDate} />

        <div className="tanggal flex flex-col gap-2">
          <p className="text-sm font-medium">Waktu</p>
          <input
            type="time"
            name="waktu"
            className="rounded-lg border-gray-300 bg-gray-50"
            onChange={handleChange}
            value={data.waktu || ""}
          />
        </div>

        <ButtonForm backRoute={"/admincms/videokajian"}>Submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default AddVideoKajian;
