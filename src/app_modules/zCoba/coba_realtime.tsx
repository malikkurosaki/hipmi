"use client";
import { WibuRealtime } from "wibu-pkg";
import { v4 } from "uuid";
import { Stack, Title, Button } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Countdown from "react-countdown";
import { useHookstate } from "@hookstate/core";

const WIBU_REALTIME_TOKEN: any = process.env.NEXT_PUBLIC_WIBU_REALTIME_TOKEN;

export function CobaRealtime({ userLoginId }: { userLoginId: string }) {

  //   const [dataRealTime, setDataRealTime] = useWibuRealtime({
  //     WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
  //     project: "hipmi",
  //   });


  useShallowEffect(() => {
    WibuRealtime.init({
      onData: (data) => {

        console.log(data)
      },
      project: "hipmi",
      WIBU_REALTIME_TOKEN: WIBU_REALTIME_TOKEN,
    });
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




