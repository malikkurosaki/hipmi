"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  useDisclosure,
  useShallowEffect,
  useWindowScroll,
} from "@mantine/hooks";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_job_hot_menu, gs_job_status } from "../global_state";
import { MODEL_JOB } from "../model/interface";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import dynamic from "next/dynamic";
import { job_EditById } from "../fun/edit/fun_edit_by_id";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import "react-quill/dist/quill.snow.css";
import { Job_ComponentBoxUploadImage, Job_ComponentButtonUpdate } from "../component";
import { APIs } from "@/app/lib";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";

export default function Job_Edit({ dataJob }: { dataJob: MODEL_JOB }) {
  const [value, setValue] = useState(dataJob);
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  // useShallowEffect(() => {
  //   if (window && window.document) setReload(true);
  // }, []);

  return (
    <>
      <Stack>
        <Stack spacing={"xs"}>
          <Job_ComponentBoxUploadImage>
            {value.imageId ? (
              <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                  alt="Foto"
                  height={250}
                  src={img ? img : APIs.GET + value.imageId}
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


