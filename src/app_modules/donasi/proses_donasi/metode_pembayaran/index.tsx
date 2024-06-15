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

    await Donasi_funCreateInvoice(body).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        NotifBerhasil(res.message);
        router.push(RouterDonasi.invoice + `${res.invoiceId}`);
        setProsesDonasi({
          ...prosesDonasi,
          nominal: "",
        });
      } else {
        NotifGagal(res.message);
      }
    });
  }

  return (
    <>
      <Stack>
        {/* <pre>{JSON.stringify(prosesDonasi, null, 2)}</pre> */}

        <Radio.Group value={pilihBank} onChange={setPilihBank} withAsterisk>
          {bank.map((e, i) => (
            <Paper
              key={e.id}
              withBorder
              radius={"md"}
              p={"sm"}
              shadow="lg"
              mb={"xs"}
            >
              <Radio value={e.id} label={<Title order={6}>{e.name}</Title>} />
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
        >
          Pilih
        </Button>
      </Stack>
    </>
  );
}
