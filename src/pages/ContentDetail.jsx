import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MainLayout } from "../layouts";
import ContentCard from "../components/ContentCard";
import { SocialKajian } from "../components";
import axios from "axios";
import { LiputanSection } from "../layouts/HomePage";
import { DUMMY_BERITA, DUMMY_ARTIKEL, DUMMY_PROFILE } from "../utils/dummyData";
import { useTranslation } from "react-i18next";

const ContentDetail = () => {
  const { id, page } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = (i18n.language || "id").split("-")[0].toLowerCase();
  const currentLang = ["id", "en", "ar"].includes(lang) ? lang : "id";
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEndpoint = useCallback((pageType) => {
    const BASE_URL =
      process.env.REACT_APP_BASE_URL || "https://api.idrisiyyah.or.id:3000";

    let endpoint = "";
    switch (pageType) {
      case "artikel":
        endpoint = "/artikel/kajian";
        break;
      case "berita":
      case "liputan":
        endpoint = "/liputan";
        break;
      case "videokajian":
        endpoint = "/videokajian";
        break;
      case "artikel-info":
        endpoint = "/artikel/info";
        break;
      case "agenda":
        endpoint = "/agenda";
        break;
      case "infografik":
        endpoint = "/infografik";
        break;
      case "profile":
        endpoint = "/profile";
        break;
      default:
        endpoint = "/artikel/kajian";
    }
    return `${BASE_URL}${endpoint}`;
  }, []);

  // Local dummy data removed, now using ../utils/dummyData.js

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Handle Profile Dummy Data
      if (["visi-misi", "sejarah", "organisasi"].includes(id)) {
        const dummy = DUMMY_PROFILE[id]?.[currentLang] || DUMMY_PROFILE[id]?.["id"];
        setContent({
          ...dummy,
          _id: id,
          gambar: "/idrisiyyahtumbnail.png",
          tanggal: "27 Agustus 2024",
          waktu: "10:00"
        });
        setLoading(false);
        return;
      }

      // Handle News Dummy Data
      if (id.startsWith("news-")) {
        const list = DUMMY_BERITA[currentLang] || DUMMY_BERITA["id"] || [];
        const item = list.find(i => i._id === id);
        if (item) {
          setContent(item);
          setLoading(false);
          return;
        }
      }

      // Handle Article Dummy Data
      if (id.startsWith("article-")) {
        const list = DUMMY_ARTIKEL[currentLang] || DUMMY_ARTIKEL["id"] || [];
        const item = list.find(i => i._id === id);
        if (item) {
          setContent({ ...item, judul: item.judul_artikel });
          setLoading(false);
          return;
        }
      }

      const endpoint = getEndpoint(page);
      const response = await axios.get(endpoint);
      const foundContent = response.data.find(
        (item) => item._id === id || item.id === id
      );

      if (foundContent) {
        setContent(foundContent);
      } else {
        setError("Content not found");
      }
    } catch (err) {
      console.error("Error details:", err.response || err);
      setError(
        err.response?.data?.message || err.message || "Failed to load content"
      );
    } finally {
      setLoading(false);
    }
  }, [id, page, getEndpoint, currentLang]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent, id, page, location.pathname]);

  // Update document title for analytics when content loads
  useEffect(() => {
    if (content) {
      const title = getContentTitle(content, page);
      const fullTitle = `${title} - Tarekat Idrisiyyah`;
      document.title = fullTitle;
    }
  }, [content, page]);

  const getContentTitle = (content, page) => {
    switch (page) {
      case "artikel":
        return content.judul_artikel;
      case "berita":
      case "liputan":
        return content.judul;
      case "agenda":
        return content.judul;
      case "infografik":
        return content.judul;
      case "profile":
        return content.judul;
      case "videokajian":
        return content.judul_video;
      default:
        return content.judul || content.judul_artikel || content.judul_video;
    }
  };

  const getContentProps = useCallback(() => {
    if (!content) return {};

    const commonProps = {
      arrayText: false,
      img: content.gambar,
      text: content.deskripsi,
      tanggal: content.tanggal,
      waktu: content.waktu,
      konten: content,
    };

    switch (page) {
      case "artikel":
        return {
          ...commonProps,
          pageName: "artikel",
          badge: "Artikel",
          title: content.judul_artikel,
          source: content.narasumber,
        };
      case "berita":
      case "liputan":
        return {
          ...commonProps,
          pageName: "berita",
          badge: "Berita",
          title: content.judul,
          source: content.penulis,
        };
      case "agenda":
        return {
          ...commonProps,
          pageName: "agenda",
          badge: "Agenda",
          title: content.judul,
          source: content.penulis,
        };
      case "infografik":
        return {
          ...commonProps,
          pageName: "inforgrafik",
          badge: "Infografik",
          title: content.judul,
          source: content.penulis,
        };
      case "profile":
        return {
          ...commonProps,
          pageName: "profile",
          badge: "Profile",
          title: content.judul,
          source: content.penulis,
        };
      case "videokajian":
        return {
          ...commonProps,
          pageName: "ini pagename",
          badge: "VIDEO KAJIAN",
          title: content.judul_video,
          source: content.penulis,
        };
      default:
        return {
          ...commonProps,
          pageName: page,
          title: content.judul || content.judul_artikel || content.judul_video,
          source: content.narasumber || content.penulis,
        };
    }
  }, [content, page]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !content) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg text-red-500">{error || "Content not found"}</p>
        </div>
      </MainLayout>
    );
  }

  const contentProps = getContentProps();
  const { title } = contentProps;
  const fullTitle = `${title} - Tarekat Idrisiyyah`;
  const sidebarType = page === "berita" ? "artikel" : "berita";

  return (
    <MainLayout
      title={fullTitle}
      url={`${id}/${page}/${title ? title.replace(/\s+/g, "-").toLowerCase().trim() : ""
        }`}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-10">
        <ContentCard {...contentProps} />
        <SocialKajian type={sidebarType} />
      </div>
      <LiputanSection type={sidebarType === "berita" ? "berita" : "artikel"} />
    </MainLayout>
  );
};

export default ContentDetail;