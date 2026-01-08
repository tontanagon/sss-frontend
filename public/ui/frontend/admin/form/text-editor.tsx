"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Field, Label } from "@headlessui/react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TextEditor({
  name,
  title,
  value = "",
  onTextChange,
}: {
  name: string;
  title: string;
  value?: string;
  onTextChange: (value: string) => void;
}) {
  const toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video", "formula"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],

    [{ color: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "color",
    "align",
  ];

  if (!modules) return <p>Loading editor...</p>;

  return (
    <Field>
      <Label className="text-xl font-semibold">{title}</Label>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={(value) => onTextChange(value)}
        className="bg-white rounded-lg mt-3"
      />
      <input type="hidden" value={value} name={name} />
    </Field>
  );
}
