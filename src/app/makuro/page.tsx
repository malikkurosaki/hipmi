"use client";

import {
  Box,
  Button,
  Center,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import _ from "lodash";
import ViewMakuro from "./_server/makuro_view";
import mqtt_client from "@/util/mqtt_client";
import { useState } from "react";
import { useAtom } from "jotai";
import { gs_coba_chat } from "./gs_coba";
import { useShallowEffect } from "@mantine/hooks";

export default function Page() {
  const [pesan, setPesan] = useState("");
  const [ini, setIni] = useState("");

  useShallowEffect(() => {
    mqtt_client.subscribe("apa");

    mqtt_client.on("message", (data: any, msg: any) => {
      console.log( msg.toString());
      setIni(msg.toString());
    });
  }, []);

  return (
    <>
      <Stack align="center" justify="center">
        {ini}
        <TextInput
          label="User 1"
          value={pesan}
          onChange={(val) => setPesan(val.currentTarget.value)}
        />
        <button
          onClick={() => {
            mqtt_client.publish("apa", pesan);
            setPesan("");
          }}
        >
          kirim
        </button>
      </Stack>
    </>
  );
}

// export default function Page() {
//   return (
//     <Box>
//       <Box
//         style={{
//           zIndex: 99,
//         }}
//         w={"100%"}
//         bg={"green"}
//         pos={"sticky"}
//         top={0}
//         h={"10vh"}
//       >
//         header
//       </Box>

//       <Box bg={"red"} pos={"static"} >
//         <Stack>
//           {Array.from(new Array(15)).map((v, k) => (
//             <Title key={k}>Cek halaman {k+1}</Title>
//           ))}
//           <Box style={{
//             height: "10vh"
//           }}>

//           </Box>
//         </Stack>
//       </Box>

//       <Text
//         style={{
//           zIndex: 98,
//         }}
//         w={"100%"}
//         bg={"blue"}
//         pos={"fixed"}
//         bottom={0}
//         h={"10vh"}
//       >
//         footer
//       </Text>
//     </Box>
//   );
// }
