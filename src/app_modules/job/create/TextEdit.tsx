"use client";

import { Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import "react-quill/dist/quill.snow.css";

export default function Demo() {
  const [value, setValue] = useState("");
  const [udah, setUdah] = useState(false);

  // useShallowEffect(() => {
  //   if (window && window.document) setUdah(true);
  // }, []);

  // if (!udah) return <><Center></Center></>;
  return (
    <Stack>
      <ReactQuill
        defaultValue={`<h2 ">Judul Lowongan Kerja</h2>
          <p "><br></p>
          <p><strong>Syarat &amp; Ketentuan :</strong></p>
          <ol>
          <li>Minimal pendidika SMA / Sederajat</li>
          <li>Pasif berbahasa inggris </li>
          <li>Dll,.</li>
          </ol>
          <p></br></p>
          <p><strong>Deskripsi :</strong></p>
          <p>Jika berminat dapat menghubungi WA berikut</p>
          <p>+6281 xxx xxx xx</p>
          <p>Kirim CV anda melalui email berikut</p>
          <p>@test-hipmi.com</p>
          <p>Atau kunjungi website kami:</p>
          <p><a href="https://test-hipmi.wibudev.com/" rel="noopener noreferrer" target="_blank">https://test-hipmi.wibudev.com/</a></p>
          `}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "link"],
            // [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],

            ["clean"],
          ],
        }}
        theme="snow"
        onChange={setValue}
      />
      {/* {value}
      <div dangerouslySetInnerHTML={{ __html: value }} /> */}
    </Stack>
  );
}
