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
// import ViewMakuro from "./_server/makuro_view";
// import mqtt_client from "@/util/mqtt_client";
// import { useState } from "react";
// import { useAtom } from "jotai";
// import { gs_coba_chat } from "./gs_coba";

// export default function Page() {
//   const [data1, setData1] = useState("");
//   const [data2, setData2] = useState("");

//   const [msg, setMsg] = useAtom(gs_coba_chat);

//   return (
//     <>
//       <SimpleGrid cols={2} mt={"lg"}>
//         <Stack align="center" justify="center">
//           <TextInput
//             label="User 1"
//             value={data1}
//             onChange={(val) => setData1(val.currentTarget.value)}
//           />
//           <button
//             onClick={() => {
//               mqtt_client.publish("example_hipmi", data1);
//               setData1("");
//             }}
//           >
//             kirim
//           </button>
//         </Stack>
//         <Stack align="center" justify="center">
//           <TextInput
//             label="User 2"
//             value={data2}
//             onChange={(val) => setData2(val.currentTarget.value)}
//           />
//           <button
//             onClick={() => {
//               mqtt_client.publish("example_hipmi", data2);
//               setData2("");
//             }}
//           >
//             kirim
//           </button>
//         </Stack>
//       </SimpleGrid>
//       <Stack align="center" justify="center" mt={"xl"}>
//         <Paper withBorder shadow="lg" p={"lg"}>
//           {msg}
//         </Paper>
//       </Stack>
//       {/* <ViewMakuro /> */}
//     </>
//   );
// }

export default function Page() {
  return (
    <Box> 
      <Box
        style={{
          zIndex: 99,
        }}
        w={"100%"}
        bg={"green"}
        pos={"sticky"}
        top={0}
        h={"10vh"}
      >
        header
      </Box>

      <Box bg={"red"} pos={"static"} >
        <Stack>
          {Array.from(new Array(15)).map((v, k) => (
            <Title key={k}>Cek halaman {k+1}</Title>
          ))}
          <Box style={{
            height: "10vh"
          }}>

          </Box>
        </Stack>
      </Box>


      <Text
        style={{
          zIndex: 98,
        }}
        w={"100%"}
        bg={"blue"}
        pos={"fixed"}
        bottom={0}
        h={"10vh"}
      >
        footer
      </Text>
    </Box>
  );
}
