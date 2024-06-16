"use client";

import {
  Box,
  Center,
  Group,
  LoadingOverlay,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";

import useInfiniteScroll, {
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import { createItems, loadMore } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { useShallowEffect } from "@mantine/hooks";

export default function Coba_TestLoading() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const next = async (direction: ScrollDirection) => {
    try {
      setIsLoading(true);
      const newData = await loadMore();

      setData((prev) =>
        direction === "up" ? [...newData, ...prev] : [...prev, ...newData]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useInfiniteScroll({
    next,
    rowCount: data.length,
    hasMore: { up: true },
  });

  useShallowEffect(() => {
    const d = createItems();
    setData([...d]);
  }, []);

  //   const next = async (direction: ScrollDirection) => {
  // setIsLoading(true);
  // const ar = Array.from({ length: 100 }).map((v, i) => "baru" + i);
  // const d = direction === "up" ? [...ar, ...obrolan] : [];
  // console.log(d);
  // setObrolan(d);
  // await new Promise((r) => setTimeout(r, 100));
  // setIsLoading(false);
  //   };

  //   const ref = useInfiniteScroll({
  //     next,
  //     rowCount: obrolan.length,
  //     hasMore: { up: true },
  //   });

  useShallowEffect(() => {
    // const a = Array.from({ length: 100 }).map((x) => "apa");
    // setObrolan(a);
    // mqtt_client.subscribe(roomId);
    // mqtt_client.on("message", (data: any, msg: any) => {
    //   onList(setObrolan);
    // });
  }, []);

  return (
    <>
      <Box p={"lg"}>
        <div
          ref={ref as any}
          style={{
            height: "90vh",
            overflowY: "auto",
          }}
        >
          {isLoading && <div>Loading...</div>}
          <Stack>
            {data.map((item, index) => (
              <Paper key={index} p={"md"} bg={"blue.1"}>
                <Text>{item}</Text>
              </Paper>
            ))}
          </Stack>
        </div>
      </Box>
    </>
  );
}

// export default function ComponentCobaCoba_LoadingPage() {
//   const listhHuruf = [
//     {
//       huruf: "H",
//     },
//     {
//       huruf: "I",
//     },
//     {
//       huruf: "P",
//     },
//     {
//       huruf: "M",
//     },
//     {
//       huruf: "I",
//     },
//   ];
//   const customLOader = (
//     <Center h={"100vh"}>
//       <Group>
//         {listhHuruf.map((e, i) => (
//           <Center key={i} h={"100%"}>
//             <Skeleton height={50} circle radius={"100%"} />
//             <Text sx={{ position: "absolute" }} c={"gray.4"} fw={"bold"}>
//               {e.huruf}
//             </Text>
//           </Center>
//         ))}
//       </Group>
//     </Center>
//   );

//   return (
//     <>
//       <LoadingOverlay visible overlayBlur={2} loader={customLOader} />
//     </>
//   );
// }
