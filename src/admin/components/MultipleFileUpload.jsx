import { FileInput, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { get_thumbnail } from "../../utils/variable";

const MultipleFileUpload = ({ value, handleFile, initialImage }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (value && value.length) {
      // Reset previewImages setiap kali gambar baru diunggah
      setPreviewImages([]);
      Array.from(value).map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
        return reader.result;
      });
    } else if (initialImage && initialImage.length) {
      const images = initialImage.map((img) => `${get_thumbnail}${img}`);
      setPreviewImages(images);
    }
  }, [value, initialImage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full h-full items-start">
        <div className="container h-full">
          <p className="text-lg-medium mb-4">Upload Thumbnail</p>
          <Label htmlFor="dropzone-file" className="...">
            {previewImages.length > 0 ? (
              <div className="grid gap-3 grid-cols-3 flex-wrap">
                {previewImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="inset-0 m-auto max-h-72  rounded-lg object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pb-6 pt-5 h-full">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>

                <p className="mb-2 text-sm ...">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs ...">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <FileInput
              name="gambar"
              id="dropzone-file"
              className="hidden"
              onChange={handleFile}
              multiple 
            />
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
