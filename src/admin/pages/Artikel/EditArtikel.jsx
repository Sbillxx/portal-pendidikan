import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  FileUpload,
  InputBase,
  InputDate,
  QuillEditor,
} from "../../components";
import { useParams } from "react-router-dom";
import { usePutToApi } from "../../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";

const EditArtikel = () => {
  const { id } = useParams();
  const { handleChange, handleFile, handleUpdate, data, file } = usePutToApi(
    id,
    "artikel/info"
  );

  return (
    <MainLayout>
      <FormLayout action={handleUpdate}>
        <FileUpload
          value={file}
          initialImage={data.gambar}
          handleFile={handleFile}
        />
        <InputBase
          value={data.judul || ""}
          handleChange={handleChange}
          name="judul"
          label={"Judul Artikel"}
        />
        <InputBase
          value={data.narasumber || ""}
          handleChange={handleChange}
          name="narasumber"
          label={"Narasumber"}
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
        <ButtonForm backRoute={`/admincms/artikel/info`} />
      </FormLayout>
    </MainLayout>
  );
};

export default EditArtikel;
