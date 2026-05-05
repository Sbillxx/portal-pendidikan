// VideoEmbed.js
import React, { useEffect, useCallback } from 'react';

const EmbedComponent = ({ link }) => {
  const loadEmbedScript = useCallback((platform) => {
    const scriptId = `${platform}-embed-script`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src =
        platform === "instagram"
          ? "https://www.instagram.com/embed.js"
          : "https://www.tiktok.com/embed.js";
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (link.includes("instagram.com")) {
      loadEmbedScript("instagram");
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    } else if (link.includes("tiktok.com")) {
      loadEmbedScript("tiktok");
      if (window.tiktok) {
        window.tiktok.loadEmbedScript();
      }
    }
  }, [link, loadEmbedScript]);

  const getVideoId = useCallback((url) => {
    const regex = /\/video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }, []);

  if (link.includes("youtube.com") || link.includes("youtu.be")) {
    return (
      <iframe
        className="h-[300px] lg:h-[400px] w-full rounded-lg"
        src={link}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  } else if (link.includes("instagram.com")) {
    return (
      <blockquote
        className="instagram-media w-full bg-white border border-gray-200 rounded-md shadow-none my-[1px] max-w-[540px] min-w-[326px] p-0"
        data-instgrm-permalink={link}
        data-instgrm-version="14"
      >
        <div className="p-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            sedang di muat
          </a>
        </div>
      </blockquote>
    );
  } else if (link.includes("tiktok.com")) {
    return (
      <blockquote
        className="tiktok-embed w-full max-w-[605px] min-w-[325px]"
        cite={link}
        data-video-id={getVideoId(link)}
      >
        <section>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={link}
            className="text-blue-500 hover:underline"
          >
            sedang di muat
          </a>
        </section>
      </blockquote>
    );
  } else {
    return <p>Unsupported video platform.</p>;
  }
};

export default EmbedComponent;
