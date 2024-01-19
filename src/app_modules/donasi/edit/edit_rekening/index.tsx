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

export default function Donasi_EditRekening({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [donasi, setDonasi] = useState(dataDonasi);

  return (
    <>
      <Stack spacing={"xl"}>
        <Stack spacing={"sm"}>
          <TextInput
            withAsterisk
            label="Nama Bank"
            placeholder="Masukan Nama Bank"
            value={donasi.namaBank}
            onChange={(val) =>
              setDonasi({
                ...donasi,
                namaBank: _.upperCase(val.target.value),
              })
            }
          />
          <TextInput
            withAsterisk
            label="Nomor Rekening"
            placeholder="Masukkan Nomor Rekening"
            value={donasi.rekening}
            onChange={(val) =>
              setDonasi({
                ...donasi,
                rekening: val.target.value,
              })
            }
          />
        </Stack>
        <Button radius={"xl"} onClick={() => onUpdate(router, donasi)}>
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(router: AppRouterInstance, donasi: MODEL_DONASI) {
  await Donasi_funUpdateRekening(donasi).then((res) => {
    if (res.status === 200) {
      router.back();
      NotifBerhasil(res.message);
    } else {
      NotifGagal(res.message);
    }
  });
}
