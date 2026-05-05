import React, { useState } from "react";
import { FormLayout, MainLayout } from "../../layout";
import { ButtonForm, FileUpload, InputBase, InputDate } from "../../components";
import { useGetTime, usePostToApi } from "../../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";
import { Label, Radio } from "flowbite-react";

const AddIklan = () => {
  const { getDate } = useGetTime();
  const today = moment().format('DD MMMM YYYY');

  moment.locale("id");
  moment(getDate);

  const [data, setData] = useState({
    gambar: "",
    url: "",
    judul: "",
    ukuran: "",
    sumber: "",
    tanggal: "" || today,
  });

  const { handleChange, handleFile, handlePost, fileName, isSuccess } =
    usePostToApi(data, setData, "iklan/create", "/admincms/iklan");

  return (
    <MainLayout>
      <FormLayout action={handlePost} notif={isSuccess}>
        <FileUpload handleFile={handleFile} value={fileName} />
        <div className="flex flex-col gap-3">
          <p className="text-small-semibold">ukuran iklan</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Radio
                id="ukuran"
                name="ukuran"
                value="850"
                onChange={handleChange}
              />
              <Label htmlFor="ukuran">850 x 565</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="united-state"
                name="ukuran"
                value="1110"
                onChange={handleChange}
              />
            </div>
            <Label htmlFor="united-state">1110 x 180</Label>
          </div>
        </div>
        <InputBase
          label={"link iklan"}
          handleChange={handleChange}
          name={"url"}
        />
        <InputBase
          label={"Judul iklan"}
          handleChange={handleChange}
          name={"judul"}
        />
        <InputBase
          label={"sumber iklan"}
          handleChange={handleChange}
          name={"sumber"}
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

export default AddIklan;
