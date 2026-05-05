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
import { useState } from "react";

const AddContent = () => {
  const { getDate } = useGetTime();
  const today = moment().format('DD MMMM YYYY');

  moment.locale("id");
  moment(getDate);

  const [data, setData] = useState({
    gambar: "",
    headline: "",
    judul: "",
    link: "",
    narasumber: "",
    deskripsi: "",
    tanggal: "" || today,
    waktu: "",
  });

  const { handleChange, handleFile, handlePost, fileName, isSuccess } = usePostToApi(
    data,
    setData,
    "profile/create",
    "/admincms/profile"
  );
  return (
    <MainLayout>
      <FormLayout action={handlePost} notif={isSuccess}>
        <FileUpload handleFile={handleFile} value={fileName} />
        <InputBase
          label={"headline"}
          name="headline"
          handleChange={handleChange}
        />
        <InputBase label={"Judul"} name="judul" handleChange={handleChange} />
        <QuillEditor
          judul={"Deskripsi"}
          name="deskripsi"
          handleChange={handleChange}
          value={data.deskripsi}
        />
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
        <ButtonForm backRoute={"/admincms/profile"}>Submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default AddContent;
