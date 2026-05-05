import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts";
import { useTranslation } from "react-i18next";
import { useGetDataFromApi } from "../Func/GlobalFunction";
import CardLiputan from "../components/CardLiputan";
import { DUMMY_BERITA } from "../utils/dummyData";

// Data Mapping untuk setiap Unit Jenjang Individual
const JENJANG_DATA = {
    paud: { title: "Pendidikan Anak Usia Dini (PAUD)", subtitle: "Membangun Karakter Anak Sejak Usia Dini dengan Pendekatan Ramah Anak.", tag: "paud" },
    "kids-center": { title: "Idrisiyyah Kids Center", subtitle: "Bermain, Belajar, dan Berkembang dalam Lingkungan Islami Integratif.", tag: "kids center" },
    ra: { title: "Raudhatul Athfal (RA)", subtitle: "Taman Belajar yang Menyenangkan dan Bernilai Edukatif Tinggi.", tag: "ra" },
    tkq: { title: "TKQ", subtitle: "Taman Kanak-Kanak Al-Qur'an untuk Pembentukan Dasar Akhlaq.", tag: "tkq" },
    tpq: { title: "TPQ", subtitle: "Taman Pendidikan Al-Qur'an untuk Mengasah Kemahiran Membaca Al-Qur'an.", tag: "tpq" },
    sdit: { title: "SDIT Idrisiyyah", subtitle: "Sekolah Dasar Islam Terpadu, Mengintegrasikan Ilmu Umum dan Agama.", tag: "sdit" },
    dta: { title: "Diniyah Takmiliyah Awaliyah (DTA)", subtitle: "Pendidikan Dasar Keagamaan sebagai Pelengkap Pendidikan Formal.", tag: "dta" },
    pesantren: { title: "Pondok Pesantren Idrisiyyah", subtitle: "Pusat Tarbiyah dan Dakwah, Mencetak Kader Ulama Berakhlak Mulia.", tag: "pesantren" },
    mts: { title: "MTs Idrisiyyah", subtitle: "Pendidikan Tingkat Menengah Berbasis Agama Islam Terpadu.", tag: "mts" },
    ma: { title: "MA Idrisiyyah", subtitle: "Pendidikan Jenjang Atas Terdepan dalam Prestasi dan Akhlaq.", tag: "ma" },
    smk: { title: "SMK Idrisiyyah", subtitle: "Sekolah Menengah Kejuruan, Membekali Skill Siap Kerja dan Berjiwa Qur'ani.", tag: "smk" },
    "smp-it": { title: "SMP IT Idrisiyyah", subtitle: "Sekolah Menengah Pertama Islam Terpadu, Memadukan Iptek dan Imtaq.", tag: "smp-it" },
    "sma-it": { title: "SMA IT Idrisiyyah", subtitle: "Sekolah Menengah Atas Islam Terpadu, Generasi Pemimpin Masa Depan.", tag: "sma-it" },
    dikti: { title: "Pendidikan Tinggi (Dikti)", subtitle: "Mencetak Sarjana Intelektual, Profesional, dan Berakhlaq Karimah.", tag: "dikti" }
};

const JenjangPage = () => {
    const { jenjangId } = useParams();
    const { i18n } = useTranslation();

    const info = JENJANG_DATA[jenjangId] || {
        title: jenjangId.replace("-", " ").toUpperCase(),
        subtitle: "Selamat datang di Portal Informasi Jenjang Pendidikan.",
        tag: jenjangId.replace("-", " ")
    };

    // Fetch Berita Data
    const { data: apiLiputan, isLoading } = useGetDataFromApi("liputan");
    const lang = (i18n.language || "id").split("-")[0].toLowerCase();
    const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";
    const baseData = (apiLiputan && apiLiputan.length > 0) ? apiLiputan : (DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || []);

    // Filter Berita berdasarkan unit spesifik
    const displayBerita = useMemo(() => {
        const filtered = baseData.filter(berita => {
            const content = JSON.stringify(berita).toLowerCase();
            return content.includes(info.tag.toLowerCase());
        });

        // Fallback ke beberapa berita terbaru jika tidak ada yang cocok sama sekali
        return filtered.length > 0 ? filtered.slice(0, 8) : baseData.slice(0, 4);
    }, [baseData, info.tag]);

    return (
        <MainLayout>
            <div className="w-full flex flex-col gap-12 min-h-screen">

                {/* 1. Hero / Header Banner */}
                <section className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-idi-900 text-white min-h-[30vh] sm:min-h-[40vh] flex items-center justify-center p-8 text-center mt-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-idi-950 via-idi-800 to-idi-900 opacity-90"></div>
                    <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto gap-4">
                        <span className="uppercase tracking-widest text-sm font-semibold text-pesantrenGreen-400">Portal Pendidikan Terpadu</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            {info.title}
                        </h1>
                        <p className="text-lg md:text-xl text-idi-200 mt-2 max-w-2xl font-light">
                            {info.subtitle}
                        </p>
                    </div>
                </section>

                {/* 2. Sambutan / Highlight Section */}
                <section className="w-full py-6 md:py-12 flex flex-col lg:flex-row gap-8 items-center bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-10 shadow-sm border border-neutral-100 dark:border-neutral-700">
                    <div className="w-full lg:w-1/3 aspect-square max-w-sm rounded-2xl overflow-hidden shadow-lg bg-neutral-200 dark:bg-neutral-700 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                            <p className="font-semibold px-4 text-center">Profil Unit {info.title}</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        <h2 className="text-3xl font-bold text-idi-800 dark:text-idi-300">Selamat Datang di {info.title}</h2>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
                            Unit ini merupakan bagian integral dari sistem pendidikan kami yang berfokus pada pengembangan potensi siswa secara menyeluruh. Kami memadukan standar akademis yang tinggi dengan penanaman nilai-nilai keislaman untuk mencetak generasi yang cerdas dan berintegritas.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                            <div className="flex flex-col items-center bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-700">
                                <span className="text-sm font-bold text-idi-700 dark:text-idi-400 text-center">Kurikulum Terapan</span>
                            </div>
                            <div className="flex flex-col items-center bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-700">
                                <span className="text-sm font-bold text-idi-700 dark:text-idi-400 text-center">Fasilitas Lengkap</span>
                            </div>
                            <div className="flex flex-col items-center bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-700">
                                <span className="text-sm font-bold text-idi-700 dark:text-idi-400 text-center">Pembimbingan Intensif</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Portal Berita / Kegiatan */}
                <section className="w-full pb-16 flex flex-col gap-6">
                    <div className="flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-pesantrenGreen-600 pl-4 text-idi-900 dark:text-white uppercase mb-2">Kegiatan Terbaru di {info.title}</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 pl-5 mb-6">Informasi dan dokumentasi kegiatan harian siswa.</p>
                    </div>

                    {isLoading ? (
                        <div className="w-full flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-idi-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayBerita.map((item, idx) => (
                                <CardLiputan key={idx} liputan={item} type="liputan" />
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </MainLayout>
    );
};

export default JenjangPage;
