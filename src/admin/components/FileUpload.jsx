import React, { memo, useEffect, useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { get_thumbnail } from "../../utils/variable";

const FileUpload = memo(({ value, handleFile, initialImage }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(value);
    } else if (initialImage) {
      setPreviewImage(`${get_thumbnail}${initialImage}`);
    }
  }, [value, initialImage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full h-full items-start">
        <div className="container h-full">
          <p className="text-lg-medium mb-4">Upload Thumbnail</p>
          <Label
            htmlFor="dropzone-file"
            className="flex h-40 relative w-full cursor-pointer flex-col items-center overflow-hidden justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {previewImage ? (
              <div className="px-2">
                <img
                  src={previewImage}
                  alt="preview-img"
                  className="absolute inset-0 m-auto h-5/6 object-contain"
                />
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <FileInput
              name="gambar"
              id="dropzone-file"
              className="hidden"
              onChange={handleFile}
            />
          </Label>
        </div>
      </div>
    </div>
  );
});

export default FileUpload;
