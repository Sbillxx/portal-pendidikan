import { useMemo } from "react";
import { get_thumbnail } from "./variable";

export function GetHeadlineImage(ele) {

  const imgSrc = useMemo(() => {
    const imagePath = Array.isArray(ele.gambar) ? ele.gambar[0] : ele.gambar;
    if (!imagePath) return "/placeholder-image.jpg";
    if (imagePath.startsWith("/")) return imagePath;
    return `${get_thumbnail}${imagePath}`;
  }, [ele.gambar]);

  const altText = useMemo(
    () => ele.judul || ele.judul_artikel || "Default headline image",
    [ele.judul, ele.judul_artikel]
  );

  return {
    altText,
    imgSrc,
  };
}

export function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
