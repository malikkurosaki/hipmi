"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Stack,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Donasi_funUpdateCerita } from "../../fun/update/fun_update_cerita_donasi";
import { MODEL_CERITA_DONASI } from "../../model/interface";

export default function EditCeritaPenggalangDonasi({
  dataCerita,
}: {
  dataCerita: MODEL_CERITA_DONASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(dataCerita);
  const [file, setFile] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<any | null>();

  async function onUpdate() {
    setLoading(true);

    const body = {
      id: data.id,
      pembukaan: data.pembukaan,
      cerita: data.cerita,
    };

    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapin Data");

    try {
      if (file !== null) {
        const uploadImage = await funGlobal_UploadToStorage({
          file: file as File,
          dirId: DIRECTORY_ID.donasi_cerita_image,
        });
        if (!uploadImage.success) {
          setLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
        }

        const deleteImage = await funGlobal_DeleteFileById({
          fileId: data.imageId,
        });
        if (!deleteImage.success) {
          setLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar lama");
        }

        const res = await Donasi_funUpdateCerita({
          data: body as any,
          fileId: uploadImage.data.id,
        });
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
          setLoading(false);
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
          setLoading(false);
        }
      } else {
        const res = await Donasi_funUpdateCerita({
          data: body as any,
        });

        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
          setLoading(false);
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Stack px={"sm"}>
        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: "white",
              },
            }}
            autosize
            minRows={2}
            maxRows={7}
            withAsterisk
            label="Pembukaan"
            placeholder="Pembuka dari isi cerita"
            value={data.pembukaan}
            error={
              data.pembukaan === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan pembukaan cerita" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setData({
                ...data,
                pembukaan: val.target.value,
              })
            }
          />
          <ComponentGlobal_InputCountDown
            lengthInput={data.pembukaan.length}
            maxInput={300}
          />
        </Stack>

        <Stack>
          <ComponentGlobal_BoxUploadImage>
            {updateImage ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250 }}
                  alt="Foto"
                  height={250}
                  src={updateImage}
                />
              </AspectRatio>
            ) : (
              <Stack align="center" justify="center" p={"xs"} h={"100%"}>
                <ComponentGlobal_LoadImageCustom
                  fileId={data.imageId}
                  height={200}
                />
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

                  setUpdateImage(buffer);
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
                  leftIcon={<IconCamera />}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload
                </Button>
              )}
            </FileButton>
          </Center>
        </Stack>

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: "white",
              },
            }}
            autosize
            minRows={2}
            maxRows={7}
            withAsterisk
            label="Cerita"
            placeholder="Ceritakan alasan mengapa harus membuat Penggalangan Dana"
            value={data.cerita}
            error={
              data.cerita === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan pembukaan cerita" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setData({
                ...data,
                cerita: val.target.value,
              })
            }
          />
          <ComponentGlobal_InputCountDown
            lengthInput={data.cerita.length}
            maxInput={300}
          />
        </Stack>

        <Button
          style={{
            transition: "0.5s",
          }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          disabled={data.cerita === "" || data.pembukaan === "" ? true : false}
          w={"100%"}
          radius={"xl"}
          onClick={() => {
            onUpdate();
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Stack>
      {/* <pre> {JSON.stringify(value.pembukaan, null, 2)}</pre> */}
    </>
  );
}
