import React, { useState } from "react";
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
import "moment/locale/id";
import { submitToNotif } from "../../../lib/functions";
import { uploads_url } from "../../../utils/variable";
import { stripHtml } from "../../../utils/function";

const AddArtikelInfo = () => {
  const today = moment().format("DD MMMM YYYY");
  const { getDate } = useGetTime();

  moment.locale("id");
  moment(getDate);

  const [data, setData] = useState({
    gambar: "",
    judul_artikel: "",
    narasumber: "",
    deskripsi: "",
    tanggal: "" || today,
    waktu: "",
    headline: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState("");

  const { handleChange, handleFile, handlePost, fileName } = usePostToApi(
    data,
    setData,
    "artikel/kajian/create",
    "/admincms/artikel/kajian"
  );

  // Validasi form
  const validateForm = () => {
    const errors = {};
    if (!data.gambar && !fileName) errors.gambar = "Gambar wajib diupload";
    if (!data.judul_artikel) errors.judul_artikel = "Judul artikel wajib diisi";
    if (!data.narasumber) errors.narasumber = "Narasumber wajib diisi";
    if (!data.deskripsi) errors.deskripsi = "Deskripsi wajib diisi";
    if (!data.tanggal) errors.tanggal = "Tanggal wajib diisi";
    if (!data.waktu) errors.waktu = "Waktu wajib diisi";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submit dengan validasi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    try {
      setIsLoading(true);
      const result = await handlePost(e);

      if (data.headline) {
        await submitToNotif(
          {
            id: result?.id,
            title: `artikel-${data.judul_artikel.slice(0, 20) + "..."}`,
            message: `${stripHtml(data.deskripsi).slice(0, 70) + "..."}`,
            image: `${uploads_url}${fileName.name}`,
          },
          setStatus,
          "artikel-kajian",
          "headline"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle perubahan checkbox headline
  const handleHeadlineChange = (e) => {
    const { name, checked } = e.target;
    handleChange({
      target: {
        name,
        value: Boolean(checked),
      },
    });
  };

  return (
    <MainLayout>
      <FormLayout action={handleSubmit}>
        <FileUpload
          handleFile={handleFile}
          value={fileName}
          required
          error={formErrors.gambar}
        />

        <InputBase
          label="Judul Artikel"
          handleChange={handleChange}
          name="judul_artikel"
          value={data.judul}
          required
          error={formErrors.judul}
        />

        <InputBase
          label="Narasumber"
          handleChange={handleChange}
          name="narasumber"
          value={data.narasumber}
          required
          error={formErrors.narasumber}
        />

        <QuillEditor
          judul="Deskripsi"
          handleChange={handleChange}
          name="deskripsi"
          value={data.deskripsi}
          required
          error={formErrors.deskripsi}
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
          error={formErrors.tanggal}
        />

        <div className="waktu flex flex-col gap-2">
          <p className="text-sm font-medium">
            Waktu<span className="text-red-500">*</span>
          </p>
          <input
            type="time"
            name="waktu"
            className={`rounded-lg border-gray-300 bg-gray-50 ${
              formErrors.waktu ? "border-red-500" : ""
            }`}
            onChange={handleChange}
            value={data.waktu || ""}
            required
          />
          {formErrors.waktu && (
            <p className="text-red-500 text-xs mt-1">{formErrors.waktu}</p>
          )}
        </div>

        <div className="flex gap-2 items-center mt-4">
          <input
            type="checkbox"
            name="headline"
            id="headline"
            checked={data.headline}
            onChange={handleHeadlineChange}
            className="w-4 h-4"
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
          backRoute="/admincms/artikel/kajian"
          disabled={isLoading || Object.keys(formErrors).length > 0}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default AddArtikelInfo;
