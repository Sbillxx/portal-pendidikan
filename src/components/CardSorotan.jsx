import { Link } from "react-router-dom";
import { TanggalWaktu } from "./index";
import { memo } from "react";
import { useConvertToSlug } from "../Func/GlobalFunction";

const CardSorotan = memo(
  ({ kategori_sorotan, tanggal, waktu, judul_sorotan, id, hari }) => {
    const slug = useConvertToSlug(judul_sorotan)
    const Badge = ({ kategori }) => (
      <span className="px-3 py-1 text-white text-[10px] font-Montserrat font-medium rounded-md uppercase bg-idi-900 w-fit">
        {kategori}
      </span>
    );

    return (
      <Link to={`/content/agenda/${id}/${slug}`} className="flex flex-col gap-4">
        <Badge kategori={kategori_sorotan} />
        <div className="deskripsi-sorotan flex flex-col gap-[2px]">
          <h2 className="text-base-semibold text-neutral-900 line-clamp-2 dark:text-slate-300">
            {judul_sorotan}
          </h2>
          <TanggalWaktu tanggal={tanggal} waktu={waktu} hari={hari} />
        </div>
      </Link>
    );
  }
);

export default CardSorotan;
