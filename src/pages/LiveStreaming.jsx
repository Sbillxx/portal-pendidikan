import React, { useEffect, useState } from "react";
import { MainLayout, SectionLayout } from "../layouts";
import { CardLiveStreaming, CardRadioStreaming, SocialKajian } from "../components";
import { Card } from "flowbite-react";
import { useGetDataFromApi } from "../Func/GlobalFunction";
import { useTranslation } from "react-i18next";

const LiveStreaming = () => {
  const { data } = useGetDataFromApi("live");
  const base_url = process.env.REACT_APP_BASE_URL;  
  
  const [status, setStatus] = useState(null);  
  
  const getStatusLive = async () => {
    try {
      const response = await fetch(`${base_url}/youtube/live-status`);
      if (!response.ok) {
        throw new Error("Failed to fetch live status");
      }
      const liveData = await response.json();
      setStatus(liveData);
    } catch (error) {
      console.error("Error fetching live status:", error);
    }
  };
  
  useEffect(() => {
    getStatusLive();
  }, [base_url]);
  
  const { t } = useTranslation();

  return (
    <MainLayout title={'Tarekat Idrisiyyah - Live streaming'}>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <SectionLayout title={"liveStreaming"} classname={"lg:w-3/5"}>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">

            {/* {data.length > 0 && (
              )} */}
              {/* <CardLiveStreaming data={data[0]} status={status} /> */}

            <CardRadioStreaming data={{platform : "Radio Idrisiyyah"}} />
            {data.slice(0, 4).map((ele, i) => (
              <Card className="max-w-sm w-full" key={i}>
                <div className="flex">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {ele.platform}
                  </h5>
                  {ele.status === "live" && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                    </span>
                  )}
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Streaming {ele.platform} idrisiyyah
                </p>
                {ele.status === "live" ? (
                  <a href={ele.url} className="card-ls-button-active">
                    {t('status.active')}
                  </a>
                ) : (
                  <div className="card-ls-button">{t('status.unactive')}</div>
                )}
              </Card>
            ))}

          </div>
        </SectionLayout>
        <SocialKajian />
      </div>
    </MainLayout>
  );
};

export default LiveStreaming;
