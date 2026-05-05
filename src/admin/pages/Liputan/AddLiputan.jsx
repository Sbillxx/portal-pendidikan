import { FormLayout, MainLayout } from "../../layout";
import { useState } from "react";
import {
  QuillEditor,
  InputBase,
  InputDate,
  ButtonForm,
  MultipleFileUpload,
} from "../../components";
import moment from "moment";
import "moment/locale/id";
import {
  useGetTime,
  usePostMultipleImageToApi,
} from "../../../Func/GlobalFunction";
import { submitToNotif } from "../../../lib/functions";
import { uploads_url } from "../../../utils/variable";
import { stripHtml } from "../../../utils/function";

const AddLiputan = () => {
  const { getDate } = useGetTime();
  const today = moment().format("DD MMMM YYYY");

  moment.locale("id");
  moment(getDate);

  const [status, setStatus] = useState("");
  const [data, setData] = useState({
    gambar: "",
    judul: "",
    narasumber: "",
    deskripsi: "",
    tanggal: "" || today,
    waktu: "",
    headline: false, // Inisialisasi nilai headline
  });

  const { handleChange, handleFile, handlePost, fileName, isSuccess } =
    usePostMultipleImageToApi(
      data,
      setData,
      "liputan/create",
      "/admincms/liputan"
    );

  // Handle perubahan checkbox headline
  const handleHeadlineChange = (e) => {
    const { name, checked } = e.target;
    handleChange({
      target: {
        name,
        value: Boolean(checked)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.judul || !data.narasumber || !data.deskripsi || !data.tanggal || !data.waktu) {
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    try {
      const result = await handlePost(e);
      const imageUrl = `${uploads_url}${fileName?.name}`;
      
      if (data.headline) {
        await submitToNotif(
          {
            id: result?.id,
            title: `liputan-${data.judul.slice(0, 20) + "..."}`,
            message: `${stripHtml(data.deskripsi).slice(0, 70) + "..."}`,
            image: imageUrl
          },
          setStatus,
          "liputan",
          "headline"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MainLayout>
      <FormLayout action={handleSubmit} notif={isSuccess}>
        <MultipleFileUpload 
          handleFile={handleFile} 
          value={fileName}
          required 
        />

        <InputBase
          label="Judul Liputan"
          name="judul"
          handleChange={handleChange}
          value={data.judul}
          required
        />

        <InputBase
          label="Narasumber"
          name="narasumber"
          handleChange={handleChange}
          value={data.narasumber}
          required
        />

        <QuillEditor
          judul="Deskripsi"
          name="deskripsi"
          handleChange={handleChange}
          value={data.deskripsi}
          required
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
          value={data.tanggal}
          required
        />

        <div className="waktu flex flex-col gap-2">
          <p className="text-sm font-medium">Waktu</p>
          <input
            type="time"
            className="rounded-lg border-gray-300 bg-gray-50"
            onChange={handleChange}
            value={data.waktu || ""}
            name="waktu"
            required
          />
        </div>

        <div className="flex gap-2 items-center">
          <input 
            type="checkbox" 
            name="headline" 
            id="headline"
            checked={data.headline}
            onChange={handleHeadlineChange}
          />
          <label 
            htmlFor="headline"
            className="text-sm font-medium cursor-pointer"
          >
            Simpan sebagai headline
          </label>
        </div>

        {status && <p className="text-sm text-gray-600">{status}</p>}
        <ButtonForm 
          backRoute="/admincms/liputan"
          disabled={!data.judul || !data.narasumber || !data.deskripsi || !data.tanggal || !data.waktu}
        />
        
      </FormLayout>
    </MainLayout>
  );
};

export default AddLiputan;