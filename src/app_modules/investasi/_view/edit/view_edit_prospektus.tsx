import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  Button,
  Center,
  FileButton,
  Grid,
  Group,
  Stack,
  Text
} from "@mantine/core";
import {
  IconCamera,
  IconCircleCheck
} from "@tabler/icons-react";

import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funUpdateProspektus } from "../../_fun";

export function Investasi_ViewEditProspektus({
  investasiId,
}: {
  investasiId: string;
}) {
  const router = useRouter();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpload() {
    setIsLoading(true);
    const uploadFilePdf = await funGlobal_UploadToStorage({
      file: filePdf as any,
      dirId: DIRECTORY_ID.investasi_prospektus,
    });

    if (!uploadFilePdf.success) {
      setIsLoading(false);
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload file pdf");
    }

    try {
      const updte = await investasi_funUpdateProspektus({
        fileId: uploadFilePdf.data.id,
        investasiId: investasiId,
      });

      if (updte.status !== 200) {
        return ComponentGlobal_NotifikasiPeringatan("Gagal update prospektus");
      }

      router.back();

      return ComponentGlobal_NotifikasiBerhasil(updte.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack spacing={"sm"}>
        <ComponentGlobal_BoxInformation informasi="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepan !" />
        <ComponentGlobal_CardStyles marginBottom={"0px"}>
          {!filePdf ? (
            <Text lineClamp={1} align="center" c={"gray"}>
              Upload File Prospektus
            </Text>
          ) : (
            <Grid align="center">
              <Grid.Col span={2}></Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1} align="center">
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
                Upload File
              </Button>
            )}
          </FileButton>
        </Group>

        <Button
          loaderPosition="center"
          loading={isLoading}
          disabled={filePdf === null}
          mt={50}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          style={{
            transition: "0.5s",
          }}
          onClick={() => {
            onUpload();
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
