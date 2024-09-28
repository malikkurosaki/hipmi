"use client";

import { Button, Stack, TextInput } from "@mantine/core";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Donasi_funUpdateRekening } from "../../fun/update/fun_update_rekening";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";

export default function Donasi_EditRekening({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [donasi, setDonasi] = useState(dataDonasi);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Stack spacing={"xl"}>
        <Stack spacing={"sm"}>
          <TextInput
            withAsterisk
            label="Nama Bank"
            placeholder="Masukan Nama Bank"
            value={donasi.namaBank}
            error={
              donasi.namaBank === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nama bank" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setDonasi({
                ...donasi,
                namaBank: _.upperCase(val.target.value),
              })
            }
          />
          <TextInput
            withAsterisk
            type="number"
            label="Nomor Rekening"
            placeholder="Masukkan Nomor Rekening"
            value={donasi.rekening}
            error={
              donasi.rekening === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nomor rekening" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setDonasi({
                ...donasi,
                rekening: val.currentTarget.value,
              })
            }
          />
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          disabled={
            donasi.namaBank === "" || donasi.rekening === "" ? true : false
          }
          radius={"xl"}
          onClick={() => onUpdate(router, donasi, setLoading)}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  donasi: MODEL_DONASI,
  setLoading: any
) {
  await Donasi_funUpdateRekening(donasi).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      router.back();
      NotifBerhasil(res.message);
    } else {
      NotifGagal(res.message);
    }
  });
}
