import { Footer, ModalFeedback, Navbar } from "../components";
import React, { useEffect, useState } from "react";
import { HiOutlineMail, HiCheck } from "react-icons/hi";
import { usePostToApi } from "../Func/GlobalFunction";
import { useRef } from "react";
import { Toast } from "flowbite-react";
import Meta from "../components/Meta";

const MainLayout = ({ children, img, title, url }) => {
  const [feedback, setFeedback] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef(null);

  const initialFormState = {
    saran: "",
    kategori: "",
    penulis: "",
  };

  const [data, setData] = useState(initialFormState);

  const resetForm = () => {
    setData(initialFormState);
  };

  const handleModalFeedback = () => {
    if (!feedback) {
      // Jika modal akan dibuka, tidak perlu reset
      setFeedback(true);
    } else {
      // Jika modal akan ditutup, reset form
      resetForm();
      setFeedback(false);
    }
  };

  const {
    handleChange,
    handlePost: originalHandlePost,
    isSuccess,
    setIsSuccess,
  } = usePostToApi(data, setData, "saran/create", "/");

  // Wrap handlePost untuk menambahkan reset functionality
  const handlePost = async (e) => {
    e.preventDefault();
    await originalHandlePost(e);
    if (!e.defaultPrevented) {
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFeedback(false);
      setToastVisible(true);
      resetForm(); // Reset form saat berhasil submit

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    timerRef.current = setTimeout(() => {
      setToastVisible(false);
      setIsSuccess(false);
    }, 4000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle modal close dengan reset
  const handleClose = () => {
    resetForm();
    setFeedback(false);
  };

  return (
    <>
      <Meta
        title={title}
        description={""}
        image={img}
        url={`https://www.idrisiyyah.or.id/${url}`}
        type="article"
      />

      <div className="flex flex-col items-center gap-2 dark:bg-neutral-900">
        <Navbar />
        <div className="children-container">{children}</div>
        <Footer />

        <div
          onClick={handleModalFeedback}
          className="fixed flex items-center gap-2 bg-idi-800 text-white bottom-4 right-4 px-4 py-2 rounded-md cursor-pointer shadow-md hover:bg-idi-700 transition z-10"
        >
          <HiOutlineMail className="text-white" />
          Kotak saran
        </div>

        {feedback && (
          <ModalFeedback
            close={handleClose} // Gunakan handleClose yang baru
            handleChange={handleChange}
            handlePost={handlePost} // Gunakan handlePost yang sudah di-wrap
            data={data}
          />
        )}

        <div
          className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out ${
            toastVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <Toast className="shadow-2xl shadow-neutral-200">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-800">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Saran telah dikirim! Terima kasih
            </div>
            <Toast.Toggle onClick={() => setToastVisible(false)} />
          </Toast>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
