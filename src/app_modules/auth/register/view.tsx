"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { GlobalEnv } from "@/app/lib/token";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import {
  Button,
  Center,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth_funDeleteAktivasiKodeOtpById } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import { Auth_funRegister } from "../fun/fun_register";

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

    if (body.username === "") {
      setIsValue(true);
      return null;
    }
    if (body.username.length < 5) return null;
    if (_.values(body.username).includes(" ")) return null;

    const res = await Auth_funRegister({
      data: body,
      HIPMI_PWD: GlobalEnv.value?.WIBU_PWD as string,
    });
    if (res.status === 200) {
      await auth_funDeleteAktivasiKodeOtpById({ nomor: nomor }).then((val) => {
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
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
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
      </UIGlobal_LayoutDefault>
    </>
  );
}
