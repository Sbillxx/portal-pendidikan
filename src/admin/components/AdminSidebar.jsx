import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiTable,
  HiViewBoards,
  HiSpeakerphone,
  HiGlobeAlt,
  HiVideoCamera,
  HiSparkles,
  HiUserCircle,
  HiDocumentText,
  HiMicrophone,
  HiMailOpen,
  HiFire,
  HiBell,
  HiNewspaper,
  HiCollection,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admincms") {
      return location.pathname === "/admincms";
    }

    const currentPath = location.pathname;
    const pathParts = path.split("/");
    const currentParts = currentPath.split("/");

    if (pathParts.length > 3) {
      return currentPath === path;
    }

    return currentParts[1] === pathParts[1] && currentParts[2] === pathParts[2];
  };

  const sidebarCategories = [
    {
      title: "Umum",
      items: [
        { to: "/admincms", label: "Sorotan", icon: HiSparkles },
        { to: "/admincms/headline", label: "Headline", icon: HiFire },
      ],
    },
    {
      title: "Konten",
      items: [
        { to: "/admincms/agenda", label: "Agenda", icon: HiViewBoards },
        { to: "/admincms/liputan", label: "Liputan", icon: HiGlobeAlt },
        { to: "/admincms/artikel/kajian", label: "Artikel", icon: HiTable },
        {
          to: "/admincms/infografik",
          label: "Infografik",
          icon: HiDocumentText,
        },
        {
          to: "/admincms/videokajian",
          label: "Video Kajian",
          icon: HiVideoCamera,
        },
        { to: "/admincms/profile", label: "Profile", icon: HiUserCircle },
      ],
    },
    {
      title: "Media",
      items: [
        { to: "/admincms/iklan", label: "Iklan", icon: HiSpeakerphone },
        { to: "/admincms/live", label: "Live Streaming", icon: HiMicrophone },
      ],
    },
    {
      title: "Interaksi",
      items: [
        { to: "/admincms/notifikasi", label: "Notifikasi", icon: HiBell },
        { to: "/admincms/kotaksaran", label: "Kotak saran", icon: HiMailOpen },
      ],
    },
  ];

  return (
    <Sidebar aria-label="Sidebar with category" className="h-screen col-span-2">
      <Sidebar.Items className="py-16">
        {sidebarCategories.map((category, index) => (
          <Sidebar.ItemGroup key={index}>
            <div className="px-3 py-2">
              <h3 className="text-gray-900 font-medium text-sm">
                {category.title}
              </h3>
            </div>
            {category.items.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <Sidebar.Item
                  icon={Icon}
                  className={`${
                    isActive(to) ? "sidebar-navigation-active" : ""
                  } mt-1`}
                >
                  <p className="text-gray-900 text-sm font-semibold">{label}</p>
                </Sidebar.Item>
              </Link>
            ))}
          </Sidebar.ItemGroup>
        ))}
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
