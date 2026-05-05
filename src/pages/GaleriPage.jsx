import React, { useState, useEffect, useMemo } from "react";
import { MainLayout } from "../layouts";
import { useGetDataFromApi, useDayName, getConvertLang } from "../Func/GlobalFunction";
import { useLanguage } from "../Func/LanguageContext";
import { useTranslation } from "react-i18next";
import { HiPlay, HiPhotograph, HiX } from "react-icons/hi";
import { Modal } from "flowbite-react";
import moment from "moment";
import { get_thumbnail } from "../utils/variable";
import { DUMMY_BERITA } from "../utils/dummyData";

const GaleriPage = () => {
    const { t, i18n } = useTranslation();
    const { bahasa } = useLanguage();
    const { getTranslatedDayName } = useDayName();

    // Data Fetching
    const { data: apiLiputan, isLoading: loadLiputan } = useGetDataFromApi("liputan");
    const { data: apiVideo, isLoading: loadVideo } = useGetDataFromApi("videokajian");

    const lang = (i18n.language || "id").split("-")[0].toLowerCase();
    const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";

    // Use dummy data as fallback
    const liputanData = (apiLiputan && apiLiputan.length > 0) ? apiLiputan : (DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || []);
    const videoData = (apiVideo && apiVideo.length > 0) ? apiVideo : (DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || []);

    // State
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [selectedDate, setSelectedDate] = useState("Semua");
    const [galleryItems, setGalleryItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Process & Combine Data
    useEffect(() => {
        let combined = [];

        if (liputanData && liputanData.length > 0) {
            const fotos = liputanData.map(item => ({
                ...item,
                type: "Foto",
                displayImage: item.gambar?.startsWith("/") ? item.gambar : `${get_thumbnail}${item.gambar}`,
                displayTitle: getConvertLang(item, "title", bahasa),
                rawDate: moment(item.tanggal, ["DD MMMM YYYY", "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ss.SSSZ"])
            }));
            combined = [...combined, ...fotos];
        }

        if (videoData && videoData.length > 0) {
            const videos = videoData.map(item => ({
                ...item,
                type: "Video",
                displayImage: item.gambar ? (item.gambar.startsWith("/") ? item.gambar : `${get_thumbnail}${item.gambar}`) : `https://img.youtube.com/vi/${item.link}/maxresdefault.jpg`,
                displayTitle: getConvertLang(item, "title", bahasa),
                rawDate: moment(item.tanggal, ["DD MMMM YYYY", "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ss.SSSZ"])
            }));
            combined = [...combined, ...videos];
        }

        // Sort by Date (newest first)
        combined.sort((a, b) => b.rawDate - a.rawDate);

        // Add formatted Month-Year string for dropdown
        const formattedCombined = combined.map(item => {
            // Indonesian locale for consistent month names in dropdown
            const monthYear = item.rawDate.locale('id').format("MMMM YYYY");
            return { ...item, monthYear };
        });

        setGalleryItems(formattedCombined);
    }, [liputanData, videoData, bahasa, getTranslatedDayName]);

    // Extract unique Month-Year combinations for Date Dropdown
    const availableDates = useMemo(() => {
        const dates = new Set(galleryItems.map(item => item.monthYear));
        return ["Semua", ...Array.from(dates)];
    }, [galleryItems]);

    // Double Filter Items
    const filteredItems = useMemo(() => {
        return galleryItems.filter(item => {
            const matchCategory = selectedCategory === "Semua" || item.type === selectedCategory;
            const matchDate = selectedDate === "Semua" || item.monthYear === selectedDate;
            return matchCategory && matchDate;
        });
    }, [galleryItems, selectedCategory, selectedDate]);

    // Modal Handlers
    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const isLoading = loadLiputan || loadVideo;

    return (
        <MainLayout>
            <div className="w-full flex flex-col gap-8 min-h-screen">

                {/* Header Section */}
                <section className="bg-idi-800 dark:bg-idi-950 rounded-xl p-8 text-white flex flex-col items-center justify-center text-center shadow-lg border-b-4 border-idi-600">
                    <h1 className="text-3xl font-bold mb-2">{t("nav.galeri") || "Galeri Edukasi"}</h1>
                    <p className="text-idi-200 max-w-2xl">Jelajahi berbagai dokumentasi foto liputan dan video kajian dari lembaga kami.</p>
                </section>

                {/* Dropdown Filters */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
                    <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Kategori</label>
                        <select
                            className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm rounded-lg focus:ring-idi-500 focus:border-idi-500 block w-full p-2.5 outline-none transition-shadow hover:shadow-sm"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="Semua">Semua Kategori</option>
                            <option value="Foto">Foto</option>
                            <option value="Video">Video</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Bulan Kejadian</label>
                        <select
                            className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm rounded-lg focus:ring-idi-500 focus:border-idi-500 block w-full p-2.5 outline-none transition-shadow hover:shadow-sm sm:min-w-[200px]"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            {availableDates.map((date, idx) => (
                                <option key={idx} value={date}>
                                    {date === "Semua" ? "Semua Bulan" : date}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Gallery Grid */}
                {isLoading ? (
                    <div className="w-full flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-idi-600"></div>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="w-full text-center py-20 text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                        Tidak ada galeri yang cocok dengan filter {selectedCategory !== "Semua" ? `Kategori ${selectedCategory}` : ""} {selectedDate !== "Semua" ? `di bulan ${selectedDate}` : ""}.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-100 dark:border-neutral-700 aspect-square"
                                onClick={() => openModal(item)}
                            >
                                <img
                                    src={item.displayImage}
                                    alt={item.displayTitle}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <span className="text-white text-sm font-semibold mb-1 truncate">{item.displayTitle}</span>
                                    <span className="text-neutral-300 text-xs flex items-center gap-1">
                                        {item.tanggal}
                                    </span>
                                </div>

                                {/* Badge / Icon Layer */}
                                <div className="absolute top-3 right-3">
                                    {item.type === "Video" && (
                                        <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
                                            <HiPlay className="w-4 h-4" />
                                        </div>
                                    )}
                                    {item.type === "Foto" && (
                                        <div className="bg-idi-600 text-white p-2 rounded-full shadow-lg">
                                            <HiPhotograph className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal Lightbox */}
                <Modal show={isModalOpen} onClose={closeModal} size="4xl" popup className="z-[100]">
                    <Modal.Header className="border-none p-2 absolute right-0 top-0 z-10" />
                    <Modal.Body className="p-0 bg-black rounded-lg overflow-hidden flex items-center justify-center min-h-[50vh]">
                        {selectedItem && (
                            <div className="w-full flex justify-center items-center flex-col">
                                {selectedItem.type === "Video" && selectedItem.link ? (
                                    <div className="w-full aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${selectedItem.link}?autoplay=1`}
                                            title={selectedItem.displayTitle}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <img
                                        src={selectedItem.displayImage}
                                        alt={selectedItem.displayTitle}
                                        className="max-h-[85vh] max-w-full object-contain"
                                    />
                                )}
                                <div className="w-full bg-idi-950 p-4 text-white">
                                    <h3 className="text-lg font-bold">{selectedItem.displayTitle}</h3>
                                    <p className="text-sm text-neutral-400 mt-1">{selectedItem.tanggal} • {selectedItem.type}</p>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>

            </div>
        </MainLayout>
    );
};

export default GaleriPage;
