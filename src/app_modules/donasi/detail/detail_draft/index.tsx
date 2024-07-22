"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { NotifBerhasil } from "../../component/notifikasi/notif_berhasil";
import { NotifPeringatan } from "../../component/notifikasi/notif_peringatan";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { Donasi_getOneById } from "../../fun/get/get_one_donasi_by_id";

export default function DetailDraftDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  // const [data, setData] = useState(dataDonasi);

  // useShallowEffect(() => {
  //   loadData({ id: dataDonasi.id });
  // }, [dataDonasi.id]);

  // async function loadData({ id }: { id: string }) {
  //   const loadData = await Donasi_getOneById(id);
  //   setData(loadData as any);
  // }

  return (
    <>
      <Stack spacing={"xl"} py={"md"}>
        <ComponentDonasi_DetailDataGalangDana donasi={dataDonasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={dataDonasi} />
        <ButtonAjukanPenggalangan dataDonasi={dataDonasi} />
      </Stack>
    </>
  );
}

function ButtonAjukanPenggalangan({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );
  async function onCLick() {
    await Donasi_funGantiStatus(dataDonasi.id, "2").then((res) => {
      if (res.status === 200) {
        router.push(RouterDonasi.main_galang_dana);
        setTabsPostingDonasi("Review");
        NotifBerhasil("Berhasil Diajukan");
      } else {
        NotifPeringatan(res.message);
      }
    });
  }
  return (
    <>
      <Button
        radius={"xl"}
        bg={"orange"}
        color="orange"
        onClick={() => onCLick()}
      >
        Ajukan Penggalangan Dana
      </Button>
    </>
  );
}

// function DetailDonasi({ dataDonasi }: { dataDonasi: MODEL_DONASI }) {
//   const [donasi, setDonasi] = useState(dataDonasi);
//   useShallowEffect(() => {
//     setDonasi(dataDonasi);
//   }, [dataDonasi]);
//   return (
//     <>
//       <Stack>
//         <Stack>
//           <AspectRatio ratio={16 / 9}>
//             <Paper radius={"md"}>
//               <Image
//                 alt="Foto"
//                 src={RouterDonasi.api_image + `${donasi.imageDonasi.url}`}
//               />
//             </Paper>
//           </AspectRatio>
//           <Stack spacing={0}>
//             <Title order={4}>{donasi.title}</Title>
//             <Text fz={"xs"}>
//               Durasi: {donasi.DonasiMaster_Durasi.name} hari
//             </Text>
//           </Stack>
//           <Stack spacing={0}>
//             <Group position="apart">
//               <Stack spacing={0}>
//                 <Text fz={12}>Dana dibutuhkan</Text>
//                 <Title order={4} c="blue">
//                   <TampilanRupiahDonasi nominal={+donasi.target} />
//                 </Title>
//               </Stack>
//               <Stack spacing={0}>
//                 <Text fz={12}>Kategori</Text>
//                 <Title order={4} c="blue">
//                   {donasi.DonasiMaster_Ketegori.name}
//                 </Title>
//               </Stack>
//             </Group>
//           </Stack>
//         </Stack>
//       </Stack>
//     </>
//   );
// }
