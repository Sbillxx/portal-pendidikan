import { useTranslation } from "react-google-multi-lang";

const LanguageSwitcher = () => {
  const { setLanguage } = useTranslation();

  return (
    <div className="flex gap-3">
      <button onClick={() => setLanguage("en")}>English</button>
      <button onClick={() => setLanguage("ar")}>arab</button>
      <button onClick={() => setLanguage("id")}>Indonesia</button>
    </div>
  );
};

export default LanguageSwitcher;
