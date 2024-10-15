import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_CardStyles
} from "@/app_modules/_global/component";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import {
  Button,
  Center,
  FileButton,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconCircleCheck } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funUpdateDocument } from "../../_fun";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";

export function Investasi_ViewEditDokumen({
  dataDokumen,
}: {
  dataDokumen: MODEL_INVESTASI_DOKUMEN;
}) {
  const router = useRouter();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dataDokumen);
  const [title, setTitle] = useState(data.title);

  async function onUpdate() {
    try {
      setIsLoading(true);
      if (filePdf) {
        const delfile = await funGlobal_DeleteFileById({ fileId: data.fileId });

        if (!delfile.success) {
          ComponentGlobal_NotifikasiPeringatan("Gagal hapus file lama");
        }

        const uploadFile = await funGlobal_UploadToStorage({
          file: filePdf,
          dirId: DIRECTORY_ID.investasi_dokumen,
        });

        if (!uploadFile.success) {
          setIsLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal upload file dokumen");
        }

        const updateWithFile = await investasi_funUpdateDocument({
          data: data,
          fileId: uploadFile.data.id,
        });

        if (updateWithFile.status !== 200) {
          ComponentGlobal_NotifikasiPeringatan(updateWithFile.message);
        }
        ComponentGlobal_NotifikasiBerhasil(updateWithFile.message);
      } else {
        const updateNoFile = await investasi_funUpdateDocument({
          data: data,
        });

        if (updateNoFile.status !== 200) {
          ComponentGlobal_NotifikasiPeringatan(updateNoFile.message);
        }
        ComponentGlobal_NotifikasiBerhasil(updateNoFile.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.back();
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        {/* <ComponentGlobal_BoxInformation informasi="File dokumen bersifat opsional, jika memang ada file yang bisa membantu meyakinkan investor. Anda bisa mengupload nya disini !" /> */}

        <Stack>
          <TextInput
            label="Judul Dokumen"
            placeholder="Masukan judul dokumen"
            value={data.title}
            styles={{
              label: {
                color: "white",
              },
            }}
            onChange={(val) => setData({ ...data, title: val.target.value })}
          />
          <ComponentGlobal_CardStyles marginBottom={"0px"}>
            {!filePdf ? (
              <Text lineClamp={1} align="center" c={"gray"}>
                Dokumen {_.startCase(title)}.pdf
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
          disabled={data.title === ""}
          mt={50}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          style={{
            transition: "0.5s",
          }}
          onClick={() => {
            onUpdate();
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
