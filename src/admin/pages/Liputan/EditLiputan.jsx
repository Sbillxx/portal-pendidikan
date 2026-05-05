import { FormLayout, MainLayout } from "../../layout";
import {
  QuillEditor,
  FileUpload,
  InputBase,
  InputDate,
  ButtonForm,
} from "../../components";
import moment from "moment";
import "moment/locale/id";
import { useGetTime, usePutToApi } from "../../../Func/GlobalFunction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditLiputan = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [initialData, setInitialData] = useState({
    gambar: "",
    judul: "",
    narasumber: "",
    deskripsi: "",
    tanggal: "",
    waktu: "",
    headline: false
  });

  const { data, handleChange, handleFile, handleUpdate, file } = usePutToApi(
    id,
    "liputan"
  );

  const { getDate } = useGetTime();

  moment.locale("id");
  moment(getDate);

  // Update initialData ketika data dari API tersedia
  useEffect(() => {
    if (data) {
      setInitialData(prev => ({
        ...prev,
        ...data,
        headline: data.headline ?? false
      }));
      setIsLoading(false);
    }
  }, [data]);

  // Validasi form sebelum submit
  const validateForm = () => {
    const errors = {};
    if (!initialData.judul) errors.judul = "Judul liputan wajib diisi";
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FormLayout action={handleSubmit}>
        <FileUpload
          value={file}
          initialImage={initialData.gambar}
          handleFile={handleFile}
          error={formErrors.gambar}
        />

        <InputBase
          value={initialData.judul || ""}
          name="judul"
          handleChange={handleChange}
          label="Judul Liputan"
          required
          error={formErrors.judul}
        />

        <InputBase
          value={initialData.narasumber || ""}
          handleChange={handleChange}
          name="narasumber"
          label="Narasumber"
          required
          error={formErrors.narasumber}
        />

        <QuillEditor
          value={initialData.deskripsi || ""}
          judul="Deskripsi"
          name="deskripsi"
          handleChange={handleChange}
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
          backRoute="/admincms/liputan"
          disabled={isLoading || Object.keys(formErrors).length > 0}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </ButtonForm>
      </FormLayout>
    </MainLayout>
  );
};

export default EditLiputan;