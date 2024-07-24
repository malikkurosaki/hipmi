"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_IsEmptyData from "../../component/is_empty_data";
import { MODEL_DONASI } from "../../model/interface";
import { ComponentDonasi_CardStatus } from "../../component/card_view/card_status";

export default function PostingRejectDonasi({
  listReject,
}: {
  listReject: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listReject);

  return (
    <>
      {data.map((e, i) => (
        <Box key={i}>
          <ComponentDonasi_CardStatus
            data={e}
            path={RouterDonasi.detail_reject}
          />
        </Box>
      ))}
    </>
  );

  // if (_.isEmpty(listReject))
  //   return <ComponentDonasi_IsEmptyData text="Tidak ada data" />;

  // return (
  //   <>
  //     <SimpleGrid
  //       cols={4}
  //       spacing="lg"
  //       breakpoints={[
  //         { maxWidth: "62rem", cols: 3, spacing: "md" },
  //         { maxWidth: "48rem", cols: 2, spacing: "sm" },
  //         { maxWidth: "36rem", cols: 1, spacing: "sm" },
  //       ]}
  //     >
  //       {donasi.map((e, i) => (
  //         <Box
  //           key={i}
  //           onClick={() => router.push(RouterDonasi.detail_reject + `${e.id}`)}
  //         >
  //           <Stack>
  //             <Grid>
  //               <Grid.Col span={7}>
  //                 <AspectRatio ratio={16 / 9}>
  //                   <Paper radius={"md"}>
  //                     <Image
  //                       alt="Foto"
  //                       src={RouterDonasi.api_gambar + `${e.imagesId}`}
  //                       radius={"md"}
  //                     />
  //                   </Paper>
  //                 </AspectRatio>
  //               </Grid.Col>
  //               <Grid.Col span={5}>
  //                 <Stack spacing={"xs"}>
  //                   <Text fz={"sm"} fw={"bold"} lineClamp={2}>
  //                     {e.title}
  //                   </Text>
  //                   <Stack spacing={0}>
  //                     <Text fz={"sm"} fw={"bold"}>
  //                       Alasan ditolak
  //                     </Text>
  //                     <Text fz={"sm"} lineClamp={2}>
  //                       {e.catatan}
  //                     </Text>
  //                   </Stack>
  //                 </Stack>
  //               </Grid.Col>
  //             </Grid>
  //             {width > 575 ? "" : <Divider />}
  //           </Stack>
  //         </Box>
  //       ))}
  //     </SimpleGrid>
  //   </>
  // );
}
