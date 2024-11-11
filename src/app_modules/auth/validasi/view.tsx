"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { GlobalEnv } from "@/app/lib/token";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useFocusTrap, useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth_funResendCode } from "../fun";
import { auth_funDeleteAktivasiKodeOtpById } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import { auth_funValidasi } from "../fun/fun_validasi";

export default function Validasi({
  dataOtp,
}: {
  dataOtp: Prisma.KodeOtpSelect;
}) {
  const router = useRouter();
  const nomor = dataOtp.nomor as any;
  const code = dataOtp.otp as any;
  const [inputCode, setInputOtp] = useState("");
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);

  const [counter, setCounter] = useState(60);

  useShallowEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

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
      const resAktivasi = await auth_funDeleteAktivasiKodeOtpById(
        dataOtp.id as any
      );
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
    }

    if (res.status === 400) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.push(RouterAuth.register + dataOtp.id, { scroll: false });
    }

    if (res.status === 401) {
      const resAktivasi = await auth_funDeleteAktivasiKodeOtpById({
        nomor: nomor,
      });
      if (resAktivasi.status === 200) {
        ComponentGlobal_NotifikasiPeringatan(res.message);
        router.push(RouterAuth.login, { scroll: false });
      }
    }
  }

  async function onBack() {
    await auth_funDeleteAktivasiKodeOtpById({ nomor: nomor });
    router.back();
  }

  async function onResendCode() {
    const res = await auth_funResendCode({ nomor: nomor });
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
      router.push(RouterAuth.validasi + res.kodeId, { scroll: false });
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
    }
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"}>
          <Box
            pt={"md"}
            px={"md"}
            style={{
              position: "sticky",
              top: 0,
            }}
          >
            <ActionIcon variant="transparent" onClick={() => onBack()}>
              <IconChevronLeft color="white" />
            </ActionIcon>
          </Box>

          <Stack align="center" justify="center" h={"100vh"} spacing={50}>
            <Title order={2} color={MainColor.yellow}>
              Verifikasi Kode OTP
            </Title>

            <Stack spacing={"md"} align="center">
              <Stack spacing={0} align="center">
                <Text c={"white"}>Masukan 4 digit kode otp</Text>
                <Text c={"white"}>
                  Yang dikirim ke{" "}
                  <Text span inherit fw={"bold"}>
                    {" "}
                    +{nomor}
                  </Text>
                </Text>
              </Stack>
              <Center>
                <PinInput
                  size="xl"
                  type={"number"}
                  ref={focusTrapRef}
                  spacing={"md"}
                  mt={"md"}
                  onChange={(val) => {
                    setInputOtp(val);
                  }}
                />
              </Center>

              <Text fs="italic" mt={"sm"} c={"white"}>
                Tidak menerima kode ?{" "}
                {counter > 0 ? (
                  <Text fw={"bold"} inherit span>
                    {counter + "s"}
                  </Text>
                ) : (
                  <Text inherit span onClick={() => onResendCode()}>
                    Kirim ulang
                  </Text>
                )}
              </Text>
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
      </UIGlobal_LayoutDefault>
    </>
  );
}
