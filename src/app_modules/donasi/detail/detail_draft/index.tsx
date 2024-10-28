"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Group, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { gs_donasi_tabs_posting } from "../../global_state";
import { MODEL_DONASI } from "../../model/interface";
import { Donasi_ComponentButtonDeleteDonasiById } from "../../component";

export default function DetailDraftDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  return (
    <>
      <Stack spacing={"xl"} py={"md"}>
        <ComponentDonasi_DetailDataGalangDana donasi={dataDonasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={dataDonasi} />
        <Group position="apart" grow mt={"lg"}>
          <ButtonAjukanPenggalangan dataDonasi={dataDonasi} />
          <Donasi_ComponentButtonDeleteDonasiById
            donasiId={dataDonasi.id}
            imageCeritaId={dataDonasi.CeritaDonasi.imageId}
            imageId={dataDonasi.imageId}
          />
        </Group>
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
  const [isLoading, setLoading] = useState(false);

  async function onCLick() {
    const res = await Donasi_funGantiStatus(dataDonasi.id, "2");
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id as any,
        status: res.data?.DonasiMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "DONASI",
        title: "Mengajukan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));

        setLoading(true);
        setTabsPostingDonasi("Review");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Diajukan");
        router.push(RouterDonasi.main_galang_dana);
      }
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
    }
  }
  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading ? true : false}
        radius={"xl"}
        bg={"orange"}
        color="orange"
        onClick={() => onCLick()}
      >
        Ajukan Kembali
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
