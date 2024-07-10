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
  BackgroundImage,
} from "@mantine/core";
import {
  IconCircleLetterH,
  IconCloudLockOpen,
  IconUserCircle,
} from "@tabler/icons-react";
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
import ComponentGlobal_ErrorInput from "@/app_modules/component_global/error_input";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";

export default function Register({ dataOtp }: { dataOtp: any }) {
  const router = useRouter();
  const [nomor, setNomor] = useState(dataOtp.nomor);
  const [value, setValue] = useState("");
  const [isValue, setIsValue] = useState(false);
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);

  async function onRegistarsi() {
    const body = {
      username: value,
      nomor: nomor,
    };
    // console.log(body);

    if (body.username === "") {
      setIsValue(true);
      return null;
    }
    if (body.username.length < 5) return null;
    if (_.values(body.username).includes(" ")) return null;

    await Auth_funRegister(body).then(async (res) => {
      if (res.status === 200) {
        await auth_funEditAktivasiKodeOtpById(dataOtp.id).then((val) => {
          if (val.status === 200) {
            ComponentGlobal_NotifikasiBerhasil(res.message);
            setLoading(true);
            router.push(RouterHome.main_home, { scroll: false });
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
      <BackgroundImage
        src={"/aset/global/main_background.png"}
        h={"100vh"}
        // pos={"static"}
      >
        <Center h={"100vh"}>
          <Stack h={"100%"} align="center" justify="center" spacing={70}>
            <Title order={2} c={MainColor.yellow}>
              REGISTRASI
            </Title>

            <IconUserCircle size={100} color="white" />

            <Stack spacing={"sm"} w={300}>
              <Text fz={10} c={"white"}>
                Anda akan terdaftar dengan nomor berikut{" "}
                <Text inherit span fw={"bold"}>
                  +{nomor}
                </Text>
              </Text>
              <TextInput
                ref={focusTrapRef}
                placeholder="Masukan Username"
                maxLength={50}
                error={
                  value.length > 0 && value.length < 5 ? (
                    <ComponentGlobal_ErrorInput text="Minimal 5 karakter !" />
                  ) : _.values(value).includes(" ") ? (
                    <Stack spacing={5}>
                      <ComponentGlobal_ErrorInput text="Tidak boleh ada space" />
                      <ComponentGlobal_ErrorInput text="Sambungkan huruf meggunakan karakter _" />
                    </Stack>
                  ) : isValue ? (
                    <ComponentGlobal_ErrorInput text="Masukan username anda" />
                  ) : (
                    ""
                  )
                }
                onChange={(val) => {
                  val.currentTarget.value.length > 0 ? setIsValue(false) : "";
                  setValue(val.currentTarget.value);
                }}
              />
              <Stack>
                <Button
                  loading={loading ? true : false}
                  loaderPosition="center"
                  radius={"md"}
                  compact
                  h={40}
                  c={"black"}
                  bg={MainColor.yellow}
                  color={"yellow"}
                  style={{
                    borderColor: AccentColor.yellow,
                  }}
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
      </BackgroundImage>
    </>
  );
}
