"use client";

import { Warna } from "@/app/lib/warna";
import {
  Flex,
  Title,
  TextInput,
  Button,
  Text,
  Center,
  PinInput,
  Stack,
} from "@mantine/core";
import { IconCircleLetterH, IconCloudLockOpen } from "@tabler/icons-react";
import { gs_nomor } from "../state/state";
import { useAtom } from "jotai";
import { useState } from "react";
import { myConsole } from "@/app/fun/my_console";
import toast from "react-simple-toasts";
import { ApiHipmi } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { useFocusTrap } from "@mantine/hooks";
import { Auth_funRegister } from "../fun/fun_register";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { IconPencilCheck } from "@tabler/icons-react";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { auth_funEditAktivasiKodeOtpById } from "../fun/fun_edit_aktivasi_kode_otp_by_id";

export default function Register({ dataOtp }: { dataOtp: any }) {
  const router = useRouter();
  const [nomor, setNomor] = useState(dataOtp.nomor);
  const [value, setValue] = useState("");
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);

  async function onRegistarsi() {
    const body = {
      username: value,
      nomor: nomor,
    };
    // console.log(body);

    if (body.username === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Username");

    if (body.username.length < 5)
      return ComponentGlobal_NotifikasiPeringatan("Username tidak sesuai");

    if (_.values(body.username).includes(" "))
      return ComponentGlobal_NotifikasiPeringatan(
        "Username tidak sesuai",
        3000
      );

    await Auth_funRegister(body).then(async (res) => {
      if (res.status === 200) {
        await auth_funEditAktivasiKodeOtpById(dataOtp.id).then((val) => {
          if (val.status === 200) {
            ComponentGlobal_NotifikasiBerhasil(res.message);
            setLoading(true);
            router.push(RouterHome.main_home);
          } else {
            ComponentGlobal_NotifikasiPeringatan(val.message);
          }
        });
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    });
  }

  return (
    <>
      {/* <pre>{JSON.stringify(dataOtp,null,2)}</pre> */}

      <Center>
        <Stack
          px={"lg"}
          spacing={70}
          w={{ base: 400 }}
          justify="center"
          h={"80vh"}
        >
          <Center>
            <IconPencilCheck size={120} />
          </Center>

          <Stack spacing={"lg"}>
            <Stack spacing={0}>
              <Title order={4}>REGISTRASI</Title>
              <Text fz={"xs"}>Masukan username anda !</Text>
            </Stack>
            <Stack spacing={0}>
              <TextInput
                ref={focusTrapRef}
                placeholder="Masukan Username"
                error={
                  value.length > 0 && value.length < 5 ? (
                    <Text>Minimal 5 karakter</Text>
                  ) : _.values(value).includes(" ") ? (
                    <Stack spacing={0}>
                      <Text>- Tidak boleh ada space</Text>
                      <Text>- Sambungkan huruf meggunakan karakter _</Text>
                    </Stack>
                  ) : (
                    ""
                  )
                }
                onChange={(val) => {
                  setValue(val.currentTarget.value);
                }}
              />
              <Text fz={10} c={"gray"}>
                Anda akan terdaftar dengan nomor berikut{" "}
                <Text inherit span fw={"bold"}>
                  +{nomor}
                </Text>
              </Text>
            </Stack>

            <Stack>
              <Button
                loading={loading ? true : false}
                loaderPosition="center"
                radius={"md"}
                compact
                h={40}
                color={"teal"}
                onClick={() => {
                  onRegistarsi();
                }}
              >
                <Text>DAFTAR</Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
