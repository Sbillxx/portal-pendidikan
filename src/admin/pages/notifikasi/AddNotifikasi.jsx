import React, { useState } from "react";
import { FormLayout, MainLayout } from "../../layout";
import { submitPushNotif } from "../../../lib/functions";
import { ButtonForm, InputBase } from "../../components";
import { base_url } from "../../../utils/variable";
import { useNavigate } from "react-router-dom";

const AddNotifikasi = () => {
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    judul: "",
    pesan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePost = async () => {
    try {
      const response = await fetch(`${base_url}/notifikasi/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Using data state instead of initialData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post data");
      }

      setIsSuccess(true);
      return true;
    } catch (error) {
      console.error("Error posting data:", error);
      setStatus(error.message || "Gagal mengirim data");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.judul || !data.pesan) {
      setStatus("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    try {
      setStatus("Sedang mengirim data...");
      const result = await handlePost();

      if (result) {
        try {
          const notifSent = await submitPushNotif(
            {
              title: data.judul,
              message: data.pesan,
            },
            setStatus,
            "push-notif"
          );

          if (notifSent) {
            setStatus("Notifikasi berhasil terkirim");
            navigate("/admincms/notifikasi");
            setData({ judul: "", pesan: "" });
          }
        } catch (notifError) {
          console.error("Error sending notification:", notifError);
          setStatus(
            "Notifikasi tersimpan tetapi gagal mengirim push notification"
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Gagal mengirim notifikasi");
    }
  };

  return (
    <MainLayout>
      <FormLayout action={handleSubmit} notif={isSuccess}>
        <InputBase
          label="Judul"
          name="judul"
          handleChange={handleChange}
          value={data.judul}
          required
        />

        <InputBase
          label="Pesan"
          name="pesan"
          handleChange={handleChange}
          value={data.pesan}
          required
        />

        {status && (
          <p
            className={`text-sm mt-2 ${
              status.includes("berhasil") ? "text-green-600" : "text-gray-600"
            }`}
          >
            {status}
          </p>
        )}

        <ButtonForm
          backRoute="/admincms/notifikasi"
          disabled={!data.judul || !data.pesan}
        />
      </FormLayout>
    </MainLayout>
  );
};

export default AddNotifikasi;
