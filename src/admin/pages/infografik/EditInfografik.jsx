import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  InputBase,
  InputDate,
  MultipleFileUpload,
  QuillEditor,
} from "../../components";
import {
  handleUpdateDate,
  useGetTime,
  usePutMultipleImageToApi,
} from "../../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";
import { useParams } from "react-router-dom";

const EditInfografik = () => {
  const { id } = useParams();

  const { data, handleChange, handleFile, handleUpdate, files, isSuccess } =
    usePutMultipleImageToApi(id, "infografik");

  const { getDate } = useGetTime();

  moment.locale("id");
  moment(getDate);

  const { UpdateDate } = handleUpdateDate(handleChange);

  return (
    <MainLayout>
      <FormLayout action={handleUpdate} notif={isSuccess}>
        <MultipleFileUpload
          value={files}
          initialImage={data.gambar}
          handleFile={handleFile}
        />

        <InputBase
          value={data.headline || ""}
          label={"headline Infografik"}
          name={"headline"}
          handleChange={handleChange}
        />
        <InputBase
          label={"Judul Infografik"}
          value={data.judul || ""}
          name={"judul"}
          handleChange={handleChange}
        />
        <InputBase
          label={"Narasumber"}
          value={data.narasumber || ""}
          handleChange={handleChange}
          name={"narasumber"}
        />
        <QuillEditor
          value={data.deskripsi || ""}
          judul={"Deskripsi"}
          name={"deskripsi"}
          handleChange={handleChange}
        />
        
        <InputDate getDate={UpdateDate} />

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

        <ButtonForm backRoute={"/admincms/infografik"}>Submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditInfografik;
