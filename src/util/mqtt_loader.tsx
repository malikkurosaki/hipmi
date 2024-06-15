"use client";

import { useEffect, useState } from "react";
import mqtt_client from "./mqtt_client";
import { useAtom } from "jotai";
import { gs_coba_chat } from "@/app/makuro/gs_coba";
import { evnPesan } from "./evn";
import { Button, Stack } from "@mantine/core";

export default function MqttLoader() {
  useEffect(() => {
    mqtt_client.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return null;

  //   <>
  //     <Stack>
  //       <Button onClick={onClick}>Tekan</Button>
  //       <Button onClick={onClick2}>Tekan 2</Button>
  //     </Stack>
  //   </>
  // );
}
