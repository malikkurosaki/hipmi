"use client";

import { useAtom } from "jotai";
import { gs_proses_donasi } from "../../global_state";
import { Box, Button, Group, Paper, Radio, Stack, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { useState } from "react";
import { MODEL_DATA_BANK } from "@/app_modules/investasi/model/model_investasi";
import { Donasi_getNamaBank } from "../../fun/get/get_nama_bank";
import { Donasi_funCreateInvoice } from "../../fun/create/fun_create_invoice";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifGagal } from "../../component/notifikasi/notif_gagal";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import mqtt_client from "@/util/mqtt_client";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";

export default function Donasi_MetodePembayaran({
  listBank,
  donasiId,
  authorId,
}: {
  listBank: MODEL_DATA_BANK[];
  donasiId: string;
  authorId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [prosesDonasi, setProsesDonasi] = useAtom(gs_proses_donasi);
  const [pilihBank, setPilihBank] = useState("");
  const [bank, setBank] = useState(listBank);

  async function onProses() {
    const body = {
      donasiId: donasiId,
      donasiMaster_BankId: pilihBank,
      nominal: prosesDonasi.nominal,
      authorId: authorId,
    };

    // console.log(body)

    const res = await Donasi_funCreateInvoice(body);
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.Donasi?.id as any,
        userId: res.data?.Donasi?.authorId as any,
        pesan: res.data?.Donasi?.title as any,
        status: res.data?.DonasiMaster_StatusInvoice?.name,
        kategoriApp: "DONASI",
        title: "Donatur mengirim invoice",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "ADMIN",
          JSON.stringify({
            count: 1,
          })
        );
        setLoading(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setProsesDonasi({
          ...prosesDonasi,
          nominal: "",
        });
        router.push(RouterDonasi.invoice + `${res.data?.id}`);
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack>
        {/* <pre>{JSON.stringify(prosesDonasi, null, 2)}</pre> */}

        <Radio.Group
          value={pilihBank}
          onChange={setPilihBank}
          withAsterisk
          color="yellow"
        >
          {bank.map((e, i) => (
            <Paper
              key={e.id}
              style={{
                backgroundColor: AccentColor.blue,
                border: `2px solid ${AccentColor.darkblue}`,
                padding: "15px",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
                marginBottom: "15px",
              }}
            >
              <Radio
                styles={{
                  radio: {
                    color: "yellow",
                  },
                }}
                value={e.id}
                label={
                  <Title order={6} color="white">
                    {e.name}
                  </Title>
                }
              />
            </Paper>
          ))}
        </Radio.Group>

        <Button
          disabled={pilihBank === "" ? true : false}
          style={{ transition: "0.5s" }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          onClick={() => {
            onProses();
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Pilih
        </Button>
      </Stack>
    </>
  );
}
