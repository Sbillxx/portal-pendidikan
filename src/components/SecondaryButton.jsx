import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SecondaryButton = memo(({ path, variant }) => {
  const { t } = useTranslation();

  const buttonClass =
    variant === "green"
      ? "border-pesantrenGreen-800 hover:bg-pesantrenGreen-700"
      : "border-idi-950 hover:bg-idi-900";

  return (
    <Link
      to={path}
      className={`text-small-medium text-center w-full lg:w-fit px-3 py-2 border cursor-pointer hover:text-white transition-all duration-300 ${buttonClass}`}
    >
      {t("buttontext")}
    </Link>
  );
});

export default SecondaryButton;
