import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
    ComponentGlobal_BoxInformation,
    ComponentGlobal_BoxUploadImage,
    ComponentGlobal_InputCountDown,
} from "@/app_modules/_global/component";
import {
    ComponentGlobal_NotifikasiBerhasil,
    ComponentGlobal_NotifikasiGagal,
    ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import {
    AspectRatio,
    Button,
    Center,
    FileButton,
    Image,
    Stack,
    Text,
    TextInput,
    Textarea,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";

import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funCreateBerita } from "../../_fun";

export function Investasi_ViewCreateBerita({
  investasiId,
}: {
  investasiId: string;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<Prisma.BeritaInvestasiCreateArgs>({
    data: {
      title: "",
      deskripsi: "",
      investasiId: investasiId,
    },
  });

  async function onCreate() {
    if (data.data.title == "" || data.data.deskripsi == "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");

    try {
      setIsLoading(true);
      if (file != null) {
        const uploadFile = await funGlobal_UploadToStorage({
          file: file as File,
          dirId: DIRECTORY_ID.investasi_berita,
        });

        if (!uploadFile.success)
          return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

        const createWithFile = await investasi_funCreateBerita({
          data: data.data as any,
          fileId: uploadFile.data.id,
        });

        createWithFile.status === 201
          ? (ComponentGlobal_NotifikasiBerhasil(createWithFile.message),
            router.back())
          : ComponentGlobal_NotifikasiGagal(createWithFile.message);
      } else {
        const createNoFile = await investasi_funCreateBerita({
          data: data.data as any,
        });

        createNoFile.status === 201
          ? (ComponentGlobal_NotifikasiBerhasil(createNoFile.message),
            router.back())
          : ComponentGlobal_NotifikasiGagal(createNoFile.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack px={"sm"}>
        <ComponentGlobal_BoxInformation informasi="Pengunggahan foto ke aplikasi bersifat opsional dan tidak diwajibkan, Anda dapat menyimpan berita tanpa mengunggah foto." />

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

        <TextInput
          withAsterisk
          placeholder="Masukan judul berita"
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Judul berita"
          onChange={(val) => {
            setData({ data: { ...data.data, title: val.target.value } });
          }}
        />

        <Stack spacing={5}>
          <Textarea
            withAsterisk
            placeholder="Masukan deskripsi berita"
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Deskripsi"
            autosize
            maxLength={500}
            minRows={2}
            maxRows={6}
            onChange={(val) => {
              setData({
                data: { ...data.data, deskripsi: val.target.value },
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={data.data.deskripsi.length}
            maxInput={500}
          />
        </Stack>

        <Button
          loaderPosition="center"
          loading={isLoading}
          my={"md"}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => {
            onCreate();
          }}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
