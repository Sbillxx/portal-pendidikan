import React, { useState } from "react";
import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  FileUpload,
  InputBase,
  InputDate,
  QuillEditor,
} from "../../components";
import { useGetTime, usePostToApi } from "../../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";

const AddArtikelInfo = () => {

  const today = moment().format('DD MMMM YYYY');

  const { getDate } = useGetTime();

  moment.locale("id");
  moment(getDate);

  const [data, setData] = useState({
    gambar: "",
    judul: "",
    narasumber: "",
    deskripsi: "",
    tanggal: "" || today,
    waktu: "",
  });

  const { handleChange, handleFile, handlePost, fileName } = usePostToApi(
    data,
    setData,
    "artikel/info/create",
    "/admincms/artikel/info"
  );

  return (
    <MainLayout>
      <FormLayout action={handlePost}>
        <FileUpload handleFile={handleFile} value={fileName} />
        <InputBase label={"Judul Artikel"} handleChange={handleChange} name={"judul"} />
        <InputBase label={"Narasumber"} handleChange={handleChange} name={"narasumber"}  />
        <QuillEditor judul={"Deskripsi"} handleChange={handleChange} name={"deskripsi"} value={data.deskripsi}/>
        <InputDate
          getDate={(date) =>
            handleChange({
              target: {
                name: "tanggal",
                value: moment(date).format("DD MMMM YYYY"),
              },
            })
          }
        />
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

          

       <ButtonForm backRoute={`/admincms/artikel/kajian `}>submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default AddArtikelInfo;
