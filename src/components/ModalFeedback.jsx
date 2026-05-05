import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { memo } from "react";

const ModalFeedback = memo(({ close, data, handlePost, handleChange }) => {
  // Fungsi untuk handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    await handlePost(e); // Panggil handlePost yang ada
    resetForm();
  };

  // Fungsi untuk handle batal
  const onCancel = () => {
    resetForm();
    close();
  };

  // Fungsi untuk reset form
  const resetForm = () => {
    // Reset semua field ke nilai awal
    handleChange({
      target: { name: 'kategori', value: '' }
    });
    handleChange({
      target: { name: 'penulis', value: '' }
    });
    handleChange({
      target: { name: 'saran', value: '' }
    });
  };

  return (
    <div className="bg-neutral-800/70 flex items-center justify-center fixed inset-0 h-full w-full z-50">
      <form
        onSubmit={onSubmit}
        className="rounded-lg bg-white p-6 space-y-6 w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-lg-bold text-gray-800">
          Punya Saran? Kami Siap Mendengar!
        </h2>

        {/* Dropdown Kategori */}
        <div>
          <Label
            htmlFor="kategori"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Kategori
          </Label>
          <Select
            id="kategori"
            name="kategori"
            onChange={handleChange}
            value={data.kategori}
            required
          >
            <option value="">Pilih kategori saran</option>
            <option value="Saran Konten">Saran Konten</option>
            <option value="Fitur Rusak">Fitur Rusak</option>
            <option value="Lainnya">Lainnya</option>
          </Select>
        </div>

        {/* Input Email */}
        <div>
          <div className="flex flex-col mb-2">
            <Label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <p className="text-xs-regular text-neutral-400">
              sertakan email anda agar kami tau siapa yang mengirim saran
            </p>
          </div>
          <TextInput
            onChange={handleChange}
            value={data.penulis}
            id="email"
            name="penulis"
            type="email"
            placeholder="Contoh : pratama76@gmail.com"
            required
          />
        </div>

        {/* Textarea Saran */}
        <div>
          <Label
            htmlFor="saran"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Saran Anda
          </Label>
          <Textarea
            onChange={handleChange}
            value={data.saran}
            id="saran"
            name="saran"
            rows={4}
            placeholder="Contoh : tambahin ini dong di kontennya.."
            required
          />
        </div>

        {/* Tombol Kirim */}
        <div className="flex justify-end gap-3">
          <div
            onClick={onCancel}
            className="bg-white rounded-lg px-5 py-2 text-idi-800 text-sm-semibold cursor-pointer"
          >
            Batal
          </div>
          <button
            type="submit"
            color="primary"
            className="bg-idi-800 rounded-lg px-5 py-2 text-white text-sm-semibold"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
});

export default ModalFeedback;