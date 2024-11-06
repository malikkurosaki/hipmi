"use client";

import { ActionIcon, Box, Button, Stack, Title } from "@mantine/core";
import { useState } from "react";

import { IconPencilPlus } from "@tabler/icons-react";
import _ from "lodash";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import { useShallowEffect } from "@mantine/hooks";
import { WibuRealtime } from "wibu";
import { v4 } from "uuid";

const newData = Array(20)
  .fill(0)
  .map((e, i) => i + 1);

const data2 = [
  {
    id: 1,
    name: "bagas",
    age: 28,
  },
  {
    id: 2,
    name: "lukman",
    age: 25,
  },
  {
    id: 3,
    name: "marcel",
    age: 23,
  },
];

export default function Coba_TestLoading({
  userLoginId,
}: {
  userLoginId: string;
}) {
  // const [data, setData] = useState(data2);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newData, setNewData] = useState({});

  useShallowEffect(() => {
    WibuRealtime.init({
      WIBU_REALTIME_TOKEN: process.env.WIBU_REALTIME_KEY as any,
      project: "hipmi",
      onData(data) {
        console.log(data);
      },
    });

    return () => {
      WibuRealtime.cleanup();
    };
  }, []);

  return (
    <>
      <Stack w={200} p={"lg"}>
        <Title>User {userLoginId}</Title>
        <Button
          onClick={() => {
            WibuRealtime.setData({
              id: v4(),
              userId: userLoginId,
              data: `Ini dari user ${userLoginId}`,
            });
          }}
        >
          Cek
        </Button>
      </Stack>
    </>
  );

  // return (
  //   <>
  //     <UIGlobal_LayoutTamplate>
  //       {/* <CreateButton /> */}
  //       <Button onClick={() => setOpenDrawer(true)}>Click</Button>
  //     </UIGlobal_LayoutTamplate>
  //   </>
  // );

  // Clone data
  // return (
  //   <>
  //     <Box mt={"lg"}>
  //       <Stack>
  //         <Button
  //           onClick={() => {
  //             const clone = _.clone(data);
  //             const dataBaru = clone.map(
  //               (e) => (
  //                 e.id === 1,
  //                 {
  //                   ...e,
  //                   name: e.id === 1 ? "firman" : e.name,
  //                   age: e.id === 1 ? 30 : e.age,
  //                 }
  //               )
  //             );
  //             setData(dataBaru);
  //           }}
  //         >
  //           Update
  //         </Button>
  //       </Stack>

  //       <pre>{JSON.stringify(data, null, 2)}</pre>
  //     </Box>
  //   </>
  // );
}
