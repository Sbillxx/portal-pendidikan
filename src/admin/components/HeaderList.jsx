import { Link } from "react-router-dom";

const HeaderList = ({ title, path }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-lg-bold text-neutral-900 dark:text-slate-300">{title}</h1>
      {path && (
        <Link to={path} className="text-white bg-idi-800 dark:bg-idi-700 dark:hover:bg-idi-800 px-4 py-3 rounded-lg">
            Tambah
        </Link>
      )}
    </div>
  );
};

export default HeaderList;
