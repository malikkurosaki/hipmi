"use client";

import { useWibuRealtime, WibuRealtime } from "wibu";
import { v4 } from "uuid";
import { Stack, Title, Button } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Countdown from "react-countdown";

export function CobaRealtime({ userLoginId }: { userLoginId: string }) {
  const WIBU_REALTIME_TOKEN: any = process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;

  //   const [dataRealTime, setDataRealTime] = useWibuRealtime({
  //     WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
  //     project: "hipmi",
  //   });

  useShallowEffect(() => {
    // WibuRealtime.init({
    //   WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
    //   project: "hipmi",
    //   onData(data) {
    //     console.log(data);
    //   },
    // });
    // return () => {
    //   WibuRealtime.cleanup();
    // };
  }, []);

  return (
    <>
      <Stack w={200} p={"lg"}>
        <Title order={6}>User {userLoginId}</Title>
        <Button
          onClick={() => {
            // WibuRealtime.setData({
            //   id: v4(),
            //   name: "bagas",
            //   age: 28,
            // });
          }}
        >
          Cek
        </Button>
      </Stack>
    </>
  );
}
