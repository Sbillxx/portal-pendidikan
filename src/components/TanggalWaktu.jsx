import { memo } from "react";

const TanggalWaktu = memo(({ tanggal, waktu, hari }) => (
  <div className="text-xs-medium text-neutral-600 dark:text-neutral-400 flex gap-2 items-center flex-wrap">
    <span className="">{tanggal}</span>
    <div
      className={`divider w-[0.5px] h-3 bg-neutral-400 ${
        waktu ? "visible" : "invisible"
      }`}
    ></div>
    <span>{waktu}</span>
    <div
      className={`divider w-[0.5px] h-3 bg-neutral-400 ${
        waktu ? "visible" : "invisible"
      }`}
    ></div>

    <span>{hari === "Minggu" ? "Ahad" : hari}</span>
  </div>
));
export default TanggalWaktu;
