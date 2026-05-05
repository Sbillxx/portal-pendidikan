import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  InputBase,
  InputDate,
  MultipleFileUpload,
  QuillEditor,
} from "../../components";
import { useGetTime, usePostMultipleImageToApi } from "../../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";

const AddInfografik = () => {
  const { getDate } = useGetTime();
  const today = moment().format('DD MMMM YYYY');

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

  const { handleChange, handleFile, handlePost, fileName, isSuccess } = usePostMultipleImageToApi(
    data,
    setData,
    "infografik/create",
    "/admincms/infografik"
  );

  return (
    <MainLayout>
      <FormLayout action={handlePost} notif={isSuccess}>
        <MultipleFileUpload handleFile={handleFile} value={fileName} />
        <InputBase
          label={"Headline"}
          name={"headline"}
          handleChange={handleChange}
        />
        <InputBase
          label={"Judul Infografik"}
          name={"judul"}
          handleChange={handleChange}
        />
        <InputBase
          label={"Narasumber"}
          name={"narasumber"}
          handleChange={handleChange}
        />
        <QuillEditor
          judul={"Deskripsi"}
          name={"deskripsi"}
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
            className="rounded-lg border-gray-300 bg-gray-50"
            onChange={handleChange}
            value={data.waktu || ""}
            name="waktu"
          />
        </div>
        <ButtonForm backRoute={"/admincms/infografik"}>Submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default AddInfografik;
