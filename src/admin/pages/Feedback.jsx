import React from "react";
import { MainLayout } from "../layout";
import { useGetDataFromApi } from "../../Func/GlobalFunction";
import { HiOutlineChartBar, HiOutlineChatAlt2 } from 'react-icons/hi';

const Feedback = () => {
  const { data } = useGetDataFromApi("saran");

  // Hitung kategori dari data API
  const categoryCount = data ? data.reduce((acc, item) => {
    acc[item.kategori] = (acc[item.kategori] || 0) + 1;
    return acc;
  }, {}) : {};

  const getCategoryStyle = (category) => {
    const styles = {
      "Saran Konten": {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-100"
      },
      "Fitur Rusak": {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-100"
      },
      "Lainnya": {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100"
      }
    };
    return styles[category] || styles["Lainnya"];
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <HiOutlineChatAlt2 className="w-6 h-6 text-gray-600" />
            <h1 className="text-2xl-bold text-gray-900 dark:text-slate-100">
              Kumpulan Saran
            </h1>
          </div>
          <div className="text-sm-medium text-gray-500 dark:text-slate-400">
            {data?.length || 0} saran diterima
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Feedback List */}
          <div className="lg:w-2/3 space-y-4">
            {data && [...data].reverse().map((item, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm shadow-gray-400/70 border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col ">
                    <h3 className="text-sm-medium text-gray-900 dark:text-slate-100">
                      {item.penulis}
                    </h3>
                    <p className="text-xs-regular text-gray-500 dark:text-slate-400 mt-1">
                      {item.tanggal} • {item.waktu_terakhir}
                    </p>
                  </div>
                  <div className={`inline-flex order-first text-xs-semibold lg:text-small-semibold lg:order-last w-max items-center px-3 py-1 rounded-full ${getCategoryStyle(item.kategori).bg} ${getCategoryStyle(item.kategori).text} border ${getCategoryStyle(item.kategori).border}`}>
                    {item.kategori}
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-slate-300 text-base-regular">
                  {item.saran}
                </p>
              </div>
            ))}
          </div>

          {/* Sidebar - Statistics */}
          <div className="lg:w-1/3 order-first lg:order-last">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-0">

              <div className="flex items-center gap-2 mb-6">
                <HiOutlineChartBar className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg-semibold text-gray-900 dark:text-slate-100">
                  Statistik Kategori
                </h2>
              </div>

              <div className="space-y-3">
                {Object.entries(categoryCount).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className={`flex items-center gap-2 ${getCategoryStyle(category).text}`}>
                      <div className={`w-2 h-2 rounded-full ${getCategoryStyle(category).bg}`} />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                      {count}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Feedback;