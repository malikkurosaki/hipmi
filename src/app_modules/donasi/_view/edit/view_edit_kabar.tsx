import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_InputCountDown,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import {
  AspectRatio,
  Button,
  FileButton,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { DIRECTORY_ID } from "@/app/lib";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { donasi_funUpdateKabar } from "../../fun";

export function Donasi_ViewEditKabar({
  dataKabar,
}: {
  dataKabar: MODEL_DONASI_KABAR;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataKabar);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [isLoading, setLoading] = useState(false);

  async function onUpdate() {
    if (data.title === "" || data.deskripsi === "") {
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");
    }

    try {
      setLoading(true);
      if (file !== null) {
        const uploadImage = await funGlobal_UploadToStorage({
          file: file as File,
          dirId: DIRECTORY_ID.donasi_kabar,
        });

        if (!uploadImage.success) {
          setLoading(false);
          return ComponentGlobal_NotifikasiPeringatan(
            "Gagal upload file gambar"
          );
        }

        const res = await donasi_funUpdateKabar({
          data: data,
          fileId: uploadImage.data.id,
        });

        if (res.status === 200) {
          setLoading(false);

          const deleteImage = await funGlobal_DeleteFileById({
            fileId: data.imageId,
          });
          if (!deleteImage.success) {
            setLoading(false);
            ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar lama");
          }

          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          setLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } else {
        const res = await donasi_funUpdateKabar({
          data: data,
        });

        if (res.status === 200) {
          setLoading(false);
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          setLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Stack px={"lg"} pb={"lg"}>
        <ComponentGlobal_BoxInformation informasi="Gambar tidak wajib di isi ! Hanya upload jika di butuhkan." />

        <TextInput
          maxLength={100}
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Judul"
          withAsterisk
          placeholder="Masukan judul kabar"
          value={data.title}
          onChange={(val) => {
            setData({
              ...data,
              title: _.startCase(val.target.value),
            });
          }}
        />
        <Textarea
          maxLength={500}
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Deskripsi"
          withAsterisk
          placeholder="Masukan deskripsi kabar"
          autosize
          maxRows={4}
          minRows={2}
          value={data.deskripsi}
          onChange={(val) => {
            setData({
              ...data,
              deskripsi: val.target.value,
            });
          }}
        />
        <ComponentGlobal_InputCountDown
          lengthInput={data.deskripsi.length}
          maxInput={500}
        />

        <Stack spacing={5}>
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
            ) : data.imageId === null ? (
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="white" />
                <Text fz={10} fs={"italic"} c={"white"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            ) : (
              <Stack justify="center" align="center" h={"100%"} p={"sm"}>
                <ComponentGlobal_LoadImageCustom
                  fileId={data.imageId}
                  height={200}
                />
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          {/* Upload Foto */}
          <Group position="center">
            <FileButton
              onChange={async (files: any) => {
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
                  leftIcon={<IconCamera color="black" />}
                  radius={50}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload Gambar
                </Button>
              )}
            </FileButton>
          </Group>
        </Stack>

        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={_.values(data).includes("") ? true : false}
          radius={"xl"}
          mt={"lg"}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          loading={isLoading}
          loaderPosition="center"
          onClick={() => onUpdate()}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
