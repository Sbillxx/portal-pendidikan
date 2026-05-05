import React from "react";

const InputDate = ({ getDate, konteks }) => {
  return (
    <div className="tanggal flex flex-col gap-2">
      <p className="text-sm font-medium">Tanggal {konteks}</p>
      <input
        type="date"
        className="rounded-lg border-gray-300 bg-gray-50"
        onChange={(e) => getDate(e.target.value)} // Ambil tanggal dari input
        name="tanggal"
      />
    </div>
  );
};

export default InputDate;
