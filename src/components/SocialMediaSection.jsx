import SectionLayout from "../layouts/SectionLayout";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialMediaSection = () => {
  const socialMedia = [
    {
      color: "bg-[#3b5998]",
      icon: <FaFacebook className="h-7 w-7 text-white" />,
      link: "https://www.facebook.com/IdrisiyyahID",
      label: "Facebook"
    },
    {
      color: "bg-[#0088CC]",
      icon: <FaTelegram className="h-7 w-7 text-white" />,
      link: "https://telegram.me/idrisiyyah",
      label: "Telegram"
    },
    {
      color:
        "bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] via-[#bc1888] to-[#833ab4]",
      icon: <FaInstagram className="h-7 w-7 text-white" />,
      link: "https://www.instagram.com/idrisiyyahID",
      label: "Instagram"
    },
    {
      color: "bg-[#FF0000]",
      icon: <FaYoutube className="h-7 w-7 text-white" />,
      link: "https://www.youtube.com/idrisiyyahID",
      label: "YouTube"
    },
    {
      color: "bg-[#1DA1F2]",
      icon: <FaTwitter className="h-7 w-7 text-white" />,
      link: "https://x.com/idrisiyyahID",
      label: "Twitter"
    },
  ];

  return (
    <SectionLayout title={"followKami"}>
      <div className="flex gap-4">
        {socialMedia.map((ele, i) => (
          <a
            key={i}
            href={ele.link}
            className={`rounded-full p-3 ${ele.color}`}
            aria-label={`Kunjungi ${ele.label} Kami!`}
            target="_blank" 
            rel="noopener noreferrer" 
          >
            {ele.icon}
          </a>
        ))}
      </div>
    </SectionLayout>
  );
};

export default SocialMediaSection;
