import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const QuillEditor = ({ value, setValue, judul, name, handleChange, id }) => {
  // Use a ref to access the quill instance directly
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef();

  const onEditorChange = (content) => {
    handleChange({
      target: {
        name: name,
        value: content,
      },
    });
  };

  return (
    <>
      <p className="text-small font-semibold text-neutral-700 ">{judul}</p>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onEditorChange}
        readOnly={readOnly}
        theme="snow"
        id={id}
      />
    </>
  );
};

export default QuillEditor;
