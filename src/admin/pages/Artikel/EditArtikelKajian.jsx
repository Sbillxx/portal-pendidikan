import React, { useState, useEffect } from "react";
import { FormLayout, MainLayout } from "../../layout";
import {
  ButtonForm,
  FileUpload,
  InputBase,
  InputDate,
  QuillEditor,
} from "../../components";
import { useParams } from "react-router-dom";
import { useGetTime, usePutToApi } from "../../../Func/GlobalFunction";
import moment from "moment";
import "moment/locale/id";

const EditArtikelKajian = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [initialData, setInitialData] = useState({
    gambar: "",
    judul_artikel: "",
    narasumber: "",
    deskripsi: "",
    tanggal: "",
    waktu: "",
    headline: false
  });

  const { getDate } = useGetTime();
  const { id } = useParams();
  
  moment.locale("id");
  moment(getDate);

  const { data, handleChange, handleFile, handleUpdate, file, isSuccess } =
    usePutToApi(id, "artikel/kajian");

  // Update initialData ketika data dari API tersedia
  useEffect(() => {
    if (data) {
      setInitialData(prev => ({
        ...prev,
        ...data,
        headline: data.headline ?? false
      }));
    }
  }, [data]);

  // Validasi form
  const validateForm = () => {
    const errors = {};
    
    if (!initialData.judul_artikel) errors.judul_artikel = "Judul artikel wajib diisi";
    if (!initialData.narasumber) errors.narasumber = "Narasumber wajib diisi";
    if (!initialData.deskripsi) errors.deskripsi = "Deskripsi wajib diisi";
    if (!initialData.tanggal) errors.tanggal = "Tanggal wajib diisi";
    if (!initialData.waktu) errors.waktu = "Waktu wajib diisi";

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
      await handleUpdate(e);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Terjadi kesalahan saat memperbarui data");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle perubahan checkbox headline
  const handleHeadlineChange = (e) => {
    const { name, checked } = e.target;
    setInitialData(prev => ({
      ...prev,
      [name]: Boolean(checked)
    }));
    handleChange({
      target: {
        name,
        value: Boolean(checked)
      }
    });
  };

  // Effect untuk validasi awal setelah data dimuat
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      validateForm();
    }
  }, [initialData]);

  return (
    <MainLayout>
      <FormLayout action={handleSubmit} notif={isSuccess}>
        <FileUpload
          handleFile={handleFile}
          value={file}
          initialImage={initialData.gambar}
          error={formErrors.gambar}
        />
        
        <InputBase
          value={initialData.judul_artikel || ""}
          label="Judul Artikel"
          handleChange={handleChange}
          name="judul_artikel"
          required
          error={formErrors.judul_artikel}
        />
        
        <InputBase
          value={initialData.narasumber || ""}
          label="Narasumber"
          handleChange={handleChange}
          name="narasumber"
          required
          error={formErrors.narasumber}
        />
        
        <QuillEditor
          judul="Deskripsi"
          handleChange={handleChange}
          name="deskripsi"
          value={initialData.deskripsi || ""}
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
          value={initialData.tanggal}
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
              formErrors.waktu ? 'border-red-500' : ''
            }`}
            onChange={handleChange}
            value={initialData.waktu || ""}
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
            checked={initialData.headline}
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

        <ButtonForm
          backRoute="/admincms/artikel/kajian"
          type="submit"
          disabled={isLoading || Object.keys(formErrors).length > 0}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditArtikelKajian;