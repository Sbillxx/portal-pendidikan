  import { Card } from "flowbite-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const CardLiveStreaming = memo(({ data, status }) => {
  const { t } = useTranslation();
  return (
    <Card className="max-w-sm w-full">
      <div className="flex">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.platform}
        </h5>
        {status && status.live && (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
          </span>
        )}
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Streaming {data.platform} idrisiyyah
      </p>
      {status && status.live ? (
        <a href={status.videoUrl} className="card-ls-button-active">
          {t("status.active")}
        </a>
      ) : (
        <div className="card-ls-button">{t("status.unactive")}</div>
      )}
    </Card>
  );
});

export default CardLiveStreaming;
