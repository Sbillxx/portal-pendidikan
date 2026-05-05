import { useMemo, useCallback, memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useConvertLang, useConvertToSlug } from "../Func/GlobalFunction";
import { get_thumbnail } from "../utils/variable";

const ResultCard = memo(({ res, route, onClose }) => {
  const title = useConvertLang(res, "title");
  const date = useConvertLang(res, "tanggal");
  const slug = useConvertToSlug(title);

  return (
    <Link
      to={`/${route}/${res._id || res.id}/${slug}`}
      onClick={onClose}
      className="hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg p-3 lg:ml-3 flex items-center gap-3"
    >
      <img
        src={`${get_thumbnail}${typeof res.gambar === "string" ? res.gambar : res.gambar[0]
          }`}
        alt="thumbnail"
        className="w-16 h-10 object-cover rounded-sm"
      />
      <div className="flex flex-col">
        <p className="text-small-semibold lg:text-lg-semibold dark:text-slate-300 line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs-medium text-neutral-700 dark:text-neutral-400">
            {date}
          </p>
          {res.waktu && (
            <p className="text-xs-medium text-neutral-700 dark:text-neutral-400">
              {res.waktu}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
});

const SearchResults = memo(({ result, onClose }) => {
  const { t } = useTranslation();

  const categories = useMemo(
    () => [
      {
        key: "agenda",
        label: t("title.section.agenda"),
        route: "content/agenda",
      },
      {
        key: "infografik",
        label: t("title.section.infografik"),
        route: "content/infografik",
      },
      {
        key: "liputan",
        label: t("title.section.berita"),
        route: "content/berita",
      },
      {
        key: "videokajian",
        label: t("title.section.videokajian"),
        route: "content/videokajian",
      },
      {
        key: "artikelkajian",
        label: t("title.section.artikelkajian"),
        route: "content/artikel",
      },
    ],
    [t]
  );

  const limitedResults = useMemo(
    () =>
      categories.reduce((acc, { key }) => {
        if (result[key]?.length > 0) {
          acc[key] = result[key].slice(0, 5);
        }
        return acc;
      }, {}),
    [result, categories]
  );

  return (
    <div className="search-panel bg-white dark:bg-neutral-800 h-full w-full rounded-lg top-12 lg:p-4 flex-col gap-4 flex z-50 overflow-y-auto divide-y divide-solid">
      {categories.map(
        ({ key, label, route }) =>
          limitedResults[key]?.length > 0 && (
            <div key={key} className="py-4 px-4 lg:px-0">
              <h2 className="text-small-semibold text-neutral-700 dark:text-neutral-300 border-neutral-300">
                {label.toLocaleLowerCase()}
              </h2>
              {limitedResults[key].map((res, index) => (
                <ResultCard
                  key={`${key}-${res._id || res.id || index}`}
                  res={res}
                  route={route}
                  onClose={onClose}
                />
              ))}
            </div>
          )
      )}
    </div>
  );
});

const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const InputSearch = ({ keyword, setKeyword, result, func }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(keyword);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  const handleInputChange = useCallback(
    debounce((value) => setKeyword(value), 500),
    [setKeyword]
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(e.target.value);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="fixed flex lg:pt-10 justify-center z-40 inset-0 bg-neutral-600/60 h-full w-full">
      <div className="w-full lg:w-2/3 flex flex-col relative group gap-2 order-first lg:order-last h-screen lg:h-[90vh] p-5 lg:rounded-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="search"
            placeholder={t("cari")}
            value={inputValue}
            onChange={handleChange}
            className="rounded-lg w-full peer focus:ring-0 bg-white dark:bg-neutral-800 border-none outline-none p-3 placeholder:text-xs-semibold placeholder:text-neutral-400"
          />
          <button
            type="button"
            onClick={func}
            className="bg-idi-800 hover:bg-idi-900 rounded-lg px-4 py-3 text-base-medium text-white transition duration-300"
          >
            {t("close")}
          </button>
        </form>

        {keyword && <SearchResults result={result} onClose={func} />}
      </div>
    </div>
  );
};

export default InputSearch;
