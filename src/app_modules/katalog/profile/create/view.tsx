"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCamera, IconUpload } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validRegex } from "../../component/regular_expressions";
import funCreateNewProfile from "../fun/fun_create_profile";
import { MODEL_PROFILE } from "../model/interface";

export default function CreateProfile({ userId }: { userId: any }) {
  const [filePP, setFilePP] = useState<File | null>(null);
  const [imgPP, setImgPP] = useState<any | null>();
  const [fileBG, setFileBG] = useState<File | null>(null);
  const [imgBG, setImgBG] = useState<any | null>();

  const [value, setValue] = useState({
    namaBank: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  return (
    <>
      <Stack px={"sm"} spacing={"xl"}>
        <Box>
          <Stack>
            <ComponentGlobal_BoxInformation informasi="Upload foto profile anda." />
            <Center>
              {imgPP ? (
                <Paper shadow="lg" radius={"100%"}>
                  <Avatar
                    sx={{
                      borderStyle: "solid",
                      borderColor: "gray",
                      borderWidth: "0.5px",
                    }}
                    src={imgPP ? imgPP : "/aset/global/avatar.png"}
                    size={150}
                    radius={"100%"}
                  />
                </Paper>
              ) : (
                <Paper shadow="lg" radius={"100%"}>
                  <Avatar
                    size={150}
                    radius={"100%"}
                    sx={{
                      borderStyle: "solid",
                      borderColor: "gray",
                      borderWidth: "0.5px",
                    }}
                  />
                </Paper>
              )}
            </Center>
            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    const buffer = URL.createObjectURL(
                      new Blob([new Uint8Array(await files.arrayBuffer())])
                    );
                    if (files.size > 2000000) {
                      ComponentGlobal_NotifikasiPeringatan(
                        "Maaf, Ukuran file terlalu besar, maximum 2mb",
                        3000
                      );
                    } else {
                      setImgPP(buffer);
                      setFilePP(files);
                    }
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
        </Box>

        <Box>
          <Stack>
            <ComponentGlobal_BoxInformation informasi="Upload foto latar belakang profile anda." />
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"} withBorder shadow="lg" bg={"gray.2"}>
                {imgBG ? (
                  <Image alt="Foto" src={imgBG ? imgBG : "/aset/no-img.png"} />
                ) : (
                  <Stack align="center">
                    <IconUpload color="gray" />
                    <Text fz={"xs"} c={"gray"}>
                      Upload Background
                    </Text>
                  </Stack>
                )}
              </Paper>
            </AspectRatio>

            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    const buffer = URL.createObjectURL(
                      new Blob([new Uint8Array(await files.arrayBuffer())])
                    );
                    if (files.size > 2000000) {
                      ComponentGlobal_NotifikasiPeringatan(
                        "Maaf, Ukuran file terlalu besar, maximum 2mb",
                        3000
                      );
                    } else {
                      setImgBG(buffer);
                      setFileBG(files);
                    }
                    // console.log(buffer, "ini buffer");
                    // console.log(files, " ini file");
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
        </Box>

        <Stack mb={"lg"}>
          <TextInput
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            label={"Nama"}
            maxLength={50}
            placeholder="Nama lengkap"
            onChange={(val) => {
              setValue({
                ...value,
                namaBank: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            icon={<IconAt size={15} />}
            label="Email"
            maxLength={100}
            placeholder="Contoh: User@gmail.com"
            error={
              value.email.length > 0 && !value.email.match(validRegex) ? (
                <ComponentGlobal_ErrorInput text="Invalid Email" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                email: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            label="Alamat"
            maxLength={100}
            placeholder="Alamat lengkap"
            onChange={(val) => {
              setValue({
                ...value,
                alamat: val.target.value,
              });
            }}
          />

          <Select
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            label="Jenis Kelamin"
            placeholder="Pilih satu"
            data={[
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
            onChange={(val) => {
              setValue({
                ...value,
                jenisKelamin: val as string,
              });
            }}
          />

          <ButtonAction
            value={value as any}
            userId={userId}
            filePP={filePP as any}
            fileBg={fileBG as any}
          />
        </Stack>
      </Stack>
    </>
  );
}

function ButtonAction({
  value,
  userId,
  filePP,
  fileBg,
}: {
  value: MODEL_PROFILE;
  userId: string;
  filePP: FormData;
  fileBg: FormData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const body = {
      userId: userId,
      name: value.name,
      email: value.email,
      alamat: value.alamat,
      jenisKelamin: value.jenisKelamin,
    };
    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (!body.email.match(validRegex)) return null;

    const gambarPP = new FormData();
    gambarPP.append("filePP", filePP as any);

    const gambarBG = new FormData();
    gambarBG.append("fileBG", fileBg as any);

    if (!gambarPP)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi foto profile");
    if (!gambarBG)
      return ComponentGlobal_NotifikasiPeringatan(
        "Lengkapi background profile"
      );

    await funCreateNewProfile(body as any, gambarPP, gambarBG).then((res) => {
      if (res.status === 201) {
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Profile", 3000);
        router.push(RouterHome.main_home, { scroll: false });
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Button
        loading={loading ? true : false}
        loaderPosition="center"
        mt={"md"}
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        onClick={() => {
          onSubmit();
        }}
        style={{
          border: `2px solid ${AccentColor.yellow}`,
          color: "black",
        }}
      >
        Simpan
      </Button>
    </>
  );
}
