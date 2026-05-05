import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { arabia, english, pesantrenLogo, indonesia } from "../assets";
import {
  useConvertLang,
  useConvertToSlug,
  useNavlinks,
  useSearchContent,
} from "../Func/GlobalFunction";
import i18n from "../i18n";
import { DarkThemeToggle, Dropdown } from "flowbite-react";
import InputSearch from "./InputSearch";
import { useLanguage } from "../Func/LanguageContext";
import { HiChevronDown, HiOutlineSearch, HiTranslate } from "react-icons/hi";

const NavLink = ({ ele, subEle, onClick }) => {
  const [showSub, setShowSub] = useState(false);
  const timeoutRef = useRef(null);

  const convertedHeadline = useConvertLang(subEle, "headline");
  const slug = useConvertToSlug(subEle?.headline || subEle?.judul || "");

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowSub(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      timeoutRef.current = setTimeout(() => setShowSub(false), 100);
    }
  };

  if (subEle.subMenu) {
    return (
      <div
        className="relative w-full group/nested"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={(e) => {
            if (window.innerWidth < 1024) {
              e.stopPropagation();
              setShowSub(!showSub);
            }
          }}
          className="w-full text-start text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 lg:text-neutral-900 text-small-medium hover:bg-neutral-200 lg:hover:bg-neutral-200 py-2 px-4 rounded-lg flex items-center justify-between transition-colors duration-200"
        >
          {subEle.name}
          <HiChevronDown className={`transition-all duration-300 ${showSub ? "rotate-180 lg:-rotate-90" : "lg:-rotate-90"}`} />
        </button>
        {showSub && (
          <div className="lg:absolute lg:left-[100%] lg:top-0 ml-4 lg:ml-0.5 flex flex-col gap-1 bg-neutral-200 dark:bg-neutral-800 lg:bg-white lg:dark:bg-neutral-800 rounded-lg lg:w-52 z-[60] p-1 shadow-xl lg:border lg:border-neutral-200 lg:dark:border-neutral-700 animate-in fade-in slide-in-from-left-2 duration-200">
            {subEle.subMenu.map((item, idx) => (
              <NavLink key={idx} ele={ele} subEle={item} onClick={onClick} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={
        ele.name === "Profile" ||
          ele.name === "Profil" ||
          ele.name === "الملف الشخصي" ||
          ele.name === "Tentang Kami" ||
          ele.name === "About Us" ||
          ele.name === "عن الطريقة"
          ? `/content/profile/${subEle.id || subEle._id}/${slug}`
          : subEle.link
      }
      onClick={onClick}
      className="text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 lg:text-neutral-900 text-small-medium hover:bg-neutral-200 lg:hover:bg-neutral-200 py-2 px-4 rounded-lg block transition-colors duration-200"
    >
      {ele.name === "Profile" ||
        ele.name === "Profil" ||
        ele.name === "الملف الشخصي" ||
        ele.name === "Tentang Kami" ||
        ele.name === "About Us" ||
        ele.name === "عن الطريقة"
        ? convertedHeadline || subEle?.headline || subEle?.judul
        : subEle.name}
    </Link>
  );
};

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const [selectedLang, setSelectedLang] = useState("id");
  const [activeSubMenu, setActiveSubMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const submenuRef = useRef(null);
  const navRef = useRef(null);

  const { navLinks, t } = useNavlinks();
  const { bahasa, setBahasa } = useLanguage();

  const handleModalSearch = () => {
    setSearch(!search);
  };

  const handleSubMenu = (menuId) => {
    if (activeMenuId === menuId) {
      // Jika menu yang sama diklik, tutup submenu
      setActiveMenuId(null);
      setActiveSubMenu(false);
    } else {
      // Jika menu berbeda diklik, buka submenu baru
      setActiveMenuId(menuId);
      setActiveSubMenu(true);
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang.code);
    i18n.changeLanguage(lang.code);
    setBahasa(lang.code);
  };

  const useMultiSearch = (keyword) => {
    const artikelKajian = useSearchContent("artikel/kajian", keyword);
    const artikelInfo = useSearchContent("artikel/info", keyword);
    const agenda = useSearchContent("agenda", keyword);
    const liputan = useSearchContent("liputan", keyword);
    const infografik = useSearchContent("infografik", keyword);
    const videoKajian = useSearchContent("videokajian", keyword);

    const searchResults = useMemo(
      () => ({
        artikelkajian: artikelKajian.result,
        artikelinfo: artikelInfo.result,
        agenda: agenda.result,
        liputan: liputan.result,
        infografik: infografik.result,
        videokajian: videoKajian.result,
      }),
      [artikelKajian, artikelInfo, agenda, liputan, infografik, videoKajian]
    );

    return searchResults;
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  useEffect(() => {
    localStorage.setItem("language", bahasa);
  }, [bahasa]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setActiveSubMenu(false);
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [submenuRef, navRef]);

  const LanguageDropdown = ({ className }) => {
    return (
      <div className={className}>
        <Dropdown
          label={
            <div className="flex items-center gap-2">
              {selectedLang === "" ? (
                <HiTranslate className="text-neutral-600" />
              ) : (
                <img
                  src={languages.find((lang) => lang.code === selectedLang).img}
                  alt={
                    "translate" ||
                    languages.find((lang) => lang.code === selectedLang).name
                  }
                  className="w-5 h-5"
                />
              )}
            </div>
          }
          arrowIcon={true}
          inline={true}
        >
          {languages.map((lang) => (
            <Dropdown.Item
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
            >
              <div className="flex items-center gap-2">
                <img src={lang.img} alt={lang.name} className="w-5 h-5" />
                {lang.name}
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    );
  };

  const HamburgerMenu = () => (
    <button
      aria-label="menu"
      onClick={() => setShow(!show)}
      className="menu-container"
    >
      <span className="menu-strip"></span>
      <span className="menu-strip"></span>
      <span className="menu-strip"></span>
    </button>
  );

  const SearchBar = () => (
    <>
      <HiOutlineSearch
        className="lg:text-neutral-700 text-idi-800 h-5 w-5 cursor-pointer"
        onClick={handleModalSearch}
      />

      {search && (
        <InputSearch
          keyword={keyword}
          result={searchResults}
          setKeyword={setKeyword}
          func={handleModalSearch}
        />
      )}
    </>
  );

  const languages = [
    { code: "id", name: "Indonesia", img: indonesia },
    { code: "en", name: "English", img: english },
    { code: "ar", name: "العربية", img: arabia },
  ];

  const searchResults = useMultiSearch(debouncedKeyword);

  return (
    <nav
      className="w-full fixed z-30 bg-white border-b dark:bg-neutral-900 border-neutral-200 dark:border-b-neutral-500"
      ref={navRef}
    >
      <div className="navbar flex p-3 justify-between lg:px-5 max-w-[1300px] mx-auto">
        {/* logo, tagline, nama website */}
        <div className="lg:w-1/4 w-2/3 flex items-center">
          <Link to="/" className="logo flex items-center gap-2">
            <img
              src={pesantrenLogo}
              alt="Logo Pesantren Idrisiyyah"
              className="lg:h-11 lg:w-11 h-10 w-10"
            />
            <div className="flex flex-col">
              <h1 className="text-small-bold lg:text-lg-bold text-idi-800 whitespace-nowrap">
                PESANTREN IDRISIYYAH
              </h1>
              <h2 className="text-xs-regular dark:text-slate-300 whitespace-nowrap">
                Lembaga Pendidikan Idrisiyyah
              </h2>
            </div>
          </Link>
        </div>

        {/* menu navigasi */}
        <div className="lg:w-1/2 justify-center items-center lg:flex hidden">
          {navLinks.map((ele, i) => (
            <div
              key={i}
              className="relative group w-max px-4 items-center justify-center lg:flex hidden h-full"
            >
              <Link
                to={ele.link}
                onClick={
                  ele.subMenu
                    ? (e) => {
                      e.preventDefault();
                      handleSubMenu(i);
                    }
                    : null
                }
                className={`peer text-neutral-700 dark:text-slate-300 text-small-medium lg:text-small-medium lg:text-center h-full border-0 lg:border-b-2 border-white items-center justify-center gap-3 w-full dark:border-neutral-900 lg:hover:border-b-idi-800 transition-all duration-300 ${show ? "flex" : "lg:flex hidden"
                  }`}
              >
                {ele.name}

                {ele.subMenu && (
                  <HiChevronDown
                    className={`transition-all duration-300 ${activeMenuId === i ? "rotate-180" : ""
                      }`}
                  />
                )}
              </Link>
              {ele.subMenu && (
                <div
                  ref={submenuRef}
                  className={`submenu-profile p-1 z-50 lg:bg-white lg:dark:bg-neutral-800 rounded-lg text-start flex flex-col gap-1 shadow-xl border border-neutral-200 dark:border-neutral-700 ${activeMenuId === i && activeSubMenu ? "flex" : "hidden"
                    } lg:absolute w-full lg:w-52 transition-all duration-300 top-14 left-0 animate-in fade-in zoom-in-95 duration-200`}
                >
                  {ele.subMenu.map((subEle, subIndex) => (
                    <NavLink
                      ele={ele}
                      subEle={subEle}
                      key={subIndex}
                      onClick={() => {
                        setActiveSubMenu(false);
                        setActiveMenuId(null);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* search, dark mode, dropdown ganti bahasa */}
        <div className="lg:w-1/4 w-1/3 flex items-center justify-end gap-6">
          <SearchBar />
          <DarkThemeToggle className="hidden lg:block" />
          <LanguageDropdown className="hidden lg:block" />
          <HamburgerMenu />
        </div>
      </div>

      {/* Mobile menu */}
      {show && (
        <div className="w-full justify-start lg:hidden flex-col items-start max-h-96 overflow-y-auto divide-y-1 flex">
          <div className="flex items-center justify-between px-5 w-full gap-6">
            <DarkThemeToggle />
            <LanguageDropdown className="block lg:hidden" />
          </div>
          {navLinks.map((ele, i) => (
            <div
              key={i}
              className="relative group hover:bg-neutral-200 w-full items-center justify-start flex flex-col px-5 py-3"
            >
              <Link
                to={ele.link}
                onClick={
                  ele.subMenu
                    ? (e) => {
                      e.preventDefault();
                      handleSubMenu(i);
                    }
                    : () => setShow(false)
                }
                className={`peer text-neutral-700 w-full dark:text-slate-300 text-small-medium lg:text-small-medium lg:text-center h-full border-0 lg:border-b-2 border-white items-center justify-start gap-3 dark:border-neutral-900 lg:hover:border-b-idi-800 transition-all duration-300 flex`}
              >
                {ele.name}

                {ele.subMenu && (
                  <HiChevronDown
                    className={`transition-all duration-300 ${activeMenuId === i ? "rotate-180" : ""
                      }`}
                  />
                )}
              </Link>
              {ele.subMenu && (
                <div
                  ref={submenuRef}
                  className={`submenu-profile p-1 z-50 max-h-96 lg:overflow-y-auto lg:bg-neutral-100 lg:dark:bg-neutral-800 rounded-lg text-start flex flex-col gap-1 ${activeMenuId === i && activeSubMenu ? "flex" : "hidden"
                    } lg:absolute w-full lg:w-52 transition-all duration-300 top-14 left-0`}
                >
                  {ele.subMenu.map((subEle, subIndex) => (
                    <NavLink
                      key={subIndex}
                      ele={ele}
                      subEle={subEle}
                      onClick={() => {
                        setActiveSubMenu(false);
                        setActiveMenuId(null);
                        setShow(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
