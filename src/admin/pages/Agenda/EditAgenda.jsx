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
import { useParams } from "react-router-dom";
import { handleUpdateDate, usePutToApi } from "../../../Func/GlobalFunction";

const EditAgenda = () => {
  const { id } = useParams();
  const { data, handleChange, handleFile, handleUpdate, file, isSuccess } =
    usePutToApi(id, "agenda");

  moment.locale("id");

  const { UpdateDate } = handleUpdateDate(handleChange);

  return (
    <MainLayout>
      <FormLayout action={handleUpdate} notif={isSuccess}>
        <FileUpload
          value={file}
          initialImage={data.gambar}
          handleFile={handleFile}
        />

        <InputBase
          label={"Judul Agenda"}
          handleChange={handleChange}
          value={data.judul || ""}
          name={"judul"}
        />

        <InputBase
          label={"Narasumber"}
          handleChange={handleChange}
          value={data.narasumber || ""}
          name={"narasumber"}
        />

        <QuillEditor
          value={data.deskripsi || ""}
          judul={"Deskripsi"}
          name={"deskripsi"}
          handleChange={handleChange}
        />

        <InputDate getDate={UpdateDate} />

        <div className="waktu flex flex-col gap-2">
          <p className="text-sm font-medium">Waktu</p>
          <input
            type="time"
            name="waktu"
            className="rounded-lg border-gray-300 bg-gray-50"
            onChange={handleChange}
            value={data.waktu || ""}
          />
        </div>

        <ButtonForm type="submit" backRoute={"/admincms/agenda"}>
          Submit
        </ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditAgenda;
