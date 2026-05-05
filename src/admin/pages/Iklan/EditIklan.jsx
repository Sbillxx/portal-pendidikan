import { useParams } from "react-router-dom";
import { FormLayout, MainLayout } from "../../layout";
import { Label, Radio } from "flowbite-react";
import { ButtonForm, FileUpload, InputBase, InputDate } from "../../components";
import moment from "moment";
import "moment/locale/id";
import { usePutToApi } from "../../../Func/GlobalFunction";

const EditIklan = () => {
  const { id } = useParams();
  const { handleChange, handleFile, handleUpdate, data, file, isSuccess } = usePutToApi(
    id,
    "iklan"
  );

  return (
    <MainLayout>
      <FormLayout action={handleUpdate} notif={isSuccess} >
        <FileUpload
          value={file}
          initialImage={data.gambar}
          handleFile={handleFile}
        />
        <div className="flex flex-col gap-3">
          <p className="text-small-semibold">ukuran iklan</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Radio
                id="ukuran850"
                name="ukuran"
                value={data.ukuran !== "850" ? "850" : data.ukuran}
                onChange={handleChange}
              />
              <Label htmlFor="ukuran850">850 x 565</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="ukuran1110"
                name="ukuran"
                value={data.ukuran !== "1110" ? "1110" : data.ukuran}
                onChange={handleChange}
              />
            </div>
            <Label htmlFor="ukuran1110">1110 x 180</Label>
          </div>
        </div>
        <InputBase
          label={"link iklan"}
          handleChange={handleChange}
          name={"url"}
          value={data.url || ""}
        />
        <InputBase
          label={"Judul iklan"}
          handleChange={handleChange}
          name={"judul"}
          value={data.judul || ""}
        />
        <InputBase
          label={"sumber iklan"}
          handleChange={handleChange}
          name={"sumber"}
          value={data.sumber || ""}
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
        <ButtonForm backRoute={"/admincms/iklan"}>Submit</ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditIklan;
