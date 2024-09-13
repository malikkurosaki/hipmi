"use client";

import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_CardStyles,
  ComponentGlobal_InputCountDown,
} from "@/app_modules/_global/component";
import {
  Job_ComponentBoxUploadImage,
  Job_ComponentButtonSaveCreate,
} from "../component";
import { defaultDeskripsi, defaultSyarat } from "../component/default_value";

export default function Job_Create() {
  const [value, setValue] = useState({
    title: "",
    content: "",
    deskripsi: "",
  });
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  // useShallowEffect(() => {
  //   if (window && window.document) setReload(true);
  // }, []);

  return (
    <Stack>
      <ComponentGlobal_BoxInformation informasi="Poster atau gambar lowongan kerja bersifat opsional, tidak wajib untuk dimasukkan dan upload lah gambar yang sesuai dengan deskripsi lowongan kerja. " />

      <Stack spacing={"xs"}>
        <Job_ComponentBoxUploadImage>
          {img ? (
            <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
              <Image
                style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                alt="Foto"
                height={250}
                src={img}
              />
            </AspectRatio>
          ) : (
            <Stack justify="center" align="center" h={"100%"}>
              <IconUpload color="white" />
              <Text fz={10} fs={"italic"} c={"white"} fw={"bold"}>
                Upload Gambar
              </Text>
            </Stack>
          )}
        </Job_ComponentBoxUploadImage>

        <Center>
          <FileButton
            onChange={async (files: any | null) => {
              try {
                const buffer = URL.createObjectURL(
                  new Blob([new Uint8Array(await files.arrayBuffer())])
                );
                setImg(buffer);
                setFile(files);
              } catch (error) {
                console.log(error);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                {...props}
                radius={"xl"}
                w={100}
                style={{
                  backgroundColor: MainColor.yellow,
                  border: `1px solid ${AccentColor.yellow}`,
                }}
              >
                <IconCamera color="black" />
              </Button>
            )}
          </FileButton>
        </Center>
      </Stack>

      <ComponentGlobal_CardStyles>
        <Stack>
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Judul"
            placeholder="Masukan judul lowongan kerja"
            maxLength={100}
            onChange={(val) => {
              setValue({
                ...value,
                title: val.currentTarget.value,
              });
            }}
          />

          <Stack spacing={3}>
            <Text fz={"sm"} c={"white"}>
              Syarat & Ketentuan
              <Text inherit span c={"red"}>
                {" "}
                *
              </Text>
            </Text>

            <Stack spacing={5}>
              <ReactQuill
                defaultValue={defaultSyarat}
                style={{
                  color: "black",
                  backgroundColor: "white",
                }}
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
                onChange={(val) => {
                  setValue({
                    ...value,
                    content: val,
                  });
                }}
              />
              <ComponentGlobal_InputCountDown
                maxInput={500}
                lengthInput={value.content.length}
              />
            </Stack>
          </Stack>

          <Stack spacing={3}>
            <Text fz={"sm"} c={"white"}>
              Deskripsi
              <Text inherit span c={"red"}>
                {" "}
                *
              </Text>
            </Text>

            <Stack spacing={5}>
              <ReactQuill
                defaultValue={defaultDeskripsi}
                style={{
                  color: "black",
                  backgroundColor: "white",
                }}
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
                onChange={(val) => {
                  setValue({
                    ...value,
                    deskripsi: val,
                  });
                }}
              />
              <ComponentGlobal_InputCountDown
                maxInput={500}
                lengthInput={value.deskripsi.length}
              />
            </Stack>
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>

      <Job_ComponentButtonSaveCreate value={value as any} file={file as any} />
    </Stack>
  );
}
