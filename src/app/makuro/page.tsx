"use client";

import {
  Box,
  Button,
  Center,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
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
    <Stack>
      <Center>
        <Stack>
          <Title>LOGIN</Title>
          <TextInput />
          <TextInput />
          <TextInput />
          <TextInput />
          <Button>LOGIN</Button>
        </Stack>
      </Center>
    </Stack>
  );
}
