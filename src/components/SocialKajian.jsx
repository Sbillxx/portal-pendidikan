import SocialMediaSection from "./SocialMediaSection";
import KajianSection from "./KajianSection";

const SocialKajian = ({ type }) => {
  return (
    <div className="flex flex-col gap-8 lg:w-1/3">
      <SocialMediaSection />
      <KajianSection type={type} />
    </div>
  );
};

export default SocialKajian;
