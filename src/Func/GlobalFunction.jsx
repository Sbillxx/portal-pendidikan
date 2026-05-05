import axios from "axios";
import "moment/locale/id";
import moment from "moment";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContext";
import { parse as parseDate, isValid, format } from "date-fns";
import { ar, enUS, id } from "date-fns/locale";
import { DUMMY_BERITA, DUMMY_ARTIKEL } from "../utils/dummyData";



export function useArabDateParsing() {
  const parseDateString = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
      console.error(`Invalid date string: ${dateString}`);
      return null;
    }

    const formats = [
      "d MMMM yyyy",
      "dd MMMM yyyy",
      "d MMM yyyy",
      "dd MMM yyyy",
      "yyyy-MM-dd",
      "dd-MM-yyyy",
    ];

    for (let fmt of formats) {
      try {
        const date = parseDate(dateString, fmt, new Date(), { locale: ar });
        if (isValid(date)) {
          return date;
        }
      } catch (error) {
        console.error(`Error parsing date with format ${fmt}:`, error);
      }
    }

    console.error(`Unable to parse date: ${dateString}`);
    return null;
  };

  const formatArabDate = (dateString) => {
    const date = parseDateString(dateString);
    if (!date) {
      console.warn(`Failed to format date: ${dateString}`);
      return dateString;
    }
    return format(date, "d MMM", { locale: ar });
  };

  return { formatArabDate };
}

export function useEngDateParsing() {
  const parseDateString = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
      console.error(`Invalid date string: ${dateString}`);
      return null;
    }

    const formats = ["MMMM d, yyyy", "d MMMM yyyy", "yyyy-MM-dd"];

    for (let fmt of formats) {
      try {
        const date = parseDate(dateString, fmt, new Date(), { locale: enUS });
        if (isValid(date)) {
          return date;
        }
      } catch (error) {
        console.error(`Error parsing date with format ${fmt}:`, error);
      }
    }

    console.error(`Unable to parse date: ${dateString}`);
    return null;
  };

  const formatEnglishDate = (dateString) => {
    const date = parseDateString(dateString);
    if (!date) {
      console.warn(`Failed to format date: ${dateString}`);
      return dateString;
    }
    return format(date, "d MMM", { locale: enUS });
  };

  return { formatEnglishDate };
}

export function useDateParsing() {
  const parseDateString = (dateString) => {
    const formats = [
      "d MMMM yyyy",
      "dd MMMM yyyy",
      "d MMM yyyy",
      "dd MMM yyyy",
      "yyyy-MM-dd",
      "dd-MM-yyyy",
    ];

    for (let fmt of formats) {
      const date = parseDate(dateString, fmt, new Date(), { locale: id });
      if (isValid(date)) {
        return date;
      }
    }

    console.error(`Unable to parse date: ${dateString}`);
    return null;
  };

  const formatDate = (dateString) => {
    const date = parseDateString(dateString);
    if (!date) return dateString;
    return format(date, "d MMM", { locale: id });
  };

  return { formatDate };
}

export function useConvertLanguage(textToConvert, lang) {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [currentLanguage, setCurrentLanguage] = useState(lang);
  const [resultTranslation, setResultTranslation] = useState("");

  useEffect(() => {
    const convertedLanguage = async () => {
      try {
        const response = await axios.post(`${base_url}/language`, {
          text: textToConvert,
          language: currentLanguage !== "" ? currentLanguage : "id",
        });

        setResultTranslation(response.data);
      } catch (error) {
        console.error("Error during translation:", error);
      }
    };

    if (textToConvert) {
      convertedLanguage();
    }
  }, [textToConvert, currentLanguage, base_url]);
  return { resultTranslation, setCurrentLanguage };
}

export function usePagination(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Hitung indeks halaman dari belakang
  const startIndex = data.length - currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Pastikan startIndex tidak negatif
  const safeStartIndex = Math.max(0, startIndex);

  const currentItems = data.slice(safeStartIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    totalPages,
    currentItems,
    handlePageChange,
    currentPage,
  };
}

export function useGetTime() {
  // state
  const [getDate, setGetDate] = useState();
  const [waktu, setWatku] = useState();

  // function
  const handleGetDate = (date) => {
    setGetDate(date.toString());
  };

  // convert to Indonesian time
  moment.locale("id");
  moment(getDate);

  const handletGetTime = (time) => {
    setWatku(time);
  };
  return { getDate, handleGetDate, waktu, handletGetTime };
}

export function useHandleDelete() {
  const [openModal, setOpenModal] = useState(false);
  const [judulItem, setJudulItem] = useState("");
  const [idItem, setIdItem] = useState("");

  const handleModal = (id, judul) => {
    setIdItem(id);
    setJudulItem(judul);
    setOpenModal((prev) => !prev);
  };

  return { handleModal, judulItem, idItem, openModal, setOpenModal };
}

export function useDeleteFromApi(route, refresh, open, setOpen) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(route);

      setOpen((prev) => !prev);
    } catch (error) {
      setError(`Hapus gagal: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open && refresh) refresh();
  }, [open, refresh]);

  return {
    handleDelete,
    isLoading,
    error,
  };
}

export function useGetDoubleData() {
  const [data, setData] = useState();
  const { i18n } = useTranslation();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base_url = process.env.REACT_APP_BASE_URL || "https://api.idrisiyyah.or.id:3000";
        const [liputanRes, artikelRes] = await Promise.all([
          axios.get(`${base_url}/liputan`).catch(() => ({ data: [] })),
          axios.get(`${base_url}/artikel/kajian`).catch(() => ({ data: [] })),
        ]);

        // Filter data yang memiliki headline=true
        const liputanData = Array.isArray(liputanRes.data) ? liputanRes.data.filter(
          (item) => item.headline === "true" || item.headline === true
        ) : [];

        const artikelData = Array.isArray(artikelRes.data) ? artikelRes.data.filter(
          (item) => item.headline === "true" || item.headline === true
        ) : [];

        // Fallback ke dummy jika API kosong
        const dummyBerita = DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || [];
        const dummyArtikel = DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"] || [];

        const finalLiputanData = liputanData.length > 0
          ? liputanData
          : (liputanRes.data.length > 0 ? liputanRes.data.slice(-3) : dummyBerita.slice(-2));

        const finalArtikelData = artikelData.length > 0
          ? artikelData
          : (artikelRes.data.length > 0 ? artikelRes.data.slice(-3) : dummyArtikel.slice(-1));

        // Helper to compare dates
        const parseDate = (d) => {
          if (!d) return new Date(0);

          // Try parsing with various formats using moment
          const formats = [
            "DD MMMM YYYY",
            "D MMMM YYYY",
            "DD MMM YYYY",
            "D MMM YYYY",
            "YYYY-MM-DD",
            "DD-MM-YYYY",
            "MMMM DD, YYYY"
          ];

          const m = moment(d, formats, true);
          if (m.isValid()) return m.toDate();

          // Fallback to Indonesian locale parsing if needed
          const mIndo = moment(d, formats, 'id', true);
          if (mIndo.isValid()) return mIndo.toDate();

          // Native fallback
          return new Date(d);
        };

        const sortedCombined = [...finalLiputanData, ...finalArtikelData].sort((a, b) => {
          const dateA = parseDate(a.tanggal);
          const dateB = parseDate(b.tanggal);
          if (isNaN(dateA)) return 1;
          if (isNaN(dateB)) return -1;
          return dateB - dateA;
        });

        let finalCombined = sortedCombined.slice(0, 3);

        if (finalCombined.length < 3) {
          const extraDummy = [...dummyBerita, ...dummyArtikel]
            .filter(d => !finalCombined.find(f => (f.id || f._id) === (d.id || d._id)))
            .sort((a, b) => {
              const dateA = parseDate(a.tanggal);
              const dateB = parseDate(b.tanggal);
              return dateB - dateA;
            });
          finalCombined = [...finalCombined, ...extraDummy].slice(0, 3);
        }

        setData(finalCombined);
      } catch (error) {
        console.error("Error fetching data:", error);
        const dummyBerita = DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || [];
        const dummyArtikel = DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"] || [];
        const combinedDummy = [...dummyBerita, ...dummyArtikel].sort((a, b) => {
          const dateA = parseDate(a.tanggal);
          const dateB = parseDate(b.tanggal);
          return dateB - dateA;
        });
        setData(combinedDummy.slice(0, 3));
      }
    };

    fetchData();
  }, [currentLang]);

  return { data };
}

export function useGetDataFromApi(params, secondParams = "", id = "") {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/${params}`;
      if (secondParams) url += `/${secondParams}`;
      if (id) url += `/${id}`;
      const result = await fetch(`${url}`);
      if (!result.ok) throw new Error("Failed to fetch data");
      const resultData = await result.json();
      setData(resultData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [params, secondParams, id, BASE_URL]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, error, getData };
}

export function usePostToApi(data, setData, route, path) {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFile = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const fileSizeInMB = selectedFile.size / 1024 / 1024;
      if (fileSizeInMB > 2) {
        alert(
          "Ukuran file melebihi 2MB. Silakan upload file yang lebih kecil."
        );
      } else {
        // Generate nama file dengan timestamp di sini
        const timestamp = Date.now();
        const generatedFilename = `${timestamp}-${selectedFile.name}`;
        setUploadedFileName(generatedFilename);
        setFileName(selectedFile);
        setError(null);
      }
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (fileName) {
      formData.append("gambar", fileName);
    }

    try {
      const RESPONSE = await axios.post(`${base_url}/${route}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Log response untuk debug

      if (RESPONSE.status === 200) {
        // Simpan nama file dari response
        if (RESPONSE.data.gambar) {
          setUploadedFileName(RESPONSE.data.gambar);
        }

        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          navigate(path);
        }, 1500);
      }

      return RESPONSE.data;
    } catch (error) {
      setError(`Gagal mengirim data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleFile,
    handleChange,
    handlePost,
    isLoading,
    error,
    fileName,
    setIsSuccess,
    isSuccess,
    uploadedFileName
  };
}

export function usePostMultipleImageToApi(data, setData, route, path) {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const selectedFiles = e.target.files;
    const fileArray = Array.from(selectedFiles);
    const isValid = fileArray.every((file) => file.size <= 2 * 1024 * 1024);

    if (!isValid) {
      alert(
        "Salah satu file melebihi 2MB. Silakan upload file yang lebih kecil."
      );
    } else {
      setFileName(fileArray); // Menyimpan array file
      setError(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (fileName) {
      fileName.forEach((file) => {
        formData.append("gambar", file);
      });
    }

    try {
      const RESPONSE = await axios.post(`${base_url}/${route}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (RESPONSE.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate(path);
        }, 1500);
      }
    } catch (error) {
      setError(`Gagal mengirim data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleFile,
    handleChange,
    handlePost,
    isLoading,
    error,
    fileName,
    setIsSuccess,
    isSuccess,
  };
}

export function usePutToApi(id, route) {
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const base_url = process.env.REACT_APP_BASE_URL;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${base_url}/${route}`);
      const filteredData = response.data.find((ele) => {
        return ele._id ? ele._id === id : ele.id === id;
      });
      setData(filteredData || {});
    } catch (error) {
      setError(`Tidak dapat mengambil data sebelumnya: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [id, route, base_url]);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      if (name === "tanggal" && value === "") {
        const todayDate = new Date().toISOString().split("T")[0];
        return { ...prevData, [name]: todayDate };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      alert(
        "Salah satu file melebihi 2MB. Silakan upload file yang lebih kecil."
      );
    } else {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    if (file) {
      formData.append("gambar", file);
    }

    Object.keys(data).forEach((key) => {
      if (key !== "_id" && key !== "id") {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await axios.put(
        `${base_url}/${route}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          nav(`/admincms/${route}`);
        }, 1500);
      }
    } catch (error) {
      setError(`Update gagal: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleChange,
    handleFile,
    handleUpdate,
    data,
    file,
    isLoading,
    isSuccess,
    error,
  };
}


export function usePutMultipleImageToApi(id, route) {
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const base_url = process.env.REACT_APP_BASE_URL;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${base_url}/${route}`);
      const filteredData = response.data.find((ele) => {
        return ele._id ? ele._id === id : ele.id === id;
      });
      setData(filteredData || {});
    } catch (error) {
      alert(`Tidak dapat mengambil data sebelumnya: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [id, route, base_url]);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    // const selectedFiles = Array.from(e.target.files);
    // const validFiles = selectedFiles.filter(file => file.size <= 2 * 1024 * 1024);
    // if (validFiles.length < selectedFiles.length) {
    //   alert("Beberapa file yang dipilih lebih besar dari 2MB dan tidak akan diunggah.");
    // } else {
    //   setFiles(validFiles); // Reset files dengan file baru
    //   setError(null);
    // }

    const kumpulanGambar = Array.from(e.target.files);
    const gambarValid = kumpulanGambar.every(
      (gambar) => gambar.size <= 2 * 1024 * 1024
    );

    if (!gambarValid) {
      alert(
        "Salah satu file melebihi 2MB. Silakan upload file yang lebih kecil."
      );
    } else {
      setFiles(kumpulanGambar);
      setError(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    // Hapus gambar dari data karena gambar adalah file, bukan string
    delete data.gambar;

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("gambar", file); // Ubah ke "gambar" untuk setiap file
      });
    }

    Object.keys(data).forEach((key) => {
      if (key !== "_id" && key !== "id") {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await axios.put(
        `${base_url}/${route}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          nav(`/admincms/${route}`);
        }, 1500);
      }
    } catch (error) {
      setError(`Update gagal: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleChange,
    handleFile,
    handleUpdate,
    data,
    files,
    isLoading,
    isSuccess,
    error,
  };
}

export function useFindContent(apiRoute, id) {
  const [contentFound, setContentFound] = useState(null);
  const { data, getData } = useGetDataFromApi(apiRoute);

  useEffect(() => {
    if (data && id) {
      const found = data.find((item) => item.id === id || item._id === id);
      setContentFound(found || null);
    }
  }, [data, id]);

  const refetch = useCallback(() => {
    getData();
  }, [getData]);

  return { contentFound, refetch };
}

export function useSearchContent(apiRoute, keyword) {
  const { data } = useGetDataFromApi(apiRoute);

  const result = data
    ? data.filter((item) => {
      const judul = item.judul ? item.judul.toLowerCase() : "";
      const judulVideo = item.judul_video
        ? item.judul_video.toLowerCase()
        : "";
      const judulArtikel = item.judul_artikel
        ? item.judul_artikel.toLowerCase()
        : "";

      return (
        judul.includes(keyword.toLowerCase()) ||
        judulArtikel.includes(keyword.toLowerCase()) ||
        judulVideo.includes(keyword.toLowerCase())
      );
    })
    : [];

  return { result };
}

export function useNavlinks() {
  const { t } = useTranslation();
  const { data } = useGetDataFromApi("profile");

  const navLinks = useMemo(() => [
    { link: "/", name: t("nav.home") },
    {
      link: "",
      name: t("nav.aboutUs"),
      subMenu: data && data.length > 0
        ? data.map((ele) => ({
          id: ele.id || ele._id,
          headline: ele.headline || ele.judul,
          headlineArab: ele.headlineArab || ele.judulArab,
          headlineEng: ele.headlineEng || ele.judulEng
        }))
        : [
          {
            id: "visi-misi",
            headline: "Visi & Misi",
            headlineArab: "الرؤية والرسالة",
            headlineEng: "Vision & Mission"
          },
          {
            id: "sejarah",
            headline: "Sejarah",
            headlineArab: "التاريخ",
            headlineEng: "History"
          },
          {
            id: "organisasi",
            headline: "Organisasi",
            headlineArab: "المنظمة",
            headlineEng: "Organization"
          },
        ],
    },
    {
      link: "",
      name: t("nav.jenjang"),
      subMenu: [
        {
          link: "",
          name: t("nav.prasekolah"),
          subMenu: [
            { name: "PAUD", link: "/jenjang/paud" },
            { name: "Kids Center", link: "/jenjang/kids-center" },
            { name: "RA", link: "/jenjang/ra" },
            { name: "TKQ", link: "/jenjang/tkq" },
            { name: "TPQ", link: "/jenjang/tpq" },
          ],
        },
        {
          link: "",
          name: t("nav.dikdas"),
          subMenu: [
            { name: "SDIT", link: "/jenjang/sdit" },
            { name: "DTA", link: "/jenjang/dta" },
          ],
        },
        {
          link: "",
          name: t("nav.ppi"),
          subMenu: [
            { name: "Pondok Pesantren", link: "/jenjang/pesantren" },
            { name: "MTs", link: "/jenjang/mts" },
            { name: "MA", link: "/jenjang/ma" },
            { name: "SMK", link: "/jenjang/smk" },
            { name: "SMP IT", link: "/jenjang/smp-it" },
            { name: "SMA IT", link: "/jenjang/sma-it" },
          ],
        },
        { name: "Dikti", link: "/jenjang/dikti" },
      ],
    },
    {
      link: "",
      name: t("nav.konten"),
      subMenu: [
        { name: t("nav.berita"), link: "/kumpulan/berita" },
        { name: t("nav.articles"), link: "/kumpulan/artikel" },
      ],
    },
    { link: "/galeri", name: t("nav.galeri") },
  ], [data, t]);

  return { navLinks, t };
}

export function useConvertLang(ele, data) {
  const { bahasa } = useLanguage();
  const [converted, setConverted] = useState("");

  useEffect(() => {
    setConverted(getConvertLang(ele, data, bahasa));
  }, [ele, bahasa, data]);
  return converted;
}

export function getConvertLang(ele, data, bahasa) {
  if (!ele) return "";

  if (data === "title") {
    switch (bahasa) {
      case "ar":
        return (
          ele.judulArab ||
          ele.judul_artikelArab ||
          ele.judul_sorotanArab ||
          ele.judul_videoArab ||
          ele.judul_artikel ||
          ele.judul ||
          ele.title ||
          ele.headline ||
          ""
        );
      case "en":
        return (
          ele.judulEng ||
          ele.judul_artikelEng ||
          ele.judul_sorotanEng ||
          ele.judul_videoEng ||
          ele.judul_artikel ||
          ele.judul ||
          ele.title ||
          ele.headline ||
          ""
        );
      default:
        return (
          ele.judul ||
          ele.judul_artikel ||
          ele.judul_sorotan ||
          ele.judul_video ||
          ele.title ||
          ele.headline ||
          ""
        );
    }
  } else if (data === "deskripsi") {
    switch (bahasa) {
      case "ar":
        return ele.deskripsiArab || ele.deskripsi_artikelArab || ele.deskripsi || "";
      case "en":
        return ele.deskripsiEng || ele.deskripsi_artikelEng || ele.deskripsi || "";
      default:
        return ele.deskripsi || ele.deskripsi_artikel || "";
    }
  } else if (data === "tanggal") {
    switch (bahasa) {
      case "ar":
        return ele.tanggalArab || ele.tanggal || ele.headline;
      case "en":
        return ele.tanggalEng || ele.tanggal || ele.headline;
      default:
        return ele.tanggal;
    }
  } else if (data === "headline") {
    switch (bahasa) {
      case "ar":
        return ele.headlineArab || ele.headline;
      case "en":
        return ele.headlineEng || ele.headline;
      default:
        return ele.headline;
    }
  }

  // Generic case for any field
  const langSuffix = bahasa === "id" ? "" : bahasa === "en" ? "Eng" : "Arab";
  return ele[data + langSuffix] || ele[data] || "";
}

export function useDayName() {
  const { t } = useTranslation();
  const today = moment().format("DD MMMM YYYY");

  const parseDateString = (dateString) => {
    if (!dateString) return null;

    // Try common formats using moment
    const formats = [
      "DD MMMM YYYY",
      "D MMMM YYYY",
      "DD MMM YYYY",
      "D MMM YYYY",
      "YYYY-MM-DD",
      "DD-MM-YYYY",
    ];

    const m = moment(dateString, formats, true);
    if (m.isValid()) return m.toDate();

    // Fallback if Indonesian name is used but locale is English/Arabic
    const mIndo = moment(dateString, formats, 'id', true);
    if (mIndo.isValid()) return mIndo.toDate();

    // If still not valid, try without strict parsing
    const mFlexible = moment(dateString);
    if (mFlexible.isValid()) return mFlexible.toDate();

    return null;
  };

  const getDayName = (dateString) => {
    const date = parseDateString(dateString);
    if (!date) return ""; // Return empty instead of 'today' string to avoid translation key pollution

    const dayName = moment(date).locale('id').format("dddd"); // Always get Indonesian name to map to keys
    return dayName === "Minggu" ? "ahad" : dayName.toLowerCase();
  };

  const getTranslatedDayName = (dateString) => {
    const key = getDayName(dateString);
    return key ? t(`days.${key}`) : "";
  };

  const formatDate = (dateString, formatStr = "d MMM") => {
    const date = parseDateString(dateString);
    if (!date) return dateString;
    return format(date, formatStr, { locale: id });
  };

  return {
    formatDate,
    getDayName,
    getTranslatedDayName,
  };
}

export function useConvertToSlug(title) {
  const convertToSlug = (judul) => {
    return judul
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const slug = useMemo(() => convertToSlug(title), [title]);

  return slug;
}

export function handleUpdateDate(handleChange) {
  const UpdateDate = (date) => {
    const formattedDate = moment(date).format("DD MMMM YYYY"); // Format tanggal
    handleChange({
      target: {
        name: "tanggal",
        value: formattedDate,
      },
    });
  };

  return { UpdateDate };
}

export function handleAddDate(setData) {
  const AddDate = (date) => {
    const formattedDate = moment(date).format("DD MMMM YYYY"); // Format tanggal
    setData((prevData) => ({
      ...prevData,
      tanggal: formattedDate,
    }));
  };

  return { AddDate };
}
