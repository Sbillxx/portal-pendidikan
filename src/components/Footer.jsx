import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pesantrenLogo } from '../assets';
import { useNavlinks } from '../Func/GlobalFunction';
import { SOCIAL_MEDIA_LINKS } from '../constant';

const FooterSection = ({ title, items, isCustomTitle = false }) => {
  const { t } = useTranslation();

  if (!items || !items.length) return null;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <h2 className="text-lg text-idi-800 font-semibold mb-2 dark:text-idi-700 uppercase leading-tight">
        {isCustomTitle ? title : t(`judul.${title}`)}
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <FooterLink key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const FooterLink = ({ item }) => {
  const isExternal = item.link?.startsWith('http');
  const linkProps = {
    className: "text-small-medium hover:text-idi-800 text-neutral-600 dark:text-slate-300 transition-colors",
    ...(isExternal && { target: "_blank", rel: "noopener noreferrer" })
  };

  const displayName = item.name || item.headline || "";

  return isExternal ? (
    <a href={item.link} {...linkProps}>
      {displayName}
    </a>
  ) : (
    <Link to={item.link || "#"} {...linkProps}>
      {displayName}
    </Link>
  );
};

const Logo = () => (
  <div className="logo flex items-center gap-3">
    <img
      src={pesantrenLogo}
      alt="Pesantren Idrisiyyah Logo"
      className="h-10 w-10 rounded-full object-cover"
    />
    <h2 className="text-small-bold lg:text-lg-bold text-idi-800 dark:text-idi-700">
      PESANTREN IDRISIYYAH
    </h2>
  </div>
);

const Footer = () => {
  const { navLinks } = useNavlinks();

  const footerColumns = useMemo(() => {
    if (!navLinks) return [];

    // Find the sections from navLinks
    const profileSection = navLinks.find(link => link.name === "Profil" || link.name === "Profile" || link.name === "الملف الشخصي");
    const jenjangSection = navLinks.find(link => link.name === "Jenjang" || link.name === "Levels" || link.name === "المراحل التعليمية");

    const columns = [];

    // Column 1: Tentang Pesantren (from Profil subMenu)
    if (profileSection && profileSection.subMenu) {
      columns.push({
        judul: 'about',
        subs: profileSection.subMenu.map(item => ({
          name: item.headline,
          link: `/content/profile/${item.id}/${item.headline.toLowerCase().replace(/\s+/g, '-')}`
        }))
      });
    }

    // Column 2, 3, 4: Jenjang (Prasekolah, Dikdas, PPI)
    if (jenjangSection && jenjangSection.subMenu) {
      jenjangSection.subMenu.forEach(sub => {
        columns.push({
          judul: sub.name,
          isCustomTitle: true,
          subs: sub.subMenu
        });
      });
    }

    // Column 5: Social Media
    columns.push({
      judul: 'socialMedia',
      subs: SOCIAL_MEDIA_LINKS
    });

    return columns;
  }, [navLinks]);

  return (
    <footer className="flex flex-col w-full mt-[60px]">
      <div className="bg-gray-100 dark:bg-neutral-800 h-fit p-10 pt-16 gap-5 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full max-w-7xl mx-auto">
          {footerColumns.map((item, index) => (
            <FooterSection
              key={index}
              title={item.judul}
              items={item.subs}
              isCustomTitle={item.isCustomTitle}
            />
          ))}
        </div>
        <div className="mt-10 border-t border-neutral-200 dark:border-neutral-700 pt-8 w-full flex justify-center">
          <Logo />
        </div>
      </div>
      <div className="bg-idi-800 dark:bg-idi-700 h-16 text-white text-small-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10">
        <p>Copyright © {new Date().getFullYear()} All Rights Reserved.</p>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span className="hover:underline cursor-pointer">Kotak saran</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
