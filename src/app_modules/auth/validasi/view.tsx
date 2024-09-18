"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Center,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth_funDeleteAktivasiKodeOtpById } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import { auth_funValidasi } from "../fun/fun_validasi";
import { GlobalEnv } from "@/app/lib/token";

export default function Validasi({ dataOtp }: { dataOtp: any }) {
  const router = useRouter();
  const [nomor, setnomor] = useState(dataOtp.nomor);
  const [code, setCode] = useState(dataOtp.otp);
  const [inputCode, setInputOtp] = useState("");
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);

  async function onVerifikasi() {
    if (!inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Kode");
    if (code != inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Kode Salah");

    const res = await auth_funValidasi({
      nomor: nomor,
      HIPMI_PWD: GlobalEnv.value?.WIBU_PWD as string,
    });
    if (res.status === 200) {
      const resAktivasi = await auth_funDeleteAktivasiKodeOtpById(dataOtp.id);
      if (resAktivasi.status === 200) {
        if (res.role === "1") {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          setLoading(true);
          router.push(RouterHome.main_home, { scroll: false });
        } else {
          ComponentGlobal_NotifikasiBerhasil("Admin Logged in");
          setLoading(true);
          router.push(RouterAdminDashboard.splash_admin, { scroll: false });
        }
      } else {
        ComponentGlobal_NotifikasiPeringatan(resAktivasi.message);
      }
    } else {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.push(RouterAuth.register + dataOtp.id, { scroll: false });
    }
  }

  return (
    <>
      <BackgroundImage
        src={"/aset/global/main_background.png"}
        h={"100vh"}
        // pos={"static"}
      >
        <Stack h={"100vh"}>
          <Box
            pt={"md"}
            px={"md"}
            style={{
              position: "sticky",
              top: 0,
            }}
          >
            <ActionIcon variant="transparent" onClick={() => router.back()}>
              <IconChevronLeft color="white" />
            </ActionIcon>
          </Box>

          <Stack align="center" justify="center" h={"100vh"} spacing={70}>
            <Title order={2} color={MainColor.yellow}>
              Verifikasi Kode OTP
            </Title>

            <Stack spacing={0} align="center">
              <Text fz={"xs"} c={"white"}>
                Masukan 4 digit kode otp
              </Text>
              <Text fz={"xs"} c={"white"}>
                Yang dikirim ke{" "}
                <Text span inherit fw={"bold"}>
                  {" "}
                  +{nomor}
                </Text>
              </Text>
              <Center>
                <PinInput
                  type={"number"}
                  ref={focusTrapRef}
                  spacing={"md"}
                  mt={"md"}
                  onChange={(val) => {
                    setInputOtp(val);
                  }}
                />
              </Center>
            </Stack>
            <Button
              w={300}
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
                onVerifikasi();
              }}
            >
              <Text>VERIFIKASI</Text>
            </Button>
          </Stack>
        </Stack>
      </BackgroundImage>
    </>
  );
}
