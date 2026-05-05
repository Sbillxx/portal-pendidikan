import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  FileUpload,
  InputBase,
  InputDate,
  QuillEditor,
} from "../../components";
import { usePutToApi } from "../../../Func/GlobalFunction";
import moment from "moment";
import { useParams } from "react-router-dom";

const EditContent = () => {
  const { id } = useParams();
  const { handleChange, handleFile, handleUpdate, data, file, isSuccess } = usePutToApi(
    id,
    "profile"
  );

  return (
    <MainLayout>
      <FormLayout action={handleUpdate} notif={isSuccess}>
        <FileUpload
          value={file}
          initialImage={data.gambar}
          handleFile={handleFile}
        />
        <InputBase
          value={data.headline || ""}
          label={"headline"}
          handleChange={handleChange}
          name="headline"
        />
        <InputBase
          value={data.judul || ""}
          handleChange={handleChange}
          name="judul"
          label={"judul"}
        />
        <QuillEditor
          value={data.deskripsi || ""}
          handleChange={handleChange}
          name="deskripsi"
          judul={"Deskripsi"}
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

export default EditContent;
