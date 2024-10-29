"use client";

import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { MODEL_JOB } from "../model/interface";

import { APIs } from "@/app/lib";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImage,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  Job_ComponentBoxUploadImage,
  Job_ComponentButtonUpdate,
} from "../component";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Job_Edit({ dataJob }: { dataJob: MODEL_JOB }) {
  const [value, setValue] = useState(dataJob);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  // useShallowEffect(() => {
  //   if (window && window.document) setReload(true);
  // }, []);

  return (
    <>
      <Stack>
        <Stack spacing={"xs"}>
          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250 }}
                  alt="Foto"
                  height={250}
                  src={img}
                />
              </AspectRatio>
            ) : value.imageId ? (
              <ComponentGlobal_LoadImage fileId={value.imageId} />
            ) : (
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="white" />
                <Text fz={10} fs={"italic"} c={"white"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

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

        <ComponentGlobal_CardStyles color="black">
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
              value={value.title}
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
                  style={{
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
                  value={value.content}
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
                  style={{
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
                  value={value.deskripsi}
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

        <Job_ComponentButtonUpdate value={value as any} file={file as any} />
      </Stack>
    </>
  );
}
