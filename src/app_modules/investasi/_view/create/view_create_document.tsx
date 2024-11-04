import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  Stack,
  Grid,
  Center,
  Group,
  FileButton,
  Button,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCircleCheck, IconCamera } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funCreateDocument } from "../../_fun";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";

export function Investasi_ViewCreateDocument({
  investasiId,
}: {
  investasiId: string;
}) {
  const router = useRouter();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  async function onCreate() {
    setIsLoading(true);
    const uploadFileDokumen = await funGlobal_UploadToStorage({
      file: filePdf as any,
      dirId: DIRECTORY_ID.investasi_dokumen,
    });
    if (!uploadFileDokumen.success) {
      setIsLoading(false);
      ComponentGlobal_NotifikasiPeringatan("Gagal upload file pdf");
    }

    try {
      const create = await investasi_funCreateDocument({
        data: {
          investasiId: investasiId,
          fileId: uploadFileDokumen.data.id,
          title: title,
        },
      });

      if (create.status !== 201)
        ComponentGlobal_NotifikasiPeringatan(create.message);

      router.back();
      ComponentGlobal_NotifikasiBerhasil(create.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentGlobal_BoxInformation informasi="File dokumen bersifat opsional, jika memang ada file yang bisa membantu meyakinkan investor. Anda bisa mengupload nya !" />

        <Stack>
          <TextInput
            label="Judul Dokumen"
            placeholder="Masukan judul dokumen"
            styles={{
              label: {
                color: "white",
              },
            }}
            onChange={(val) => setTitle(val.currentTarget.value)}
          />
          <ComponentGlobal_CardStyles marginBottom={"0px"}>
            {!filePdf ? (
              <Text lineClamp={1} align="center" c={"gray"}>
                Upload Dokumen
              </Text>
            ) : (
              <Grid align="center">
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} align="center" color="white">
                    {filePdf.name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Center>
                    <IconCircleCheck color="green" />
                  </Center>
                </Grid.Col>
              </Grid>
            )}
          </ComponentGlobal_CardStyles>

          <Group position="center">
            <FileButton
              accept={"application/pdf"}
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );

                  setFilePdf(files);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {(props) => (
                <Button
                  leftIcon={<IconCamera />}
                  {...props}
                  radius={"xl"}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload Dokumen
                </Button>
              )}
            </FileButton>
          </Group>
        </Stack>

        <Button
          loaderPosition="center"
          loading={isLoading}
          disabled={filePdf === null || title === ""}
          mt={50}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          style={{
            transition: "0.5s",
          }}
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
