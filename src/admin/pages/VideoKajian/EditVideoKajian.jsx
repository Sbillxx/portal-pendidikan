import { useParams } from "react-router-dom";
import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  FileUpload,
  InputBase,
  InputDate,
  QuillEditor,
} from "../../components";
import "moment/locale/id";
import { handleUpdateDate, usePutToApi } from "../../../Func/GlobalFunction";

const EditVideoKajian = () => {
  const { id } = useParams();
  const { handleChange, handleFile, handleUpdate, data, file, isSuccess } =
    usePutToApi(id, "videokajian");
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
          handleChange={handleChange}
          name="link_video"
          label="Link Video"
          value={data.link_video || ""}
        />
        <InputBase
          handleChange={handleChange}
          name="judul_video"
          value={data.judul_video || ""}
          label="Judul Video Kajian"
        />
        <InputBase
          handleChange={handleChange}
          name="narasumber"
          value={data.narasumber || ""}
          label="Narasumber"
        />
        <QuillEditor
          judul="Deskripsi"
          handleChange={handleChange}
          name="deskripsi"
          value={data.deskripsi || ""}
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

        <ButtonForm type="submit" backRoute={"/admincms/videokajian"}>
          Submit
        </ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditVideoKajian;
